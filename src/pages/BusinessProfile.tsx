import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Globe, Building2, Target, DollarSign, Users, Star, Clock, BarChart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { indianBusinesses } from '@/data/indianBusinesses';
import { indianInfluencers } from '@/data/indianInfluencers';
import { matchInfluencerWithBusiness } from '@/services/geminiService';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface MatchResult {
  influencer: typeof indianInfluencers[0];
  matchScore: number;
  reasoning: string[];
  suggestedCollaborations: string[];
}

const BusinessProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [business, setBusiness] = useState<typeof indianBusinesses[0] | null>(null);
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('overview');

  useEffect(() => {
    const foundBusiness = indianBusinesses.find(b => b.id === Number(id));
    if (foundBusiness) {
      setBusiness(foundBusiness);
      findMatches(foundBusiness);
    }
  }, [id]);

  const findMatches = async (business: typeof indianBusinesses[0]) => {
    setLoading(true);
    try {
      const matchResults = await Promise.all(
        indianInfluencers.map(async (influencer) => {
          const result = await matchInfluencerWithBusiness(influencer, business);
          return {
            influencer,
            ...result
          };
        })
      );
      
      // Sort matches by score and take top 5
      const topMatches = matchResults
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 5);
      
      setMatches(topMatches);
    } catch (error) {
      console.error('Error finding matches:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!business) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <p>Business not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          {/* Business Header */}
          <div className="flex items-start gap-6 mb-8">
            <img
              src={business.logo}
              alt={business.name}
              className="w-32 h-32 rounded-lg object-cover"
            />
            <div>
              <h1 className="text-3xl font-bold mb-2">{business.name}</h1>
              <div className="flex items-center gap-4 text-gray-400">
                <div className="flex items-center">
                  <MapPin size={16} className="mr-1" />
                  <span>{business.location}</span>
                </div>
                <div className="flex items-center">
                  <Globe size={16} className="mr-1" />
                  <a href={business.website} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                    Website
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
              <TabsTrigger value="matches">AI Matches</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">About {business.name}</h2>
                  <p className="text-gray-300 mb-6">{business.description}</p>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Industry</h3>
                      <p className="text-gray-400">{business.industry}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-3">Target Audience</h3>
                      <div className="flex flex-wrap gap-2">
                        {business.targetAudience.map((audience, index) => (
                          <Badge key={index} variant="outline" className="border-zinc-700">
                            {audience}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Previous Collaborations</h2>
                  <div className="space-y-4">
                    {business.previousCollaborations.map((collab, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                          <Users size={24} className="text-gray-400" />
                        </div>
                        <div>
                          <h3 className="font-medium">{collab.influencer}</h3>
                          <p className="text-sm text-gray-400">{collab.type}</p>
                          <p className="text-sm text-gray-300 mt-1">{collab.results}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Requirements Tab */}
            <TabsContent value="requirements" className="space-y-6">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Campaign Requirements</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3 flex items-center">
                        <Target className="mr-2" size={20} />
                        Marketing Goals
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {business.marketingGoals.map((goal, index) => (
                          <Badge key={index} variant="outline" className="border-zinc-700">
                            {goal}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-3 flex items-center">
                        <DollarSign className="mr-2" size={20} />
                        Budget Range
                      </h3>
                      <p className="text-gray-300">
                        ₹{business.budget.min.toLocaleString()} - ₹{business.budget.max.toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-3 flex items-center">
                        <Users className="mr-2" size={20} />
                        Influencer Requirements
                      </h3>
                      <div className="space-y-2">
                        <p className="text-gray-300">Size: {business.preferences.influencerSize}</p>
                        <p className="text-gray-300">Engagement Rate: {business.preferences.engagementRate}%</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {business.preferences.contentStyle.map((style, index) => (
                            <Badge key={index} variant="outline" className="border-zinc-700">
                              {style}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* AI Matches Tab */}
            <TabsContent value="matches" className="space-y-6">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">AI-Powered Matches</h2>
                  {loading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {matches.map((match, index) => (
                        <div key={index} className="border-b border-zinc-800 pb-6 last:border-0">
                          <div className="flex items-start gap-4">
                            <img
                              src={match.influencer.profileImage}
                              alt={match.influencer.name}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium">{match.influencer.name}</h3>
                                <Badge className="bg-green-500/20 text-green-400">
                                  {match.matchScore}% Match
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-400 mb-2">{match.influencer.category}</p>
                              
                              <div className="space-y-2">
                                <h4 className="text-sm font-medium text-gray-300">Match Reasoning:</h4>
                                <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                                  {match.reasoning.map((reason, idx) => (
                                    <li key={idx}>{reason}</li>
                                  ))}
                                </ul>
                              </div>

                              <div className="mt-4">
                                <h4 className="text-sm font-medium text-gray-300 mb-2">Suggested Collaborations:</h4>
                                <div className="flex flex-wrap gap-2">
                                  {match.suggestedCollaborations.map((collab, idx) => (
                                    <Badge key={idx} variant="outline" className="border-zinc-700">
                                      {collab}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              <Button className="mt-4" variant="outline">
                                Contact Influencer
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default BusinessProfile; 