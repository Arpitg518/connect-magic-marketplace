
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

// Mock data for testimonials
const testimonials = [
  {
    id: 1,
    name: 'Emma Rodriguez',
    role: 'Beauty Influencer',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
    quote: 'ConnectMagic revolutionized my brand collaborations. The AI matching introduced me to brands that perfectly align with my content and values, resulting in more authentic partnerships and higher engagement.',
    rating: 5
  },
  {
    id: 2,
    name: 'Michael Thompson',
    role: 'Marketing Director, Eco Essentials',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
    quote: "As a sustainable lifestyle brand, finding influencers who genuinely care about our mission was crucial. ConnectMagic's verification system ensured we only connected with authentic voices who resonated with our audience.",
    rating: 5
  },
  {
    id: 3,
    name: 'Aisha Johnson',
    role: 'Fitness & Wellness Creator',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
    quote: 'The platform eliminated the exhausting back-and-forth of traditional collaboration negotiations. Everything from contracts to payments is streamlined, letting me focus on creating quality content rather than administrative tasks.',
    rating: 4
  },
  {
    id: 4,
    name: 'Daniel Park',
    role: 'CEO, TechNow',
    avatar: 'https://images.unsplash.com/photo-1618077360395-f3068be8e001?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
    quote: "The ROI we've seen from campaigns managed through ConnectMagic far exceeds our previous influencer marketing efforts. The analytics dashboard gives us real-time insights that help us optimize our strategy continuously.",
    rating: 5
  },
];

const TestimonialSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl opacity-60" />
      </div>
      
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="bg-primary/10 text-primary text-sm font-medium py-1 px-3 rounded-full mb-4 inline-block">
            Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Community Says
          </h2>
          <p className="text-foreground/70">
            Hear from influencers and businesses who have found success through meaningful 
            partnerships on our platform.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto relative">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-card border border-border/30 p-8 md:p-10"
          >
            <div className="flex justify-center mb-8">
              <Quote size={40} className="text-primary/20" />
            </div>
            
            <blockquote className="text-center mb-8">
              <p className="text-lg md:text-xl text-foreground/90 italic mb-6">
                "{testimonials[activeIndex].quote}"
              </p>
              
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={18} 
                    className={i < testimonials[activeIndex].rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
                  />
                ))}
              </div>
            </blockquote>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20 mb-3">
                <img 
                  src={testimonials[activeIndex].avatar} 
                  alt={testimonials[activeIndex].name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-medium text-lg">{testimonials[activeIndex].name}</h4>
              <p className="text-foreground/70 text-sm">{testimonials[activeIndex].role}</p>
            </div>
          </motion.div>

          {/* Navigation Controls */}
          <div className="flex justify-center mt-8 space-x-4">
            <button 
              onClick={prevTestimonial}
              className="w-10 h-10 rounded-full bg-white shadow-elevation border border-border/50 flex items-center justify-center text-foreground/70 hover:text-primary transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex items-center space-x-2">
              {testimonials.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === activeIndex 
                      ? 'bg-primary w-6' 
                      : 'bg-foreground/20 hover:bg-foreground/40'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={nextTestimonial}
              className="w-10 h-10 rounded-full bg-white shadow-elevation border border-border/50 flex items-center justify-center text-foreground/70 hover:text-primary transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
