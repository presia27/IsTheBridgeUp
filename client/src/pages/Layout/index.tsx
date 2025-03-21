import React from 'react';
import Style from './index.module.css';
import NavBar from '../../components/NavBar';


interface PageLayoutProps {
    children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({children}) => {
    return (
        <>
            <nav>
                <NavBar></NavBar>
            </nav>

            <main>

            </main>

            <footer>

            </footer>
        </>
    );
}

export default PageLayout;
