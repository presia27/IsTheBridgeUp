import React from 'react';
import Style from './index.module.css';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';


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
                <div className={Style.mainContent}>
                    {children}
                </div>
            </main>

            <footer>
                <Footer></Footer>
            </footer>
        </>
    );
}

export default PageLayout;
