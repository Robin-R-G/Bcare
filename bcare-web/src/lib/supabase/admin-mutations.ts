import { createClient } from './client';

// ==========================================
// CATEGORIES
// ==========================================

export async function getAdminCategories() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('product_categories')
    .select('*')
    .order('name');
  if (error) throw error;
  return data || [];
}

export async function createCategory(cat: { name: string; slug: string; description?: string; image_url?: string }) {
  const supabase = createClient();
  const { data, error } = await supabase.from('product_categories').insert(cat).select().single();
  if (error) throw error;
  return data;
}

export async function updateCategory(id: string, cat: { name?: string; slug?: string; description?: string; image_url?: string; is_active?: boolean }) {
  const supabase = createClient();
  const { data, error } = await supabase.from('product_categories').update(cat).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteCategory(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from('product_categories').delete().eq('id', id);
  if (error) throw error;
}

// ==========================================
// PRODUCTS
// ==========================================

export async function getAdminProducts() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*, product_categories(name, slug), product_images(image_url, display_order)')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function createProduct(product: Record<string, unknown>) {
  const supabase = createClient();
  const { data, error } = await supabase.from('products').insert(product).select().single();
  if (error) throw error;
  return data;
}

export async function updateProduct(id: string, product: Record<string, unknown>) {
  const supabase = createClient();
  const { data, error } = await supabase.from('products').update(product).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteProduct(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw error;
}

export async function addProductImages(productId: string, images: { image_url: string; alt_text?: string; display_order: number }[]) {
  const supabase = createClient();
  const rows = images.map(img => ({ ...img, product_id: productId }));
  const { data, error } = await supabase.from('product_images').insert(rows).select();
  if (error) throw error;
  return data;
}

export async function deleteProductImage(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from('product_images').delete().eq('id', id);
  if (error) throw error;
}

// ==========================================
// BLOGS
// ==========================================

export async function getAdminBlogs() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('blogs')
    .select('*, profiles:author(full_name)')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function createBlog(blog: Record<string, unknown>) {
  const supabase = createClient();
  const { data, error } = await supabase.from('blogs').insert(blog).select().single();
  if (error) throw error;
  return data;
}

export async function updateBlog(id: string, blog: Record<string, unknown>) {
  const supabase = createClient();
  const { data, error } = await supabase.from('blogs').update(blog).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteBlog(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from('blogs').delete().eq('id', id);
  if (error) throw error;
}

// ==========================================
// PROJECTS
// ==========================================

export async function getAdminProjects() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function createProject(project: Record<string, unknown>) {
  const supabase = createClient();
  const { data, error } = await supabase.from('projects').insert(project).select().single();
  if (error) throw error;
  return data;
}

export async function updateProject(id: string, project: Record<string, unknown>) {
  const supabase = createClient();
  const { data, error } = await supabase.from('projects').update(project).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteProject(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) throw error;
}

// ==========================================
// TESTIMONIALS
// ==========================================

export async function getAdminTestimonials() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function createTestimonial(t: Record<string, unknown>) {
  const supabase = createClient();
  const { data, error } = await supabase.from('testimonials').insert(t).select().single();
  if (error) throw error;
  return data;
}

export async function updateTestimonial(id: string, t: Record<string, unknown>) {
  const supabase = createClient();
  const { data, error } = await supabase.from('testimonials').update(t).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteTestimonial(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from('testimonials').delete().eq('id', id);
  if (error) throw error;
}

// ==========================================
// LEADS
// ==========================================

export async function getAdminLeads() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function updateLeadStatus(id: string, status: string) {
  const supabase = createClient();
  const { data, error } = await supabase.from('leads').update({ status }).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function addLeadNote(id: string, notes: string) {
  const supabase = createClient();
  const { data, error } = await supabase.from('leads').update({ notes }).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteLead(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from('leads').delete().eq('id', id);
  if (error) throw error;
}

// ==========================================
// MEDIA (Supabase Storage)
// ==========================================

export async function uploadMedia(file: File, bucket = 'media') {
  const supabase = createClient();
  const fileExt = file.name.split('.').pop();
  const filePath = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${fileExt}`;

  const { error } = await supabase.storage.from(bucket).upload(filePath, file, {
    cacheControl: '3600',
    upsert: false,
  });
  if (error) throw error;

  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filePath);
  return { path: filePath, url: urlData.publicUrl, name: file.name, size: file.size, type: file.type };
}

export async function listMedia(bucket = 'media') {
  const supabase = createClient();
  const { data, error } = await supabase.storage.from(bucket).list('', { limit: 100, sortBy: { column: 'created_at', order: 'desc' } });
  if (error) throw error;
  return (data || []).map(f => {
    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(f.name);
    return { ...f, publicUrl: urlData.publicUrl };
  });
}

export async function deleteMedia(filename: string, bucket = 'media') {
  const supabase = createClient();
  const { error } = await supabase.storage.from(bucket).remove([filename]);
  if (error) throw error;
}

// ==========================================
// REVIEWS
// ==========================================

export async function getAdminReviews() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function createReview(r: Record<string, unknown>) {
  const supabase = createClient();
  const { data, error } = await supabase.from('reviews').insert(r).select().single();
  if (error) throw error;
  return data;
}

export async function updateReview(id: string, r: Record<string, unknown>) {
  const supabase = createClient();
  const { data, error } = await supabase.from('reviews').update(r).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteReview(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from('reviews').delete().eq('id', id);
  if (error) throw error;
}

// ==========================================
// DASHBOARD COUNTS
// ==========================================

export async function getDashboardCounts() {
  const supabase = createClient();
  const [products, categories, projects, blogs, leads, reviews] = await Promise.all([
    supabase.from('products').select('id', { count: 'exact', head: true }),
    supabase.from('product_categories').select('id', { count: 'exact', head: true }),
    supabase.from('projects').select('id', { count: 'exact', head: true }),
    supabase.from('blogs').select('id', { count: 'exact', head: true }),
    supabase.from('leads').select('id', { count: 'exact', head: true }),
    supabase.from('reviews').select('id', { count: 'exact', head: true }),
  ]);
  return {
    products: products.count || 0,
    categories: categories.count || 0,
    projects: projects.count || 0,
    blogs: blogs.count || 0,
    leads: leads.count || 0,
    reviews: reviews.count || 0,
  };
}
