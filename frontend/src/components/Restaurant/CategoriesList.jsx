import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const CategoriesList = () => {

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

    return (
        <div className="restaurant-categories">
            <div>
                    <Link to={`/#All`} className="restaurant-category-link" >All</Link>
                </div>
            {categories && categories.map((category, index) => (
                <div key={index}>
                    <Link to={`/#${category.title}`} className="restaurant-category-link" >{category.title}</Link>
                </div>
            ))}
        </div>
    );
}

export default CategoriesList;