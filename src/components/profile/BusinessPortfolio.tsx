import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Globe, Mail, Phone, MapPin, Building2, Edit2, Save, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

interface BusinessPortfolioProps {
  initialData?: {
    name: string;
    description: string;
    logo: string;
    industry: string;
    location: string;
    contact: {
      email: string;
      phone: string;
      website: string;
    };
    stats: {
      employees: number;
      projects: number;
      clients: number;
    };
    services: string[];
  };
}

const BusinessPortfolio: React.FC<BusinessPortfolioProps> = ({ initialData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState(initialData || {
    name: '',
    description: '',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=default',
    industry: '',
    location: '',
    contact: {
      email: '',
      phone: '',
      website: ''
    },
    stats: {
      employees: 0,
      projects: 0,
      clients: 0
    },
    services: []
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save the data to your backend
    console.log('Saving profile:', data);
  };

  const handleAddService = () => {
    const newService = prompt('Enter new service:');
    if (newService) {
      setData(prev => ({
        ...prev,
        services: [...prev.services, newService]
      }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-zinc-900 rounded-xl shadow-lg overflow-hidden">
        {/* Cover Photo */}
        <div className="h-48 bg-gradient-to-r from-primary to-primary/70 relative">
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-zinc-900 to-transparent" />
          <div className="absolute bottom-4 left-4 flex items-end gap-4">
            <div className="relative">
              <img
                src={data.logo}
                alt={data.name}
                className="w-32 h-32 rounded-full border-4 border-zinc-900 bg-white"
              />
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-primary p-2 rounded-full">
                  <Camera size={16} />
                </button>
              )}
            </div>
            <div className="text-white mb-4">
              {isEditing ? (
                <Input
                  value={data.name}
                  onChange={(e) => setData(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              ) : (
                <h1 className="text-2xl font-bold">{data.name}</h1>
              )}
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary">{data.industry}</Badge>
                <div className="flex items-center gap-1 text-sm">
                  <MapPin size={14} />
                  <span>{data.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{data.stats.employees}</div>
                <div className="text-sm text-gray-400">Employees</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{data.stats.projects}</div>
                <div className="text-sm text-gray-400">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{data.stats.clients}</div>
                <div className="text-sm text-gray-400">Clients</div>
              </div>
            </div>
            <Button
              variant={isEditing ? "default" : "outline"}
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            >
              {isEditing ? (
                <>
                  <Save size={16} className="mr-2" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit2 size={16} className="mr-2" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">About Us</h2>
            {isEditing ? (
              <Textarea
                value={data.description}
                onChange={(e) => setData(prev => ({ ...prev, description: e.target.value }))}
                className="bg-zinc-800 border-zinc-700 text-white"
                rows={4}
              />
            ) : (
              <p className="text-gray-300">{data.description || 'No description yet. Click edit to add one.'}</p>
            )}
          </div>

          {/* Services */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Our Services</h2>
            <div className="flex flex-wrap gap-2">
              {data.services.map((service, index) => (
                <Badge key={index} variant="secondary">
                  {service}
                </Badge>
              ))}
              {isEditing && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddService}
                  className="h-6 px-2"
                >
                  <Plus size={14} />
                </Button>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
            <div className="grid grid-cols-2 gap-4">
              {isEditing ? (
                <>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Email</label>
                    <Input
                      value={data.contact.email}
                      onChange={(e) => setData(prev => ({
                        ...prev,
                        contact: { ...prev.contact, email: e.target.value }
                      }))}
                      className="bg-zinc-800 border-zinc-700 text-white"
                      placeholder="contact@company.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Phone</label>
                    <Input
                      value={data.contact.phone}
                      onChange={(e) => setData(prev => ({
                        ...prev,
                        contact: { ...prev.contact, phone: e.target.value }
                      }))}
                      className="bg-zinc-800 border-zinc-700 text-white"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Website</label>
                    <Input
                      value={data.contact.website}
                      onChange={(e) => setData(prev => ({
                        ...prev,
                        contact: { ...prev.contact, website: e.target.value }
                      }))}
                      className="bg-zinc-800 border-zinc-700 text-white"
                      placeholder="https://company.com"
                    />
                  </div>
                </>
              ) : (
                <div className="flex flex-wrap gap-4">
                  {data.contact.email && (
                    <a
                      href={`mailto:${data.contact.email}`}
                      className="flex items-center gap-2 text-gray-300 hover:text-white"
                    >
                      <Mail size={20} />
                      <span>{data.contact.email}</span>
                    </a>
                  )}
                  {data.contact.phone && (
                    <a
                      href={`tel:${data.contact.phone}`}
                      className="flex items-center gap-2 text-gray-300 hover:text-white"
                    >
                      <Phone size={20} />
                      <span>{data.contact.phone}</span>
                    </a>
                  )}
                  {data.contact.website && (
                    <a
                      href={data.contact.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-300 hover:text-white"
                    >
                      <Globe size={20} />
                      <span>Website</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessPortfolio; 