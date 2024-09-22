import './App.css';
import Header from "./components/Header/Header.tsx";
import {ThemeProvider} from './providers/ThemeProvider';
import MainForm from "./components/MainForm/MainForm.tsx";
import {AppProvider} from "./AppContext.tsx";

function App() {
    return (
        <ThemeProvider>
            <AppProvider>
                <div className="app h-screen">
                    <Header/>
                    <div className="main__block bg-lightBackgroundBlocks dark:bg-darkBackground">
                        <MainForm/>
                    </div>
                </div>
            </AppProvider>
        </ThemeProvider>
    );
}

export default App;
