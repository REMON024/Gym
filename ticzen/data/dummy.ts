// ─────────────────────────────────────────────────────────────
// Dummy JSON data – replace individual sections with real API
// calls by editing lib/api.ts (nothing here needs to change)
// ─────────────────────────────────────────────────────────────

export type TicketType = {
  id: string;
  name: string;
  price: number;
  description: string;
  available: number;
};

export type Review = {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  comment: string;
};

export type Event = {
  id: string;
  title: string;
  titleBn?: string;
  date: string;
  dateShort: string;
  time: string;
  endDate?: string;
  location: string;
  venue: string;
  city: string;
  image: string;
  banner: string;
  category: string;
  isFree: boolean;
  price: number;
  attendees: number;
  description: string;
  tickets: TicketType[];
  tags: string[];
  reviews: Review[];
  lat?: number;
  lng?: number;
};

export type Category = {
  id: string;
  name: string;
  icon: string;
};

export type TripDestination = {
  id: string;
  name: string;
  image: string;
};

export type FAQ = {
  id: string;
  question: string;
  answer: string;
};

export type CustomerReview = {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
};

// ── Events ────────────────────────────────────────────────────
export const events: Event[] = [
  {
    id: "carpe-diem-lal-boishakhi",
    title: "Carpe Diem",
    titleBn: "লাল বৈশাখী ১৪৩৩",
    date: "Tuesday, 14th Apr, 2026",
    dateShort: "14th Apr",
    time: "5:00 PM",
    endDate: "15 Apr, 2026",
    location: "Dhaka College",
    venue: "Dhaka College Main Ground",
    city: "Dhaka",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&q=80",
    banner: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=80",
    category: "Festival",
    isFree: false,
    price: 500,
    attendees: 284,
    description:
      "Carpe Diem লাল বৈশাখী ১৪৩৩ is a vibrant celebration of the Bengali New Year, bringing together music, culture, and community. Join thousands of people in welcoming the new year with joy and festivity. Experience traditional music performances, cultural shows, and much more at this grand celebration.",
    tickets: [
      { id: "general", name: "General Ticket", price: 500, description: "Entry only with access to standard content areas", available: 200 },
      { id: "premium", name: "Premium Ticket", price: 700, description: "Enhanced experience with better viewing spots & catering", available: 100 },
      { id: "vip", name: "VIP Ticket", price: 1000, description: "Full access with sofa seating, priority entry, and special gifts", available: 50 },
    ],
    tags: ["Cultural Festival", "Local Performers", "National Celebration"],
    reviews: [
      { id: "r1", author: "Rahim Uddin", avatar: "https://i.pravatar.cc/40?img=1", rating: 5, comment: "Amazing experience! Great performers and perfectly organized event." },
      { id: "r2", author: "Nasrin Akter", avatar: "https://i.pravatar.cc/40?img=2", rating: 4, comment: "Loved the cultural shows. Will definitely attend next year." },
      { id: "r3", author: "Karim Hassan", avatar: "https://i.pravatar.cc/40?img=3", rating: 5, comment: "Best Boishakhi event in Dhaka. Highly recommended!" },
      { id: "r4", author: "Sumaiya Islam", avatar: "https://i.pravatar.cc/40?img=4", rating: 4, comment: "Great atmosphere and crowd. The food stalls were a bonus!" },
    ],
    lat: 23.7261,
    lng: 90.3845,
  },
  {
    id: "dhaka-chess-nationals",
    title: "Notre Dame Eye Club Presents 6th National Art Carnival 2026",
    dateShort: "18th Apr",
    date: "Saturday, 18th Apr, 2026",
    time: "8:30 AM - 7:30 PM",
    location: "Dhaka College",
    venue: "Dhaka College Auditorium",
    city: "Dhaka",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80",
    banner: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80",
    category: "Exhibition",
    isFree: false,
    price: 700,
    attendees: 50,
    description: "The 6th National Art Carnival brings together artists from across Bangladesh for a showcase of paintings, sculptures, and mixed media art. A celebration of creativity and expression.",
    tickets: [
      { id: "general", name: "General Ticket", price: 700, description: "Access to all galleries and exhibitions", available: 500 },
      { id: "vip", name: "VIP Ticket", price: 1200, description: "Priority entry + guided tour + artist meet & greet", available: 50 },
    ],
    tags: ["Art", "Exhibition", "National"],
    reviews: [],
    lat: 23.7261,
    lng: 90.3845,
  },
  {
    id: "mathilda-concert",
    title: "Mathilda College Model United Nations 2026",
    dateShort: "9th Apr",
    date: "Thursday, 9th Apr, 2026",
    time: "8:30 AM - 7:30 PM",
    location: "St. Joseph International",
    venue: "St. Joseph International School",
    city: "Dhaka",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    banner: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
    category: "Conference",
    isFree: false,
    price: 300,
    attendees: 50,
    description: "Mathilda College Model United Nations is a prestigious simulation of the United Nations, where students debate global issues and craft resolutions. Join us for an intellectually stimulating experience.",
    tickets: [
      { id: "delegate", name: "Delegate Pass", price: 300, description: "Full access to all committee sessions", available: 200 },
    ],
    tags: ["MUN", "Conference", "Education"],
    reviews: [],
  },
  {
    id: "efc-takeover",
    title: "EFC 6 - The Takeover",
    dateShort: "5th Apr",
    date: "Sunday, 5th Apr, 2026",
    time: "5:30 AM - 7:30 PM",
    location: "Bashundhara Sports Complex",
    venue: "Bashundhara Sports Complex",
    city: "Dhaka",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80",
    banner: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&q=80",
    category: "Sport",
    isFree: false,
    price: 500,
    attendees: 50,
    description: "EFC 6 - The Takeover is the most anticipated MMA event of the year. Watch elite fighters battle for supremacy in an action-packed evening of mixed martial arts.",
    tickets: [
      { id: "general", name: "General Ticket", price: 500, description: "General seating area", available: 300 },
      { id: "vip", name: "VIP Ticket", price: 1500, description: "Ringside VIP seating with premium hospitality", available: 30 },
    ],
    tags: ["MMA", "Sport", "Fighting"],
    reviews: [],
  },
  {
    id: "x-force-dance",
    title: "X Force presents Indo Park Chapter One",
    dateShort: "5th Apr",
    date: "Sunday, 5th Apr, 2026",
    time: "5:30 AM - 7:30 PM",
    location: "Dhaka College",
    venue: "Indo Park",
    city: "Dhaka",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80",
    banner: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&q=80",
    category: "Concert",
    isFree: false,
    price: 1700,
    attendees: 50,
    description: "X Force presents an electrifying dance showcase featuring some of the best dance crews from across the country. Witness breathtaking performances across multiple dance styles.",
    tickets: [
      { id: "general", name: "General Ticket", price: 1700, description: "General admission", available: 150 },
    ],
    tags: ["Dance", "Performance", "Entertainment"],
    reviews: [],
  },
  {
    id: "notredame-chess",
    title: "Notre Dame Eye Club Presents 6th National Art Carnival 2026",
    dateShort: "18th Apr",
    date: "Saturday, 18th Apr, 2026",
    time: "8:30 AM - 7:30 PM",
    location: "Dhaka College",
    venue: "Dhaka College",
    city: "Dhaka",
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&q=80",
    banner: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1200&q=80",
    category: "Exhibition",
    isFree: false,
    price: 700,
    attendees: 50,
    description: "A grand exhibition celebrating the artistic talents of students and professionals from all over Bangladesh.",
    tickets: [
      { id: "general", name: "General Ticket", price: 700, description: "Full access to all exhibits", available: 400 },
    ],
    tags: ["Art", "Culture", "Exhibition"],
    reviews: [],
  },
  {
    id: "smart-v2",
    title: "SmartV2.0 - RSC Science Test",
    dateShort: "18th Apr",
    date: "Saturday, 18th Apr, 2026",
    time: "8:30 AM - 7:30 PM",
    location: "Dhaka College",
    venue: "RSC Auditorium",
    city: "Dhaka",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    banner: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80",
    category: "Conference",
    isFree: true,
    price: 0,
    attendees: 50,
    description: "SmartV2.0 is a national science olympiad for high school students. Test your knowledge, win exciting prizes, and meet like-minded peers.",
    tickets: [
      { id: "free", name: "Free Entry", price: 0, description: "Open to all students", available: 1000 },
    ],
    tags: ["Science", "Competition", "Students"],
    reviews: [],
  },
  {
    id: "shukkur-chess",
    title: "Shukkur Eye Club Presents 6th National Art Carnival 2026",
    dateShort: "18th Apr",
    date: "Saturday, 18th Apr, 2026",
    time: "8:30 AM - 7:30 PM",
    location: "Dhaka College",
    venue: "Dhaka College Grounds",
    city: "Dhaka",
    image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&q=80",
    banner: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1200&q=80",
    category: "Festival",
    isFree: false,
    price: 300,
    attendees: 50,
    description: "The annual Shukkur festival featuring cultural performances, food stalls, and art installations celebrating the spirit of community.",
    tickets: [
      { id: "general", name: "General Ticket", price: 300, description: "General access", available: 600 },
    ],
    tags: ["Festival", "Cultural", "Community"],
    reviews: [],
  },
];

