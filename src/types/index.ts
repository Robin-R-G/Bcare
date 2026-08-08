export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  categoryName: string;
  sku: string;
  badge?: string;
  price?: number;
  priceUnit?: string;
  indiamartUrl?: string;
  priceOnRequest: boolean;
  availability: 'In Stock' | 'Made to Order' | 'Contact for Availability';
  shortDescription: string;
  description: string;
  images: string[];
  featured_image?: string;
  product_images?: Array<{
    image_url: string;
    alt_text: string;
    display_order: number;
  }>;
  specifications: Record<string, string>;
  applications: string[];
  features: string[];
  benefits: string[];
  brochureUrl?: string;
  relatedProductIds?: string[];
  seoTitle?: string;
  seoDescription?: string;
};

export type Project = {
  id: string;
  title: string;
  slug: string;
  clientName: string;
  industry: string;
  location: string;
  completionDate: string;
  equipmentSupplied: string[];
  description: string;
  images: string[];
  beforeImages?: string[];
  afterImages?: string[];
  testimonial?: {
    quote: string;
    author: string;
    designation: string;
  };
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  date: string;
  content: string;
  coverImage: string;
  excerpt: string;
  tags: string[];
};

export type GoogleReview = {
  id: string;
  reviewerName: string;
  reviewerPhoto?: string;
  rating: number;
  reviewText: string;
  reviewDate: string;
  googleReviewUrl?: string;
  source: 'google' | 'indiamart' | 'manual';
  isFeatured: boolean;
  isVisible: boolean;
  category?: string;
};
