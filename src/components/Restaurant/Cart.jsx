import { useRef } from 'react'
import CartCard from "./CartCard"
import { AiOutlineClose } from "react-icons/ai"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const Cart = ({ isCartOpen, toggleCart, cart, emptyCart, clearCartProduct }) => {

    const navigate = useNavigate()
    const takeAwayRef = useRef(null)
    const notesRef = useRef(null)

    const calculateTotalAmount = () => {
        if (!cart || cart.length === 0) return 0

        return cart.reduce((total, item) => {
            return total + (item.price * item.quantity)
        }, 0)
    }

    const totalAmount = calculateTotalAmount()

    const placeOrder = () => {
        const takeAwayValue = takeAwayRef.current ? takeAwayRef.current.checked : false
        const notesValue = notesRef.current ? notesRef.current.value : ''

        const tableNumber = localStorage.getItem('tableNumber') + (takeAwayValue ? ' - Take Away' : '')
        const order = {
            tableNumber: tableNumber,
            products: cart.map((product) => ({
                product: product._id,
                quantity: product.quantity
            })),
            orderPrice: totalAmount,
            notes: notesValue,
            status: "Pending"
        }

        fetch('/api/orders', {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to place order')
                }
                return response.json()
            })
            .then((data) => {
                navigate('/orders/' + data._id)
                toast.success('Order successful!')
                emptyCart()
            })
            .catch((err) => {
                console.error('Error placing order:', err)
                toast.warning('Something went wrong. Please try again later.')
            })
    }

    return (
        <div className={`cart ${isCartOpen ? 'open' : ''}`}>
            <div className="cart-close-button" onClick={toggleCart}>
                <AiOutlineClose className="cart-close-icon" />
            </div>

            <div className="cart-content">
                <h2>My Order</h2>
                {cart.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    cart.map((item, index) => {
                        const button = (
                            <button className="cart-clear-item-button"
                                onClick={() => clearCartProduct(item._id)}>
                                <AiOutlineClose className="cart-icon" />
                            </button>
                        )

                        return (
                            <CartCard key={index} item={item} button={button} />
                        )
                    })
                )}
                <div className="cart-buttons">
                    <button className="empty-cart-button" onClick={emptyCart}>Empty Cart</button>
                    <div className="cart-total-amount">
                        <p>Total Amount: </p>
                        <p>{totalAmount.toFixed(2)}€ </p>
                    </div>
                    <div className="cart-take-away">
                        <label htmlFor="take-away">Take away?</label>
                        <input type="checkbox" id="take-away" ref={takeAwayRef}></input>
                    </div>
                    <textarea
                        ref={notesRef} // Priskiriame ref prie 'textarea'
                        placeholder="Add your notes (optional)"
                        rows="4"
                        cols="40"
                        className="notes"
                    />
                    <button className="checkout-cart-button" onClick={placeOrder}>Place Order</button>
                </div>
            </div>
        </div>
    );
}

export default Cart;
