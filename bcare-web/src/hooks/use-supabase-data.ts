'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Product, Category, Project, BlogPost, GoogleReview } from '@/types';
import {
  categories as mockCategories,
  products as mockProducts,
  projects as mockProjects,
  blogs as mockBlogs,
  googleReviews as mockReviews,
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

function mapProduct(p: ProductRow): Product {
  const images = p.product_images
    ?.sort((a, b) => a.display_order - b.display_order)
    .map((img) => img.image_url) || [];
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
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    const fetch = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          supabase
            .from('products')
            .select('*, product_categories(name, slug), product_images(image_url, display_order)')
            .eq('status', 'published')
            .order('created_at', { ascending: false }),
          supabase
            .from('product_categories')
            .select('*')
            .eq('is_active', true)
            .order('name'),
        ]);

        if (!prodRes.error && prodRes.data && prodRes.data.length > 0) {
          setProducts(prodRes.data.map(mapProduct));
        }
        if (!catRes.error && catRes.data && catRes.data.length > 0) {
          setCategories(catRes.data.map((c) => ({
            id: c.id,
            name: c.name,
            slug: c.slug,
            description: c.description || '',
            image: c.image_url || '',
          })));
        }
      } catch {
        // Keep mock data
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return { products, categories, loading };
}

export function useProductBySlug(slug: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    const fetch = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*, product_categories(name, slug), product_images(image_url, alt_text, display_order), product_specifications(specification_name, specification_value)')
          .eq('slug', slug)
          .eq('status', 'published')
          .single();

        if (!error && data) {
          const p = mapProduct(data);
          if (data.product_specifications) {
            const specs: Record<string, string> = {};
            data.product_specifications.forEach((s: { specification_name: string; specification_value: string }) => {
              specs[s.specification_name] = s.specification_value;
            });
            p.specifications = specs;
          }
          setProduct(p);

          // Fetch related
          const { data: related } = await supabase
            .from('products')
            .select('*, product_categories(name, slug), product_images(image_url, display_order)')
            .eq('status', 'published')
            .eq('category_id', data.category_id)
            .neq('id', data.id)
            .limit(4);

          if (related) {
            setRelatedProducts(related.map(mapProduct));
          }
        } else {
          // Fallback to mock
          const mock = mockProducts.find((p) => p.slug === slug) || null;
          setProduct(mock);
          if (mock) {
            setRelatedProducts(
              mockProducts.filter((p) => p.categoryId === mock.categoryId && p.id !== mock.id).slice(0, 4)
            );
          }
        }
      } catch {
        const mock = mockProducts.find((p) => p.slug === slug) || null;
        setProduct(mock);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [slug]);

  return { product, relatedProducts, loading };
}

export function useBlogs() {
  const [blogs, setBlogs] = useState<BlogPost[]>(mockBlogs);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    const fetchBlogs = async () => {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('status', 'published')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          setBlogs(data.map((b) => ({
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
          })));
        }
      } catch {
        // Keep mock data
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return { blogs, loading };
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('status', 'published')
          .order('completion_year', { ascending: false });

        if (!error && data && data.length > 0) {
          setProjects(data.map((p) => ({
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
          })));
        }
      } catch {
        // Keep mock data
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading };
}

export function useReviews() {
  const [reviews, setReviews] = useState<GoogleReview[]>(mockReviews);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    const fetchReviews = async () => {
      try {
        const { data, error } = await supabase
          .from('google_reviews')
          .select('*')
          .eq('is_approved', true)
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          setReviews(data.map((r) => ({
            id: r.id,
            reviewerName: r.customer_name,
            reviewerPhoto: r.avatar_url || undefined,
            rating: r.rating,
            reviewText: r.review_text,
            reviewDate: r.created_at ? new Date(r.created_at).toLocaleDateString('en-IN') : 'Recent',
            source: 'google' as const,
            isFeatured: true,
            isVisible: true,
          })));
        }
      } catch {
        // Keep mock data
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return { reviews, loading };
}
