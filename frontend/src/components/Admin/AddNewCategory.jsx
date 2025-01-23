import { useNavigate } from "react-router-dom"

const AddNewCategory = ({ user }) => {
    const navigate = useNavigate()

    const handleAddNewCategory = (e) => {
        e.preventDefault()
        const elements = e.target.elements
        const title = elements.title.value.trim()
        const sortingOrder = elements.sortingOrder.value.trim()
        const imagePath = elements.imagePath.value.trim()

        fetch('/api/categories/', {
            method: 'POST',
            body: JSON.stringify({ title, sortingOrder, imagePath }),
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
                <input type="text" name="imagePath" id="image" required />
                <button type="submit" className="button-styles">Add new category</button>
            </form>
        </div>
    </div >
);
}

export default AddNewCategory;