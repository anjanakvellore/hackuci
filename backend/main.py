from flask import Flask, request
from flask_cors import CORS
from firebase_setup import db
from twilio_setup import send_msg

import pytz
import json
from datetime import datetime, tzinfo, date
from pprint import pprint as pp

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/students', methods=['POST'])
def getStudents():
    # print(request.form)
    tutorID = request.form['tutor_id']
    transactions_iter = db.collection(u'transactions').where('tutor_id', '==', tutorID).stream()
    transactions = []
    for t in transactions_iter:
        tdict = t.to_dict()
        cdict = db.collection('courses').document(str(tdict['course_id'])).get().to_dict()
        sdict = db.collection('subjects').document(str(cdict['subject_id'])).get().to_dict()
        student_dict = db.collection('users').document(str(tdict['student_id'])).get().to_dict()
        # tutor_dict = db.collection('users').document(str(tdict['tutor_id'])).get().to_dict()
        
        tdict['transaction_id'] = t.id
        tdict['appointment'] = tdict['appointment'].astimezone(pytz.timezone('US/Pacific')).isoformat()
        cdict['subject'] = sdict
        tdict['course'] = cdict
        tdict['student'] = student_dict
        # tdict['tutor'] = tutor_dict
        # print(tdict)
        transactions.append(tdict)
    return {'transactions': transactions}


@app.route('/tutors', methods=['POST'])
def getTutors():
    # tutorID = request.form['tutor_id']
    studentID = request.form['student_id']
    transactions_iter = db.collection(u'transactions').where('student_id', '==', studentID).stream()
    transactions = []
    for t in transactions_iter:
        tdict = t.to_dict()
        cdict = db.collection('courses').document(str(tdict['course_id'])).get().to_dict()
        sdict = db.collection('subjects').document(str(cdict['subject_id'])).get().to_dict()
        # student_dict = db.collection('users').document(str(tdict['student_id'])).get().to_dict()
        tutor_dict = db.collection('users').document(str(tdict['tutor_id'])).get().to_dict()
        
        tdict['transaction_id'] = t.id
        tdict['appointment'] = tdict['appointment'].astimezone(pytz.timezone('US/Pacific')).isoformat()
        cdict['subject'] = sdict
        tdict['course'] = cdict
        # tdict['student'] = student_dict
        tdict['tutor'] = tutor_dict
        # print(tdict)
        transactions.append(tdict)
    return {'transactions': transactions}


@app.route('/getuser', methods=['POST'])
def getUser():
    username = request.form['username']
    user_iter = db.collection('users').where('username', '==', username).stream()
    for u in user_iter:
        udict = u.to_dict()
        udict['user_id'] = u.id
        return udict


@app.route('/allusers', methods=['GET'])
def getAllUsers():
    user_iter = db.collection(u'users').stream()
    users = []
    for u in user_iter:
        udict = u.to_dict()
        udict['user_id'] = u.id
        users.append(udict)
    return {'users': users}


@app.route('/alltutors', methods=['GET'])
def getAllTutors():
    transactions_iter = db.collection(u'transactions').stream()
    transactions = []
    for t in transactions_iter:
        tdict = t.to_dict()
        tdict['transaction_id'] = t.id
        tdict['tutor'] = db.collection('users').document(str(tdict['tutor_id'])).get().to_dict()
        tdict['appointment'] = tdict['appointment'].astimezone(pytz.timezone('US/Pacific')).isoformat()
        transactions.append(tdict)
    return {'transactions': transactions}


@app.route('/allstudents', methods=['GET'])
def getAllStudents():
    transactions_iter = db.collection(u'transactions').stream()
    transactions = []
    for t in transactions_iter:
        tdict = t.to_dict()
        tdict['transaction_id'] = t.id
        tdict['student'] = db.collection('users').document(str(tdict['student_id'])).get().to_dict()
        tdict['appointment'] = tdict['appointment'].astimezone(pytz.timezone('US/Pacific')).isoformat()
        transactions.append(tdict)
    return {'transactions': transactions}


@app.route('/allcourses', methods=['GET'])
def getAllCourses():
    courses_iter = db.collection(u'courses').stream()
    courses = []
    for c in courses_iter:
        cdict = c.to_dict()
        cdict['course_id'] = c.id
        cdict['subject'] = db.collection('subjects').document(str(cdict['subject_id'])).get().to_dict()
        courses.append(cdict)
    return {'courses': courses}


@app.route('/allsubjects', methods=['GET'])
def getAllSubjects():
    courses_iter = db.collection(u'courses').stream()
    subjects = []
    subject_dict = {}
    for c in courses_iter:
        cdict = c.to_dict()
        cdict['course_id'] = c.id

        if cdict['subject_id'] not in subject_dict:
            subject_dict[cdict['subject_id']] = []
        subject_dict[cdict['subject_id']].append(cdict)
    
    for sid, cdicts in subject_dict.items():
        sdict = db.collection('subjects').document(sid).get().to_dict()
        sdict['subject_id'] = sid
        sdict['courses'] = cdicts
        subjects.append(sdict)

    # print(subjects)
    return {'subjects': subjects}

@app.route('/ChangeTransactionStatus', methods=['POST'])
def changeTrStatus():
    tid = request.form['transaction_id']
    status = int(request.form['status'])
    if 'reason' not in request.form:
        reason = 'None given'
    else:
        reason = request.form['reason']

    trans_ref = db.collection('transactions')
    tdict = trans_ref.document(tid).get().to_dict()
    student_dict = db.collection('users').document(tdict['student_id']).get().to_dict()
    tutor_dict = db.collection('users').document(tdict['tutor_id']).get().to_dict()
    course_dict = db.collection('courses').document(tdict['course_id']).get().to_dict()

    trans_ref.document(tid).set({
        'status': status,
        'reason': reason
    }, merge=True)

    tdict['status'] = -1
    tdict['reason'] = ''
    tdict['student_id'] = "-1"

    msg_body = ""
    if status == 1:
        msg_body = ''.join(["Congratulations, you have been accepted for the session held by ",
            tutor_dict['name'],
            " for ",
            course_dict['name'],
            " on ",
            tdict['appointment'].strftime("%b %d, %Y at %H:%M")])
        send_msg(msg_body, student_dict['phone'])
    if status == 2:
        msg_body = ''.join(["Sorry, you were not selected for the session held by ",
            tutor_dict['name'],
            " for ",
            course_dict['name'],
            " on ",
            tdict['appointment'].strftime("%b %d, %Y at %H:%M"),
            ". Reason given: ",
            reason])
        trans_ref.add(tdict)
        send_msg(msg_body, student_dict['phone'])

    return {'outcome': msg_body}

@app.route('/RegisterForCourse', methods=['POST'])
def registerForCourse():
    data = json.loads(request.data)
    trans_ref = db.collection('transactions')
    for tid in data['transactions']:
        trans_ref.document(tid).set({
            'status': 0,
            'student_id': data['student_id']
        }, merge=True)
    return { 'success': True }