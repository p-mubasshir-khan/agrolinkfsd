import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Search,
  Filter,
  Eye,
  CheckCircle,
  Truck,
  Package,
  Clock,
  XCircle,
  MoreVertical
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';

const API_URL = 'http://localhost:3001';

const Orders = () => {
  const { user, isFarmer, isCustomer, isAdmin } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      let url = `${API_URL}/orders`;
      if (isFarmer) {
        url += `?farmerId=${user.id}`;
      } else if (isCustomer) {
        url += `?customerId=${user.id}`;
      }
      // Admin sees all orders

      const response = await axios.get(url);
      // Sort by date descending
      const sortedOrders = response.data.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
      setOrders(sortedOrders);
    } catch (error) {
      toast.error('Error fetching orders');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const orderToUpdate = orders.find(o => o.id === orderId);
      if (!orderToUpdate) return;

      const updatedOrder = { ...orderToUpdate, status: newStatus };
      await axios.put(`${API_URL}/orders/${orderId}`, updatedOrder);

      setOrders(orders.map(o => o.id === orderId ? updatedOrder : o));
      toast.success(`Order marked as ${newStatus}`);
    } catch (error) {
      toast.error('Failed to update order status');
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
    return <Badge variant={variants[status.toLowerCase()] || 'neutral'} className="capitalize">{status}</Badge>;
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toString().includes(searchTerm) ||
      order.customerName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || order.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Orders</h1>
          <p className="text-neutral-600 mt-1">Manage and track your orders</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search orders..."
              className="pl-10 pr-4 py-2 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 w-full sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="px-4 py-2 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <Card key={order.id} className="p-0 overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-bold text-neutral-900">Order #{order.id}</h3>
                        {getStatusBadge(order.status)}
                      </div>
                      <p className="text-sm text-neutral-500">
                        Placed on {new Date(order.orderDate).toLocaleDateString()} at {new Date(order.orderDate).toLocaleTimeString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary-700">₹{order.totalAmount}</p>
                      <p className="text-sm text-neutral-500">{order.items?.length || 0} items</p>
                    </div>
                  </div>

                  <div className="border-t border-neutral-100 py-4">
                    <div className="space-y-2">
                      {order.items?.map((item, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-neutral-900">{item.quantity}x</span>
                            <span className="text-neutral-700">{item.name}</span>
                          </div>
                          <span className="text-neutral-600">₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-neutral-50 -mx-6 -mb-6 p-4 flex flex-wrap items-center justify-between gap-4 mt-4 border-t border-neutral-100">
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                      <Truck className="h-4 w-4" />
                      <span className="truncate max-w-xs" title={order.deliveryAddress}>
                        {order.deliveryAddress || 'No address provided'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isFarmer && (
                        <>
                          {order.status === 'pending' && (
                            <Button
                              size="sm"
                              variant="primary"
                              onClick={() => updateOrderStatus(order.id, 'confirmed')}
                            >
                              Confirm Order
                            </Button>
                          )}
                          {order.status === 'confirmed' && (
                            <Button
                              size="sm"
                              variant="primary"
                              onClick={() => updateOrderStatus(order.id, 'shipped')}
                            >
                              Ship Order
                            </Button>
                          )}
                          {order.status === 'shipped' && (
                            <Button
                              size="sm"
                              variant="primary"
                              onClick={() => updateOrderStatus(order.id, 'delivered')}
                            >
                              Mark Delivered
                            </Button>
                          )}
                          {(order.status === 'pending' || order.status === 'confirmed') && (
                            <Button
                              size="sm"
                              variant="danger"
                              onClick={() => updateOrderStatus(order.id, 'cancelled')}
                            >
                              Cancel Order
                            </Button>
                          )}
                        </>
                      )}

                      <Link to={`/orders/${order.id}`}>
                        <Button variant="secondary" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-neutral-200 border-dashed">
              <div className="bg-neutral-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8 text-neutral-400" />
              </div>
              <h3 className="text-lg font-medium text-neutral-900">No orders found</h3>
              <p className="text-neutral-500 mt-1">
                {searchTerm || statusFilter !== 'All'
                  ? 'Try adjusting your filters'
                  : 'Orders will appear here once placed'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Orders;