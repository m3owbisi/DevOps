#!/bin/bash
# wait-for-postgres.sh
set -e
host="$1"
shift
cmd="$@"
until PGPASSWORD=mypassword psql -h "$host" -U "myuser" -d "mydb" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done
>&2 echo "Postgres is up - executing command"
exec $cmd