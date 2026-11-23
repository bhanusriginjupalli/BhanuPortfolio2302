"""
App-integration research prototype.
Needs OPENAI_API_KEY and TAVILY_API_KEY.
Searches public evidence, extracts structured claims, validates source URLs/domains,
and flags ambiguous or unsupported results for human review.
"""
import argparse, csv, json, os, time
from urllib.parse import urlparse
import requests
from openai import OpenAI

SCHEMA={"type":"object","properties":{
"category":{"type":"string"},"description":{"type":"string"},
"auth_methods":{"type":"array","items":{"type":"string"}},
"developer_access":{"type":"string","enum":["self_serve_free_or_trial","self_serve_paid","admin_or_review","partner_or_sales","unknown"]},
"api_surface":{"type":"string"},
"mcp_status":{"type":"string","enum":["official","third_party","not_found","unknown"]},
"buildability":{"type":"string","enum":["ready","ready_with_caveats","access_gate","unclear"]},
"blocker":{"type":"string"},
"claims":{"type":"array","items":{"type":"object","properties":{"claim":{"type":"string"},"source_url":{"type":"string"},"source_title":{"type":"string"},"source_domain":{"type":"string"}},"required":["claim","source_url","source_title","source_domain"]}},
"confidence":{"type":"string","enum":["high","medium","low"]},"human_review":{"type":"boolean"},"review_reason":{"type":"string"}
},"required":["category","description","auth_methods","developer_access","api_surface","mcp_status","buildability","blocker","claims","confidence","human_review","review_reason"],"additionalProperties":False}

def search(query,key,n=5):
 r=requests.post("https://api.tavily.com/search",json={"api_key":key,"query":query,"search_depth":"advanced","max_results":n},timeout=45);r.raise_for_status();return r.json().get("results",[])
def extract(client,app,hits):
 prompt=f"""Research {app['name']} ({app.get('category','')}). Use only supplied search results. Prefer official vendor docs. Never assume self-serve, API, or MCP without evidence. Unknown facts must remain unknown and lower confidence. Classify access (free/trial, paid, admin/review, partner/sales), MCP (official/third-party/not found/unknown), buildability and blocker. Claim URLs must be among supplied results. Results: {json.dumps(hits,ensure_ascii=False)}"""
 response=client.responses.create(model=os.getenv("OPENAI_MODEL","gpt-4.1-mini"),input=prompt,text={"format":{"type":"json_schema","name":"app_research","schema":SCHEMA,"strict":True}})
 return json.loads(response.output_text)
def validate(record,domain):
 checked=[]
 for claim in record.get("claims",[]):
  url=claim["source_url"]
  try:
   p=urlparse(url)
   if p.scheme not in ("http","https") or not p.netloc:raise ValueError("Invalid URL")
   resp=requests.head(url,timeout=15,allow_redirects=True,headers={"User-Agent":"AppResearchAgent/0.1"})
   if resp.status_code in (403,405,429) or resp.status_code>=500:
    resp=requests.get(url,timeout=15,allow_redirects=True,headers={"User-Agent":"AppResearchAgent/0.1"},stream=True)
   host=p.netloc.lower(); official=host==domain or host.endswith("."+domain)
   checked.append({**claim,"http_status":resp.status_code,"official_domain":official,"url_valid":resp.status_code<400})
  except Exception as err:checked.append({**claim,"http_status":None,"official_domain":False,"url_valid":False,"check_error":str(err)})
 record["claims"]=checked
 if not checked or any(not c.get("url_valid") or not c.get("official_domain") for c in checked):
  record["human_review"]=True;record["confidence"]="low";record["review_reason"]=(record.get("review_reason","")+" Evidence missing/broken/non-vendor; inspect.").strip()
 if record["developer_access"]=="unknown" or record["mcp_status"]=="unknown":record["human_review"]=True
 return record
def research(app,client,key):
 domain=app["domain"]
 queries=[f"{app['name']} official developer API authentication docs",f"{app['name']} API access pricing MCP official"]
 hits=[]
 for q in queries:hits+=search(q,key,4)
 hits=list({h.get("url"):h for h in hits if h.get("url")}.values())
 record=extract(client,app,hits[:8])
 if record["confidence"]=="low" or record["developer_access"]=="unknown" or not record["claims"]:
  extra=search(f"site:{domain} API auth developer portal OAuth pricing access",key,5)
  hits=list({h.get("url"):h for h in hits+extra if h.get("url")}.values())
  record=extract(client,app,hits[:10])
 return validate(record,domain)
def main():
 parser=argparse.ArgumentParser();parser.add_argument("--input",default="apps.csv");parser.add_argument("--output",default="research.json");parser.add_argument("--limit",type=int,default=100);args=parser.parse_args()
 client=OpenAI();key=os.environ["TAVILY_API_KEY"]
 with open(args.input,encoding="utf-8") as f:apps=list(csv.DictReader(f))[:args.limit]
 results=[]
 for i,app in enumerate(apps,1):
  print(f"[{i}/{len(apps)}] {app['name']}",flush=True)
  try:row={"app":app,**research(app,client,key),"researched_at":time.strftime("%Y-%m-%dT%H:%M:%SZ",time.gmtime())}
  except Exception as exc:row={"app":app,"error":str(exc),"human_review":True,"confidence":"low"}
  results.append(row)
  with open(args.output,"w",encoding="utf-8") as f:json.dump(results,f,indent=2,ensure_ascii=False)
  time.sleep(0.4)
 print(f"Wrote {len(results)} records to {args.output}")
if __name__=="__main__":main()
