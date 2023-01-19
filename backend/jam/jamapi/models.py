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

class File(models.Model):
    file = models.FileField(blank=False, null=False, upload_to="files")
    student = models.ForeignKey(Student, on_delete=models.CASCADE)

    def __str__(self):
        return self.file.name



