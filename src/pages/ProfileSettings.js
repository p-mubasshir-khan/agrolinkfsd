import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, MapPin, Save } from 'lucide-react';
import { toast } from 'react-toastify';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';

const ProfileSettings = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || '',
        city: user?.city || ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            toast.success('Profile updated successfully');
        }, 1000);
    };

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-neutral-900 mb-8">Profile Settings</h1>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="md:col-span-1">
                    <Card className="text-center p-6">
                        <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600 text-3xl font-bold">
                            {user?.name?.charAt(0)}
                        </div>
                        <h2 className="text-xl font-bold text-neutral-900">{user?.name}</h2>
                        <p className="text-neutral-500 capitalize">{user?.role}</p>
                        <div className="mt-6 pt-6 border-t border-neutral-100 text-left space-y-3">
                            <div className="flex items-center text-sm text-neutral-600">
                                <Mail className="h-4 w-4 mr-3" />
                                {user?.email}
                            </div>
                            <div className="flex items-center text-sm text-neutral-600">
                                <Phone className="h-4 w-4 mr-3" />
                                {user?.phone || 'No phone'}
                            </div>
                            <div className="flex items-center text-sm text-neutral-600">
                                <MapPin className="h-4 w-4 mr-3" />
                                {user?.city || 'No city'}
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Settings Form */}
                <div className="md:col-span-2">
                    <Card>
                        <h3 className="text-lg font-bold text-neutral-900 mb-6">Edit Profile</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Input
                                label="Full Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                icon={<User className="h-5 w-5 text-neutral-400" />}
                            />

                            <Input
                                label="Email Address"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                icon={<Mail className="h-5 w-5 text-neutral-400" />}
                                disabled
                            />

                            <div className="grid md:grid-cols-2 gap-6">
                                <Input
                                    label="Phone Number"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    icon={<Phone className="h-5 w-5 text-neutral-400" />}
                                />

                                <Input
                                    label="City"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    icon={<MapPin className="h-5 w-5 text-neutral-400" />}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                                    Address
                                </label>
                                <textarea
                                    name="address"
                                    rows="3"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                />
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    isLoading={loading}
                                >
                                    <Save className="h-4 w-4 mr-2" />
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;
