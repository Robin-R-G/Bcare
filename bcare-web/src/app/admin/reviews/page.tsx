'use client';

import { useState } from 'react';
import { Star, Plus, Edit3, Trash2, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { googleReviews } from '@/lib/data/mock';
import { GoogleReview } from '@/types';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<GoogleReview[]>(googleReviews);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingReview, setEditingReview] = useState<GoogleReview | null>(null);
  const [formData, setFormData] = useState({
    reviewerName: '',
    rating: 5,
    reviewText: '',
    reviewDate: new Date().toISOString().split('T')[0],
    source: 'google' as 'google' | 'indiamart' | 'manual',
    category: '',
    isFeatured: false,
  });

  const stats = {
    total: reviews.length,
    visible: reviews.filter(r => r.isVisible).length,
    featured: reviews.filter(r => r.isFeatured).length,
    avgRating: reviews.length > 0 ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : '0',
  };

  const toggleVisibility = (id: string) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, isVisible: !r.isVisible } : r));
  };

  const toggleFeatured = (id: string) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, isFeatured: !r.isFeatured } : r));
  };

  const deleteReview = (id: string) => {
    if (confirm('Delete this review?')) {
      setReviews(prev => prev.filter(r => r.id !== id));
    }
  };

  const handleSubmit = () => {
    if (!formData.reviewerName || !formData.reviewText) return;
    const newReview: GoogleReview = {
      id: `gr-${Date.now()}`,
      ...formData,
      isVisible: true,
    };
    setReviews(prev => [newReview, ...prev]);
    setShowAddModal(false);
    setFormData({ reviewerName: '', rating: 5, reviewText: '', reviewDate: new Date().toISOString().split('T')[0], source: 'google', category: '', isFeatured: false });
  };

  const renderStars = (rating: number) => (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={`w-3.5 h-3.5 ${i < rating ? 'fill-[#F97316] text-[#F97316]' : 'fill-[#E2E8F0] text-[#E2E8F0]'}`} />
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display-md text-2xl font-bold text-primary">Review Management</h1>
          <p className="text-on-surface-variant text-sm mt-1">Manage Google reviews and customer feedback.</p>
        </div>
        <Button onClick={() => setShowAddModal(true)} className="bg-primary hover:bg-primary-container text-white gap-2 h-10 px-5">
          <Plus className="w-4 h-4" /> Add Review
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Reviews', value: stats.total, color: 'text-primary' },
          { label: 'Visible', value: stats.visible, color: 'text-emerald-600' },
          { label: 'Featured', value: stats.featured, color: 'text-[#F97316]' },
          { label: 'Avg Rating', value: stats.avgRating, color: 'text-primary' },
        ].map((stat) => (
          <div key={stat.label} className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-4">
            <span className="text-xs text-on-surface-variant uppercase tracking-wider">{stat.label}</span>
            <p className={`text-2xl font-bold ${stat.color} mt-1`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Reviews Table */}
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
                        {review.reviewerName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-on-surface">{review.reviewerName}</p>
                        <p className="text-xs text-on-surface-variant">{review.reviewDate}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{renderStars(review.rating)}</td>
                  <td className="px-6 py-4">
                    <p className="text-on-surface-variant line-clamp-2 max-w-xs">{review.reviewText}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      review.source === 'google' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
                    }`}>
                      {review.source}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${review.isVisible ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500'}`}>
                        {review.isVisible ? 'Visible' : 'Hidden'}
                      </span>
                      {review.isFeatured && (
                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-[#F97316]/10 text-[#F97316]">Featured</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => toggleVisibility(review.id)} className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors" title={review.isVisible ? 'Hide' : 'Show'}>
                        {review.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button onClick={() => toggleFeatured(review.id)} className={`p-2 rounded-lg transition-colors ${review.isFeatured ? 'text-[#F97316] bg-[#F97316]/10' : 'text-on-surface-variant hover:bg-surface-container'}`} title="Toggle Featured">
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => { setEditingReview(review); setFormData({ reviewerName: review.reviewerName, rating: review.rating, reviewText: review.reviewText, reviewDate: review.reviewDate, source: review.source, category: review.category || '', isFeatured: review.isFeatured }); setShowAddModal(true); }} className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteReview(review.id)} className="p-2 rounded-lg text-on-surface-variant hover:bg-error/10 hover:text-error transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => { setShowAddModal(false); setEditingReview(null); }}>
          <div className="bg-white rounded-xl border border-outline-variant/30 w-full max-w-lg p-6 shadow-xl" onClick={e => e.stopPropagation()}>
            <h3 className="font-heading font-bold text-lg text-primary mb-4">{editingReview ? 'Edit Review' : 'Add Review'}</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-on-surface-variant">Reviewer Name</label>
                <input type="text" value={formData.reviewerName} onChange={e => setFormData(p => ({ ...p, reviewerName: e.target.value }))} className="w-full mt-1 px-3 py-2 border border-outline-variant/40 rounded-lg text-sm" />
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
                  <select value={formData.source} onChange={e => setFormData(p => ({ ...p, source: e.target.value as 'google' | 'indiamart' | 'manual' }))} className="w-full mt-1 px-3 py-2 border border-outline-variant/40 rounded-lg text-sm">
                    <option value="google">Google</option>
                    <option value="indiamart">IndiaMART</option>
                    <option value="manual">Manual</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-on-surface-variant">Review Text</label>
                <textarea value={formData.reviewText} onChange={e => setFormData(p => ({ ...p, reviewText: e.target.value }))} rows={4} className="w-full mt-1 px-3 py-2 border border-outline-variant/40 rounded-lg text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-on-surface-variant">Date</label>
                  <input type="date" value={formData.reviewDate} onChange={e => setFormData(p => ({ ...p, reviewDate: e.target.value }))} className="w-full mt-1 px-3 py-2 border border-outline-variant/40 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-on-surface-variant">Category</label>
                  <input type="text" value={formData.category} onChange={e => setFormData(p => ({ ...p, category: e.target.value }))} placeholder="e.g. Bakery Equipment" className="w-full mt-1 px-3 py-2 border border-outline-variant/40 rounded-lg text-sm" />
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={formData.isFeatured} onChange={e => setFormData(p => ({ ...p, isFeatured: e.target.checked }))} className="rounded border-outline accent-primary" />
                <span className="text-sm font-medium text-on-surface">Mark as Featured</span>
              </label>
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
