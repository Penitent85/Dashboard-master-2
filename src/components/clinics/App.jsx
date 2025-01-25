import "primeicons/primeicons.css";
import { PrimeReactProvider } from "primereact/api";
// import "primeflex/primeflex.css";
// import "primereact/resources/primereact.css";
// import "primereact/resources/themes/lara-light-indigo/theme.css";

import "./index.css";
import "./flags.css";
import Pharmacy from "./Clinics";

const App = () => {
    return (
        <PrimeReactProvider>
            <Pharmacy />
        </PrimeReactProvider>
    );
};

export default App;
