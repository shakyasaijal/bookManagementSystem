# Book Management System

## Table of Contents

- [Project Setup](#project-setup)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Features Completed](#features-completed)

## Demo

- [Backend](http://admin.onehousesolution.com/admin)
- [Frontend](http://dev.onehousesolution.com)

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

### Features Completed

- Sign In with redux and validation.
- Sign Up with redux and validation.
- Logout with redux.
- Responsive Design for all pages.
- Books CRUD Completed.
- Register, Login, Logout backend completed.
- Fetch Popular Books (Top viewed books)
- Fetch Latest Books (10 random books)
- Redirect to sign in page if unauthenticated user points to /add-book

