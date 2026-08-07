import { createClient } from './server';
import { Product, Project, BlogPost, Category } from '@/types';

type ProductRow = {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  sku: string;
  badge: string | null;
  price: number | null;
  price_on_request: boolean;
  availability: string;
  short_description: string | null;
  description: string | null;
  featured_image: string | null;
  product_categories: { name: string; slug: string } | null;
  product_images?: { image_url: string; alt_text?: string; display_order: number }[];
  product_specifications?: { specification_name: string; specification_value: string }[];
};

// ==========================================
// PRODUCTS & CATEGORIES
// ==========================================

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('product_categories')
    .select('*')
    .eq('is_active', true)
    .order('name');
    
  if (error || !data) return [];
  
  return data.map(c => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    description: c.description || '',
    image: c.image_url || ''
  }));
}

export async function getProducts(categoryId?: string): Promise<Product[]> {
  const supabase = await createClient();
  let query = supabase
    .from('products')
    .select(`
      *,
      product_categories (name, slug),
      product_images (image_url, display_order)
    `)
    .eq('status', 'published');
    
  if (categoryId) {
    query = query.eq('category_id', categoryId);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  if (error || !data) return [];
  
  return (data as unknown as ProductRow[]).map((p) => {
    const images = p.product_images?.sort((a, b) => a.display_order - b.display_order).map((img) => img.image_url) || [];
    
    return {
      id: p.id,
      name: p.name,
      slug: p.slug,
      sku: p.sku || '',
      badge: p.badge || undefined,
      price: p.price || undefined,
      priceOnRequest: p.price_on_request ?? true,
      availability: (p.availability as Product['availability']) || 'Contact for Availability',
      categoryId: p.category_id,
      categoryName: p.product_categories?.name || '',
      shortDescription: p.short_description || '',
      description: p.description || '',
      images: [p.featured_image, ...images].filter((url): url is string => Boolean(url)),
      specifications: {},
      applications: [],
      features: [],
      benefits: []
    };
  });
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_categories (name, slug),
      product_images (image_url, alt_text, display_order),
      product_specifications (specification_name, specification_value),
      product_documents (file_name, file_url, document_type)
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single();
    
  if (error || !data) return null;

  const p = data as unknown as ProductRow;
  
  const images = p.product_images?.sort((a, b) => a.display_order - b.display_order).map((img) => img.image_url) || [];
  
  const specs: Record<string, string> = {};
  if (p.product_specifications) {
    p.product_specifications.forEach((spec) => {
      specs[spec.specification_name] = spec.specification_value;
    });
  }
  
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    sku: p.sku || '',
    badge: p.badge || undefined,
    price: p.price || undefined,
    priceOnRequest: p.price_on_request ?? true,
    availability: (p.availability as Product['availability']) || 'Contact for Availability',
    categoryId: p.category_id,
    categoryName: p.product_categories?.name || '',
    shortDescription: p.short_description || '',
    description: p.description || '',
    images: [p.featured_image, ...images].filter((url): url is string => Boolean(url)),
    specifications: specs,
    applications: [],
    features: [],
    benefits: []
  };
}

// ==========================================
// PROJECTS
// ==========================================

export async function getProjects(): Promise<Project[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('status', 'published')
    .order('completion_year', { ascending: false });
    
  if (error || !data) return [];
  
  return data.map(p => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    clientName: p.client_name || '',
    industry: p.industry || '',
    location: p.location || '',
    completionDate: p.completion_year?.toString() || '',
    equipmentSupplied: [],
    description: p.description || '',
    images: p.featured_image ? [p.featured_image] : []
  }));
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      project_images (image_url, image_type)
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single();
    
  if (error || !data) return null;
  
  const images = data.project_images?.map((img: { image_url: string }) => img.image_url) || [];
  
  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    clientName: data.client_name || '',
    industry: data.industry || '',
    location: data.location || '',
    completionDate: data.completion_year?.toString() || '',
    equipmentSupplied: [],
    description: data.description || '',
    images: [data.featured_image, ...images].filter((url): url is string => Boolean(url))
  };
}

// ==========================================
// BLOGS
// ==========================================

export async function getBlogs(): Promise<BlogPost[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('blogs')
    .select(`
      *,
      profiles:author (full_name, avatar_url)
    `)
    .eq('status', 'published')
    .order('published_at', { ascending: false });
    
  if (error || !data) return [];
  
  return data.map(b => ({
    id: b.id,
    title: b.title,
    slug: b.slug,
    category: b.category || '',
    author: (b.profiles as unknown as { full_name: string } | null)?.full_name || 'BCare Team',
    date: b.published_at || b.created_at,
    content: b.content || '',
    coverImage: b.cover_image || '',
    excerpt: b.excerpt || '',
    tags: b.tags || []
  }));
}
