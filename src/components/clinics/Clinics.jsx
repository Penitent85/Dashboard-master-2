import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProductService } from "./service/ProductService";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import { Toolbar } from "primereact/toolbar";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { CloudFog, Eye, UserPen } from "lucide-react";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";

export default function ProductsDemo() {
    let emptyProduct = {
        first_name: "",
        last_name: "",
        en_first_name: "",
        en_last_name: "",
        username: "",
        email: "",
        phone: "",
        is_active: true,
        id_number: "",
        speciality: "",
        about: {
            overview: "",
            qualifies: [],
        },
        dob: "",
    };

    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleted, setDeleted] = useState(false);

    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        ProductService.getProducts().then((data) => setProducts(data));
    }, [deleted]);
    console.log(products);

    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    };

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        console.log(product);
        setDeleteProductDialog(true);
        const callFun = async () => {
            try {
                await axios.delete(`${import.meta.env.VITE_BACKEND_URL}api/clinics/${product.id}`, {
                    headers: {
                        "ngrok-skip-browser-warning": "sss",
                        Authorization: `${import.meta.env.VITE_AUTH_KEY}`,
                    },
                });
            } catch (error) {
                console.error("Error fetching doctors:", error);
            }
        };

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        })
            .then((result) => {
                if (result.isConfirmed) {
                    console.log(product.id);
                    callFun();
                    return result;
                }
            })
            .then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success",
                    });
                }
            })
            .finally(() => {
                setDeleted((prev) => !prev);
            });
    };

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = () => {
        let id = "";
        let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return id;
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Link to={`/clinics/create`}>
                    <Button
                        label="Add Clinic"
                        icon="pi pi-plus"
                        severity="success"
                    />
                </Link>
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <Button
                label="Export"
                icon="pi pi-upload"
                className="p-button-help"
                onClick={exportCSV}
            />
        );
    };

    const imageBodyTemplate = (rowData) => {
        return (
            <img
                src={`${rowData.doctor.avatar}`}
                alt={rowData.doctor.avatar}
                className="shadow-2 border-round"
                style={{ width: "64px" }}
            />
        );
    };

    const ratingBodyTemplate = (rowData) => {
        return (
            <Rating
                value={rowData.rating}
                readOnly
                cancel={false}
            />
        );
    };

    const statusBodyTemplate = (rowData) => {
        return (
            <Tag
                value={rowData.blood_type}
                severity={getSeverity(rowData)}
            ></Tag>
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex flex-row">
                <Link to={`/clinics/view/${rowData.id}`}>
                    <button className="mx-2 flex items-center gap-x-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
                        <Eye size={16} /> View
                    </button>
                </Link>
                <Link to={`/clinics/edit/${rowData.id}`}>
                    <button className="mx-2 flex items-center gap-x-2 text-blue-500 dark:text-blue-600">
                        <UserPen size={16} /> Edit
                    </button>
                </Link>

                <button
                    onClick={() => confirmDeleteProduct(rowData)}
                    className="mx-2 flex items-center gap-x-2 text-red-500 hover:text-red-900 dark:text-red-600 dark:hover:text-red-300"
                >
                    <AiFillDelete size={24} />
                </button>
            </div>
        );
    };

    const addressTemplate = (rowData) => {
        return Object.values(rowData.address)
            .filter((line) => line && line.trim()) // Exclude empty lines
            .join(" , ");
    };

    const header = (
        <div className="align-items-center justify-content-between flex flex-wrap gap-2">
            <h4 className="m-0">Manage Clinics</h4>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText
                    type="search"
                    onInput={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Search..."
                />
            </IconField>
        </div>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar
                    className="mb-4"
                    left={leftToolbarTemplate}
                    right={rightToolbarTemplate}
                ></Toolbar>

                <DataTable
                    ref={dt}
                    value={products}
                    selection={selectedProducts}
                    onSelectionChange={(e) => setSelectedProducts(e.value)}
                    dataKey="id"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Doctors"
                    globalFilter={globalFilter}
                    header={header}
                >
                    <Column
                        selectionMode="multiple"
                        exportable={false}
                    ></Column>
                    <Column
                        field="id"
                        header="ID"
                        sortable
                        style={{ minWidth: "6rem" }}
                    ></Column>
                    <Column
                        header="Address"
                        sortable
                        body={addressTemplate}
                        style={{ minWidth: "8rem" }}
                    ></Column>
                    <Column
                        field="image"
                        header="Image"
                        body={imageBodyTemplate}
                    ></Column>
                    <Column
                        field="ar_name"
                        header="ar_name"
                        sortable
                        style={{ minWidth: "rem" }}
                    ></Column>
                    <Column
                        field="en_name"
                        header="en_name"
                        sortable
                        style={{ minWidth: "rem" }}
                    ></Column>
                    <Column
                        field="city.ar_name"
                        header="City"
                        sortable
                        style={{ minWidth: "rem" }}
                    ></Column>
                    <Column
                        field="city.en_name"
                        header="City"
                        sortable
                        style={{ minWidth: "rem" }}
                    ></Column>
                    <Column
                        field="doctor.ar_full_name"
                        header="Name"
                        sortable
                        style={{ minWidth: "rem" }}
                    ></Column>
                    <Column
                        field="doctor.phone"
                        header="Phone"
                        sortable
                        style={{ minWidth: "rem" }}
                    ></Column>

                    <Column
                        body={actionBodyTemplate}
                        exportable={false}
                        style={{ minWidth: "12rem" }}
                    ></Column>
                </DataTable>
            </div>
        </div>
    );
}
