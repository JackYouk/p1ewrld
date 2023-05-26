import './style.css'
import ReactDOM from 'react-dom/client'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import P1eWorld from './p1e-world/P1eWorld'
import Market from './market/Market'
import { ControlsProvider } from './context/controlsContext'
import { PlayerProvider } from './context/playerContext'
import PrivacyPolicy from './privacy-policy'

// Mini Games
import P1eStacker from './minigames/p1e-stacker/P1eStacker'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <BrowserRouter>
        <PlayerProvider>
                <ControlsProvider>
                        <Routes>
                            
                            {/* Main Routes */}
                            <Route path="/" element={<P1eWorld />} />
                            <Route path="/market" element={<Market />} />

                            {/* Mini Games Routes */}
                            <Route path="/p1e-stacker" element={<P1eStacker />} />

                            <Route path="/privacy-policy" element={<PrivacyPolicy />} />

                            {/* CatchAll Route */}
                            <Route path="/*" element={<P1eWorld />} />

                        </Routes>
                </ControlsProvider>
        </PlayerProvider>
    </BrowserRouter>
)