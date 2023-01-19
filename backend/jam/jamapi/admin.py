from django.contrib import admin
from .models import (
    Company,
    VacantPosition,
    DegreeProgram,
    Student,
    Internship,
    Lecturer,
    File
)

class CompanyAdmin(admin.ModelAdmin):

    list_display = ["name"]

class VacantPositionAdmin(admin.ModelAdmin):

    list_display = ["title", "description"]

class DegreeProgramAdmin(admin.ModelAdmin):

    list_display = ["name", "abbreviation", "current_class"]

class StudentAdmin(admin.ModelAdmin):

    list_display = ["firstname", "lastname", "matriculation_no", "email"]

class InternshipAdmin(admin.ModelAdmin):

    list_display = ["title", "description", "application_status", "approval_status"]


class LecturerAdmin(admin.ModelAdmin):

    list_display = ["firstname", "lastname", "email"]


class FileAdmin(admin.ModelAdmin):

    list_display = ["file", "student"]


admin.site.register(Company, CompanyAdmin)
admin.site.register(VacantPosition, VacantPositionAdmin)
admin.site.register(DegreeProgram, DegreeProgramAdmin)
admin.site.register(Student, StudentAdmin)
admin.site.register(Internship, InternshipAdmin)
admin.site.register(Lecturer, LecturerAdmin)
admin.site.register(File, FileAdmin)
