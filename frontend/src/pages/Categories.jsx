import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Categories() {

    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState("");

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {

        try {

            const res = await API.get("/categories");

            setCategories(res.data.data);

        } catch (error) {

            console.log(error);

        }

    };

    const addCategory = async () => {

        try {

            await API.post("/categories", {
                category_name: categoryName
            });

            alert("Category Added Successfully");

            setCategoryName("");

            fetchCategories();

        } catch (error) {

            console.log(error);

        }

    };

    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <h2 className="mb-4">
                    Categories
                </h2>

                <div className="mb-4">

                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Enter Category Name"
                        value={categoryName}
                        onChange={(e) =>
                            setCategoryName(e.target.value)
                        }
                    />

                    <button
                        className="btn btn-primary"
                        onClick={addCategory}
                    >
                        Add Category
                    </button>

                </div>

                <table className="table table-bordered table-striped">

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Category Name</th>
                        </tr>
                    </thead>

                    <tbody>

                        {categories.map((category) => (

                            <tr key={category.category_id}>

                                <td>
                                    {category.category_id}
                                </td>

                                <td>
                                    {category.category_name}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>
        </>
    );
}

export default Categories;