import axios from "axios";

const fetchData = async (url) => {
    try {
        const { data } = await axios.get(url, {
            headers: {
                Authorization: `${import.meta.env.VITE_AUTH_KEY}`,
                "ngrok-skip-browser-warning": "sss",
            },
        });
        return data.data;
    } catch (e) {
        console.log(e);
        return [];
    }
};

export const ProductService = {
    getProductsData() {
        return fetchData(`${import.meta.env.VITE_BACKEND_URL}api/clinics`);
    },

    getProductsWithOrdersData() {
        // return [
        //     {
        //         id: "1000",
        //         code: "f230fh0g3",
        //         name: "Bamboo Watch",
        //         description: "Product Description",
        //         image: "bamboo-watch.jpg",
        //         price: 65,
        //         category: "Accessories",
        //         quantity: 24,
        //         inventoryStatus: "INSTOCK",
        //         rating: 5,
        //         orders: [
        //             {
        //                 id: "1000-0",
        //                 productCode: "f230fh0g3",
        //                 date: "2020-09-13",
        //                 amount: 65,
        //                 quantity: 1,
        //                 customer: "David James",
        //                 status: "PENDING",
        //             },
        //             {
        //                 id: "1000-1",
        //                 productCode: "f230fh0g3",
        //                 date: "2020-05-14",
        //                 amount: 130,
        //                 quantity: 2,
        //                 customer: "Leon Rodrigues",
        //                 status: "DELIVERED",
        //             },
        //             {
        //                 id: "1000-2",
        //                 productCode: "f230fh0g3",
        //                 date: "2019-01-04",
        //                 amount: 65,
        //                 quantity: 1,
        //                 customer: "Juan Alejandro",
        //                 status: "RETURNED",
        //             },
        //             {
        //                 id: "1000-3",
        //                 productCode: "f230fh0g3",
        //                 date: "2020-09-13",
        //                 amount: 195,
        //                 quantity: 3,
        //                 customer: "Claire Morrow",
        //                 status: "CANCELLED",
        //             },
        //         ],
        //     },
        // ];

        return [];
    },

    getProductsMini() {
        return Promise.resolve(this.getProductsData().slice(0, 5));
    },

    getProductsSmall() {
        return Promise.resolve(this.getProductsData().slice(0, 10));
    },

    getProducts() {
        return Promise.resolve(this.getProductsData());
    },

    getProductsWithOrdersSmall() {
        return Promise.resolve(this.getProductsWithOrdersData().slice(0, 10));
    },

    getProductsWithOrders() {
        return Promise.resolve(this.getProductsWithOrdersData());
    },
};
