import { getProducts } from '@/lib/supabase/queries';
import { Button } from '@/components/ui/button';
import { Plus, Edit3, Trash2, Eye } from 'lucide-react';
import Link from 'next/link';

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display-md text-2xl font-bold text-primary">Product Management</h1>
          <p className="text-on-surface-variant text-sm mt-1">Manage your commercial kitchen and bakery equipment catalog.</p>
        </div>
        <Link href="/admin/products/new">
          <Button className="bg-primary hover:bg-primary-container text-white gap-2 h-10 px-5">
            <Plus className="w-4 h-4" /> Add New Product
          </Button>
        </Link>
      </div>

      {/* Products Table */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-ambient overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-container-low border-b border-outline-variant/30 text-on-surface-variant uppercase text-[10px] tracking-wider font-semibold">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-xl border border-outline-variant/30"
                      />
                      <div>
                        <p className="font-semibold text-on-surface line-clamp-1">{product.name}</p>
                        <p className="text-xs text-on-surface-variant">Slug: {product.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-surface-container text-on-surface-variant px-3 py-1 rounded-full text-xs font-medium">
                      {product.categoryName}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-emerald-500/10 text-emerald-600 px-2.5 py-1 rounded-full text-xs font-semibold">
                      Published
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/products/${product.slug}`} target="_blank">
                        <button className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </Link>
                      <button className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg text-on-surface-variant hover:bg-error/10 hover:text-error transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {products.length === 0 && (
          <div className="p-12 text-center text-on-surface-variant">
            No products found in database. Click &quot;Add New Product&quot; to create one.
          </div>
        )}
      </div>
    </div>
  );
}
