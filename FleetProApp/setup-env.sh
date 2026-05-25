#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=== Vehicle Booking System - Environment Setup ===${NC}\n"

# Check if .env already exists
if [ -f .env ]; then
  echo -e "${YELLOW}.env file already exists${NC}"
  read -p "Do you want to overwrite it? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${GREEN}Keeping existing .env file${NC}"
    exit 0
  fi
fi

# Check if .env.example exists
if [ ! -f .env.example ]; then
  echo -e "${RED}Error: .env.example not found${NC}"
  exit 1
fi

echo -e "${YELLOW}Enter your database connection details:${NC}\n"

read -p "Database Host (default: 152.110.30.40): " DB_HOST
DB_HOST=${DB_HOST:-152.110.30.40}

read -p "Database Port (default: 25432): " DB_PORT
DB_PORT=${DB_PORT:-25432}

read -p "Database Username (default: vbs26): " DB_USER
DB_USER=${DB_USER:-vbs26}

read -sp "Database Password: " DB_PASSWORD
echo

read -p "Database Name (default: vehiclebookdb): " DB_NAME
DB_NAME=${DB_NAME:-vehiclebookdb}

# Create .env file
cat > .env << EOF
DEFAULT_CONNECTION=Host=$DB_HOST;Port=$DB_PORT;Username=$DB_USER;Password=$DB_PASSWORD;Database=$DB_NAME;
EOF

echo -e "\n${GREEN}✓ .env file created successfully!${NC}"
echo -e "${GREEN}✓ Ready to run: docker compose up${NC}\n"
