import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { MdDeleteOutline } from "react-icons/md"
import { MdOutlineEdit } from "react-icons/md"
import { useSearch } from "../../../context/SearchContext"
import Pagination from "../../Shared/Pagination"

const Products = () => {

    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const { searchText } = useSearch()

    const getProducts = () => {
        fetch(`/api/products?page=${currentPage}`)
            .then(response => {
                if (!response.ok) throw new Error('Network response.')
                return response.json()
            })
            .then(({ products, totalPages }) => {
                setProducts(products)
                setTotalPages(totalPages)
            })
            .catch(err => console.log('Error during fetch.', err))
    }

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchText.toLowerCase()) ||
        product.description.toLowerCase().includes(searchText.toLowerCase()) ||
        String(product.price).includes(searchText)
    )

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
    }, [currentPage])

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page)
            window.scrollTo(0, 0)
        }
    }

    const handleDelete = (productId) => {
        const confirm = window.confirm("Ar you sure you want to DELETE this product?")
        if (confirm) {
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
    }

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
                    {filteredProducts && filteredProducts.map((product, index) => {
                        return <tr key={index} className="table-overview-row">
                            <td data-label="Image">
                                <img src={`http://localhost:4000/uploads/${product.imagePath}`} alt="product" />
                            </td>
                            <td data-label="Title">{product.title}</td>
                            <td data-label="Category">{categories && categories.map((category) => {
                                if (category._id === product.category) {
                                    return category.title
                                }
                            })}</td>
                            <td data-label="Description">{product.description}</td>
                            <td data-label="Price">{product.price}</td>
                            <td data-label="Actions">
                                <div className="table-actions">
                                    <MdDeleteOutline onClick={() => handleDelete(product._id)} className="action-icon" />
                                    <Link to={"/admin/products/edit/" + product._id}>
                                        <MdOutlineEdit className="action-icon" />
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
            {totalPages > 1 && <Pagination currentPage={currentPage} handlePageChange={handlePageChange} totalPages={totalPages} />}
        </div>
    );
}

export default Products;

