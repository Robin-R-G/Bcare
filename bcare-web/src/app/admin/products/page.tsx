import { getProducts } from '@/lib/supabase/queries';
import { products as mockProducts } from '@/lib/data/mock';
import { Button } from '@/components/ui/button';
import { Plus, Edit3, Trash2, Eye, Image as ImageIcon } from 'lucide-react';
import { ProductImageWithFallback } from '@/components/ui/ProductImageWithFallback';
import Link from 'next/link';

export default async function AdminProductsPage() {
  let products = mockProducts;
  try {
    const supabaseProducts = await getProducts();
    if (supabaseProducts.length > 0) products = supabaseProducts;
  } catch {
    // Fallback to mock data
  }

  const formatPrice = (price?: number) => {
    if (!price) return '—';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

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
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Availability</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-outline-variant/30 shrink-0 bg-surface-container-low p-1">
                        <ProductImageWithFallback
                          src={product.featured_image || product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-contain mix-blend-multiply"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-on-surface line-clamp-1">{product.name}</p>
                        <p className="text-xs text-on-surface-variant">SKU: {product.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-surface-container text-on-surface-variant px-3 py-1 rounded-full text-xs font-medium">
                      {product.categoryName}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {product.priceOnRequest ? (
                      <span className="text-xs font-semibold text-orange-600">Price on Request</span>
                    ) : (
                      <span className="text-sm font-semibold text-on-surface">{formatPrice(product.price)}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      product.availability === 'In Stock'
                        ? 'bg-emerald-500/10 text-emerald-600'
                        : product.availability === 'Made to Order'
                        ? 'bg-amber-500/10 text-amber-600'
                        : 'bg-blue-500/10 text-blue-600'
                    }`}>
                      {product.availability}
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
