import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


const CategoriesEditForm = () => {
    const navigate = useNavigate()

    const { id } = useParams()
     const [categories, setCategories] = useState([])
    
        const getCategories = () => {
            fetch('/api/categories/' + id)
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
            console.log(categories)
        }, [])


        const handleEdit = (e) => {
            e.preventDefault()
            const elements = e.target.elements
            const title = elements.title.value.trim()
            const sortingOrder = elements.sortingOrder.value.trim()
            const image = elements.image.value.trim()
    
            const formData = new FormData()
            formData.append("title", title)
            formData.append("sortingOrder", sortingOrder)
            formData.append("image", image)
    
            fetch('/api/categories/' + id, {
                method: 'PUT',
                body: JSON.stringify({ title, sortingOrder, image }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (!response.ok) throw new Error('Network response')
                    navigate('/admin/categories');
                })
                .catch(err => console.log('Error during fetch', err))
        }
    
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
        <div className="form-container">
            <div className="form-styles">
                <h2>Edit Category</h2>
                <form onSubmit={handleEdit}>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" defaultValue={categories.title} required />
                    <label htmlFor="sortingOrder">Sorting Order</label>
                    <input type="number" name="sortingOrder" id="sortingOrder" defaultValue={categories.sortingOrder} required />
                    <label htmlFor="image">Image</label>
                    <input type="text" name="image" id="image" defaultValue={categories.imagePath} required />
                    <button type="submit" className="button-styles">Update</button>
                    <button onClick={() => handleDelete(product._id)} className="button-styles">Delete</button>
                </form>
            </div>
        </div>
     );
}
 
export default CategoriesEditForm;