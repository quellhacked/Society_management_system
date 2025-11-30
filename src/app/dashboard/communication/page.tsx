"use client";
import { useState, useEffect, useRef } from 'react';
import { Send, AlertTriangle, MessageCircle, Paperclip } from 'lucide-react';

export default function AdminCommunicationPage() {
    const [alerts, setAlerts] = useState<any[]>([]);
    const [discussions, setDiscussions] = useState<any[]>([]);
    const [newAlert, setNewAlert] = useState({ title: '', message: '', severity: 'Info' });
    const [loading, setLoading] = useState(true);

    const [activeTab, setActiveTab] = useState('center'); // 'center' or 'chat'
    const [chatMessages, setChatMessages] = useState<any[]>([]);
    const [chatInput, setChatInput] = useState('');

    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [polls, setPolls] = useState<any[]>([]);
    const [newPoll, setNewPoll] = useState({ question: '', options: ['', ''] });

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (activeTab === 'chat') {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [chatMessages, activeTab]);

    useEffect(() => {
        fetchData();
        // Poll for chat messages every 3 seconds
        const interval = setInterval(() => {
            if (activeTab === 'chat') fetchChat();
        }, 3000);
        return () => clearInterval(interval);
    }, [activeTab]);

    const fetchData = async () => {
        try {
            const [alertsRes, discussionsRes, pollsRes] = await Promise.all([
                fetch('/api/communication/alerts'),
                fetch('/api/communication/discussions'),
                fetch('/api/polls')
            ]);
            if (alertsRes.ok) setAlerts(await alertsRes.json());
            if (discussionsRes.ok) setDiscussions(await discussionsRes.json());
            if (pollsRes.ok) setPolls(await pollsRes.json());
            if (activeTab === 'chat') fetchChat();
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchChat = async () => {
        const res = await fetch('/api/communication/chat');
        if (res.ok) setChatMessages(await res.json());
    };

    const handleSendAlert = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/communication/alerts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...newAlert, sentBy: 'Admin' })
            });

            if (res.ok) {
                alert('Alert Broadcasted!');
                setNewAlert({ title: '', message: '', severity: 'Info' });
                fetchData();
            }
        } catch (error) {
            console.error('Error sending alert:', error);
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!chatInput.trim() && !file) return;

        let imageUrl = null;
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData });
            if (uploadRes.ok) {
                const data = await uploadRes.json();
                imageUrl = data.url;
            }
        }

        const res = await fetch('/api/communication/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                authorName: 'Admin',
                message: chatInput,
                image: imageUrl
            })
        });

        if (res.ok) {
            setChatInput('');
            setFile(null);
            fetchChat();
        }
    };

    const handleCreatePoll = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPoll.question || newPoll.options.some(opt => !opt.trim())) return;

        const res = await fetch('/api/polls', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'create',
                question: newPoll.question,
                options: newPoll.options
            })
        });

        if (res.ok) {
            alert('Poll Created!');
            setNewPoll({ question: '', options: ['', ''] });
            fetchData();
        }
    };

    const handleOptionChange = (index: number, value: string) => {
        const updatedOptions = [...newPoll.options];
        updatedOptions[index] = value;
        setNewPoll({ ...newPoll, options: updatedOptions });
    };

    const addOption = () => {
        setNewPoll({ ...newPoll, options: [...newPoll.options, ''] });
    };

    if (loading) return <div style={{ padding: '2rem' }}>Loading communication center...</div>;

    return (
        <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#1a2b4b', marginBottom: '2rem' }}>Communication Center</h1>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid #ddd' }}>
                <button
                    onClick={() => setActiveTab('center')}
                    style={{
                        padding: '1rem 2rem', background: 'none', border: 'none', cursor: 'pointer',
                        fontWeight: '600', color: activeTab === 'center' ? '#1a2b4b' : '#888',
                        borderBottom: activeTab === 'center' ? '3px solid #1a2b4b' : 'none'
                    }}
                >
                    Broadcasts & Discussions
                </button>
                <button
                    onClick={() => setActiveTab('chat')}
                    style={{
                        padding: '1rem 2rem', background: 'none', border: 'none', cursor: 'pointer',
                        fontWeight: '600', color: activeTab === 'chat' ? '#1a2b4b' : '#888',
                        borderBottom: activeTab === 'chat' ? '3px solid #1a2b4b' : 'none'
                    }}
                >
                    Group Chat
                </button>
                <button
                    onClick={() => setActiveTab('polls')}
                    style={{
                        padding: '1rem 2rem', background: 'none', border: 'none', cursor: 'pointer',
                        fontWeight: '600', color: activeTab === 'polls' ? '#1a2b4b' : '#888',
                        borderBottom: activeTab === 'polls' ? '3px solid #1a2b4b' : 'none'
                    }}
                >
                    Polls
                </button>
            </div>

            {activeTab === 'center' ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    {/* Broadcast Alerts */}
                    <div>
                        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#1a2b4b', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Send size={20} /> Broadcast Alert
                            </h2>
                            <form onSubmit={handleSendAlert} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <input
                                    type="text" placeholder="Alert Title" required
                                    value={newAlert.title} onChange={e => setNewAlert({ ...newAlert, title: e.target.value })}
                                    style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
                                />
                                <textarea
                                    placeholder="Message to Residents..." required rows={3}
                                    value={newAlert.message} onChange={e => setNewAlert({ ...newAlert, message: e.target.value })}
                                    style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', resize: 'none' }}
                                />
                                <select
                                    value={newAlert.severity} onChange={e => setNewAlert({ ...newAlert, severity: e.target.value })}
                                    style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
                                >
                                    <option value="Info">Info (Blue)</option>
                                    <option value="Warning">Warning (Orange)</option>
                                    <option value="Critical">Critical (Red)</option>
                                </select>
                                <button type="submit" style={{ background: '#FF5B5B', color: 'white', border: 'none', padding: '0.8rem', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
                                    Send Broadcast
                                </button>
                            </form>
                        </div>

                        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#666', marginBottom: '1rem' }}>Recent Alerts</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {alerts.slice().reverse().map(alert => (
                                <div key={alert.id} style={{
                                    background: 'white', padding: '1rem', borderRadius: '12px',
                                    borderLeft: `4px solid ${alert.severity === 'Critical' ? '#FF5B5B' : alert.severity === 'Warning' ? '#FF9F43' : '#00D09C'}`
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <span style={{ fontWeight: '600', color: '#333' }}>{alert.title}</span>
                                        <span style={{ fontSize: '0.8rem', color: '#999' }}>{alert.date}</span>
                                    </div>
                                    <p style={{ fontSize: '0.9rem', color: '#666' }}>{alert.message}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Discussions */}
                    <div>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#1a2b4b', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <MessageCircle size={20} /> Community Discussions
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {discussions.map(discussion => (
                                <div key={discussion.id} style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1a2b4b' }}>{discussion.title}</h3>
                                        <span style={{ fontSize: '0.8rem', color: '#999' }}>{discussion.date}</span>
                                    </div>
                                    <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>{discussion.content}</p>
                                    <div style={{ fontSize: '0.8rem', color: '#888', fontStyle: 'italic' }}>
                                        Posted by {discussion.authorName} • {discussion.replies.length} replies
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : activeTab === 'chat' ? (
                <div style={{ height: '600px', display: 'flex', flexDirection: 'column', background: 'white', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
                    {/* Chat Messages Area */}
                    <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', background: '#f5f7fb' }}>
                        {chatMessages.map(msg => {
                            const isMe = msg.authorName === 'Admin';
                            return (
                                <div key={msg.id} style={{ alignSelf: isMe ? 'flex-end' : 'flex-start', maxWidth: '70%' }}>
                                    <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '4px', textAlign: isMe ? 'right' : 'left' }}>{msg.authorName}</div>
                                    <div style={{
                                        background: isMe ? '#1a2b4b' : 'white',
                                        color: isMe ? 'white' : '#333',
                                        padding: '0.8rem 1.2rem',
                                        borderRadius: isMe ? '16px 16px 0 16px' : '16px 16px 16px 0',
                                        boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                                    }}>
                                        {msg.image && (
                                            <img src={msg.image} alt="shared" style={{ maxWidth: '200px', borderRadius: '8px', marginBottom: '0.5rem', display: 'block' }} />
                                        )}
                                        {msg.message}
                                    </div>
                                    <div style={{ fontSize: '0.7rem', color: '#999', marginTop: '4px', textAlign: isMe ? 'right' : 'left' }}>
                                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            );
                        })}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Chat Input Area */}
                    <form onSubmit={handleSendMessage} style={{ padding: '1rem', background: 'white', borderTop: '1px solid #eee', display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <input
                            type="file" accept="image/*"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={e => setFile(e.target.files?.[0] || null)}
                        />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: file ? '#00D09C' : '#888' }}
                        >
                            <Paperclip size={20} />
                        </button>
                        <input
                            type="text" placeholder={file ? "Add a caption..." : "Type a message as Admin..."}
                            value={chatInput} onChange={e => setChatInput(e.target.value)}
                            style={{ flex: 1, padding: '0.8rem', borderRadius: '24px', border: '1px solid #ddd', outline: 'none' }}
                        />
                        <button type="submit" style={{ background: '#1a2b4b', color: 'white', border: 'none', width: '45px', height: '45px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Send size={20} />
                        </button>
                    </form>
                </div>
            ) : (
                // Polls Content
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    {/* Create Poll */}
                    <div style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', height: 'fit-content' }}>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#1a2b4b', marginBottom: '1.5rem' }}>Create New Poll</h2>
                        <form onSubmit={handleCreatePoll} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <input
                                type="text" placeholder="Poll Question" required
                                value={newPoll.question} onChange={e => setNewPoll({ ...newPoll, question: e.target.value })}
                                style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
                            />
                            {newPoll.options.map((opt, idx) => (
                                <input
                                    key={idx}
                                    type="text" placeholder={`Option ${idx + 1}`} required
                                    value={opt} onChange={e => handleOptionChange(idx, e.target.value)}
                                    style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
                                />
                            ))}
                            <button type="button" onClick={addOption} style={{ background: '#f0f2f5', color: '#666', border: 'none', padding: '0.6rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>
                                + Add Option
                            </button>
                            <button type="submit" style={{ background: '#00D09C', color: 'white', border: 'none', padding: '0.8rem', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', marginTop: '0.5rem' }}>
                                Launch Poll
                            </button>
                        </form>
                    </div>

                    {/* Active Polls */}
                    <div>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#1a2b4b', marginBottom: '1.5rem' }}>Active Polls</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {polls.slice().reverse().map(poll => (
                                <div key={poll.id} style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                                    <h3 style={{ fontWeight: '600', color: '#333', marginBottom: '1rem' }}>{poll.question}</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                        {poll.options.map((opt: any, idx: number) => {
                                            const totalVotes = poll.options.reduce((acc: number, curr: any) => acc + curr.votes, 0);
                                            const percentage = totalVotes === 0 ? 0 : Math.round((opt.votes / totalVotes) * 100);
                                            return (
                                                <div key={idx}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '4px', color: '#555' }}>
                                                        <span>{opt.text}</span>
                                                        <span>{opt.votes} votes ({percentage}%)</span>
                                                    </div>
                                                    <div style={{ height: '8px', background: '#f0f2f5', borderRadius: '4px', overflow: 'hidden' }}>
                                                        <div style={{ height: '100%', width: `${percentage}%`, background: '#1a2b4b', borderRadius: '4px' }}></div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#999', textAlign: 'right' }}>
                                        Created on {poll.date}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
