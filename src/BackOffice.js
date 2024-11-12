import React, { useState, useEffect } from 'react';
import { CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CContainer, CFormCheck, CFormInput, CFormSelect, CRow, CTable, CTableBody, CTableHeaderCell, CTableRow } from '@coreui/react';

const BackOffice = () => {
    const [categories, setCategories] = useState([]);
    const [categoryInput, setCategoryInput] = useState({ name: '', order: '', hidden: false, tv: 1 });
    const [products, setProducts] = useState([]);
    const [productInput, setProductInput] = useState({ name: '', price: '', category_id: '', order: '', discount: false, soldout: false, hidden: false });
    const [editCategoryId, setEditCategoryId] = useState(null);
    const [editProductId, setEditProductId] = useState(null);
    const [editingCategory, setEditingCategory] = useState({ id: null, name: '', order: '', hidden: false, tv: '' });
    const [editingProduct, setEditingProduct] = useState({ id: null, name: '', price: '',order: '', category_id: '', discount: false, soldout: false, hidden: false });

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
            categoryInput.hidden = `${categoryInput.hidden}`
            const response = await fetch(`${API_URL}/categories`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(categoryInput),
            });
            const addedCategory = await response.json();
            setCategories(addedCategory);
           // setCategoryInput(categoryInput);
        }
    };

    const handleDeleteCategory = async (id) => {
        await fetch(`${API_URL}/categories/${id}`, {
            method: 'DELETE',
        });
        setCategories(categories.filter(cat => cat.id !== id));
    };

    const handleEditCategoryInput = (cat) => {
        setEditingCategory({ id: cat.id, name: cat.name, order: cat.order, hidden: cat.hidden == 'true', tv: cat.tv });
    };

    const handleUpdateCategory = async (id) => {
        if (editingCategory) {
            const response = await fetch(`${API_URL}/categories/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingCategory),
            });
            const data = await response.json();
            setCategories(categories.map(cat => (cat.id === id ? data : cat)));
            setEditingCategory({ id: null, name: '' , order: '', hidden: false, tv: 1 });
        }
    };

    const handleAddProduct = async () => {
        if (productInput.name && productInput.price && productInput.category_id) {
            const newProduct = {
                name: productInput.name,
                price: parseFloat(productInput.price),
                category_id: parseInt(productInput.category_id),
                order: parseInt(productInput.order),
                discount: `${productInput.discount}`,
                soldout: `${productInput.soldout}`,
                hidden: `${productInput.hidden}`
            };
            const response = await fetch(`${API_URL}/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProduct),
            });
            const addedProduct = await response.json();
            setProducts([...products, addedProduct]);
            //setProductInput({ name: '', price: '', category_id: '',  order: '', discount: 'false', soldout: 'false', hidden: 'false'  });
        }
    };

    const handleDeleteProduct = async (id) => {
        await fetch(`${API_URL}/products/${id}`, {
            method: 'DELETE',
        });
        setProducts(products.filter(prod => prod.id !== id));
    };

    const handleEditProductInput = (prod) => {
        setEditingProduct({ id: prod.id, name: prod.name, price: prod.price, category_id: prod.category_id, order: prod.order, discount: (prod.discount === "true"), soldout: (prod.soldout === "true"), hidden: (prod.hidden === "true") });
    };

    const handleUpdateProduct = async (id) => {
        if (editingProduct.name && editingProduct.price && editingProduct.category_id) {
            const updatedProduct = {
                name: editingProduct.name,
                price: parseFloat(editingProduct.price),
                category_id: parseInt(editingProduct.category_id),
                order: parseInt(editingProduct.order),
                discount: `${editingProduct.discount}`,
                soldout: `${editingProduct.soldout}`,
                hidden: `${editingProduct.hidden}`

            };
            const response = await fetch(`${API_URL}/products/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProduct),
            });
            const data = await response.json();
            setProducts(products.map(prod => (prod.id === id ? data : prod)));
            setEditingProduct({ id: null, name: '', price: '', category_id: '', order: '',discount: false, soldout: false, hidden: false });
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
                            <CFormInput className="mt-2"
                                type="text"
                                value={categoryInput.name}
                                onChange={(e) => setCategoryInput({ ...categoryInput, name: e.target.value })}
                                placeholder="Enter category name"
                            />
                            <CFormInput className="mt-2"
                                type="number"
                                placeholder="Order"
                                value={categoryInput.order}
                                onChange={(e) => setCategoryInput({ ...categoryInput, order: e.target.value })}
                            />
                            <CFormCheck className="mt-2"
                                checked={categoryInput.hidden}
                                onChange={(e) => setCategoryInput({ ...categoryInput, hidden: e.target.checked })}
                            /> Hidden
                            <CFormSelect className="mt-2"
                                 value={categoryInput.tv}
                                onChange={(e) => setCategoryInput({ ...categoryInput, tv: e.target.value })}
                            >
                                 <option value="1">TV 1</option>
                                <option value="2">TV 2</option>
                            </CFormSelect>
                            <CButton className="mt-2" color="primary" onClick={handleAddCategory}>
                               <b>CLICK TO Add Category</b> 
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
                                        <CTableHeaderCell>Order</CTableHeaderCell>
                                        <CTableHeaderCell>Hidden</CTableHeaderCell>
                                        <CTableHeaderCell>TV</CTableHeaderCell>
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
                                                    <CFormInput
                                                    type="number"
                                                    value={editingCategory.order}
                                                    onChange={(e) => setEditingCategory({ ...editingCategory, order: e.target.value })}
                                                    />
                                                ) : (
                                                    cat.order
                                                )}
                                            </CTableHeaderCell>
                                            <CTableHeaderCell>
                                                {editingCategory.id === cat.id ? (
                                                    <CFormCheck
                                                    checked={editingCategory.hidden}
                                                    onChange={(e) => setEditingCategory({ ...editingCategory, hidden: e.target.checked })}
                                                    />
                                                ) : (
                                                    cat.hidden
                                                )}
                                            </CTableHeaderCell>
                                            {editingCategory.id === cat.id ? (

                                                <CFormSelect
                                            value={editingCategory.tv}
                                                onChange={(e) => setEditingCategory({ ...editingCategory, tv: e.target.value })}
                                                options={[
                                                    { label: 'TV 1', value: '1'},
                                                    { label: 'TV 2', value: '2'},
                                                ]}
                        
                            />
                        ) : (
                            cat.tv
                        )}
                                            <CTableHeaderCell>
                                                {editingCategory.id === cat.id ? (
                                                    <>
                                                        <CButton color="success" onClick={() => handleUpdateCategory(cat.id)}>Save</CButton>
                                                        <CButton color="danger" onClick={() => setEditingCategory({ id: null, name: '', order: '', hidden: '', tv: '' })}>Cancel</CButton>
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
                        <br></br>
                        <CCardHeader> <b>Add Product</b></CCardHeader>
                        <CCardBody>
                            <CFormInput className="mt-2"
                                type="text"
                                placeholder="Product Name"
                                value={productInput.name}
                                onChange={(e) => setProductInput({ ...productInput, name: e.target.value })}
                            />
                            <CFormInput className="mt-2"
                                type="number"
                                placeholder="Price"
                                value={productInput.price}
                                onChange={(e) => setProductInput({ ...productInput, price: e.target.value })}
                            />
                            <CFormSelect className="mt-2"
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
                            <CFormCheck className="mt-2 pr-2"
                            checked={productInput.discount}
                            onChange={(e) => setProductInput({ ...productInput, discount: e.target.checked })}
                        /> Discount
                        <CFormCheck className="mt-2 "
                            checked={productInput.soldout}
                            onChange={(e) => setProductInput({ ...productInput, soldout: e.target.checked })}
                        /> Sold Out
                        <CFormCheck className="mt-2"
                            checked={productInput.hidden}
                            onChange={(e) => setProductInput({ ...productInput, hidden: e.target.checked })}
                        /> Hidden
                        </CCardBody>
                        <CCardFooter>                          <CButton className="mt-2" color="primary" onClick={handleAddProduct}>
                                Add Product
                            </CButton> </CCardFooter>
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
                                        <CTableHeaderCell>Discount</CTableHeaderCell>
                                        <CTableHeaderCell>Sold Out</CTableHeaderCell>
                                        <CTableHeaderCell>Hidden</CTableHeaderCell>
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
                                                    <CFormCheck
                                                    checked={editingProduct.discount }
                                                    onChange={(e) => setEditingProduct({ ...editingProduct, discount: e.target.checked })}
                                                    />
                                                ) : (
                                                    `${prod.discount}`
                                                )}
                                            </CTableHeaderCell>
                                            <CTableHeaderCell>
                                                {editingProduct.id === prod.id ? (
                                                    <CFormCheck
                                                    checked={editingProduct.soldout }
                                                    onChange={(e) => setEditingProduct({ ...editingProduct, soldout: e.target.checked })}
                                                    />
                                                ) : (
                                                    prod.soldout 
                                                )}
                                            </CTableHeaderCell>
                                            <CTableHeaderCell>
                                                {editingProduct.id === prod.id ? (
                                                    <CFormCheck
                                                    checked={editingProduct.hidden}
                                                    onChange={(e) => setEditingProduct({ ...editingProduct, hidden: e.target.checked })}
                                                    />
                                                ) : (
                                                    prod.hidden
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
                                                        <CButton color="danger" onClick={() => setEditingProduct({ id: null, name: '', price: '', category_id: '', discount: false, soldout: false, hidden: false })}>Cancel</CButton>
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
