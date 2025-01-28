import CartCard from "./CartCard";

const Cart = ({ isCartOpen, toggleCart, cart, emptyCart, clearCartProduct }) => {

    const calculateTotalAmount = () => {
        if (!cart || cart.length === 0) return 0;

        return cart.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    };

    const totalAmount = calculateTotalAmount();

    const placeOrder = () => {
        const order = {
            tableNumber: 12,
            products: cart.map((product) => {
                return {
                    "product": product._id,
                    "quantity": product.quantity
                }
            }),
            orderPrice: totalAmount,
            notes: document.querySelector('#notes').value,
            status: "Pending"
        }


        fetch('/api/orders', {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) throw new Error('Network response')
        })
        .catch(err => console.log('Error during fetch', err))
    }

    return (
        <div className={`cart ${isCartOpen ? 'open' : ''}`}>
            <div className="cart-content">
                <h2>My Order</h2>
                {cart.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    cart.map((item, index) => {
                        const button = (
                            <button className="cart-clear-item-button"
                                onClick={() => clearCartProduct(item._id)}>
                                    x
                            </button>
                        );
                    
                        return (
                            <CartCard key={index} item={item} button={button} />
                        );
                    })
                )}
                <div className="cart-buttons">
                    <button className="empty-cart-button" onClick={emptyCart}>Empty Cart</button>
                    <button className="close-cart-button" onClick={toggleCart}>Close Cart</button>
                </div>
                <div className="cart-total-amount">
                    <p>Total Amount: </p>
                    <p>{totalAmount.toFixed(2)} € </p>
                </div>
                <textarea id="notes" placeholder="Add your notes (optional)" rows="4" cols="40" />
                <button className="checkout-cart-button" onClick={placeOrder}>Place Order</button>
            </div>
        </div>
    );
}

export default Cart;