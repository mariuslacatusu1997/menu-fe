

// Function to fetch and structure menu data
const fetchMenuData = async (apiUrl) => {
    try {
        // Fetch categories
        const categoryResponse = await fetch(`${apiUrl}/categories`);
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

// Usage example
const menuData = (async () => {
    const API_URL = 'http://localhost:5000';
    const menuData = await fetchMenuData(API_URL);
    console.log(menuData);
})();
  export default menuData;
  