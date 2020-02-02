import firebase_admin
import google.cloud
from firebase_admin import credentials, firestore

cred = credentials.Certificate('mentor_connect_private.json')
firebase_admin.initialize_app(cred)
db = firestore.client()
