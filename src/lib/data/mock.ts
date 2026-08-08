// Real BCare catalogue data, migrated from https://www.indiamart.com/bcare/.
// Products, categories and videos are generated into catalogue.ts by
// scripts/generate-catalogue.mjs — edit the manifest and regenerate, never edit by hand.
import { Project, BlogPost, GoogleReview } from '@/types';

export { categories, products, videos } from './catalogue';
export type { BCareVideo } from './catalogue';

// BCare has no published project case studies or articles on IndiaMART. Rather than
// invent them, these stay empty and the pages render their empty states.
export const projects: Project[] = [];

export const blogs: BlogPost[] = [];

// Verbatim buyer reviews published on https://www.indiamart.com/bcare/testimonial.html.
// Only reviews carrying actual review text are included.
export const googleReviews: GoogleReview[] = [
  {
    id: 'im-sreeni',
    reviewerName: 'Sreeni',
    rating: 5,
    reviewText: 'good machiners and best service',
    reviewDate: '2024-03-06',
    source: 'indiamart',
    isFeatured: true,
    isVisible: true,
    category: 'Thrissur, Kerala',
  },
  {
    id: 'im-swalah',
    reviewerName: 'Swalah',
    rating: 5,
    reviewText: 'Great Service Team & Quality',
    reviewDate: '2024-03-06',
    source: 'indiamart',
    isFeatured: true,
    isVisible: true,
    category: 'Deck Ovens',
  },
];
