# 🚀 Deployment Guide

This folder contains the complete deployable web application. No build process required!

## 📁 Contents
- `index.html` - Main interactive roadmap application
- `roadmap_data.json` - Curriculum data (auto-generated from markdown)

## ⚡ Quick Deploy Options

### 1. GitHub Pages (Best for Portfolio)
```bash
# From project root
git subtree push --prefix=app origin gh-pages
# App live at: https://yourusername.github.io/repo-name
```

### 2. Netlify (30 seconds)
1. Go to [netlify.com/drop](https://app.netlify.com/drop)
2. Drag this `app/` folder to the deploy area
3. Get instant URL: `https://random-name.netlify.app`

### 3. Vercel
1. Connect your GitHub repo at [vercel.com](https://vercel.com)
2. Set **Root Directory** to `app`
3. Deploy automatically on every push

### 4. GitHub Codespaces/GitPod
1. Open repository in Codespaces
2. Run: `cd app && python3 -m http.server 8000`
3. Forward port 8000 for public access

## 🌐 Custom Domain

Add a `CNAME` file to this directory:
```bash
echo "yourdomain.com" > CNAME
```

## 🔧 Requirements
- **None!** Pure HTML/CSS/JS with CDN dependencies
- Works in any modern browser
- Mobile responsive
- No server-side processing needed

## 📊 Performance
- **Load time**: <2 seconds
- **Bundle size**: ~60KB total
- **Dependencies**: All loaded from CDN
- **Offline**: Cached after first visit

## 🎯 Domain Suggestions
- `yourname-ml-roadmap.netlify.app`
- `ml-faang-prep.vercel.app`  
- `ai-enhanced-roadmap.github.io`

**Ready to deploy? Just upload this folder to any static hosting service!** 