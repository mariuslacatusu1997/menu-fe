import React from "react";
import Category from "./Category";

function MenuMain({ categories }) {
  return (
    <div className="menuMain">
      {categories.map((category, index) => (
        category.parent_id == null || category.parent_id === "" ? <Category key={index} category={category} />: '' 
      ))}
    </div>
  );
}

export default MenuMain;
