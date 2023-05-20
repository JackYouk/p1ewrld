// React
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Context/State
import { AvatarContext } from "../stores/avatarContext";
import { AuthContext } from '../stores/authContext';

export default function Bank() {
    const navigate = useNavigate();
    const {currentUser, login, logout} = AuthContext();
    const { avatar, setAvatar } = AvatarContext();

    return (
        <>
            Bank
        </>
    )
}