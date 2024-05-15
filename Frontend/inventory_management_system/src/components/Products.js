import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Products() {

    // useEffect hook to load products once when the component mounts
    useEffect(() => {
        getProducts();
    }, []);

    // State to hold the products data
    const [productData, setProductData] = useState([]);

    // Function to fetch products data from the server
    const getProducts = async () => {
        try {
            const res = await fetch("http://localhost:3001/products", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();

            // Check response status and update state with product data
            if (res.status === 201) {
                console.log("Data Retrieved.");
                setProductData(data);
            }
            else {
                console.log("Something went wrong. Please try again.");
            }
        } catch (err) {
            console.log(err);
        }
    };

    // Function to handle product deletion
    const deleteProduct = async (id) => {
        const response = await fetch(`http://localhost:3001/deleteproduct/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await response.json();
        console.log(deletedata);

        // Handle deletion response and refresh product list
        if (response.status === 422 || !deletedata) {
            console.log("Error");
        } else {
            console.log("Product deleted");
            getProducts(); // Refresh list after deletion
        }
    };

    // Component's JSX structure for rendering the product list
    return (
        <>
            <div className='container-fluid p-5'>
                <h1>Products Inventory</h1>
                <div className='add_button'>
                    <NavLink to="/insertproduct" className='btn btn-primary fs-5'> + Add New Product</NavLink>
                </div>
                <div className="overflow-auto mt-3" style={{ maxHeight: "38rem" }}>
                    <table className="table table-striped table-hover mt-3 fs-5">
                        <thead>
                            <tr className="tr_color">
                                <th scope="col">#</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Product Price</th>
                                <th scope="col">Product Barcode</th>
                                <th scope="col">Update</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                // Map over productData to render rows for each product
                                productData.map((element, id) => {
                                    return (
                                        <tr key={id}>
                                            <th scope="row">{id + 1}</th>
                                            <td>{element.ProductName}</td>
                                            <td>{element.ProductPrice}</td>
                                            <td>{element.ProductBarcode}</td>
                                            <td><NavLink to={`/updateproduct/${element._id}`} className="btn btn-primary"><i className="fa-solid fa-pen-to-square"></i></NavLink></td>
                                            <td><button className="btn btn-danger" onClick={() => deleteProduct(element._id)}><i className="fa-solid fa-trash"></i></button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
