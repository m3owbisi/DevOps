from flask import Flask
import psycopg2
app = Flask(__name__)
@app.route('/')
def index():
    try:
        conn = psycopg2.connect(
            host='db',
            database='mydb',
            user='myuser',
            password='mypassword'
        )
        cur = conn.cursor()
        cur.execute('SELECT version();')
        db_version = cur.fetchone()
        cur.close()
        conn.close()
        return f'Connected to PostgreSQL: {db_version}'
    except Exception as e:
        return f'Failed to connect to PostgreSQL: {e}'
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')