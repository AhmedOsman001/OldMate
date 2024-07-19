import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PlayerProvider from './contexts/PlayerProvider'
import Background from './components/background'
import Footer from './components/footer'
import PlayerPage from './Pages/PlayerPage'
import Search from './Pages/Search'


function App() {


  return (
    <PlayerProvider>
      <Background >
        <Router>
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/summoner/eun1/*" element={<PlayerPage />} />
          </Routes>
        </Router>
        <Footer />
      </Background>
    </PlayerProvider>
  )
}

export default App
