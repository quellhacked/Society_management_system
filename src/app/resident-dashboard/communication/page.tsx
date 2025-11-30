"use client";
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Send, AlertTriangle, MessageCircle, Paperclip } from 'lucide-react';
import { useRef } from 'react';

export default function ResidentCommunicationPage() {
    const { data: session } = useSession();
    const [alerts, setAlerts] = useState<any[]>([]);
    const [discussions, setDiscussions] = useState<any[]>([]);
    const [newDiscussion, setNewDiscussion] = useState({ title: '', content: '' });
    const [replyContent, setReplyContent] = useState<{ [key: string]: string }>({});
    const [showNewPost, setShowNewPost] = useState(false);
    const [activeTab, setActiveTab] = useState('forum'); // 'forum' or 'chat'
    const [chatMessages, setChatMessages] = useState<any[]>([]);
    const [chatInput, setChatInput] = useState('');

    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [polls, setPolls] = useState<any[]>([]);
    const [votedPolls, setVotedPolls] = useState<string[]>([]); // Track locally for this session

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
        const [alertsRes, discussionsRes, pollsRes] = await Promise.all([
            fetch('/api/communication/alerts'),
            fetch('/api/communication/discussions'),
            fetch('/api/polls')
        ]);
        if (alertsRes.ok) setAlerts(await alertsRes.json());
        if (discussionsRes.ok) setDiscussions(await discussionsRes.json());
        if (pollsRes.ok) setPolls(await pollsRes.json());
        if (activeTab === 'chat') fetchChat();
    };

    const fetchChat = async () => {
        const res = await fetch('/api/communication/chat');
        if (res.ok) setChatMessages(await res.json());
    };

    const handleCreateDiscussion = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session?.user) return;

        const res = await fetch('/api/communication/discussions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'create',
                authorId: session.user.email, // Using email as ID for simplicity
                authorName: session.user.name,
                ...newDiscussion
            })
        });

        if (res.ok) {
            setNewDiscussion({ title: '', content: '' });
            setShowNewPost(false);
            fetchData();
        }
    };

    const handleReply = async (discussionId: string) => {
        if (!session?.user || !replyContent[discussionId]) return;

        const res = await fetch('/api/communication/discussions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'reply',
                discussionId,
                authorName: session.user.name,
                content: replyContent[discussionId]
            })
        });

        if (res.ok) {
            setReplyContent({ ...replyContent, [discussionId]: '' });
            fetchData();
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session?.user || (!chatInput.trim() && !file)) return;

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
                authorName: session.user.name,
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

    const handleVote = async (pollId: string, optionIndex: number) => {
        if (votedPolls.includes(pollId)) return;

        const res = await fetch('/api/polls', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'vote',
                pollId,
                optionIndex
            })
        });

        if (res.ok) {
            setVotedPolls([...votedPolls, pollId]);
            fetchData();
        }
    };

    return (
        <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#1a2b4b', marginBottom: '2rem' }}>Community Hub</h1>

            {/* Alerts Section */}
            {alerts.length > 0 && (
                <div style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#1a2b4b', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <AlertTriangle size={20} color="#FF5B5B" /> Important Alerts
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                        {alerts.slice().reverse().slice(0, 3).map(alert => (
                            <div key={alert.id} style={{
                                background: alert.severity === 'Critical' ? '#FFF5F5' : '#E6FAFA',
                                padding: '1rem', borderRadius: '12px',
                                border: `1px solid ${alert.severity === 'Critical' ? '#FF5B5B' : '#00D09C'}`
                            }}>
                                <h3 style={{ fontWeight: '700', color: '#333', marginBottom: '0.5rem' }}>{alert.title}</h3>
                                <p style={{ fontSize: '0.9rem', color: '#555' }}>{alert.message}</p>
                                <span style={{ fontSize: '0.8rem', color: '#888', marginTop: '0.5rem', display: 'block' }}>{alert.date}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid #ddd' }}>
                <button
                    onClick={() => setActiveTab('forum')}
                    style={{
                        padding: '1rem 2rem', background: 'none', border: 'none', cursor: 'pointer',
                        fontWeight: '600', color: activeTab === 'forum' ? '#1a2b4b' : '#888',
                        borderBottom: activeTab === 'forum' ? '3px solid #1a2b4b' : 'none'
                    }}
                >
                    Forum Discussions
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

            {activeTab === 'forum' ? (
                <>
                    {/* Discussions Section */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#1a2b4b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <MessageCircle size={20} /> Community Forum
                        </h2>
                        <button
                            onClick={() => setShowNewPost(!showNewPost)}
                            style={{ background: '#1a2b4b', color: 'white', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
                        >
                            {showNewPost ? 'Cancel' : '+ Start Discussion'}
                        </button>
                    </div>

                    {showNewPost && (
                        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', marginBottom: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                            <form onSubmit={handleCreateDiscussion} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <input
                                    type="text" placeholder="Topic Title" required
                                    value={newDiscussion.title} onChange={e => setNewDiscussion({ ...newDiscussion, title: e.target.value })}
                                    style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
                                />
                                <textarea
                                    placeholder="What's on your mind?" required rows={3}
                                    value={newDiscussion.content} onChange={e => setNewDiscussion({ ...newDiscussion, content: e.target.value })}
                                    style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', resize: 'none' }}
                                />
                                <button type="submit" style={{ alignSelf: 'flex-end', background: '#00D09C', color: 'white', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
                                    Post
                                </button>
                            </form>
                        </div>
                    )}

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {discussions.slice().reverse().map(discussion => (
                            <div key={discussion.id} style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#1a2b4b' }}>{discussion.title}</h3>
                                        <span style={{ fontSize: '0.9rem', color: '#888' }}>Posted by {discussion.authorName} on {discussion.date}</span>
                                    </div>
                                </div>
                                <p style={{ color: '#444', lineHeight: '1.5', marginBottom: '1.5rem' }}>{discussion.content}</p>

                                {/* Replies */}
                                <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '12px' }}>
                                    {discussion.replies.map((reply: any, idx: number) => (
                                        <div key={idx} style={{ marginBottom: '0.8rem', paddingBottom: '0.8rem', borderBottom: idx < discussion.replies.length - 1 ? '1px solid #eee' : 'none' }}>
                                            <div style={{ fontWeight: '600', fontSize: '0.9rem', color: '#1a2b4b' }}>{reply.authorName}</div>
                                            <div style={{ fontSize: '0.9rem', color: '#555' }}>{reply.content}</div>
                                        </div>
                                    ))}

                                    <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
                                        <input
                                            type="text" placeholder="Write a reply..."
                                            value={replyContent[discussion.id] || ''}
                                            onChange={e => setReplyContent({ ...replyContent, [discussion.id]: e.target.value })}
                                            style={{ flex: 1, padding: '0.6rem', borderRadius: '8px', border: '1px solid #ddd' }}
                                        />
                                        <button
                                            onClick={() => handleReply(discussion.id)}
                                            style={{ background: '#1a2b4b', color: 'white', border: 'none', padding: '0.6rem', borderRadius: '8px', cursor: 'pointer' }}
                                        >
                                            <Send size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : activeTab === 'chat' ? (
                <div style={{ height: '600px', display: 'flex', flexDirection: 'column', background: 'white', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
                    {/* Chat Messages Area */}
                    <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', background: '#f5f7fb' }}>
                        {chatMessages.map(msg => {
                            const isMe = msg.authorName === session?.user?.name;
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
                            type="text" placeholder={file ? "Add a caption..." : "Type a message..."}
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
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {polls.slice().reverse().map(poll => (
                        <div key={poll.id} style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                            <h3 style={{ fontWeight: '600', color: '#333', marginBottom: '1rem' }}>{poll.question}</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                {poll.options.map((opt: any, idx: number) => {
                                    const totalVotes = poll.options.reduce((acc: number, curr: any) => acc + curr.votes, 0);
                                    const percentage = totalVotes === 0 ? 0 : Math.round((opt.votes / totalVotes) * 100);
                                    const hasVoted = votedPolls.includes(poll.id);

                                    return (
                                        <div key={idx} onClick={() => !hasVoted && handleVote(poll.id, idx)} style={{ cursor: hasVoted ? 'default' : 'pointer' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '4px', color: '#555' }}>
                                                <span>{opt.text}</span>
                                                <span>{percentage}%</span>
                                            </div>
                                            <div style={{ height: '36px', background: '#f0f2f5', borderRadius: '8px', overflow: 'hidden', position: 'relative', border: hasVoted ? 'none' : '1px solid #eee' }}>
                                                <div style={{ height: '100%', width: `${percentage}%`, background: '#e0e7ff', borderRadius: '8px', transition: 'width 0.5s' }}></div>
                                                <span style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', fontSize: '0.85rem', fontWeight: '500', color: '#1a2b4b' }}>
                                                    {opt.text}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#999', textAlign: 'right' }}>
                                {votedPolls.includes(poll.id) ? 'You have voted' : 'Tap an option to vote'}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
