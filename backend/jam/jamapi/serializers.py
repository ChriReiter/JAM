from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import Company, Internship, DegreeProgram, VacantPosition, CompanyDetail, AddressDetail, \
    SocialAccount, File


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['pk', 'name', 'orb_num', 'custom_companies', 'approval_status']


class DegreeProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = DegreeProgram
        fields = ['pk', 'name', 'abbreviation', 'current_class', 'deadline_application', 'internship_start',
                  'internship_end', 'deadline_report1', 'deadline_report2', 'deadline_report3', 'backgroundColor']


# class StudentSerializer(serializers.ModelSerializer):
#     degree_program = DegreeProgramSerializer()
#
#     class Meta:
#         model = Student
#         fields = ['pk', 'firstname', 'lastname', 'username', 'matriculation_no', 'email', 'degree_program']


class InternshipSerializer(serializers.ModelSerializer):
    company = CompanySerializer()
    student = "userapi.UserSerializer()"

    class Meta:
        model = Internship
        fields = ['pk', 'company', 'student', 'title', 'description', 'application_status', 'approval_status']


# class LecturerSerializer(serializers.ModelSerializer):
#     degree_program = DegreeProgramSerializer(many=True)
#
#     class Meta:
#         model = Lecturer
#         fields = '__all__'


class VacantPositionSerializer(serializers.ModelSerializer):
    company = CompanySerializer()
    degree_program = DegreeProgramSerializer(many=True)

    class Meta:
        model = VacantPosition
        fields = ['pk', 'company', 'degree_program', 'title', 'description', 'currently_open', 'approval_status']


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = AddressDetail
        fields = '__all__'


class SocialAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialAccount
        fields = '__all__'


class CompanyDetailSerializer(serializers.ModelSerializer):
    address = AddressSerializer()

    linkedin_account = SocialAccountSerializer()
    facebook_account = SocialAccountSerializer()
    twitter_account = SocialAccountSerializer()

    class Meta:
        model = CompanyDetail
        fields = '__all__'

    def create(self, validated_data):
        address_data = validated_data.pop('address')
        address = AddressDetail.objects.create(**address_data)

        linkedin_account_data = validated_data.pop('linkedin_account')
        linkedin_account = SocialAccount.objects.create(**linkedin_account_data)
        facebook_account_data = validated_data.pop('facebook_account')
        facebook_account = SocialAccount.objects.create(**facebook_account_data)
        twitter_account_data = validated_data.pop('twitter_account')
        twitter_account = SocialAccount.objects.create(**twitter_account_data)

        company_detail = CompanyDetail.objects.create(address=address,
                                                      linkedin_account=linkedin_account,
                                                      facebook_account=facebook_account,
                                                      twitter_account=twitter_account,
                                                      **validated_data)
        return company_detail

class FileSerializer(serializers.ModelSerializer):
    student = "userapi.UserSerializer()"
    class Meta:
        model = File
        fields = "__all__"


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
# Add custom claims
        token['permissions'] = dict.fromkeys(user.get_all_permissions(), True)
        token['groups'] = dict.fromkeys(user.groups.values_list('name', flat=True), True)
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
