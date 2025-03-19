
import { indianInfluencers, indianBusinesses } from '@/data/indianInfluencers';

export interface MatchmakingResult {
  matchScore: number;
  reasoning: string[];
  suggestedCollaborations: string[];
}

// Function to match an influencer with a business using the Gemini API
export const matchInfluencerWithBusiness = async (
  influencer: typeof indianInfluencers[0],
  business: typeof indianBusinesses[0]
): Promise<MatchmakingResult> => {
  try {
    console.log('Matching influencer with business:', influencer.name, business.name);
    
    // For now, return mock data until the Gemini API integration is working
    // In a real implementation, we would call the Gemini API here
    
    // Calculate a mock match score based on tags and lookingFor fields
    const influencerTags = influencer.tags || [];
    const businessLookingFor = business.lookingFor || [];
    
    let matchCount = 0;
    influencerTags.forEach(tag => {
      if (businessLookingFor.some(interest => 
        interest.toLowerCase().includes(tag) || tag.includes(interest.toLowerCase())
      )) {
        matchCount++;
      }
    });
    
    // Calculate match percentage
    const maxPossibleMatches = Math.max(influencerTags.length, businessLookingFor.length);
    const matchPercentage = Math.round((matchCount / maxPossibleMatches) * 100);
    
    // Add some random variation to make it interesting
    const finalScore = Math.min(100, Math.max(30, matchPercentage + Math.floor(Math.random() * 30)));
    
    // Generate mock reasoning
    const reasoning = [
      `${influencer.name}'s focus on ${influencer.category} aligns with ${business.name}'s target market.`,
      `${influencer.name}'s audience demographic matches ${business.name}'s target customers.`,
      `Both are based in the same region, enabling local marketing opportunities.`,
    ];
    
    // Generate mock collaboration suggestions
    const collaborations = [
      `Sponsored content featuring ${business.name}'s products in ${influencer.name}'s typical style.`,
      `Instagram takeover of ${business.name}'s account by ${influencer.name} for a day.`,
      `Joint giveaway contest to increase engagement for both parties.`,
      `Product development collaboration for a limited edition item.`,
    ];
    
    return {
      matchScore: finalScore,
      reasoning: reasoning,
      suggestedCollaborations: collaborations,
    };
  } catch (error) {
    console.error('Error in matchInfluencerWithBusiness:', error);
    throw error;
  }
};
