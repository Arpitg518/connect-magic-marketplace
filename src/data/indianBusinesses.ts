export interface Business {
  id: number;
  name: string;
  category: string;
  description: string;
  location: string;
  logo: string;
  website: string;
  industry: string;
  targetAudience: string[];
  marketingGoals: string[];
  budget: {
    min: number;
    max: number;
    preferred: number;
  };
  previousCollaborations: {
    influencer: string;
    type: string;
    results: string;
  }[];
  requirements: {
    platform: string;
    contentType: string;
    duration: string;
  }[];
  preferences: {
    influencerSize: string;
    engagementRate: number;
    contentStyle: string[];
  };
  testimonials: {
    influencer: string;
    quote: string;
    rating: number;
  }[];
}

export const indianBusinesses: Business[] = [
  {
    id: 1,
    name: "EcoStyle",
    category: "Sustainable Fashion",
    description: "Leading sustainable fashion brand offering eco-friendly clothing and accessories.",
    location: "Mumbai",
    logo: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=200&h=200&fit=crop",
    website: "https://ecostyle.com",
    industry: "Fashion & Retail",
    targetAudience: ["Environmentally conscious", "Fashion enthusiasts", "Young professionals"],
    marketingGoals: ["Brand awareness", "Product launches", "Sustainability education"],
    budget: {
      min: 15000,
      max: 50000,
      preferred: 30000
    },
    previousCollaborations: [
      {
        influencer: "Priya Sharma",
        type: "Brand Ambassador",
        results: "Increased brand awareness by 40%"
      },
      {
        influencer: "Rahul Verma",
        type: "Product Review",
        results: "Boosted sales by 25%"
      }
    ],
    requirements: [
      {
        platform: "Instagram",
        contentType: "Sponsored Posts",
        duration: "3 months"
      },
      {
        platform: "YouTube",
        contentType: "Product Reviews",
        duration: "1 month"
      }
    ],
    preferences: {
      influencerSize: "100k-500k",
      engagementRate: 3.5,
      contentStyle: ["Educational", "Authentic", "Sustainable"]
    },
    testimonials: [
      {
        influencer: "Priya Sharma",
        quote: "Great brand to work with, very professional and aligned with my values.",
        rating: 5
      }
    ]
  },
  {
    id: 2,
    name: "TechPro",
    category: "Technology",
    description: "Innovative tech company specializing in smart home devices and gadgets.",
    location: "Bangalore",
    logo: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=200&h=200&fit=crop",
    website: "https://techpro.com",
    industry: "Technology",
    targetAudience: ["Tech enthusiasts", "Early adopters", "Young professionals"],
    marketingGoals: ["Product launches", "Brand awareness", "Tech education"],
    budget: {
      min: 25000,
      max: 75000,
      preferred: 50000
    },
    previousCollaborations: [
      {
        influencer: "Rahul Verma",
        type: "Product Review",
        results: "Generated 1M+ views"
      }
    ],
    requirements: [
      {
        platform: "YouTube",
        contentType: "Product Reviews",
        duration: "2 months"
      },
      {
        platform: "Instagram",
        contentType: "Sponsored Posts",
        duration: "1 month"
      }
    ],
    preferences: {
      influencerSize: "500k+",
      engagementRate: 3.8,
      contentStyle: ["Technical", "Educational", "Entertaining"]
    },
    testimonials: [
      {
        influencer: "Rahul Verma",
        quote: "Excellent products and great collaboration experience.",
        rating: 5
      }
    ]
  },
  {
    id: 3,
    name: "SpiceBox",
    category: "Food & Cooking",
    description: "Premium spice brand offering authentic Indian spices and blends.",
    location: "Delhi",
    logo: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200&h=200&fit=crop",
    website: "https://spicebox.com",
    industry: "Food & Beverage",
    targetAudience: ["Home cooks", "Food enthusiasts", "Indian cuisine lovers"],
    marketingGoals: ["Product awareness", "Recipe sharing", "Brand education"],
    budget: {
      min: 20000,
      max: 60000,
      preferred: 40000
    },
    previousCollaborations: [
      {
        influencer: "Anjali Patel",
        type: "Brand Ambassador",
        results: "Increased sales by 35%"
      }
    ],
    requirements: [
      {
        platform: "Instagram",
        contentType: "Recipe Posts",
        duration: "3 months"
      },
      {
        platform: "YouTube",
        contentType: "Cooking Videos",
        duration: "2 months"
      }
    ],
    preferences: {
      influencerSize: "250k+",
      engagementRate: 4.0,
      contentStyle: ["Authentic", "Educational", "Engaging"]
    },
    testimonials: [
      {
        influencer: "Anjali Patel",
        quote: "Amazing quality spices and great brand to work with.",
        rating: 5
      }
    ]
  }
]; 