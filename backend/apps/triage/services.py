"""
Rule-based urgency scoring service with clinical terminology mapping.
Returns LOW (home care), MEDIUM (clinic), HIGH (emergency).
"""
from .models import TriageSubmission

# Symptom keywords -> points (higher = more urgent)
SYMPTOM_RULES = {
    "chest_pain": 40,
    "shortness_of_breath": 35,
    "unconscious": 50,
    "bleeding_heavy": 45,
    "stroke": 50,
    "heart_attack": 50,
    "severe_pain": 30,
    "fever_high": 25,
    "vomiting_blood": 45,
    "head_injury": 35,
    "allergic_reaction": 30,
    "burn_severe": 35,
    "fracture": 25,
    "abdominal_pain": 20,
    "mild_fever": 10,
    "cough": 8,
    "cold": 5,
    "headache": 10,
    "rash": 5,
    "minor_cut": 5,
}

# Layman to clinical terminology mapping
CLINICAL_TERMS = {
    "chest_pain": "Chest pain - rule out ACS",
    "shortness_of_breath": "Dyspnea / respiratory distress",
    "unconscious": "Altered level of consciousness",
    "bleeding_heavy": "Active hemorrhage",
    "stroke": "CVA / stroke - time-critical",
    "heart_attack": "Acute coronary syndrome",
    "severe_pain": "Severe pain - assess severity",
    "fever_high": "Pyrexia / febrile",
    "vomiting_blood": "Hematemesis",
    "head_injury": "Head trauma - assess for TBI",
    "allergic_reaction": "Allergic reaction - assess for anaphylaxis",
    "burn_severe": "Severe burn injury",
    "fracture": "Suspected fracture",
    "abdominal_pain": "Abdominal pain",
    "mild_fever": "Low-grade fever",
    "cough": "Cough / respiratory symptoms",
    "cold": "Upper respiratory infection",
    "headache": "Cephalgia",
    "rash": "Dermatological presentation",
    "minor_cut": "Minor laceration",
}


def compute_urgency(symptoms: list, notes: str = "", age: int = None):
    """
    Compute numeric score and urgency level from symptoms.
    symptoms: list of strings (e.g. ["chest_pain", "fever_high"])
    Returns (score, urgency_label, clinical_terms, suggested_dept, ai_summary).
    """
    score = 0
    clinical_list = []
    symptoms_lower = [s.lower().strip().replace(" ", "_") if isinstance(s, str) else str(s) for s in symptoms]
    
    for s in symptoms_lower:
        score += SYMPTOM_RULES.get(s, 15)  # unknown symptom default 15
        if s in CLINICAL_TERMS:
            clinical_list.append(CLINICAL_TERMS[s])
    
    # Age factor
    if age:
        if age < 2 or age > 65:
            score += 10  # Higher risk for very young or elderly
    
    # Notes can add urgency
    notes_lower = (notes or "").lower()
    if "emergency" in notes_lower or "severe" in notes_lower or "critical" in notes_lower:
        score += 20
    
    score = min(100, score)
    
    if score >= 40:
        urgency = TriageSubmission.Urgency.HIGH
        dept = "Emergency Department / Resuscitation"
    elif score >= 20:
        urgency = TriageSubmission.Urgency.MEDIUM
        dept = "Urgent Care / Emergency Department"
    else:
        urgency = TriageSubmission.Urgency.LOW
        dept = "Outpatient / Primary Care"
    
    # Generate clinical terminology
    clinical_terminology = "; ".join(clinical_list) if clinical_list else "Presenting complaint as stated"
    
    # Generate AI summary
    ai_summary = f"Triage severity: {urgency}. Priority score: {score}/100. Suggested department: {dept}."
    
    return score, urgency, clinical_terminology, dept, ai_summary
