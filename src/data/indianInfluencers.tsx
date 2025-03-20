
import { Instagram, Youtube, Twitter } from 'lucide-react';
import React from 'react';

// Custom TikTok icon as a proper React component
export const TikTokIcon: React.FC = () => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="16" 
      height="16" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
      <path d="M15 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
      <path d="M15 8v8a4 4 0 0 1-4 4" />
      <path d="M15 8h-4" />
    </svg>
  );
};

export const indianInfluencers = [
  {
    id: 1,
    name: 'Komal Pandey',
    profileImage: 'https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
    image: 'https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
    category: 'Fashion & Lifestyle',
    followers: 1500000,
    engagement: 4.8,
    city: 'Delhi',
    coordinates: { lat: 28.6139, lng: 77.2090 },
    socialLinks: {
      instagram: 'https://instagram.com/komal.pandey',
      youtube: 'https://youtube.com/c/komalpandey'
    },
    platform: 'Instagram',
    platformIcon: <Instagram size={12} className="mr-1" />,
    tags: ['fashion', 'lifestyle', 'beauty'],
    bio: 'Fashion influencer sharing style tips and lifestyle content',
    verified: true
  },
  {
    id: 2,
    name: 'Ranveer Allahbadia',
    profileImage: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
    image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
    category: 'Fitness & Motivation',
    followers: 2100000,
    engagement: 5.2,
    city: 'Mumbai',
    coordinates: { lat: 19.0760, lng: 72.8777 },
    socialLinks: {
      youtube: 'https://youtube.com/c/ranveerallahbadia',
      instagram: 'https://instagram.com/beerbiceps'
    },
    platform: 'YouTube',
    platformIcon: <Youtube size={12} className="mr-1" />,
    tags: ['fitness', 'motivation', 'lifestyle'],
    bio: 'Entrepreneur, podcaster, and fitness enthusiast sharing knowledge on personal growth',
    verified: true
  },
  {
    id: 3,
    name: 'Kritika Khurana',
    profileImage: 'https://images.unsplash.com/photo-1615473967657-9dc21696d30f?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
    image: 'https://images.unsplash.com/photo-1615473967657-9dc21696d30f?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
    category: 'Travel & Lifestyle',
    followers: 1300000,
    engagement: 4.5,
    city: 'Bangalore',
    coordinates: { lat: 12.9716, lng: 77.5946 },
    socialLinks: {
      instagram: 'https://instagram.com/thatbohogirl',
      tiktok: 'https://tiktok.com/@thatbohogirl'
    },
    platform: 'Instagram',
    platformIcon: <Instagram size={12} className="mr-1" />,
    tags: ['travel', 'fashion', 'lifestyle'],
    bio: 'Travel and fashion influencer sharing bohemian style and wanderlust inspiration',
    verified: true
  },
  {
    id: 4,
    name: 'Nikhil Sharma',
    profileImage: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
    image: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
    category: 'Tech & Gadgets',
    followers: 1800000,
    engagement: 4.9,
    city: 'Hyderabad',
    coordinates: { lat: 17.3850, lng: 78.4867 },
    socialLinks: {
      youtube: 'https://youtube.com/c/mumbiker',
      twitter: 'https://twitter.com/mumbiker'
    },
    platform: 'YouTube',
    platformIcon: <Youtube size={12} className="mr-1" />,
    tags: ['tech', 'gadgets', 'reviews'],
    bio: 'Tech reviewer and gadget enthusiast exploring the latest in technology',
    verified: false
  },
  {
    id: 5,
    name: 'Prajakta Koli',
    profileImage: 'https://images.unsplash.com/photo-1601288496920-b6154fe3626a?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
    image: 'https://images.unsplash.com/photo-1601288496920-b6154fe3626a?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
    category: 'Comedy & Entertainment',
    followers: 6700000,
    engagement: 5.7,
    city: 'Mumbai',
    coordinates: { lat: 19.0760, lng: 72.8777 },
    socialLinks: {
      instagram: 'https://instagram.com/mostlysane',
      youtube: 'https://youtube.com/c/MostlySane'
    },
    platform: 'YouTube',
    platformIcon: <Youtube size={12} className="mr-1" />,
    tags: ['comedy', 'entertainment', 'lifestyle'],
    bio: 'Content creator bringing laughter through comedy sketches and relatable content',
    verified: true
  },
  {
    id: 6,
    name: 'Ankush Bahuguna',
    profileImage: 'https://images.unsplash.com/photo-1584043720379-b56cd9199c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
    image: 'https://images.unsplash.com/photo-1584043720379-b56cd9199c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
    category: 'Beauty & Makeup',
    followers: 980000,
    engagement: 4.3,
    city: 'Delhi',
    coordinates: { lat: 28.6139, lng: 77.2090 },
    socialLinks: {
      instagram: 'https://instagram.com/ankushbahuguna',
      youtube: 'https://youtube.com/c/ankushbahuguna'
    },
    platform: 'Instagram',
    platformIcon: <Instagram size={12} className="mr-1" />,
    tags: ['beauty', 'makeup', 'skincare'],
    bio: 'Beauty influencer breaking stereotypes and sharing makeup tutorials',
    verified: false
  },
  {
    id: 7,
    name: 'Diipa Büller-Khosla',
    profileImage: 'https://images.unsplash.com/photo-1563620915-6e8c3fee1b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
    image: 'https://images.unsplash.com/photo-1563620915-6e8c3fee1b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
    category: 'Luxury & Fashion',
    followers: 1700000,
    engagement: 4.6,
    city: 'Delhi',
    coordinates: { lat: 28.6139, lng: 77.2090 },
    socialLinks: {
      instagram: 'https://instagram.com/diipakhosla',
      twitter: 'https://twitter.com/diipakhosla'
    },
    platform: 'Instagram',
    platformIcon: <Instagram size={12} className="mr-1" />,
    tags: ['luxury', 'fashion', 'lifestyle'],
    bio: 'Global fashion icon and entrepreneur advocating for diversity in the fashion industry',
    verified: true
  }
];

