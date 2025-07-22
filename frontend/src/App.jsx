import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { 
  Heart, 
  MessageCircle, 
  User, 
  TrendingUp, 
  Apple, 
  Activity,
  Sparkles,
  ChefHat,
  Target,
  Calendar
} from 'lucide-react'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('welcome')
  const [user, setUser] = useState(null)
  const [chatMessages, setChatMessages] = useState([])
  const [chatInput, setChatInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Demo gebruiker voor ontwikkeling
  useEffect(() => {
    // Simuleer ingelogde gebruiker
    setUser({
      name: 'Demo Gebruiker',
      email: 'demo@nutricoach.nl',
      goal: 'Gezond afvallen',
      currentWeight: 75,
      targetWeight: 70
    })
  }, [])

  // Test API verbinding
  const testAPI = async () => {
    try {
      const response = await fetch('/api/hello')
      const data = await response.json()
      console.log('API Test:', data)
    } catch (error) {
      console.error('API Test Error:', error)
    }
  }

  // Chat met AI
  const sendChatMessage = async () => {
    if (!chatInput.trim()) return

    const userMessage = chatInput.trim()
    setChatInput('')
    setIsLoading(true)

    // Voeg gebruikersbericht toe
    setChatMessages(prev => [...prev, {
      type: 'user',
      message: userMessage,
      timestamp: new Date()
    }])

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: userMessage,
          userContext: {
            name: user?.name,
            goal: user?.goal,
            weight: user?.currentWeight,
            targetWeight: user?.targetWeight
          }
        })
      })

      const data = await response.json()

      if (response.ok) {
        setChatMessages(prev => [...prev, {
          type: 'ai',
          message: data.response,
          timestamp: new Date()
        }])
      } else {
        setChatMessages(prev => [...prev, {
          type: 'error',
          message: data.message || 'Er is een fout opgetreden',
          timestamp: new Date()
        }])
      }
    } catch (error) {
      setChatMessages(prev => [...prev, {
        type: 'error',
        message: 'Kan geen verbinding maken met de AI coach',
        timestamp: new Date()
      }])
    } finally {
      setIsLoading(false)
    }
  }

  // Welcome View
  if (currentView === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Apple className="h-12 w-12 text-green-600 mr-3" />
              <h1 className="text-4xl font-bold text-green-800">NutriCoach</h1>
            </div>
            <p className="text-xl text-green-700 mb-2">Jouw persoonlijke AI voedingscoach</p>
            <p className="text-green-600">Gezond leven, stap voor stap</p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <MessageCircle className="h-6 w-6 text-green-600" />
                  <CardTitle className="text-green-800">AI Chat Coach</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-green-700">Krijg persoonlijk voedingsadvies van je AI coach, 24/7 beschikbaar</p>
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <ChefHat className="h-6 w-6 text-green-600" />
                  <CardTitle className="text-green-800">Slimme Maaltijdplanning</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-green-700">Gepersonaliseerde menu's en recepten op basis van jouw voorkeuren</p>
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                  <CardTitle className="text-green-800">Voortgang Tracking</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-green-700">Volg je gewicht, stemming en energie om je doelen te bereiken</p>
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Activity className="h-6 w-6 text-green-600" />
                  <CardTitle className="text-green-800">Fitness Plannen</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-green-700">Trainingsschema's aangepast aan jouw niveau en doelen</p>
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Heart className="h-6 w-6 text-green-600" />
                  <CardTitle className="text-green-800">Mindfulness</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-green-700">Journaling, meditatie en mentale ondersteuning voor een gezonde mindset</p>
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Target className="h-6 w-6 text-green-600" />
                  <CardTitle className="text-green-800">Persoonlijke Doelen</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-green-700">Stel doelen en krijg ondersteuning om ze stap voor stap te bereiken</p>
              </CardContent>
            </Card>
          </div>

          {/* CTA Buttons */}
          <div className="text-center space-y-4">
            <div className="space-x-4">
              <Button 
                size="lg" 
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
                onClick={() => setCurrentView('dashboard')}
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Start je reis
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3"
                onClick={testAPI}
              >
                Test API Verbinding
              </Button>
            </div>
            <p className="text-sm text-green-600">
              Demo versie - Login: demo@nutricoach.nl / demo123
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Dashboard View
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Apple className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-green-800">NutriCoach Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <User className="mr-1 h-4 w-4" />
              {user?.name}
            </Badge>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setCurrentView('welcome')}
              className="border-green-600 text-green-600 hover:bg-green-50"
            >
              Terug naar Home
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chat Section */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center text-green-800">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Chat met je AI Coach
                </CardTitle>
                <CardDescription>
                  Stel vragen over voeding, fitness en gezondheid
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col h-[500px]">
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-green-50 rounded-lg">
                  {chatMessages.length === 0 ? (
                    <div className="text-center text-green-600 py-8">
                      <Sparkles className="h-12 w-12 mx-auto mb-4 text-green-400" />
                      <p className="text-lg font-medium mb-2">Hallo {user?.name}! 👋</p>
                      <p>Ik ben je persoonlijke NutriCoach. Stel me een vraag over voeding, fitness of gezondheid!</p>
                    </div>
                  ) : (
                    chatMessages.map((msg, index) => (
                      <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-lg ${
                          msg.type === 'user' 
                            ? 'bg-green-600 text-white' 
                            : msg.type === 'error'
                            ? 'bg-red-100 text-red-800 border border-red-200'
                            : 'bg-white text-green-800 border border-green-200'
                        }`}>
                          <p className="whitespace-pre-wrap">{msg.message}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {msg.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white text-green-800 border border-green-200 p-3 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                          <span>Coach denkt na...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Chat Input */}
                <div className="flex space-x-2">
                  <Textarea
                    placeholder="Stel je vraag aan de coach..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        sendChatMessage()
                      }
                    }}
                    className="flex-1 min-h-[60px] border-green-200 focus:border-green-400"
                    disabled={isLoading}
                  />
                  <Button 
                    onClick={sendChatMessage}
                    disabled={isLoading || !chatInput.trim()}
                    className="bg-green-600 hover:bg-green-700 text-white px-6"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Stats */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Jouw Voortgang</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-green-700">Huidig gewicht:</span>
                  <Badge className="bg-green-100 text-green-800">{user?.currentWeight} kg</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-700">Doel gewicht:</span>
                  <Badge className="bg-green-100 text-green-800">{user?.targetWeight} kg</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-700">Te gaan:</span>
                  <Badge className="bg-orange-100 text-orange-800">
                    {user?.currentWeight - user?.targetWeight} kg
                  </Badge>
                </div>
                <Separator />
                <div className="text-center">
                  <p className="text-sm text-green-600 mb-2">Jouw doel:</p>
                  <Badge variant="outline" className="border-green-600 text-green-600">
                    <Target className="mr-1 h-3 w-3" />
                    {user?.goal}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Snelle Acties</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start border-green-200 text-green-700 hover:bg-green-50">
                  <Calendar className="mr-2 h-4 w-4" />
                  Weekmenu plannen
                </Button>
                <Button variant="outline" className="w-full justify-start border-green-200 text-green-700 hover:bg-green-50">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Gewicht loggen
                </Button>
                <Button variant="outline" className="w-full justify-start border-green-200 text-green-700 hover:bg-green-50">
                  <Activity className="mr-2 h-4 w-4" />
                  Workout starten
                </Button>
                <Button variant="outline" className="w-full justify-start border-green-200 text-green-700 hover:bg-green-50">
                  <Heart className="mr-2 h-4 w-4" />
                  Stemming bijwerken
                </Button>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">💡 Tip van de dag</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-700 text-sm">
                  Drink een glas water voor elke maaltijd. Dit helpt bij de spijsvertering en zorgt ervoor dat je je verzadigd voelt.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

