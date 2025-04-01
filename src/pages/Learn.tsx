import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import PageTransition from '@/components/layout/PageTransition';

const Learn: React.FC = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-zinc-900 text-gray-200 py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Learn About Influencers & Business Owners Collaboration
            </h1>

            {/* Introduction */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-white mb-4">Introduction</h2>
              <p className="text-gray-300 leading-relaxed">
                In today's digital era, influencer marketing has revolutionized how businesses reach their audience. 
                Our platform connects vloggers (influencers) with business owners, enabling high-quality content 
                creation for enterprises, restaurants, and food stores. This AI-powered system ensures businesses 
                get the best-matched influencers while providing vloggers with valuable opportunities.
              </p>
            </section>

            {/* How It Works */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-white mb-6">How It Works</h2>
              <div className="space-y-4">
                <Card className="bg-zinc-800 border-zinc-700">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">1. Business Owners Post Requirements</h3>
                    <p className="text-gray-300">
                      Restaurants, cafes, and enterprises outline the type of video content they need, such as 
                      promotional clips, customer testimonials, or behind-the-scenes footage.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-zinc-800 border-zinc-700">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">2. AI-Powered Influencer Selection</h3>
                    <p className="text-gray-300">
                      Our advanced AI system matches businesses with the most suitable vloggers based on content 
                      style, audience reach, and engagement metrics.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-zinc-800 border-zinc-700">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">3. Vloggers Record & Submit Content</h3>
                    <p className="text-gray-300">
                      Influencers create and submit engaging videos that align with business goals.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-zinc-800 border-zinc-700">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">4. AI-Enhanced Video Optimization</h3>
                    <p className="text-gray-300">
                      Our system improves video quality with AI-driven enhancements, ensuring high visual appeal.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-zinc-800 border-zinc-700">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">5. Approval & Payment Processing</h3>
                    <p className="text-gray-300">
                      Business owners review the content, request revisions if necessary, and finalize payment 
                      securely through our platform.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Key Benefits */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-white mb-6">Key Benefits</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-zinc-800 border-zinc-700">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">For Business Owners:</h3>
                    <ul className="space-y-3 text-gray-300">
                      <li>• Targeted Audience Reach – Gain access to vloggers with the perfect audience for your brand.</li>
                      <li>• High-Quality Video Content – Get professionally shot and AI-enhanced videos without hiring expensive production teams.</li>
                      <li>• AI-Driven Matching – Find influencers best suited for your brand's identity and objectives.</li>
                      <li>• Cost-Effective Marketing – Pay only for approved content, reducing unnecessary expenses.</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-zinc-800 border-zinc-700">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">For Influencers:</h3>
                    <ul className="space-y-3 text-gray-300">
                      <li>• New Earning Opportunities – Monetize your video skills while working with businesses that align with your niche.</li>
                      <li>• AI Video Enhancement – Leverage AI tools to refine and polish your content.</li>
                      <li>• Build Brand Partnerships – Establish long-term collaborations with food brands, restaurants, and enterprises.</li>
                      <li>• Seamless Payment System – Receive secure payments for your work with transparent pricing.</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Industry Insights */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-white mb-6">Industry Insights</h2>
              <Card className="bg-zinc-800 border-zinc-700">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Why Influencer Marketing Works for Businesses</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li>• 89% of businesses find ROI from influencer marketing comparable or better than other marketing channels.</li>
                    <li>• Consumers trust influencers more than traditional ads, increasing engagement and conversions.</li>
                    <li>• Video content generates 1200% more shares than text and images combined, making it a powerful tool for brand awareness.</li>
                  </ul>
                </CardContent>
              </Card>
            </section>

            {/* Getting Started */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-white mb-6">Getting Started</h2>
              <Card className="bg-zinc-800 border-zinc-700">
                <CardContent className="p-6">
                  <ul className="space-y-3 text-gray-300">
                    <li>• For Business Owners: Sign up, post your content requirements, and let AI find your perfect influencer.</li>
                    <li>• For Influencers: Create a profile, showcase your work, and start receiving content requests.</li>
                  </ul>
                </CardContent>
              </Card>
            </section>

            {/* CTA */}
            <section className="text-center">
              <h2 className="text-2xl font-semibold text-white mb-4">Join Us Today!</h2>
              <p className="text-gray-300 mb-8">
                Ready to revolutionize your content strategy? Sign up now and connect with top influencers or 
                business owners to create engaging, high-quality video content.
              </p>
              <Link to="/join">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold">
                  Get Started Now
                </Button>
              </Link>
            </section>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Learn; 