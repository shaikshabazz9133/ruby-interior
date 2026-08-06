// Central content source for the site. Swap the image URLs for your own shoots
// and every section below updates automatically.

const u = (id, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Studio", href: "#studio" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export const HERO_IMAGES = [
  u("1618221195710-dd6b41faaea6", 1600),
  u("1616486338812-3dadae4b4ace", 1600),
  u("1600607687939-ce8a6c25118c", 1600),
];

export const MARQUEE_WORDS = [
  "Residential",
  "Turnkey",
  "Modular Kitchens",
  "Commercial",
  "Bespoke Furniture",
  "Space Planning",
  "Lighting Design",
  "Styling",
];

export const STATS = [
  { value: 420, suffix: "+", label: "Spaces delivered" },
  { value: 14, suffix: "yrs", label: "Of studio practice" },
  { value: 96, suffix: "%", label: "Referral rate" },
  { value: 32, suffix: "", label: "Design awards" },
];

export const SERVICES = [
  {
    id: "01",
    title: "Residential Interiors",
    blurb:
      "Full-home design that starts with how you actually live — light, flow, storage and stillness resolved before a single wall goes up.",
    tags: ["Apartments", "Villas", "Duplexes"],
    image: u("1600210492486-724fe5c67fb0"),
  },
  {
    id: "02",
    title: "Turnkey Execution",
    blurb:
      "One contract, one accountable team. Civil, carpentry, electrical, finishing and styling — handed over on a date we commit to in writing.",
    tags: ["End-to-end", "Fixed timeline", "Single point of contact"],
    image: u("1600566753086-00f18fb6b3ea"),
  },
  {
    id: "03",
    title: "Modular Kitchens",
    blurb:
      "Ergonomic work triangles, soft-close German hardware and surfaces chosen to survive real cooking, not just a photoshoot.",
    tags: ["Hardware", "Ergonomics", "Storage"],
    image: u("1631679706909-1844bbd07221"),
  },
  {
    id: "04",
    title: "Commercial & Retail",
    blurb:
      "Workplaces, clinics, cafés and flagship stores designed around footfall, brand language and the way your team moves through a day.",
    tags: ["Offices", "F&B", "Retail"],
    image: u("1497366216548-37526070297c"),
  },
  {
    id: "05",
    title: "Bespoke Furniture",
    blurb:
      "Pieces drawn for one room and one room only, built in our own workshop by makers who sign what they finish.",
    tags: ["Joinery", "Upholstery", "Detailing"],
    image: u("1567767292278-a4f21aa2d36e"),
  },
  {
    id: "06",
    title: "Styling & Handover",
    blurb:
      "The last five percent that makes a project feel finished — art, textiles, greenery and the lighting scene that carries an evening.",
    tags: ["Art curation", "Soft goods", "Lighting"],
    image: u("1616627561950-9f746e330187"),
  },
];

