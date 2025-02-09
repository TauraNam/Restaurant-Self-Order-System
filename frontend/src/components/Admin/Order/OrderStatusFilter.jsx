const OrderStatusFilter = ({ activeStatus, setActiveStatus, setCurrentPage }) => {

  const handleStatusChange = (status) => {
    setCurrentPage(1)
    setActiveStatus(status)
  }

  const statuses = ['All', 'Pending', 'Approved', 'In-process', 'Completed', 'Declined']

  return (
    <div className="buttons-container">
      {statuses.map((status) => (
        <button
          key={status}
          className={`button-styles ${activeStatus === status ? 'active' : ''}`}
          onClick={() => handleStatusChange(status)}
        >
          {status}
        </button>
      ))}
    </div>);
}

export default OrderStatusFilter;