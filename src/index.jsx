import './style.css'
import ReactDOM from 'react-dom/client'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { KeyboardControls } from '@react-three/drei'
import Game from './Game'
import Market from './Market'
import { AvatarProvider } from './stores/avatarContext'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <BrowserRouter>
        <AvatarProvider>
            <KeyboardControls
                map={[
                    { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
                    { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
                    { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
                    { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
                    { name: 'jump', keys: ['Space'] },
                ]}
            >
                <Routes>
                    <Route path="/" element={<Game />} />
                    <Route path="/market" element={<Market />} />
                </Routes>
                {/* <Interface /> */}
            </KeyboardControls>
        </AvatarProvider>
    </BrowserRouter>
)