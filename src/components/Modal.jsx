import React from "react";

export default function Modal({ modalId, homeworld }) {
  return (
    <div
      className="modal fade"
      id={`${modalId}`}
      tabIndex="-1"
      aria-labelledby={`${modalId}Label`}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content bg-dark text-light">
          <div className="modal-header">
            <h5 className="modal-title" id={`${modalId}Label`}>
              {homeworld.name}
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>
              <strong>Climate:</strong> {homeworld.climate}
            </p>
            <p>
              <strong>Diameter:</strong> {homeworld.diameter}
            </p>
            <p>
              <strong>Gravity:</strong> {homeworld.gravity}
            </p>
            <p>
              <strong>Orbital Period:</strong> {homeworld.orbital_period}
            </p>
            <p>
              <strong>Population:</strong> {homeworld.population}
            </p>
            <p>
              <strong>Rotation Period:</strong> {homeworld.rotation_period}
            </p>
            <p>
              <strong>Surface Water:</strong> {homeworld.surface_water}
            </p>
            <p>
              <strong>Terrain:</strong> {homeworld.terrain}
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
