import { Fragment, useEffect, useState } from "react"
import { MdDeleteOutline } from "react-icons/md"
import { FaTimes, FaCheck } from "react-icons/fa"
import { IoMdDoneAll } from "react-icons/io";
import { FaClockRotateLeft } from "react-icons/fa6";
import OrderStatusFilter from "./OrderStatusFilter";

const Orders = ({ user }) => {
    const [orders, setOrders] = useState([])
    const [expandedOrders, setExpandedOrders] = useState([]);
    const [activeStatus, setActiveStatus] = useState("All")
    const [filteredOrders, setFilteredOrders] = useState([])

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

    const toggleDetails = (orderId) => {
        setExpandedOrders((prev) => {
            const updated = prev.includes(orderId)
                ? prev.filter((id) => id !== orderId)
                : [...prev, orderId];
            return updated;
        });
    };

    const filterOrdersByActiveStatus = () => {
        console.log(expandedOrders)
        if (activeStatus === 'All') {
            setFilteredOrders(orders)
        } else {
            setFilteredOrders(orders.filter(item => item.status === activeStatus))
        }  
    }

    useEffect(() => {
        filterOrdersByActiveStatus()
    }, [orders, activeStatus])

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

    const handleStatusChange = (orderId, status) => {
        fetch('/api/orders/' + status + "/" + orderId, { method: 'POST' })
            .then(response => {
                if (!response.ok) throw new Error('Cannot change status.')
            })
            .then(() => {
                setOrders(prevOrders => prevOrders.map(order => {
                    if (order._id === orderId) {
                        order.status = status
                    }
                    return order
                }))
            })
            .catch(err => console.log('Error during change status', err))
    }

    const renderStatusIcon = (order) => {
        switch (order.status) {
            case 'Pending':
                return (
                    <>
                        <FaCheck className="action-icon" onClick={() => handleStatusChange(order._id, 'Approved')} />
                        <FaTimes className="action-icon" onClick={() => handleStatusChange(order._id, 'Declined')} />
                    </>
                );
            case 'Approved':
                return (
                    <>
                        <FaClockRotateLeft className="action-icon" onClick={() => handleStatusChange(order._id, 'In-process')} />
                        <FaTimes className="action-icon" onClick={() => handleStatusChange(order._id, 'Declined')} />
                    </>
                );
            case 'In-process':
                return (
                    <>
                        <IoMdDoneAll className="action-icon" onClick={() => handleStatusChange(order._id, 'Completed')} />
                        <FaTimes className="action-icon" onClick={() => handleStatusChange(order._id, 'Declined')} />
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="table-container">
            <OrderStatusFilter activeStatus={activeStatus} setActiveStatus={setActiveStatus} />
            <table className="table-overview">
                <thead>
                    <tr>
                        <th>Table Number</th>
                        <th>Time</th>
                        <th>Notes</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders && filteredOrders.map((order, index) => (
                        <Fragment key={index}>
                            <tr>
                                <td>{order.tableNumber}</td>
                                <td>{
                                    new Date(order.createdAt).toLocaleTimeString('lt-LT', {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    }) + " " + new Date(order.createdAt).toLocaleDateString()
                                }</td>
                                <td>
                                    {order.notes ? <FaCheck className="icon-yes" /> : <FaTimes className="icon-no" />}
                                </td>
                                <td>
                                    <span className={`status-label ${order.status === 'Pending' ? 'status-pending' : order.status === 'Approved' ? 'status-approved' : order.status === 'Declined' ? 'status-declined' : order.status === 'In-process' ? 'status-in-process' : 'status-completed'}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="table-actions">
                                    {renderStatusIcon(order)}
                                    <MdDeleteOutline onClick={() => handleDelete(order._id)} className="action-icon" />
                                    <button onClick={() => toggleDetails(order._id)}>
                                        {expandedOrders.includes(order._id) ? "Hide more details" : "Show more details"}
                                    </button>
                                </td>
                            </tr>

                            {expandedOrders.includes(order._id) && order.products && order.products.length > 0 && (
                                <tr>
                                    <td colSpan="5">
                                        <div>
                                            <h4>Product List:</h4>
                                            <ul>
                                                {order.products.map((product, idx) => (
                                                    <li key={idx}>
                                                        Product ID: {product.product}, Quantity: {product.quantity}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Orders;
