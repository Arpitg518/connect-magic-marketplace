
// Gemini AI service for matchmaking and content analysis

// The API key for Gemini
const GEMINI_API_KEY = "AIzaSyBl-QzvtmyVApzqVCWDDvVwjeOnAwdctBY";

// Base URL for Gemini API
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models";
const MODEL = "gemini-pro";

export interface MatchmakingResult {
  matchScore: number;
  reasoning: string[];
  suggestedCollaborations: string[];
}

// Interface for profile data
interface ProfileData {
  name: string;
  category?: string;
  tags?: string[];
  bio?: string;
  engagement?: number;
  followers?: string;
  city?: string;
  // For businesses
  lookingFor?: string[];
  description?: string;
  budget?: string;
}

/**
 * Match an influencer with a business using Gemini AI
 */
export const matchInfluencerWithBusiness = async (
  influencer: ProfileData, 
  business: ProfileData
): Promise<MatchmakingResult> => {
  try {
    const prompt = `
    I need to analyze the compatibility between an influencer and a business for a potential collaboration.

    Influencer details:
    - Name: ${influencer.name}
    - Category: ${influencer.category || 'Not specified'}
    - Tags/Interests: ${influencer.tags?.join(', ') || 'Not specified'}
    - Bio: ${influencer.bio || 'Not specified'}
    - Engagement rate: ${influencer.engagement ? `${influencer.engagement}%` : 'Not specified'}
    - Followers: ${influencer.followers || 'Not specified'}
    - Location: ${influencer.city || 'Not specified'}

    Business details:
    - Name: ${business.name}
    - Description: ${business.description || 'Not specified'}
    - Looking for influencers in: ${business.lookingFor?.join(', ') || 'Not specified'}
    - Budget range: ${business.budget || 'Not specified'}
    - Location: ${business.city || 'Not specified'}

    Based on this information:
    1. Calculate a match percentage score from 0-100
    2. Provide 3-5 specific reasons for this match score
    3. Suggest 2-3 potential collaboration ideas or content formats
    
    Format your response as JSON with the following structure:
    {
      "matchScore": number,
      "reasoning": string[],
      "suggestedCollaborations": string[]
    }
    `;

    const response = await fetch(`${GEMINI_API_URL}/${MODEL}:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.4,
          topK: 32,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('Gemini API error:', data);
      // Return fallback data if API fails
      return {
        matchScore: 70,
        reasoning: ["Based on category alignment", "Similar target audience", "Compatible content style"],
        suggestedCollaborations: ["Product review", "Sponsored content", "Brand ambassador"]
      };
    }

    // Extract the JSON from the response text
    const generatedText = data.candidates[0].content.parts[0].text;
    const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    } else {
      throw new Error('Could not parse JSON response from Gemini');
    }
  } catch (error) {
    console.error('Error in Gemini matchmaking:', error);
    // Return fallback data if processing fails
    return {
      matchScore: 65,
      reasoning: ["Category alignment", "Audience demographics", "Content style"],
      suggestedCollaborations: ["Sponsored post", "Product placement", "Event collaboration"]
    };
  }
};

/**
 * Analyze content for authenticity and quality
 */
export const analyzeContent = async (contentUrl: string, contentType: string): Promise<any> => {
  try {
    const prompt = `
    I need to analyze this ${contentType} content (from URL: ${contentUrl}) for:
    1. Authenticity of engagement
    2. Quality of production
    3. Brand safety
    4. Audience alignment
    
    Provide an analysis and score from 0-100 for each category.
    Format your response as JSON.
    `;

    // Implement the actual API call to Gemini
    // For now, return mock data
    return {
      authenticity: 85,
      quality: 78,
      brandSafety: 92,
      audienceAlignment: 80,
      analysis: "This content appears to have authentic engagement with good production quality. It's brand-safe and aligns well with the target audience."
    };
  } catch (error) {
    console.error('Error in content analysis:', error);
    // Return fallback data
    return {
      authenticity: 75,
      quality: 70,
      brandSafety: 85,
      audienceAlignment: 70,
      analysis: "Content analysis could not be completed. Please review manually."
    };
  }
};

/**
 * Generate content ideas for a collaboration
 */
export const generateContentIdeas = async (
  influencer: ProfileData,
  business: ProfileData,
  campaignGoals: string[]
): Promise<string[]> => {
  // Simplified mock implementation
  return [
    "Instagram carousel showcasing product benefits with lifestyle integration",
    "Day-in-the-life vlog featuring product usage in authentic scenarios",
    "Behind-the-scenes collaboration story highlighting the brand's mission"
  ];
};
