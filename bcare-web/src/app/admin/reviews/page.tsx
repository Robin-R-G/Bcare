'use client';

import { useState, useEffect } from 'react';
import { Star, Plus, Edit3, Trash2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import { useAdminAuth } from '@/hooks/use-admin-auth';

interface Review {
  id: string;
  customer_name: string;
  rating: number;
  review_text: string;
  avatar_url: string | null;
  location: string | null;
  source: string;
  is_approved: boolean;
  created_at: string;
}

export default function AdminReviewsPage() {
  const { isAdmin, loading: authLoading } = useAdminAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [formData, setFormData] = useState({
    customer_name: '',
    rating: 5,
    review_text: '',
    source: 'Manual',
    location: '',
  });

  useEffect(() => {
    if (!isAdmin) return;
    loadReviews();
  }, [isAdmin]);

  const loadReviews = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from('google_reviews')
      .select('*')
      .order('created_at', { ascending: false });
    setReviews(data || []);
    setLoading(false);
  };

  const stats = {
    total: reviews.length,
    visible: reviews.filter(r => r.is_approved).length,
    avgRating: reviews.length > 0 ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : '0',
  };

  const toggleVisibility = async (id: string, current: boolean) => {
    const supabase = createClient();
    await supabase.from('google_reviews').update({ is_approved: !current }).eq('id', id);
    setReviews(prev => prev.map(r => r.id === id ? { ...r, is_approved: !r.is_approved } : r));
  };

  const deleteReview = async (id: string) => {
    if (!confirm('Delete this review?')) return;
    const supabase = createClient();
    await supabase.from('google_reviews').delete().eq('id', id);
    setReviews(prev => prev.filter(r => r.id !== id));
  };

  const handleSubmit = async () => {
    if (!formData.customer_name || !formData.review_text) return;
    const supabase = createClient();

    if (editingReview) {
      const { data } = await supabase
        .from('google_reviews')
        .update({
          customer_name: formData.customer_name,
          rating: formData.rating,
          review_text: formData.review_text,
          source: formData.source,
          location: formData.location,
        })
        .eq('id', editingReview.id)
        .select()
        .single();
      if (data) setReviews(prev => prev.map(r => r.id === data.id ? data : r));
    } else {
      const { data } = await supabase
        .from('google_reviews')
        .insert({
          customer_name: formData.customer_name,
          rating: formData.rating,
          review_text: formData.review_text,
          source: formData.source,
          location: formData.location,
          is_approved: true,
        })
        .select()
        .single();
      if (data) setReviews(prev => [data, ...prev]);
    }

    setShowAddModal(false);
    setEditingReview(null);
    setFormData({ customer_name: '', rating: 5, review_text: '', source: 'Manual', location: '' });
  };

  const renderStars = (rating: number) => (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={`w-3.5 h-3.5 ${i < rating ? 'fill-[#F97316] text-[#F97316]' : 'fill-[#E2E8F0] text-[#E2E8F0]'}`} />
      ))}
    </div>
  );

  if (authLoading || loading) {
    return <div className="flex items-center justify-center p-12"><p className="text-on-surface-variant">Loading reviews...</p></div>;
  }

  if (!isAdmin) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display-md text-2xl font-bold text-primary">Review Management</h1>
          <p className="text-on-surface-variant text-sm mt-1">Manage customer reviews and feedback from Supabase.</p>
        </div>
        <Button onClick={() => setShowAddModal(true)} className="bg-primary hover:bg-primary-container text-white gap-2 h-10 px-5">
          <Plus className="w-4 h-4" /> Add Review
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Reviews', value: stats.total, color: 'text-primary' },
          { label: 'Visible', value: stats.visible, color: 'text-emerald-600' },
          { label: 'Avg Rating', value: stats.avgRating, color: 'text-primary' },
        ].map((stat) => (
          <div key={stat.label} className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-4">
            <span className="text-xs text-on-surface-variant uppercase tracking-wider">{stat.label}</span>
            <p className={`text-2xl font-bold ${stat.color} mt-1`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-container-low border-b border-outline-variant/30 text-on-surface-variant uppercase text-[10px] tracking-wider font-semibold">
              <tr>
                <th className="px-6 py-4">Reviewer</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Review</th>
                <th className="px-6 py-4">Source</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {reviews.map((review) => (
                <tr key={review.id} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs">
                        {review.customer_name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-on-surface">{review.customer_name}</p>
                        <p className="text-xs text-on-surface-variant">{review.location || 'Unknown location'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{renderStars(review.rating)}</td>
                  <td className="px-6 py-4">
                    <p className="text-on-surface-variant line-clamp-2 max-w-xs">{review.review_text}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-50 text-blue-600">{review.source}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${review.is_approved ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500'}`}>
                      {review.is_approved ? 'Visible' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => toggleVisibility(review.id, review.is_approved)} className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors" title={review.is_approved ? 'Hide' : 'Show'}>
                        {review.is_approved ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button onClick={() => { setEditingReview(review); setFormData({ customer_name: review.customer_name, rating: review.rating, review_text: review.review_text, source: review.source, location: review.location || '' }); setShowAddModal(true); }} className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteReview(review.id)} className="p-2 rounded-lg text-on-surface-variant hover:bg-error/10 hover:text-error transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {reviews.length === 0 && (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-on-surface-variant">No reviews yet. Add your first review.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => { setShowAddModal(false); setEditingReview(null); }}>
          <div className="bg-white rounded-xl border border-outline-variant/30 w-full max-w-lg p-6 shadow-xl" onClick={e => e.stopPropagation()}>
            <h3 className="font-heading font-bold text-lg text-primary mb-4">{editingReview ? 'Edit Review' : 'Add Review'}</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-on-surface-variant">Customer Name</label>
                <input type="text" value={formData.customer_name} onChange={e => setFormData(p => ({ ...p, customer_name: e.target.value }))} className="w-full mt-1 px-3 py-2 border border-outline-variant/40 rounded-lg text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-on-surface-variant">Rating</label>
                  <select value={formData.rating} onChange={e => setFormData(p => ({ ...p, rating: Number(e.target.value) }))} className="w-full mt-1 px-3 py-2 border border-outline-variant/40 rounded-lg text-sm">
                    {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Star</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-on-surface-variant">Source</label>
                  <input type="text" value={formData.source} onChange={e => setFormData(p => ({ ...p, source: e.target.value }))} className="w-full mt-1 px-3 py-2 border border-outline-variant/40 rounded-lg text-sm" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-on-surface-variant">Review Text</label>
                <textarea value={formData.review_text} onChange={e => setFormData(p => ({ ...p, review_text: e.target.value }))} rows={4} className="w-full mt-1 px-3 py-2 border border-outline-variant/40 rounded-lg text-sm" />
              </div>
              <div>
                <label className="text-xs font-semibold text-on-surface-variant">Location</label>
                <input type="text" value={formData.location} onChange={e => setFormData(p => ({ ...p, location: e.target.value }))} placeholder="City, State" className="w-full mt-1 px-3 py-2 border border-outline-variant/40 rounded-lg text-sm" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button onClick={handleSubmit} className="bg-primary text-white flex-1">{editingReview ? 'Update' : 'Add'} Review</Button>
              <Button variant="outline" onClick={() => { setShowAddModal(false); setEditingReview(null); }} className="flex-1">Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
