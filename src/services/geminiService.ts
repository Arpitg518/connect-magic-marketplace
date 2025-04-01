import { Influencer } from '@/data/indianInfluencers';
import { Business } from '@/data/indianBusinesses';

export interface MatchmakingResult {
  matchScore: number;
  reasoning: string[];
  suggestedCollaborations: string[];
}

export const matchInfluencerWithBusiness = async (
  influencer: Influencer,
  business: Business
): Promise<MatchmakingResult> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Calculate match score based on various factors
  let matchScore = 0;
  const reasoning: string[] = [];
  const suggestedCollaborations: string[] = [];

    // Category match
  if (influencer.category.toLowerCase().includes(business.category.toLowerCase())) {
    matchScore += 30;
    reasoning.push("Perfect category alignment between influencer and business");
  } else if (
    influencer.tags.some(tag => 
      business.targetAudience.some(audience => 
        tag.toLowerCase().includes(audience.toLowerCase())
      )
    )
  ) {
    matchScore += 20;
    reasoning.push("Strong thematic alignment between influencer's content and business's target audience");
  }
    
    // Location match
  if (influencer.location === business.location) {
    matchScore += 10;
    reasoning.push("Same location enables better collaboration opportunities");
  }

  // Audience size match
  const influencerSize = influencer.followers;
  const [minSize, maxSize] = business.preferences.influencerSize
    .split('-')
    .map(size => parseInt(size.replace('k', '000')));
  
  if (influencerSize >= minSize && influencerSize <= maxSize) {
    matchScore += 15;
    reasoning.push("Influencer's audience size matches business requirements");
  }

  // Engagement rate match
  if (influencer.engagement >= business.preferences.engagementRate) {
    matchScore += 15;
    reasoning.push("High engagement rate meets business expectations");
  }

  // Content style match
  const styleMatch = influencer.contentTypes.some(type =>
    business.preferences.contentStyle.some(style =>
      type.toLowerCase().includes(style.toLowerCase())
    )
  );
  if (styleMatch) {
    matchScore += 15;
    reasoning.push("Content style aligns with business preferences");
  }

  // Budget compatibility
  const avgPostPrice = (influencer.pricing.sponsoredPost + influencer.pricing.reelPost) / 2;
  if (avgPostPrice >= business.budget.min && avgPostPrice <= business.budget.max) {
    matchScore += 15;
    reasoning.push("Pricing aligns with business budget expectations");
  }

  // Generate suggested collaborations
  if (matchScore >= 80) {
    suggestedCollaborations.push(
      "Long-term brand ambassador partnership",
      "Product launch campaign",
      "Exclusive content series"
    );
  } else if (matchScore >= 60) {
    suggestedCollaborations.push(
      "Sponsored content series",
      "Product review campaign",
      "Social media takeover"
    );
  } else {
    suggestedCollaborations.push(
      "One-time sponsored post",
      "Product showcase",
      "Brand mention campaign"
    );
  }

  return {
    matchScore,
    reasoning,
    suggestedCollaborations
  };
};
