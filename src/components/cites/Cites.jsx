import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProductService } from "./service/ProductService";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import Swal from "sweetalert2";
import { InputNumber } from "primereact/inputnumber";
import { classNames } from "primereact/utils";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { Eye, UserPen } from "lucide-react";

import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";

export default function ProductsDemo() {
    let emptyProduct = {
        id: null,
        ar_name: "",
        en_name: "",
        count_clinic: 0,
    };

    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        ProductService.getProducts().then((data) => setProducts(data));
    }, [deleted]);

    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const onCategoryChange = (e) => {
        let _product = { ...product };

        _product["category"] = e.value;
        setProduct(_product);
    };
    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };

    const saveProduct = () => {
        setSubmitted(true);

        if (product.name.trim()) {
            let _products = [...products];
            let _product = { ...product };

            if (product.id) {
                const index = findIndexById(product.id);

                _products[index] = _product;
                toast.current.show({ severity: "success", summary: "Successful", detail: "Product Updated", life: 3000 });
            } else {
                _product.id = createId();
                _product.image = "product-placeholder.svg";
                _products.push(_product);
                toast.current.show({ severity: "success", summary: "Successful", detail: "Product Created", life: 3000 });
            }

            setProducts(_products);
            setProductDialog(false);
            setProduct(emptyProduct);
        }
    };

    const productDialogFooter = (
        <React.Fragment>
            <Button
                label="Cancel"
                icon="pi pi-times"
                outlined
                onClick={hideDialog}
            />
        
            <Button
                label="Add City"
                icon="pi pi-check"
                
            />
        </React.Fragment>
    );
    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    };

    const confirmDeleteProduct = (product) => {
        setProduct(product);

        const callFun = async () => {
            try {
                await axios.delete(`${import.meta.env.VITE_BACKEND_URL}api/cities/${product.id}`, {
                    headers: {
                        "ngrok-skip-browser-warning": "sss",
                        Authorization:  `${import.meta.env.VITE_AUTH_KEY}`,
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
                        text: "Your City has been deleted.",
                        icon: "success",
                    });
                }
            })
            .finally(() => {
                setDeleted((prev) => !prev);
            });
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Link to={`/city/create`}>
                    <Button
                        onClick={openNew}
                        label="Add Cities"
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

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex flex-row">
           
            <Link to={`/cites/edit/${rowData.id}`}>
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

    const header = (
        <div className="align-items-center justify-content-between flex flex-wrap gap-2">
            <h4 className="m-0">Manage Cites</h4>
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
                        field="ar_name"
                        header="AR Name"
                        sortable
                        style={{ minWidth: "16rem" }}
                    ></Column>
                    <Column
                        field="en_name"
                        header="EN Name"
                        sortable
                        style={{ minWidth: "16rem" }}
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
