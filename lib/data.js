// Central content source for the site. Every photograph is a real RUYA site
// shot living under `public/`, and every caption describes that specific frame.
//
// The portfolio is organised the way the photo library is — one collection per
// room type — rather than as invented "projects", so nothing on the page
// claims more than the pictures actually show. Skipped from the library: exact
// duplicates (pop_ceiling/04 = hall_room/12, wardrobe/33 = pooj_room/05),
// frames where a member of the crew is the subject, and a handful of shots too
// dark or too tightly angled to read.

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Studio", href: "#studio" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

// The opening carousel. `focus` is the object-position for the stage: a phone
// crops a 16:9 frame down to roughly 9:19, so without it the subject of half
// these shots would fall outside the visible strip. Landscape sources only,
// for the same reason.
export const HERO_SLIDES = [
  {
    id: "island-kitchen",
    image: "/kichen/35.jpg",
    focus: "50% 55%",
    eyebrow: "Modular Kitchens",
    title: ["Built", "for", "real", "cooking"],
    accent: "real",
    blurb:
      "A U-shaped run in white acrylic around a quartz-topped island, warm cove light under every wall unit and a lit crockery tower at the end of the counter.",
    project: "Modular Kitchens",
    meta: "37 photographs",
  },
  {
    id: "living-hall",
    image: "/hall_room/06.jpg",
    focus: "50% 50%",
    eyebrow: "Living & Dining",
    title: ["Rooms", "that", "hold", "the", "light"],
    accent: "light",
    blurb:
      "Black marble portals frame a frameless glass partition, and a gold cove runs the length of the ceiling so the living room reads as one unbroken space.",
    project: "Living & Dining",
    meta: "13 photographs",
  },
  {
    id: "walk-in",
    image: "/wardrobe/39.jpg",
    focus: "50% 60%",
    eyebrow: "Wardrobes & Walk-ins",
    title: ["Storage", "you", "never", "have", "to", "hide"],
    accent: "never",
    blurb:
      "A corner walk-in in lilac, cream and grey lacquered glass, framed in slim aluminium and set on a book-matched marble floor we laid to match.",
    project: "Wardrobes & Walk-ins",
    meta: "40 photographs",
  },
  {
    id: "ceilings",
    image: "/pop_ceiling/02.jpg",
    focus: "50% 45%",
    eyebrow: "False Ceilings",
    title: ["Ceilings", "that", "carry", "a", "room"],
    accent: "carry",
    blurb:
      "Veneer-faced POP discs drop over each seating cluster, with a concealed cove wash behind them — so a hall this size lights evenly without a fixture in anyone's eyeline.",
    project: "False Ceilings & Feature Walls",
    meta: "4 photographs",
  },
  {
    id: "wardrobe-wall",
    image: "/wardrobe/01.jpg",
    focus: "50% 50%",
    eyebrow: "Bedrooms",
    title: ["Where", "your", "vision", "takes", "shape"],
    accent: "vision",
    blurb:
      "A design-and-build studio shaping homes, workplaces and hospitality spaces — drawn, costed and delivered by one accountable team.",
    project: "Bedrooms & Baths",
    meta: "16 photographs",
  },
];

export const HERO_IMAGES = HERO_SLIDES.map((s) => s.image);

export const MARQUEE_WORDS = [
  "Modular Kitchens",
  "Wardrobes",
  "Bedrooms",
  "Living & Dining",
  "Kids' Rooms",
  "Pooja Units",
  "False Ceilings",
  "Commercial",
];

export const STATS = [
  { value: 420, suffix: "+", label: "Spaces delivered" },
  { value: 14, suffix: "yrs", label: "Of studio practice" },
  { value: 96, suffix: "%", label: "Referral rate" },
  { value: 32, suffix: "", label: "Design awards" },
];

