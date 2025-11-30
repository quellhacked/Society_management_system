"use client";
import { useState, useEffect } from 'react';
import { FileText, Download } from 'lucide-react';

export default function ResidentDocumentsPage() {
    const [documents, setDocuments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        try {
            const res = await fetch('/api/documents');
            if (res.ok) setDocuments(await res.json());
        } catch (error) {
            console.error('Error fetching documents:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredDocs = filter === 'All' ? documents : documents.filter(d => d.category === filter);
    const categories = ['All', 'General', 'Legal', 'Meeting Minutes', 'Notices', 'Financial'];

    if (loading) return <div style={{ padding: '2rem' }}>Loading documents...</div>;

    return (
        <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#1a2b4b', marginBottom: '2rem' }}>Documents</h1>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        style={{
                            padding: '0.6rem 1.2rem',
                            borderRadius: '20px',
                            border: 'none',
                            background: filter === cat ? '#1a2b4b' : '#white',
                            color: filter === cat ? 'white' : '#666',
                            boxShadow: filter === cat ? '0 4px 10px rgba(26, 43, 75, 0.2)' : 'none',
                            cursor: 'pointer',
                            fontWeight: '500',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
                {filteredDocs.map(doc => (
                    <div key={doc.id} style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '0.5rem', transition: 'transform 0.2s' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ background: '#E6FAFA', padding: '0.8rem', borderRadius: '12px' }}>
                                <FileText size={24} color="#00D09C" />
                            </div>
                            <span style={{ fontSize: '0.75rem', background: '#f0f2f5', padding: '0.2rem 0.6rem', borderRadius: '12px', color: '#666' }}>{doc.category}</span>
                        </div>
                        <h3 style={{ fontWeight: '600', color: '#333', marginTop: '0.5rem', fontSize: '1.1rem' }}>{doc.title}</h3>
                        <p style={{ fontSize: '0.8rem', color: '#999' }}>{doc.date}</p>
                        <a
                            href={doc.url} download target="_blank" rel="noopener noreferrer"
                            style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '0.8rem', background: '#1a2b4b', color: 'white', borderRadius: '12px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}
                        >
                            <Download size={18} /> Download
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}
