import { Fragment, useEffect, useState } from "react"
import { MdDeleteOutline } from "react-icons/md"
import { FaTimes, FaCheck } from "react-icons/fa"
import { IoMdDoneAll } from "react-icons/io"
import { FaClockRotateLeft } from "react-icons/fa6"
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import OrderStatusFilter from "./OrderStatusFilter"
import { useSearch } from "../../../context/SearchContext"
import OrderContents from "./OrderContents"
import Pagination from "../../Shared/Pagination"

const Orders = () => {

    const [orders, setOrders] = useState([])
    const [expandedOrders, setExpandedOrders] = useState([])
    const [activeStatus, setActiveStatus] = useState("All")
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const { searchText } = useSearch()

    const getOrders = () => {
        fetch(`/api/orders?page=${currentPage}${activeStatus !== "All" ? '&status=' + activeStatus : ""}`)
            .then(response => {
                if (!response.ok) throw new Error('Network response.')
                return response.json()
            })
            .then(({ orders, totalPages }) => {
                setOrders(orders)
                setTotalPages(totalPages)
            })
            .catch(err => console.log('Error during fetch.', err))
    }

    useEffect(() => {
        getOrders()
    }, [currentPage, activeStatus, searchText])

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page)
        }
    }

    const toggleDetails = (orderId) => {
        setExpandedOrders((prev) => {
            const updated = prev.includes(orderId)
                ? prev.filter((id) => id !== orderId)
                : [...prev, orderId]
            return updated
        })
    }

    const handleDelete = (orderId) => {
        const confirm = window.confirm("Ar you sure you want to DELETE this order?")
        if (confirm) {
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
    }

    const handleStatusChange = (orderId, status) => {
        const confirm = window.confirm("Ar you sure you want to CHANGE status?")
        if (confirm) {
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
    }

    const statusActions = {
        Pending: [
            { icon: FaCheck, status: "Approved" },
            { icon: FaTimes, status: "Declined" }
        ],
        Approved: [
            { icon: FaClockRotateLeft, status: "In-process" },
            { icon: FaTimes, status: "Declined" }
        ],
        "In-process": [
            { icon: IoMdDoneAll, status: "Completed" },
            { icon: FaTimes, status: "Declined" }
        ]
    }

    const renderStatusIcon = (order) => (
        statusActions[order.status]?.map(({ icon: Icon, status }) => (
            <Icon key={status} className="action-icon" onClick={() => handleStatusChange(order._id, status)} />
        )) || null
    )

    return (
        <div className="table-container">
            <OrderStatusFilter activeStatus={activeStatus} setActiveStatus={setActiveStatus} setCurrentPage={setCurrentPage} />
            <table className="table-overview">
                <thead>
                    <tr>
                        <th>Table #</th>
                        <th>Order #</th>
                        <th>Time</th>
                        <th>Notes</th>
                        <th>Status</th>
                        <th className="table-actions-col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders && orders.map((order, index) => (
                        <Fragment key={index}>
                            <tr className="table-overview-row">
                                <td data-label="Table #" >{order.tableNumber}</td>
                                <td data-label="Order #" ><b>#{order.orderId}</b></td>
                                <td data-label="Time">
                                    {
                                        new Date(order.createdAt).toLocaleTimeString('lt-LT', {
                                            timeZone: 'Europe/Vilnius',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: false,
                                        })} {new Date(order.createdAt).toLocaleDateString('lt-LT', {
                                            timeZone: 'Europe/Vilnius',
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                        })}
                                </td>
                                <td data-label="Notes">
                                    {order.notes ? <FaCheck className="icon-yes" /> : <FaTimes className="icon-no" />}
                                </td>
                                <td data-label="Status">
                                    <span className={`status-label ${order.status === 'Pending' ? 'status-pending' : order.status === 'Approved' ? 'status-approved' : order.status === 'Declined' ? 'status-declined' : order.status === 'In-process' ? 'status-in-process' : 'status-completed'}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="table-actions-col" data-label="Actions">
                                    <div className="table-actions table-actions-orders">
                                        {renderStatusIcon(order)}
                                        <MdDeleteOutline onClick={() => handleDelete(order._id)} className="action-icon" />
                                        {expandedOrders.includes(order._id) ? (
                                            <FaChevronUp
                                                onClick={() => toggleDetails(order._id)}
                                                style={{ cursor: 'pointer', transition: 'transform 0.3s ease' }}
                                                className="action-icon"
                                            />
                                        ) : (
                                            <FaChevronDown
                                                onClick={() => toggleDetails(order._id)}
                                                style={{ cursor: 'pointer', transition: 'transform 0.3s ease' }}
                                                className="action-icon"
                                            />
                                        )}
                                    </div>
                                </td>
                            </tr>

                            {expandedOrders.includes(order._id) && order.products && order.products.length > 0 && (
                                <tr className="order-contents">
                                    <td colSpan="6">
                                        <OrderContents order={order} />
                                    </td>
                                </tr>
                            )}
                        </Fragment>
                    ))}
                </tbody>
            </table>
            {totalPages > 1 && <Pagination currentPage={currentPage} handlePageChange={handlePageChange} totalPages={totalPages} />}
        </div>
    );
}

export default Orders;
