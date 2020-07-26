# Book Management System

## Table of Contents

- [Project Setup](#project-setup)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)

## Demo

- [Backend](admin.onehousesolution.com/admin)
- [Frontend](dev.onehousesolution.com)

### Admin Credentials

> Email: `admin@admin.com` <br/>
> Password: `admin`

## Project Setup

```
$ bash bash.sh
```
Note: `bash bash.sh is to be runned before running the following steps.`

### Backend Setup

```
$ cd bms
    > replace email address and password from credentials.yaml with original data
$ source venv/bin/activate
$ python manage.py makemigrations
$ python manage.py migrate
```

### Frontend Setup

```
$ cd frontend
$ yarn start
```

