import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CartCard from "./CartCard"
import BackButton from "./BackButton"


const OrderDetails = () => {

    const { id } = useParams()
    const [order, setOrder] = useState(null)
    const [products, setProducts] = useState([])

    const getOrder = () => {
        fetch('/api/orders/' + id)
            .then(response => {
                if (!response.ok) throw new Error('Network response')
                return response.json()
            })
            .then(orderData => {
                setOrder(orderData)
            })
            .catch(err => console.log('Error during fetch', err))
    }

    const loadProducts = (orderProducts) => {
        const fetchedProducts = orderProducts.map((productObj) => {
            return fetch('/api/products/' + productObj.product)
                .then(response => {
                    if (!response.ok) throw new Error('Network response')
                    return response.json()
                })
                .then(product => ({
                    ...product,
                    quantity: productObj.quantity,
                }))
                .catch(err => console.log('Error during fetch', err))
        })

        Promise.all(fetchedProducts).then((products) => {
            setProducts(products)
        })
    }

    useEffect(() => {
        getOrder()
    }, [id])

    useEffect(() => {
        if (order) {
            loadProducts(order.products)
        }
    }, [order])

    if (!order) return <div>Loading order...</div>

    return (
        <div>
            {<BackButton />}
            <div className="order-details-container">
                <div className="cart-additional-details">Order #{order.orderId}</div>
                <div className="cart-additional-details">Your food has been ordered! Enjoy your meal soon!</div>
                <div className="cart-additional-details">Table number: {order.tableNumber}</div>
                <div className="cart-additional-details">Order Summary:</div>
                {products.length > 0 ? (
                    products.map((product, index) => (
                        <CartCard key={index} item={product} className="order-content-details" />
                    ))
                ) : (
                    <div>No products found in this order.</div>
                )}
                <div className="cart-additional-details">Total price: {order.orderPrice}€</div>
                {order.notes && <div className="cart-additional-details">Special Instructions (optional): {order.notes}</div>}
                <div className="cart-additional-details">Order Status: {order.status}</div>
            </div>
        </div>
    );
}

export default OrderDetails;
