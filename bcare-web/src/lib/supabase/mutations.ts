import { createClient } from './client'; // Use browser client for forms

export async function submitQuoteRequest(data: {
  name: string;
  company?: string;
  phone: string;
  email?: string;
  location?: string;
  products?: Record<string, unknown>[];
  requirements?: string;
}) {
  const supabase = createClient();
  
  // 1. Create Lead
  const { data: leadData, error: leadError } = await supabase
    .from('leads')
    .insert({
      name: data.name,
      company: data.company,
      phone: data.phone,
      email: data.email,
      location: data.location,
      source: 'website_quote',
      status: 'new'
    })
    .select()
    .single();

  if (leadError) throw leadError;

  // 2. Create Quote Request linked to Lead
  const { error: quoteError } = await supabase
    .from('quote_requests')
    .insert({
      lead_id: leadData.id,
      products: data.products,
      requirements: data.requirements
    });

  if (quoteError) throw quoteError;
  
  return leadData;
}

export async function submitConsultationRequest(data: {
  name: string;
  company?: string;
  business_type?: string;
  location?: string;
  kitchen_size?: string;
  requirements?: string;
}) {
  const supabase = createClient();
  
  const { data: consultationData, error } = await supabase
    .from('consultation_requests')
    .insert({
      name: data.name,
      company: data.company,
      business_type: data.business_type,
      location: data.location,
      kitchen_size: data.kitchen_size,
      requirements: data.requirements,
      status: 'new'
    })
    .select()
    .single();

  if (error) throw error;
  
  return consultationData;
}

export async function submitContactMessage(data: {
  name: string;
  email?: string;
  phone?: string;
  message?: string;
}) {
  const supabase = createClient();
  
  const { data: leadData, error } = await supabase
    .from('leads')
    .insert({
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      source: 'contact_page',
      status: 'new'
    })
    .select()
    .single();

  if (error) throw error;
  
  return leadData;
}
