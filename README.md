# Book Management System

## Table of Contents

- [Project Setup](#projectsetup)
- [Backend Setup](#backendsetup)
- [Frontend Setup](#frontendsetup)

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

