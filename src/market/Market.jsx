// React
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Context/State
import { AuthContext } from '../stores/authContext';

// Components
import ItemModel from "./ItemModel";

// Market Pages
import MyCollection from "./MyCollection";
import Bank from "./Bank";
import Auction from "./Auction";
import Casino from "./Casino";

export default function Market() {
    const navigate = useNavigate();
    const { currentUser, login, logout } = AuthContext();

    if (document.body.querySelector('#nipple_0_0')) {
        document.body.querySelector('#nipple_0_0').remove()
    }

    const [page, setPage] = useState('Login');

    useEffect(() => {
        if (currentUser) {
            setPage('Market');
        }
    }, [currentUser]);

    const buyAvatar = () => {
        return;
    }

    // market page - chose avatars from the market ($0.99 - $19.99 based on rarity)


    return (
        <div style={{ backgroundColor: 'gray', width: '100%', height: '100dvh', position: 'absolute', color: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="btn" onClick={() => navigate(-1)}>back to game</div>
                {currentUser ? <div className="btn-gold" onClick={() => setPage('Bank')}>{`${currentUser.totalPi}𝜋`}</div> : <></>}
            </div>
            <div style={{ textAlign: 'center', fontSize: '50px' }}>{page}</div>

            {page === 'Login' ? <></> : <div className="market-nav">
                <div style={{ cursor: 'pointer', margin: '5px', textDecoration: `${page === 'Market' ? 'underline' : 'none'}` }} onClick={() => setPage('Market')}>Market</div>
                <div style={{ cursor: 'pointer', margin: '5px', textDecoration: `${page === 'Casino' ? 'underline' : 'none'}` }} onClick={() => setPage('Casino')}>Casino</div>
                <div style={{ cursor: 'pointer', margin: '5px', textDecoration: `${page === 'Auction' ? 'underline' : 'none'}` }} onClick={() => setPage('Auction')}>Auction</div>
                <div style={{ cursor: 'pointer', margin: '5px', textDecoration: `${page === 'Bank' ? 'underline' : 'none'}` }} onClick={() => setPage('Bank')}>Bank</div>
                <div style={{ cursor: 'pointer', margin: '5px', textDecoration: `${page === 'My Collection' ? 'underline' : 'none'}` }} onClick={() => setPage('My Collection')}>My Collection</div>
            </div>}

            {page === 'Login' ? (
                <>
                    <div style={{ height: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div className="btn" onClick={() => login()}>Login</div>
                    </div>
                </>
            ) : <></>}

            {page === 'Market' ? (
                <>
                    <div style={{ display: 'flex', padding: '5px', flexDirection: `${window.innerWidth < 600 ? 'column' : 'row'}`, overflowY: 'scroll', maxHeight: '75dvh' }}>
                        <div className="market-item" onClick={() => buyAvatar()}>
                            <ItemModel glb={'./pie.glb'} scale={0.65} />
                            <div style={{}}>
                                Default P1E
                            </div>
                            <div style={{ fontSize: '18px' }}>
                                <span style={{ color: 'green' }}>Common</span> - Default
                            </div>
                        </div>
                        <div className="market-item" onClick={() => buyAvatar()}>
                            <ItemModel glb={'./rare_pie.glb'} scale={1.7} />
                            <div style={{}}>
                                Rare P1E
                            </div>
                            <div style={{ fontSize: '18px' }}>
                                <span style={{ color: 'gold' }}>Rare</span> - {`10𝜋`}
                            </div>
                        </div>
                    </div>
                </>
            ) : <></>}

            {page === 'Casino' ? (
                <Casino />
            ) : <></>}

            {page === 'Auction' ? (
                <Auction />
            ) : <></>}

            {page === 'Bank' ? (
                <Bank />
            ) : <></>}

            {page === 'My Collection' ? (
                <MyCollection />
            ) : <></>}
        </div>
    );
}