import { Category, Product, Project, BlogPost } from '@/types';

export const categories: Category[] = [
  {
    id: 'c1',
    name: 'Bakery Equipment',
    slug: 'bakery-equipment',
    description: 'Professional grade ovens, mixers, and proofers for high-volume bakeries.',
    image: 'https://images.unsplash.com/photo-1579697096985-41fe1430e5d6?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'c2',
    name: 'Commercial Kitchen',
    slug: 'commercial-kitchen',
    description: 'Heavy-duty cooking ranges, fryers, and grills for restaurants and hotels.',
    image: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'c3',
    name: 'Refrigeration',
    slug: 'refrigeration',
    description: 'Industrial chillers, freezers, and cold rooms for optimal food preservation.',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'c4',
    name: 'Display Counters',
    slug: 'display-counters',
    description: 'Elegant pastry and hot food display cabinets to attract customers.',
    image: 'https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'c5',
    name: 'Stainless Steel Fabrication',
    slug: 'ss-fabrication',
    description: 'Custom work tables, sinks, and exhaust hoods manufactured to precision.',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop',
  }
];

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Industrial Rotary Rack Oven',
    slug: 'industrial-rotary-rack-oven',
    categoryId: 'c1',
    categoryName: 'Bakery Equipment',
    shortDescription: 'High-capacity rotary rack oven ideal for large scale bread and pastry production.',
    description: 'The BCare Industrial Rotary Rack Oven is engineered for consistent, high-volume baking. Featuring advanced airflow technology and a robust stainless steel heat exchanger, it ensures perfectly even baking across all trays. Its programmable control panel allows for precision temperature and steam management, making it an indispensable asset for large bakeries and industrial canteens.',
    images: [
      'https://images.unsplash.com/photo-1584285418504-0359837267eb?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=1200&auto=format&fit=crop'
    ],
    specifications: {
      'Dimensions (WxDxH)': '1800 x 2200 x 2400 mm',
      'Tray Capacity': '72 Trays (40x60 cm)',
      'Power Source': 'Electric / Diesel / Gas',
      'Temperature Range': '30°C - 300°C',
      'Material': 'SS 304 High-Grade Stainless Steel'
    },
    applications: ['Large Commercial Bakeries', 'Biscuit Factories', 'Hotel Kitchens'],
    features: ['High-efficiency heat exchanger', 'Digital programmable controller', 'Auto steam injection system', 'Heavy-duty rack rotation mechanism'],
    benefits: ['Reduces energy consumption by 20%', 'Ensures uniform baking color', 'Easy to clean and maintain', 'Long operational lifespan'],
    relatedProductIds: ['p2', 'p3'],
    seoTitle: 'Industrial Rotary Rack Oven in Kerala | BCare',
    seoDescription: 'Buy premium Industrial Rotary Rack Oven for commercial bakeries. Engineered by BCare in Kerala for high-capacity baking and energy efficiency.'
  },
  {
    id: 'p2',
    name: 'Planetary Mixer 60L',
    slug: 'planetary-mixer-60l',
    categoryId: 'c1',
    categoryName: 'Bakery Equipment',
    shortDescription: 'Heavy-duty 60-liter planetary mixer for dough, batter, and whipping.',
    description: 'Designed for versatility and endurance, the 60L Planetary Mixer is a powerhouse for any commercial bakery. With a high-torque motor and three distinct speed settings, it effortlessly handles heavy bread doughs as well as light meringues. Safety is paramount, featuring a bowl guard interlock and emergency stop.',
    images: [
      'https://images.unsplash.com/photo-1621252178553-6a37829871db?q=80&w=1200&auto=format&fit=crop'
    ],
    specifications: {
      'Bowl Capacity': '60 Liters',
      'Max Dough Capacity': '25 Kg',
      'Power': '3 HP (2.2 kW)',
      'Speeds': '3 Speed Gear Driven',
      'Included Accessories': 'Dough Hook, Flat Beater, Wire Whip'
    },
    applications: ['Bakeries', 'Pizzerias', 'Restaurants', 'Catering'],
    features: ['Gear-driven transmission', 'Stainless steel bowl', 'Safety guard with auto-shutoff'],
    benefits: ['Versatile mixing capabilities', 'Quiet operation', 'High durability'],
    relatedProductIds: ['p1']
  },
  {
    id: 'p3',
    name: '4-Burner Commercial Cooking Range',
    slug: '4-burner-commercial-cooking-range',
    categoryId: 'c2',
    categoryName: 'Commercial Kitchen',
    shortDescription: 'Heavy-duty 4-burner gas range designed for high-traffic restaurant kitchens.',
    description: 'The backbone of a bustling restaurant kitchen, this 4-Burner Commercial Range is fabricated entirely from SS 304. It features high-BTU brass burners that provide rapid heating and precise simmering controls. The heavy-duty cast iron pan supports can withstand constant use with heavy pots and pans.',
    images: [
      'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=1200&auto=format&fit=crop'
    ],
    specifications: {
      'Dimensions (WxDxH)': '900 x 900 x 850 mm',
      'Burners': '4 x High Pressure Brass Burners',
      'Gas Type': 'LPG / PNG',
      'Material': 'SS 304 Top & Body',
      'Under-shelf': 'Included for storage'
    },
    applications: ['Restaurants', 'Hotels', 'Cloud Kitchens', 'Resorts'],
    features: ['Removable drip trays', 'Heavy cast iron grates', 'Adjustable bullet feet'],
    benefits: ['Easy to clean', 'Withstands heavy commercial use', 'Ergonomic cooking height'],
    relatedProductIds: ['p4']
  },
  {
    id: 'p4',
    name: 'Double Door Vertical Chiller',
    slug: 'double-door-vertical-chiller',
    categoryId: 'c3',
    categoryName: 'Refrigeration',
    shortDescription: 'Large capacity 1000L vertical chiller for commercial food storage.',
    description: 'Keep your ingredients fresh and safe with our Double Door Vertical Chiller. Featuring a ventilated cooling system, it ensures uniform temperature distribution across all shelves. The digital thermostat provides precise control, while the auto-defrost feature minimizes maintenance.',
    images: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop'
    ],
    specifications: {
      'Capacity': '1000 Liters',
      'Temperature Range': '2°C to 8°C',
      'Refrigerant': 'R134a / R290 (Eco-friendly)',
      'Compressor': 'Embraco / Danfoss',
      'Shelves': '8 Adjustable PVC coated'
    },
    applications: ['Supermarkets', 'Restaurant Kitchens', 'Hotels', 'Hospitals'],
    features: ['Digital temperature controller', 'Auto defrost', 'Self-closing doors', 'LED interior lighting'],
    benefits: ['Energy efficient', 'Maximized storage space', 'Ensures food safety compliance'],
  }
];

