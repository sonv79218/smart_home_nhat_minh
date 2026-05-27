// ============================================
// PAGINATION COMPONENT
// ============================================
import { useMemo } from "react";

// Generate page numbers with ellipsis
const getPageNumbers = (currentPage, totalPages) => {
  const pages = [];
  const delta = 1; // Pages to show around current

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - delta && i <= currentPage + delta)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return pages;
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Generate page numbers
  const pageNumbers = useMemo(
    () => getPageNumbers(currentPage, totalPages),
    [currentPage, totalPages]
  );

  // Don't render if only 1 page
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <>
      <style>{paginationStyles}</style>
      <div className="pagination">
        {/* Prev Button */}
        <button
          className={`page-btn prev-btn ${currentPage === 1 ? "disabled" : ""}`}
          onClick={handlePrev}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span className="btn-text">Prev</span>
        </button>

        {/* Page Numbers */}
        <div className="page-numbers">
          {pageNumbers.map((page, index) =>
            page === "..." ? (
              <span key={`ellipsis-${index}`} className="ellipsis">
                ...
              </span>
            ) : (
              <button
                key={page}
                className={`page-number ${currentPage === page ? "active" : ""}`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            )
          )}
        </div>

        {/* Next Button */}
        <button
          className={`page-btn next-btn ${currentPage === totalPages ? "disabled" : ""}`}
          onClick={handleNext}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <span className="btn-text">Next</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </>
  );
};

const paginationStyles = `
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin: 32px 0;
    flex-wrap: wrap;
  }

  .page-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 10px 16px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    color: #0f172a;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .page-btn:hover:not(.disabled) {
    background: #f1f5f9;
    border-color: #cbd5e1;
    transform: translateY(-1px);
  }

  .page-btn.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .page-numbers {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .page-number {
    min-width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    color: #64748b;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .page-number:hover:not(.active) {
    background: #f1f5f9;
    border-color: #cbd5e1;
    color: #0f172a;
  }

  .page-number.active {
    background: linear-gradient(135deg, #2563eb, #38bdf8);
    border-color: transparent;
    color: #ffffff;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
  }

  .ellipsis {
    padding: 0 8px;
    color: #94a3b8;
    font-size: 14px;
    font-weight: 500;
  }

  /* Mobile */
  @media (max-width: 640px) {
    .pagination {
      gap: 6px;
    }

    .page-btn {
      padding: 8px 12px;
      font-size: 13px;
    }

    .page-number {
      min-width: 36px;
      height: 36px;
      font-size: 13px;
      border-radius: 8px;
    }

    .btn-text {
      display: none;
    }

    .page-btn svg {
      margin: 0;
    }
  }

  /* Small Mobile */
  @media (max-width: 400px) {
    .page-numbers {
      gap: 4px;
    }

    .page-number {
      min-width: 32px;
      height: 32px;
      font-size: 12px;
      border-radius: 6px;
    }

    .ellipsis {
      padding: 0 4px;
      font-size: 12px;
    }
  }
`;

export default Pagination;
