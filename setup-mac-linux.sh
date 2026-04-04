#!/bin/bash
echo ""
echo "============================================="
echo "  GigGuard Setup — Mac / Linux"
echo "============================================="
echo ""

# Check Node
if ! command -v node &> /dev/null; then
  echo "❌ Node.js not found."
  echo "   Install: https://nodejs.org  or  brew install node"
  exit 1
fi
echo "✅ Node.js $(node -v)"

# Check MySQL
if ! command -v mysql &> /dev/null; then
  echo "❌ MySQL not found."
  echo "   Mac:   brew install mysql && brew services start mysql"
  echo "   Linux: sudo apt install mysql-server -y && sudo service mysql start"
  exit 1
fi
echo "✅ MySQL found"

# Install npm packages
echo ""
echo "📦 Installing backend packages..."
cd backend && npm install && cd ..
echo "✅ npm install done"

# Ask for MySQL password
echo ""
read -s -p "Enter your MySQL root password (press Enter if none): " DBPASS
echo ""

# Load schema
echo ""
echo "🗃️  Creating database and loading schema..."
if [ -z "$DBPASS" ]; then
  mysql -u root < database/schema.sql
else
  mysql -u root -p"$DBPASS" < database/schema.sql
fi

if [ $? -ne 0 ]; then
  echo "❌ Failed to load schema. Check your MySQL password and try again."
  exit 1
fi
echo "✅ Database ready!"

# Write .env
cat > backend/.env <<EOF
PORT=3001
DB_HOST=localhost
DB_PORT=3306
DB_NAME=gigguard
DB_USER=root
DB_PASSWORD=$DBPASS
JWT_SECRET=gigguard_secret_key_2025
EOF
echo "✅ .env written"

echo ""
echo "============================================="
echo "  SETUP COMPLETE! 🎉"
echo "============================================="
echo ""
echo "  Start the backend:"
echo "    cd backend && node server.js"
echo ""
echo "  Open in browser:"
echo "    http://localhost:3001"
echo ""
