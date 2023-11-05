from flask import Flask, request, render_template, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
import os 

app = Flask(__name__)
username="admin" if not os.environ.get("DB_USER") else os.environ.get("DB_USER")
password="admin" if not os.environ.get("DB_PASS") else os.environ.get("DB_PASS")
host="localhost" if not os.environ.get("DB_HOST") else os.environ.get("DB_HOST") 
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://{}:{}@{}/admin'.format(username,password,host)  # Replace with your PostgreSQL connection details
db = SQLAlchemy(app)

class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    author = db.Column(db.String(255))
    publication_date = db.Column(db.Date)

@app.route('/')
def index():
    books = Book.query.all()
    return render_template('index.html', books=books)

@app.route('/add_book', methods=['POST','GET'])
def add_book():
    if request.method == 'POST':
        title = request.form['title']
        author = request.form['author']
        publication_date = request.form['publication_date']
        book = Book(title=title, author=author, publication_date=publication_date)
        db.session.add(book)
        db.session.commit()
        return redirect(url_for('index'))
    elif request.method =='GET':
        return render_template('form.html')


@app.route('/delete_book/<int:id>')
def delete_book(id):
    book = Book.query.get(id)
    db.session.delete(book)
    db.session.commit()
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(host="0.0.0.0",debug=True, port=4000)