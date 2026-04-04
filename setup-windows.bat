@echo off
echo.
echo  =============================================
echo   GigGuard Setup — Windows
echo  =============================================
echo.

:: Check Node
node -v >nul 2>&1
if %errorlevel% neq 0 (
  echo  ERROR: Node.js not found.
  echo  Download from: https://nodejs.org
  pause & exit
)
echo  [OK] Node.js found

:: Check MySQL
mysql --version >nul 2>&1
if %errorlevel% neq 0 (
  echo  ERROR: MySQL not found.
  echo  Download from: https://dev.mysql.com/downloads/installer/
  pause & exit
)
echo  [OK] MySQL found

:: Install backend deps
echo.
echo  Installing backend packages...
cd backend
npm install
cd ..
echo  [OK] npm install done

:: Ask for MySQL password
echo.
set /p DBPASS="Enter your MySQL root password (press Enter if none): "

:: Create DB + load schema
echo.
echo  Creating database and loading schema...
if "%DBPASS%"=="" (
  mysql -u root < database\schema.sql
) else (
  mysql -u root -p%DBPASS% < database\schema.sql
)

if %errorlevel% neq 0 (
  echo  ERROR: Could not load schema. Check your MySQL password.
  pause & exit
)
echo  [OK] Database ready!

:: Update .env with password
echo.
echo  Updating .env...
(
  echo PORT=3001
  echo DB_HOST=localhost
  echo DB_PORT=3306
  echo DB_NAME=gigguard
  echo DB_USER=root
  echo DB_PASSWORD=%DBPASS%
  echo JWT_SECRET=gigguard_secret_key_2025
) > backend\.env
echo  [OK] .env updated

echo.
echo  =============================================
echo   SETUP COMPLETE!
echo  =============================================
echo.
echo   To start GigGuard:
echo     cd backend
echo     node server.js
echo.
echo   Then open your browser:
echo     http://localhost:3001
echo.
pause
