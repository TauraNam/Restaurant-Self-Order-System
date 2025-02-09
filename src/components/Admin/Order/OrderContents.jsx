import { useEffect, useState } from "react"

const OrderContents = ({ order }) => {

    const [products, setProducts] = useState([])

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
        if (order.products) {
            loadProducts(order.products)
        }
    }, [])

    return (
        <div>
            <table className="order-more-information-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td data-label="Title">{product.title}</td>
                            <td data-label="Quantity">{product.quantity}</td>
                            <td data-label="Price">{product.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {order.notes && <p className="order-notes"><span>Notes:</span> {order.notes}</p>}
        </div>
    );
}

export default OrderContents;