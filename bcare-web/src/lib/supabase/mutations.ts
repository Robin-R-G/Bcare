import { createClient } from './client';

export async function logAdminActivity(action: string, entity: string, entityId?: string, details?: string) {
  try {
    const supabase = createClient();
    await supabase.from('admin_activity_logs').insert({
      action,
      entity,
      entity_id: entityId,
      details,
    });
  } catch {
    // Non-blocking log write
  }
}

// ==========================================
// LEADS & PUBLIC ENQUIRIES
// ==========================================

export async function submitConsultationRequest(data: {
  name: string;
  company?: string;
  phone?: string;
  email?: string;
  business_type?: string;
  location?: string;
  kitchen_size?: string;
  requirements?: string;
}) {
  const supabase = createClient();
  const { data: consultationData, error } = await supabase
    .from('leads')
    .insert({
      name: data.name,
      company: data.company,
      phone: data.phone || '',
      email: data.email || '',
      message: `${data.business_type || ''} ${data.requirements || ''}`.trim(),
      source: 'Kitchen Solution Builder',
      status: 'New',
    })
    .select()
    .single();

  if (error) {
    console.warn('Consultation request fallback:', error.message);
  }
  return consultationData || { id: 'consult-lead', ...data };
}

export async function submitContactMessage(data: {
  name: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
}) {
  const supabase = createClient();
  const { data: leadData, error } = await supabase
    .from('leads')
    .insert({
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      message: data.message,
      source: 'Contact Page',
      status: 'New',
    })
    .select()
    .single();

  if (error) {
    console.warn('Supabase lead submit fallback:', error.message);
  }
  return leadData || { id: 'local-lead', ...data };
}

export async function updateLeadStatus(leadId: string, status: 'New' | 'Contacted' | 'Quoted' | 'Closed') {
  const supabase = createClient();
  const { error } = await supabase.from('leads').update({ status }).eq('id', leadId);
  if (!error) {
    await logAdminActivity('UPDATE_LEAD_STATUS', 'leads', leadId, `Status changed to ${status}`);
  }
  return { success: !error };
}

// ==========================================
// PRODUCTS CRUD
// ==========================================

export async function saveProduct(productData: {
  id?: string;
  name: string;
  slug: string;
  sku: string;
  category_id?: string;
  price?: number;
  price_on_request?: boolean;
  availability?: string;
  short_description?: string;
  description?: string;
  featured_image?: string;
  status?: string;
}) {
  const supabase = createClient();
  if (productData.id) {
    const { data, error } = await supabase
      .from('products')
      .update(productData)
      .eq('id', productData.id)
      .select()
      .single();
    if (!error) {
      await logAdminActivity('UPDATE_PRODUCT', 'products', productData.id, productData.name);
    }
    return { data, error };
  } else {
    const { data, error } = await supabase
      .from('products')
      .insert(productData)
      .select()
      .single();
    if (!error && data) {
      await logAdminActivity('CREATE_PRODUCT', 'products', data.id, productData.name);
    }
    return { data, error };
  }
}

export async function deleteProduct(productId: string) {
  const supabase = createClient();
  const { error } = await supabase.from('products').delete().eq('id', productId);
  if (!error) {
    await logAdminActivity('DELETE_PRODUCT', 'products', productId);
  }
  return { success: !error, error };
}

// ==========================================
// CATEGORIES CRUD
// ==========================================

export async function saveCategory(categoryData: {
  id?: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  icon?: string;
}) {
  const supabase = createClient();
  if (categoryData.id) {
    const { data, error } = await supabase
      .from('product_categories')
      .update(categoryData)
      .eq('id', categoryData.id)
      .select()
      .single();
    if (!error) {
      await logAdminActivity('UPDATE_CATEGORY', 'product_categories', categoryData.id, categoryData.name);
    }
    return { data, error };
  } else {
    const { data, error } = await supabase
      .from('product_categories')
      .insert(categoryData)
      .select()
      .single();
    if (!error && data) {
      await logAdminActivity('CREATE_CATEGORY', 'product_categories', data.id, categoryData.name);
    }
    return { data, error };
  }
}

