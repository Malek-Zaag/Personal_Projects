from flask import Flask


app=Flask(__name__)

@app.route("/")
def hello():
    return "hello world2"

if __name__=="__main__":
    app.run(debug=True, port=4000)
    
    
