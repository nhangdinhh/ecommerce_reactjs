import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('users');
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchUsers();
    fetchOrders();
    fetchProducts();

    const ws = new WebSocket('ws://localhost:5000');
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      switch (message.type) {
        case 'NEW_PRODUCT':
          setProducts((prev) => [...prev, message.product]);
          break;
        case 'UPDATE_PRODUCT':
          setProducts((prev) =>
            prev.map((product) => product.id === message.product.id ? message.product : product)
          );
          break;
        case 'DELETE_PRODUCT':
          setProducts((prev) =>
            prev.filter((product) => product.id !== message.id)
          );
          break;
        case 'NEW_USER':
          setUsers((prev) => [...prev, message.user]);
          break;
        case 'NEW_ORDER':
          setOrders((prev) => [...prev, message.order]);
          break;
        default:
          break;
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  const renderSection = () => {
    switch (activeSection) {
      case 'users':
        return <UserManagement users={users} />;
      case 'products':
        return <ProductManagement products={products} setProducts={setProducts} />;
      case 'orders':
        return <OrderManagement orders={orders} />;
      default:
        return <UserManagement users={users} />;
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <h2>Management</h2>
        <button onClick={() => setActiveSection('users')}>
          <i className="fas fa-user"></i> Users
        </button>
        <button onClick={() => setActiveSection('products')}>
          <i className="fas fa-box"></i> Products
        </button>
        <button onClick={() => setActiveSection('orders')}>
          <i className="fas fa-clipboard-list"></i> Orders
        </button>
      </div>
      <div className="admin-content">
        {renderSection()}
      </div>
    </div>
  );
}

function UserManagement({ users }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-table-container">
      <h2>User Management</h2>
      <input 
        type="text" 
        className="search-bar" 
        placeholder="Search users..." 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <table className="admin-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ProductManagement({ products, setProducts }) {
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '', image: '', category: '' });
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddProduct = async () => {
    try {
      const newProductToAdd = { ...newProduct, id: products.length ? Math.max(products.map(p => p.id)) + 1 : 1 };
      await axios.post('http://localhost:5000/api/products', newProductToAdd);
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
      setNewProduct({ name: '', price: '', stock: '', image: '', category: '' });
      setIsAddingProduct(false);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/products/${editingProduct.id}`, editingProduct);
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
      setEditingProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-table-container">
      <h2>Product Management</h2>
      <div className="search-add-container">
        <input 
          type="text" 
          className="search-bar" 
          placeholder="Search products..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="add-product-button" onClick={() => setIsAddingProduct(true)}>Add Product</button>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Image</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <React.Fragment key={product.id}>
              <tr>
                <td>{index + 1}</td>
                <td><img src={product.image} alt={product.name} className="product-image" /></td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>${product.price.toLocaleString()}</td>
                <td>{product.stock}</td>
                <td className="action-buttons">
                  <button className="edit-button" onClick={() => setEditingProduct(product)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
      {isAddingProduct && (
        <div className="edit-overlay">
          <div className="edit-product-form">
            <h3>Add New Product</h3>
            <label>
              Name:
              <input
                type="text"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
            </label>
            <label>
              Price:
              <input
                type="text"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              />
            </label>
            <label>
              Category:
              <input
                type="text"
                placeholder="Category"
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              />
            </label>
            <label>
              Stock Quantity:
              <input
                type="text"
                placeholder="Stock Quantity"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
              />
            </label>
            <label>
              Image URL:
              <input
                type="text"
                placeholder="Image URL"
                value={newProduct.image}
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
              />
            </label>
            <button className="save-edit-button" onClick={handleAddProduct}>Add Product</button>
            <button className="cancel-edit-button" onClick={() => setIsAddingProduct(false)}>Cancel</button>
          </div>
        </div>
      )}
      {editingProduct && (
        <div className="edit-overlay">
          <div className="edit-product-form">
            <h3>Edit Product</h3>
            <label>
              Name:
              <input
                type="text"
                placeholder="Product Name"
                value={editingProduct.name}
                onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
              />
            </label>
            <label>
              Price:
              <input
                type="text"
                placeholder="Price"
                value={editingProduct.price}
                onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
              />
            </label>
            <label>
              Category:
              <input
                type="text"
                placeholder="Category"
                value={editingProduct.category}
                onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
              />
            </label>
            <label>
              Stock Quantity:
              <input
                type="text"
                placeholder="Stock Quantity"
                value={editingProduct.stock}
                onChange={(e) => setEditingProduct({ ...editingProduct, stock: e.target.value })}
              />
            </label>
            <label>
              Image URL:
              <input
                type="text"
                placeholder="Image URL"
                value={editingProduct.image}
                onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
              />
            </label>
            <button className="save-edit-button" onClick={handleSaveEdit}>Save Changes</button>
            <button className="cancel-edit-button" onClick={() => setEditingProduct(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

function OrderManagement({ orders }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = orders.filter(order =>
    order.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-table-container">
      <h2>Order Management</h2>
      <input 
        type="text" 
        className="search-bar" 
        placeholder="Search orders..." 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <table className="admin-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Order Date</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{order.user.name}</td>
              <td>{order.user.email}</td>
              <td>{order.user.phone}</td>
              <td>{order.user.address}</td>
              <td>{new Date(order.orderDate).toLocaleString()}</td>
              <td>${order.totalAmount.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
