import { useEffect, useState } from "react"
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md"
import { Link } from "react-router-dom"

const Categories = ({ user }) => {

    const [categories, setCategories] = useState([])

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

    useEffect(() => {
        getCategories()
    }, [])

    const handleDelete = (categoryId) => {
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

    return (
        <div className="table-container">
            <div className="buttons-container">
                <Link to="/admin/categories/addCategory" className="button-styles">Add new category</Link>
            </div>
            <table className="table-overview">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Sorting Order</th>
                        {/* <th>Image</th> */}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories && categories.map((category, index) => {
                        return <tr key={index}>
                            <td>{category.title}</td>
                            <td>{category.sortingOrder}</td>
                            {/* <td>{category.imagePath}</td> */}
                            <td className="table-actions">
                                <MdDeleteOutline onClick={() => handleDelete(category._id)} className="action-icon" />
                                <Link to={"/admin/categories/edit/" + category._id}>
                                    <MdOutlineEdit className="action-icon" />
                                </Link>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Categories;