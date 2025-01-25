import "primeicons/primeicons.css";
import { PrimeReactProvider } from "primereact/api";


import "./index.css";
import "./flags.css";
import Cities from "./Cites";


const App = () => {
    return (
        <PrimeReactProvider>
            <Cities />
        </PrimeReactProvider>
    );
};

export default App;
