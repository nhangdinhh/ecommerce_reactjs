const products = [
  { id: 1, name: 'Laptop', price: 800, image: require('../images/product1.jpg'), description: 'This is Laptop', category: 'Electronics', discount: 10, oldPrice: 900, stock: 15 },
  { id: 2, name: 'Shirt', price: 50, image: require('../images/product2.jpg'), description: 'This is Shirt', category: 'Clothing', discount: 5, oldPrice: 55, stock: 50 },
  { id: 12, name: 'Backpack', price: 70, image: require('../images/product12.jpg'), description: 'This is Backpack', category: 'Accessories', discount: 15, oldPrice: 85, stock: 10 },
  { id: 18, name: 'Mice', price: 30, image: require('../images/product18.jpg'), description: 'This is Mice', category: 'Accessories', discount: 10, oldPrice: 40, stock: 5 },
  // Thêm các sản phẩm khác
  { id: 10, name: 'Camera', price: 450, image: require('../images/product10.jpg'), description: 'This is Camera', category: 'Electronics', discount: 20, oldPrice: 625, stock: 8 },
  { id: 11, name: 'Headphone', price: 100, image: require('../images/product11.jpg'), description: 'This is Headphone', category: 'Electronics', discount: 15, oldPrice: 200, stock: 20 },
  
];

export const getProducts = () => {
  return products;
};
