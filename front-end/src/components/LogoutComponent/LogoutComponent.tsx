import React, { FC } from 'react';
import styles from './LogoutComponent.module.scss';
import { Navigate } from "react-router-dom";

export default function Logout() {
    localStorage.clear()

    return <Navigate to="/"></Navigate>;
}
