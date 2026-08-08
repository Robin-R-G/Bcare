import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// next/image and next/link prefix basePath automatically; raw <img> and CSS url() do not.
// Use this for any local asset referenced outside those components.
const BASE_PATH = process.env.NODE_ENV === 'production' ? '/Bcare' : ''

export function asset(path?: string) {
  if (!path) return path
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path
  return `${BASE_PATH}${path.startsWith('/') ? path : `/${path}`}`
}
