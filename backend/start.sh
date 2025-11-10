#!/bin/sh

# Exit immediately if a command exits with a non-zero status.
set -e

# Run database migrations
echo "Running database migrations..."
npx sequelize-cli db:migrate

# Run database seeders
echo "Running database seeders..."
npx sequelize-cli db:seed:all

# Start the server
echo "Starting server..."
exec "$@"
