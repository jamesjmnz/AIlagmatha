from ..utils.lang_router import classify_message
from ..analysis.rules import rule_check
from ..analysis.url_checker import check_urls
from ..rag.retriever import retrieve_similar
from langgraph.graph import StateGraph, END
from ..rag.generated_response import generate_explanation
from ..rag.generated_response import generate_insights

def classify_node(state):
    r = classify_message(state["message"])
    state.update({"model_result": r, "lang_used": r["lang_used"]})
    return state

def rules_node(state):
    r = rule_check(state["message"])
    u = check_urls(state["message"])
    state.update({"rules_result": r, "urls_result": u})
    return state

def rag_node(state):
    ev = retrieve_similar(state["message"])
    state.update({"rag_evidence": ev})
    return state

def decision_node(state):
    scam_prob = state["model_result"]["scam_prob"]
    rule_score = state["rules_result"]["rule_score"]
    urls = state["urls_result"]
    url_bonus = 0.2 if any(u["suspicious"] for u in urls) else 0

    risk = scam_prob * 0.7 + rule_score * 0.2 + url_bonus

    state.update({
        "final_label": "Scam" if risk >= 0.5 else "Legit",
        "risk_score": risk,
        "severity": "High" if risk >= 0.75 else "Medium" if risk >= 0.4 else "Low"
    })

    return state

def explanation_node(state):
    final_label = state["final_label"]
    user_msg = state["message"]
    rag_evidence = state.get("rag_evidence", [])
    
    # Format RAG evidence list into string
    if rag_evidence and isinstance(rag_evidence, list):
        rag_text = "\n".join([item.get("content", "") for item in rag_evidence if isinstance(item, dict)])
    else:
        rag_text = ""

    is_scam = final_label == "scam"

    explanation = generate_explanation(
        is_scam,
        user_msg,
        rag_text
    )

    state.update({"explanation": explanation})
    return state

def insights_node(state):
    final_label = state["final_label"]
    user_msg = state["message"]
    questions = generate_insights(final_label, user_msg)
    state.update({"question_insights": questions})


def build():
    g = StateGraph(dict)
    g.add_node("classify", classify_node)
    g.add_node("rules", rules_node)
    g.add_node("rag", rag_node)
    g.add_node("decision", decision_node)
    g.add_node("explanation", explanation_node)
    g.add_node("insights", insights_node)

    g.set_entry_point("classify")
    g.add_edge("classify", "rules")
    g.add_edge("rules", "rag")
    g.add_edge("rag", "decision")
    g.add_edge("decision", "explanation")
    g.add_edge("explanation", "insights")
    g.add_edge("insights", END)

    return g.compile()

agent = build()

def run_scam_agent(msg: str):
    return agent.invoke({"message": msg})