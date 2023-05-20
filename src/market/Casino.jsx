// React
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Context/State
import { AvatarContext } from "../stores/avatarContext";
import { AuthContext } from '../stores/authContext';

export default function Casino() {
    const navigate = useNavigate();
    const {currentUser, login, logout} = AuthContext();
    const { avatar, setAvatar } = AvatarContext();
    // casino page - chose basic ($0.99), rare ($1.99), or ultra ($4.99) machine and spin for new avatar
    return (
        <>
            Casino
        </>
    )
}