import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import PageLayout from "./pages/Layout";
import HomePage from "./pages/Home";
import About from './pages/About';
import FAQ from './pages/FAQ';
import APIPage from './pages/API';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <PageLayout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/api" element={<APIPage />} />
                </Routes>
            </PageLayout>
        </BrowserRouter>
    )
}

export default App;
