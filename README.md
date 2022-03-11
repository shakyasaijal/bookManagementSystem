# Book Management System

## Table of Contents

- [Project Setup](#project-setup)
- [Pre-requisites](#pre-requisites)
- [Backend Setup](https://github.com/shakyasaijal/bookManagementSystem/wiki/Backend-Setup)
- [Frontend Setup](https://github.com/shakyasaijal/bookManagementSystem/wiki/Frontend-Setup)
- [Features Completed](#features-completed)
- [Design](https://www.figma.com/file/Klm9ONASTghC7H6UsPnacB/Untitled?node-id=0%3A1)

## Pre-requisites

- [Yarn >=v1](https://classic.yarnpkg.com/en/docs/install) [we are using yarn as primary package manager.]
- [Node>=10](https://nodejs.org/en/)

## Architecture

This project is based on jwt token authentication. We have two tokens: access token and refresh token

### Access Token

`Access Token expires in 1 hour which is stored in cookie.`

### Refresh Token

`Refresh Token expires in 30 days which is stored in cookie.`

If access token and refresh token, both are expired, then user is logout of the application. If access token is expired but refresh token is not, then by using refresh token, we will refresh our access token which will make users authenticate for next 1 hour.

## Project Setup

```
$ bash bash.sh
```

Note: `bash bash.sh is to be runned before running the following steps.`


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
