import { createClient } from './server';
import { Product, Project, BlogPost, Category, GoogleReview } from '@/types';
import {
  categories as mockCategories,
  products as mockProducts,
  projects as mockProjects,
  blogs as mockBlogs,
  googleReviews as mockReviews,
  videos as mockVideos,
} from '@/lib/data/mock';

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

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  company?: string;
  product_name?: string;
  source: string;
  message?: string;
  status: 'New' | 'Contacted' | 'Quoted' | 'Closed';
  created_at: string;
}

export interface VideoItem {
  id: string;
  title: string;
  youtube_url: string;
  thumbnail_url?: string;
  category?: string;
  description?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  album: string;
  image_url: string;
  caption?: string;
}

// ==========================================
// CATEGORIES & PRODUCTS
// ==========================================

export async function getCategories(): Promise<Category[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('product_categories')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (!error && data && data.length > 0) {
      return data.map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        description: c.description || '',
        image: c.image_url || '',
      }));
    }
  } catch {
    // Fallback to seed mock data
  }
  return mockCategories;
}

export async function getProducts(categoryId?: string): Promise<Product[]> {
  try {
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

    if (!error && data && data.length > 0) {
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
          availability: (p.availability as Product['availability']) || 'In Stock',
          categoryId: p.category_id,
          categoryName: p.product_categories?.name || '',
          shortDescription: p.short_description || '',
          description: p.description || '',
          images: [p.featured_image, ...images].filter((url): url is string => Boolean(url)),
          specifications: {},
          applications: [],
          features: [],
          benefits: [],
        };
      });
    }
  } catch {
    // Fallback to seed mock data
  }

  if (categoryId) {
    return mockProducts.filter((p) => p.categoryId === categoryId);
  }
  return mockProducts;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        product_categories (name, slug),
        product_images (image_url, alt_text, display_order),
        product_specifications (specification_name, specification_value)
      `)
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (!error && data) {
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
        availability: (p.availability as Product['availability']) || 'In Stock',
        categoryId: p.category_id,
        categoryName: p.product_categories?.name || '',
        shortDescription: p.short_description || '',
        description: p.description || '',
        images: [p.featured_image, ...images].filter((url): url is string => Boolean(url)),
        specifications: specs,
        applications: [],
        features: [],
        benefits: [],
      };
    }
  } catch {
    // Fallback
  }
  return mockProducts.find((p) => p.slug === slug) || null;
}

// ==========================================
// PROJECTS & SHOWCASE
// ==========================================

export async function getProjects(): Promise<Project[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('status', 'published')
      .order('completion_year', { ascending: false });

    if (!error && data && data.length > 0) {
      return data.map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        clientName: p.client_name || '',
        industry: p.industry || '',
        location: p.location || '',
        completionDate: p.completion_year?.toString() || '',
        equipmentSupplied: [],
        description: p.description || '',
        images: p.featured_image ? [p.featured_image] : [],
      }));
    }
  } catch {
    // Fallback
  }
  return mockProjects;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        project_images (image_url)
      `)
      .eq('slug', slug)
      .single();

    if (!error && data) {
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
        images: [data.featured_image, ...images].filter((url): url is string => Boolean(url)),
      };
    }
  } catch {
    // Fallback
  }
  return mockProjects.find((p) => p.slug === slug) || null;
}

// ==========================================
// BLOGS
// ==========================================

export async function getBlogs(): Promise<BlogPost[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      return data.map((b) => ({
        id: b.id,
        title: b.title,
        slug: b.slug,
        category: b.category || '',
        author: b.author || 'BCare Team',
        date: b.published_at || b.created_at,
        content: b.content || '',
        coverImage: b.cover_image || '',
        excerpt: b.excerpt || '',
        tags: b.tags || [],
      }));
    }
  } catch {
    // Fallback
  }
  return mockBlogs;
}

// ==========================================
// REVIEWS & TESTIMONIALS
// ==========================================

export async function getGoogleReviews(): Promise<GoogleReview[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('google_reviews')
      .select('*')
      .eq('is_approved', true)
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      return data.map((r) => ({
        id: r.id,
        reviewerName: r.customer_name,
        reviewerPhoto: r.avatar_url || undefined,
        rating: r.rating,
        reviewText: r.review_text,
        reviewDate: r.created_at ? new Date(r.created_at).toLocaleDateString('en-IN') : 'Recent',
        source: 'google' as const,
        isFeatured: true,
        isVisible: true,
      }));
    }
  } catch {
    // Fallback
  }
  return mockReviews;
}

// ==========================================
// GALLERY & VIDEOS
// ==========================================

export async function getGallery(): Promise<GalleryItem[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('gallery').select('*').order('created_at');
    if (!error && data && data.length > 0) {
      return data.map((g) => ({
        id: g.id,
        title: g.title,
        album: g.album || 'General',
        image_url: g.image_url,
        caption: g.caption || undefined,
      }));
    }
  } catch {
    // Fallback to the migrated catalogue below
  }
  return mockProducts.flatMap((p) =>
    p.images.map((url, i) => ({
      id: `${p.slug}-${i}`,
      title: p.name,
      album: p.categoryName,
      image_url: url,
      caption: p.shortDescription,
    }))
  );
}

export async function getVideos(): Promise<VideoItem[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('videos').select('*').order('created_at');
    if (!error && data && data.length > 0) {
      return data.map((v) => ({
        id: v.id,
        title: v.title,
        youtube_url: v.youtube_url,
        thumbnail_url: v.thumbnail_url || undefined,
        category: v.category || undefined,
        description: v.description || undefined,
      }));
    }
  } catch {
    // Fallback to the migrated catalogue below
  }
  return mockVideos.map((v) => ({
    id: v.id,
    title: v.title,
    youtube_url: `https://www.youtube.com/watch?v=${v.youtubeId}`,
    thumbnail_url: v.thumbnail,
    category: 'Product Demo',
    description: v.description,
  }));
}

// ==========================================
// LEADS & QUOTES (ADMIN)
// ==========================================

export async function getLeads(): Promise<Lead[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      return data as Lead[];
    }
  } catch {
    // Fallback
  }
  // Leads are real customer enquiries — never seed fake ones into the admin CRM.
  return [];
}
