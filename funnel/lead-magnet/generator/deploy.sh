#!/bin/bash

# Sleep Blueprint Generator Deployment Script
# Usage: ./deploy.sh [platform]

set -e  # Exit on error

PLATFORM=${1:-"vercel"}
PROJECT_DIR="/Users/jmodigital/clawd/projects/utility-website-portfolio/sleepsmarter.io/funnel/lead-magnet/generator"
DEPLOY_DIR="$PROJECT_DIR/deploy"

echo "🚀 Deploying Sleep Blueprint Generator to $PLATFORM..."

# Check if we're in the right directory
if [ ! -f "$PROJECT_DIR/package.json" ]; then
    echo "❌ Error: Not in the generator directory"
    exit 1
fi

# Create deployment directory
echo "📁 Preparing deployment package..."
rm -rf "$DEPLOY_DIR"
mkdir -p "$DEPLOY_DIR"

# Copy necessary files
cp -r "$PROJECT_DIR/index.js" "$DEPLOY_DIR/"
cp -r "$PROJECT_DIR/server-enhanced.js" "$DEPLOY_DIR/"
cp -r "$PROJECT_DIR/package.json" "$DEPLOY_DIR/"
cp -r "$PROJECT_DIR/package-lock.json" "$DEPLOY_DIR/"
cp -r "$PROJECT_DIR/.env.example" "$DEPLOY_DIR/"
cp -r "$PROJECT_DIR/test.js" "$DEPLOY_DIR/"
cp -r "$PROJECT_DIR/../template.html" "$DEPLOY_DIR/"

# Create generated directory for PDFs
mkdir -p "$DEPLOY_DIR/../generated"

# Create README for deployment
cat > "$DEPLOY_DIR/README.md" << EOF
# Sleep Blueprint Generator

This service generates personalized sleep blueprints as PDFs.

## Endpoints

- \`GET /health\` - Health check
- \`GET /test\` - Generate test PDF
- \`POST /webhook/kit\` - Kit webhook endpoint
- \`POST /generate\` - Direct PDF generation
- \`GET /blueprint/:referenceId\` - Download blueprint

## Environment Variables

See \`.env.example\` for required variables.

## Deployment

Deployed via $PLATFORM

## Local Development

\`\`\`bash
npm install
npm run dev
\`\`\`
EOF

echo "✅ Deployment package created at: $DEPLOY_DIR"

# Platform-specific deployment
case $PLATFORM in
    "vercel")
        echo "🌐 Deploying to Vercel..."
        
        # Create Vercel config
        cat > "$DEPLOY_DIR/vercel.json" << EOF
{
  "version": 2,
  "builds": [
    {
      "src": "server-enhanced.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server-enhanced.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
EOF
        
        echo "📦 Vercel configuration created"
        echo ""
        echo "📋 Next steps:"
        echo "1. cd $DEPLOY_DIR"
        echo "2. vercel login"
        echo "3. vercel --prod"
        ;;
    
    "railway")
        echo "🚂 Deploying to Railway..."
        
        # Create Railway config
        cat > "$DEPLOY_DIR/railway.toml" << EOF
[build]
builder = "nixpacks"
  
[deploy]
startCommand = "npm start"
  
[[services]]
port = 3001
EOF
        
        echo "📦 Railway configuration created"
        echo ""
        echo "📋 Next steps:"
        echo "1. Install Railway CLI: npm i -g @railway/cli"
        echo "2. cd $DEPLOY_DIR"
        echo "3. railway login"
        echo "4. railway init"
        echo "5. railway up"
        ;;
    
    "render")
        echo "🎨 Deploying to Render..."
        
        # Create Render config
        cat > "$DEPLOY_DIR/render.yaml" << EOF
services:
  - type: web
    name: sleep-blueprint-generator
    env: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 3001
    healthCheckPath: /health
EOF
        
        echo "📦 Render configuration created"
        echo ""
        echo "📋 Next steps:"
        echo "1. Push to GitHub: git push origin main"
        echo "2. Connect repo at render.com"
        echo "3. Set environment variables"
        ;;
    
    *)
        echo "❌ Unknown platform: $PLATFORM"
        echo "Available platforms: vercel, railway, render"
        exit 1
        ;;
esac

echo ""
echo "🎉 Deployment package ready!"
echo "📁 Location: $DEPLOY_DIR"
echo ""
echo "🔧 Remember to:"
echo "1. Set environment variables (.env in production)"
echo "2. Configure Kit webhook to your deployed URL"
echo "3. Test the complete flow"
echo "4. Monitor logs for errors"