export async function deleteCategory(categoryId: string) {
  const supabase = createClient();
  const { error } = await supabase.from('product_categories').delete().eq('id', categoryId);
  if (!error) {
    await logAdminActivity('DELETE_CATEGORY', 'product_categories', categoryId);
  }
  return { success: !error };
}

// ==========================================
// PROJECTS CRUD
// ==========================================

export async function saveProject(projectData: {
  id?: string;
  title: string;
  slug: string;
  client_name?: string;
  industry: string;
  location: string;
  completion_year?: number;
  description?: string;
  featured_image?: string;
}) {
  const supabase = createClient();
  if (projectData.id) {
    const { data, error } = await supabase.from('projects').update(projectData).eq('id', projectData.id).select().single();
    if (!error) await logAdminActivity('UPDATE_PROJECT', 'projects', projectData.id, projectData.title);
    return { data, error };
  } else {
    const { data, error } = await supabase.from('projects').insert(projectData).select().single();
    if (!error && data) await logAdminActivity('CREATE_PROJECT', 'projects', data.id, projectData.title);
    return { data, error };
  }
}

export async function deleteProject(projectId: string) {
  const supabase = createClient();
  const { error } = await supabase.from('projects').delete().eq('id', projectId);
  if (!error) await logAdminActivity('DELETE_PROJECT', 'projects', projectId);
  return { success: !error };
}

// ==========================================
// GALLERY & MEDIA CRUD
// ==========================================

export async function saveGalleryItem(galleryData: {
  id?: string;
  title: string;
  album?: string;
  image_url: string;
  caption?: string;
}) {
  const supabase = createClient();
  if (galleryData.id) {
    const { data, error } = await supabase.from('gallery').update(galleryData).eq('id', galleryData.id).select().single();
    if (!error) await logAdminActivity('UPDATE_GALLERY', 'gallery', galleryData.id, galleryData.title);
    return { data, error };
  } else {
    const { data, error } = await supabase.from('gallery').insert(galleryData).select().single();
    if (!error && data) await logAdminActivity('CREATE_GALLERY', 'gallery', data.id, galleryData.title);
    return { data, error };
  }
}

export async function deleteGalleryItem(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from('gallery').delete().eq('id', id);
  if (!error) await logAdminActivity('DELETE_GALLERY', 'gallery', id);
  return { success: !error };
}

// ==========================================
// BLOGS CRUD
// ==========================================

export async function saveBlog(blogData: {
  id?: string;
  title: string;
  slug: string;
  category?: string;
  author?: string;
  excerpt?: string;
  content: string;
  cover_image?: string;
  status?: string;
}) {
  const supabase = createClient();
  if (blogData.id) {
    const { data, error } = await supabase.from('blogs').update(blogData).eq('id', blogData.id).select().single();
    if (!error) await logAdminActivity('UPDATE_BLOG', 'blogs', blogData.id, blogData.title);
    return { data, error };
  } else {
    const { data, error } = await supabase.from('blogs').insert(blogData).select().single();
    if (!error && data) await logAdminActivity('CREATE_BLOG', 'blogs', data.id, blogData.title);
    return { data, error };
  }
}

export async function deleteBlog(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from('blogs').delete().eq('id', id);
  if (!error) await logAdminActivity('DELETE_BLOG', 'blogs', id);
  return { success: !error };
}

// ==========================================
// REVIEWS CRUD
// ==========================================

export async function saveReview(reviewData: {
  id?: string;
  customer_name: string;
  rating: number;
  review_text: string;
  avatar_url?: string;
  location?: string;
  is_approved?: boolean;
}) {
  const supabase = createClient();
  if (reviewData.id) {
    const { data, error } = await supabase.from('google_reviews').update(reviewData).eq('id', reviewData.id).select().single();
    if (!error) await logAdminActivity('UPDATE_REVIEW', 'google_reviews', reviewData.id, reviewData.customer_name);
    return { data, error };
  } else {
    const { data, error } = await supabase.from('google_reviews').insert(reviewData).select().single();
    if (!error && data) await logAdminActivity('CREATE_REVIEW', 'google_reviews', data.id, reviewData.customer_name);
    return { data, error };
  }
}

export async function deleteReview(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from('google_reviews').delete().eq('id', id);
  if (!error) await logAdminActivity('DELETE_REVIEW', 'google_reviews', id);
  return { success: !error };
}
