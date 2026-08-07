import { createClient } from '@/lib/supabase/server';
import { Mail, Phone, MapPin, Building, Calendar, CheckCircle2, Clock, PhoneCall } from 'lucide-react';

export default async function AdminLeadsPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let leads: any[] = [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });
    leads = data || [];
  } catch {
    // Fallback: no leads when Supabase is unavailable
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div>
        <h1 className="font-display-md text-2xl font-bold text-primary">Customer Lead CRM</h1>
        <p className="text-on-surface-variant text-sm mt-1">Manage incoming quote requests, consultations, and sales workflow.</p>
      </div>

      {/* Leads Table */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-ambient overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-container-low border-b border-outline-variant/30 text-on-surface-variant uppercase text-[10px] tracking-wider font-semibold">
              <tr>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Contact Info</th>
                <th className="px-6 py-4">Business & Location</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {leads && leads.length > 0 ? (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-on-surface">{lead.name}</p>
                        <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-0.5">
                          <Building className="w-3 h-3" /> {lead.company || 'Individual / Startup'}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1 text-xs text-on-surface-variant">
                        <p className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-primary" /> {lead.phone || 'N/A'}</p>
                        <p className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-primary" /> {lead.email || 'N/A'}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1 text-xs">
                        <span className="bg-surface-container text-on-surface-variant px-2.5 py-0.5 rounded-full font-medium inline-block">
                          {lead.business_type || 'General Kitchen'}
                        </span>
                        <p className="flex items-center gap-1 text-on-surface-variant text-[11px]">
                          <MapPin className="w-3 h-3" /> {lead.location || 'Kerala'}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-500/10 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-on-surface-variant">
                      {new Date(lead.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {lead.phone && (
                          <a
                            href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 text-xs font-medium flex items-center gap-1"
                          >
                            <PhoneCall className="w-3.5 h-3.5" /> WhatsApp
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-on-surface-variant">
                    No CRM leads recorded yet. Customer submissions from website forms will appear here in real time.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
