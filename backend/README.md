# JAM - Job Application Management - Backend

The backend was built with Django v4.1.3. The single-page application accesses the data via the jam API.
The Django server has been containerized and runs on a private server.

## API & Admin

To access the API endpoint visit the [Rest API](http://djangojam.matthiaswindisch.eu:8000/api/).<br>
To get to the Django admin interface, [click here](http://djangojam.matthiaswindisch.eu:8000/admin/login/?next=/admin/)

## Requirements and Installation

Since the server is already hosted on one of our servers, no further steps are required to get the backend installed and running.

However, it is of course also possible to host the backend locally. All requirements can be found in the [requirements.txt](https://github.com/ChriReiter/JAM/blob/main/backend/requirements.txt). <br>
To do this, however, the variable *apiBaseUrl* must be changed in the ```environment.ts``` file:
```Typescript
export const environment = {
  production: false,
  name: 'dev',
  apiBaseUrl: 'http://localhost:8000/api' <--
  // apiBaseUrl: 'http://djangojam.matthiaswindisch.eu:8000/api'
}
```