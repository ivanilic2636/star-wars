/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }) {
  const pageCount = Math.ceil(totalItems / itemsPerPage);
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={`page-item ${currentPage === page ? "active" : ""}`}
          >
            <a
              className="page-link"
              href="#"
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
