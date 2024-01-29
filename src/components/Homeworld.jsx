import React from "react";
import Modal from "./Modal";

export default function Homeworld({ children, modalId, character }) {
  return (
    <th>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#${modalId}`}
      >
        {character.homeworldData.name}
      </button>

      <Modal modalId={modalId} homeworld={character.homeworldData}></Modal>
    </th>
  );
}
