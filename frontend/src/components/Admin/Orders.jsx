import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md"


const Orders = ({ user }) => {

    const [orders, setOrders] = useState([]);

    const getOrders = () => {
        fetch('/api/orders')
            .then(response => {
                if (!response.ok) throw new Error('Network response.')
                return response.json()
            })
            .then(ordersData => {
                setOrders(ordersData)
            })
            .catch(err => console.log('Error during fetch.', err))
    }

    useEffect(() => {
        getOrders()
    }, [])


    const handleDelete = (orderId) => {
        fetch('/api/orders/' + orderId, { method: 'DELETE' })
            .then(response => {
                if (!response.ok) throw new Error('Cannot delete.')
                return response.json()
            })
            .then(deleteOrder => {
                setOrders(prevOrders => prevOrders.filter(order => order._id !== deleteOrder._id))
            })
            .catch(err => console.log('Error during delete', err))
    }

    return (
        <>
            <div className="table-container">
                <div className="buttons-container">
                    {/* <Link to="/admin/orders/addOrder" className="button-styles">Add new order</Link> */}
                </div>
                <table className="table-overview">
                    <thead>
                        <tr>
                            <th>Table Number</th>
                            <th>Products</th>
                            <th>Timestamp</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders && orders.map((order, index) => {
                            return <tr key={index}>
                                <td>{order.tableNumber}</td>
                                <td>
                                    {order.products.map((item, index) => (
                                        <div key={index}>
                                            {item.product.name} - {item.quantity} 
                                        </div>
                                    ))}
                                    </td>
                                <td>{new Date(order.timestamps).toLocaleDateString()}</td>
                                <td className="table-actions">
                                    <MdDeleteOutline onClick={() => handleDelete(order._id)} className="action-icon" />
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Orders;