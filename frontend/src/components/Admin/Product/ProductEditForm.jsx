import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const ProductEditForm = () => {

    const { id } = useParams()
    const [product, setProduct] = useState([])
    const [categories, setCategories] = useState([])
    const [image, setImage] = useState({ path: '', file: undefined })
    const navigate = useNavigate()
    const defaultImagePath = `http://localhost:4000/uploads/`

    const getProduct = () => {
        fetch('/api/products/' + id)
            .then(response => {
                if (!response.ok) throw new Error('Network response')
                return response.json()
            })
            .then(productData => {
                setProduct(productData)
                setImage({ path: defaultImagePath + productData.imagePath })
            })
            .catch(err => console.log('Error during fetch', err))
    }

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
        getProduct()
        getCategories()
    }, [])

    const handleEdit = (e) => {
        e.preventDefault()
        const elements = e.target.elements
        const title = elements.title.value.trim()
        const category = elements.category.value
        const description = elements.description.value.trim()
        const price = elements.price.value.trim()

        const formData = new FormData()
        formData.append("title", title)
        formData.append("category", category)
        formData.append("description", description)
        formData.append("price", price)
        formData.append("image", image.file)

        fetch('/api/products/' + id, {
            method: 'PUT',
            body: formData
        })
            .then(response => {
                if (!response.ok) throw new Error('Network response')
                navigate('/admin/products')
            })
            .catch(err => console.log('Error during fetch', err))
    }

    const handleDelete = (productId) => {
        const confirm = window.confirm("Ar you sure you want to DELETE this order?")
        if (confirm) {
            fetch('/api/products/' + productId, { method: 'DELETE' })
                .then(response => {
                    if (!response.ok) throw new Error('Nepavyko delete')
                    navigate('/admin/products')
                })
                .catch(err => console.log('Error during delete', err))
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]

        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setImage({ path: imageUrl, file })
        }
    }

    const handleImageCancel = () => {
        setImage({ path: defaultImagePath + product.imagePath, file: undefined })
    }

    return (
        <div className="form-container">
            <div className="form-styles">
                <h2>Edit Product</h2>
                <form onSubmit={handleEdit}>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" defaultValue={product.title} required />
                    <label htmlFor="category">Category</label>
                    <select name="category" id="category" defaultValue='' required>
                        {categories && categories.map((category, index) => {
                            return <option key={index} value={category._id}
                                selected={product.category === category._id ? true : undefined}>{category.title} </option>
                        })}
                    </select>
                    <label htmlFor="image">Image</label>
                    <input type="file" name="image" id="image" onChange={handleImageChange} />
                    <div className="edit-image-container">
                        {image && (
                            <img
                                src={image.path}
                                alt="product"
                                className="edit-image"
                            />
                        )}
                        {image.path !== defaultImagePath + product.imagePath && (
                            <button type="button" onClick={handleImageCancel}>Cancel</button>
                        )}
                    </div>
                    <label htmlFor="description">Description</label>
                    <textarea name="description" rows="6" id="description" defaultValue={product.description} required />
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" id="price" step="0.01" defaultValue={product.price} required />
                    <button type="submit" className="button-styles">Update</button>
                    <button type="button" onClick={() => handleDelete(product._id)} className="button-styles">Delete</button>
                </form>
            </div>
        </div>
    );
}


export default ProductEditForm;