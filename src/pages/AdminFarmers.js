import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CheckCircle, XCircle, Search, MapPin, FileText } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const API_URL = 'http://localhost:3001';

const AdminFarmers = () => {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const load = async () => {
    try {
      // Fetch all farmers, then filter for pending ones or show all with status
      // Assuming we want to manage approvals here
      const res = await axios.get(`${API_URL}/users?role=farmer`);
      // Filter for those who might need approval or just show all farmers with approval actions
      // For this specific page "Approve Farmers", let's focus on pending ones or show status
      setFarmers(res.data || []);
    } catch (err) {
      console.error('Fetch farmers error:', err);
      toast.error('Error fetching farmers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    try {
      const farmerResponse = await axios.get(`${API_URL}/users/${id}`);
      await axios.put(`${API_URL}/users/${id}`, {
        ...farmerResponse.data,
        isApproved: status
      });
      toast.success(status ? 'Farmer approved' : 'Farmer rejected');
      load();
    } catch (e) {
      toast.error('Failed to update status');
    }
  };

  const filteredFarmers = farmers.filter(f =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Farmer Approvals</h1>
          <p className="text-neutral-600 mt-1">Review and approve farmer accounts</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search farmers..."
            className="pl-10 pr-4 py-2 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 w-full md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredFarmers.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-neutral-200 border-dashed">
            <p className="text-neutral-500">No farmers found.</p>
          </div>
        )}

        {filteredFarmers.map((f) => (
          <Card key={f.id} className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-neutral-900">{f.name}</h3>
                  <Badge variant={f.isApproved ? 'success' : 'warning'}>
                    {f.isApproved ? 'Approved' : 'Pending'}
                  </Badge>
                </div>

                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-neutral-600 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Email:</span> {f.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {f.city || 'No city provided'}
                  </div>
                </div>

                {f.farmDescription && (
                  <div className="bg-neutral-50 p-3 rounded-lg text-sm text-neutral-600 flex items-start gap-2">
                    <FileText className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <p>{f.farmDescription}</p>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                {!f.isApproved && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => updateStatus(f.id, true)}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                )}
                {f.isApproved && (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => updateStatus(f.id, false)}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Revoke
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminFarmers;
