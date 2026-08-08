'use client';

import React from 'react';
import { 
  CakeSlice, 
  CookingPot, 
  ChefHat, 
  Snowflake, 
  Wrench, 
  Cog, 
  Refrigerator, 
  Utensils, 
  Layers, 
  Factory,
  PackageCheck
} from 'lucide-react';

interface CategoryIconProps {
  categoryName?: string;
  categorySlug?: string;
  className?: string;
  size?: number;
}

export function CategoryIcon({ categoryName = '', categorySlug = '', className = 'w-6 h-6', size }: CategoryIconProps) {
  const normalized = (categoryName || categorySlug).toLowerCase();

  const getIcon = () => {
    if (normalized.includes('bakery') || normalized.includes('mixer') || normalized.includes('oven') || normalized.includes('dough') || normalized.includes('bread')) {
      if (normalized.includes('oven') || normalized.includes('baking')) return CookingPot;
      if (normalized.includes('dough') || normalized.includes('bread')) return ChefHat;
      return CakeSlice;
    }
    if (normalized.includes('kitchen') || normalized.includes('commercial kitchen') || normalized.includes('cook') || normalized.includes('burner')) {
      if (normalized.includes('cook') || normalized.includes('range')) return Utensils;
      return ChefHat;
    }
    if (normalized.includes('refrigerat') || normalized.includes('chiller') || normalized.includes('freezer') || normalized.includes('cold')) {
      if (normalized.includes('freezer')) return Refrigerator;
      return Snowflake;
    }
    if (normalized.includes('fabricat') || normalized.includes('table') || normalized.includes('stainless') || normalized.includes('work')) {
      return Wrench;
    }
    if (normalized.includes('process') || normalized.includes('cutter') || normalized.includes('slicer') || normalized.includes('machinery')) {
      if (normalized.includes('industrial') || normalized.includes('factory')) return Factory;
      if (normalized.includes('layer')) return Layers;
      return Cog;
    }

    return PackageCheck;
  };

  const IconComponent = getIcon();

  return <IconComponent className={className} size={size} aria-hidden="true" />;
}