export const projects: Project[] = [
  {
    id: 'proj1',
    title: 'Grand Hyatt Kitchen Setup',
    slug: 'grand-hyatt-kitchen-setup',
    clientName: 'Grand Hyatt',
    industry: 'Hospitality - 5 Star Hotel',
    location: 'Kochi, Kerala',
    completionDate: '2023-10-15',
    equipmentSupplied: ['Custom SS Fabrication', 'Walk-in Cold Rooms', 'Cooking Ranges', 'Exhaust Systems'],
    description: 'A complete turnkey project involving the design, manufacture, and installation of the main banqueting kitchen and three specialty restaurant kitchens. The project required strict adherence to international 5-star hygiene and safety standards. BCare executed the project 2 weeks ahead of schedule, providing state-of-the-art SS 304 fabrication and high-end refrigeration solutions.',
    images: [
      'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=1200&auto=format&fit=crop'
    ],
    testimonial: {
      quote: 'BCare delivered exceptional quality. Their engineering team understood our complex workflow requirements and executed the fabrication flawlessly.',
      author: 'Chef Thomas',
      designation: 'Executive Chef, Grand Hyatt'
    }
  },
  {
    id: 'proj2',
    title: 'BakeHouse Central Production Facility',
    slug: 'bakehouse-central-production-facility',
    clientName: 'BakeHouse Chain',
    industry: 'Commercial Bakery',
    location: 'Thrissur, Kerala',
    completionDate: '2024-02-20',
    equipmentSupplied: ['Rotary Rack Ovens', 'Planetary Mixers', 'Dough Sheeters', 'Proofer Rooms'],
    description: 'Designed and equipped a massive 10,000 sq ft central production facility to supply 15 retail outlets daily. BCare installed heavy-duty rotary rack ovens and automated dough handling systems to maximize yield while maintaining artisanal quality.',
    images: [
      'https://images.unsplash.com/photo-1579697096985-41fe1430e5d6?q=80&w=1200&auto=format&fit=crop'
    ]
  }
];

export const blogs: BlogPost[] = [
  {
    id: 'b1',
    title: 'Top 5 Essential Equipment for a Commercial Bakery',
    slug: 'top-5-essential-equipment-commercial-bakery',
    category: 'Bakery Business',
    author: 'BCare Engineering Team',
    date: '2023-11-12',
    coverImage: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=1200&auto=format&fit=crop',
    excerpt: 'Starting a bakery? Ensure you have the right foundation. We explore the 5 must-have machines that guarantee efficiency and product consistency.',
    tags: ['Bakery', 'Startup Guide', 'Equipment'],
    content: '<p>When setting up a commercial bakery, the right equipment is the difference between struggling to meet demand and scaling effortlessly...</p>'
  },
  {
    id: 'b2',
    title: 'How to Optimize Your Restaurant Kitchen Layout for Maximum Efficiency',
    slug: 'optimize-restaurant-kitchen-layout-efficiency',
    category: 'Kitchen Design',
    author: 'BCare Design Experts',
    date: '2024-01-05',
    coverImage: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=1200&auto=format&fit=crop',
    excerpt: 'A poorly designed kitchen costs you time and money during rush hours. Learn the key principles of ergonomic kitchen design.',
    tags: ['Kitchen Layout', 'Restaurant Setup', 'Efficiency'],
    content: '<p>The flow of food from prep to plating is critical. In this guide, we break down the assembly line configuration vs the zone configuration...</p>'
  }
];
