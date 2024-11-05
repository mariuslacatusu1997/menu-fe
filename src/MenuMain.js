import React from "react";
import Category from "./Category";

function MenuMain({ categories }) {
  return (
    <div className="menuMain">
      {categories.map((category, index) => (
        <Category key={index} category={category} />
      ))}
    </div>
  );
}

export default MenuMain;
