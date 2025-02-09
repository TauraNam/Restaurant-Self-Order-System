import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const CategoryEditForm = () => {

    const navigate = useNavigate()
    const { id } = useParams()
    const [categories, setCategories] = useState([])
    const [image, setImage] = useState({ path: '', file: undefined })
    const defaultImagePath = `http://localhost:4000/uploads/`

    const getCategories = () => {
        fetch('/api/categories/' + id)
            .then(response => {
                if (!response.ok) throw new Error('Network response.')
                return response.json()
            })
            .then(categories => {
                setCategories(categories)
                setImage({ path: defaultImagePath + categories.imagePath })
            })
            .catch(err => console.log('Error during fetch', err))
    }

    useEffect(() => {
        getCategories()
    }, [])

    const handleEdit = (e) => {
        e.preventDefault()
        const elements = e.target.elements
        const title = elements.title.value.trim()
        const sortingOrder = elements.sortingOrder.value.trim()

        const formData = new FormData()
        formData.append("title", title)
        formData.append("sortingOrder", sortingOrder)
        formData.append("image", image.file)

        fetch('/api/categories/' + id, {
            method: 'PUT',
            body: formData
        })
            .then(response => {
                if (!response.ok) throw new Error('Network response')
                navigate('/admin/categories')
            })
            .catch(err => console.log('Error during fetch', err))
    }

    const handleDelete = (categoryId) => {
        const confirm = window.confirm("Ar you sure you want to DELETE this category?")
        if (confirm) {
            fetch('/api/categories/' + categoryId, { method: 'DELETE' })
                .then(response => {
                    if (!response.ok) throw new Error('Cannot delete.')
                    navigate('/admin/categories')
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
        setImage({ path: defaultImagePath + categories.imagePath, file: undefined })
    }

    return (
        <div className="form-container">
            <div className="form-styles">
                <h2>Edit Category</h2>
                <form onSubmit={handleEdit}>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" defaultValue={categories.title} required />
                    <label htmlFor="sortingOrder">Sorting Order</label>
                    <input type="number" name="sortingOrder" id="sortingOrder" defaultValue={categories.sortingOrder} required />
                    <label htmlFor="image">Image</label>
                    <input type="file" name="image" id="image" onChange={handleImageChange} />
                    <div className="edit-image-container">
                        {image && (
                            <img
                                src={image.path}
                                alt="category"
                                className="edit-image"
                            />
                        )}
                        {image.path !== defaultImagePath + categories.imagePath && (
                            <button type="button" onClick={handleImageCancel}>Cancel</button>
                        )}
                    </div>
                    <button type="submit" className="button-styles">Update</button>
                    <button type="button" onClick={() => handleDelete(categories._id)} className="button-styles">Delete</button>
                </form>
            </div>
        </div>
    );
}

export default CategoryEditForm;