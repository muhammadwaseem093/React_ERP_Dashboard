import React, { type JSX } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import LoginScreen from '../pages/Login';
import RegisterScreen from '../pages/Signup';
import Layout from '../components/Layout';

const isAuthencticated = () => {
    return !!localStorage.getItem("accessToken");
};

const ProtectedRoute = ({ children} : {children: JSX.Element }) => {
    return isAuthencticated() ? children : <Navigate to="/login" replace />;
};

const AppRouter: React.FC = () => {
    return (
        <>
        <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />

            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/logout" element={<Navigate to="/login" replace />} />

            <Route 
             path='/dashboard'
             element={
                <ProtectedRoute>
                    <Layout>
                        <Dashboard />
                    </Layout>
                </ProtectedRoute>
             }
             />
            {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
        
        </>
    );
};

export default AppRouter;