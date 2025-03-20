
import { indianInfluencers, indianBusinesses } from '@/data/indianInfluencers';

export interface MatchmakingResult {
  matchScore: number;
  reasoning: string[];
  suggestedCollaborations: string[];
}

// Function to match an influencer with a business using sophisticated algorithms
// (Note: This is a mock implementation until a real AI API is integrated)
export const matchInfluencerWithBusiness = async (
  influencer: typeof indianInfluencers[0],
  business: typeof indianBusinesses[0]
): Promise<MatchmakingResult> => {
  try {
    console.log('Matching influencer with business:', influencer.name, business.name);
    
    // Advanced matching algorithm with multiple criteria analysis
    // Category match
    const categoryWeight = 0.3;
    const categoryMatch = calculateSimilarity(influencer.category, business.category);
    const categoryScore = categoryMatch * categoryWeight;
    
    // Tags and interests match
    const tagsWeight = 0.25;
    const influencerTags = influencer.tags || [];
    const businessInterests = business.lookingFor || [];
    
    let tagsMatched = 0;
    const matchDetails: string[] = [];
    
    influencerTags.forEach(tag => {
      const matchedInterests = businessInterests.filter(interest => 
        calculateSimilarity(interest.toLowerCase(), tag.toLowerCase()) > 0.5
      );
      
      if (matchedInterests.length > 0) {
        tagsMatched++;
        matchDetails.push(`${tag} aligns with ${matchedInterests.join(', ')}`);
      }
    });
    
    const tagsScore = (tagsMatched / Math.max(influencerTags.length, 1)) * tagsWeight;
    
    // Location match
    const locationWeight = 0.15;
    const sameCity = influencer.city === business.city;
    const locationScore = sameCity ? locationWeight : 0;
    
    // Audience match (based on follower count and engagement)
    const audienceWeight = 0.2;
    const audienceReach = mapFollowerCountToScore(influencer.followers);
    const audienceEngagement = influencer.engagement / 5; // Assuming engagement is on a scale of 0-5
    const audienceScore = (audienceReach * 0.6 + audienceEngagement * 0.4) * audienceWeight;
    
    // Platform suitability
    const platformWeight = 0.1;
    const platformSuitability = determinePlatformSuitability(influencer.platform, business.category);
    const platformScore = platformSuitability * platformWeight;
    
    // Calculate final score
    const totalScore = (categoryScore + tagsScore + locationScore + audienceScore + platformScore) * 100;
    const finalScore = Math.min(98, Math.max(30, Math.round(totalScore)));
    
    // Generate reasoning based on the actual matches
    const reasoning: string[] = [];
    
    if (categoryMatch > 0.5) {
      reasoning.push(`${influencer.name}'s focus on ${influencer.category} aligns well with ${business.name}'s ${business.category} industry.`);
    }
    
    if (tagsMatched > 0) {
      reasoning.push(`Common interests include: ${matchDetails.slice(0, 2).join('; ')}${matchDetails.length > 2 ? ' and more' : ''}`);
    }
    
    if (sameCity) {
      reasoning.push(`Both are based in ${influencer.city}, enabling valuable local marketing opportunities.`);
    }
    
    if (audienceReach > 0.7) {
      reasoning.push(`${influencer.name}'s audience size (${formatNumber(influencer.followers)}) provides significant reach for ${business.name}'s products.`);
    }
    
    if (influencer.engagement > 4) {
      reasoning.push(`High engagement rate (${influencer.engagement}/5) suggests an active and responsive audience.`);
    }
    
    // Generate collaboration suggestions based on the analysis
    const collaborations = generateCollaborationIdeas(influencer, business);
    
    // Return the comprehensive matchmaking result
    return {
      matchScore: finalScore,
      reasoning: reasoning.length > 0 ? reasoning : ["The profiles have some potential for collaboration."],
      suggestedCollaborations: collaborations,
    };
  } catch (error) {
    console.error('Error in matchInfluencerWithBusiness:', error);
    throw new Error('Failed to generate matchmaking results. Please try again.');
  }
};

// Helper functions for the matching algorithm

