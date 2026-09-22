export const regions = [
  {
    name: "Townsville City",
    suburbs: [
      "Aitkenvale", "Annandale", "Belgian Gardens", "Castle Hill", "Cluden", 
      "Cosgrove", "Cranbrook", "Currajong", "Douglas", "Garbutt", "Gulliver", 
      "Heatley", "Hermit Park", "Hyde Park", "Idalia", "Mount Louisa", 
      "Mount St John", "Mount Stuart", "Mundingburra", "Murray", "Mysterton", 
      "North Ward", "Oonoonba", "Pallarenda", "Pimlico", "Railway Estate", 
      "Rosslea", "Rowes Bay", "South Townsville", "Stuart", "Town Common", 
      "Townsville West", "Vincent", "West End", "Wulguru"
    ]
  },
  {
    name: "Rural Townsville",
    suburbs: [
      "Alligator Creek", "Barringha", "Beach Holm", "Blue Hills", "Brookhill", 
      "Calcium", "Cape Cleveland", "Clemant", "Crimea", "Crystal Creek", 
      "Cungulla", "Granite Vale", "Gumlow", "Hervey Range", "Julago", "Lynam", 
      "Majors Creek", "Mount Elliot", "Nome", "Oak Valley", "Partington", 
      "Purono Park", "Rangewood", "Roseneath", "Ross River", "Rupertswood", 
      "Toonpan", "Woodstock"
    ]
  },
  {
    name: "Urban Thuringowa",
    suburbs: [
      "Alice River", "Bluewater", "Bohle", "Bohle Plains", "Bushland Beach", 
      "Condon", "Deeragun", "Kelso", "Kirwan", "Pinnacles", "Rasmussen", 
      "Thuringowa Central"
    ]
  },
  {
    name: "Rural Thuringowa",
    suburbs: [
      "Balgal Beach", "Black River", "Bluewater Park", "Burdell", "Jensen", 
      "Mount Low", "Mutarnee", "Paluma", "Rollingstone", "Saunders Beach", 
      "Shaw", "Toolakea", "Toomulla", "Yabulu"
    ]
  },
  {
    name: "Islands",
    suburbs: [
      "Arcadia", "Florence Bay", "Horseshoe Bay", "Magnetic Island", 
      "Nelly Bay", "Orpheus Island", "Palm Island", "Picnic Bay"
    ]
  }
];

// Flat list of all 97 suburbs
export const allSuburbs = regions.flatMap(r => r.suburbs);

export const services = [
  {
    id: "tree-removal",
    name: "Tree Removal",
    shortName: "Tree Removal",
    tag: "SAFE & CONTROLLED DISMANTLING",
    description: "Professional, safe, and efficient tree removal services for residential, commercial, and rural properties in Townsville.",
    localImage: "/Tree Removal.png",
    heroImage: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200",
    contentImage1: "https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?auto=format&fit=crop&q=80&w=800",
    contentImage2: "https://images.unsplash.com/photo-1543878087-0b1a13fb1eb8?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "stump-grinding",
    name: "Stump Grinding",
    shortName: "Stump Grinding",
    tag: "TERMITE & HAZARD PREVENTION",
    description: "Complete precision mechanical stump grinding below surface level to eliminate termite hubs and reclaim your yard.",
    localImage: "/stump grinding.png",
    heroImage: "https://images.unsplash.com/photo-1588698188164-3e9a53bcfae9?auto=format&fit=crop&q=80&w=1200",
    contentImage1: "https://images.unsplash.com/photo-1588698188164-3e9a53bcfae9?auto=format&fit=crop&q=80&w=800",
    contentImage2: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "palm-tree-removal",
    name: "Palm Tree Removal",
    shortName: "Palm Tree Care",
    tag: "TROPICAL PALM SPECIALISTS",
    description: "Specialised tropical palm pruning, dead frond removal, skinning, and complete palm tree removal across Townsville.",
    localImage: "/Palm Tree Removal.png",
    heroImage: "https://images.unsplash.com/photo-1498522271744-cdd435c13f24?auto=format&fit=crop&q=80&w=1200",
    contentImage1: "https://images.unsplash.com/photo-1622152349386-778396cddda4?auto=format&fit=crop&q=80&w=800",
    contentImage2: "https://images.unsplash.com/photo-1550535300-3168d18f5042?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "tree-pruning-lopping",
    name: "Tree Pruning & Lopping",
    shortName: "Pruning & Lopping",
    tag: "CANOPY HEALTH & CLEARANCE",
    description: "Structural canopy pruning, deadwood removal, powerline clearing, and crown thinning to Australian Standards AS4373-2007.",
    localImage: "/Tree Pruning and tree lopping.png",
    heroImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200",
    contentImage1: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80&w=800",
    contentImage2: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "emergency-tree-removal",
    name: "Emergency Tree Removal",
    shortName: "Emergency Work",
    tag: "24/7 RAPID STORM RESPONSE",
    description: "24/7 priority emergency arborist response for storm-damaged, fallen, or dangerously unstable trees across Townsville.",
    localImage: "/Emergency Work.png",
    heroImage: "https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&q=80&w=1200",
    contentImage1: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
    contentImage2: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "wood-chipping-mulching",
    name: "Wood Chipping & Mulching",
    shortName: "Mulching & Chipping",
    tag: "ORGANIC GARDEN MULCH",
    description: "High-capacity on-site wood chipping converting tree limbs and garden waste into clean, nutrient-dense organic mulch.",
    localImage: "/Mulching.png",
    heroImage: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=1200",
    contentImage1: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=800",
    contentImage2: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "land-clearing",
    name: "Land Clearing",
    shortName: "Land Clearing",
    tag: "SITE PREPARATION & CIVIL",
    description: "Comprehensive site preparation and vegetation clearing for subdivisions, acreage properties, firebreaks, and commercial builds.",
    localImage: "/Land Clearing.png",
    heroImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200",
    contentImage1: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80&w=800",
    contentImage2: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800"
  }
];

// Helper to slugify
export function slugify(text: string) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}
