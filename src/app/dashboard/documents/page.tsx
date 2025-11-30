"use client";
import { useState, useEffect, useRef } from 'react';
import { FileText, Upload, Download, Trash2 } from 'lucide-react';

export default function DocumentsPage() {
    const [documents, setDocuments] = useState<any[]>([]);
    const [newDoc, setNewDoc] = useState({ title: '', category: 'General' });
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(true);

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

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || !newDoc.title) return;

        try {
            // 1. Upload File
            const formData = new FormData();
            formData.append('file', file);
            const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData });

            if (!uploadRes.ok) throw new Error('File upload failed');
            const uploadData = await uploadRes.json();

            // 2. Save Document Metadata
            const docRes = await fetch('/api/documents', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...newDoc,
                    url: uploadData.url
                })
            });

            if (docRes.ok) {
                alert('Document uploaded successfully!');
                setNewDoc({ title: '', category: 'General' });
                setFile(null);
                fetchDocuments();
            }
        } catch (error) {
            console.error('Error uploading document:', error);
            alert('Failed to upload document.');
        }
    };

    if (loading) return <div style={{ padding: '2rem' }}>Loading documents...</div>;

    return (
        <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#1a2b4b', marginBottom: '2rem' }}>Document Repository</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
                {/* Upload Form */}
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', height: 'fit-content' }}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#1a2b4b', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Upload size={20} /> Upload Document
                    </h2>
                    <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>Document Title</label>
                            <input
                                type="text" required
                                value={newDoc.title} onChange={e => setNewDoc({ ...newDoc, title: e.target.value })}
                                style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>Category</label>
                            <select
                                value={newDoc.category} onChange={e => setNewDoc({ ...newDoc, category: e.target.value })}
                                style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
                            >
                                <option value="General">General</option>
                                <option value="Legal">Legal / Bylaws</option>
                                <option value="Meeting Minutes">Meeting Minutes</option>
                                <option value="Notices">Notices</option>
                                <option value="Financial">Financial Reports</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>File</label>
                            <input
                                type="file" required
                                ref={fileInputRef}
                                onChange={e => setFile(e.target.files?.[0] || null)}
                                style={{ width: '100%', padding: '0.5rem', border: '1px dashed #ddd', borderRadius: '8px' }}
                            />
                        </div>
                        <button type="submit" style={{ background: '#1a2b4b', color: 'white', border: 'none', padding: '0.8rem', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', marginTop: '1rem' }}>
                            Upload
                        </button>
                    </form>
                </div>

                {/* Documents List */}
                <div>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#1a2b4b', marginBottom: '1.5rem' }}>All Documents</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
                        {documents.map(doc => (
                            <div key={doc.id} style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #eee', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <FileText size={32} color="#1a2b4b" />
                                    <span style={{ fontSize: '0.8rem', background: '#f0f2f5', padding: '0.2rem 0.6rem', borderRadius: '12px', color: '#666' }}>{doc.category}</span>
                                </div>
                                <h3 style={{ fontWeight: '600', color: '#333', marginTop: '0.5rem' }}>{doc.title}</h3>
                                <p style={{ fontSize: '0.8rem', color: '#999' }}>Uploaded on {doc.date}</p>
                                <a
                                    href={doc.url} download target="_blank" rel="noopener noreferrer"
                                    style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '0.6rem', background: '#00D09C', color: 'white', borderRadius: '8px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}
                                >
                                    <Download size={16} /> Download
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
