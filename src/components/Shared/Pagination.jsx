import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io"
import { Fragment } from "react"

const Pagination = ({ currentPage, handlePageChange, totalPages }) => {

  const getPageNumbers = () => {
    const pages = new Set()

    pages.add(1)
    pages.add(2)
    pages.add(totalPages - 1)
    pages.add(totalPages)

    for (let i = 5; i < totalPages; i += 5) {
      pages.add(i)
    }

    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      if (i > 1 && i < totalPages) pages.add(i)
    }

    return [...pages].sort((a, b) => a - b)
  }

  const handlePageChangeWithCondition = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      handlePageChange(newPage)
    }
  }

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <IoMdArrowBack
          className="pagination-button"
          onClick={() => handlePageChangeWithCondition(currentPage - 1)}
        />
      )}

      {getPageNumbers().map((page, index, array) => (
        <Fragment key={page}>
          {index > 0 && page - array[index - 1] > 1 && <span>...</span>}
          <button
            className={`page-button ${currentPage === page ? "active" : ""}`}
            onClick={() => handlePageChangeWithCondition(page)}
          >
            {page}
          </button>
        </Fragment>
      ))}

      {currentPage < totalPages && (
        <IoMdArrowForward
          className="pagination-button"
          onClick={() => handlePageChangeWithCondition(currentPage + 1)}
        />
      )}
    </div>
  );
}

export default Pagination;
