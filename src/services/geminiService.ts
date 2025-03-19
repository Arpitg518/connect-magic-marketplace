
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
    let matchDetails: string[] = [];
    
    influencerTags.forEach(tag => {
      const matchedInterests = businessLookingFor.filter(interest => 
        interest.toLowerCase().includes(tag.toLowerCase()) || 
        tag.toLowerCase().includes(interest.toLowerCase())
      );
      
      if (matchedInterests.length > 0) {
        matchCount++;
        matchDetails.push(`${tag} matches with ${matchedInterests.join(', ')}`);
      }
    });
    
    // Check if they're in the same city for local partnership bonus
    const sameCity = influencer.city === business.city;
    if (sameCity) {
      matchCount += 0.5;
      matchDetails.push(`Both are based in ${influencer.city}`);
    }
    
    // Check if influencer category aligns with business category
    const categoryMatch = business.category.toLowerCase().includes(influencer.category.toLowerCase()) ||
                         influencer.category.toLowerCase().includes(business.category.toLowerCase());
    if (categoryMatch) {
      matchCount += 1;
      matchDetails.push(`Influencer category (${influencer.category}) aligns with business category (${business.category})`);
    }
    
    // Calculate match percentage
    const maxPossibleMatches = Math.max(influencerTags.length, businessLookingFor.length) + 1.5; // +1.5 for city and category
    const matchPercentage = Math.round((matchCount / maxPossibleMatches) * 100);
    
    // Add some random variation to make it interesting, but ensure it stays reasonable
    const finalScore = Math.min(98, Math.max(30, matchPercentage + Math.floor(Math.random() * 20)));
    
    // Generate reasoning based on the actual matches
    const reasoning = [
      `${influencer.name}'s focus on ${influencer.category} aligns with ${business.name}'s target market.`,
      `${influencer.name}'s audience demographic matches ${business.name}'s target customers.`,
    ];
    
    if (sameCity) {
      reasoning.push(`Both are based in ${influencer.city}, enabling local marketing opportunities.`);
    }
    
    if (matchDetails.length > 0) {
      reasoning.push(`Common interests include: ${influencerTags.filter(tag => 
        businessLookingFor.some(interest => 
          interest.toLowerCase().includes(tag.toLowerCase()) || 
          tag.toLowerCase().includes(interest.toLowerCase())
        )
      ).join(', ')}`);
    }
    
    // Generate collaboration suggestions based on the influencer's platform
    const collaborations = [
      `Sponsored content featuring ${business.name}'s products in ${influencer.name}'s typical style.`,
      `${influencer.platform} takeover of ${business.name}'s account by ${influencer.name} for a day.`,
      `Joint giveaway contest to increase engagement for both parties.`,
    ];
    
    // Add more specific collaboration ideas based on the influencer's category
    if (influencer.category.includes('Fashion') || influencer.category.includes('Beauty')) {
      collaborations.push(`Product review series highlighting ${business.name}'s newest offerings.`);
    } else if (influencer.category.includes('Tech')) {
      collaborations.push(`Detailed product demonstration and review video for ${business.name}'s products.`);
    } else if (influencer.category.includes('Fitness')) {
      collaborations.push(`Fitness challenge sponsored by ${business.name} with branded merchandise.`);
    } else if (influencer.category.includes('Travel')) {
      collaborations.push(`Location-based content feature at ${business.name}'s stores or venues.`);
    }
    
    return {
      matchScore: finalScore,
      reasoning: reasoning,
      suggestedCollaborations: collaborations,
    };
  } catch (error) {
    console.error('Error in matchInfluencerWithBusiness:', error);
    throw new Error('Failed to generate matchmaking results. Please try again.');
  }
};
