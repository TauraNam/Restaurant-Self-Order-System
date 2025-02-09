import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const AddNewProduct = () => {

    const navigate = useNavigate()
    const [categories, setCategories] = useState([])

    const handleAddNewProduct = (e) => {
        e.preventDefault()
        const elements = e.target.elements
        const title = elements.title.value.trim()
        const category = elements.category.value
        const image = elements.image.files[0]
        const description = elements.description.value.trim()
        const price = elements.price.value.trim()

        const formData = new FormData()
        formData.append("title", title)
        formData.append("category", category)
        formData.append("description", description)
        formData.append("price", price)
        formData.append("image", image)

        fetch('/api/products/', {
            method: 'POST',
            body: formData,
        })
            .then(response => {
                if (!response.ok) throw new Error('Network response')
                navigate('/admin/products')
            })
            .catch(err => console.log('Error during fetch', err))
    }

    const getCategories = () => {
        fetch('/api/categories/')
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

    return (
        <div className="form-container">
            <div className="form-styles">
                <h2>Add new product</h2>
                <form onSubmit={handleAddNewProduct}>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" required />
                    <label htmlFor="category">Category</label>
                    <select name="category" id="category" required>
                        {categories && categories.map((category, index) => {
                            return <option key={index} value={category._id}>{category.title} </option>
                        })}
                    </select>
                    <label htmlFor="image">Image</label>
                    <input type="file" name="image" id="image" required />
                    <label htmlFor="description">Description</label>
                    <textarea name="description" rows="6" id="description" required />
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" id="price" step="0.01" required />
                    <button type="submit" className="button-styles">Add new product</button>
                </form>
            </div>
        </div >
    );
}

export default AddNewProduct;