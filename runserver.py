"""
This script runs the FlaskWebProject1 application using a development server.
"""
""" Testing"""
"""Testing  2 """
"""Testing 3 after adding feature 1"""

from os import environ
from __init__ import app

#Use this part for development env in Visual Studio
#if __name__ == '__main__':
#    HOST = environ.get('SERVER_HOST', 'localhost')
#    try:
#        PORT = int(environ.get('SERVER_PORT', '5555'))
#    except ValueError:
#        PORT = 5555
#    app.run(HOST, PORT)

#Use this part for production env (currently using redis/flask/nginx/gunicorn)
if __name__ == '__main__':
    app.run()
