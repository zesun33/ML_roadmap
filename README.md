# 🚀 AI-Enhanced ML-FAANG Mastery Plan

A comprehensive 20-week learning management system for ML researchers transitioning to FAANG software engineering roles, featuring an interactive web application with AI integration.

## 📁 Project Structure

```
ML_roadmap/
├── app/                    # 🌐 Deployable Web Application
│   ├── index.html         # Interactive roadmap web app (ready for hosting)
│   └── roadmap_data.json  # Structured curriculum data
├── docs/                   # 📚 Documentation & Core Materials  
│   ├── AI_Enhanced_ML_FAANG_Mastery_Plan.md  # Main 20-week roadmap
│   └── INTERACTIVE_ROADMAP_README.md         # App usage guide
├── research/              # 🔬 Alternative Roadmap Analysis
│   ├── 16_week_interview_roadmap.md
│   ├── ML_Research_to_FAANG_Complete_Study_Plan.md
│   ├── SOFTWARE_ENGINEERING_ROADMAP.md
│   └── THE_DEFINITIVE_ROADMAP.md
├── tools/                 # 🛠️ Development Scripts
│   └── roadmap_parser.py  # Converts markdown to JSON
└── README.md             # This file
```

## 🎯 Quick Start

### 1. Interactive App (Local)
```bash
cd app/
python3 -m http.server 8000
# Open http://localhost:8000 in browser
```

### 2. Deploy to Web
The `app/` folder is ready for deployment to:
- **GitHub Pages**: Push `app/` contents to `gh-pages` branch
- **Netlify**: Drag `app/` folder to netlify.com/drop  
- **Vercel**: Connect repo and set root directory to `app/`

## 🌟 Features

### Interactive Learning Management System
- ✅ **20-Week Structured Curriculum** with 5 phases
- ✅ **AI-Enhanced Learning** with Claude, GPT-4, Cursor integration
- ✅ **Progress Tracking** with localStorage persistence
- ✅ **Study Timer** with 90-minute focus sessions
- ✅ **Company-Specific Prep** for Google, Meta, Amazon, Microsoft, Apple
- ✅ **500+ Coding Problems** systematically organized

### Technical Architecture  
- ✅ **Single-File Deployment** (no build process required)
- ✅ **CDN Dependencies** (TailwindCSS, Alpine.js, Font Awesome)
- ✅ **Mobile Responsive** design
- ✅ **Real-time Progress** calculation and visualization
- ✅ **AI Prompt Integration** with copy-to-clipboard functionality

## 🚀 Deployment Guide

### GitHub Pages (Recommended for Portfolio)
```bash
# From app/ directory
git subtree push --prefix=app origin gh-pages
# App will be live at: https://username.github.io/repo-name
```

### Netlify (Fastest)
1. Go to [netlify.com/drop](https://app.netlify.com/drop)
2. Drag the `app/` folder
3. Get instant live URL: `https://random-name.netlify.app`

### Custom Domain
- Add `CNAME` file to `app/` with your domain
- Configure DNS to point to hosting provider

## 🛠️ Development

### Update Curriculum Data
```bash
cd tools/
python roadmap_parser.py
# Regenerates roadmap_data.json from markdown files
```

### Local Development Server
```bash
cd app/
python3 -m http.server 8000
# Or use VS Code Live Server extension
```

## 📊 Progress Tracking

The app automatically tracks:
- **Session Completions** (persistent across browser sessions)
- **Study Time** with built-in 90-minute Pomodoro timer
- **Weekly Progress** across all 20 weeks
- **Phase Completion** with visual progress rings
- **AI Interaction History** for personalized learning

## 🤖 AI Integration

### Supported AI Platforms
- **Cursor Pro** - Code review and pair programming
- **Claude Sonnet** - Technical explanations and problem solving  
- **GPT-4** - Interview practice and system design
- **Gemini** - Alternative perspectives and verification

### Pre-built Prompts
Each week includes specific AI prompts for:
- Problem-solving guidance
- Mock interview practice  
- Learning strategy optimization
- Code review and feedback

## 🎯 Learning Methodology

### 5-Phase Structure
1. **Foundation** (Weeks 1-4): Python mastery + fundamental DS&A
2. **Patterns** (Weeks 5-8): Core algorithmic patterns  
3. **Advanced** (Weeks 9-12): Complex algorithms + ML foundations
4. **Systems** (Weeks 13-16): System design + MLOps
5. **Integration** (Weeks 17-20): Interview prep + portfolio polish

### Daily Routine
- **90-minute focused sessions** with built-in timer
- **AI-enhanced learning** with personalized prompts
- **Progress tracking** with completion milestones
- **Company-specific preparation** targeting top tech firms

## 🔗 Related Projects

This roadmap synthesizes insights from:
- Traditional CS curriculum approaches
- Industry-standard interview preparation
- ML-specific transition strategies  
- AI-enhanced learning methodologies

## 📈 Success Metrics

Target outcomes after 20 weeks:
- **300+ LeetCode problems** solved across all difficulty levels
- **System design competency** for distributed ML systems
- **Portfolio projects** demonstrating full-stack capabilities
- **Interview readiness** for senior SWE roles at FAANG companies

## 🤝 Contributing

1. Update roadmap content in `docs/`
2. Regenerate JSON with `tools/roadmap_parser.py`
3. Test changes locally in `app/`
4. Submit PR with both content and generated data

## 📄 License

Open source educational content - feel free to adapt for your learning journey!

---

**🎯 Ready to transform your ML expertise into FAANG-level software engineering skills?**  
**Start your 20-week journey today!** 