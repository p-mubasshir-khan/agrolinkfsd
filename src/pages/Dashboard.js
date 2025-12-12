import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import {
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  Plus,
  Eye,
  Edit,
  Clock,
  CheckCircle,
  XCircle,
  Truck
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

const API_URL = 'http://localhost:3001';

const Dashboard = () => {
  const { user, isFarmer, isCustomer } = useAuth();
  const [stats, setStats] = useState({});
  const [recentProducts, setRecentProducts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const userId = parseInt(localStorage.getItem('userId'));

      if (isFarmer) {
        // Get farmer's products
        const productsResponse = await axios.get(`${API_URL}/products?farmerId=${userId}`);
        const products = productsResponse.data || [];

        // Get farmer's orders
        const ordersResponse = await axios.get(`${API_URL}/orders?farmerId=${userId}`);
        const orders = ordersResponse.data || [];

        // Calculate stats
        const totalEarnings = orders
          .filter(o => o.status === 'delivered')
          .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

        setStats({
          totalProducts: products.length,
          totalOrders: orders.length,
          totalEarnings: totalEarnings
        });
        setRecentProducts(products.slice(0, 5));
        setRecentOrders(orders.slice(0, 5));
      } else if (isCustomer) {
        // Get customer's orders
        const ordersResponse = await axios.get(`${API_URL}/orders?customerId=${userId}`);
        const orders = ordersResponse.data || [];

        // Calculate stats
        const totalSpent = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
        const uniqueFarmers = new Set(orders.map(o => o.farmerId).filter(Boolean));

        setStats({
          totalOrders: orders.length,
          totalSpent: totalSpent,
          farmersConnected: uniqueFarmers.size
        });
        setRecentOrders(orders.slice(0, 5));
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      pending: 'warning',
      confirmed: 'info',
      shipped: 'primary',
      delivered: 'success',
      cancelled: 'error'
    };
    return <Badge variant={variants[status] || 'neutral'} className="capitalize">{status}</Badge>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Dashboard</h1>
          <p className="text-neutral-600">Welcome back, {user?.name}!</p>
        </div>
        {isFarmer && (
          <Link to="/products/add">
            <Button variant="primary">
              <Plus className="h-5 w-5 mr-2" />
              Add Product
            </Button>
          </Link>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {isFarmer && (
          <>
            <Card className="flex items-center p-6">
              <div className="p-4 rounded-full bg-primary-100 text-primary-600 mr-4">
                <Package className="h-8 w-8" />
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-600">Total Products</p>
                <p className="text-2xl font-bold text-neutral-900">{stats.totalProducts || 0}</p>
              </div>
            </Card>
            <Card className="flex items-center p-6">
              <div className="p-4 rounded-full bg-indigo-100 text-indigo-600 mr-4">
                <ShoppingCart className="h-8 w-8" />
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-600">Total Orders</p>
                <p className="text-2xl font-bold text-neutral-900">{stats.totalOrders || 0}</p>
              </div>
            </Card>
            <Card className="flex items-center p-6">
              <div className="p-4 rounded-full bg-secondary-100 text-secondary-600 mr-4">
                <TrendingUp className="h-8 w-8" />
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-600">Total Earnings</p>
                <p className="text-2xl font-bold text-neutral-900">₹{stats.totalEarnings || 0}</p>
              </div>
            </Card>
          </>
        )}

        {isCustomer && (
          <>
            <Card className="flex items-center p-6">
              <div className="p-4 rounded-full bg-primary-100 text-primary-600 mr-4">
                <ShoppingCart className="h-8 w-8" />
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-600">Total Orders</p>
                <p className="text-2xl font-bold text-neutral-900">{stats.totalOrders || 0}</p>
              </div>
            </Card>
            <Card className="flex items-center p-6">
              <div className="p-4 rounded-full bg-indigo-100 text-indigo-600 mr-4">
                <TrendingUp className="h-8 w-8" />
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-600">Total Spent</p>
                <p className="text-2xl font-bold text-neutral-900">₹{stats.totalSpent || 0}</p>
              </div>
            </Card>
            <Card className="flex items-center p-6">
              <div className="p-4 rounded-full bg-secondary-100 text-secondary-600 mr-4">
                <Users className="h-8 w-8" />
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-600">Farmers Connected</p>
                <p className="text-2xl font-bold text-neutral-900">{stats.farmersConnected || 0}</p>
              </div>
            </Card>
          </>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <Card className="h-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-neutral-900">Recent Orders</h2>
            <Link to="/orders">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </div>

          {recentOrders.length > 0 ? (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-neutral-900">Order #{order.id}</span>
                      {getStatusBadge(order.status)}
                    </div>
                    <p className="text-sm text-neutral-600">
                      {order.items?.length || 0} items • ₹{order.totalAmount}
                    </p>
                    <p className="text-xs text-neutral-500 mt-1">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </p>
                  </div>
                  <Link to={`/orders/${order.id}`}>
                    <Button variant="ghost" size="icon">
                      <Eye className="h-5 w-5 text-neutral-400" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-neutral-500">
              No recent orders found
            </div>
          )}
        </Card>

        {/* Recent Products (Farmer) or Quick Actions (Customer) */}
        {isFarmer ? (
          <Card className="h-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-neutral-900">Recent Products</h2>
              <Link to="/products">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </div>

            {recentProducts.length > 0 ? (
              <div className="space-y-4">
                {recentProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                    <div className="flex items-center gap-4">
                      <img
                        src={product.image || 'https://via.placeholder.com/48x48?text=P'}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = 'https://via.placeholder.com/48x48?text=P';
                        }}
                      />
                      <div>
                        <h3 className="font-medium text-neutral-900">{product.name}</h3>
                        <p className="text-sm text-neutral-600">₹{product.price}/{product.unit}</p>
                      </div>
                    </div>
                    <Link to={`/products/${product.id}/edit`}>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-5 w-5 text-neutral-400" />
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-neutral-500">
                No products added yet
              </div>
            )}
          </Card>
        ) : (
          <Card className="h-full">
            <h2 className="text-xl font-bold text-neutral-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link to="/products">
                <div className="p-6 border border-neutral-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all cursor-pointer text-center group">
                  <Package className="h-8 w-8 text-primary-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-medium text-neutral-900">Browse Products</h3>
                </div>
              </Link>
              <Link to="/orders">
                <div className="p-6 border border-neutral-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all cursor-pointer text-center group">
                  <Truck className="h-8 w-8 text-primary-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-medium text-neutral-900">Track Orders</h3>
                </div>
              </Link>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;