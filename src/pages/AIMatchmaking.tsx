import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Sparkles, Users, Building2, Target, DollarSign, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { indianBusinesses } from '@/data/indianBusinesses';
import { indianInfluencers } from '@/data/indianInfluencers';
import { matchInfluencerWithBusiness } from '@/services/geminiService';
import PageTransition from '@/components/layout/PageTransition';

interface MatchResult {
  business: typeof indianBusinesses[0];
  influencer: typeof indianInfluencers[0];
  matchScore: number;
  reasoning: string[];
  suggestedCollaborations: string[];
}

const AIMatchmaking: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const categories = Array.from(new Set(indianBusinesses.map(b => b.category)));
  const locations = Array.from(new Set(indianBusinesses.map(b => b.location)));

  const findMatches = async () => {
    setLoading(true);
    try {
      const matchResults = await Promise.all(
        indianBusinesses.map(async (business) => {
          const influencerMatches = await Promise.all(
            indianInfluencers.map(async (influencer) => {
              const result = await matchInfluencerWithBusiness(influencer, business);
              return {
                business,
                influencer,
                ...result
              };
            })
          );
          return influencerMatches;
        })
      );

      // Flatten and sort all matches
      const allMatches = matchResults.flat().sort((a, b) => b.matchScore - a.matchScore);
      setMatches(allMatches.slice(0, 10)); // Show top 10 matches
    } catch (error) {
      console.error('Error finding matches:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMatches = matches.filter(match => {
    const matchesSearch = 
      match.business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.influencer.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || match.business.category === selectedCategory;
    const matchesLocation = !selectedLocation || match.business.location === selectedLocation;
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 flex items-center justify-center">
              <Sparkles className="mr-2 text-yellow-400" size={40} />
              AI-Powered Matchmaking
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Discover the perfect influencer-business matches using CollabX's advanced AI algorithms.
              Our system analyzes multiple factors to find the most compatible partnerships.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  placeholder="Search businesses or influencers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-zinc-900 border-zinc-800"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-zinc-900 border-zinc-800">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="bg-zinc-900 border-zinc-800">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Locations</SelectItem>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Find Matches Button */}
          <div className="flex justify-center mb-8">
            <Button
              onClick={findMatches}
              disabled={loading}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Finding Matches...
                </div>
              ) : (
                <div className="flex items-center">
                  <Sparkles className="mr-2" size={20} />
                  Find Matches
                </div>
              )}
            </Button>
          </div>

          {/* Matches Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredMatches.map((match, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{match.business.name}</h3>
                        <p className="text-gray-400 text-sm">{match.business.category}</p>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400">
                        {match.matchScore}% Match
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center text-sm text-gray-400">
                        <Building2 size={16} className="mr-1" />
                        <span>{match.business.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <Target size={16} className="mr-1" />
                        <span>{match.business.industry}</span>
                      </div>
                    </div>

                    {/* Influencer Information */}
                    <div className="border-t border-zinc-800 pt-4 mb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <img 
                          src={match.influencer.profileImage} 
                          alt={match.influencer.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-medium">{match.influencer.name}</h4>
                          <p className="text-sm text-gray-400">{match.influencer.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center">
                          <Users size={16} className="mr-1" />
                          <span>{match.influencer.followers.toLocaleString()} followers</span>
                        </div>
                        <div className="flex items-center">
                          <Star size={16} className="mr-1" />
                          <span>{match.influencer.engagement}% engagement</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-zinc-800 pt-4 mb-4">
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Match Reasoning:</h4>
                      <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                        {match.reasoning.slice(0, 3).map((reason, idx) => (
                          <li key={idx}>{reason}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-t border-zinc-800 pt-4">
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Suggested Collaborations:</h4>
                      <div className="flex flex-wrap gap-2">
                        {match.suggestedCollaborations.slice(0, 2).map((collab, idx) => (
                          <Badge key={idx} variant="outline" className="border-zinc-700">
                            {collab}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" className="flex-1">
                        View Details
                      </Button>
                      <Button className="flex-1">
                        Start Collaborating
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default AIMatchmaking; 