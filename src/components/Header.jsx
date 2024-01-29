import React from "react";

export default function Header({ className }) {
  return (
    <div className={`${className}`}>
      <img
        src="/star_wars_logo.png"
        className="header-logo"
        width={400}
        height={150}
        alt="Text"
      />
    </div>
  );
}
