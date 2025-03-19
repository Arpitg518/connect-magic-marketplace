
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Globe, 
  MapPin, 
  Briefcase, 
  Users, 
  CheckCircle, 
  Star, 
  Calendar, 
  DollarSign, 
  Share2, 
  Flag, 
  BarChart3, 
  Clock,
  Instagram,
  Youtube,
  Twitter,
  Facebook,
  ExternalLink
} from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Mock data for a business profile
const mockBusiness = {
  id: 456,
  name: 'Lumina Beauty',
  logo: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
  coverImage: 'https://images.unsplash.com/photo-1607461733377-eac3c28a5380?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
  description: 'Eco-friendly beauty brand committed to sustainable practices and cruelty-free products. We create high-quality skincare and cosmetics that are good for you and the planet.',
  website: 'https://luminabeauty.com',
  industry: 'Beauty & Cosmetics',
  location: 'San Francisco, CA',
  founded: 2018,
  size: '50-100 employees',
  verificationLevel: 'Elite',
  rating: 4.9,
  reviews: 36,
  campaigns: 43,
  campaignsActive: 5,
  budget: {
    min: 1500,
    max: 5000
  },
  socialMedia: [
    {
      platform: 'Instagram',
      url: 'https://instagram.com/luminabeauty',
      followers: '245K',
      icon: <Instagram size={20} />
    },
    {
      platform: 'Facebook',
      url: 'https://facebook.com/luminabeauty',
      followers: '180K',
      icon: <Facebook size={20} />
    },
    {
      platform: 'Twitter',
      url: 'https://twitter.com/luminabeauty',
      followers: '76K',
      icon: <Twitter size={20} />
    },
    {
      platform: 'YouTube',
      url: 'https://youtube.com/luminabeauty',
      followers: '92K',
      icon: <Youtube size={20} />
    }
  ],
  targetAudience: ['Women 18-35', 'Beauty Enthusiasts', 'Eco-conscious Consumers'],
  activeCampaigns: [
    {
      id: 101,
      title: 'Summer Skincare Launch',
      description: 'Seeking influencers to promote our new summer skincare collection focused on sun protection and hydration.',
      budget: {
        min: 1500,
        max: 3000
      },
      influencers: {
        needed: 10,
        applied: 18
      },
      deadline: 'Jun 15, 2023',
      status: 'Active'
    },
    {
      id: 102,
      title: 'Clean Beauty Awareness',
      description: 'Educational campaign about the benefits of clean beauty products and sustainable packaging.',
      budget: {
        min: 2000,
        max: 5000
      },
      influencers: {
        needed: 5,
        applied: 12
      },
      deadline: 'Jul 10, 2023',
      status: 'Active'
    }
  ],
  pastCampaigns: [
    {
      id: 201,
      title: 'Spring Collection Launch',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      influencers: 12,
      impressions: '2.8M',
      engagement: '420K'
    },
    {
      id: 202,
      title: 'Eco-Packaging Initiative',
      image: 'https://images.unsplash.com/photo-1621797064712-2f1e7b8a8f02?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      influencers: 8,
      impressions: '1.5M',
      engagement: '280K'
    },
    {
      id: 203,
      title: 'Holiday Gift Sets',
      image: 'https://images.unsplash.com/photo-1562887250-9a52d844ad30?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      influencers: 15,
      impressions: '3.2M',
      engagement: '510K'
    }
  ],
  testimonials: [
    {
      id: 1,
      influencer: {
        name: 'Madison Taylor',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
        category: 'Beauty Creator'
      },
      text: 'Working with Lumina Beauty was incredibly seamless. Their team provided clear guidelines while still giving me creative freedom. The products were amazing and my audience loved the content!',
      rating: 5
    },
    {
      id: 2,
      influencer: {
        name: 'Alex Wong',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
        category: 'Lifestyle Creator'
      },
      text: 'Lumina Beauty stands out for their commitment to sustainability and transparent communication. The campaign was well-structured and they offered great support throughout the collaboration.',
      rating: 5
    }
  ]
};

