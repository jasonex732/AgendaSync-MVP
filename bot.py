import os
from os.path import join, dirname
from dotenv import load_dotenv
import requests
from flask import request
from twilio.twiml.messaging_response import MessagingResponse

dotenv_path = join(dirname(__file__), "sql.env")
load_dotenv(dotenv_path)


class Bot:
    def __init__(self, message):
        self.message = message

    def bot_response(self):
        message = self.message
