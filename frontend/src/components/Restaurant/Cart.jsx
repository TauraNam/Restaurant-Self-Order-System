const Cart = ({ isCartOpen, toggleCart, cart, emptyCart, clearCartProduct }) => {

    const calculateTotalAmount = () => {
        if (!cart || cart.length === 0) return 0;

        return cart.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    };

    const totalAmount = calculateTotalAmount();

    return (
        <div className={`cart ${isCartOpen ? 'open' : ''}`}>
            <div className="cart-content">
                <h2>My Order</h2>
                {cart.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    cart.map((item, index) => (

                        <div key={index} className="cart-content-details">
                            <img src={`http://localhost:4000/uploads/${item.imagePath}`} alt="product"></img>
                            <p className="cart-title">{item.quantity > 1 ? `${item.quantity} x` : ''} {item.title}</p>
                            <p className="cart-price">{item.price} €</p>
                            <button className="cart-clear-item-button" onClick={() => clearCartProduct(item._id)}>x</button>
                        </div>
                    ))
                )}
                <div className="cart-buttons">
                    <button className="empty-cart-button" onClick={emptyCart}>Empty Cart</button>
                    <button className="close-cart-button" onClick={toggleCart}>Close Cart</button>
                </div>
                <div className="cart-total-amount">
                    <p>Total Amount: </p>
                    <p>{totalAmount.toFixed(2)} € </p>
                </div>
                <button className="checkout-cart-button">Checkout</button>
            </div>
        </div>
    );
}

export default Cart;