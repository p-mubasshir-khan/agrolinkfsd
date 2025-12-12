import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    ShoppingBag,
    Users,
    Settings,
    LogOut,
    Package,
    FileText,
    BarChart3
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const { user, logout, isFarmer, isAdmin } = useAuth();
    const location = useLocation();

    const farmerLinks = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'My Products', path: '/products', icon: Package },
        { name: 'Orders', path: '/orders', icon: ShoppingBag },
        { name: 'Settings', path: '/profile', icon: Settings },
    ];

    const adminLinks = [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
        { name: 'Users', path: '/admin/users', icon: Users },
        { name: 'Manage Products', path: '/admin/products', icon: Package },
        { name: 'Orders', path: '/admin/orders', icon: ShoppingBag },
        { name: 'Reports', path: '/admin/reports', icon: FileText },
    ];

    const links = isAdmin ? adminLinks : farmerLinks;

    return (
        <div className="hidden md:flex flex-col w-64 bg-white border-r border-neutral-200 min-h-screen fixed left-0 top-0">
            <div className="p-6 border-b border-neutral-100">
                <Link to="/" className="flex items-center space-x-2">
                    <div className="bg-primary-600 p-2 rounded-lg">
                        <Package className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xl font-bold text-neutral-900">AgriConnect</span>
                </Link>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = location.pathname === link.path;

                    return (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${isActive
                                ? 'bg-primary-50 text-primary-700'
                                : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                                }`}
                        >
                            <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-primary-600' : 'text-neutral-400'}`} />
                            {link.name}
                        </Link>
                    );
                })}
            </div>

            <div className="p-4 border-t border-neutral-100">
                <div className="flex items-center p-4 bg-neutral-50 rounded-xl mb-3">
                    <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                        {user?.name?.charAt(0) || 'U'}
                    </div>
                    <div className="ml-3 overflow-hidden">
                        <p className="text-sm font-medium text-neutral-900 truncate">{user?.name}</p>
                        <p className="text-xs text-neutral-500 truncate">{user?.role}</p>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="flex w-full items-center px-4 py-2 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-colors"
                >
                    <LogOut className="mr-3 h-5 w-5" />
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
