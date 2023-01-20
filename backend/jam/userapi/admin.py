from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group
from django.forms import ModelForm, ModelMultipleChoiceField
from django.contrib.admin.widgets import FilteredSelectMultiple

from .models import User


class UserAdminConfig(UserAdmin):
    # Fields that are shown in the list
    list_display=['pk','email','username','matriculation_no','first_name','gender','degree_program']
    # Searchable fields
    search_fields=['email','username']
    readonly_fields=['date_joined','last_login']
    # Fieldsets are grouped into blocks in the admin form.
    # This fieldsets controls the layout of the form shown for EXISTING users:
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('username','matriculation_no','first_name','last_name','gender','profile_image','degree_program')}),
        ('Activity', {'fields': ('date_joined','last_login')}),
        ('Permissions', {'fields': ('groups','is_active','is_staff','is_superuser')}),
    )
    # This fieldsets controls the layout of the form shown when creating a NEW user:
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'matriculation_no','gender', 'password1', 'password2','degree_program'),
        }),
    )

class GroupAdminForm(ModelForm):
    class Meta:
        model = Group
        exclude = []

    # Add the users field.
    users = ModelMultipleChoiceField(
        queryset=User.objects.all(),
        required=False,
        # Use the pretty 'filter_horizontal widget'.
        widget=FilteredSelectMultiple('users', False)
    )

    def __init__(self, *args, **kwargs):
        # Do the normal form initialisation.
        super(GroupAdminForm, self).__init__(*args, **kwargs)
        # If it is an existing group (saved objects have a pk).
        if self.instance.pk:
            # Populate the users field with the current Group users.
            self.fields['users'].initial = self.instance.user_set.all()

    def save_m2m(self):
        # Add the users to the Group.
        self.instance.user_set.set(self.cleaned_data['users'])

    def save(self, *args, **kwargs):
        # Default save
        instance = super(GroupAdminForm, self).save()
        # Save many-to-many data
        self.save_m2m()
        return instance

admin.site.unregister(Group)

# Create a new Group admin.
class GroupAdmin(admin.ModelAdmin):
    # Use our custom form.
    form = GroupAdminForm
    # Filter permissions horizontal as well.
    filter_horizontal = ['permissions']


# Register the new Group ModelAdmin.
admin.site.register(Group, GroupAdmin)
admin.site.register(User,UserAdminConfig)