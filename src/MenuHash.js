import React, { useState, useEffect } from "react";
import "./styles.css";
import MenuMain from "./MenuMain";

const fetchMenuData = async () => {
  try {
    const apiUrl = 'http://localhost:5000';

    // Fetch categories
    const categoryResponse = await fetch(`${apiUrl}/categories?tv=2`);
    const categories = await categoryResponse.json();

    // Fetch products
    const productResponse = await fetch(`${apiUrl}/products`);
    const products = await productResponse.json();

    // Validate that categories and products are arrays
    const validCategories = Array.isArray(categories) ? categories : [];
    const validProducts = Array.isArray(products) ? products : [];

    // Transform data into the desired structure
    const formattedMenuData = {
      categories: validCategories.map(category => ({
        name: category.name,
        items: validProducts
          .filter(product => product.category_id === category.id)
          .map(product => ({
            name: product.name,
            price: product.price
          }))
      }))
    };

    return formattedMenuData;
  } catch (error) {
    console.error("Error fetching or formatting menu data:", error);
    return { categories: [] }; // Return an empty structure in case of error
  }
};

function MenuHash() {
  const [menuData, setMenuData] = useState(null); // Initialize with null

  useEffect(() => {
    // Fetch menu data when the component mounts
    const fetchData = async () => {
      const data = await fetchMenuData();
      setMenuData(data); // Set the fetched data to state
    };
    fetchData();
  }, []);

  // Render loading state until data is ready
  if (!menuData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="menu">
      <div className="menu-overlay">
        <header>
        </header>
        <MenuMain categories={menuData.categories} />
      </div>
    </div>
  );
}

export default MenuHash;
