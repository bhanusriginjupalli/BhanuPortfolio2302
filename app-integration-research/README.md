# App Integration Research — Product Ops Case Study

**Live page:** https://app-integration-research-case-study-wallflower1.vercel.app/

## Deliverables and status
- Preliminary 100-app inventory across 10 categories.
- Research pipeline prototype (Tavily search → structured LLM extraction → targeted retry for low-confidence evidence → URL/official-domain checks → review flags/checkpoints).
- Eight high-level source spot checks, plus a manual validation set.
- The manual 8-app purposive sample agrees on a broad “documented API/auth path, buildable with caveats” label: **8/8 (100%)**. This is sample agreement only—not a statistically generalizable accuracy estimate, not a live credential/API test, and not 100-app agent accuracy.
- Agent has **not** run end-to-end because API credentials were unavailable in the execution environment. No claims of full 100-app source verification.

## Run
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
1. Search official docs for API/auth/access/MCP.
2. Extract structured fields and claim-level evidence links.
3. Retry targeted search for low-confidence or unknown facts.
4. Validate URLs and vendor-domain alignment.
5. Flag uncertainty for human review and checkpoint results.

HTTP errors may be bot blocking—not proof a claim is false. Access plans, scopes, tenant/admin approval, production review, regional availability and MCP support can change.

## Contents
- `apps.csv`: seed inventory
- `research_agent.py`: pipeline prototype
- `index.html`: interactive case study source (available in the downloadable package)
- `verification_sample.md`: source spot checks
- `ACCURACY_REPORT.md`, `validation_set.csv`, `validation_metrics.json`: validation
- `test_research_agent.py`: offline validator regression tests

**Limitations:** prototype uses Tavily + OpenAI, not Composio SDK/MCP; no live API access tests; preliminary verdicts are not launch approval.
