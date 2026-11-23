"""Offline regression tests for evidence validator."""
from unittest.mock import patch
import research_agent as agent

def test_missing_claims_requires_review():
    r={"claims":[],"developer_access":"unknown","mcp_status":"unknown","human_review":False,"review_reason":"","confidence":"medium"}
    result=agent.validate_claims(r,"example.com")
    assert result["human_review"] is True and result["confidence"]=="low"

def test_official_success_url_retained():
    r={"claims":[{"claim":"API exists","source_url":"https://docs.example.com/api","source_title":"API","source_domain":"docs.example.com"}],"developer_access":"self_serve_paid","mcp_status":"not_found","human_review":False,"review_reason":"","confidence":"high"}
    class Resp: status_code=200
    with patch.object(agent.requests,"head",return_value=Resp()):
        result=agent.validate_claims(r,"example.com")
    assert result["claims"][0]["url_valid"] and result["claims"][0]["official_domain"]
    assert result["human_review"] is False

def test_nonofficial_source_flags_review():
    r={"claims":[{"claim":"API exists","source_url":"https://thirdparty.test/article","source_title":"Article","source_domain":"thirdparty.test"}],"developer_access":"self_serve_paid","mcp_status":"not_found","human_review":False,"review_reason":"","confidence":"high"}
    class Resp: status_code=200
    with patch.object(agent.requests,"head",return_value=Resp()):
        result=agent.validate_claims(r,"example.com")
    assert result["claims"][0]["official_domain"] is False
    assert result["human_review"] and result["confidence"]=="low"