export const PROJECTS = [
  {
    slug: "amber-court",
    title: "Amber Court Residence",
    category: "Residential",
    location: "Bengaluru",
    year: "2025",
    size: "tall",
    area: "3,200 sq ft",
    config: "4 BHK",
    duration: "14 weeks",
    scope: ["Full interiors", "Modular joinery", "Lighting", "Styling"],
    summary:
      "A south-facing apartment that was losing its best light to a bank of storage. We moved the wardrobes off the window wall, opened the living and dining into one run, and let the balcony daylight reach the kitchen for the first time.",
    cover: u("1618221195710-dd6b41faaea6"),
    gallery: [
      { src: u("1618221195710-dd6b41faaea6"), room: "Living room" },
      { src: u("1616047006789-b7af5afb8c20"), room: "Dining" },
      { src: u("1616627561950-9f746e330187"), room: "Master bedroom" },
      { src: u("1600489000022-c2086d79f9d4"), room: "Kitchen" },
      { src: u("1620626011761-996317b8d101"), room: "Guest bathroom" },
    ],
  },
  {
    slug: "noor-penthouse",
    title: "Noor Penthouse",
    category: "Residential",
    location: "Dubai Marina",
    year: "2025",
    size: "wide",
    area: "5,100 sq ft",
    config: "4 BHK duplex",
    duration: "22 weeks",
    scope: ["Full interiors", "Bespoke furniture", "Marble works", "Art curation"],
    summary:
      "Two floors joined by a stair that had been treated as plumbing. We rebuilt it as the centrepiece, then kept every finish quiet so the marina view stays the loudest thing in the room.",
    cover: u("1600607687939-ce8a6c25118c"),
    gallery: [
      { src: u("1600607687939-ce8a6c25118c"), room: "Living room" },
      { src: u("1600121848594-d8644e57abab"), room: "Upper lounge" },
      { src: u("1595526114035-0d45ed16cfbf"), room: "Principal bedroom" },
      { src: u("1616594039964-ae9021a400a0"), room: "Kitchen" },
      { src: u("1584622650111-993a426fbf0a"), room: "Ensuite bathroom" },
    ],
  },
  {
    slug: "studio-sable",
    title: "Studio Sable",
    category: "Commercial",
    location: "Hyderabad",
    year: "2024",
    size: "normal",
    area: "6,400 sq ft",
    config: "48 desks",
    duration: "11 weeks",
    scope: ["Space planning", "Workstations", "Acoustics", "Branding"],
    summary:
      "A design agency that had outgrown its floor plate. Acoustic baffles and a central breakout let forty-eight people share one open room without anyone shouting over anyone else.",
    cover: u("1497366754035-f200968a6e72"),
    gallery: [
      { src: u("1497366754035-f200968a6e72"), room: "Open floor" },
      { src: u("1497366216548-37526070297c"), room: "Workstations" },
      { src: u("1522771739844-6a9f6d5f14af"), room: "Meeting room" },
      { src: u("1600566752355-35792bedcfea"), room: "Breakout lounge" },
      { src: u("1567767292278-a4f21aa2d36e"), room: "Material detail" },
    ],
  },
  {
    slug: "clay-kitchen",
    title: "The Clay Kitchen",
    category: "Kitchen",
    location: "Pune",
    year: "2024",
    size: "normal",
    area: "240 sq ft",
    config: "Island layout",
    duration: "5 weeks",
    scope: ["Modular units", "German hardware", "Stone tops", "Appliances"],
    summary:
      "A galley that could only fit one cook. Taking down a non-structural partition bought enough width for an island, and the work triangle finally lets two people move around each other.",
    cover: u("1556909212-d5b604d0c90d"),
    gallery: [
      { src: u("1556909212-d5b604d0c90d"), room: "Island" },
      { src: u("1631679706909-1844bbd07221"), room: "Hob run" },
      { src: u("1615873968403-89e068629265"), room: "Pantry wall" },
      { src: u("1617103996702-96ff29b1c467"), room: "Breakfast counter" },
    ],
  },
  {
    slug: "marbelle-bath-house",
    title: "Marbelle Bath House",
    category: "Residential",
    location: "Goa",
    year: "2024",
    size: "tall",
    area: "2,750 sq ft",
    config: "3 BHK villa",
    duration: "16 weeks",
    scope: ["Full interiors", "Waterproofing", "Stone works", "Joinery"],
    summary:
      "A holiday villa where the bathrooms do the heavy lifting. Honed stone, deep sills and cross ventilation keep them cool through a Goan summer without a single extractor running.",
    cover: u("1616137466211-f939a420be84"),
    gallery: [
      { src: u("1616137466211-f939a420be84"), room: "Principal bathroom" },
      { src: u("1541123437800-1bb1317badc2"), room: "Guest bathroom" },
      { src: u("1552321554-5fefe8c9ef14"), room: "Powder room" },
      { src: u("1571508601891-ca5e7a713859"), room: "Living room" },
      { src: u("1605276374104-dee2a0ed3cd6"), room: "Bedroom" },
    ],
  },
  {
    slug: "fern-and-oak",
    title: "Fern & Oak Café",
    category: "Commercial",
    location: "Mumbai",
    year: "2023",
    size: "wide",
    area: "1,900 sq ft",
    config: "72 covers",
    duration: "9 weeks",
    scope: ["Layout", "Millwork", "Lighting", "Kitchen coordination"],
    summary:
      "Three designers had called the low ceiling unsolvable. We dropped the service zone instead of the dining zone, which bought head height where guests actually sit — and forty percent more covers.",
    cover: u("1554118811-1e0d58224f24"),
    gallery: [
      { src: u("1554118811-1e0d58224f24"), room: "Frontage" },
      { src: u("1524758631624-e2822e304c36"), room: "Dining room" },
      { src: u("1618219908412-a29a1bb7b86e"), room: "Window seating" },
      { src: u("1615529182904-14819c35db37"), room: "Mezzanine" },
      { src: u("1611892440504-42a792e24d32"), room: "Lounge corner" },
    ],
  },
  {
    slug: "linen-house",
    title: "Linen House",
    category: "Residential",
    location: "Chennai",
    year: "2023",
    size: "normal",
    area: "2,100 sq ft",
    config: "3 BHK",
    duration: "13 weeks",
    scope: ["Full interiors", "Wardrobes", "Soft goods", "Styling"],
    summary:
      "Built for a family that reads. Every room got a place to sit with a book and a lamp that reaches it, and the storage was drawn around a library that keeps growing.",
    cover: u("1616486338812-3dadae4b4ace"),
    gallery: [
      { src: u("1616486338812-3dadae4b4ace"), room: "Living room" },
      { src: u("1586023492125-27b2c045efd7"), room: "Reading corner" },
      { src: u("1522708323590-d24dbb6b0267"), room: "Master bedroom" },
      { src: u("1502672260266-1c1ef2d93688"), room: "Guest bedroom" },
      { src: u("1621293954908-907159247fc8"), room: "Kitchen" },
    ],
  },
  {
    slug: "copper-line-pantry",
    title: "Copper Line Pantry",
    category: "Kitchen",
    location: "Kochi",
    year: "2023",
    size: "normal",
    area: "310 sq ft",
    config: "Parallel layout",
    duration: "6 weeks",
    scope: ["Modular units", "Copper detailing", "Stone tops"],
    summary:
      "A working pantry for a household that cooks three meals a day. Copper trims patina as they are used, so the room reads warmer every year instead of looking tired.",
    cover: u("1604709177225-055f99402ea3"),
    gallery: [
      { src: u("1604709177225-055f99402ea3"), room: "Pantry run" },
      { src: u("1600210492486-724fe5c67fb0"), room: "Adjoining dining" },
      { src: u("1598928506311-c55ded91a20c"), room: "Serving counter" },
      { src: u("1594026112284-02bb6f3352fe"), room: "Utility bay" },
    ],
  },
];

