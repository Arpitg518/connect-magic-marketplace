import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Instagram, Youtube, Twitter, Link as LinkIcon, Plus, Edit2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

interface InfluencerPortfolioProps {
  initialData?: {
    name: string;
    bio: string;
    avatar: string;
    socialLinks: {
      instagram?: string;
      youtube?: string;
      twitter?: string;
      website?: string;
    };
    categories: string[];
    stats: {
      followers: number;
      engagement: number;
      posts: number;
    };
  };
}

const InfluencerPortfolio: React.FC<InfluencerPortfolioProps> = ({ initialData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState(initialData || {
    name: '',
    bio: '',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=default',
    socialLinks: {},
    categories: [],
    stats: {
      followers: 0,
      engagement: 0,
      posts: 0
    }
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save the data to your backend
    console.log('Saving profile:', data);
  };

  const handleAddCategory = () => {
    const newCategory = prompt('Enter new category:');
    if (newCategory) {
      setData(prev => ({
        ...prev,
        categories: [...prev.categories, newCategory]
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
                src={data.avatar}
                alt={data.name}
                className="w-32 h-32 rounded-full border-4 border-zinc-900"
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
              <div className="flex gap-2 mt-2">
                {data.categories.map((category, index) => (
                  <Badge key={index} variant="secondary">
                    {category}
                  </Badge>
                ))}
                {isEditing && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAddCategory}
                    className="h-6 px-2"
                  >
                    <Plus size={14} />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{data.stats.followers.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{data.stats.engagement}%</div>
                <div className="text-sm text-gray-400">Engagement</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{data.stats.posts}</div>
                <div className="text-sm text-gray-400">Posts</div>
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

          {/* Bio */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">About Me</h2>
            {isEditing ? (
              <Textarea
                value={data.bio}
                onChange={(e) => setData(prev => ({ ...prev, bio: e.target.value }))}
                className="bg-zinc-800 border-zinc-700 text-white"
                rows={4}
              />
            ) : (
              <p className="text-gray-300">{data.bio || 'No bio yet. Click edit to add one.'}</p>
            )}
          </div>

          {/* Social Links */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Social Links</h2>
            <div className="grid grid-cols-2 gap-4">
              {isEditing ? (
                <>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Instagram</label>
                    <Input
                      value={data.socialLinks.instagram || ''}
                      onChange={(e) => setData(prev => ({
                        ...prev,
                        socialLinks: { ...prev.socialLinks, instagram: e.target.value }
                      }))}
                      className="bg-zinc-800 border-zinc-700 text-white"
                      placeholder="https://instagram.com/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">YouTube</label>
                    <Input
                      value={data.socialLinks.youtube || ''}
                      onChange={(e) => setData(prev => ({
                        ...prev,
                        socialLinks: { ...prev.socialLinks, youtube: e.target.value }
                      }))}
                      className="bg-zinc-800 border-zinc-700 text-white"
                      placeholder="https://youtube.com/channel"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Twitter</label>
                    <Input
                      value={data.socialLinks.twitter || ''}
                      onChange={(e) => setData(prev => ({
                        ...prev,
                        socialLinks: { ...prev.socialLinks, twitter: e.target.value }
                      }))}
                      className="bg-zinc-800 border-zinc-700 text-white"
                      placeholder="https://twitter.com/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Website</label>
                    <Input
                      value={data.socialLinks.website || ''}
                      onChange={(e) => setData(prev => ({
                        ...prev,
                        socialLinks: { ...prev.socialLinks, website: e.target.value }
                      }))}
                      className="bg-zinc-800 border-zinc-700 text-white"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </>
              ) : (
                <div className="flex flex-wrap gap-4">
                  {data.socialLinks.instagram && (
                    <a
                      href={data.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-300 hover:text-white"
                    >
                      <Instagram size={20} />
                      <span>Instagram</span>
                    </a>
                  )}
                  {data.socialLinks.youtube && (
                    <a
                      href={data.socialLinks.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-300 hover:text-white"
                    >
                      <Youtube size={20} />
                      <span>YouTube</span>
                    </a>
                  )}
                  {data.socialLinks.twitter && (
                    <a
                      href={data.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-300 hover:text-white"
                    >
                      <Twitter size={20} />
                      <span>Twitter</span>
                    </a>
                  )}
                  {data.socialLinks.website && (
                    <a
                      href={data.socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-300 hover:text-white"
                    >
                      <LinkIcon size={20} />
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

export default InfluencerPortfolio; 