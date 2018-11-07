from flask import Flask,json,request
from flask import render_template
# from flask_bootstrap import Bootstrap
import pymysql
app = Flask(__name__)

def get_conn():
    host = "127.0.0.1"
    user = "root"
    password = "root"
    db = "stockDB"
    conn = pymysql.connect(host=host, user=user, password=password,db=db,charset='utf-8') #change the username and password
    return conn


@app.route('/')

def hello():
    return render_template("hello.html") # change the basic html file

@app.route('/stock', methods=['GET'])

def stock():
    conn = get_conn()
    cur = conn.cursor()
    year = request.args.get("year")
    month = request.args.get("month")
    day = request.args.get("day")
    num_minutes = request.args.get("minutes")
    scale = request.args.get("scale")
    table = "stock" + str(year)
    sql1 = "SELECT * FROM %s WHERE (month > %d AND day > %d) OR " \
           "(month = %d AND day = %d AND num_minutes >= %d) LIMIT %d"
    cursor.execute(sql1, (table, month, day, month, day, num_minutes, scale))
    rows = cursor.fetchall()
    columns = ["close","day","high","low","month",
               "num_minutes","open","volume","year"]
    low = float('inf')
    high = 0
    open = 0
    close = 0
    time_year = 0
    time_month = 0
    time_day = 0
    volume = 0
    for i, row in enumerate(rows):
        if i == 0:
            open = row[6]
        elif i == len(rows) - 1:
            close = row[0]
            time_year = row[8]
            time_month = row[4]
            time_day = row[1]
        if high < row[2]:
            high = row[2]
        if low > row[3]:
            low = row[3]
        volume += row[7]
    json.dumps({"open":open, "close":close, "low":low, "high":high,
                "end_year":time_year, "end_month":time_month, "end_day":time_day,
                "volumne":volume})


if __name__ == "__main__":
    app.run()
















