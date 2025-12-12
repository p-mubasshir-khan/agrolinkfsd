import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Trash2, ShoppingBag, ArrowRight, Plus, Minus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const API_URL = 'http://localhost:3001';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        loadCart();

        const handleStorageChange = () => loadCart();
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [user]);

    const loadCart = () => {
        if (user) {
            const cartKey = `cart_${user.id}`;
            const items = JSON.parse(localStorage.getItem(cartKey) || '[]');
            setCartItems(items);
        }
    };

    const updateQuantity = (itemId, newQuantity) => {
        if (newQuantity < 1) return;

        const updatedCart = cartItems.map(item =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
        );

        setCartItems(updatedCart);
        localStorage.setItem(`cart_${user.id}`, JSON.stringify(updatedCart));
        window.dispatchEvent(new Event('storage'));
    };

    const removeItem = (itemId) => {
        const updatedCart = cartItems.filter(item => item.id !== itemId);
        setCartItems(updatedCart);
        localStorage.setItem(`cart_${user.id}`, JSON.stringify(updatedCart));
        window.dispatchEvent(new Event('storage'));
        toast.success('Item removed');
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const calculateDeliveryFee = () => {
        const subtotal = calculateSubtotal();
        return subtotal > 500 ? 0 : 50;
    };

    const calculateTotal = () => {
        return calculateSubtotal() + calculateDeliveryFee();
    };

    const handleCheckout = async () => {
        if (cartItems.length === 0) return;
        setLoading(true);

        try {
            // Group items by farmer
            const ordersByFarmer = cartItems.reduce((acc, item) => {
                const farmerId = item.farmerId;
                if (!acc[farmerId]) {
                    acc[farmerId] = {
                        items: [],
                        subtotal: 0,
                        farmerId: farmerId
                    };
                }
                acc[farmerId].items.push(item);
                acc[farmerId].subtotal += item.price * item.quantity;
                return acc;
            }, {});

            // Create an order for each farmer
            const orderPromises = Object.values(ordersByFarmer).map(orderData => {
                const deliveryFee = orderData.subtotal > 500 ? 0 : 50;
                const totalAmount = orderData.subtotal + deliveryFee;

                const newOrder = {
                    customerId: user.id,
                    customerName: user.name,
                    farmerId: orderData.farmerId,
                    items: orderData.items,
                    subtotal: orderData.subtotal,
                    deliveryFee: deliveryFee,
                    totalAmount: totalAmount,
                    status: 'pending',
                    orderDate: new Date().toISOString(),
                    deliveryAddress: user.address || 'Default Address'
                };
                return axios.post(`${API_URL}/orders`, newOrder);
            });

            await Promise.all(orderPromises);

            // Clear cart
            localStorage.removeItem(`cart_${user.id}`);
            setCartItems([]);
            window.dispatchEvent(new Event('storage'));

            toast.success('Order placed successfully!');
            navigate('/orders');
        } catch (error) {
            console.error('Checkout error:', error);
            toast.error('Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <div className="bg-neutral-100 p-6 rounded-full mb-6">
                    <ShoppingBag className="h-12 w-12 text-neutral-400" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">Your cart is empty</h2>
                <p className="text-neutral-600 mb-8">Looks like you haven't added any fresh produce yet.</p>
                <Link to="/products">
                    <Button variant="primary" size="lg">
                        Start Shopping
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-neutral-900 mb-8">Shopping Cart</h1>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {cartItems.map((item) => (
                        <Card key={item.id} className="flex flex-col sm:flex-row items-center gap-4 p-4">
                            <div className="w-24 h-24 bg-neutral-100 rounded-xl overflow-hidden flex-shrink-0">
                                <img
                                    src={item.image || 'https://via.placeholder.com/100?text=Product'}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src = 'https://via.placeholder.com/100?text=Product';
                                    }}
                                />
                            </div>

                            <div className="flex-1 text-center sm:text-left">
                                <h3 className="font-bold text-lg text-neutral-900">{item.name}</h3>
                                <p className="text-sm text-neutral-500">Sold by: {item.farmerName || 'Farmer'}</p>
                                <p className="text-primary-700 font-medium mt-1">₹{item.price} / {item.unit}</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex items-center border border-neutral-300 rounded-lg">
                                    <button
                                        className="p-2 hover:bg-neutral-50 rounded-l-lg transition-colors"
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    >
                                        <Minus className="h-4 w-4" />
                                    </button>
                                    <span className="w-8 text-center font-medium text-sm">{item.quantity}</span>
                                    <button
                                        className="p-2 hover:bg-neutral-50 rounded-r-lg transition-colors"
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </button>
                                </div>
                                <button
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    onClick={() => removeItem(item.id)}
                                >
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <Card className="sticky top-24">
                        <h2 className="text-xl font-bold text-neutral-900 mb-6">Order Summary</h2>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-neutral-600">
                                <span>Subtotal</span>
                                <span>₹{calculateSubtotal()}</span>
                            </div>
                            <div className="flex justify-between text-neutral-600">
                                <span>Delivery</span>
                                {calculateDeliveryFee() === 0 ? (
                                    <span className="text-primary-600">Free</span>
                                ) : (
                                    <span>₹{calculateDeliveryFee()}</span>
                                )}
                            </div>
                            <div className="border-t border-neutral-200 pt-4 flex justify-between font-bold text-lg text-neutral-900">
                                <span>Total</span>
                                <span>₹{calculateTotal()}</span>
                            </div>
                        </div>

                        <Button
                            variant="primary"
                            className="w-full py-3 text-lg"
                            onClick={handleCheckout}
                            isLoading={loading}
                        >
                            Checkout
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>

                        <p className="text-xs text-neutral-500 text-center mt-4">
                            Secure checkout powered by AgriConnect
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Cart;
