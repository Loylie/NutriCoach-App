# 🚀 NutriCoach Deployment Handleiding

Deze handleiding helpt je stap voor stap om de NutriCoach webapp online te krijgen.

## 📋 Checklist Voordat Je Begint

- [ ] GitHub account aangemaakt
- [ ] Netlify account aangemaakt (gekoppeld aan GitHub)
- [ ] OpenAI API sleutel verkregen
- [ ] Project bestanden gedownload

## 🔄 Stap 1: Project Uploaden naar GitHub

### 1.1 Ga naar je GitHub Repository
1. Open je browser en ga naar [github.com](https://github.com)
2. Log in met je account
3. Ga naar je `NutriCoach-App` repository

### 1.2 Upload Project Bestanden
1. **Klik op "uploading an existing file"** (of "Add file" → "Upload files")
2. **Sleep alle project bestanden** naar de upload zone:
   ```
   - frontend/ (hele map)
   - netlify/ (hele map)
   - netlify.toml
   - package.json
   - README.md
   - .env.example
   - .gitignore
   - DEPLOYMENT.md
   ```
3. **Scroll naar beneden** en vul in:
   - Commit message: `Initial NutriCoach setup`
   - Description: `Complete webapp with React frontend and Netlify Functions backend`
4. **Klik op "Commit changes"**

### 1.3 Controleer Upload
- Alle bestanden en mappen moeten zichtbaar zijn in je repository
- De README.md wordt automatisch getoond onderaan

## 🌐 Stap 2: Netlify Deployment

### 2.1 Nieuwe Site Aanmaken
1. **Ga naar [netlify.com](https://netlify.com)** en log in
2. **Klik op "Add new site"** (grote groene knop)
3. **Selecteer "Import an existing project"**
4. **Kies "Deploy with GitHub"**

### 2.2 Repository Selecteren
1. **Autoriseer Netlify** om toegang te krijgen tot je GitHub (als gevraagd)
2. **Zoek en selecteer** je `NutriCoach-App` repository
3. **Klik op de repository naam** om door te gaan

### 2.3 Build Instellingen Configureren
**Belangrijk**: Vul deze instellingen exact in:

```
Site name: nutricoach-[jouw-naam] (optioneel, mag je aanpassen)
Branch to deploy: main (of master)
Build command: cd frontend && npm run build
Publish directory: frontend/dist
Functions directory: netlify/functions
```

### 2.4 Eerste Deployment
1. **Klik op "Deploy site"**
2. **Wacht 2-5 minuten** terwijl Netlify je site bouwt
3. Je ziet een **gele status** (building) die **groen** wordt (published)

## 🔑 Stap 3: Environment Variables Instellen

### 3.1 Ga naar Site Settings
1. **Klik op "Site settings"** (in je Netlify dashboard)
2. **Ga naar "Environment variables"** in het linkermenu
3. **Klik op "Add a variable"**

### 3.2 Voeg Variables Toe
Voeg deze variabelen één voor één toe:

**Variable 1:**
```
Key: OPENAI_API_KEY
Value: [jouw OpenAI API sleutel - begint met sk-]
```

**Variable 2:**
```
Key: JWT_SECRET
Value: nutricoach-super-secret-key-2024-change-this
```

**Variable 3:**
```
Key: NODE_ENV
Value: production
```

### 3.3 Redeploy Site
1. **Ga naar "Deploys"** tab
2. **Klik op "Trigger deploy"** → "Deploy site"
3. **Wacht tot deployment compleet is** (groen vinkje)

## ✅ Stap 4: Testen

### 4.1 Open Je Website
1. **Klik op je site URL** (bijv. `https://amazing-name-123456.netlify.app`)
2. Je zou de **NutriCoach welcome pagina** moeten zien

### 4.2 Test API Verbinding
1. **Klik op "Test API Verbinding"** knop
2. **Open browser console** (F12 → Console tab)
3. Je zou een **succesbericht** moeten zien: `API Test: {message: "NutriCoach API is online! 🥗"}`

### 4.3 Test AI Chat
1. **Klik op "Start je reis"**
2. **Typ een vraag** zoals: "Wat moet ik ontbijten?"
3. **Druk Enter** of klik de verzend knop
4. Je zou een **AI antwoord** moeten krijgen binnen 10 seconden

## 🔧 Troubleshooting

### ❌ "Build failed" Error
**Probleem**: Netlify kan je site niet bouwen

**Oplossingen**:
1. **Controleer build command**: Moet zijn `cd frontend && npm run build`
2. **Controleer publish directory**: Moet zijn `frontend/dist`
3. **Check je bestanden**: Zorg dat de `frontend/` map correct is geüpload

### ❌ "API not working" Error
**Probleem**: API endpoints geven errors

**Oplossingen**:
1. **Check Environment Variables**: 
   - OPENAI_API_KEY moet beginnen met `sk-`
   - Geen spaties voor of na de waarden
2. **Check Functions Directory**: Moet zijn `netlify/functions`
3. **Redeploy**: Trigger een nieuwe deployment na het toevoegen van env vars

### ❌ "OpenAI API Error"
**Probleem**: AI chat werkt niet

**Mogelijke oorzaken**:
1. **Ongeldige API Key**: Check je OpenAI account en genereer nieuwe key
2. **Quota overschreden**: Check je OpenAI usage dashboard
3. **Billing niet ingesteld**: Zorg dat je een payment method hebt in OpenAI

### ❌ "Site not loading"
**Probleem**: Website toont niet correct

**Oplossingen**:
1. **Hard refresh**: Ctrl+F5 (Windows) of Cmd+Shift+R (Mac)
2. **Check browser console**: F12 → Console voor error berichten
3. **Try incognito mode**: Test in private browsing

## 📱 Mobiel Testen

Test je site op verschillende apparaten:
- **Desktop**: Chrome, Firefox, Safari
- **Mobiel**: iPhone Safari, Android Chrome
- **Tablet**: iPad, Android tablet

## 🔄 Updates Maken

Voor toekomstige updates:

1. **Wijzig bestanden** in je GitHub repository
2. **Commit changes** met een duidelijke beschrijving
3. **Netlify detecteert automatisch** de wijziging
4. **Nieuwe deployment start** binnen 1 minuut
5. **Site is bijgewerkt** binnen 2-5 minuten

## 🎉 Success!

Als alles werkt:
- ✅ Website laadt correct
- ✅ API test slaagt
- ✅ AI chat geeft antwoorden
- ✅ Responsive design werkt op mobiel

**Gefeliciteerd! Je NutriCoach webapp is nu live! 🥗**

## 📞 Hulp Nodig?

Als je vastloopt:
1. **Check deze troubleshooting gids** nogmaals
2. **Kijk in Netlify deploy logs** voor specifieke errors
3. **Test individuele API endpoints** met browser developer tools
4. **Controleer alle environment variables** op typos

---

*Happy coaching! 🌱*

