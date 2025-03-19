
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/30 border-t border-border/50 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-1">
            <Link to="/" className="text-xl font-semibold inline-flex mb-4">
              <span className="text-primary font-bold">Connect</span>
              <span className="font-light">Magic</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-xs">
              The premium marketplace connecting influencers with businesses for authentic promotional partnerships.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h5 className="font-medium text-base mb-4">For Influencers</h5>
            <ul className="space-y-3">
              <li>
                <Link to="/how-it-works/influencers" className="text-foreground/70 hover:text-primary transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/influencer-resources" className="text-foreground/70 hover:text-primary transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/success-stories/influencers" className="text-foreground/70 hover:text-primary transition-colors">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link to="/pricing/influencers" className="text-foreground/70 hover:text-primary transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/auth/register?type=influencer" className="text-foreground/70 hover:text-primary transition-colors">
                  Join as Influencer
                </Link>
              </li>
            </ul>
          </div>

          {/* Business Links */}
          <div className="col-span-1">
            <h5 className="font-medium text-base mb-4">For Businesses</h5>
            <ul className="space-y-3">
              <li>
                <Link to="/how-it-works/businesses" className="text-foreground/70 hover:text-primary transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/business-resources" className="text-foreground/70 hover:text-primary transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/success-stories/businesses" className="text-foreground/70 hover:text-primary transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link to="/pricing/businesses" className="text-foreground/70 hover:text-primary transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/auth/register?type=business" className="text-foreground/70 hover:text-primary transition-colors">
                  Join as Business
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="col-span-1">
            <h5 className="font-medium text-base mb-4">Company</h5>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-foreground/70 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-foreground/70 hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-foreground/70 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-foreground/70 hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-foreground/70 hover:text-primary transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-border/30">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              © {currentYear} ConnectMagic. All rights reserved.
            </p>
            <div className="flex flex-col md:flex-row md:space-x-6 space-y-2 md:space-y-0 text-sm text-muted-foreground">
              <Link to="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="hover:text-primary transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
