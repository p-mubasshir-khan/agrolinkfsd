import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, ShoppingCart, LogOut, Package } from 'lucide-react';
import Button from './ui/Button';

const Navbar = () => {
  const { user, logout, isCustomer, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isDashboard = location.pathname.startsWith('/admin') || (user?.role === 'farmer' && location.pathname.startsWith('/dashboard'));

  if (isDashboard) return null;

  const homeLink = isAuthenticated ? (user?.role === 'admin' ? '/admin' : '/dashboard') : '/';

  return (
    <nav className="bg-white border-b border-neutral-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to={homeLink} className="flex items-center space-x-2">
              <div className="bg-primary-600 p-1.5 rounded-lg">
                <Package className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-neutral-900">AgriConnect</span>
            </Link>

            <div className="hidden md:ml-8 md:flex md:space-x-4">
              <Link to={homeLink} className="text-neutral-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Home
              </Link>
              <Link to="/products" className="text-neutral-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Marketplace
              </Link>
              {isCustomer && (
                <Link to="/orders" className="text-neutral-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  My Orders
                </Link>
              )}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {isCustomer && (
                  <Link to="/cart" className="relative p-2 text-neutral-600 hover:text-primary-600 transition-colors">
                    <ShoppingCart className="h-6 w-6" />
                  </Link>
                )}

                <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-neutral-200">
                  <span className="text-sm font-medium text-neutral-700">
                    {user?.name}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={logout}
                    title="Sign Out"
                  >
                    <LogOut className="h-5 w-5 text-red-500" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary">Get Started</Button>
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-400 hover:text-neutral-500 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to={homeLink}
              className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Marketplace
            </Link>
            {isCustomer && (
              <>
                <Link
                  to="/orders"
                  className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Orders
                </Link>
                <Link
                  to="/cart"
                  className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Cart
                </Link>
              </>
            )}
          </div>
          <div className="pt-4 pb-4 border-t border-neutral-200">
            {isAuthenticated ? (
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                    {user?.name?.charAt(0)}
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-neutral-800">{user?.name}</div>
                  <div className="text-sm font-medium leading-none text-neutral-500 mt-1">{user?.email}</div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="ml-auto bg-white flex-shrink-0 p-1 rounded-full text-neutral-400 hover:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <LogOut className="h-6 w-6" />
                </button>
              </div>
            ) : (
              <div className="mt-3 px-2 space-y-1">
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;