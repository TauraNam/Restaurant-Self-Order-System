import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const CategoriesList = ({activeCategory, setActiveCategory}) => {

    const [categories, setCategories] = useState([])

    const getCategories = () => {
        fetch('/api/categories/')
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
        getCategories()
    }, [])

    const handleStatusChange = (category) => {
        setActiveCategory(category)
      }


    return (
        <div className="restaurant-categories">
            <div>
                    <button className="restaurant-category-link" onClick={() => handleStatusChange("All")} >All</button>
                </div>
            {categories && categories.map((category, index) => (
                <div key={index}>
                    <button className="restaurant-category-link"  onClick={() => handleStatusChange(category)} >{category.title}
                    <img src={`http://localhost:4000/uploads/${category.imagePath}`} alt="product"></img>
                    </button>
                </div>
            ))}
        </div>
    );
}

export default CategoriesList;