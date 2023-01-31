from django.core import serializers
from django.db.models import Q
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django.views import View
from rest_framework import viewsets, permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.serializers import ValidationError
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail

from . import models
from . import serializers
from .models import CompanyDetail
from .serializers import InternshipSerializer, CompanyDetailSerializer


# class StudentViewSet(viewsets.ViewSet):
#
#     def list(self, request):
#         queryset = models.Student.objects.all()
#         if request.GET.get("username") is not None:
#             queryset = models.Student.objects.filter(username=request.GET.get("username"))
#         serializer = serializers.StudentSerializer(queryset, many=True)
#         return Response(serializer.data, status=200)
#
#     def create(self, request):
#         degree_program = models.DegreeProgram.objects.get(pk=request.data["degree_program"])
#         student = models.Student.objects.create(
#             firstname=request.data["firstname"],
#             lastname=request.data["lastname"],
#             email=request.data["email"],
#             username=request.data["username"],
#             matriculation_no=request.data["matriculation_no"],
#             degree_program=degree_program
#         )
#         student.save()
#         serializer = serializers.StudentSerializer(student)
#         return Response(serializer.data, status=201)
#
#     def retrieve(self, request, student_pk=None):
#         student = models.Student.objects.get(pk=student_pk)
#         serializer = serializers.StudentSerializer(student)
#         return Response(serializer.data, status=200)
#
#
# class LecturerViewSet(viewsets.ViewSet):
#
#     def list(self, request):
#         queryset = models.Lecturer.objects.all()
#         serializer = serializers.LecturerSerializer(queryset, many=True)
#         return Response(serializer.data, status=200)
#
#     def create(self, request):
#         lecturer = models.Lecturer.objects.create(
#             firstname=request.data["firstname"],
#             lastname=request.data["lastname"],
#             email=request.data["email"]
#         )
#         lecturer.degree_program.add(request.data["degree_program"])
#         lecturer.save()
#         serializer = serializers.LecturerSerializer(lecturer)
#         return Response(serializer.data, status=201)


class DegreeProgramViewSet(viewsets.ViewSet):

    def list(self, request):
        queryset = models.DegreeProgram.objects.all()
        if request.GET.get("username") is not None:
            queryset = models.DegreeProgram.objects.filter(user__username=request.GET.get("username"))
        serializer = serializers.DegreeProgramSerializer(queryset, many=True)
        return Response(serializer.data, status=200)

    def create(self, request):
        degree_program = models.DegreeProgram.objects.create(
            name=request.data["name"],
            abbreviation=request.data["abbreviation"],
            current_class=request.data["current_class"],
            deadline_application=request.data["deadline_application"],
            internship_start=request.data["internship_start"],
            internship_end=request.data["internship_end"],
            deadline_report1=request.data["deadline_report1"],
            deadline_report2=request.data["deadline_report2"],
            deadline_report3=request.data["deadline_report3"]
        )
        degree_program.save()
        serializer = serializers.DegreeProgramSerializer(degree_program)
        return Response(serializer.data, status=201)

    def retrieve(self, request, dp_pk=None):
        degree_program = models.DegreeProgram.objects.get(pk=dp_pk)
        serializer = serializers.DegreeProgramSerializer(degree_program)
        return Response(serializer.data, status=200)


class InternshipViewSet(viewsets.ViewSet):

    def list(self, request):
        queryset = models.Internship.objects.all()
        if request.GET.get("dp") is not None:
            degree_program = models.DegreeProgram.objects.get(abbreviation=request.GET.get("dp"))
            queryset = models.Internship.objects.filter(user__degree_program=degree_program)
        if request.GET.get("student") is not None:
            queryset = models.Internship.objects.filter(user__username=request.GET.get("student"))
        serializer = serializers.InternshipSerializer(queryset, many=True)
        return Response(serializer.data, status=200)

    def create(self, request):
        student = models.User.objects.get(pk=request.data["user"])
        company = models.Company.objects.get(pk=request.data["company"])
        internship = models.Internship.objects.create(
            title=request.data["title"],
            description=request.data["description"],
            application_status=request.data["application_status"],
            approval_status=request.data["approval_status"],
            student=student,
            company=company
        )
        internship.save()
        serializer = serializers.InternshipSerializer(internship)
        return Response(serializer.data, status=201)

    def retrieve(self, request, internship_pk=None):
        internship = models.Internship.objects.get(pk=internship_pk)
        serializer = serializers.InternshipSerializer(internship)
        return Response(serializer.data, status=200)

    def update(sef, request, internship_pk=None):
        internship = models.Internship.objects.get(pk=internship_pk)
        internship.title = request.data["title"]
        internship.description = request.data["description"]
        internship.application_status = request.data["application_status"]
        internship.approval_status = request.data["approval_status"]
        internship.save()
        serializer = serializers.InternshipSerializer(internship)
        return Response(serializer.data, status=201)


