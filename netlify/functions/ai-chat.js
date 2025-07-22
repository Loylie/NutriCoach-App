// AI Chat functie voor NutriCoach
const { OpenAI } = require('openai');

// Initialiseer OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// CORS headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Content-Type': 'application/json'
};

// Systeem prompt voor de NutriCoach AI
const SYSTEM_PROMPT = `Je bent NutriCoach, een vriendelijke en deskundige AI-voedingscoach. Je helpt gebruikers met:

🥗 Voedingsadvies op maat
🏃‍♀️ Gezonde levensstijl tips  
💪 Motivatie en ondersteuning
📊 Voortgang monitoring
🍽️ Maaltijdplanning

Eigenschappen:
- Vriendelijk en bemoedigend
- Gebaseerd op wetenschappelijke voedingsprincipes
- Houdt rekening met individuele doelen en voorkeuren
- Geeft praktische, haalbare adviezen
- Vraagt door om gebruikers beter te begrijpen

Antwoord altijd in het Nederlands en gebruik een warme, ondersteunende toon.`;

exports.handler = async (event, context) => {
  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Alleen POST requests accepteren
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse request body
    const { message, userContext = {} } = JSON.parse(event.body || '{}');

    if (!message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message is required' })
      };
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'OpenAI API key not configured',
          message: 'Vraag de beheerder om de OPENAI_API_KEY environment variable in te stellen.'
        })
      };
    }

    // Bouw context-bewuste prompt
    let contextPrompt = SYSTEM_PROMPT;
    
    if (userContext.name) {
      contextPrompt += `\n\nGebruiker: ${userContext.name}`;
    }
    
    if (userContext.goal) {
      contextPrompt += `\nDoel: ${userContext.goal}`;
    }
    
    if (userContext.weight) {
      contextPrompt += `\nHuidig gewicht: ${userContext.weight}kg`;
    }
    
    if (userContext.targetWeight) {
      contextPrompt += `\nStreefgewicht: ${userContext.targetWeight}kg`;
    }
    
    if (userContext.allergies && userContext.allergies.length > 0) {
      contextPrompt += `\nAllergieën: ${userContext.allergies.join(', ')}`;
    }
    
    if (userContext.dietPreferences && userContext.dietPreferences.length > 0) {
      contextPrompt += `\nDieetvoorkeuren: ${userContext.dietPreferences.join(', ')}`;
    }

    // Maak OpenAI API call
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: contextPrompt
        },
        {
          role: 'user',
          content: message
        }
      ],
      max_tokens: 1000,
      temperature: 0.7
    });

    const aiResponse = completion.choices[0]?.message?.content;

    if (!aiResponse) {
      throw new Error('No response from OpenAI');
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        response: aiResponse,
        timestamp: new Date().toISOString(),
        tokensUsed: completion.usage?.total_tokens || 0
      })
    };

  } catch (error) {
    console.error('Error in ai-chat function:', error);
    
    // Specifieke error handling voor OpenAI
    if (error.code === 'insufficient_quota') {
      return {
        statusCode: 429,
        headers,
        body: JSON.stringify({
          error: 'OpenAI quota exceeded',
          message: 'De OpenAI API quota is overschreden. Probeer het later opnieuw.'
        })
      };
    }
    
    if (error.code === 'invalid_api_key') {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({
          error: 'Invalid OpenAI API key',
          message: 'De OpenAI API key is ongeldig. Controleer de configuratie.'
        })
      };
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        message: 'Er is een fout opgetreden bij het verwerken van je vraag. Probeer het opnieuw.'
      })
    };
  }
};