const BusinessProfile: React.FC = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20 pb-16">
        {/* Profile Header/Cover */}
        <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={mockBusiness.coverImage} 
              alt="Company cover" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60"></div>
          </div>
          
          {/* Profile Actions */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button className="bg-white/20 backdrop-blur-sm text-white rounded-full p-2 hover:bg-white/30 transition-colors">
              <Share2 size={18} />
            </button>
            <button className="bg-white/20 backdrop-blur-sm text-white rounded-full p-2 hover:bg-white/30 transition-colors">
              <Flag size={18} />
            </button>
          </div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6">
          {/* Business Info Section */}
          <div className="relative -mt-24 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-card border border-border/30 p-6 md:p-8"
            >
              <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                {/* Logo & Basic Info */}
                <div className="flex flex-col items-center md:items-start">
                  <div className="relative -mt-24 md:-mt-28 mb-4">
                    <div className="w-28 h-28 md:w-36 md:h-36 rounded-xl border-4 border-white overflow-hidden shadow-lg">
                      <img 
                        src={mockBusiness.logo} 
                        alt={mockBusiness.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1.5 border-2 border-white">
                      <CheckCircle size={18} className="fill-white" />
                    </div>
                  </div>
                  
                  <div className="text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                      <h1 className="text-2xl font-bold">{mockBusiness.name}</h1>
                      <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full font-medium">
                        {mockBusiness.verificationLevel}
                      </span>
                    </div>
                    <p className="text-foreground/70 mb-3">{mockBusiness.industry}</p>
                    
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                      <div className="flex items-center">
                        <Star size={16} className="text-yellow-400 fill-yellow-400 mr-1" />
                        <span className="font-medium">{mockBusiness.rating}</span>
                        <span className="text-foreground/60 text-sm ml-1">({mockBusiness.reviews})</span>
                      </div>
                      <span className="text-foreground/40">•</span>
                      <div className="flex items-center">
                        <Briefcase size={16} className="text-foreground/60 mr-1" />
                        <span>{mockBusiness.campaigns} campaigns</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center md:justify-start text-foreground/70 mb-4">
                      <MapPin size={16} className="mr-1" />
                      <span>{mockBusiness.location}</span>
                    </div>
                    
                    <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                      {mockBusiness.targetAudience.map((audience, index) => (
                        <span 
                          key={index} 
                          className="bg-secondary text-foreground/80 text-sm px-3 py-1 rounded-full"
                        >
                          {audience}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-center md:justify-start gap-3">
                      {mockBusiness.socialMedia.map((social, index) => (
                        <a 
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground/70 hover:text-primary transition-colors"
                          aria-label={social.platform}
                        >
                          {social.icon}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Description & Action Buttons */}
                <div className="flex-grow">
                  <p className="text-foreground/80 mb-6">
                    {mockBusiness.description}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-secondary/30 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-foreground/70">Website</span>
                        <a 
                          href={mockBusiness.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center font-medium"
                        >
                          <span>Visit</span>
                          <ExternalLink size={14} className="ml-1" />
                        </a>
                      </div>
                    </div>
                    <div className="p-4 bg-secondary/30 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-foreground/70">Founded</span>
                        <span className="font-medium">{mockBusiness.founded}</span>
                      </div>
                    </div>
                    <div className="p-4 bg-secondary/30 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-foreground/70">Company Size</span>
                        <span className="font-medium">{mockBusiness.size}</span>
                      </div>
                    </div>
                    <div className="p-4 bg-secondary/30 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-foreground/70">Campaign Budget</span>
                        <span className="font-medium">${mockBusiness.budget.min} - ${mockBusiness.budget.max}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="flex-1 bg-primary text-white font-medium py-2.5 px-4 rounded-md hover:bg-primary/90 transition-colors">
                      Contact Business
                    </button>
                    <button className="flex-1 border border-border bg-white font-medium py-2.5 px-4 rounded-md hover:bg-secondary/50 transition-colors">
                      Apply to Campaigns
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Active Campaigns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex items-end justify-between mb-4">
              <h2 className="text-2xl font-bold">Active Campaigns</h2>
              <Link 
                to={`/business/${mockBusiness.id}/campaigns`} 
                className="text-primary text-sm font-medium"
              >
                View all campaigns
              </Link>
            </div>
            
            <div className="space-y-4">
              {mockBusiness.activeCampaigns.map((campaign) => (
                <div 
                  key={campaign.id}
                  className="bg-white rounded-xl shadow-card border border-border/30 p-6 hover:shadow-prominent transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-medium">{campaign.title}</h3>
                    <span 
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        campaign.status === 'Active' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-yellow-100 text-yellow-600'
                      }`}
                    >
                      {campaign.status}
                    </span>
                  </div>
                  
                  <p className="text-foreground/80 mb-4">
                    {campaign.description}
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
                    <div className="flex flex-col">
                      <span className="text-sm text-foreground/60 mb-1">Budget Range</span>
                      <span className="font-medium">${campaign.budget.min} - ${campaign.budget.max}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-foreground/60 mb-1">Influencers Needed</span>
                      <span className="font-medium">{campaign.influencers.needed}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-foreground/60 mb-1">Applications</span>
                      <span className="font-medium">{campaign.influencers.applied}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-foreground/60 mb-1">Deadline</span>
                      <span className="font-medium">{campaign.deadline}</span>
                    </div>
                  </div>
                  
                  <Link 
                    to={`/campaign/${campaign.id}`}
                    className="block w-full py-2.5 text-center text-primary font-medium border border-primary/30 rounded-md hover:bg-primary/5 transition-colors"
                  >
                    View Campaign Details
                  </Link>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Past Campaigns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold mb-4">Past Campaigns</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockBusiness.pastCampaigns.map((campaign) => (
                <div 
                  key={campaign.id}
                  className="bg-white rounded-xl shadow-card border border-border/30 overflow-hidden hover:shadow-prominent transition-all duration-300"
                >
                  <div className="aspect-[4/3] relative">
                    <img 
                      src={campaign.image} 
                      alt={campaign.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                      <h3 className="text-white font-medium p-4">{campaign.title}</h3>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex flex-col items-center">
                        <span className="text-foreground/60 text-sm mb-1">Influencers</span>
                        <span className="font-medium">{campaign.influencers}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-foreground/60 text-sm mb-1">Reach</span>
                        <span className="font-medium">{campaign.impressions}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-foreground/60 text-sm mb-1">Engagement</span>
                        <span className="font-medium">{campaign.engagement}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold mb-4">Influencer Testimonials</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockBusiness.testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="bg-white rounded-xl shadow-card border border-border/30 p-6"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-border flex-shrink-0">
                      <img 
                        src={testimonial.influencer.avatar} 
                        alt={testimonial.influencer.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{testimonial.influencer.name}</h3>
                      <p className="text-sm text-foreground/70">{testimonial.influencer.category}</p>
                      <div className="flex items-center mt-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={14} 
                            className="text-yellow-400 fill-yellow-400" 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <blockquote className="text-foreground/80 italic">
                    "{testimonial.text}"
                  </blockquote>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Contact & Collaboration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="bg-gradient-to-r from-primary/90 to-primary rounded-2xl overflow-hidden relative">
              <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>
              <div className="relative px-6 py-12 md:p-16 text-white">
                <div className="max-w-3xl mx-auto text-center">
                  <h2 className="text-3xl font-bold mb-4">
                    Interested in collaborating with {mockBusiness.name}?
                  </h2>
                  <p className="text-white/80 mb-8">
                    Apply to their active campaigns or contact them directly to discuss custom partnership opportunities.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link
                      to={`/business/${mockBusiness.id}/campaigns`}
                      className="bg-white text-primary font-medium py-3 px-6 rounded-md shadow-md hover:shadow-lg transition-all"
                    >
                      View All Campaigns
                    </Link>
                    <button
                      className="bg-white/10 backdrop-blur-sm text-white font-medium py-3 px-6 rounded-md hover:bg-white/20 transition-colors"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BusinessProfile;
