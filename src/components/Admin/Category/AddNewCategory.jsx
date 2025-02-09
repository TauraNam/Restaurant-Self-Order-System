import { useNavigate } from "react-router-dom"

const AddNewCategory = () => {
    
    const navigate = useNavigate()

    const handleAddNewCategory = (e) => {
        e.preventDefault()
        const elements = e.target.elements
        const title = elements.title.value.trim()
        const sortingOrder = elements.sortingOrder.value.trim()
        const image = elements.image.files[0]

        const formData = new FormData()
        formData.append("title", title)
        formData.append("sortingOrder", sortingOrder)
        formData.append("image", image)

        fetch('/api/categories/', {
            method: 'POST',
            body: formData,
        })
            .then(response => {
                if (!response.ok) throw new Error('Network response')
                navigate('/admin/categories')
            })
            .catch(err => console.log('Error during fetch', err))
    }

    return (
        <div className="form-container">
            <div className="form-styles">
                <h2>Add new category</h2>
                <form onSubmit={handleAddNewCategory}>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" required />
                    <label htmlFor="sortingOrder">Sorting order</label>
                    <input type="number" name="sortingOrder" id="sortingOrder" required />
                    <label htmlFor="image">Image</label>
                    <input type="file" name="image" id="image" required />
                    <button type="submit" className="button-styles">Add new category</button>
                </form>
            </div>
        </div >
    );
}

export default AddNewCategory;