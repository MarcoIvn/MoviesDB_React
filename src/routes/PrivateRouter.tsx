import Header from "../components/Header/Header";
import { Outlet } from 'react-router-dom';
import React from 'react';

const PrivateRouter = () => {
    return (
        <div style={{ backgroundColor: '#61336C' }}>
            <Header />
            <Outlet />
        </div>
    )
}
export default PrivateRouter