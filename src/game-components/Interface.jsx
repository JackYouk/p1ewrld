// React
import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

// Context/State
import { ControlsContext } from '../stores/controlsContext.jsx'
import { AuthContext } from '../stores/authContext.jsx'


export default function Interface() {
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser, login } = AuthContext();
    const { cameraZoom, setCameraZoom } = ControlsContext();
    const [gamesmenuOpen, setGamesmenuOpen] = useState(false);
    const [selectedGame, setSelectedGame] = useState({ game: 'My P1E World', slug: '/' });

    return (
        <>
            <div className="interface">

                {gamesmenuOpen ? (
                    <>
                        {/* Games Menu */}
                        <div className='game-menu' onClick={() => setGamesmenuOpen(false)} style={{
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            width: '100%',
                            height: '100dvh',
                            backgroundColor: '#00000099',
                        }}>
                            <div style={{
                                display: 'flex',
                                padding: '5px',
                                margin: '10px',
                                borderRadius: '3px',
                                flexDirection: `column`,
                                overflowY: 'scroll',
                                maxHeight: '75dvh',
                                color: 'white',
                                backgroundColor: '#ffffff50'
                            }} onClick={(e) => {
                                e.stopPropagation()
                            }}>
                                <div
                                    className="game-item"
                                    style={{
                                        filter: `${selectedGame.game === 'My P1E World' ? 'none' : ''}`,
                                        background: `url("https://1.bp.blogspot.com/-GCtvzUJK9cI/X6D539t0tQI/AAAAAAAABiU/XLXZCucHXxMfbDu2ChhsyBelPZAr-HeQgCLcBGAsYHQ/w1200-h630-p-k-no-nu/how-to-play-minecraft-at-school-with-vpn.jpg")`
                                    }}
                                    onClick={() => setSelectedGame({ game: 'My P1E World', slug: '/' })}
                                >
                                    <div style={{}}>
                                        My P1E World
                                    </div>
                                    <div style={{ fontSize: '15px' }}>

                                    </div>
                                </div>
                                <div
                                    className="game-item"
                                    style={{
                                        filter: `${selectedGame.game === 'P1E Stacker' ? 'none' : ''}`,
                                        background: `url("https://www.timeslifestyle.net/wp-content/uploads/2021/07/CS-GO.jpg")`
                                    }}
                                    onClick={(e) => { setSelectedGame({ game: 'P1E Stacker', slug: '/p1e-stacker' }) }}
                                >
                                    <div style={{}}>
                                        P1E Stacker
                                    </div>
                                    <div style={{ fontSize: '15px' }}>
                                        Built By JackJack
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                                    <div style={{ fontSize: 'xx-large', marginRight: '10px' }}>{selectedGame.game}</div>
                                    <div className='market-btn' onClick={() => {
                                        setGamesmenuOpen(false);
                                        navigate(selectedGame.slug);
                                    }}>Go</div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (<></>)}

                <div className="controls">
                    {/* Controls */}
                    <div className='avatarControls'>
                        <div className='moveControls'>
                            `<div style={{ display: 'flex' }}>
                                <div className='center'></div>
                                <div className='moveBtn forward'>F</div>
                                <div className='center'></div>
                            </div>

                            <div style={{ display: 'flex' }}>
                                <div className='moveBtn leftward'>L</div>
                                <div className='center'></div>
                                <div className='moveBtn rightward'>R</div>
                            </div>

                            <div style={{ display: 'flex' }}>
                                <div className='center'></div>
                                <div className='moveBtn backward'>B</div>
                                <div className='center'></div>
                            </div>
                        </div>

                        <div className='jumpBtn'>Jump</div>
                    </div>

                    {/* Nav Btns */}
                    <div className='raw' >
                        <div className='games-btn' onClick={() => { setGamesmenuOpen(true) }}>Games</div>
                        <div className='market-btn' onClick={() => { navigate('/market') }}>Market</div>
                    </div>
                </div>

                {/* Camera Selector */}
                <div style={{ position: 'absolute', top: '0', right: '0', display: 'flex' }}>
                    <div className={`cameraBtn ${cameraZoom === 0.65 ? 'active' : ''}`} onClick={() => setCameraZoom(0.65)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                        </svg>
                    </div>
                    <div className={`cameraBtn ${cameraZoom === 3.5 ? 'active' : ''}`} onClick={() => setCameraZoom(3.5)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
                            <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                        </svg>
                    </div>
                    <div className={`cameraBtn ${cameraZoom === 50 ? 'active' : ''}`} onClick={() => setCameraZoom(50)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-globe-americas" viewBox="0 0 16 16">
                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM2.04 4.326c.325 1.329 2.532 2.54 3.717 3.19.48.263.793.434.743.484-.08.08-.162.158-.242.234-.416.396-.787.749-.758 1.266.035.634.618.824 1.214 1.017.577.188 1.168.38 1.286.983.082.417-.075.988-.22 1.52-.215.782-.406 1.48.22 1.48 1.5-.5 3.798-3.186 4-5 .138-1.243-2-2-3.5-2.5-.478-.16-.755.081-.99.284-.172.15-.322.279-.51.216-.445-.148-2.5-2-1.5-2.5.78-.39.952-.171 1.227.182.078.099.163.208.273.318.609.304.662-.132.723-.633.039-.322.081-.671.277-.867.434-.434 1.265-.791 2.028-1.12.712-.306 1.365-.587 1.579-.88A7 7 0 1 1 2.04 4.327Z" />
                        </svg>
                    </div>
                </div>
            </div>
        </>
    )
}