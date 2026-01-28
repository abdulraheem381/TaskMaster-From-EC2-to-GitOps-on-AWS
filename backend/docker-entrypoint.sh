#!/bin/sh
set -e

# Wait for PostgreSQL to be ready
until PGPASSWORD=$DATABASE_PASSWORD psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -c "\q" 2>/dev/null; do
  echo "Waiting for PostgreSQL..."
  sleep 1
done

echo "PostgreSQL is ready!"

# Run migrations
npm run prisma:migrate:prod

# Start the application
npm start
