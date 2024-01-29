import React from "react";

export default function Eye({ eye_color }) {
  return (
    <i
      data-toggle="tooltip"
      title={eye_color}
      className="fa-regular fa-eye"
      style={{ color: eye_color }}
    ></i>
  );
}
