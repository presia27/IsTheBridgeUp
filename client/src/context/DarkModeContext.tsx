import {createContext, useState} from 'react';

type DarkModeType = {
    darkMode: boolean,
    toggleDarkMode: () => void
}

const DarkModeContext = createContext<DarkModeType>({} as DarkModeType);

export const DarkModeProvider = ({ children }: React.PropsWithChildren) => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    }

    return (
        <DarkModeContext.Provider value={{darkMode, toggleDarkMode}}>
            {children}
        </DarkModeContext.Provider>
    );
}

export default DarkModeContext;
