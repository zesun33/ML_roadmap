# 🛠️ Tools Directory

This directory contains utility scripts and tools for the ML Roadmap project.

## 📁 Contents

### `deploy_to_main.sh`
Deployment script for pushing changes to GitHub with proper commit messages.

**Usage:**
```bash
# Make executable first (only needed once)
chmod +x tools/deploy_to_main.sh

# Run deployment script
./tools/deploy_to_main.sh
```

**Features:**
- ✅ Automated git commit with detailed changelog
- ✅ Support for development → main branch workflow  
- ✅ Proper commit message formatting
- ✅ Push to both GitHub Pages and Netlify
- ✅ Status checking and validation

**Options:**
1. **Deploy to main branch** - Merges development into main for production
2. **Update development branch** - Commits changes to development
3. **Check status only** - View git status and recent commits

### `roadmap_parser.py`
Python utility for parsing and processing roadmap data.

**Usage:**
```bash
python3 tools/roadmap_parser.py
```

## 🚀 Quick Deployment Workflow

1. **Test locally:** http://localhost:8080
2. **Run tests:** Open `tests/quick_test.md` checklist
3. **Deploy:** `./tools/deploy_to_main.sh`
4. **Verify:** Check live sites at deployment URLs

## 📋 Related Files

- **Testing Guide:** `tests/quick_test.md`
- **Enhancement Docs:** `docs/ENHANCEMENT_SUMMARY.md`
- **Main App:** `app/index.html`

---

**💡 Tip:** Always test locally before deploying to production! 