import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@/contexts/theme-context";
import Patients from "./components/patients/Patients.jsx";
import ModifyDoctor from "./components/doctor/ModifyDoctor.jsx";

import Layout from "@/routes/layout";
import DashboardPage from "@/routes/dashboard/page";
import CreateDoctorComponent from "./components/doctor/CreateDoctor.jsx";
import ViewDoctorComponent from "./components/doctor/ViewDoctor.jsx";
import Pharmacy from "./components/pharmacy/Pharmacy.jsx";
import EditPharmacy from "./components/pharmacy/ModifyPharmacy.jsx";
import CreatePharmacyComponent from "./components/pharmacy/CreatePharmacy.jsx";
import ViewPharmacy from "./components/pharmacy/ViewPharmacy.jsx";
import CreateCity from "./components/cites/AddCity.jsx";
import Specialization from "./components/specialization/Specialization.jsx";

import City from "./components/cites/App.jsx";
import CreateSpecial from "./components/specialization/AddSpecialization.jsx";
import CreateClinicComponent from "./components/clinics/CreateClinics.jsx";

import ViewPatients from "./components/patients/ViewPatients.jsx";
import Table from "./components/doctor/App.jsx";
import CreatePatient from "./components/patients/CreatePatients.jsx";
import ModifyPatient from "./components/patients/ModifyPatients.jsx";
import Clinics from "./components/clinics/Clinics.jsx";
import ViewClinics from "./components/clinics/ViewClinics.jsx";
import ModifyClinic from "./components/clinics/ModifyClinics.jsx";
import ModifyEditComponent from "./components/specialization/ModifySpecial.jsx";
import ModifyCityComponent from "./components/cites/Edit.jsx";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <DashboardPage />,
                },
                {
                    path: "doctors",
                    element: <Table />,
                },
                {
                    path: "doctors/create",
                    element: <CreateDoctorComponent />,
                },
                {
                    path: "doctors/view",
                    element: <ViewDoctorComponent />,
                },
                {
                    path: "doctors/view/:id",
                    element: <ViewDoctorComponent />,
                },
                {
                    path: "doctors/edit/:id",
                    element: <ModifyDoctor />,
                },
                {
                    path: "table",
                    element: <Table />,
                },
                {
                    path: "patients",
                    element: <Patients />,
                },
                {
                    path: "patients/create",
                    element: <CreatePatient />,
                },
                {
                    path: "patients/view/:id",
                    element: <ViewPatients />,
                },
                {
                    path: "patients/edit/:id",
                    element: <ModifyPatient />,
                },
                {
                    path: "pharmacy",
                    element: <Pharmacy />,
                },
                {
                    path: "pharmacies/create",
                    element: <CreatePharmacyComponent />,
                },
                {
                    path: "pharmacy/edit/:id",
                    element: <EditPharmacy />,
                },
                {
                    path: "pharmacy/view/:id",
                    element: <ViewPharmacy />,
                },
                {
                    path: "clinics",
                    element: <Clinics />,
                },
                {
                    path: "clinics/create",
                    element: <CreateClinicComponent />,
                },
                {
                    path: "clinics/view/:id",
                    element: <ViewClinics />,
                },
                {
                    path: "clinics/edit/:id",
                    element: <ModifyClinic />,
                },
                {
                    path: "cites",
                    element: <City />,
                },

                {
                    path: "cites/edit/:id",
                    element: <ModifyCityComponent />,
                },
                {
                    path: "city/create",
                    element: <CreateCity />,
                },
                {
                    path: "specialization",
                    element: <Specialization />,
                },
                {
                    path: "specialization/create",
                    element: <CreateSpecial />,
                },
                {
                    path: "specialization/edit/:id",
                    element: <ModifyEditComponent  />,
                },
               
            ],
        },
    ]);
    return (
        <ThemeProvider storageKey="theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
