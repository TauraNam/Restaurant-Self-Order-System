import { AiOutlineShoppingCart } from 'react-icons/ai';


const RestaurantHeader = ({toggleCart}) => {
    return (
        <header className="restaurant-header">
            <div>Logo</div>
            <input type="search" placeholder="Search..." />
            <div>
            <button className="main-cart-button" onClick={toggleCart}>
                <AiOutlineShoppingCart className="header-icon" />
            </button>
            </div>
        </header>
    );
}

export default RestaurantHeader;