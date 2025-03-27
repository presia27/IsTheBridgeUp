import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { DarkModeProvider } from './context/DarkModeContext'; // Shared context for dark mode
import { BridgeProvider } from './context/BridgeContext';
import PageLayout from "./pages/Layout";
import HomePage from "./pages/Home";
import About from './pages/About';
import FAQ from './pages/FAQ';
import APIPage from './pages/API';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <DarkModeProvider>
                <BridgeProvider>
                    <PageLayout>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/faq" element={<FAQ />} />
                            <Route path="/api" element={<APIPage />} />
                        </Routes>
                    </PageLayout>
                </BridgeProvider>
            </DarkModeProvider>
            
        </BrowserRouter>
    )
}

export default App;
