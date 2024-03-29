import enum

from django.core.exceptions import ValidationError
from django.db import models

class Company(models.Model):


    APPROVAL_STATUS = (
        ('y', 'yes'),
        ('?', 'tbd'),
        ('n', 'no')
    )

    name = models.CharField(max_length=1024)
    orb_num = models.CharField(max_length=8, default="", null=True, blank=True, unique=True)
    custom_companies = models.OneToOneField('CompanyDetail', on_delete=models.CASCADE, null=True, blank=True)
    approval_status = models.CharField(max_length=1, choices=APPROVAL_STATUS, default='?')

    def __str__(self):
        return self.name

    def clean(self):
        super().clean()
        if self.orb_num is None and self.custom_companies is None:
            raise ValidationError('orb_num or local_details are both None')

        if self.orb_num is not None and self.custom_companies is not None:
            raise ValidationError('orb_num or local_details are both not None')

        if self.pk is None and Company.objects.filter(orb_num=self.orb_num).count() > 0 and self.orb_num is not None:
            raise ValidationError('orb_num already exists')

        if self.pk is None and Company.objects.filter(custom_companies=self.custom_companies).count() > 0 and self.custom_companies is not None:
            raise ValidationError('custom_companies already exists')



class DegreeProgram(models.Model):

    name = models.CharField(max_length=1024)
    abbreviation = models.CharField(max_length=5)
    current_class = models.CharField(max_length=4)
    deadline_application = models.DateField()
    internship_start = models.DateField()
    internship_end = models.DateField()
    deadline_report1 = models.DateField()
    deadline_report2 = models.DateField()
    deadline_report3 = models.DateField()
    backgroundColor = models.CharField(max_length=10, null='true')

    def __str__(self):
        return self.name + " (" + self.abbreviation + ") " + self.current_class

class VacantPosition(models.Model):

    APPROVAL_STATUS = (
        ('y', 'yes'),
        ('?', 'tbd'),
        ('n', 'no')
    )

    title = models.CharField(max_length=1024)
    description = models.CharField(max_length=1024)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    degree_program = models.ManyToManyField(DegreeProgram)
    currently_open = models.BooleanField(default=True)
    approval_status = models.CharField(max_length=1, choices=APPROVAL_STATUS, default='?')

    def __str__(self):
        return self.title


# class Student(models.Model):
#     matriculation_no = models.CharField(max_length=1024)
#     firstname = models.CharField(max_length=1024)
#     lastname = models.CharField(max_length=1024)
#     username = models.CharField(max_length=10, default="")
#     email = models.CharField(max_length=1024)
#     degree_program = models.ForeignKey(DegreeProgram, on_delete=models.CASCADE)
#
#     def __str__(self):
#         return self.firstname + " " + self.lastname

class Internship(models.Model):

    APPLICATION_STATUS_CHOICES = (
        ('a', 'applied'),
        ('t', 'talks ongoing'),
        ('y', 'accepted'),
        ('r', 'rejected'),
        ('d', 'deleted'),
        ('o', 'other')
    )

    APPROVAL_STATUS_CHOICES = (
        ('y', 'yes'),
        ('?', 'tbd'),
        ('n', 'no'),
    )

    title = models.CharField(max_length=1024)
    description = models.CharField(max_length=1024)
    application_status = models.CharField(max_length=1, choices=APPLICATION_STATUS_CHOICES)
    approval_status = models.CharField(max_length=1, choices=APPROVAL_STATUS_CHOICES)
    student = models.ForeignKey("userapi.User", on_delete=models.CASCADE)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


# class Lecturer(models.Model):
#
#     firstname = models.CharField(max_length=1024)
#     lastname = models.CharField(max_length=1024)
#     username = models.CharField(max_length=8)
#     email = models.CharField(max_length=1024)
#     degree_program = models.ManyToManyField(DegreeProgram)
#
#     def __str__(self):
#         return self.firstname + " " + self.lastname

class File(models.Model):
    REPORT_NO = (
        ('1', 'Report 1'),
        ('2', 'Report 2'),
        ('3', 'Report 3')
    )
    file = models.FileField(blank=False, null=False, upload_to="files")
    student = models.ForeignKey("userapi.User", on_delete=models.CASCADE)
    report_no = models.CharField(max_length=1, choices=REPORT_NO)
    degree_program = models.ForeignKey(DegreeProgram, on_delete=models.CASCADE)

    def __str__(self):
        return self.file.name


class SocialAccount(models.Model):
    url = models.URLField(null=True)
    likes = models.IntegerField(null=True)
    followers = models.IntegerField(null=True)


class AddressDetail(models.Model):
    address1 = models.CharField(max_length=255)
    address2 = models.CharField(max_length=255, null=True)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255, null=True)
    zip = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    iso_country_code = models.CharField(max_length=255)


class CompanyDetail(models.Model):
    entity_type = models.CharField(max_length=255)
    parent_name = models.CharField(max_length=512, null=True)
    name = models.CharField(max_length=512)
    website = models.URLField(null=True)
    address = models.ForeignKey(AddressDetail, on_delete=models.CASCADE, null=True, blank=True)
    industry = models.CharField(max_length=512, null=True)
    # categories = models.ManyToManyField("self", null=True, blank=True)
    employees = models.IntegerField(null=True)
    revenue = models.IntegerField(null=True)
    year_founded = models.IntegerField()
    description = models.TextField(null=True)
    linkedin_account = models.ForeignKey(SocialAccount, on_delete=models.CASCADE, related_name="linkedin_account", null=True, blank=True)
    facebook_account = models.ForeignKey(SocialAccount, on_delete=models.CASCADE, related_name="facebook_account", null=True, blank=True)
    twitter_account = models.ForeignKey(SocialAccount, on_delete=models.CASCADE, related_name="twitter_account", null=True, blank=True)
    # technologies = models.ManyToManyField(Technologies, null=True, blank=True)
    favicon = models.URLField(null=True)
    phone = models.CharField(max_length=254)
    email = models.EmailField(null=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True)

    def __str__(self):
        return self.name


