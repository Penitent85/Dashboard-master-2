import "primeicons/primeicons.css";
import { PrimeReactProvider } from "primereact/api";
import "primeflex/primeflex.css";
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';


import "./index.css";
import "./flags.css";
import Specialization from "./Specialization";


const App = () => {
    return (
        <PrimeReactProvider>
            <Specialization />
        </PrimeReactProvider>
    );
};

export default App;
