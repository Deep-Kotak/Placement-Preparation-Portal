import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Categories() {

    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [editId, setEditId] = useState(null);

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

    const updateCategory = async () => {

        try {

            await API.put(`/categories/${editId}`, {
                category_name: categoryName
            });

            alert("Category Updated Successfully");

            setEditId(null);
            setCategoryName("");

            fetchCategories();

        } catch (error) {

            console.log(error);

        }

    };

    const deleteCategory = async (id) => {

        try {

            await API.delete(`/categories/${id}`);

            alert("Category Deleted Successfully");

            fetchCategories();

        } catch (error) {

            console.log(error);

        }

    };

    const editCategory = (category) => {

        setEditId(category.category_id);
        setCategoryName(category.category_name);

    };

    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <h2 className="mb-4">
                    Categories
                </h2>

                <div className="card p-3 mb-4">

                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Enter Category Name"
                        value={categoryName}
                        onChange={(e) =>
                            setCategoryName(e.target.value)
                        }
                    />

                    {
                        editId ? (
                            <button
                                className="btn btn-warning"
                                onClick={updateCategory}
                            >
                                Update Category
                            </button>
                        ) : (
                            <button
                                className="btn btn-primary"
                                onClick={addCategory}
                            >
                                Add Category
                            </button>
                        )
                    }

                </div>

                <table className="table table-bordered table-striped">

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Category Name</th>
                            <th>Action</th>
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

                                <td>

                                    <button
                                        className="btn btn-success btn-sm me-2"
                                        onClick={() =>
                                            editCategory(category)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                            deleteCategory(category.category_id)
                                        }
                                    >
                                        Delete
                                    </button>

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