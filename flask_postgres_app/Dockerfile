FROM python:3.9-slim
WORKDIR /app
# Install PostgreSQL client
RUN apt-get update && \
    apt-get install -y postgresql-client && \
    rm -rf /var/lib/apt/lists/*
COPY app/ .
RUN pip install --no-cache-dir -r requirements.txt
COPY wait-for-postgres.sh /wait-for-postgres.sh
RUN chmod +x /wait-for-postgres.sh
CMD ["/wait-for-postgres.sh", "db", "python", "app.py"]