class CompanyViewSet(viewsets.ViewSet):

    def list(self, request):
        queryset = models.Company.objects.all()
        if request.GET.get("dp") is not None:
            degree_program = models.DegreeProgram.objects.get(abbreviation=request.GET.get("dp"))
            queryset = models.Company.objects.filter(internship__student__degree_program=degree_program)
        if request.GET.get("name") is not None:
            queryset = models.Company.objects.filter(name=request.GET.get("name"))
        if request.GET.get("orb-num") is not None:
            queryset = models.Company.objects.filter(orb_num=request.GET.get("orb-num"))
        queryset.order_by("name")
        serializer = serializers.CompanySerializer(queryset, many=True)
        return Response(serializer.data, status=200)

    def create(self, request):
        company = models.Company.objects.create(
            name=request.data["name"],
            orb_num=request.data["orb_num"],
            custom_companies=request.data["custom_companies"],
            approval_status=request.data["approval_status"]
        )
        company.save()
        serializer = serializers.CompanySerializer(company)
        return Response(serializer.data, status=201)

    def retrieve(self, request, company_pk=None):
        company = models.Company.objects.get(pk=company_pk)
        serializer = serializers.CompanySerializer(company)
        return Response(serializer.data, status=200)

    def update(self, request, company_pk=None):
        company = models.Company.objects.get(pk=company_pk)
        company.name = request.data["name"]
        company.orb_num = request.data["orb_num"]
        company.custom_companies = request.data["custom_companies"]
        company.approval_status = request.data["approval_status"]
        company.save()
        return Response(
            {
                "id": company.pk,
                "name": company.name,
                "orb_num": company.orb_num,
                "custom_companies": company.custom_companies,
                "approval_status": company.approval_status
            },
            status=201)


class VacantPositionViewSet(viewsets.ViewSet):

    def list(self, request):
        queryset = models.VacantPosition.objects.all()
        if request.GET.get("is-open") is not None:
            queryset = models.VacantPosition.objects.filter(currently_open=request.GET.get("is-open"))
        if request.GET.get("lecturer") is not None:
            queryset = models.VacantPosition.objects.filter(currently_open=True)
            queryset = queryset.filter(approval_status="?")
            lecturer = models.Lecturer.objects.filter(pk=request.GET.get("lecturer"))[0]
            queryset = queryset.filter(degree_program__user=lecturer)
        if request.GET.get("student") is not None:
            queryset = models.VacantPosition.objects.filter(currently_open=True)
            queryset = queryset.filter(approval_status="y")
            student = models.Student.objects.filter(pk=request.GET.get("student"))[0]
            queryset = queryset.filter(degree_program__user=student)
        serializer = serializers.VacantPositionSerializer(queryset, many=True)
        return Response(serializer.data, status=200)

    def retrieve(self, request, vacant_position_pk=None):
        vacant_position = models.VacantPosition.objects.get(pk=vacant_position_pk)
        serializer = serializers.VacantPositionSerializer(vacant_position)
        return Response(serializer.data, status=200)

    def create(self, request):
        company = models.Company.objects.get(pk=request.data["company"])
        vacant_position = models.VacantPosition.objects.create(
            title=request.data["title"],
            description=request.data["description"],
            currently_open=request.data["currently_open"],
            approval_status=request.data["approval_status"],
            company=company
        )
        [vacant_position.degree_program.add(pk) for pk in request.data["degree_program"]]
        vacant_position.save()
        serializer = serializers.VacantPositionSerializer(vacant_position)
        return Response(serializer.data, status=201)

    def update(self, request, vacant_position_pk=None):
        vacant_position = models.VacantPosition.objects.get(pk=vacant_position_pk)
        vacant_position.title = request.data["title"]
        vacant_position.description = request.data["description"]
        vacant_position.currently_open = request.data["currently_open"]
        vacant_position.approval_status = request.data["approval_status"]
        vacant_position.save()
        serializer = serializers.VacantPositionSerializer(vacant_position)
        return Response(serializer.data, status=201)

class EmailViewSet(viewsets.ViewSet):
    def send_email(self, request):
        send_mail(
            request.data["subject"],
            request.data["message"],
            "jam.wapdev@gmail.com",
            request.data["recipients"],
            fail_silently=False
        )
        return Response(201)


class FileViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = models.File.objects.all()
        serializer = serializers.FileSerializer(queryset, many=True)
        return Response(serializer.data, status=200)

    def create(self, request):
        student = models.Student.objects.get(pk=request.data["student"])
        file = models.File.objects.create(
            file=request.data["file"],
            student=student
        )
        file.save()
        serializer = serializers.FileSerializer(file)
        return Response(serializer.data, status=200)


class CompanyDetailViewSet(viewsets.ModelViewSet):
    queryset = CompanyDetail.objects.all()
    serializer_class = CompanyDetailSerializer
    def retrieve(self, request, company_pk=None):
        company_detail = models.CompanyDetail.objects.get(pk=company_pk)
        serializer = serializers.CompanyDetailSerializer(company_detail)
        return Response(serializer.data, status=200)

    def list(self, request, name=None):

        company_detail = models.CompanyDetail.objects.all()

        serializer = serializers.CompanyDetailSerializer(company_detail, many=True)
        return Response(serializer.data, status=200)

    def search(self, request, name=None):
        try:
            company_detail = models.CompanyDetail.objects.filter(name__contains=name)

        except models.CompanyDetail.DoesNotExist:
            return Response(status=204)

        serializer = serializers.CompanyDetailSerializer(company_detail, many=True)
        return Response(serializer.data, status=200)


class EventViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = models.CalEvent.objects.all()
        serializer = serializers.CalEventSerializer(queryset, many=True)
        return Response(serializer.data, status=200)




