import yaml
from django.core.mail import send_mail
from django.core.mail import send_mail, BadHeaderError, EmailMessage
import socket
import smtplib

credentials = yaml.load(open('credentials.yaml'), Loader=yaml.FullLoader)


def send_new_email(email, message, subject=""):
    try:
        sender = credentials['sys_email']
        send_mail(subject, message="", from_email=sender,
                  recipient_list=email,  html_message=message)
        return True
    except (BadHeaderError, socket.gaierror, smtplib.SMTPException, Exception) as e:
        print(e)
        return False
