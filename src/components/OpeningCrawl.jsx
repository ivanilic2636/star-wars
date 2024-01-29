export default function StarWarsModal({ openingCrawl, title, onClose }) {
  return (
    <div className="star-wars-modal-overlay">
      <div className="star-wars-fade"></div>
      <div className="star-wars-modal">
        <div className="crawl-content">
          <div className="crawl-text">
            <h1 className="mb-5">{title}</h1>
            <p>{openingCrawl}</p>
          </div>
        </div>
        <button onClick={onClose} className="close-modal btn-close">
          X
        </button>
      </div>
    </div>
  );
}
