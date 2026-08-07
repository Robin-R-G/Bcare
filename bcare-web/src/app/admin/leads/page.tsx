'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Trash2, MessageCircle, Phone, Mail, StickyNote, ChevronDown, ChevronUp } from 'lucide-react';
import { getAdminLeads, updateLeadStatus, addLeadNote, deleteLead } from '@/lib/supabase/admin-mutations';

type Lead = {
  id: string; name: string; email?: string; phone?: string; company?: string;
  message?: string; source?: string; status?: string; notes?: string; created_at?: string;
};

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-50 text-blue-700 border-blue-200',
  contacted: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  qualified: 'bg-purple-50 text-purple-700 border-purple-200',
  proposal_sent: 'bg-orange-50 text-orange-700 border-orange-200',
  closed_won: 'bg-green-50 text-green-700 border-green-200',
  closed_lost: 'bg-red-50 text-red-700 border-red-200',
};

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');

  const load = async () => { setLoading(true); try { setLeads(await getAdminLeads()); } catch {} setLoading(false); };
  useEffect(() => { load(); }, []);

  const handleStatus = async (id: string, status: string) => {
    try { await updateLeadStatus(id, status); setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l)); } catch {}
  };

  const handleNote = async (id: string) => {
    if (!noteText.trim()) return;
    try { await addLeadNote(id, noteText); setLeads(prev => prev.map(l => l.id === id ? { ...l, notes: noteText } : l)); setNoteText(''); } catch {}
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this lead?')) return;
    try { await deleteLead(id); setLeads(prev => prev.filter(l => l.id !== id)); } catch {}
  };

  const formatDate = (d?: string) => d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0B1F33]">Lead CRM</h1>
        <p className="text-[#44474c] text-sm mt-1">Manage customer inquiries and track pipeline status.</p>
      </div>

      {loading ? <div className="text-center py-20 text-[#94A3B8]">Loading...</div> : leads.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-[#94A3B8]/30"><p className="text-[#44474c]">No leads yet.</p></div>
      ) : (
        <div className="space-y-3">
          {leads.map(lead => (
            <div key={lead.id} className="bg-white rounded-xl border border-[#94A3B8]/30 overflow-hidden">
              <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-[#F8FAFC]" onClick={() => setExpandedId(expandedId === lead.id ? null : lead.id)}>
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-10 h-10 bg-[#0B1F33]/10 text-[#0B1F33] rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                    {lead.name?.charAt(0)?.toUpperCase() || '?'}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-[#0B1F33] truncate">{lead.name}</p>
                    <p className="text-xs text-[#94A3B8]">{lead.email || lead.phone || 'No contact'} · {formatDate(lead.created_at)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={lead.status || 'new'}
                    onChange={e => { e.stopPropagation(); handleStatus(lead.id, e.target.value); }}
                    className={`text-xs font-semibold px-2 py-1 rounded-full border ${STATUS_COLORS[lead.status || 'new'] || STATUS_COLORS.new}`}
                    onClick={e => e.stopPropagation()}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="proposal_sent">Proposal Sent</option>
                    <option value="closed_won">Closed Won</option>
                    <option value="closed_lost">Closed Lost</option>
                  </select>
                  {expandedId === lead.id ? <ChevronUp className="w-4 h-4 text-[#94A3B8]" /> : <ChevronDown className="w-4 h-4 text-[#94A3B8]" />}
                </div>
              </div>

              {expandedId === lead.id && (
                <div className="border-t border-[#94A3B8]/20 p-4 space-y-4 bg-[#F8FAFC]">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                    {lead.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-[#F97316]" />
                        <a href={`tel:${lead.phone}`} className="text-[#0B1F33] hover:underline">{lead.phone}</a>
                      </div>
                    )}
                    {lead.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-[#F97316]" />
                        <a href={`mailto:${lead.email}`} className="text-[#0B1F33] hover:underline">{lead.email}</a>
                      </div>
                    )}
                    {lead.phone && (
                      <a href={`https://wa.me/${lead.phone.replace(/\D/g, '').replace(/^91/, '91')}`} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" variant="outline" className="h-7 text-green-600 border-green-200 hover:bg-green-50"><MessageCircle className="w-3 h-3 mr-1" /> WhatsApp</Button>
                      </a>
                    )}
                  </div>
                  {lead.company && <p className="text-sm"><span className="font-semibold">Company:</span> {lead.company}</p>}
                  {lead.message && <p className="text-sm"><span className="font-semibold">Message:</span> {lead.message}</p>}
                  {lead.source && <p className="text-xs text-[#94A3B8]">Source: {lead.source}</p>}

                  {/* Notes */}
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold flex items-center gap-1"><StickyNote className="w-3 h-3" /> Notes</Label>
                    {lead.notes && <p className="text-sm bg-white p-2 rounded border border-[#94A3B8]/20">{lead.notes}</p>}
                    <div className="flex gap-2">
                      <Textarea value={noteText} onChange={e => setNoteText(e.target.value)} placeholder="Add a note..." rows={1} className="flex-1 text-sm" />
                      <Button size="sm" variant="outline" onClick={() => handleNote(lead.id)} disabled={!noteText.trim()}>Save</Button>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50" onClick={() => handleDelete(lead.id)}><Trash2 className="w-3 h-3 mr-1" /> Delete</Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
