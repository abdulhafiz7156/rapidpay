import './App.css';
import Header from "./components/Header/Header.tsx";
import { ThemeProvider } from './providers/ThemeProvider';

function App() {
    return (
        <ThemeProvider>
            <div className="app h-screen">
                <Header />
                <div className="main__block"></div>
            </div>
        </ThemeProvider>
    );
}

export default App;
