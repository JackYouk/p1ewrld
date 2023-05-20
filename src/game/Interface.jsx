import { useKeyboardControls } from '@react-three/drei'
import useGame from '../stores/useGame.jsx'
import { useEffect, useRef } from 'react'
import { addEffect } from '@react-three/fiber'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import nipplejs from 'nipplejs';
import { ControlsContext } from '../stores/controlsContext.jsx'
import { AuthContext } from '../stores/authContext.jsx'



export default function Interface() {
    const navigate = useNavigate();
    const { currentUser, login } = AuthContext();
    const time = useRef()

    const restart = useGame((state) => state.restart)
    const phase = useGame((state) => state.phase)

    const forward = useKeyboardControls((state) => state.forward)
    const backward = useKeyboardControls((state) => state.backward)
    const leftward = useKeyboardControls((state) => state.leftward)
    const rightward = useKeyboardControls((state) => state.rightward)
    const jump = useKeyboardControls((state) => state.jump)

    const [gamesmenuOpen, setGamesmenuOpen] = useState(false);


    return (
        <>
            <div className="interface">

                {gamesmenuOpen ? (
                    <>
                        {/* Games Menu */}
                        <div>

                        </div>
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
                                    style={{ background: `url("https://1.bp.blogspot.com/-GCtvzUJK9cI/X6D539t0tQI/AAAAAAAABiU/XLXZCucHXxMfbDu2ChhsyBelPZAr-HeQgCLcBGAsYHQ/w1200-h630-p-k-no-nu/how-to-play-minecraft-at-school-with-vpn.jpg")` }}
                                    onClick={() => !currentUser ? login() : navigate('/')}
                                >
                                    {currentUser ? (
                                        <>
                                            <div style={{}}>
                                                My P1E World
                                            </div>
                                            <div style={{ fontSize: '18px' }}>

                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div style={{}}>
                                                Login To Customize Your Own World
                                            </div>
                                            <div style={{ fontSize: '18px' }}>
                                                Click to Login
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div
                                    className="game-item"
                                    style={{ background: `url("https://www.timeslifestyle.net/wp-content/uploads/2021/07/CS-GO.jpg")` }}
                                    onClick={(e) => { }}
                                >
                                    <div style={{}}>
                                        Rare P1E
                                    </div>
                                    <div style={{ fontSize: '18px' }}>
                                        Built By JackJack
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <></>
                )}


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
                    {/* <div id="zone_joystick" /> */}
                    {/* Nav Btns */}
                    <div className='raw' >
                        <div className='games-btn' onClick={() => {
                            // joystick.destroy()
                            setGamesmenuOpen(true)
                        }}>Mini Games</div>

                        <div className='market-btn' onClick={() => {
                            navigate('/market')
                            // joystick.destroy()
                        }}>Market</div>
                    </div>

                </div>

            </div>
        </>
    )
}