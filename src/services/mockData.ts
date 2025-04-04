import { v4 as uuidv4 } from 'uuid';

export interface User {
  id: string;
  name: string;
  email: string;
  type: 'influencer' | 'business';
  avatar: string;
  bio?: string;
  location?: string;
  categories?: string[];
  socialLinks?: {
    platform: string;
    url: string;
  }[];
  stats?: {
    followers?: number;
    engagement?: number;
    projects?: number;
    clients?: number;
    employees?: number;
  };
  services?: string[];
  contact?: {
    email: string;
    phone?: string;
    website?: string;
  };
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  images?: string[];
  likes: number;
  comments: number;
  createdAt: string;
}

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    type: 'influencer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop',
    bio: 'Lifestyle and travel content creator. Sharing authentic moments and experiences.',
    location: 'Mumbai',
    categories: ['Fashion', 'Lifestyle'],
    socialLinks: [
      { platform: 'Instagram', url: 'https://instagram.com/sarahj' },
      { platform: 'YouTube', url: 'https://youtube.com/sarahj' },
      { platform: 'Twitter', url: 'https://twitter.com/sarahj' }
    ],
    stats: {
      followers: 120000,
      engagement: 4.8
    }
  },
  {
    id: '2',
    name: 'TechStart Inc.',
    email: 'contact@techstart.com',
    type: 'business',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=TS',
    bio: 'Leading technology solutions provider helping businesses transform digitally.',
    location: 'San Francisco, USA',
    categories: ['Technology', 'Software', 'Digital Solutions'],
    services: ['Web Development', 'Mobile Apps', 'Cloud Solutions'],
    stats: {
      employees: 50,
      projects: 100,
      clients: 75
    },
    contact: {
      email: 'contact@techstart.com',
      phone: '+1 (555) 123-4567',
      website: 'https://techstart.com'
    }
  },
  {
    id: '3',
    name: 'Mike Chen',
    email: 'mike@example.com',
    type: 'influencer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
    bio: 'Tech reviewer and gadget enthusiast. Making technology accessible to everyone.',
    location: 'Bangalore',
    categories: ['Technology', 'Gaming'],
    socialLinks: [
      { platform: 'Instagram', url: 'https://instagram.com/mikechen' },
      { platform: 'YouTube', url: 'https://youtube.com/mikechen' },
      { platform: 'Twitter', url: 'https://twitter.com/mikechen' }
    ],
    stats: {
      followers: 150000,
      engagement: 4.9
    }
  },
  {
    id: '4',
    name: 'Fashion Forward',
    email: 'info@fashionforward.com',
    type: 'business',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=FF',
    bio: 'Sustainable fashion brand creating stylish and eco-friendly clothing.',
    location: 'London, UK',
    categories: ['Fashion', 'Sustainability', 'E-commerce'],
    services: ['Clothing', 'Accessories', 'Custom Orders'],
    stats: {
      employees: 30,
      projects: 50,
      clients: 100
    },
    contact: {
      email: 'info@fashionforward.com',
      phone: '+44 20 7123 4567',
      website: 'https://fashionforward.com'
    }
  },
  {
    id: '5',
    name: 'Aditi Verma',
    email: 'aditi@example.com',
    type: 'influencer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
    bio: 'Fashion and lifestyle influencer sharing daily inspiration and style tips.',
    location: 'Mumbai, India',
    categories: ['Fashion', 'Lifestyle', 'Beauty'],
    socialLinks: [
      { platform: 'Instagram', url: 'https://instagram.com/aditiverma' },
      { platform: 'YouTube', url: 'https://youtube.com/aditiverma' },
      { platform: 'TikTok', url: 'https://tiktok.com/@aditiverma' }
    ],
    stats: {
      followers: 180000,
      engagement: 4.8,
      projects: 20,
      clients: 12
    }
  },
  {
    id: '6',
    name: 'Rohan Kapoor',
    email: 'rohan@example.com',
    type: 'influencer',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
    bio: 'Tech entrepreneur and startup mentor. Sharing insights on business and innovation.',
    location: 'Bangalore, India',
    categories: ['Technology', 'Business', 'Startups'],
    socialLinks: [
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/rohankapoor' },
      { platform: 'Twitter', url: 'https://twitter.com/rohankapoor' },
      { platform: 'YouTube', url: 'https://youtube.com/rohankapoor' }
    ],
    stats: {
      followers: 250000,
      engagement: 5.5,
      projects: 35,
      clients: 25
    }
  },
  {
    id: '7',
    name: 'Meera Iyer',
    email: 'meera@example.com',
    type: 'influencer',
    avatar: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
    bio: 'Food and travel enthusiast exploring culinary delights across India.',
    location: 'Delhi, India',
    categories: ['Food', 'Travel', 'Lifestyle'],
    socialLinks: [
      { platform: 'Instagram', url: 'https://instagram.com/meeraiyer' },
      { platform: 'YouTube', url: 'https://youtube.com/meeraiyer' },
      { platform: 'Twitter', url: 'https://twitter.com/meeraiyer' }
    ],
    stats: {
      followers: 220000,
      engagement: 5.0,
      projects: 28,
      clients: 18
    }
  },
  {
    id: '8',
    name: 'Siddharth Nair',
    email: 'siddharth@example.com',
    type: 'influencer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
    bio: 'Fitness trainer and wellness coach helping people achieve their health goals.',
    location: 'Chennai, India',
    categories: ['Fitness', 'Health', 'Wellness'],
    socialLinks: [
      { platform: 'Instagram', url: 'https://instagram.com/siddharthnair' },
      { platform: 'YouTube', url: 'https://youtube.com/siddharthnair' },
      { platform: 'TikTok', url: 'https://tiktok.com/@siddharthnair' }
    ],
    stats: {
      followers: 190000,
      engagement: 4.7,
      projects: 22,
      clients: 15
    }
  },
  {
    id: '9',
    name: 'Rohit Sharma',
    email: 'rohit@example.com',
    type: 'influencer',
    avatar: 'https://i.pravatar.cc/150?img=3',
    bio: 'Food blogger and recipe developer. Specializes in Indian cuisine and fusion recipes.',
    location: 'Delhi, India',
    categories: ['Food', 'Cooking', 'Lifestyle'],
    socialLinks: [
      { platform: 'Instagram', url: 'https://instagram.com/rohitsharma' },
      { platform: 'YouTube', url: 'https://youtube.com/rohitsharma' },
      { platform: 'Twitter', url: 'https://twitter.com/rohitsharma' }
    ],
    stats: {
      followers: 90000,
      engagement: 5.4,
      projects: 15,
      clients: 10
    }
  }
];

