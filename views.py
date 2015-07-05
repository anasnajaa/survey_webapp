"""
Routes and views for the flask application.
"""

from datetime import datetime
from flask import json
from flask import render_template,url_for, request, redirect, jsonify;
from __init__ import app
import redis;
r = redis.StrictRedis(host='91.140.218.141',port=6379,db=0, charset="utf-8", decode_responses=True);

@app.route('/', methods =['GET', 'POST'])
@app.route('/home', methods =['GET', 'POST'])
def home():
     if request.method == 'GET':
        r.incr('counter');
        session = r.get('counter');
        r.set(session+':st', str(datetime.now()))
        return render_template('index.html',
                               title='Home Page',
                               current_session = session,
                               year=datetime.now().year,
                               )
     elif request.method == 'POST':
         session = request.form['current_session'];
         return question(session);

@app.route('/question', methods =['GET', 'POST'])
def question(session):
    if request.method == 'POST':
        statementslist=['']*79
        for x in range(1, 79):
            statementslist[x] = r.get( str(x) + ':statement')
        return render_template('question.html', 
                               ongoing_session = session, 
                               listofstatements = statementslist);
    #elif request.method == 'POST' and int(number) > 0 and int(number) < 64:
    #    ongoing_session = request.form['ongoing_session'];
    #    current_q_number = int(request.form['q_num']) + 1;
    #    current_question = r.get( str(current_q_number) + ':statement')
    #    return render_template('question.html', 
    #                           statement = current_question,
    #                           ongoing_session = ongoing_session, 
    #                           q_number = current_q_number);
    #elif request.method == 'POST' and int(number) > 64:
    #    return '<h1>done!</h1>'


@app.route('/storeresponse', methods =['GET'])
def storeresponse():
    rediskey = request.args.get('key')
    redisvalue = request.args.get('value')
    os = request.args.get('os')
    sc = request.args.get('sc')
    r.set(rediskey, redisvalue)
    r.set(os + ':sc' , sc)

@app.route('/thankyou', methods =['GET','POST'])
def thankyou():
    return render_template('thankyou.html')

@app.route('/admin/analysis', methods =['GET','POST'])
def analysis():
    statementslist=['']*79
    for x in range(1, 79):
        statementslist[x] = r.get( str(x) + ':statement')
    sc_answers = []
    completed = -1
    for x in range(1,200):
        sessioncomplete = r.get(str(x)+':'+'sc')
        if sessioncomplete:
            if sessioncomplete == 'yes':
                completed = completed + 1
                sc_answers.append([])
                for y in range(1,59):
                    answer = str(r.get( str(x) + ':' + str(y)))
                    if answer:
                        sc_answers[completed].append(answer)
                    else:
                        sc_answers[completed].append(6) 
                for y in range(59,64):
                    answer = str(r.get( str(x) + ':' + str(y)))
                    if answer:
                        sc_answers[completed].append(answer)
                    else:
                        sc_answers[completed].append('Not Answered')
    json_struct=json.dumps(sc_answers)
    return render_template('analysis.html',json_struct = json_struct, listofstatements = statementslist )


@app.route('/admin/analysis2', methods =['GET','POST'])
def analysis2():
    statementslist=['']*79
    for x in range(1, 79):
        statementslist[x] = r.get( str(x) + ':statement')
    sc_answers = []
    completed = -1
    for x in range(1,200):
        sessioncomplete = r.get(str(x)+':'+'sc')
        if sessioncomplete:
            if sessioncomplete == 'yes':
                completed = completed + 1
                sc_answers.append([])
                for y in range(1,59):
                    answer = str(r.get( str(x) + ':' + str(y)))
                    if answer:
                        sc_answers[completed].append(answer)
                    else:
                        sc_answers[completed].append(6) 
                for y in range(59,64):
                    answer = str(r.get( str(x) + ':' + str(y)))
                    if answer:
                        sc_answers[completed].append(answer)
                    else:
                        sc_answers[completed].append('Not Answered')
    json_struct=json.dumps(sc_answers)
    return render_template('analysis2.html',json_struct = json_struct, listofstatements = statementslist )

@app.route('/admin', methods =['GET','POST'])
def admin():
    visits = r.get('counter')
    completed = 0
    statements = 0
    for x in range(1,200):
        sessioncomplete = r.get(str(x)+':'+'sc')
        if sessioncomplete:
            if sessioncomplete == 'yes':
                completed = completed + 1
    for x in range(1,200):
        statementscount = r.get(str(x)+':'+'statement')
        if statementscount:
            statements = statements + 1
    return render_template('admin.html', visits = visits, completed = completed, statements = statements)

@app.route('/list', methods =['GET', 'POST'])
def list():
    statementslist=['']*79
    #for i in range(1,79):
    #    a = ['']
    #    statementslist.append(a)
    for x in range(1,79):
        statementslist[x] = r.get( str(x) + ':statement')
    return render_template('statementslist.html',
                           listofstatements = statementslist);
        

@app.route('/about')
def about():
    """Renders the about page."""
    return render_template(
        'about.html',
        title='About',
        year=datetime.now().year,
        message='Your application description page.'
    )

@app.route('/new', methods =['GET','POST'])
def new():
    if request.method == 'GET':
        return render_template('createquestion.html')
    elif request.method == 'POST':
        question_number = request.form['q_number'];
        question_content = request.form['new_question'];
        r.set(question_number + ':statement', question_content)
        return '<h1> Success! </h1>'
