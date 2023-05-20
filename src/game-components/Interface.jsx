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

    const [gamesmenuOpen, setGamesmenuOpen] = useState(false);
    const [selectedGame, setSelectedGame] = useState({game: 'My P1E World', slug: '/'});

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
                                    onClick={() => !currentUser ? login() : setSelectedGame({game: 'My P1E World', slug: '/'})}
                                >
                                    {currentUser ? (
                                        <>
                                            <div style={{}}>
                                                My P1E World
                                            </div>
                                            <div style={{ fontSize: '15px' }}>

                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div style={{}}>
                                                Login To Customize Your Own World
                                            </div>
                                            <div style={{ fontSize: '15px' }}>
                                                Click to Login
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div
                                    className="game-item"
                                    style={{
                                        filter: `${selectedGame.game === 'P1E Stacker' ? 'none' : ''}`, 
                                        background: `url("https://www.timeslifestyle.net/wp-content/uploads/2021/07/CS-GO.jpg")` 
                                    }}
                                    onClick={(e) => { setSelectedGame({game: 'P1E Stacker', slug: '/p1e-stacker'}) }}
                                >
                                    <div style={{}}>
                                        P1E Stacker
                                    </div>
                                    <div style={{ fontSize: '15px' }}>
                                        Built By JackJack
                                    </div>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'end', alignItems: 'center'}}>
                                    <div style={{fontSize: 'xx-large', marginRight: '10px'}}>{selectedGame.game}</div>
                                    <div className='market-btn' onClick={() => navigate(selectedGame.slug)}>Go</div>
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
            </div>
        </>
    )
}