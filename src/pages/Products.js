import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Search, ShoppingCart, Plus, Minus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const API_URL = 'http://localhost:3001';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { user, isCustomer } = useAuth();
  const [cartMap, setCartMap] = useState({}); // Tracks quantity per product

  useEffect(() => {
    fetchProducts();
  }, []);

  // Load cart quantities from localStorage for logged-in user
  useEffect(() => {
    if (!user) return;

    const cartKey = `cart_${user.id}`;
    const storedCart = JSON.parse(localStorage.getItem(cartKey) || '[]');

    const map = {};
    storedCart.forEach(item => {
      map[item.id] = item.quantity;
    });

    setCartMap(map);
  }, [user]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      setProducts(response.data);
    } catch (error) {
      toast.error('Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    if (!user) return toast.error('Please login to add items to cart');

    const cartKey = `cart_${user.id}`;
    const existingCart = JSON.parse(localStorage.getItem(cartKey) || '[]');

    const index = existingCart.findIndex(item => item.id === product.id);

    if (index > -1) {
      existingCart[index].quantity += 1;
    } else {
      existingCart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        unit: product.unit,
        farmerId: product.farmerId,
        farmerName: product.farmer?.name,
        quantity: 1
      });
    }

    localStorage.setItem(cartKey, JSON.stringify(existingCart));

    setCartMap(prev => ({ ...prev, [product.id]: (prev[product.id] || 0) + 1 }));

    toast.success("Added to cart");
    window.dispatchEvent(new Event("storage"));
  };

  const updateInlineQty = (product, increment) => {
    if (!user) return toast.error('Please login');

    const cartKey = `cart_${user.id}`;
    let cart = JSON.parse(localStorage.getItem(cartKey) || '[]');

    const index = cart.findIndex(item => item.id === product.id);
    if (index === -1) return;

    cart[index].quantity += increment;

    // Remove if quantity reaches zero
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
      setCartMap(prev => {
        const newMap = { ...prev };
        delete newMap[product.id];
        return newMap;
      });
    } else {
      setCartMap(prev => ({
        ...prev,
        [product.id]: cart[index].quantity
      }));
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));
  };

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Marketplace</h1>
        <p className="text-neutral-500">Buy directly from farmers</p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-col gap-4 bg-white p-4 rounded-xl shadow-sm border">

        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-3 text-neutral-400" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border focus:ring-primary-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${selectedCategory === category
                  ? 'bg-primary-600 text-white shadow'
                  : 'bg-neutral-200 text-neutral-600 hover:bg-neutral-300'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="animate-spin h-10 w-10 border-2 border-primary-600 border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <Card key={product.id} className="group overflow-hidden flex flex-col">

              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.image || 'https://via.placeholder.com/300'}
                  alt={product.name}
                  className="w-full h-full object-cover transition group-hover:scale-110"
                />
                <Badge className="absolute top-3 right-3 bg-white">{product.category}</Badge>
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-semibold text-lg truncate">{product.name}</h3>
                <p className="text-sm text-neutral-500">{product.farmer?.name || "Local Farmer"}</p>

                <div className="mt-2 font-bold text-primary-700">
                  ₹{product.price} / {product.unit}
                </div>

                <p className="text-sm text-neutral-600 my-3 line-clamp-2">
                  {product.description}
                </p>

                {/* Add / Inline Controls */}
                {isCustomer && (
                  cartMap[product.id] > 0 ? (
                    <div className="flex justify-between items-center border rounded-xl p-2 bg-neutral-50">
                      <button
                        onClick={() => updateInlineQty(product, -1)}
                        className="p-2 bg-neutral-200 rounded-lg hover:bg-neutral-300"
                      >
                        <Minus size={16} />
                      </button>

                      <span className="font-semibold">{cartMap[product.id]}</span>

                      <button
                        onClick={() => updateInlineQty(product, 1)}
                        className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  ) : (
                    <Button
                      variant="primary"
                      className="w-full mt-auto"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart size={16} className="mr-2" />
                      Add to Cart
                    </Button>
                  )
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
