
import { Instagram, Youtube } from 'lucide-react';
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
    image: 'https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
    category: 'Fashion & Lifestyle',
    followers: '1.5M',
    platform: 'Instagram',
    platformIcon: <Instagram size={16} />,
    verified: true,
    city: 'Delhi',
    coordinates: { lat: 28.6139, lng: 77.2090 },
    tags: ['fashion', 'beauty', 'lifestyle'],
    engagement: 4.8,
    bio: 'Fashion stylist and digital content creator specializing in contemporary Indian fashion and lifestyle trends.'
  },
  {
    id: 2,
    name: 'Ranveer Allahbadia',
    image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
    category: 'Fitness & Motivation',
    followers: '2.1M',
    platform: 'YouTube',
    platformIcon: <Youtube size={16} />,
    verified: true,
    city: 'Mumbai',
    coordinates: { lat: 19.0760, lng: 72.8777 },
    tags: ['fitness', 'motivation', 'entrepreneurship'],
    engagement: 5.2,
    bio: 'Entrepreneur, podcaster, and fitness enthusiast helping young Indians achieve their personal and professional goals.'
  },
  {
    id: 3,
    name: 'Kritika Khurana',
    image: 'https://images.unsplash.com/photo-1615473967657-9dc21696d30f?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
    category: 'Travel & Lifestyle',
    followers: '1.3M',
    platform: 'TikTok',
    platformIcon: <TikTokIcon />,
    verified: true,
    city: 'Bangalore',
    coordinates: { lat: 12.9716, lng: 77.5946 },
    tags: ['travel', 'fashion', 'lifestyle'],
    engagement: 4.5,
    bio: 'Travel blogger and fashion enthusiast sharing Indian and international destinations through a fashionable lens.'
  },
  {
    id: 4,
    name: 'Nikhil Sharma',
    image: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
    category: 'Tech & Gadgets',
    followers: '1.8M',
    platform: 'YouTube',
    platformIcon: <Youtube size={16} />,
    verified: true,
    city: 'Hyderabad',
    coordinates: { lat: 17.3850, lng: 78.4867 },
    tags: ['tech', 'gadgets', 'reviews'],
    engagement: 4.9,
    bio: 'Tech reviewer and gadget enthusiast covering the latest technology trends and products available in the Indian market.'
  },
  {
    id: 5,
    name: 'Prajakta Koli',
    image: 'https://images.unsplash.com/photo-1601288496920-b6154fe3626a?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
    category: 'Comedy & Entertainment',
    followers: '6.7M',
    platform: 'Instagram',
    platformIcon: <Instagram size={16} />,
    verified: true,
    city: 'Mumbai',
    coordinates: { lat: 19.0760, lng: 72.8777 },
    tags: ['comedy', 'entertainment', 'lifestyle'],
    engagement: 5.7,
    bio: 'Digital content creator specializing in relatable comedy and entertainment for young Indian audiences.'
  },
  {
    id: 6,
    name: 'Ankush Bahuguna',
    image: 'https://images.unsplash.com/photo-1584043720379-b56cd9199c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
    category: 'Beauty & Makeup',
    followers: '980K',
    platform: 'Instagram',
    platformIcon: <Instagram size={16} />,
    verified: true,
    city: 'Delhi',
    coordinates: { lat: 28.6139, lng: 77.2090 },
    tags: ['beauty', 'makeup', 'fashion'],
    engagement: 4.3,
    bio: 'Beauty creator breaking gender stereotypes in the Indian makeup industry with creative and inspirational content.'
  },
  {
    id: 7,
    name: 'Diipa Büller-Khosla',
    image: 'https://images.unsplash.com/photo-1563620915-6e8c3fee1b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
    category: 'Luxury & Fashion',
    followers: '1.7M',
    platform: 'Instagram',
    platformIcon: <Instagram size={16} />,
    verified: true,
    city: 'Delhi',
    coordinates: { lat: 28.6139, lng: 77.2090 },
    tags: ['luxury', 'fashion', 'lifestyle'],
    engagement: 4.6,
    bio: 'International fashion icon and entrepreneur connecting Indian luxury with global fashion trends.'
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
