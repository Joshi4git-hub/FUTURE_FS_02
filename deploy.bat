@echo off
REM Dhanjo E-Commerce - Production Deployment Script (Windows)
REM This script builds and prepares the application for deployment

echo.
echo ========================================
echo Dhanjo E-Commerce Deployment Script
echo ========================================
echo.

REM Check if Node.js is installed
node -v >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

echo [1/5] Checking dependencies...
if not exist node_modules (
    echo Installing frontend dependencies...
    call npm install
) else (
    echo Frontend dependencies already installed.
)

if not exist backend\node_modules (
    echo Installing backend dependencies...
    cd backend
    call npm install
    cd ..
) else (
    echo Backend dependencies already installed.
)

echo.
echo [2/5] Building frontend...
call npm run build
if errorlevel 1 (
    echo ERROR: Frontend build failed!
    pause
    exit /b 1
)
echo Frontend built successfully!

echo.
echo [3/5] Checking environment files...
if not exist .env (
    echo Creating .env file from template...
    copy .env.example .env
    echo NOTE: Edit .env with your production settings
)

if not exist backend\.env (
    echo Creating backend/.env file from template...
    copy backend\.env.example backend\.env
    echo NOTE: Edit backend/.env with your production settings
)

echo.
echo [4/5] Generating deployment report...
(
    echo # Deployment Report
    echo Generated: %date% %time%
    echo.
    echo ## Build Status: ✅ SUCCESS
    echo.
    echo ## Files Ready for Deployment
    echo - Frontend build: dist/
    echo - Backend: backend/src/
    echo - Package files: package.json, backend/package.json
    echo.
    echo ## Next Steps
    echo 1. Edit .env with production frontend URL
    echo 2. Edit backend\.env with production settings
    echo 3. Choose deployment platform:
    echo    - Vercel (Frontend): https://vercel.com
    echo    - Render.com (Backend): https://render.com
    echo    - or self-host on VPS/EC2
    echo 4. Follow DEPLOYMENT_GUIDE.md for detailed instructions
    echo.
    echo ## Key Files
    echo - Frontend distribution: dist/
    echo - Backend source: backend/src/
    echo - Environment template: .env.example, backend/.env.example
    echo - Deployment guide: DEPLOYMENT_GUIDE.md
) > DEPLOYMENT_REPORT.md

echo Deployment report created: DEPLOYMENT_REPORT.md

echo.
echo [5/5] Ready for deployment!
echo.
echo ========================================
echo Deployment Checklist:
echo ========================================
echo [✓] Frontend built (dist/ folder ready)
echo [ ] Environment variables configured
echo [ ] Database setup complete
echo [ ] Choose hosting platform
echo [ ] Deploy frontend
echo [ ] Deploy backend
echo [ ] Configure domain DNS
echo [ ] Enable HTTPS/SSL
echo.
echo For detailed instructions, see: DEPLOYMENT_GUIDE.md
echo.
pause
