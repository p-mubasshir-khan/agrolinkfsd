import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, ShoppingCart, Truck, Shield, User, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const API_URL = 'http://localhost:3001';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isCustomer } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${API_URL}/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      toast.error('Error fetching product details');
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!user) {
      toast.error('Please login to add items to cart');
      navigate('/login');
      return;
    }

    try {
      const cartKey = `cart_${user.id}`;
      const existingCart = JSON.parse(localStorage.getItem(cartKey) || '[]');

      const existingItemIndex = existingCart.findIndex(item => item.id === product.id);

      if (existingItemIndex > -1) {
        existingCart[existingItemIndex].quantity += quantity;
      } else {
        existingCart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          unit: product.unit,
          farmerId: product.farmerId,
          farmerName: product.farmer?.name,
          quantity: quantity
        });
      }

      localStorage.setItem(cartKey, JSON.stringify(existingCart));
      toast.success('Added to cart');
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      toast.error('Error adding to cart');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button
        variant="ghost"
        className="mb-6 pl-0 hover:bg-transparent"
        onClick={() => navigate('/products')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Marketplace
      </Button>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="aspect-w-4 aspect-h-3 rounded-3xl overflow-hidden bg-neutral-100 shadow-soft">
            <img
              src={product.image || 'https://via.placeholder.com/600x400?text=No+Image'}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = 'https://via.placeholder.com/600x400?text=No+Image';
              }}
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="primary">{product.category}</Badge>
              <Badge variant="success">In Stock</Badge>
            </div>
            <h1 className="text-4xl font-bold text-neutral-900 mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 text-neutral-600">
              <User className="h-4 w-4" />
              <span>Sold by <span className="font-medium text-neutral-900">{product.farmer?.name || 'Local Farmer'}</span></span>
            </div>
          </div>

          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold text-primary-700">₹{product.price}</span>
            <span className="text-lg text-neutral-500 mb-1">/ {product.unit}</span>
          </div>

          <p className="text-lg text-neutral-600 leading-relaxed">
            {product.description || 'Fresh, locally sourced produce grown with care and dedication. Perfect for your daily cooking needs.'}
          </p>

          <div className="border-t border-b border-neutral-200 py-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-neutral-300 rounded-xl">
                <button
                  className="px-4 py-2 hover:bg-neutral-50 rounded-l-xl transition-colors"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  className="px-4 py-2 hover:bg-neutral-50 rounded-r-xl transition-colors"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
              {isCustomer && (
                <Button
                  size="lg"
                  className="flex-1"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-neutral-50 rounded-xl">
              <Truck className="h-6 w-6 text-primary-600 mt-1" />
              <div>
                <h4 className="font-semibold text-neutral-900">Fast Delivery</h4>
                <p className="text-sm text-neutral-600">Get it delivered within 24 hours</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-neutral-50 rounded-xl">
              <Shield className="h-6 w-6 text-primary-600 mt-1" />
              <div>
                <h4 className="font-semibold text-neutral-900">Quality Guarantee</h4>
                <p className="text-sm text-neutral-600">100% satisfaction guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;