export const indianBusinesses = [
  {
    id: 101,
    name: 'Nykaa',
    logo: 'https://images.unsplash.com/photo-1598257006626-48b0c252070d?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
    category: 'Beauty & Personal Care',
    city: 'Mumbai',
    description: 'India\'s leading beauty and personal care e-commerce platform offering a wide range of cosmetics and wellness products.',
    budget: '₹150,000 - ₹700,000 per campaign',
    lookingFor: ['Beauty', 'Skincare', 'Lifestyle']
  },
  {
    id: 102,
    name: 'Boat Lifestyle',
    logo: 'https://images.unsplash.com/photo-1511300636408-a63a89df3482?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
    category: 'Consumer Electronics',
    city: 'Delhi',
    description: 'Leading Indian consumer electronics brand specializing in affordable audio products, wearables, and mobile accessories.',
    budget: '₹200,000 - ₹1,000,000 per campaign',
    lookingFor: ['Tech', 'Lifestyle', 'Fitness']
  },
  {
    id: 103,
    name: 'Mamaearth',
    logo: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
    category: 'Natural Skincare',
    city: 'Bangalore',
    description: 'Toxin-free, natural skincare and baby care products made with plant-based ingredients and environmentally conscious packaging.',
    budget: '₹100,000 - ₹500,000 per campaign',
    lookingFor: ['Parenting', 'Beauty', 'Wellness']
  },
  {
    id: 104,
    name: 'Urban Company',
    logo: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
    category: 'Services Marketplace',
    city: 'Hyderabad',
    description: 'Home services platform connecting users with service professionals for beauty, wellness, home repairs, and maintenance.',
    budget: '₹80,000 - ₹350,000 per campaign',
    lookingFor: ['Lifestyle', 'Home', 'Local']
  },
  {
    id: 105,
    name: 'FabIndia',
    logo: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
    category: 'Traditional Clothing & Home',
    city: 'Delhi',
    description: 'Traditional Indian clothing, home furnishings, and organic foods celebrating the diverse crafts and textiles of India.',
    budget: '₹120,000 - ₹600,000 per campaign',
    lookingFor: ['Fashion', 'Culture', 'Lifestyle']
  }
];