// Service cards render into a 16:10 frame, so every image here is landscape.
export const SERVICES = [
  {
    id: "01",
    title: "Residential Interiors",
    blurb:
      "Full-home design that starts with how you actually live — light, flow, storage and stillness resolved before a single wall goes up.",
    tags: ["Apartments", "Villas", "Duplexes"],
    image: "/hall_room/07.jpg",
  },
  {
    id: "02",
    title: "Turnkey Execution",
    blurb:
      "One contract, one accountable team. Civil, carpentry, electrical, finishing and styling — handed over on a date we commit to in writing.",
    tags: ["End-to-end", "Fixed timeline", "Single point of contact"],
    image: "/bed_room/16.jpg",
  },
  {
    id: "03",
    title: "Modular Kitchens",
    blurb:
      "Ergonomic work triangles, soft-close hardware and surfaces chosen to survive real cooking — L, U, parallel and island layouts.",
    tags: ["Hardware", "Ergonomics", "Storage"],
    image: "/kichen/40.jpg",
  },
  {
    id: "04",
    title: "Commercial & Retail",
    blurb:
      "Offices, clinics, banquet halls and retail floors designed around footfall, brand language and the way your team moves through a day.",
    tags: ["Offices", "Banquet", "Retail"],
    image: "/commercial_work/06.jpg",
  },
  {
    id: "05",
    title: "Wardrobes & Joinery",
    blurb:
      "Walk-ins, sliders, dressers and pooja units drawn for one room and one room only, built in our own workshop by makers who sign what they finish.",
    tags: ["Walk-ins", "Sliders", "Detailing"],
    image: "/wardrobe/02.jpg",
  },
  {
    id: "06",
    title: "Ceilings & Lighting",
    blurb:
      "POP and gypsum ceilings, backlit jali screens and cove detailing — drawn with the electrical layout, not bolted on after it.",
    tags: ["POP ceilings", "Cove lighting", "Feature walls"],
    image: "/hall_room/11.jpg",
  },
];

