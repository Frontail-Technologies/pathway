export type Tutor = {
  id: string
  name: string
  subject: string
  expertise: string
  experienceYears: number
  mode: 'Online' | 'Offline' | 'Both'
  city: string
  fee: string
  rating: number
  reviewCount: number
  verified?: boolean
  avatar: string
}

export const tutors: Tutor[] = [
  {
    id: 't1',
    name: 'Ananya Sharma',
    subject: 'Mathematics',
    expertise: 'JEE Preparation',
    experienceYears: 8,
    mode: 'Both',
    city: 'Delhi',
    fee: '₹800/hr',
    rating: 4.8,
    reviewCount: 132,
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=112&h=112&q=75',
  },
  {
    id: 't2',
    name: 'Rohit Verma',
    subject: 'Physics',
    expertise: 'NEET Preparation',
    experienceYears: 6,
    mode: 'Online',
    city: 'Pune',
    fee: '₹650/hr',
    rating: 4.7,
    reviewCount: 98,
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=112&h=112&q=75',
  },
  {
    id: 't3',
    name: 'Karan Mehta',
    subject: 'Biology',
    expertise: 'NEET Preparation',
    experienceYears: 10,
    mode: 'Both',
    city: 'Mumbai',
    fee: '₹900/hr',
    rating: 4.9,
    reviewCount: 210,
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=112&h=112&q=75',
  },
  {
    id: 't4',
    name: 'Sana Khan',
    subject: 'English',
    expertise: 'CUET Preparation',
    experienceYears: 4,
    mode: 'Online',
    city: 'Hyderabad',
    fee: '₹500/hr',
    rating: 4.5,
    reviewCount: 51,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=112&h=112&q=75',
  },
]
