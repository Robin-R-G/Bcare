'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Trash2, Image, File, Copy, Check } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

type MediaItem = {
  name: string;
  id?: string | null;
  created_at?: string | null;
  metadata?: { size?: number; mimetype?: string } | null;
  publicUrl: string;
  [key: string]: unknown;
};

export default function AdminMediaPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const loadMedia = async () => {
    setLoading(true);
    const { data } = await supabase.storage.from('media').list('', {
      limit: 100,
      sortBy: { column: 'created_at', order: 'desc' },
    });
    const files = (data || []).map(f => {
      const { data: urlData } = supabase.storage.from('media').getPublicUrl(f.name);
      return { ...f, publicUrl: urlData.publicUrl };
    });
    setMedia(files as unknown as MediaItem[]);
    setLoading(false);
  };

  useEffect(() => { loadMedia(); }, []);

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    for (const file of Array.from(files)) {
      const ext = file.name.split('.').pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      await supabase.storage.from('media').upload(path, file, { cacheControl: '3600', upsert: false });
    }
    setUploading(false);
    loadMedia();
  };

  const handleDelete = async (name: string) => {
    if (!confirm(`Delete "${name}"?`)) return;
    await supabase.storage.from('media').remove([name]);
    setMedia(prev => prev.filter(m => m.name !== name));
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 2000);
  };

  const formatSize = (bytes?: number) => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1F33]">Media Library</h1>
          <p className="text-[#44474c] text-sm mt-1">Upload and manage images, documents, and other assets.</p>
        </div>
        <input ref={fileRef} type="file" multiple accept="image/*,.pdf,.doc,.docx" className="hidden" onChange={e => handleUpload(e.target.files)} />
        <Button onClick={() => fileRef.current?.click()} disabled={uploading} className="bg-[#0B1F33] text-white hover:bg-[#0B1F33]/90 font-semibold">
          <Upload className="w-4 h-4 mr-2" />
          {uploading ? 'Uploading...' : 'Upload Files'}
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-[#94A3B8]">Loading media...</div>
      ) : media.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-[#94A3B8]/30">
          <Image className="w-12 h-12 text-[#94A3B8] mx-auto mb-3" />
          <p className="text-[#44474c]">No media files yet. Upload your first file.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {media.map((item) => (
            <div key={item.name} className="bg-white rounded-xl border border-[#94A3B8]/30 overflow-hidden group">
              <div className="aspect-square bg-[#F8FAFC] flex items-center justify-center overflow-hidden">
                {item.metadata?.mimetype?.startsWith('image/') ? (
                  <img src={item.publicUrl} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <File className="w-10 h-10 text-[#94A3B8]" />
                )}
              </div>
              <div className="p-2">
                <p className="text-xs text-[#0B1F33] font-medium truncate" title={item.name}>{item.name}</p>
                <p className="text-[10px] text-[#94A3B8]">{formatSize(item.metadata?.size)}</p>
                <div className="flex gap-1 mt-2">
                  <Button size="sm" variant="outline" className="h-7 text-xs flex-1" onClick={() => copyUrl(item.publicUrl)}>
                    {copied === item.publicUrl ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </Button>
                  <Button size="sm" variant="outline" className="h-7 text-xs text-red-600 hover:bg-red-50" onClick={() => handleDelete(item.name)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
