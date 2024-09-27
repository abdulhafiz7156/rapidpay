import './App.css';
import Header from "./components/Header/Header.tsx";
import { ThemeProvider } from './providers/ThemeProvider';
import MainForm from "./components/MainForm/MainForm.tsx";
import { AppProvider } from "./AppContext.tsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Import routing components

function App() {
    return (
        <ThemeProvider>
            <Router>
                <Routes>
                    <Route path="/:orderId" element={
                        <AppProvider>
                            <div className="app h-screen">
                                <Header />
                                <div className="main__block bg-[#042251] dark:bg-[#01112B]">
                                    <div className="bg-[url('./assets/group-black-logo.svg')] bg-no-repeat bg-cover bg-[65px_30px] py-[43px] min-h-screen h-auto">
                                        <MainForm />
                                    </div>
                                </div>
                            </div>
                        </AppProvider>
                    } />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
