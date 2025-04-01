export const testUsers = {
  influencers: [
    {
      id: 1,
      name: 'Test User',
      type: 'influencer' as const,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=test'
    },
    {
      id: 2,
      name: 'John Doe',
      type: 'influencer' as const,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john'
    },
    {
      id: 3,
      name: 'Jane Smith',
      type: 'influencer' as const,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane'
    }
  ],
  businesses: [
    {
      id: 101,
      name: 'Tech Corp',
      type: 'business' as const,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tech'
    },
    {
      id: 102,
      name: 'Fashion Brand',
      type: 'business' as const,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=fashion'
    },
    {
      id: 103,
      name: 'Food Chain',
      type: 'business' as const,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=food'
    }
  ]
}; 