// ── Categories ────────────────────────────────────────────────
export const categories: Category[] = [
  { id: "music", name: "Music", icon: "🎵" },
  { id: "drama", name: "Drama", icon: "🎭" },
  { id: "nightlife", name: "Night life", icon: "✨" },
  { id: "learning", name: "Learning", icon: "📚" },
  { id: "conference", name: "Conference", icon: "💼" },
  { id: "tours", name: "Tours", icon: "✈️" },
  { id: "sport", name: "Sport", icon: "⚽" },
  { id: "festival", name: "Festival", icon: "🎊" },
  { id: "exhibition", name: "Exhibition", icon: "🖼️" },
  { id: "more", name: "More", icon: "⋯" },
];

// ── Trip Destinations ─────────────────────────────────────────
export const trips: TripDestination[] = [
  { id: "dubai", name: "Dubai", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80" },
  { id: "thailand", name: "Thailand", image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80" },
  { id: "bali", name: "Bali", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80" },
];

// ── Customer Reviews ──────────────────────────────────────────
export const customerReviews: CustomerReview[] = [
  {
    id: "cr1",
    name: "Ashley",
    avatar: "https://i.pravatar.cc/60?img=5",
    rating: 5,
    comment: "I've tried many event platforms but TicZen is on a completely different level. Easy booking, beautiful design and a seamless ticket experience!",
  },
  {
    id: "cr2",
    name: "Raisa",
    avatar: "https://i.pravatar.cc/60?img=6",
    rating: 4,
    comment: "Fantastic platform! I discovered so many great events in my city. The filtering options are really helpful and the booking process was smooth.",
  },
  {
    id: "cr3",
    name: "Dorothy",
    avatar: "https://i.pravatar.cc/60?img=7",
    rating: 5,
    comment: "Using TicZen I quickly found events matching my interests. The company listening tools and notifications are brilliant. Highly recommend!",
  },
];

// ── FAQs ──────────────────────────────────────────────────────
export const faqs: FAQ[] = [
  {
    id: "faq1",
    question: "Lorem ipsum title",
    answer: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden.",
  },
  {
    id: "faq2",
    question: "Lorem ipsum title",
    answer: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
  },
  {
    id: "faq3",
    question: "Lorem ipsum title",
    answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
];
