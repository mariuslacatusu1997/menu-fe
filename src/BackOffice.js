import React, { useState, useEffect } from 'react';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CFormInput, CFormSelect, CRow, CTable, CTableBody, CTableHeaderCell, CTableRow } from '@coreui/react';

const BackOffice = () => {
    const [categories, setCategories] = useState([]);
    const [categoryInput, setCategoryInput] = useState('');
    const [products, setProducts] = useState([]);
    const [productInput, setProductInput] = useState({ name: '', price: '', category_id: '' });
    const [editCategoryId, setEditCategoryId] = useState(null);
    const [editProductId, setEditProductId] = useState(null);
    const [editingCategory, setEditingCategory] = useState({ id: null, name: '' });
    const [editingProduct, setEditingProduct] = useState({ id: null, name: '', price: '', category_id: '' });

    const API_URL = 'http://localhost:5000';

    useEffect(() => {
        initializeFiles();
        loadCategories();
        loadProducts();
    }, []);

    const initializeFiles = async () => {
        await fetch(`${API_URL}/initialize`);
    };

    const loadCategories = async () => {
        const response = await fetch(`${API_URL}/categories`);
        const data = await response.json();
        setCategories(data);
    };

    const loadProducts = async () => {
        const response = await fetch(`${API_URL}/products`);
        const data = await response.json();
        setProducts(data);
    };

    const handleAddCategory = async () => {
        if (categoryInput) {
            const newCategory = { name: categoryInput };
            const response = await fetch(`${API_URL}/categories`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCategory),
            });
            const addedCategory = await response.json();
            setCategories([...categories, addedCategory]);
            setCategoryInput('');
        }
    };

    const handleDeleteCategory = async (id) => {
        await fetch(`${API_URL}/categories/${id}`, {
            method: 'DELETE',
        });
        setCategories(categories.filter(cat => cat.id !== id));
    };

    const handleEditCategoryInput = (cat) => {
        setEditingCategory({ id: cat.id, name: cat.name });
    };

    const handleUpdateCategory = async (id) => {
        if (editingCategory.name) {
            const updatedCategory = { name: editingCategory.name };
            const response = await fetch(`${API_URL}/categories/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedCategory),
            });
            const data = await response.json();
            setCategories(categories.map(cat => (cat.id === id ? data : cat)));
            setEditingCategory({ id: null, name: '' });
        }
    };

    const handleAddProduct = async () => {
        if (productInput.name && productInput.price && productInput.category_id) {
            const newProduct = {
                name: productInput.name,
                price: parseFloat(productInput.price),
                category_id: parseInt(productInput.category_id),
            };
            const response = await fetch(`${API_URL}/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProduct),
            });
            const addedProduct = await response.json();
            setProducts([...products, addedProduct]);
            setProductInput({ name: '', price: '', category_id: '' });
        }
    };

    const handleDeleteProduct = async (id) => {
        await fetch(`${API_URL}/products/${id}`, {
            method: 'DELETE',
        });
        setProducts(products.filter(prod => prod.id !== id));
    };

    const handleEditProductInput = (prod) => {
        setEditingProduct({ id: prod.id, name: prod.name, price: prod.price, category_id: prod.category_id });
    };

    const handleUpdateProduct = async (id) => {
        if (editingProduct.name && editingProduct.price && editingProduct.category_id) {
            const updatedProduct = {
                name: editingProduct.name,
                price: parseFloat(editingProduct.price),
                category_id: parseInt(editingProduct.category_id),
            };
            const response = await fetch(`${API_URL}/products/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProduct),
            });
            const data = await response.json();
            setProducts(products.map(prod => (prod.id === id ? data : prod)));
            setEditingProduct({ id: null, name: '', price: '', category_id: '' });
        }
    };

    return (
        <CContainer className="mt-5">
            <h1 className="mb-4">Back Office</h1>

            <CRow className="mb-4">
                <CCol>
                    <CCard>
                        <CCardHeader>Add Category</CCardHeader>
                        <CCardBody>
                            <CFormInput
                                type="text"
                                value={categoryInput}
                                onChange={(e) => setCategoryInput(e.target.value)}
                                placeholder="Enter category name"
                            />
                            <CButton className="mt-2" onClick={handleAddCategory}>
                                Add Category
                            </CButton>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>Categories</CCardHeader>
                        <CCardBody>
                            <CTable striped bordered hover>
                                <thead>
                                    <tr>
                                        <CTableHeaderCell>ID</CTableHeaderCell>
                                        <CTableHeaderCell>Name</CTableHeaderCell>
                                        <CTableHeaderCell>Actions</CTableHeaderCell>
                                    </tr>
                                </thead>
                                <CTableBody>
                                    {categories.map((cat) => (
                                        <CTableRow key={cat.id}>
                                            <CTableHeaderCell>{cat.id}</CTableHeaderCell>
                                            <CTableHeaderCell>
                                                {editingCategory.id === cat.id ? (
                                                    <CFormInput
                                                        type="text"
                                                        value={editingCategory.name}
                                                        onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                                                    />
                                                ) : (
                                                    cat.name
                                                )}
                                            </CTableHeaderCell>
                                            <CTableHeaderCell>
                                                {editingCategory.id === cat.id ? (
                                                    <>
                                                        <CButton color="success" onClick={() => handleUpdateCategory(cat.id)}>Save</CButton>
                                                        <CButton color="danger" onClick={() => setEditingCategory({ id: null, name: '' })}>Cancel</CButton>
                                                    </>
                                                ) : (
                                                    <>
                                                        <CButton color="warning" onClick={() => handleEditCategoryInput(cat)}>Edit</CButton>
                                                        <CButton color="danger" onClick={() => handleDeleteCategory(cat.id)}>Delete</CButton>
                                                    </>
                                                )}
                                            </CTableHeaderCell>
                                        </CTableRow>
                                    ))}
                                </CTableBody>
                            </CTable>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            <CRow className="mt-4">
                <CCol>
                    <CCard>
                        <CCardHeader>Add Product</CCardHeader>
                        <CCardBody>
                            <CFormInput
                                type="text"
                                placeholder="Product Name"
                                value={productInput.name}
                                onChange={(e) => setProductInput({ ...productInput, name: e.target.value })}
                            />
                            <CFormInput
                                type="number"
                                placeholder="Price"
                                value={productInput.price}
                                onChange={(e) => setProductInput({ ...productInput, price: e.target.value })}
                            />
                            <CFormSelect
                                value={productInput.category_id}
                                onChange={(e) => setProductInput({ ...productInput, category_id: e.target.value })}
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </CFormSelect>
                            <CButton className="mt-2" onClick={handleAddProduct}>
                                Add Product
                            </CButton>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            <CRow className="mt-4">
                <CCol>
                    <CCard>
                        <CCardHeader>Products</CCardHeader>
                        <CCardBody>
                            <CTable striped bordered hover>
                                <thead>
                                    <tr>
                                        <CTableHeaderCell>ID</CTableHeaderCell>
                                        <CTableHeaderCell>Name</CTableHeaderCell>
                                        <CTableHeaderCell>Price</CTableHeaderCell>
                                        <CTableHeaderCell>Category ID</CTableHeaderCell>
                                        <CTableHeaderCell>Actions</CTableHeaderCell>
                                    </tr>
                                </thead>
                                <CTableBody>
                                    {products.map((prod) => (
                                        <CTableRow key={prod.id}>
                                            <CTableHeaderCell>{prod.id}</CTableHeaderCell>
                                            <CTableHeaderCell>
                                                {editingProduct.id === prod.id ? (
                                                    <CFormInput
                                                        type="text"
                                                        value={editingProduct.name}
                                                        onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                                    />
                                                ) : (
                                                    prod.name
                                                )}
                                            </CTableHeaderCell>
                                            <CTableHeaderCell>
                                                {editingProduct.id === prod.id ? (
                                                    <CFormInput
                                                        type="number"
                                                        value={editingProduct.price}
                                                        onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                                                    />
                                                ) : (
                                                    prod.price
                                                )}
                                            </CTableHeaderCell>
                                            <CTableHeaderCell>
                                                {editingProduct.id === prod.id ? (
                                                    <CFormSelect
                                                        value={editingProduct.category_id}
                                                        onChange={(e) => setEditingProduct({ ...editingProduct, category_id: e.target.value })}
                                                    >
                                                        <option value="">Select Category</option>
                                                        {categories.map((cat) => (
                                                            <option key={cat.id} value={cat.id}>
                                                                {cat.name}
                                                            </option>
                                                        ))}
                                                    </CFormSelect>
                                                ) : (
                                                    prod.category_id
                                                )}
                                            </CTableHeaderCell>
                                            <CTableHeaderCell>
                                                {editingProduct.id === prod.id ? (
                                                    <>
                                                        <CButton color="success" onClick={() => handleUpdateProduct(prod.id)}>Save</CButton>
                                                        <CButton color="danger" onClick={() => setEditingProduct({ id: null, name: '', price: '', category_id: '' })}>Cancel</CButton>
                                                    </>
                                                ) : (
                                                    <>
                                                        <CButton color="warning" onClick={() => handleEditProductInput(prod)}>Edit</CButton>
                                                        <CButton color="danger" onClick={() => handleDeleteProduct(prod.id)}>Delete</CButton>
                                                    </>
                                                )}
                                            </CTableHeaderCell>
                                        </CTableRow>
                                    ))}
                                </CTableBody>
                            </CTable>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </CContainer>
    );
};

export default BackOffice;