export const mockPosts: Post[] = [
  {
    id: uuidv4(),
    userId: '1',
    content: 'Just landed in Bali! 🌴 Ready for an amazing adventure. Stay tuned for travel tips and hidden gems! #TravelLife #Bali',
    images: ['https://source.unsplash.com/random/800x600?bali'],
    likes: 1234,
    comments: 89,
    createdAt: '2024-03-15T10:30:00Z'
  },
  {
    id: uuidv4(),
    userId: '3',
    content: 'Review: The latest gaming laptop from @TechStart - Is it worth the hype? 🎮 Check out my full review on YouTube! #TechReview',
    images: ['https://source.unsplash.com/random/800x600?laptop'],
    likes: 856,
    comments: 45,
    createdAt: '2024-03-14T15:45:00Z'
  },
  {
    id: uuidv4(),
    userId: '4',
    content: 'Introducing our new sustainable collection! 🌱 Made with 100% recycled materials. Shop now at fashionforward.com #SustainableFashion',
    images: ['https://source.unsplash.com/random/800x600?fashion'],
    likes: 2341,
    comments: 156,
    createdAt: '2024-03-13T09:15:00Z'
  }
];

export const mockCategories = [
  'Technology',
  'Fashion',
  'Travel',
  'Lifestyle',
  'Gaming',
  'Food',
  'Fitness',
  'Business',
  'Education',
  'Entertainment'
];

