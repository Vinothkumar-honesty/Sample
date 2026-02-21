from django.contrib import admin
from .models import Hospital, Bed, Doctor


class BedInline(admin.TabularInline):
    model = Bed
    extra = 0


@admin.register(Hospital)
class HospitalAdmin(admin.ModelAdmin):
    list_display = ("name", "phone")
    inlines = [BedInline]


@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ("user", "hospital", "specialization")


admin.site.register(Bed)
