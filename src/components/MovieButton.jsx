import { useState } from "react";
import OpeningCrawl from "./OpeningCrawl";

export default function MovieButton({
  children,
  onHandleShowCharacters,
  movie,
  isCurrentMovie,
}) {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="col-4 d-flex flex-column align-items-center">
      <button
        type="button"
        className={`btn ${
          isCurrentMovie ? "btn-success" : "btn-primary"
        } m-3 star-wars-btn-primary`}
        onClick={onHandleShowCharacters}
      >
        {children}
      </button>
      <button
        type="button"
        className="btn btn-warning"
        onClick={handleOpenModal}
      >
        Crawl
      </button>
      {showModal && (
        <OpeningCrawl
          openingCrawl={movie.opening_crawl}
          title={movie.title}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
