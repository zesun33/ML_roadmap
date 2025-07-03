#!/bin/bash

# 🚀 Enhanced ML Roadmap - Deploy to Main Branch
# This script helps deploy the enhanced features to the main branch with proper commit messages

echo "🔍 Checking current git status..."

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Error: Not in a git repository"
    exit 1
fi

# Check current branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
echo "📍 Current branch: $CURRENT_BRANCH"

# Function to commit and push changes
commit_and_push() {
    local commit_message="$1"
    local branch="$2"
    
    echo "📝 Adding changes..."
    git add .
    
    echo "💾 Committing with message: $commit_message"
    git commit -m "$commit_message"
    
    echo "🚀 Pushing to $branch..."
    git push origin "$branch"
    
    echo "✅ Successfully deployed to $branch!"
}

# Check if we're on development branch
if [ "$CURRENT_BRANCH" = "development" ]; then
    echo "✅ On development branch - ready to deploy"
    
    # Ask for deployment type
    echo ""
    echo "Choose deployment option:"
    echo "1. Deploy to main branch (production)"
    echo "2. Update development branch"
    echo "3. Check status only"
    read -p "Enter choice (1-3): " choice
    
    case $choice in
        1)
            echo "🔄 Switching to main branch..."
            git checkout main
            git pull origin main
            
            echo "🔀 Merging development into main..."
            git merge development
            
            commit_and_push "feat: Deploy enhanced ML roadmap with analytics, PWA, and advanced features

- Add comprehensive analytics dashboard with Chart.js integration
- Implement export/import functionality for progress backup/restore  
- Add interactive study calendar system with monthly view
- Enable Progressive Web App (PWA) features for mobile installation
- Enhance AI integration with modal dialogs and batch operations
- Implement advanced navigation with 4-tab system
- Add Pomodoro timer with session tracking and persistence
- Optimize responsive design for all device sizes
- Include comprehensive testing suite and documentation

This update transforms the basic roadmap into a full learning management system." "main"
            ;;
        2)
            commit_and_push "refactor: Update enhanced features and improve user experience

- Refine analytics calculations and chart rendering
- Improve export/import data validation
- Enhance calendar navigation and day selection
- Optimize PWA performance and caching
- Update AI prompt generation and copy functionality
- Polish UI components and responsive design
- Add comprehensive testing and validation" "development"
            ;;
        3)
            echo "📊 Git Status:"
            git status --porcelain
            echo ""
            echo "📈 Recent commits:"
            git log --oneline -5
            ;;
        *)
            echo "❌ Invalid choice"
            exit 1
            ;;
    esac
    
elif [ "$CURRENT_BRANCH" = "main" ]; then
    echo "⚠️  Currently on main branch"
    echo "Consider switching to development branch for testing before deploying to main"
    
    commit_and_push "update: Production deployment of enhanced ML roadmap features" "main"
    
else
    echo "📍 On branch: $CURRENT_BRANCH"
    echo "ℹ️  This script is optimized for development->main workflow"
    
    commit_and_push "update: Enhanced ML roadmap improvements" "$CURRENT_BRANCH"
fi

echo ""
echo "🌐 Deployment URLs:"
echo "   Production:   https://zesun33.github.io/ML_roadmap/"
echo "   Development:  https://ml-roadmap.netlify.app/"
echo ""
echo "🧪 Local testing: http://localhost:8080"
echo "📋 Test guide:   ./tests/quick_test.md" 