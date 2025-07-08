# 🚀 Deployment Guide

This guide covers how to deploy and maintain the ML Roadmap application across multiple platforms.

## 🌟 **Current Deployment Status**

### **✅ Production Deployments**
- **Primary (Netlify)**: [https://ml-roadmap.netlify.app/](https://ml-roadmap.netlify.app/)
- **Secondary (GitHub Pages)**: [https://zesun33.github.io/ML_roadmap/](https://zesun33.github.io/ML_roadmap/)
- **Status**: Both platforms synchronized and operational
- **Auto-Deployment**: ✅ GitHub Actions workflow active

---

## 🔧 **Deployment Architecture**

### **Repository Structure**
```
ML_roadmap/
├── app/                    # 📱 Production application files
│   ├── index.html         # Main application
│   ├── style.css          # Styling
│   ├── script.js          # Application logic
│   ├── roadmap_data/      # JSON data files (weeks 1-20)
│   └── _redirects         # Netlify SPA routing
├── .github/workflows/     # 🤖 GitHub Actions automation
│   └── deploy.yml         # Deployment workflow
├── netlify.toml           # Netlify configuration
└── scripts/               # 🛠️ Automation and verification
```

### **Deployment Flow**
1. **Development**: Make changes in `development` branch
2. **Testing**: Local testing with `python3 -m http.server 8000`
3. **Merge**: Merge `development` → `main`
4. **Auto-Deploy**: GitHub Actions triggers deployment to both platforms

---

## 🔄 **Automated Deployment (GitHub Actions)**

### **Current Workflow**
The deployment is fully automated via `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      
    - name: Setup Git
      run: |
        git config --global user.name 'GitHub Actions'
        git config --global user.email 'actions@github.com'
        
    - name: Deploy to gh-pages
      run: |
        git checkout --orphan gh-pages-temp
        cp -r app/. .
        rm -rf app/ docs/ scripts/ ...
        git add .
        git commit -m "Deploy: $(date)"
        git branch -D gh-pages || true
        git branch -m gh-pages
        git push -f origin gh-pages
```

### **Trigger Conditions**
- **Automatic**: Any push to `main` branch
- **Manual**: Can be triggered via GitHub Actions tab
- **Verification**: Includes automated deployment testing

---

## 🌐 **Platform-Specific Configuration**

### **1. Netlify Deployment**

#### **Configuration** (`netlify.toml`)
```toml
[build]
  base = "app"
  publish = "app" 
  command = "echo 'Static deployment - no build needed'"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
```

#### **Features**
- ✅ **Automatic deployment** from GitHub `main` branch
- ✅ **SPA routing** via `_redirects` file
- ✅ **Security headers** for production
- ✅ **Custom domain** support ready

#### **Setup Steps**
1. Connect GitHub repository to Netlify
2. Set build directory: `app`
3. Deploy from `main` branch
4. Netlify automatically uses `netlify.toml` configuration

### **2. GitHub Pages Deployment**

#### **Configuration**
- **Source**: `gh-pages` branch (auto-generated)
- **Path**: `/` (root)
- **Custom domain**: Not configured (using default)

#### **Features**
- ✅ **Automatic deployment** via GitHub Actions
- ✅ **HTTPS enforcement** by default  
- ✅ **CDN distribution** globally
- ✅ **Zero configuration** required

#### **Setup Steps**
1. GitHub Actions workflow handles everything automatically
2. No manual configuration needed
3. Pages automatically enabled on `gh-pages` branch

---

## 🧪 **Local Development & Testing**

### **Quick Local Setup**
```bash
# Navigate to project root
cd /path/to/ML_roadmap

# Start local server in app directory
cd app
python3 -m http.server 8000

# Alternative: use different port if 8000 is busy
python3 -m http.server 8080
```

### **Local Testing Checklist**
- [ ] ✅ **App loads**: `http://localhost:8000`
- [ ] ✅ **Week navigation**: All weeks 1-20 accessible
- [ ] ✅ **Problem links**: LeetCode/NeetCode links working
- [ ] ✅ **AI prompts**: Copy-to-clipboard functionality
- [ ] ✅ **Mobile responsive**: Test on different screen sizes
- [ ] ✅ **Timer functionality**: Study timer works correctly

### **Verification Scripts**
```bash
# Verify NeetCode coverage
python3 scripts/neetcode_verifier.py

# Test deployments
python3 scripts/verify_deployments.py
```

---

## 🔧 **Manual Deployment (Fallback)**

### **Emergency Deployment to GitHub Pages**
```bash
# If automated deployment fails
git checkout main
git pull origin main

# Create manual gh-pages deployment
git checkout --orphan gh-pages-manual
cp -r app/. .
rm -rf app/ docs/ scripts/ research/ tools/ practice/
rm README.md .gitignore netlify.toml ML_roadmap.code-workspace

# Commit and deploy
git add .
git commit -m "Manual deployment: $(date)"
git push -f origin gh-pages-manual:gh-pages
```

### **Manual Netlify Deployment**
1. **Drag & Drop**: Upload `app/` folder contents to Netlify dashboard
2. **GitHub Reconnect**: Reconnect repository in Netlify settings if needed
3. **Manual Trigger**: Use Netlify "Trigger deploy" button

---

## 📊 **Deployment Monitoring**

### **Health Checks**
Regular verification ensures both deployments stay functional:

```python
# Automated health check (scripts/verify_deployments.py)
deployments = {
    "GitHub Pages": "https://zesun33.github.io/ML_roadmap/",
    "Netlify": "https://ml-roadmap.netlify.app/"
}

# Tests:
# - HTTP 200 response
# - HTML content validation
# - CSS/JS asset loading
# - JSON data accessibility
```

### **Monitoring Metrics**
- **Uptime**: 99.9% target across both platforms
- **Load Time**: <2 seconds for initial page load
- **Mobile Performance**: Lighthouse score >90
- **Link Validity**: 100% working external links

---

## 🛠️ **Maintenance Tasks**

### **Weekly Maintenance**
- [ ] **Verify deployments**: Run `scripts/verify_deployments.py`
- [ ] **Check link health**: Run `scripts/neetcode_verifier.py`
- [ ] **Monitor performance**: Check Lighthouse scores
- [ ] **Review analytics**: Check usage via Netlify analytics

### **Monthly Maintenance**
- [ ] **Update dependencies**: Review any external CDN dependencies
- [ ] **Security audit**: Review security headers and configurations
- [ ] **Backup verification**: Ensure repository backup is current
- [ ] **Documentation update**: Keep deployment docs current

### **Quarterly Reviews**
- [ ] **Platform evaluation**: Assess continued use of both platforms
- [ ] **Performance optimization**: Review and optimize load times
- [ ] **Feature roadmap**: Plan any deployment infrastructure improvements

---

## 🚨 **Troubleshooting**

### **Common Issues**

#### **1. GitHub Actions Deployment Failing**
```bash
# Check workflow status
# Go to GitHub → Actions tab → View failed workflow

# Common fixes:
# - Ensure main branch has latest changes
# - Check file permissions in repository
# - Verify app/ directory contains all necessary files
```

#### **2. Netlify Build Errors**  
```bash
# Check Netlify deploy logs in dashboard
# Common issues:
# - netlify.toml syntax errors
# - Missing app/ directory files
# - Incorrect build settings

# Fix: Update netlify.toml or rebuild from GitHub
```

#### **3. 404 Errors on Deployed Sites**
```bash
# For SPA routing issues:
# Ensure _redirects file exists in app/
# Content: /* /index.html 200

# For missing assets:
# Verify all CSS/JS files are in app/ directory
# Check file paths in index.html
```

#### **4. Local Testing Port Conflicts**
```bash
# If port 8000 is busy:
python3 -m http.server 8080
python3 -m http.server 9000

# Find what's using port:
lsof -ti:8000
kill $(lsof -ti:8000)  # If needed
```

---

## 🔐 **Security Considerations**

### **Current Security Measures**
- ✅ **HTTPS enforcement** on both platforms
- ✅ **Security headers** (XSS protection, CSRF, etc.)
- ✅ **No sensitive data** in repository
- ✅ **Static content only** (no server-side vulnerabilities)

### **Best Practices**
- **Keep dependencies minimal**: Only essential external resources
- **Regular security audits**: Review third-party links and CDNs
- **Access control**: Limit repository write access
- **Backup strategy**: Multiple deployment platforms for redundancy

---

## 📈 **Performance Optimization**

### **Current Optimizations**
- ✅ **Lightweight architecture**: Pure HTML/CSS/JS
- ✅ **Minimal dependencies**: No heavy frameworks
- ✅ **CDN delivery**: Both platforms use global CDNs
- ✅ **Caching headers**: Appropriate cache control

### **Future Optimizations**
- [ ] **Image optimization**: Compress any images added
- [ ] **JavaScript minification**: Consider for production builds
- [ ] **CSS optimization**: Remove unused styles
- [ ] **Progressive loading**: Load week data on demand

---

*Last Updated: December 28, 2024*
*Deployment Status: ✅ Production Ready* 