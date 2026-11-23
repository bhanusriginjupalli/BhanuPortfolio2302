# App Integration Research — Product Ops Case Study

**Live case study:** https://app-integration-research-case-study-wallflower1.vercel.app

This folder contains a lightweight research-agent prototype and the preliminary seed inventory for a 100-app integration feasibility assessment.

## Status / scope
- 100-app seed inventory spanning 10 categories.
- 8 high-level official-doc spot checks.
- Preliminary classification is **not** a full 100-app evidence audit.
- Agent prototype is implemented but was not executed end-to-end here (API credentials unavailable in this runtime).
- No classification accuracy score is claimed. Spot-checks support selected high-level claims only.

## Run locally
Python 3.10+:
```bash
pip install -r requirements.txt
export OPENAI_API_KEY="..."
export TAVILY_API_KEY="..."
python research_agent.py --input apps.csv --output research.json
```
Windows PowerShell:
```powershell
$env:OPENAI_API_KEY="..."
$env:TAVILY_API_KEY="..."
python research_agent.py --input apps.csv --output research.json
```

## Pipeline
1. Search public docs for API, auth, access, MCP.
2. Extract structured fields with evidence links using an LLM.
3. Repeat targeted search when confidence is low or key access facts are unknown.
4. Check evidence URLs and whether domains match the vendor's declared official domain.
5. Flag uncertainty and human review; checkpoint results after each app.

HTTP errors (403/429/etc.) may reflect bot blocking; they are not evidence that a claim is false.

## Deliverables
- `index.html`: project/case-study landing page (live version hosted on Vercel)
- `apps.csv`: 100-app input list
- `research_agent.py`: pipeline prototype
- `verification_sample.md`: source spot-check notes
- `requirements.txt`: dependencies

**Limitations:** This version uses Tavily and OpenAI; it does not directly integrate Composio SDK/MCP. API access, plan, permissions, review requirements and MCP support vary by account/product and should be reconfirmed before implementation.
