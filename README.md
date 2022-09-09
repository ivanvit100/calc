![preview](https://calc.ivanvit.ru/static/preview.png)
# Functionally WEB-based calculator

---

## Links
You may find this on the [site](https://calc.ivanvit.ru)

## Functionality
1. Basic calculator
2. Dark/light themes
3. Math functions (sin, cos, log etc.)
4. PWA (offline mode)

## Plans
1. Create programming calculator
2. Currency converter

## Technologies
1. Vue.js
2. SCSS
3. PWA
4. Fetch API

## Build Setup

``` bash
# Install vue-cli 
npm install --location=global vue-cli

# Create vue-cli project
vue init pwa calc

# Install dependencies
npm install

# Copy repository
git clone https://github.com/ivanvit100/calc

# Serve with hot reload at localhost:8080
npm run dev

# Build for production with minification
npm run build

# Build for production and view the bundle analyzer report
npm run build --report

# Run unit tests
npm run unit

# Run e2e tests
npm run e2e

# Run all tests
npm test

# Push main branch
git push

# Push for the GitHub Pages
git add -f dist && git commit -m "Commit name"
git subtree push --prefix=dist origin gh-pages
``