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
    description: "Professional, safe, and efficient tree removal services.",
    heroImage: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "stump-removal-grinding",
    name: "Stump Removal & Grinding",
    description: "Complete stump grinding to leave your property clear and safe.",
    heroImage: "https://images.unsplash.com/photo-1588698188164-3e9a53bcfae9?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "palm-tree-removal",
    name: "Palm Tree Removal",
    description: "Specialised palm tree removal, pruning, and maintenance.",
    heroImage: "https://images.unsplash.com/photo-1498522271744-cdd435c13f24?auto=format&fit=crop&q=80&w=1200"
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
