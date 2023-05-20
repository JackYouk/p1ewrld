// React
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Context/State
import { AvatarContext } from "../stores/avatarContext";
import { AuthContext } from '../stores/authContext';

export default function Auction() {
    const navigate = useNavigate();
    const {currentUser, login, logout} = AuthContext();
    const { avatar, setAvatar } = AvatarContext();

    // auction page - payment goes to P1EWRLD wallet, 10% cut taken, then sent to seller

    return (
        <>
            Auction
        </>
    )
}