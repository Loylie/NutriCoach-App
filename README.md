# 🥗 NutriCoach - AI Voedingscoach Webapp

Een moderne, vriendelijke webapp voor gepersonaliseerde voedingscoaching met AI-ondersteuning.

## ✨ Features

- 🤖 **AI Chat Coach** - Persoonlijk voedingsadvies via GPT-4o
- 👤 **Gebruikersbeheer** - Registratie, login en profielbeheer
- 📊 **Voortgang Tracking** - Gewicht, stemming en energie monitoring
- 🍽️ **Slimme Maaltijdplanning** - AI-gegenereerde menu's en recepten
- 🏋️ **Fitness Plannen** - Gepersonaliseerde trainingsschema's
- 🧘 **Mindfulness** - Journaling en mentale ondersteuning
- 📱 **Responsive Design** - Werkt perfect op mobiel en desktop
- 🎨 **Vriendelijke Groene UI** - Moderne, toegankelijke interface

## 🛠️ Tech Stack

- **Frontend**: React.js + TailwindCSS + shadcn/ui
- **Backend**: Netlify Functions (Serverless)
- **AI**: OpenAI GPT-4o API
- **Database**: MongoDB (klaar voor integratie)
- **Authenticatie**: JWT + bcrypt
- **Deployment**: Netlify (volledig geautomatiseerd)

## 🚀 Snelle Start

### Stap 1: Project Uploaden naar GitHub

1. **Download dit project** als ZIP-bestand
2. **Pak het uit** op je computer
3. **Ga naar je GitHub repository** (`NutriCoach-App`)
4. **Upload alle bestanden**:
   - Klik op "uploading an existing file"
   - Sleep alle bestanden en mappen naar de upload zone
   - Commit met bericht: "Initial NutriCoach setup"

### Stap 2: Netlify Deployment

1. **Ga naar je Netlify dashboard** ([netlify.com](https://netlify.com))
2. **Klik op "Add new site"** → "Import an existing project"
3. **Selecteer GitHub** en kies je `NutriCoach-App` repository
4. **Deployment instellingen**:
   - Build command: `cd frontend && npm run build`
   - Publish directory: `frontend/dist`
   - Functions directory: `netlify/functions`
5. **Klik op "Deploy site"**

### Stap 3: Environment Variables Instellen

Na de eerste deployment:

1. **Ga naar Site settings** → **Environment variables**
2. **Voeg toe**:
   ```
   OPENAI_API_KEY = [jouw OpenAI API sleutel]
   JWT_SECRET = nutricoach-super-secret-key-2024
   NODE_ENV = production
   ```
3. **Redeploy** de site (Deploys → Trigger deploy)

### Stap 4: Testen

1. **Open je Netlify URL** (bijv. `https://amazing-name-123456.netlify.app`)
2. **Test de API** met de "Test API Verbinding" knop
3. **Probeer de AI chat** met vragen zoals:
   - "Wat moet ik ontbijten voor gezond afvallen?"
   - "Geef me een weekmenu voor vegetariërs"
   - "Hoe kan ik meer energie krijgen?"

## 🔧 Lokale Ontwikkeling

Voor verdere ontwikkeling op je eigen computer:

```bash
# Installeer dependencies
npm run install-all

# Start development server
npm run dev

# Of alleen frontend
cd frontend && npm run dev
```

De app draait dan op `http://localhost:5173`

## 📁 Project Structuur

```
NutriCoach-App/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # UI componenten
│   │   ├── App.jsx         # Hoofdapplicatie
│   │   └── App.css         # Groene styling
│   ├── index.html          # HTML template
│   └── package.json        # Frontend dependencies
├── netlify/
│   └── functions/          # Backend API functies
│       ├── hello.js        # Test endpoint
│       ├── ai-chat.js      # AI chat functionaliteit
│       └── auth.js         # Authenticatie
├── netlify.toml            # Netlify configuratie
├── package.json            # Root dependencies
└── README.md              # Deze handleiding
```

## 🔌 API Endpoints

De backend biedt de volgende endpoints:

- `GET /api/hello` - Test endpoint
- `POST /api/ai-chat` - AI coach chat
- `POST /api/auth/login` - Gebruiker login
- `POST /api/auth/register` - Nieuwe gebruiker registratie
- `GET /api/auth/profile` - Gebruikersprofiel ophalen

## 🎨 Design System

### Kleuren
- **Primair Groen**: `#81c784` (vriendelijk en natuurlijk)
- **Achtergrond**: Zachte groene gradiënten
- **Tekst**: Donkergroene tinten voor leesbaarheid
- **Accenten**: Verschillende groentinten voor variatie

### Componenten
- **Afgeronde hoeken** voor vriendelijke uitstraling
- **Veel witruimte** voor rust en overzicht
- **Subtiele schaduwen** voor diepte
- **Responsive grid** voor alle schermformaten

## 🔐 Demo Accounts

Voor testen zijn er demo accounts beschikbaar:

- **Gebruiker**: `demo@nutricoach.nl` / `demo123`
- **Admin**: `admin@nutricoach.nl` / `admin123`

## 🚧 Volgende Stappen

Het huidige project is een solide basis. Voor verdere uitbreiding:

1. **Database Integratie** - MongoDB aansluiten voor persistente data
2. **Uitgebreide Authenticatie** - Google/Facebook login toevoegen
3. **Voedingsplanner** - Volledige menu generatie implementeren
4. **Voortgang Tracking** - Grafieken en statistieken toevoegen
5. **Admin Dashboard** - Gebruikersbeheer interface
6. **Mobile App** - React Native versie ontwikkelen

## 🆘 Hulp Nodig?

Als je vastloopt:

1. **Check de browser console** voor error berichten
2. **Kijk in Netlify Functions logs** voor backend problemen
3. **Controleer Environment Variables** in Netlify settings
4. **Test API endpoints** individueel met de browser developer tools

## 📝 Licentie

MIT License - Vrij te gebruiken voor persoonlijke en commerciële projecten.

---

**Gemaakt met ❤️ voor gezonde voeding en moderne technologie**

*NutriCoach - Jouw persoonlijke reis naar een gezonder leven*