// Calculate text similarity (simplified version)
function calculateSimilarity(text1: string, text2: string): number {
  const set1 = new Set(text1.toLowerCase().split(/\W+/).filter(Boolean));
  const set2 = new Set(text2.toLowerCase().split(/\W+/).filter(Boolean));
  
  const intersection = new Set([...set1].filter(x => set2.has(x)));
  const union = new Set([...set1, ...set2]);
  
  return intersection.size / union.size;
}

// Map follower count to a normalized score
function mapFollowerCountToScore(followers: number): number {
  // Normalize: 0 for 0 followers, 1 for 10M+ followers, logarithmic scale in between
  return Math.min(1, Math.log10(Math.max(1, followers)) / 7);
}

// Format numbers for display (e.g., 1500000 -> 1.5M)
function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

// Determine platform suitability for business category
function determinePlatformSuitability(platform: string, businessCategory: string): number {
  // Platform-category matching matrix (simplified)
  const matrix: Record<string, Record<string, number>> = {
    'Instagram': {
      'Fashion': 0.95,
      'Beauty': 0.9,
      'Luxury': 0.85,
      'Consumer Electronics': 0.75,
      'Natural Skincare': 0.8,
      'Services Marketplace': 0.7,
      'Traditional Clothing': 0.85,
      'default': 0.75
    },
    'YouTube': {
      'Tech': 0.95,
      'Consumer Electronics': 0.9,
      'Fitness': 0.8,
      'Services Marketplace': 0.65,
      'Beauty': 0.75,
      'default': 0.7
    },
    'TikTok': {
      'Fashion': 0.85,
      'Beauty': 0.8,
      'Traditional Clothing': 0.7,
      'Natural Skincare': 0.75,
      'Services Marketplace': 0.65,
      'default': 0.65
    },
    'default': {
      'default': 0.6
    }
  };
  
  // Find the best match in the matrix
  const platformEntry = matrix[platform] || matrix['default'];
  
  // Check for exact category match
  if (platformEntry[businessCategory]) {
    return platformEntry[businessCategory];
  }
  
  // Check for partial category match
  for (const category in platformEntry) {
    if (category !== 'default' && 
        (businessCategory.includes(category) || category.includes(businessCategory))) {
      return platformEntry[category];
    }
  }
  
  // Use default value
  return platformEntry['default'];
}

// Generate collaboration ideas based on influencer and business profiles
function generateCollaborationIdeas(
  influencer: typeof indianInfluencers[0], 
  business: typeof indianBusinesses[0]
): string[] {
  const ideas = [
    `${influencer.platform} content showcasing ${business.name}'s products/services`,
    `Brand ambassadorship program featuring ${influencer.name}`,
  ];
  
  // Add platform-specific ideas
  if (influencer.platform === 'Instagram') {
    ideas.push(`Instagram Stories takeover featuring day-in-the-life with ${business.name}'s products`);
    ideas.push(`Instagram Reels series highlighting ${business.name}'s unique selling points`);
  } else if (influencer.platform === 'YouTube') {
    ideas.push(`In-depth YouTube review of ${business.name}'s premium offerings`);
    ideas.push(`Behind-the-scenes YouTube video at ${business.name}'s headquarters or stores`);
  } else if (influencer.platform === 'TikTok') {
    ideas.push(`TikTok challenge branded with ${business.name}'s hashtag`);
    ideas.push(`Quick TikTok tutorials featuring ${business.name}'s products`);
  }
  
  // Add category-specific ideas
  if (influencer.category.includes('Fashion') || business.category.includes('Fashion') ||
      influencer.category.includes('Beauty') || business.category.includes('Beauty')) {
    ideas.push(`Limited edition ${influencer.name} x ${business.name} product collaboration`);
  } else if (influencer.category.includes('Tech') || business.category.includes('Electronics')) {
    ideas.push(`Product feature demonstration videos with in-depth technical analysis`);
  } else if (influencer.category.includes('Lifestyle')) {
    ideas.push(`Lifestyle integration campaign showing ${business.name}'s products in daily use`);
  }
  
  return ideas.slice(0, 4); // Return max 4 ideas
}