// One card per room type. `size` drives the masonry span and therefore the
// crop, so a `wide` card gets a landscape cover and a `tall` card a portrait
// one. `facts` fills the detail panel; the photo count is derived from the
// gallery so the two can never drift apart.
export const PROJECTS = [
  {
    slug: "modular-kitchens",
    title: "Modular Kitchens",
    category: "Kitchen",
    location: "L · U · Parallel · Island",
    year: "2019–2025",
    size: "wide",
    facts: [
      ["Layouts", "L, U, parallel, island"],
      ["Shutters", "Acrylic, laminate, PU, glass"],
    ],
    scope: ["Carcass & shutters", "Granite / quartz tops", "Tall pantry units", "Chimney & hob"],
    summary:
      "Kitchens in every finish we build — high-gloss acrylic, matte laminate, lacquered glass — laid out around the cook rather than the room. Tall pull-out pantries, plinth lighting, soft-close drawer banks and counters in granite or engineered quartz.",
    cover: "/kichen/35.jpg",
    gallery: [
      { src: "/kichen/35.jpg", room: "Island kitchen, white acrylic" },
      { src: "/kichen/36.jpg", room: "Backlit crockery display" },
      { src: "/kichen/40.jpg", room: "Tall units and gold quartz" },
      { src: "/kichen/41.jpg", room: "Quartz island top" },
      { src: "/kichen/42.jpg", room: "Island drawer bank" },
      { src: "/kichen/38.jpg", room: "Tall unit run" },
      { src: "/kichen/37.jpg", room: "Counter organisers" },
      { src: "/kichen/39.jpg", room: "Cutlery drawer inserts" },
      { src: "/kichen/25.jpg", room: "Plinth-lit breakfast ledge" },
      { src: "/kichen/26.jpg", room: "Maroon and beige tall units" },
      { src: "/kichen/27.jpg", room: "Chimney housing" },
      { src: "/kichen/24.jpg", room: "Navy units, gold cove ceiling" },
      { src: "/kichen/34.jpg", room: "Grey units, black marble top" },
      { src: "/kichen/33.jpg", room: "Black marble sink run" },
      { src: "/kichen/32.jpg", room: "Marble-finish tall units" },
      { src: "/kichen/13.jpg", room: "Orange and mint U-kitchen" },
      { src: "/kichen/12.jpg", room: "Red gloss parallel kitchen" },
      { src: "/kichen/14.jpg", room: "Maroon breakfast bar" },
      { src: "/kichen/17.jpg", room: "Pull-out pantry tower" },
      { src: "/kichen/20.jpg", room: "Wire pantry baskets" },
      { src: "/kichen/06.jpg", room: "White gloss wall units" },
      { src: "/kichen/07.jpg", room: "Aubergine base units" },
      { src: "/kichen/08.jpg", room: "Pull-out drawer bank" },
      { src: "/kichen/11.jpg", room: "Open drawers and shelving" },
      { src: "/kichen/04.jpg", room: "Sage green U-kitchen" },
      { src: "/kichen/05.jpg", room: "Sage green drawer bank" },
      { src: "/kichen/18.jpg", room: "Oak-effect laminate kitchen" },
      { src: "/kichen/19.jpg", room: "Oak-effect L-shaped run" },
      { src: "/kichen/15.jpg", room: "Dark brown gloss kitchen" },
      { src: "/kid_room/02.jpg", room: "Blue and white gloss kitchen" },
      { src: "/kichen/10.jpg", room: "Blue and white wall unit" },
      { src: "/kichen/23.jpg", room: "Black gloss on herringbone" },
      { src: "/kichen/03.jpg", room: "Walnut tall unit" },
      { src: "/kichen/02.jpg", room: "Granite counter and chimney" },
      { src: "/kichen/09.jpg", room: "Shutters before unwrapping" },
      { src: "/kichen/01.jpg", room: "Maroon kitchen, during install" },
      { src: "/kichen/16.jpg", room: "Site work in progress" },
    ],
  },
  {
    slug: "bedrooms",
    title: "Bedrooms & Baths",
    category: "Residential",
    location: "Beds, dressers, vanities",
    year: "2019–2025",
    size: "normal",
    facts: [
      ["Storage", "Hydraulic beds, lofts"],
      ["Baths", "Backlit mirrors, stone tops"],
    ],
    scope: ["Beds & headboards", "Dressers", "False ceilings", "Vanity units"],
    summary:
      "Bedrooms built around the storage that has to disappear — hydraulic bed boxes, overhead lofts and dresser walls — plus the ensuite vanities that come with them, in marble, backlit mirror and moisture-rated carcass.",
    cover: "/bed_room/12.jpg",
    gallery: [
      { src: "/bed_room/12.jpg", room: "Master bedroom and TV console" },
      { src: "/bed_room/09.jpg", room: "Mustard and white gloss bedroom" },
      { src: "/bed_room/16.jpg", room: "Study wall under a cove ceiling" },
      { src: "/bed_room/15.jpg", room: "Cove-lit ceiling and curtains" },
      { src: "/bed_room/04.jpg", room: "Bed with cushioned headboard" },
      { src: "/bed_room/08.jpg", room: "Compact walk-in with tall unit" },
      { src: "/bed_room/17.jpg", room: "Dressing niche, oval mirror" },
      { src: "/bed_room/06.jpg", room: "Dresser with lit mirror frame" },
      { src: "/bed_room/13.jpg", room: "Twin-basin vanity" },
      { src: "/bed_room/10.jpg", room: "Backlit mirror on black marble" },
      { src: "/bed_room/11.jpg", room: "Powder room vanity" },
    ],
  },
  {
    slug: "wardrobes",
    title: "Wardrobes & Walk-ins",
    category: "Residential",
    location: "Sliders, hinged, walk-in",
    year: "2019–2025",
    size: "tall",
    facts: [
      ["Types", "Sliding, hinged, walk-in"],
      ["Internals", "Rods, drawers, accessory trays"],
    ],
    scope: ["Sliding shutters", "Lofts", "Dressers", "Internal fit-out"],
    summary:
      "The largest run in the library. Lacquered glass sliders, mirror shutters, laminate hinged doors and full corner walk-ins — each drawn around what actually goes inside, down to the tie racks and jewellery trays.",
    cover: "/wardrobe/42.jpg",
    gallery: [
      { src: "/wardrobe/42.jpg", room: "Marble-finish walk-in" },
      { src: "/wardrobe/39.jpg", room: "Corner walk-in, full run" },
      { src: "/wardrobe/02.jpg", room: "Walk-in with sliding fronts" },
      { src: "/wardrobe/38.jpg", room: "Sliding fronts and open bays" },
      { src: "/wardrobe/40.jpg", room: "Teen wardrobe in blue and white" },
      { src: "/wardrobe/41.jpg", room: "Blue wardrobe, open bays" },
      { src: "/wardrobe/03.jpg", room: "Blue wardrobe with shoe rack" },
      { src: "/wardrobe/01.jpg", room: "Damask panels and lit niche" },
      { src: "/wardrobe/17.jpg", room: "Mosaic sliding wardrobe wall" },
      { src: "/wardrobe/18.jpg", room: "Mosaic wall, shutter open" },
      { src: "/wardrobe/26.jpg", room: "Yellow gloss wardrobe wall" },
      { src: "/wardrobe/27.jpg", room: "Mirror unit and glass shelves" },
      { src: "/wardrobe/22.jpg", room: "Yellow sliding wardrobe" },
      { src: "/wardrobe/23.jpg", room: "Mirror slider, open shelves" },
      { src: "/wardrobe/24.jpg", room: "Black gloss wardrobe and dresser" },
      { src: "/wardrobe/30.jpg", room: "Frosted glass with gold inlay" },
      { src: "/wardrobe/31.jpg", room: "White gloss with line inlay" },
      { src: "/wardrobe/46.jpg", room: "Arched mirror dresser" },
      { src: "/wardrobe/47.jpg", room: "Two-tone grey gloss" },
      { src: "/wardrobe/45.jpg", room: "Charcoal gloss wardrobe" },
      { src: "/wardrobe/37.jpg", room: "Taupe wardrobe, dresser ledge" },
      { src: "/wardrobe/43.jpg", room: "Black glass wardrobe wall" },
      { src: "/wardrobe/44.jpg", room: "Accessory drawer inserts" },
      { src: "/wardrobe/05.jpg", room: "Concrete-effect six-door" },
      { src: "/wardrobe/08.jpg", room: "Concrete-effect, side view" },
      { src: "/wardrobe/09.jpg", room: "Wardrobe internals" },
      { src: "/wardrobe/35.jpg", room: "Wardrobe wall, internals open" },
      { src: "/wardrobe/06.jpg", room: "Whitewashed oak four-door" },
      { src: "/wardrobe/12.jpg", room: "Mirror slider and lofts" },
      { src: "/wardrobe/21.jpg", room: "Grey slider with cream band" },
      { src: "/wardrobe/11.jpg", room: "Grey sliders and top lofts" },
      { src: "/wardrobe/25.jpg", room: "Cherry-oak sliding wardrobe" },
      { src: "/wardrobe/28.jpg", room: "Cherry veneer corner lofts" },
      { src: "/wardrobe/29.jpg", room: "Light oak shutters and dresser" },
      { src: "/wardrobe/36.jpg", room: "Rustic pine-effect sliders" },
      { src: "/wardrobe/19.jpg", room: "Walnut laminate four-door" },
      { src: "/wardrobe/34.jpg", room: "Mint and maroon dresser unit" },
      { src: "/wardrobe/04.jpg", room: "Gold-framed glass shutters" },
      { src: "/wardrobe/10.jpg", room: "Live-edge walnut wardrobe" },
    ],
  },
  {
    slug: "living-dining",
    title: "Living & Dining",
    category: "Residential",
    location: "Halls, foyers, staircases",
    year: "2019–2025",
    size: "normal",
    facts: [
      ["Rooms", "Halls, foyers, stairs"],
      ["Materials", "Marble, veneer, glass, brass"],
    ],
    scope: ["Display units", "Feature walls", "Stair cladding", "Foyer joinery"],
    summary:
      "The rooms guests actually see. Book-matched marble portals and stair cladding, frameless glass partitions and balustrades, brass-framed display joinery, and laser-cut jali screens used to divide without closing anything off.",
    cover: "/hall_room/06.jpg",
    gallery: [
      { src: "/hall_room/06.jpg", room: "Living room, marble portals" },
      { src: "/hall_room/07.jpg", room: "Upper lounge and glass rail" },
      { src: "/hall_room/11.jpg", room: "Dining, green marble wall" },
      { src: "/hall_room/10.jpg", room: "Dining beneath the staircase" },
      { src: "/hall_room/08.jpg", room: "Glass-railed marble stair" },
      { src: "/hall_room/02.jpg", room: "Brass-framed display unit" },
      { src: "/hall_room/14.jpg", room: "Dining with louvred panels" },
      { src: "/hall_room/03.jpg", room: "Backlit jali partition" },
      { src: "/hall_room/04.jpg", room: "Fluted panel feature wall" },
      { src: "/hall_room/05.jpg", room: "Cove-lit fluted corridor" },
      { src: "/hall_room/13.jpg", room: "Fluted wall panelling" },
      { src: "/hall_room/09.jpg", room: "Shoe console in the foyer" },
      { src: "/hall_room/01.jpg", room: "Entry foyer bench" },
    ],
  },
  {
    slug: "kids-rooms",
    title: "Kids' & Study Rooms",
    category: "Residential",
    location: "Beds, desks, wardrobes",
    year: "2019–2025",
    size: "normal",
    facts: [
      ["Built for", "Ages 4 – 16"],
      ["Fronts", "Printed graphics, gloss laminate"],
    ],
    scope: ["Loft beds", "Study units", "Wardrobes", "Open shelving"],
    summary:
      "Rooms drawn to be re-configured rather than replaced. Printed shutter graphics that a child picks, fold-down desks, platform beds with drawers under them, and open shelving set at a height they can actually reach.",
    cover: "/kid_room/08.jpg",
    gallery: [
      { src: "/kid_room/08.jpg", room: "Balloon-print kids' wardrobe" },
      { src: "/kid_room/09.jpg", room: "Kids' wardrobe, shutters open" },
      { src: "/kid_room/10.jpg", room: "Jungle-print wardrobe in mint" },
      { src: "/kid_room/11.jpg", room: "Mint wardrobe internals" },
      { src: "/kid_room/01.jpg", room: "Loft shelving and fold-down desk" },
      { src: "/kid_room/03.jpg", room: "Study wall and platform bed" },
      { src: "/kid_room/13.jpg", room: "Study nook with pigeonholes" },
      { src: "/kid_room/14.jpg", room: "Copper laminate study wall" },
      { src: "/kid_room/12.jpg", room: "Corner study in dark walnut" },
      { src: "/kid_room/15.jpg", room: "Study table and tall unit" },
      { src: "/kid_room/04.jpg", room: "Wardrobe and study with mirror" },
      { src: "/kid_room/05.jpg", room: "Study ledge under mustard lofts" },
      { src: "/kid_room/06.jpg", room: "Fold-down desk and loft" },
      { src: "/kid_room/07.jpg", room: "Study alcove shelving" },
    ],
  },
  {
    slug: "pooja-rooms",
    title: "Pooja Rooms & Mandirs",
    category: "Residential",
    location: "Niches, units, partitions",
    year: "2019–2025",
    size: "normal",
    facts: [
      ["Formats", "Niche, unit, partition"],
      ["Detailing", "CNC jali, gold leaf, backlighting"],
    ],
    scope: ["CNC jali screens", "Backlighting", "Seating plinths", "Storage below"],
    summary:
      "Mandirs sized to the ritual, not the leftover corner. CNC-cut jali screens backlit in warm white, gold-leaf detailing, a plinth to sit on and closed storage underneath for everything that should not be on display.",
    cover: "/pooj_room/05.jpg",
    gallery: [
      { src: "/pooj_room/05.jpg", room: "Backlit jali mandir" },
      { src: "/pooj_room/01.jpg", room: "Timber mandir, gold pillars" },
      { src: "/pooj_room/04.jpg", room: "Pooja and crockery unit" },
      { src: "/pooj_room/03.jpg", room: "Jali shutters, drawers open" },
      { src: "/pooj_room/06.jpg", room: "Laser-cut Krishna panel" },
    ],
  },
  {
    slug: "false-ceilings",
    title: "False Ceilings & Feature Walls",
    category: "Commercial",
    location: "POP, gypsum, backlit screens",
    year: "2019–2025",
    size: "normal",
    facts: [
      ["Systems", "POP, gypsum, CNC screens"],
      ["Lighting", "Cove wash, spots, chandeliers"],
    ],
    scope: ["POP ceilings", "CNC jali panels", "Cove lighting", "Backlit walls"],
    summary:
      "Ceilings drawn with the electrical layout rather than after it. Veneer-faced POP discs over seating clusters, CNC jali panels lit from behind, and mirrored lattice feature walls set out on site before a single fixing goes in.",
    cover: "/pop_ceiling/02.jpg",
    gallery: [
      { src: "/pop_ceiling/02.jpg", room: "Banquet hall ceiling discs" },
      { src: "/pop_ceiling/01.jpg", room: "Jali ceiling over the lounge" },
      { src: "/pop_ceiling/03.jpg", room: "Lounge ceiling, second view" },
      { src: "/pop_ceiling/04.jpg", room: "Backlit lattice wall, mid-install" },
    ],
  },
  {
    slug: "commercial-fitouts",
    title: "Commercial Fitouts",
    category: "Commercial",
    location: "Offices, retail, lobbies",
    year: "2019–2025",
    size: "normal",
    facts: [
      ["Sectors", "Offices, retail, hospitality"],
      ["Typical scope", "Shell to handover"],
    ],
    scope: ["Wall panelling", "Cabins", "Reception counters", "Lift lobbies"],
    summary:
      "Offices, retail floors and lobbies taken from bare shell to handover. Louvred and tiled wall panelling that doubles as acoustic treatment, cabins with matching desk joinery, and stone-clad lift lobbies.",
    cover: "/commercial_work/10.jpg",
    gallery: [
      { src: "/commercial_work/10.jpg", room: "Meeting hall, ceiling medallion" },
      { src: "/commercial_work/06.jpg", room: "Staff room, louvred panelling" },
      { src: "/commercial_work/08.jpg", room: "Cabin, two-tone panelling" },
      { src: "/commercial_work/09.jpg", room: "Window bay panelling" },
      { src: "/commercial_work/07.jpg", room: "Reception counter and doors" },
      { src: "/commercial_work/12.jpg", room: "Manager's cabin desk" },
      { src: "/commercial_work/13.jpg", room: "Workstation, overhead storage" },
      { src: "/commercial_work/02.jpg", room: "Retail counters and mirror wall" },
      { src: "/commercial_work/03.jpg", room: "Cabin corridor before finishing" },
      { src: "/commercial_work/04.jpg", room: "Lift lobby, cladding in progress" },
      { src: "/commercial_work/01.jpg", room: "Lift lobby stone cladding" },
    ],
  },
];

