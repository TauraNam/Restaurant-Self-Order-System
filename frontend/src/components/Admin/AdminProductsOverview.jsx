import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { MdDeleteOutline } from "react-icons/md"
import { MdOutlineEdit } from "react-icons/md"


const AdminProductsOverview = ({ user }) => {

    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    

    const getProducts = () => {
        fetch('/api/products')
            .then(response => {
                if (!response.ok) throw new Error('Network response.')
                return response.json()
            })
            .then(products => {
                setProducts(products)
            })
            .catch(err => console.log('Error during fetch.', err))
    }

    const handleDelete = (productId) => {
        fetch('/api/products/' + productId, { method: 'DELETE' })
            .then(response => {
                if (!response.ok) throw new Error('Cannot delete.')
                return response.json()
            })
            .then(deleteProduct => {
                setProducts(prevProducts => prevProducts.filter(product => product._id !== deleteProduct._id))
            })
            .catch(err => console.log('Error during delete', err))
    }

    const getCategories = () => {
        fetch('/api/categories')
            .then(response => {
                if (!response.ok) throw new Error('Network response.')
                return response.json()
            })
            .then(categoriesData => {
                setCategories(categoriesData)
            })
            .catch(err => console.log('Error during fetch', err))
    }

    useEffect(() => {
        getProducts()
        getCategories()
    }, [])

    return (
        <div className="table-container">
            <div className="buttons-container">
                <Link to="/admin/products/addProduct" className="button-styles">Add new product</Link>
                <Link className="button-styles" to="/" target="_blank">Main products page</Link>
            </div>
            <table className="table-overview">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.map((product, index) => {
                        return <tr key={index}>
                            <td>
                                <img src={`http://localhost:4000/uploads/${product.imagePath}`} alt="product"></img>
                            </td>
                            <td>{product.title}</td>
                            <td>{categories && categories.map((category) => {
                                if (category._id === product.category) {
                                    return category.title
                                }
                            })}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td className="table-actions">
                                <MdDeleteOutline onClick={() => handleDelete(product._id)} className="action-icon" />
                                <Link to={"/admin/products/edit/" + product._id}>
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

export default AdminProductsOverview;