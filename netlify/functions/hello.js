// Test functie om te controleren of de API werkt
exports.handler = async (event, context) => {
  // CORS headers toevoegen
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    // Basis informatie over de request
    const response = {
      message: 'NutriCoach API is online! 🥗',
      timestamp: new Date().toISOString(),
      method: event.httpMethod,
      path: event.path,
      environment: process.env.NODE_ENV || 'development'
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response)
    };
  } catch (error) {
    console.error('Error in hello function:', error);
    
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

