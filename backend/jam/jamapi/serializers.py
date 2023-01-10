from rest_framework import serializers
from .models import Company, Student, Internship, DegreeProgram, Lecturer, VacantPosition


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['pk', 'name', 'orb_num', 'data_in_api', 'approval_status']

class DegreeProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = DegreeProgram
        fields = ['pk', 'name', 'abbreviation', 'current_class', 'deadline_application', 'internship_start',
                  'internship_end', 'deadline_report1', 'deadline_report2', 'deadline_report3']

class StudentSerializer(serializers.ModelSerializer):
    degree_program = DegreeProgramSerializer()
    class Meta:
        model = Student
        fields = ['pk', 'firstname', 'lastname', 'username', 'matriculation_no', 'email', 'degree_program']


class InternshipSerializer(serializers.ModelSerializer):
    company = CompanySerializer()
    student = StudentSerializer()
    class Meta:
        model = Internship
        fields = ['pk', 'company', 'student', 'title', 'description', 'application_status', 'approval_status']


class LecturerSerializer(serializers.ModelSerializer):
    degree_program = DegreeProgramSerializer(many=True)
    class Meta:
        model = Lecturer
        fields = '__all__'

class VacantPositionSerializer(serializers.ModelSerializer):
    company = CompanySerializer()
    degree_program = DegreeProgramSerializer(many=True)
    class Meta:
        model = VacantPosition
        fields = ['pk', 'company', 'degree_program', 'title', 'description', 'currently_open', 'approval_status']

