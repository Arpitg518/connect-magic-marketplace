
import React from 'react';
import { motion } from 'framer-motion';
import { Building2, BarChart4, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for businesses
const businesses = [
  {
    id: 1,
    name: 'Lumina Cosmetics',
    logo: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
    industry: 'Beauty & Cosmetics',
    campaigns: 28,
    collaborations: 124,
    description: 'Eco-friendly beauty brand seeking authentic content creators to showcase our new skincare line.'
  },
  {
    id: 2,
    name: 'Vertex Athletics',
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
    industry: 'Sports & Fitness',
    campaigns: 43,
    collaborations: 215,
    description: 'Athletic apparel brand looking for fitness enthusiasts to promote our performance wear collection.'
  },
  {
    id: 3,
    name: 'Novo Tech',
    logo: 'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
    industry: 'Technology',
    campaigns: 17,
    collaborations: 89,
    description: 'Consumer tech company seeking tech reviewers and lifestyle creators for our latest smart home devices.'
  }
];

const BrandShowcase: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mb-6 md:mb-0"
          >
            <span className="bg-primary/10 text-primary text-sm font-medium py-1 px-3 rounded-full mb-4 inline-block">
              Partner Brands
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Collaborate with Leading Businesses
            </h2>
            <p className="text-foreground/70">
              Find exciting opportunities with established brands and growing businesses 
              looking for authentic influencers to elevate their marketing campaigns.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link 
              to="/businesses" 
              className="flex items-center text-primary font-medium group"
            >
              Explore all businesses
              <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Business Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {businesses.map((business, index) => (
            <motion.div
              key={business.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-card border border-border/30 transition-all duration-300 hover:shadow-prominent"
            >
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-md overflow-hidden border border-border flex-shrink-0">
                    <img 
                      src={business.logo} 
                      alt={business.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">{business.name}</h3>
                    <p className="text-sm text-foreground/70">{business.industry}</p>
                  </div>
                </div>
                
                <p className="text-foreground/80 mb-5">{business.description}</p>
                
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center">
                    <Building2 size={16} className="text-foreground/60 mr-2" />
                    <span className="text-sm text-foreground/80">{business.campaigns} Campaigns</span>
                  </div>
                  <div className="flex items-center">
                    <BarChart4 size={16} className="text-foreground/60 mr-2" />
                    <span className="text-sm text-foreground/80">{business.collaborations} Collabs</span>
                  </div>
                </div>
                
                <Link
                  to={`/business/${business.id}`}
                  className="inline-block w-full py-2.5 bg-secondary text-foreground/90 text-center rounded-md font-medium transition-colors hover:bg-primary hover:text-white"
                >
                  View Opportunities
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandShowcase;
