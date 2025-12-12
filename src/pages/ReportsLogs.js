import React, { useState } from 'react';
import {
    BarChart,
    Activity,
    Download,
    Calendar,
    FileText,
    AlertCircle,
    CheckCircle,
    Info
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

const ReportsLogs = () => {
    const [activeTab, setActiveTab] = useState('logs');

    // Mock data for demonstration
    const logs = [
        { id: 1, type: 'info', message: 'System backup completed successfully', time: '2 mins ago', user: 'System' },
        { id: 2, type: 'success', message: 'New farmer registration approved: Ravesh Farms', time: '1 hour ago', user: 'Admin' },
        { id: 3, type: 'warning', message: 'High server load detected (85%)', time: '3 hours ago', user: 'System' },
        { id: 4, type: 'error', message: 'Failed login attempt from IP 192.168.1.1', time: '5 hours ago', user: 'Security' },
        { id: 5, type: 'info', message: 'Daily sales report generated', time: '1 day ago', user: 'System' },
    ];

    const reports = [
        { id: 1, name: 'Monthly Sales Report', date: 'Oct 2023', size: '2.4 MB', type: 'PDF' },
        { id: 2, name: 'User Growth Analysis', date: 'Q3 2023', size: '1.1 MB', type: 'CSV' },
        { id: 3, name: 'Farmer Performance Review', date: 'Sep 2023', size: '3.5 MB', type: 'PDF' },
        { id: 4, name: 'Inventory Status Report', date: 'Weekly', size: '856 KB', type: 'XLSX' },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-neutral-900">Reports & Logs</h1>
                    <p className="text-neutral-600 mt-1">System activity and generated reports</p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant={activeTab === 'logs' ? 'primary' : 'ghost'}
                        onClick={() => setActiveTab('logs')}
                    >
                        <Activity className="h-4 w-4 mr-2" />
                        System Logs
                    </Button>
                    <Button
                        variant={activeTab === 'reports' ? 'primary' : 'ghost'}
                        onClick={() => setActiveTab('reports')}
                    >
                        <FileText className="h-4 w-4 mr-2" />
                        Reports
                    </Button>
                </div>
            </div>

            {activeTab === 'logs' ? (
                <Card>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-neutral-900">Recent Activity</h2>
                        <Button variant="secondary" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Export Logs
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {logs.map((log) => (
                            <div key={log.id} className="flex items-start gap-4 p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                                <div className={`mt-1 p-1.5 rounded-full flex-shrink-0 ${log.type === 'success' ? 'bg-green-100 text-green-600' :
                                        log.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                                            log.type === 'error' ? 'bg-red-100 text-red-600' :
                                                'bg-blue-100 text-blue-600'
                                    }`}>
                                    {log.type === 'success' && <CheckCircle className="h-5 w-5" />}
                                    {log.type === 'warning' && <AlertCircle className="h-5 w-5" />}
                                    {log.type === 'error' && <AlertCircle className="h-5 w-5" />}
                                    {log.type === 'info' && <Info className="h-5 w-5" />}
                                </div>

                                <div className="flex-1">
                                    <p className="text-neutral-900 font-medium">{log.message}</p>
                                    <div className="flex items-center gap-3 mt-1 text-xs text-neutral-500">
                                        <span>{log.time}</span>
                                        <span>•</span>
                                        <span>User: {log.user}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reports.map((report) => (
                        <Card key={report.id} className="flex flex-col h-full">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-primary-50 rounded-xl text-primary-600">
                                    <BarChart className="h-6 w-6" />
                                </div>
                                <Badge variant="neutral">{report.type}</Badge>
                            </div>

                            <h3 className="text-lg font-bold text-neutral-900 mb-2">{report.name}</h3>
                            <div className="flex items-center text-sm text-neutral-500 mb-6">
                                <Calendar className="h-4 w-4 mr-2" />
                                {report.date}
                            </div>

                            <div className="mt-auto pt-4 border-t border-neutral-100 flex justify-between items-center">
                                <span className="text-sm text-neutral-500">{report.size}</span>
                                <Button variant="ghost" size="sm">
                                    <Download className="h-4 w-4 mr-2" />
                                    Download
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReportsLogs;
