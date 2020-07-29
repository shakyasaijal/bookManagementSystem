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

## Architecture

This project is based on jwt token authentication. We have two tokens: access token and refresh token

### Access Token

`Access Token expires in 1 hour which is stored in cookie. `

### Refresh Token

`Refresh Token expires in 30 days which is stored in cookie.`

If access token and refresh token, both are expired, then user is logout of the application. If access token is expired but refresh token is not, then by using refresh token, we will refresh our access token which will make users authenticate for next 1 hour. 

## Project Setup

```
$ bash bash.sh
```

Note: `bash bash.sh is to be runned before running the following steps.`

### Backend Setup

- [Click Here](https://github.com/shakyasaijal/bookManagementSystem/wiki/Backend-Setup)

### Frontend Setup

- [Click Here](https://github.com/shakyasaijal/bookManagementSystem/wiki/Frontend-Setup)

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
- Books Detail api call
- Add books api
- Mobile Navigation
- Error display
- State managed
- Edit and Delete books
- Force logout user after refresh token expires
- Search
- Secretly logging in user when access token expired.

### Remaining Feature

- Email not sending with the following error:

`(534, b'5.7.14 <https://accounts.google.com/signin/continue?sarp=1&scc=1&plt=AKgnsbt\n5.7.14 GX6XW1tuh55hmOqXJS4kHKMj2I1YkrvjISltswLgG--bl--X04CYn3XTEk_tu8YLbcC-2\n5.7.14 n63q-XuAwRT61jU15elENgsYtUyj_DQB4sNOXsjWScQk3fetP3wo4GKkC0B0OhWm>\n5.7.14 Please log in via your web browser and then try again.\n5.7.14  Learn more at\n5.7.14  https://support.google.com/mail/answer/78754 f31sm13535qte.35 - gsmtp')
`