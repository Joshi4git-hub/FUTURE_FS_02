#!/bin/bash
# Dhanjo E-Commerce - Production Deployment Script (Linux/Mac)
# This script builds and prepares the application for deployment

set -e

echo ""
echo "========================================"
echo "Dhanjo E-Commerce Deployment Script"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "[1/5] Checking dependencies..."

if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
else
    echo "Frontend dependencies already installed."
fi

if [ ! -d "backend/node_modules" ]; then
    echo "Installing backend dependencies..."
    cd backend
    npm install
    cd ..
else
    echo "Backend dependencies already installed."
fi

echo ""
echo "[2/5] Building frontend..."
npm run build
if [ $? -ne 0 ]; then
    echo "ERROR: Frontend build failed!"
    exit 1
fi
echo "Frontend built successfully!"

echo ""
echo "[3/5] Checking environment files..."

if [ ! -f ".env" ]; then
    echo "Creating .env file from template..."
    cp .env.example .env
    echo "NOTE: Edit .env with your production settings"
fi

if [ ! -f "backend/.env" ]; then
    echo "Creating backend/.env file from template..."
    cp backend/.env.example backend/.env
    echo "NOTE: Edit backend/.env with your production settings"
fi

echo ""
echo "[4/5] Generating deployment report..."

cat > DEPLOYMENT_REPORT.md << 'EOF'
# Deployment Report
Generated: $(date)

## Build Status: ✅ SUCCESS

## Files Ready for Deployment
- Frontend build: dist/
- Backend: backend/src/
- Package files: package.json, backend/package.json

## Next Steps
1. Edit .env with production frontend URL
2. Edit backend/.env with production settings
3. Choose deployment platform:
   - Vercel (Frontend): https://vercel.com
   - Render.com (Backend): https://render.com
   - or self-host on VPS/EC2
4. Follow DEPLOYMENT_GUIDE.md for detailed instructions

## Key Files
- Frontend distribution: dist/
- Backend source: backend/src/
- Environment template: .env.example, backend/.env.example
- Deployment guide: DEPLOYMENT_GUIDE.md
EOF

echo "Deployment report created: DEPLOYMENT_REPORT.md"

echo ""
echo "[5/5] Ready for deployment!"
echo ""
echo "========================================"
echo "Deployment Checklist:"
echo "========================================"
echo "[✓] Frontend built (dist/ folder ready)"
echo "[ ] Environment variables configured"
echo "[ ] Database setup complete"
echo "[ ] Choose hosting platform"
echo "[ ] Deploy frontend"
echo "[ ] Deploy backend"
echo "[ ] Configure domain DNS"
echo "[ ] Enable HTTPS/SSL"
echo ""
echo "For detailed instructions, see: DEPLOYMENT_GUIDE.md"
echo ""
