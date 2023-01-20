from django.contrib import admin
from .models import (
    VacantPosition,
    DegreeProgram,
    Internship
)



class VacantPositionAdmin(admin.ModelAdmin):
    list_display = ["title", "description"]


class DegreeProgramAdmin(admin.ModelAdmin):
    list_display = ["name", "abbreviation", "current_class"]



class InternshipAdmin(admin.ModelAdmin):
    list_display = ["title", "description", "application_status", "approval_status"]


admin.site.register(VacantPosition, VacantPositionAdmin)
admin.site.register(DegreeProgram, DegreeProgramAdmin)
admin.site.register(Internship, InternshipAdmin)