export const PROJECT_FILTERS = ["All", "Residential", "Commercial", "Kitchen"];

export const PROCESS = [
  {
    step: "01",
    title: "Discovery",
    duration: "Week 1",
    body: "We sit in your space, measure everything twice and ask the awkward questions about budget and how you really use each room.",
  },
  {
    step: "02",
    title: "Concept & 3D",
    duration: "Week 2–3",
    body: "Mood boards, material samples in your hand and photoreal 3D walkthroughs — so you approve a space you have already seen.",
  },
  {
    step: "03",
    title: "Drawings & Costing",
    duration: "Week 4",
    body: "Working drawings, a line-item BOQ with no hidden heads, and a signed timeline with penalty clauses that bind us, not you.",
  },
  {
    step: "04",
    title: "Execution",
    duration: "Week 5–14",
    body: "A dedicated site manager, weekly photo reports and quality checks at every stage. You watch it happen from your phone.",
  },
  {
    step: "05",
    title: "Styling & Handover",
    duration: "Week 15",
    body: "Deep clean, styling, a snag list closed to zero, and a warranty folder with every material, vendor and care instruction.",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "They handed over eleven days early and the final bill matched the estimate to the rupee. After two bad renovation experiences, I did not think that was possible.",
    name: "Ananya Rao",
    role: "4BHK Villa · Whitefield",
    image: u("1494790108377-be9c29b29330", 300),
  },
  {
    quote:
      "Our café seats forty percent more people than the old layout and nobody feels crowded. RUYA solved a problem three other designers told us was structural.",
    name: "Imran Sheikh",
    role: "Fern & Oak · Mumbai",
    image: u("1507003211169-0a1dd7228f2d", 300),
  },
  {
    quote:
      "The 3D walkthrough was so accurate that moving in felt like walking into a memory. Every drawer is exactly where I imagined it.",
    name: "Meera Krishnan",
    role: "Penthouse · Dubai Marina",
    image: u("1438761681033-6461ffad8d80", 300),
  },
];

export const FAQ = [
  {
    q: "What does a project typically cost?",
    a: "Full-home interiors start around ₹1,450 per sq ft for essentials and ₹2,900+ per sq ft for premium finishes. You get a line-item BOQ before signing — no percentage-based surprises later.",
  },
  {
    q: "How long does a 3BHK take?",
    a: "Twelve to fifteen weeks from drawing sign-off to handover. Our contract carries a delay penalty, so the date we quote is the date we protect.",
  },
  {
    q: "Do you work outside your home city?",
    a: "Yes. We run projects across India and the GCC with a resident site manager for every location, plus weekly photo and video reporting.",
  },
  {
    q: "What is covered by warranty?",
    a: "Ten years on modular carpentry and hardware, five years on civil and waterproofing, one year on finishes and appliances routed through us.",
  },
];

export const CONTACT = {
  email: "studio@ruyainteriors.com",
  phone: "+91 98765 43210",
  address: "14 Lantern Lane, Indiranagar, Bengaluru 560038",
  hours: "Mon – Sat · 10:00 – 19:00",
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Pinterest", href: "https://pinterest.com" },
    { label: "Behance", href: "https://behance.net" },
    { label: "LinkedIn", href: "https://linkedin.com" },
  ],
};
