import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { Package, User, Tractor } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer'
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const success = await register(formData);
      if (success) {
        toast.success('Registration successful!');
        navigate('/');
      } else {
        toast.error('Registration failed');
      }
    } catch (error) {
      toast.error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-primary-600 rounded-xl flex items-center justify-center">
            <Package className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-neutral-900">
            Create an account
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            Join AgriConnect to buy or sell fresh produce
          </p>
        </div>

        <Card className="mt-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div
                className={`cursor-pointer rounded-xl border-2 p-4 flex flex-col items-center justify-center transition-all ${formData.role === 'customer'
                    ? 'border-primary-600 bg-primary-50 text-primary-700'
                    : 'border-neutral-200 hover:border-primary-200 text-neutral-600'
                  }`}
                onClick={() => setFormData({ ...formData, role: 'customer' })}
              >
                <User className="h-6 w-6 mb-2" />
                <span className="text-sm font-medium">Customer</span>
              </div>
              <div
                className={`cursor-pointer rounded-xl border-2 p-4 flex flex-col items-center justify-center transition-all ${formData.role === 'farmer'
                    ? 'border-primary-600 bg-primary-50 text-primary-700'
                    : 'border-neutral-200 hover:border-primary-200 text-neutral-600'
                  }`}
                onClick={() => setFormData({ ...formData, role: 'farmer' })}
              >
                <Tractor className="h-6 w-6 mb-2" />
                <span className="text-sm font-medium">Farmer</span>
              </div>
            </div>

            <Input
              id="name"
              name="name"
              type="text"
              label="Full Name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
            />

            <Input
              id="email"
              name="email"
              type="email"
              label="Email address"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />

            <Input
              id="password"
              name="password"
              type="password"
              label="Password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              isLoading={loading}
            >
              Create Account
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-neutral-500">
                  Already have an account?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link to="/login">
                <Button variant="secondary" className="w-full">
                  Sign in
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Register;