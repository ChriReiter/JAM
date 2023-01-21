# accounts/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

def upload_to(instance, filename):
    # Put upload files under uploads/profile_images, whereas each 
    # user has its own directory (using the primary key)
    # The filename as provided by the upload is preserved
    return "uploads/profile_images/%s/%s" % (instance.pk,filename)

class User(AbstractUser):

    GENDER = (
        ('m', 'Male'),
        ('f', 'Female'),
        ('x', 'Diverse'),
    )

    gender = models.CharField(max_length=1,choices=GENDER,blank=True,null=True)
    profile_image = models.ImageField(upload_to=upload_to,blank=True,null=True)
    matriculation_no = models.CharField(max_length=1024,blank=True,null=True)
    degree_program = models.ForeignKey("jamapi.DegreeProgram",blank=True, null=True,on_delete=models.CASCADE)

    # You can add additional fields here, as you need them. If you want 
    # to appear these new fields in the admin as well, open admin.py 
    # and change the Admin class accordingly.

    def __str__(self):
        return self.username