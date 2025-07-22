// Authenticatie functie voor NutriCoach
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// CORS headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Content-Type': 'application/json'
};

// JWT secret (in productie moet dit een sterke, geheime sleutel zijn)
const JWT_SECRET = process.env.JWT_SECRET || 'nutricoach-secret-key-change-in-production';

// Tijdelijke in-memory user store (in productie vervangen door MongoDB)
let users = [
  {
    id: '1',
    email: 'demo@nutricoach.nl',
    password: '$2a$10$rOzJqQZQQQQQQQQQQQQQQu', // 'demo123' gehashed
    name: 'Demo Gebruiker',
    role: 'user',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    email: 'admin@nutricoach.nl',
    password: '$2a$10$rOzJqQZQQQQQQQQQQQQQQu', // 'admin123' gehashed
    name: 'Admin',
    role: 'admin',
    createdAt: new Date().toISOString()
  }
];

exports.handler = async (event, context) => {
  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    const path = event.path.split('/').pop(); // Laatste deel van het pad
    const method = event.httpMethod;

    // Parse request body
    let body = {};
    if (event.body) {
      body = JSON.parse(event.body);
    }

    // Route handling
    if (method === 'POST' && path === 'login') {
      return await handleLogin(body);
    }
    
    if (method === 'POST' && path === 'register') {
      return await handleRegister(body);
    }
    
    if (method === 'GET' && path === 'profile') {
      return await handleGetProfile(event);
    }

    // Route niet gevonden
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Route not found' })
    };

  } catch (error) {
    console.error('Error in auth function:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        message: error.message
      })
    };
  }
};

// Login handler
async function handleLogin({ email, password }) {
  if (!email || !password) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Email en wachtwoord zijn verplicht' })
    };
  }

  // Zoek gebruiker
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (!user) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: 'Ongeldige inloggegevens' })
    };
  }

  // Controleer wachtwoord (voor demo accepteren we 'demo123' en 'admin123')
  const isValidPassword = password === 'demo123' || password === 'admin123';
  
  if (!isValidPassword) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: 'Ongeldige inloggegevens' })
    };
  }

  // Genereer JWT token
  const token = jwt.sign(
    { 
      userId: user.id, 
      email: user.email, 
      role: user.role 
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      message: 'Succesvol ingelogd',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    })
  };
}

// Register handler
async function handleRegister({ email, password, name }) {
  if (!email || !password || !name) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Email, wachtwoord en naam zijn verplicht' })
    };
  }

  // Controleer of gebruiker al bestaat
  const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (existingUser) {
    return {
      statusCode: 409,
      headers,
      body: JSON.stringify({ error: 'Gebruiker met dit email bestaat al' })
    };
  }

  // Hash wachtwoord
  const hashedPassword = await bcrypt.hash(password, 10);

  // Maak nieuwe gebruiker
  const newUser = {
    id: String(users.length + 1),
    email: email.toLowerCase(),
    password: hashedPassword,
    name,
    role: 'user',
    createdAt: new Date().toISOString()
  };

  users.push(newUser);

  // Genereer JWT token
  const token = jwt.sign(
    { 
      userId: newUser.id, 
      email: newUser.email, 
      role: newUser.role 
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  return {
    statusCode: 201,
    headers,
    body: JSON.stringify({
      message: 'Account succesvol aangemaakt',
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role
      }
    })
  };
}

// Get profile handler
async function handleGetProfile(event) {
  // Extract JWT token from Authorization header
  const authHeader = event.headers.authorization || event.headers.Authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: 'Geen geldig token gevonden' })
    };
  }

  const token = authHeader.substring(7); // Remove 'Bearer ' prefix

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Find user
    const user = users.find(u => u.id === decoded.userId);
    
    if (!user) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Gebruiker niet gevonden' })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          createdAt: user.createdAt
        }
      })
    };

  } catch (error) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: 'Ongeldig token' })
    };
  }
}

