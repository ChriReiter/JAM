from django.db import models


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



