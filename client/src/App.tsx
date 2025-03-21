import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import PageLayout from "./pages/Layout";
import HomePage from "./pages/Home";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <PageLayout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </PageLayout>
        </BrowserRouter>
    )
}

export default App;
