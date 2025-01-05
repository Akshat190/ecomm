import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLocation } from 'react-router-dom';

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = category 
          ? `http://localhost:5000/api/products?category=${category}`
          : 'http://localhost:5000/api/products';
        
        const { data } = await axios.get(url);
        setProducts(data.products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const categoryTitle = category 
    ? `${category.charAt(0).toUpperCase() + category.slice(1)} Products`
    : 'All Products';

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">{categoryTitle}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
            <div className="relative pt-[100%] w-full rounded-t-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="absolute top-0 left-0 w-full h-full object-contain bg-gray-50"
              />
            </div>
            <div className="p-4 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  <Link to={`/product/${product._id}`}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </Link>
                </h3>
                <p className="mt-2 text-sm text-gray-500 line-clamp-2">{product.description}</p>
              </div>
              <div className="flex flex-col space-y-3 mt-4">
                <p className="text-lg font-bold text-gray-900">${product.price}</p>
                <button
                  onClick={() => addToCart({
                    id: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: 1
                  })}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;