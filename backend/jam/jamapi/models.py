from django.core.exceptions import ValidationError
from django.db import models





class CompanyLocalDetails(models.Model):
    description = models.CharField(max_length=1024)


class Company(models.Model):
    name = models.CharField(max_length=255)
    city = models.CharField(max_length=255, null=True, blank=True)
    state = models.CharField(max_length=255, null=True, blank=True)
    orb_num = models.CharField(max_length=20, null=True, blank=True)
    local_details = models.ForeignKey(CompanyLocalDetails, null=True, on_delete=models.CASCADE, blank=True)
    approved_status = models.BooleanField(null=True)

    def clean(self):
        super().clean()
        if self.orb_num is None and self.local_details is None:
            raise ValidationError('orb_num or local_details are both None')

        if self.orb_num is not None and self.local_details is not None:
            raise ValidationError('orb_num or local_details are both not None')


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
    # company = models.ForeignKey(Company, on_delete=models.CASCADE)
    degree_program = models.ManyToManyField(DegreeProgram)
    currently_open = models.BooleanField(default=True)
    approval_status = models.CharField(max_length=1, choices=APPROVAL_STATUS, default='?')

    def __str__(self):
        return self.title



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
    # student = models.ForeignKey(Student, on_delete=models.CASCADE)
    # company = models.ForeignKey(Company, on_delete=models.CASCADE)

    def __str__(self):
        return self.title



