import React from "react";
import MenuItem from "./MenuItem"; // Import the MenuItem component

function Category({ category }) {
  return (
    <div className="category">
      <h2>{category.name}</h2>
      {category.items.map((item, index) => (
        <MenuItem key={index} item={item} />
      ))}
    </div>
  );
}

export default Category;
