from rest_framework import serializers
from .models import TriageSubmission


class TriageSubmitSerializer(serializers.ModelSerializer):
    class Meta:
        model = TriageSubmission
        fields = ("patient_name", "patient_age", "patient_gender", "contact_number", "symptoms", "notes")

    def create(self, validated_data):
        from .services import compute_urgency
        patient = self.context["request"].user
        symptoms = validated_data.get("symptoms", [])
        notes = validated_data.get("notes", "")
        age = validated_data.get("patient_age")
        
        score, urgency, clinical_terminology, dept, ai_summary = compute_urgency(symptoms, notes, age)
        
        return TriageSubmission.objects.create(
            patient=patient,
            patient_name=validated_data.get("patient_name"),
            patient_age=age,
            patient_gender=validated_data.get("patient_gender", ""),
            contact_number=validated_data.get("contact_number", ""),
            symptoms=symptoms,
            notes=notes,
            score=score,
            urgency=urgency,
            clinical_terminology=clinical_terminology,
            suggested_department=dept,
            ai_summary=ai_summary,
        )


class TriageSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TriageSubmission
        fields = (
            "id", "patient_name", "patient_age", "patient_gender", "contact_number",
            "symptoms", "notes", "urgency", "score", "clinical_terminology",
            "suggested_department", "ai_summary", "status", "created_at"
        )
        read_only_fields = (
            "id", "urgency", "score", "clinical_terminology",
            "suggested_department", "ai_summary", "created_at"
        )
