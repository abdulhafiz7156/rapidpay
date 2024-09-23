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
                    <div
                        className="main__block bg-[#042251] dark:bg-[#01112B] ">
                        <div className="bg-[url('./assets/group-black-logo.svg')] bg-no-repeat bg-cover bg-[65px_30px] py-[43px] min-h-screen h-auto ">
                            <MainForm/>
                        </div>
                    </div>
                </div>
            </AppProvider>
        </ThemeProvider>
    );
}

export default App;
