
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, X, ArrowRight, Check, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { matchInfluencerWithBusiness, MatchmakingResult } from '@/services/geminiService';
import { indianInfluencers, indianBusinesses } from '@/data/indianInfluencers';

interface MatchProps {
  influencerId?: number;
  businessId?: number;
}

const AIMatchmaking: React.FC<MatchProps> = ({ influencerId, businessId }) => {
  const [selectedInfluencer, setSelectedInfluencer] = useState<number | undefined>(influencerId);
  const [selectedBusiness, setSelectedBusiness] = useState<number | undefined>(businessId);
  const [matchResult, setMatchResult] = useState<MatchmakingResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleMatchmaking = async () => {
    if (!selectedInfluencer || !selectedBusiness) {
      return;
    }

    setIsLoading(true);
    
    try {
      const influencer = indianInfluencers.find(inf => inf.id === selectedInfluencer);
      const business = indianBusinesses.find(bus => bus.id === selectedBusiness);
      
      if (!influencer || !business) {
        throw new Error('Influencer or business not found');
      }
      
      const result = await matchInfluencerWithBusiness(influencer, business);
      setMatchResult(result);
      setShowResults(true);
    } catch (error) {
      console.error('Matchmaking error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles size={20} className="text-primary" />
        <h3 className="text-xl font-semibold">AI-Powered Matchmaking</h3>
      </div>
      
      {!showResults ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Find Your Perfect Match</CardTitle>
            <CardDescription>
              Our AI analyzes compatibility between influencers and businesses to create meaningful partnerships
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Select an Influencer</label>
                <select 
                  value={selectedInfluencer || ''}
                  onChange={(e) => setSelectedInfluencer(Number(e.target.value))}
                  className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="">-- Select Influencer --</option>
                  {indianInfluencers.map(inf => (
                    <option key={inf.id} value={inf.id}>
                      {inf.name} - {inf.category}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Select a Business</label>
                <select 
                  value={selectedBusiness || ''}
                  onChange={(e) => setSelectedBusiness(Number(e.target.value))}
                  className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="">-- Select Business --</option>
                  {indianBusinesses.map(bus => (
                    <option key={bus.id} value={bus.id}>
                      {bus.name} - {bus.category}
                    </option>
                  ))}
                </select>
              </div>
              
              <Button 
                onClick={handleMatchmaking}
                disabled={!selectedInfluencer || !selectedBusiness || isLoading}
                className="w-full"
              >
                {isLoading ? 'Analyzing...' : 'Generate Match Analysis'}
                {!isLoading && <Sparkles size={16} className="ml-2" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="overflow-hidden border-0 shadow-lg">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-white font-semibold">Match Analysis</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowResults(false)}
                  className="text-white hover:bg-white/20"
                >
                  <X size={16} />
                </Button>
              </div>
            </div>
            
            <CardContent className="p-6">
              {matchResult && (
                <>
                  <div className="flex flex-col items-center mb-6">
                    <div className="relative w-32 h-32 mb-4">
                      <div 
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-200 to-indigo-200"
                        style={{ 
                          background: `conic-gradient(from 0deg, #9b87f5 ${matchResult.matchScore}%, #e5e7eb ${matchResult.matchScore}%)` 
                        }}
                      ></div>
                      <div className="absolute inset-[6px] bg-white rounded-full flex items-center justify-center">
                        <span className="text-3xl font-bold">{matchResult.matchScore}%</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">
                        {matchResult.matchScore >= 80 ? 'Excellent Match!' : 
                         matchResult.matchScore >= 60 ? 'Good Match' : 'Potential Match'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-foreground/70 mb-2">Match Reasoning:</h4>
                    <ul className="space-y-2">
                      {matchResult.reasoning.map((reason, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-foreground/70 mb-2">Suggested Collaborations:</h4>
                    <ul className="space-y-2">
                      {matchResult.suggestedCollaborations.map((collab, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm bg-secondary/50 p-2 rounded-md">
                          <span className="w-5 h-5 bg-primary/10 text-primary rounded-full flex items-center justify-center flex-shrink-0">
                            {index + 1}
                          </span>
                          <span>{collab}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button className="w-full mt-6">
                    Start Collaboration
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </>
              )}
              
              {!matchResult && (
                <div className="flex flex-col items-center py-8">
                  <AlertCircle size={40} className="text-yellow-500 mb-4" />
                  <p className="text-foreground/70">Unable to generate match analysis. Please try again.</p>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowResults(false)}
                    className="mt-4"
                  >
                    Go Back
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default AIMatchmaking;