export const mockServices = [
  'Content Creation',
  'Social Media Management',
  'Brand Collaboration',
  'Product Reviews',
  'Event Coverage',
  'Consulting',
  'Training',
  'Mentoring',
  'Public Speaking',
  'Workshop Facilitation'
];

export const mockInfluencers: Influencer[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    category: "Fashion",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    rating: 5.2,
    followers: 120000,
    price: 2500,
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    description: "Fashion influencer specializing in sustainable and ethical fashion. Regular content on styling tips, shopping guides, and brand reviews.",
    tags: ["fashion", "sustainable", "lifestyle", "shopping"],
    languages: ["English", "Hindi"],
    availability: "Available for collaborations",
    socialLinks: {
      instagram: "https://instagram.com/sarahj",
      youtube: "https://youtube.com/sarahj",
      twitter: "https://twitter.com/sarahj"
    },
    portfolio: [
      {
        title: "Summer Collection Review",
        description: "Detailed review of sustainable summer fashion brands",
        metrics: {
          views: 15000,
          engagement: 1200
        }
      }
    ],
    reviews: [
      {
        id: 1,
        rating: 5,
        comment: "Excellent collaboration experience",
        author: "Brand X",
        date: "2024-02-15"
      }
    ],
    verified: true
  },
  {
    id: 2,
    name: "Mike Chen",
    category: "Technology",
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
    rating: 5.8,
    followers: 150000,
    price: 3000,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    description: "Tech reviewer and gadget enthusiast. Specializes in smartphone reviews, gaming setups, and tech tutorials.",
    tags: ["tech", "gaming", "reviews", "tutorials"],
    languages: ["English", "Kannada"],
    availability: "Available for collaborations",
    socialLinks: {
      instagram: "https://instagram.com/mikechen",
      youtube: "https://youtube.com/mikechen",
      twitter: "https://twitter.com/mikechen"
    },
    portfolio: [
      {
        title: "Latest Smartphone Comparison",
        description: "In-depth comparison of flagship smartphones",
        metrics: {
          views: 25000,
          engagement: 2000
        }
      }
    ],
    reviews: [
      {
        id: 1,
        rating: 5,
        comment: "Great technical expertise",
        author: "Tech Brand Y",
        date: "2024-02-10"
      }
    ],
    verified: true
  },
  {
    id: 3,
    name: "Rohit Sharma",
    category: "Food",
    city: "Delhi",
    state: "Delhi",
    country: "India",
    rating: 5.4,
    followers: 90000,
    price: 2000,
    image: "https://i.pravatar.cc/150?img=3",
    description: "Food blogger and recipe developer. Specializes in Indian cuisine and fusion recipes.",
    tags: ["food", "cooking", "recipes", "indian-cuisine"],
    languages: ["English", "Hindi"],
    availability: "Available for collaborations",
    socialLinks: {
      instagram: "https://instagram.com/rohitsharma",
      youtube: "https://youtube.com/rohitsharma",
      twitter: "https://twitter.com/rohitsharma"
    },
    portfolio: [
      {
        title: "Traditional Recipes Series",
        description: "Authentic Indian recipes with modern twists",
        metrics: {
          views: 18000,
          engagement: 1500
        }
      }
    ],
    reviews: [
      {
        id: 1,
        rating: 4,
        comment: "Authentic content",
        author: "Food Brand Z",
        date: "2024-02-05"
      }
    ],
    verified: false
  },
  {
    id: 4,
    name: "Aditi Verma",
    category: "Fashion & Lifestyle",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    rating: 5.6,
    followers: 180000,
    price: 2800,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    description: "Fashion and lifestyle influencer sharing daily inspiration and style tips.",
    tags: ["fashion", "lifestyle", "beauty", "style"],
    languages: ["English", "Hindi"],
    availability: "Available for collaborations",
    socialLinks: {
      instagram: "https://instagram.com/aditiverma",
      youtube: "https://youtube.com/aditiverma",
      tiktok: "https://tiktok.com/@aditiverma"
    },
    portfolio: [
      {
        title: "Style Guide Series",
        description: "Complete style guides for different occasions",
        metrics: {
          views: 22000,
          engagement: 1800
        }
      }
    ],
    reviews: [
      {
        id: 1,
        rating: 5,
        comment: "Outstanding fashion content",
        author: "Style Brand A",
        date: "2024-02-12"
      }
    ],
    verified: true
  },
  {
    id: 5,
    name: "Rohan Kapoor",
    category: "Technology & Business",
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
    rating: 5.9,
    followers: 250000,
    price: 3500,
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    description: "Tech entrepreneur and startup mentor. Sharing insights on business and innovation.",
    tags: ["technology", "business", "startups", "entrepreneurship"],
    languages: ["English", "Hindi"],
    availability: "Available for collaborations",
    socialLinks: {
      linkedin: "https://linkedin.com/in/rohankapoor",
      twitter: "https://twitter.com/rohankapoor",
      youtube: "https://youtube.com/rohankapoor"
    },
    portfolio: [
      {
        title: "Startup Success Stories",
        description: "Interviews with successful entrepreneurs",
        metrics: {
          views: 30000,
          engagement: 2500
        }
      }
    ],
    reviews: [
      {
        id: 1,
        rating: 5,
        comment: "Valuable business insights",
        author: "Business Brand B",
        date: "2024-02-08"
      }
    ],
    verified: true
  },
  {
    id: 6,
    name: "Meera Iyer",
    category: "Food & Travel",
    city: "Delhi",
    state: "Delhi",
    country: "India",
    rating: 5.7,
    followers: 220000,
    price: 2800,
    image: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    description: "Food and travel enthusiast exploring culinary delights across India.",
    tags: ["food", "travel", "lifestyle", "culinary"],
    languages: ["English", "Hindi"],
    availability: "Available for collaborations",
    socialLinks: {
      instagram: "https://instagram.com/meeraiyer",
      youtube: "https://youtube.com/meeraiyer",
      twitter: "https://twitter.com/meeraiyer"
    },
    portfolio: [
      {
        title: "Culinary Journey Series",
        description: "Exploring regional cuisines across India",
        metrics: {
          views: 28000,
          engagement: 2200
        }
      }
    ],
    reviews: [
      {
        id: 1,
        rating: 5,
        comment: "Amazing food content",
        author: "Food Brand C",
        date: "2024-02-03"
      }
    ],
    verified: true
  },
  {
    id: 7,
    name: "Siddharth Nair",
    category: "Fitness & Wellness",
    city: "Chennai",
    state: "Tamil Nadu",
    country: "India",
    rating: 5.3,
    followers: 190000,
    price: 2500,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    description: "Fitness trainer and wellness coach helping people achieve their health goals.",
    tags: ["fitness", "health", "wellness", "lifestyle"],
    languages: ["English", "Tamil"],
    availability: "Available for collaborations",
    socialLinks: {
      instagram: "https://instagram.com/siddharthnair",
      youtube: "https://youtube.com/siddharthnair",
      tiktok: "https://tiktok.com/@siddharthnair"
    },
    portfolio: [
      {
        title: "Workout Series",
        description: "Complete workout guides for different fitness levels",
        metrics: {
          views: 20000,
          engagement: 1800
        }
      }
    ],
    reviews: [
      {
        id: 1,
        rating: 4,
        comment: "Great fitness content",
        author: "Fitness Brand D",
        date: "2024-02-01"
      }
    ],
    verified: true
  }
]; 