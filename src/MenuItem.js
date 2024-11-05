import React from "react";

function MenuItem({ item }) {
  return (
    <div className="menu-item">
      <span>{item.name}</span>
    </div>
  );
}

export default MenuItem;
