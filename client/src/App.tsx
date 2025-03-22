import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import PageLayout from "./pages/Layout";
import HomePage from "./pages/Home";
import About from './pages/About';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <PageLayout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </PageLayout>
        </BrowserRouter>
    )
}

export default App;
