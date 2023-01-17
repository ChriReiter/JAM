from django.db import models

class Company(models.Model):

    DATA_IN_API = (
        ('y', 'yes'),
        ('n', 'no')
    )

    APPROVAL_STATUS = (
        ('y', 'yes'),
        ('?', 'tbd'),
        ('n', 'no')
    )

    name = models.CharField(max_length=1024)
    orb_num = models.CharField(max_length=8, default="")
    data_in_api = models.CharField(max_length=1, choices=DATA_IN_API, default="n")
    approval_status = models.CharField(max_length=1, choices=APPROVAL_STATUS, default='?')

    def __str__(self):
        return self.name



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


class Student(models.Model):
    matriculation_no = models.CharField(max_length=1024)
    firstname = models.CharField(max_length=1024)
    lastname = models.CharField(max_length=1024)
    username = models.CharField(max_length=10, default="")
    email = models.CharField(max_length=1024)
    degree_program = models.ForeignKey(DegreeProgram, on_delete=models.CASCADE)

    def __str__(self):
        return self.firstname + " " + self.lastname

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
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class Lecturer(models.Model):

    firstname = models.CharField(max_length=1024)
    lastname = models.CharField(max_length=1024)
    username = models.CharField(max_length=8)
    email = models.CharField(max_length=1024)
    degree_program = models.ManyToManyField(DegreeProgram)

    def __str__(self):
        return self.firstname + " " + self.lastname


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
    orb_num = models.BigIntegerField(primary_key=True)
    entity_type = models.CharField(max_length=255)
    company_status = models.CharField(max_length=255)
    parent_orb_num = models.BigIntegerField(null=True)
    parent_name = models.CharField(max_length=512, null=True)
    branches_count = models.IntegerField()
    subsidiaries_count = models.IntegerField()
    acquired_parent_orb_num = models.BigIntegerField(null=True)
    acquired_parent_name = models.CharField(max_length=512, null=True)
    name = models.CharField(max_length=512)
    website = models.URLField(null=True)
    webdomain = models.CharField(max_length=512, null=True)
    address = models.ForeignKey(AddressDetail, on_delete=models.CASCADE, null=True, blank=True)
    industry = models.CharField(max_length=512, null=True)
    naics_code = models.CharField(max_length=255, null=True)
    sic_code = models.CharField(max_length=255, null=True)
    # categories = models.ManyToManyField("self", null=True, blank=True)
    employees_range = models.CharField(max_length=255)
    employees = models.IntegerField(null=True)
    revenue_range = models.CharField(max_length=255)
    revenue = models.IntegerField(null=True)
    year_founded = models.IntegerField()
    description = models.TextField(null=True)
    linkedin_account = models.ForeignKey(SocialAccount, on_delete=models.CASCADE, related_name="linkedin_account", null=True, blank=True)
    facebook_account = models.ForeignKey(SocialAccount, on_delete=models.CASCADE, related_name="facebook_account", null=True, blank=True)
    twitter_account = models.ForeignKey(SocialAccount, on_delete=models.CASCADE, related_name="twitter_account", null=True, blank=True)
    googleplus_account = models.ForeignKey(SocialAccount, on_delete=models.CASCADE, related_name="googleplus_account", null=True, blank=True)
    youtube_account = models.ForeignKey(SocialAccount, on_delete=models.CASCADE, related_name="youtube_account", null=True, blank=True)
    # technologies = models.ManyToManyField(Technologies, null=True, blank=True)
    favicon = models.URLField(null=True)
    total_funding = models.IntegerField(null=True)
    last_funding_round_amount = models.IntegerField(null=True)
    last_funding_round_year = models.IntegerField(null=True)
    phone = models.CharField(max_length=255)
    fax = models.CharField(max_length=255, null=True)
    email = models.EmailField(null=True)
    importance_score = models.CharField(max_length=255)
    cik = models.CharField(max_length=255, null=True)
    cusip = models.CharField(max_length=255, null=True)
    market_cap = models.IntegerField(null=True)
    fiscal_year_end = models.CharField(max_length=255, null=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True)
    lei = models.CharField(max_length=255, null=True)
    cidrs_count = models.IntegerField()
    liveramp_idl_count = models.IntegerField()
    liveramp_device_count = models.IntegerField()

    def __str__(self):
        return self.name


