import { useEffect, useState } from "react"
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md"
import { Link } from "react-router-dom"
import { useSearch } from "../../../context/SearchContext"

const Categories = () => {

    const [categories, setCategories] = useState([])
    const { searchText } = useSearch()

    const getCategories = () => {
        fetch('/api/categories')
            .then(response => {
                if (!response.ok) throw new Error('Network response.')
                return response.json()
            })
            .then(categories => {
                setCategories(categories)
            })
            .catch(err => console.log('Error during fetch', err))
    }

    const filteredCategories = categories.filter(category =>
        category.title.toLowerCase().includes(searchText.toLowerCase()) ||
        category.sortingOrder.toString().includes(searchText)
    )

    useEffect(() => {
        getCategories()
    }, [])

    const handleDelete = (categoryId) => {
        const confirm = window.confirm("Ar you sure you want to DELETE this order?")
        if (confirm) {
            fetch('/api/categories/' + categoryId, { method: 'DELETE' })
                .then(response => {
                    if (!response.ok) throw new Error('Cannot delete.')
                    return response.json()
                })
                .then(deleteCategory => {
                    setCategories(prevCategories => prevCategories.filter(category => category._id !== deleteCategory._id))
                })
                .catch(err => console.log('Error during delete', err))
        }
    }

    return (
        <div className="table-container">
            <div className="buttons-container">
                <Link to="/admin/categories/addCategory" className="button-styles">Add new category</Link>
            </div>
            <table className="table-overview">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Sorting Order</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCategories && filteredCategories.map((category, index) => {
                        return <tr key={index} className="table-overview-row">
                            <td data-label="Image">
                                <img src={`http://localhost:4000/uploads/${category.imagePath}`} alt="product" />
                            </td>
                            <td data-label="Title">{category.title}</td>
                            <td data-label="Sorting Order">{category.sortingOrder}</td>
                            <td className="table-actions-col" data-label="Actions">
                                <div className="table-actions">
                                    <MdDeleteOutline onClick={() => handleDelete(category._id)} className="action-icon" />
                                    <Link to={"/admin/categories/edit/" + category._id}>
                                        <MdOutlineEdit className="action-icon" />
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Categories;