import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ShoppingCart, Star, Heart, Share2, TruckIcon, ShieldCheck, RefreshCw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
// import { MessageSquare } from 'lucide-react';

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  countInStock: number;
  rating: number;
  numReviews: number;
  category: string;
  reviews: Review[];
}

interface Review {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState('');

  useEffect(() => {
    const fetchProductAndRecommendations = async () => {
      try {
        const [productRes, recommendationsRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/products/${id}`),
          axios.get('http://localhost:5000/api/products')
        ]);

        setProduct(productRes.data);
        // Filter related products by category and exclude current product
        const related = recommendationsRes.data.products
          .filter((p: Product) => 
            p.category === productRes.data.category && p._id !== productRes.data._id
          )
          .slice(0, 4);
        setRelatedProducts(related);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    if (id) {
      fetchProductAndRecommendations();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity
      });
    }
  };

  const fetchProductAndRelated = async () => {
    try {
      const [productRes, relatedRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/products/${id}`),
        axios.get(`http://localhost:5000/api/products/${id}/related`)
      ]);
      
      setProduct(productRes.data);
      setRelatedProducts(relatedRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProductAndRelated();
    }
  }, [id]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setReviewSubmitting(true);
    setReviewError('');

    try {
      await axios.post(
        `http://localhost:5000/api/products/${id}/reviews`,
        { rating, comment },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      fetchProductAndRelated();
      setComment('');
      setRating(5);
    } catch (error: any) {
      setReviewError(error.response?.data?.message || 'Failed to submit review');
    } finally {
      setReviewSubmitting(false);
    }
  };

  if (loading || !product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const productImages = [product.image, ...Array(3).fill(product.image)]; // Simulate multiple images

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Product Section */}
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        {/* Image gallery */}
        <div className="flex flex-col">
          <div className="relative">
            <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-center object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="absolute top-4 right-4 space-y-2">
              <button className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100">
                <Heart className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100">
                <Share2 className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-2">
            {productImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-w-1 aspect-h-1 rounded-md overflow-hidden ${
                  selectedImage === index ? 'ring-2 ring-indigo-500' : ''
                }`}
              >
                <img
                  src={img}
                  alt={`View ${index + 1}`}
                  className="w-full h-full object-center object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product info */}
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              {product.name}
            </h1>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              In Stock
            </span>
          </div>

          <div className="mt-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl text-gray-900">${product.price}</p>
          </div>

          {/* Rating */}
          <div className="mt-3 flex items-center">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`h-5 w-5 ${
                    index < product.rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  fill="currentColor"
                />
              ))}
            </div>
            <p className="ml-3 text-sm text-gray-500">
              {product.numReviews} reviews
            </p>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900">Description</h3>
            <div className="mt-2 prose prose-sm text-gray-500">
              {product.description}
            </div>
          </div>

          {/* Features */}
          <div className="mt-8 border-t border-gray-200 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center">
                <TruckIcon className="h-6 w-6 text-indigo-600" />
                <span className="ml-2 text-sm text-gray-600">Free Shipping</span>
              </div>
              <div className="flex items-center">
                <ShieldCheck className="h-6 w-6 text-indigo-600" />
                <span className="ml-2 text-sm text-gray-600">2 Year Warranty</span>
              </div>
              <div className="flex items-center">
                <RefreshCw className="h-6 w-6 text-indigo-600" />
                <span className="ml-2 text-sm text-gray-600">30 Days Return</span>
              </div>
            </div>
          </div>

          {/* Add to cart section */}
          <div className="mt-8">
            {product.countInStock > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center">
                  <label htmlFor="quantity" className="mr-4 text-sm text-gray-700">
                    Quantity
                  </label>
                  <select
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="rounded-md border border-gray-300 text-base font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    {[...Array(Math.min(product.countInStock, 5))].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </button>
              </div>
            ) : (
              <p className="text-red-600 mt-4">Out of Stock</p>
            )}
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-16 border-t border-gray-200 pt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedProducts.map((relatedProduct) => (
            <Link
              key={relatedProduct._id}
              to={`/product/${relatedProduct._id}`}
              className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="relative w-full pt-[100%]">
                <img
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                  className="absolute inset-0 w-full h-full object-contain p-4 bg-gray-50"
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
                  {relatedProduct.name}
                </h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  ${relatedProduct.price}
                </p>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                  {relatedProduct.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16 border-t border-gray-200 pt-16">
        <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>
        
        {user && (
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Write a Review</h3>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Rating</label>
                <div className="flex items-center mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`${
                        rating >= star ? 'text-yellow-400' : 'text-gray-300'
                      } hover:text-yellow-400`}
                    >
                      <Star className="h-6 w-6" fill="currentColor" />
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Comment</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                  rows={4}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {reviewError && (
                <p className="text-red-600 text-sm">{reviewError}</p>
              )}

              <button
                type="submit"
                disabled={reviewSubmitting}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
              >
                {reviewSubmitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </div>
        )}

        <div className="space-y-8">
          {product?.reviews.map((review) => (
            <div key={review._id} className="border-b border-gray-200 pb-8">
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        review.rating >= star ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-500">{review.name}</span>
              </div>
              <p className="text-gray-700">{review.comment}</p>
              <p className="mt-2 text-sm text-gray-500">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;