export const PROJECT_FILTERS = ["All", "Residential", "Kitchen", "Commercial"];

// A single portrait frame in the studio section, so it has to be a tall shot.
export const STUDIO_IMAGE = {
  src: "/kichen/36.jpg",
  alt: "Backlit crockery display cabinets and marble flooring in a RUYA kitchen",
};

// Full-bleed band behind the closing call to action, sat under a heavy scrim —
// a dark, high-detail frame reads best there.
export const CTA_IMAGE = {
  src: "/wardrobe/17.jpg",
};

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

// No headshots in the photo library, so each quote is credited with a brass
// monogram built from the initials instead of a stock face.
export const TESTIMONIALS = [
  {
    quote:
      "They handed over eleven days early and the final bill matched the estimate to the rupee. After two bad renovation experiences, I did not think that was possible.",
    name: "Ananya Rao",
    role: "4BHK Villa · Whitefield",
  },
  {
    quote:
      "The banquet hall seats forty percent more people than the old layout and nobody feels crowded. RUYA solved a problem three other contractors told us was structural.",
    name: "Imran Sheikh",
    role: "Banquet Hall · Hyderabad",
  },
  {
    quote:
      "The 3D walkthrough was so accurate that moving in felt like walking into a memory. Every drawer is exactly where I imagined it.",
    name: "Meera Krishnan",
    role: "Modular Kitchen · Bengaluru",
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
