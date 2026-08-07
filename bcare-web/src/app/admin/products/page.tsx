'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, Eye, Search } from 'lucide-react';
import { getAdminProducts, deleteProduct } from '@/lib/supabase/admin-mutations';
import { products as mockProducts } from '@/lib/data/mock';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type AdminProduct = {
  id: string; name: string; slug: string; sku?: string; price?: number; price_on_request?: boolean;
  availability?: string; status?: string; featured_image?: string;
  product_categories?: { name: string } | null;
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const router = useRouter();

  const load = async () => {
    setLoading(true);
    try {
      const data = await getAdminProducts();
      if (data.length > 0) setProducts(data);
    } catch {
      setProducts(mockProducts.map(p => ({
        id: p.id, name: p.name, slug: p.slug, sku: p.sku, price: p.price, price_on_request: p.priceOnRequest,
        availability: p.availability, status: 'published', featured_image: p.images[0],
        product_categories: { name: p.categoryName },
      })));
    }
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try { await deleteProduct(id); setProducts(prev => prev.filter(p => p.id !== id)); }
    catch (e: unknown) { alert('Error: ' + (e instanceof Error ? e.message : 'Unknown')); }
  };

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.sku?.toLowerCase().includes(search.toLowerCase()));

  const formatPrice = (price?: number) => {
    if (!price) return '—';
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1F33]">Product Management</h1>
          <p className="text-[#44474c] text-sm mt-1">Manage your commercial kitchen and bakery equipment catalog.</p>
        </div>
        <Link href="/admin/products/new">
          <Button className="bg-[#0B1F33] text-white hover:bg-[#0B1F33]/90 font-semibold gap-2">
            <Plus className="w-4 h-4" /> Add New Product
          </Button>
        </Link>
      </div>

      <div className="relative max-w-sm">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or SKU..." className="w-full pl-10 pr-4 py-2 border border-[#94A3B8]/40 rounded-lg text-sm" />
      </div>

      {loading ? <div className="text-center py-20 text-[#94A3B8]">Loading products...</div> : (
        <div className="bg-white rounded-2xl border border-[#94A3B8]/30 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#94A3B8]/20">
                <th className="text-left py-3 px-4 font-semibold text-[#0B1F33]">Product</th>
                <th className="text-left py-3 px-4 font-semibold text-[#0B1F33]">Category</th>
                <th className="text-left py-3 px-4 font-semibold text-[#0B1F33]">Price</th>
                <th className="text-left py-3 px-4 font-semibold text-[#0B1F33]">Availability</th>
                <th className="text-right py-3 px-4 font-semibold text-[#0B1F33]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(product => (
                <tr key={product.id} className="border-b border-[#94A3B8]/10 hover:bg-[#F8FAFC]">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img src={product.featured_image || '/logo.webp'} alt={product.name} className="w-10 h-10 object-cover rounded-lg border border-[#94A3B8]/20" />
                      <div>
                        <p className="font-semibold text-[#0B1F33] line-clamp-1">{product.name}</p>
                        <p className="text-xs text-[#94A3B8]">SKU: {product.sku || '—'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-[#F8FAFC] text-[#44474c] px-2 py-0.5 rounded-full text-xs">{product.product_categories?.name || '—'}</span>
                  </td>
                  <td className="py-3 px-4">
                    {product.price_on_request ? <span className="text-xs font-semibold text-orange-600">Price on Request</span> : <span className="text-sm font-semibold">{formatPrice(product.price)}</span>}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${product.availability === 'In Stock' ? 'bg-green-50 text-green-700' : product.availability === 'Made to Order' ? 'bg-amber-50 text-amber-700' : 'bg-blue-50 text-blue-700'}`}>
                      {product.availability || 'Contact'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/products/${product.slug}`} target="_blank">
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0"><Eye className="w-4 h-4" /></Button>
                      </Link>
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0" onClick={() => router.push(`/admin/products/new?edit=${product.id}`)}><Pencil className="w-4 h-4" /></Button>
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-red-600 hover:bg-red-50" onClick={() => handleDelete(product.id, product.name)}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="p-12 text-center text-[#94A3B8]">No products found.</div>}
        </div>
      )}
    </div>
  );
}
