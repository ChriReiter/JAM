from django.contrib import admin
from .models import (
    Company,
    VacantPosition,
    DegreeProgram,
    Internship,
    CompanyDetail,
    File
)


class CompanyAdmin(admin.ModelAdmin):
    list_display = ["name"]


class VacantPositionAdmin(admin.ModelAdmin):
    list_display = ["title", "description"]


class DegreeProgramAdmin(admin.ModelAdmin):
    list_display = ["name", "abbreviation", "current_class"]


# class StudentAdmin(admin.ModelAdmin):
#     list_display = ["firstname", "lastname", "matriculation_no", "email"]


class InternshipAdmin(admin.ModelAdmin):
    list_display = ["title", "description", "application_status", "approval_status"]


# class LecturerAdmin(admin.ModelAdmin):
#     list_display = ["firstname", "lastname", "email"]


class CompanyDetailAdmin(admin.ModelAdmin):
    list_display = ['name']
    search_fields = ['name']


class FileAdmin(admin.ModelAdmin):

    list_display = ["file", "student"]


admin.site.register(Company, CompanyAdmin)
admin.site.register(VacantPosition, VacantPositionAdmin)
admin.site.register(DegreeProgram, DegreeProgramAdmin)
admin.site.register(Internship, InternshipAdmin)
admin.site.register(CompanyDetail)
admin.site.register(File, FileAdmin)
