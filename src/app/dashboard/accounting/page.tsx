"use client";
import { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownLeft, Wallet, Plus } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function AccountingPage() {
    const [transactions, setTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newTx, setNewTx] = useState({ type: 'Expense', category: 'Maintenance', amount: '', description: '', date: new Date().toISOString().split('T')[0] });

    const [filterType, setFilterType] = useState('All'); // All, Month, Year
    const [budget, setBudget] = useState(100000); // Mock monthly budget

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const res = await fetch('/api/accounting');
            if (res.ok) {
                setTransactions(await res.json());
            }
        } catch (error) {
            console.error('Error fetching transactions:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddTransaction = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/accounting', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...newTx, amount: Number(newTx.amount) })
            });

            if (res.ok) {
                fetchTransactions();
                setShowAddModal(false);
                setNewTx({ type: 'Expense', category: 'Maintenance', amount: '', description: '', date: new Date().toISOString().split('T')[0] });
            }
        } catch (error) {
            console.error('Error adding transaction:', error);
        }
    };

    const getFilteredTransactions = () => {
        const now = new Date();
        return transactions.filter(t => {
            const txDate = new Date(t.date);
            if (filterType === 'Month') {
                return txDate.getMonth() === now.getMonth() && txDate.getFullYear() === now.getFullYear();
            } else if (filterType === 'Year') {
                return txDate.getFullYear() === now.getFullYear();
            }
            return true;
        });
    };

    const filteredTransactions = getFilteredTransactions();
    const totalIncome = filteredTransactions.filter(t => t.type === 'Income').reduce((acc, curr) => acc + curr.amount, 0);
    const totalExpense = filteredTransactions.filter(t => t.type === 'Expense').reduce((acc, curr) => acc + curr.amount, 0);
    const balance = totalIncome - totalExpense;

    // Budget Calculation
    const budgetUsage = (totalExpense / budget) * 100;

    // Prepare data for chart
    const expenseData = filteredTransactions
        .filter(t => t.type === 'Expense')
        .reduce((acc: any, curr) => {
            acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
            return acc;
        }, {});

    const chartData = Object.keys(expenseData).map(key => ({ name: key, value: expenseData[key] }));
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

    const downloadCSV = () => {
        const headers = ['ID,Date,Type,Category,Amount,Description,Status'];
        const rows = filteredTransactions.map(t =>
            `${t.id},${t.date},${t.type},${t.category},${t.amount},"${t.description}",${t.status}`
        );
        const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "transactions.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) return <div style={{ padding: '2rem' }}>Loading financial data...</div>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#1a2b4b' }}>Financial Overview</h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        style={{ padding: '0.8rem', borderRadius: '12px', border: '1px solid #ddd', cursor: 'pointer' }}
                    >
                        <option value="All">All Time</option>
                        <option value="Month">This Month</option>
                        <option value="Year">This Year</option>
                    </select>
                    <button
                        onClick={downloadCSV}
                        style={{
                            background: '#fff', color: '#1a2b4b', border: '1px solid #ddd', padding: '0.8rem 1.5rem',
                            borderRadius: '12px', fontWeight: '600', cursor: 'pointer'
                        }}
                    >
                        Export CSV
                    </button>
                    <button
                        onClick={() => setShowAddModal(true)}
                        style={{
                            background: '#1a2b4b', color: 'white', border: 'none', padding: '0.8rem 1.5rem',
                            borderRadius: '12px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'
                        }}
                    >
                        <Plus size={18} /> Record Transaction
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <span style={{ color: '#888', fontWeight: '500' }}>Total Income</span>
                        <div style={{ background: '#E6FAFA', padding: '8px', borderRadius: '50%', color: '#00D09C' }}><ArrowDownLeft size={20} /></div>
                    </div>
                    <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#1a2b4b' }}>₹{totalIncome.toLocaleString()}</h2>
                </div>
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <span style={{ color: '#888', fontWeight: '500' }}>Total Expenses</span>
                        <div style={{ background: '#FFE5E5', padding: '8px', borderRadius: '50%', color: '#FF5B5B' }}><ArrowUpRight size={20} /></div>
                    </div>
                    <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#1a2b4b' }}>₹{totalExpense.toLocaleString()}</h2>
                </div>
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <span style={{ color: '#888', fontWeight: '500' }}>Net Balance</span>
                        <div style={{ background: '#F4F1FF', padding: '8px', borderRadius: '50%', color: '#7B61FF' }}><Wallet size={20} /></div>
                    </div>
                    <h2 style={{ fontSize: '2rem', fontWeight: '700', color: balance >= 0 ? '#1a2b4b' : '#FF5B5B' }}>₹{balance.toLocaleString()}</h2>
                </div>
            </div>

            {/* Budget Progress */}
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: '600', color: '#1a2b4b' }}>Monthly Budget Usage</span>
                    <span style={{ color: '#666' }}>{budgetUsage.toFixed(1)}% of ₹{budget.toLocaleString()}</span>
                </div>
                <div style={{ width: '100%', height: '10px', background: '#f0f0f0', borderRadius: '5px', overflow: 'hidden' }}>
                    <div style={{
                        width: `${Math.min(budgetUsage, 100)}%`,
                        height: '100%',
                        background: budgetUsage > 90 ? '#FF5B5B' : '#00D09C',
                        transition: 'width 0.5s ease'
                    }} />
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                {/* Recent Transactions */}
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#1a2b4b', marginBottom: '1.5rem' }}>Recent Transactions</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {filteredTransactions.slice().reverse().slice(0, 5).map(tx => (
                            <div key={tx.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid #f0f0f0' }}>
                                <div>
                                    <p style={{ fontWeight: '600', color: '#333' }}>{tx.description}</p>
                                    <p style={{ fontSize: '0.9rem', color: '#888' }}>{tx.date} • {tx.category}</p>
                                </div>
                                <span style={{ fontWeight: '600', color: tx.type === 'Income' ? '#00D09C' : '#FF5B5B' }}>
                                    {tx.type === 'Income' ? '+' : '-'} ₹{tx.amount.toLocaleString()}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Expense Chart */}
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', minHeight: '300px' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#1a2b4b', marginBottom: '1rem' }}>Expense Breakdown</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie data={chartData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5} dataKey="value">
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Add Transaction Modal */}
            {showAddModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', width: '400px' }}>
                        <h2 style={{ marginBottom: '1.5rem', color: '#1a2b4b' }}>Record Transaction</h2>
                        <form onSubmit={handleAddTransaction} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <select
                                value={newTx.type} onChange={e => setNewTx({ ...newTx, type: e.target.value })}
                                style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
                            >
                                <option value="Expense">Expense</option>
                                <option value="Income">Income</option>
                            </select>
                            <input
                                type="text" placeholder="Category (e.g. Maintenance, Salary)" required
                                value={newTx.category} onChange={e => setNewTx({ ...newTx, category: e.target.value })}
                                style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
                            />
                            <input
                                type="number" placeholder="Amount" required
                                value={newTx.amount} onChange={e => setNewTx({ ...newTx, amount: e.target.value })}
                                style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
                            />
                            <input
                                type="text" placeholder="Description" required
                                value={newTx.description} onChange={e => setNewTx({ ...newTx, description: e.target.value })}
                                style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
                            />
                            <input
                                type="date" required
                                value={newTx.date} onChange={e => setNewTx({ ...newTx, date: e.target.value })}
                                style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
                            />

                            <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
                                <button type="submit" style={{ flex: 1, background: '#1a2b4b', color: 'white', border: 'none', padding: '0.8rem', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Save</button>
                                <button type="button" onClick={() => setShowAddModal(false)} style={{ flex: 1, background: '#f0f0f0', color: '#666', border: 'none', padding: '0.8rem', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
