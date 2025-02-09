import { useEffect, useState } from "react"

const CategoriesList = ({ activeCategory, setActiveCategory, setCurrentPage }) => {

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

    const handleCategoryChange = (category) => {
        setCurrentPage(1)
        setActiveCategory(category)
    }

    const allCategoryImage = "http://localhost:4000/uploads/all_categories.jpg"

    return (
        <div className="restaurant-categories">
            <div>
                <button className={`restaurant-category-link ${activeCategory === "All" ? 'active-category' : ''}`} onClick={() => handleCategoryChange("All")} > All
                    <img src={allCategoryImage} alt="All Category" />
                </button>
            </div>
            {categories && categories.map((category, index) => (
                <div key={index}>
                    <button className={`restaurant-category-link ${activeCategory === category ? 'active-category' : ''}`} onClick={() => handleCategoryChange(category)} >{category.title}
                        <img src={`http://localhost:4000/uploads/${category.imagePath}`} alt="product" />
                    </button>
                </div>
            ))}
        </div>
    );
}

export default CategoriesList;