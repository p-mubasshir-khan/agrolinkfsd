import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Users,
  ShoppingBag,
  DollarSign,
  Package,
  TrendingUp,
  Activity,
  ArrowRight
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const API_URL = 'http://localhost:3001';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    recentOrders: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [usersRes, ordersRes, productsRes] = await Promise.all([
        axios.get(`${API_URL}/users`),
        axios.get(`${API_URL}/orders`),
        axios.get(`${API_URL}/products`)
      ]);

      const users = usersRes.data;
      const orders = ordersRes.data;
      const products = productsRes.data;

      const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

      setStats({
        totalUsers: users.length,
        totalOrders: orders.length,
        totalRevenue,
        totalProducts: products.length,
        recentOrders: orders.slice(0, 5).sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
      });
    } catch (error) {
      console.error('Error fetching admin stats:', error);
    } finally {
      setLoading(false);
    }
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
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Admin Dashboard</h1>
        <p className="text-neutral-600 mt-1">System overview and management</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 flex items-center">
          <div className="p-4 rounded-full bg-primary-100 text-primary-600 mr-4">
            <Users className="h-8 w-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-600">Total Users</p>
            <p className="text-2xl font-bold text-neutral-900">{stats.totalUsers}</p>
          </div>
        </Card>

        <Card className="p-6 flex items-center">
          <div className="p-4 rounded-full bg-indigo-100 text-indigo-600 mr-4">
            <ShoppingBag className="h-8 w-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-600">Total Orders</p>
            <p className="text-2xl font-bold text-neutral-900">{stats.totalOrders}</p>
          </div>
        </Card>

        <Card className="p-6 flex items-center">
          <div className="p-4 rounded-full bg-secondary-100 text-secondary-600 mr-4">
            <DollarSign className="h-8 w-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-600">Total Revenue</p>
            <p className="text-2xl font-bold text-neutral-900">₹{stats.totalRevenue.toLocaleString()}</p>
          </div>
        </Card>

        <Card className="p-6 flex items-center">
          <div className="p-4 rounded-full bg-purple-100 text-purple-600 mr-4">
            <Package className="h-8 w-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-600">Total Products</p>
            <p className="text-2xl font-bold text-neutral-900">{stats.totalProducts}</p>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <Card>
          <h2 className="text-xl font-bold text-neutral-900 mb-6">Management</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/admin/users">
              <div className="p-6 border border-neutral-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all cursor-pointer text-center group">
                <Users className="h-8 w-8 text-primary-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-medium text-neutral-900">Manage Users</h3>
              </div>
            </Link>
            <Link to="/admin/products">
              <div className="p-6 border border-neutral-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all cursor-pointer text-center group">
                <Package className="h-8 w-8 text-primary-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-medium text-neutral-900">Manage Products</h3>
              </div>
            </Link>
            <h2 className="text-xl font-bold text-neutral-900">Recent Orders</h2>
            <Link to="/orders">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </div>

          <div className="space-y-4">
            {stats.recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-neutral-900">Order #{order.id}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${order.status === 'delivered' ? 'bg-primary-100 text-primary-700' :
                      order.status === 'pending' ? 'bg-secondary-100 text-secondary-700' :
                        'bg-indigo-100 text-indigo-700'
                      }`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600">
                    {order.customerName} • ₹{order.totalAmount}
                  </p>
                </div>
                <div className="text-sm text-neutral-500">
                  {new Date(order.orderDate).toLocaleDateString()}
                </div>
              </div>
            ))}
            {stats.recentOrders.length === 0 && (
              <div className="text-center py-8 text-neutral-500">
                No recent orders
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;