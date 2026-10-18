import { slugify } from './locationData';
import type { SuburbEnvironmentalProfile, BespokeSuburbData } from './suburbIntelligence';

export const SITE_CANONICAL_DOMAIN = 'https://arbco-tree.vercel.app';

// ============================================================================
// Core Services SEO Details
// ============================================================================

export interface CoreServiceSeo {
  title: string;
  description: string;
  h1: string;
  h1Subtitle: string;
  canonical: string;
}

export const coreServicesSeo: Record<string, CoreServiceSeo> = {
  'tree-removal': {
    title: 'Tree Removal Townsville | $20M Insured Level 5 Arborists | Arbco',
    description: 'Expert tree removal in Townsville. Precision sectional dismantling, confined space crane rigging, and cyclone storm prep. Free quotes: 0456 579 811.',
    h1: 'Tree Removal Townsville',
    h1Subtitle: 'Precision Sectional Rigging, Confined Space Dismantling & Storm Protection',
    canonical: `${SITE_CANONICAL_DOMAIN}/services/tree-removal`,
  },
  'stump-grinding': {
    title: 'Stump Grinding Townsville | Termite-Safe Deep Root Removal | Arbco',
    description: 'Fast, deep mechanical stump grinding in Townsville. Eradicate subterranean termite nests 300mm+ below ground. Narrow gate access. Call 0456 579 811.',
    h1: 'Stump Grinding Townsville',
    h1Subtitle: 'Subterranean Termite Elimination, Deep Root Grinding & Replant-Ready Lawns',
    canonical: `${SITE_CANONICAL_DOMAIN}/services/stump-grinding`,
  },
  'palm-tree-removal': {
    title: 'Palm Tree Removal Townsville | Coconut, Cleaning & De-Nutting | Arbco',
    description: 'Safe palm removal, de-nutting, and frond cleaning across Townsville. Eliminate 20kg falling coconut hazards and bat colonies. Free quote: 0456 579 811.',
    h1: 'Palm Tree Removal & Maintenance Townsville',
    h1Subtitle: 'Hazardous Coconut Eradication, Crown De-Nutting & Frond Skinning',
    canonical: `${SITE_CANONICAL_DOMAIN}/services/palm-tree-removal`,
  },
  'tree-pruning-lopping': {
    title: 'Tree Pruning & Lopping Townsville | AS4373 Certified Arborists | Arbco',
    description: 'Certified canopy pruning and lopping to AS4373 standards in Townsville. Pre-cyclone clearance, deadwooding, and powerline setbacks. Call 0456 579 811.',
    h1: 'Tree Pruning & Lopping Townsville',
    h1Subtitle: 'Australian Standard AS4373 Canopy Care, Cyclone Reductions & Structural Health',
    canonical: `${SITE_CANONICAL_DOMAIN}/services/tree-pruning-lopping`,
  },
  'emergency-tree-removal': {
    title: '24/7 Emergency Tree Removal Townsville | Rapid Storm Response | Arbco',
    description: '24/7 emergency tree removal in Townsville. Rapid response for cyclone damage, trees fallen on roofs, powerlines, and fences. Direct insurance assistance.',
    h1: '24/7 Emergency Tree Removal Townsville',
    h1Subtitle: 'Rapid Cyclone Response, Structural Danger Clearance & Insurance Documentation',
    canonical: `${SITE_CANONICAL_DOMAIN}/services/emergency-tree-removal`,
  },
  'wood-chipping-mulching': {
    title: 'Commercial Wood Chipping Townsville | High-Tonnage Mulching | Arbco',
    description: 'Commercial wood chipping and rich organic mulch delivery in Townsville. Rapid on-site processing for residential and acreage yards. Call 0456 579 811.',
    h1: 'Wood Chipping & Mulch Delivery Townsville',
    h1Subtitle: 'Industrial On-Site Green Waste Processing & Weed-Free Forest Mulch Supply',
    canonical: `${SITE_CANONICAL_DOMAIN}/services/wood-chipping-mulching`,
  },
  'land-clearing': {
    title: 'Land Clearing Townsville | Acreage Forestry Mulching & APZ | Arbco',
    description: 'Acreage, residential, and commercial land clearing in Townsville. Forestry mulching, 20m bushfire APZ firebreaks, and TCC DA compliance. Call 0456 579 811.',
    h1: 'Land Clearing & Forestry Mulching Townsville',
    h1Subtitle: 'Acreage Bushfire APZ Buffers, Subdivision Preparation & TCC DA Compliance',
    canonical: `${SITE_CANONICAL_DOMAIN}/services/land-clearing`,
  },
};

// ============================================================================
// 56 Distinct Micro-Zone & Service Hook Matrix
// ============================================================================

interface ZoneServiceHook {
  titleHook: string;
  descTemplate: (suburb: string) => string;
  h1Subtitle: string;
}

const zoneHooks: Record<string, Record<string, ZoneServiceHook>> = {
  'granite-slopes': {
    'tree-removal': {
      titleHook: 'Steep Slope & Crane Rigging',
      descTemplate: (suburb) =>
        `Need tree removal on ${suburb}'s steep granite slopes? $20M insured Level 5 arborists with crane & high-angle rigging. Free quote: 0456 579 811.`,
      h1Subtitle: 'Steep Slope, Rock Scree & High-Angle Crane Rigging Specialists',
    },
    'stump-grinding': {
      titleHook: 'Rocky Granite Shelf Removal',
      descTemplate: (suburb) =>
        `Specialist stump grinding on rocky ${suburb} terrain. Heavy-duty grinders eradicate root flares around granite boulders. Call 0456 579 811.`,
      h1Subtitle: 'Subterranean Root Grinding on Granite Shelves & Retaining Walls',
    },
    'palm-tree-removal': {
      titleHook: 'High-Angle Cocos Palm Removal',
      descTemplate: (suburb) =>
        `Safe palm removal on steep ${suburb} hillsides. Complete eradication of Cocos and Golden Canes on difficult slopes. Free quote: 0456 579 811.`,
      h1Subtitle: 'Hillside Palm Dismantling, Crown De-Nutting & Frond Clearing',
    },
    'tree-pruning-lopping': {
      titleHook: 'AS4373 Hillside Canopy Trimming',
      descTemplate: (suburb) =>
        `Certified AS4373 canopy pruning in ${suburb}. Protect hillside views and reduce cyclone wind drag safely. Call Arbco on 0456 579 811.`,
      h1Subtitle: 'AS4373 Hillside Canopy Thinning, View Clearance & Cyclone Preparation',
    },
    'emergency-tree-removal': {
      titleHook: '24/7 Steep Terrain Storm Care',
      descTemplate: (suburb) =>
        `24/7 emergency storm tree clearing on ${suburb} slopes. Rapid stabilization of fallen timber threatening structures. Call 0456 579 811.`,
      h1Subtitle: '24/7 Urgent Storm Callouts & High-Angle Hazard Stabilization',
    },
    'wood-chipping-mulching': {
      titleHook: 'On-Site Hillside Mulch Processing',
      descTemplate: (suburb) =>
        `Commercial wood chipping on sloped ${suburb} properties. Turn hillside tree debris into rich organic garden mulch. Call 0456 579 811.`,
      h1Subtitle: 'On-Site Hillside Debris Chipping & Soil-Binding Mulch Processing',
    },
    'land-clearing': {
      titleHook: 'Hillside Block Clearing & Erosion',
      descTemplate: (suburb) =>
        `Specialized hillside land clearing in ${suburb}. Controlled vegetation removal preventing granite scree erosion. Call 0456 579 811.`,
      h1Subtitle: 'Controlled Hillside Clearing & TCC Erosion Scheme Compliance',
    },
  },

  'coastal-maritime': {
    'tree-removal': {
      titleHook: 'Cyclone-Safe Coastal Rigging',
      descTemplate: (suburb) =>
        `Coastal tree removal in ${suburb}. Qualified arborists safely dismantling casuarinas and paperbarks in loose sands. Call 0456 579 811.`,
      h1Subtitle: 'Loose Sand Rigging & Saltwater-Hardy Tree Dismantling',
    },
    'stump-grinding': {
      titleHook: 'Sandy Soil Root Extraction',
      descTemplate: (suburb) =>
        `Deep stump grinding in ${suburb}'s coastal sands. Eradicate roots 300mm+ below ground to prevent termite invasion. Call 0456 579 811.`,
      h1Subtitle: 'Deep Subterranean Stump Grinding in Coastal Sands & Dune Soils',
    },
    'palm-tree-removal': {
      titleHook: 'Coconut & Beach Palm Removal',
      descTemplate: (suburb) =>
        `Specialist palm removal & de-nutting in ${suburb}. Eliminate 20kg falling coconuts & cyclone hazards on sandy blocks. Call 0456 579 811.`,
      h1Subtitle: 'Beachfront Coconut Palm Eradication & Seasonal Crown De-Nutting',
    },
    'tree-pruning-lopping': {
      titleHook: 'Coastal Windbreak & Deadwooding',
      descTemplate: (suburb) =>
        `Certified coastal tree pruning in ${suburb}. AS4373 canopy thinning to withstand severe maritime gales and cyclones. Call 0456 579 811.`,
      h1Subtitle: 'AS4373 Maritime Canopy Thinning & Storm Windbreak Optimization',
    },
    'emergency-tree-removal': {
      titleHook: '24/7 Cyclone Wind Response',
      descTemplate: (suburb) =>
        `24/7 emergency storm response across ${suburb}. Rapid clearance of blown-over coastal paperbarks and palms. Call 0456 579 811.`,
      h1Subtitle: '24/7 Rapid Cyclone Wind Response & Maritime Tree Clearance',
    },
    'wood-chipping-mulching': {
      titleHook: 'Coastal Debris Chipping & Mulch',
      descTemplate: (suburb) =>
        `Fast commercial wood chipping in ${suburb}. Process fibrous palms and storm debris into moisture-retaining mulch. Call 0456 579 811.`,
      h1Subtitle: 'Commercial Green Waste Chipping & Coastal Garden Mulch Supply',
    },
    'land-clearing': {
      titleHook: 'Beachfront & Foreshore Clearing',
      descTemplate: (suburb) =>
        `Professional coastal land clearing in ${suburb}. Compliant vegetation management observing TCC coastal hazard zones. Call 0456 579 811.`,
      h1Subtitle: 'TCC Coastal Hazard Management & Beachfront Block Clearing',
    },
  },

  'alluvial-floodplain': {
    'tree-removal': {
      titleHook: 'Riverbank & Clay Soil Rigging',
      descTemplate: (suburb) =>
        `Tree removal in ${suburb}'s heavy clay soils. Certified climbers and rigging specialists protecting homes & fences. Call 0456 579 811.`,
      h1Subtitle: 'Riparian Corridor Rigging & Reactive Clay Allotment Tree Care',
    },
    'stump-grinding': {
      titleHook: 'Termite-Safe Clay Soil Removal',
      descTemplate: (suburb) =>
        `Stump grinding in ${suburb}. Eliminate subterranean termite nesting grounds 300mm+ below cracking clay soils. Free quote: 0456 579 811.`,
      h1Subtitle: 'Deep Stump & Lateral Root Grinding in Heavy Alluvial Clay Soils',
    },
    'palm-tree-removal': {
      titleHook: 'Date & Cocos Palm Removal',
      descTemplate: (suburb) =>
        `Expert palm removal in ${suburb}. Safely eradicate overgrown Cocos, Date, and Golden Cane palms near driveways. Call 0456 579 811.`,
      h1Subtitle: 'Suburban Palm Dismantling, Bat Roost Clearing & Seed Pod Removal',
    },
    'tree-pruning-lopping': {
      titleHook: 'Mature Rain Tree Canopy Thinning',
      descTemplate: (suburb) =>
        `AS4373 tree pruning in ${suburb}. Crown thinning and deadwood removal for mature Rain Trees, figs, and African Mahoganies. Call 0456 579 811.`,
      h1Subtitle: 'Mature Canopy Deadwooding & AS4373 Riverbank Tree Maintenance',
    },
    'emergency-tree-removal': {
      titleHook: '24/7 Riverbank Storm Callouts',
      descTemplate: (suburb) =>
        `24/7 emergency tree removal in ${suburb}. Immediate dispatch for storm-damaged riverbank limbs on roofs and fences. Call 0456 579 811.`,
      h1Subtitle: '24/7 Emergency Storm Damage Response & Powerline Clearances',
    },
    'wood-chipping-mulching': {
      titleHook: 'River Alluvial Green Waste Disposal',
      descTemplate: (suburb) =>
        `Commercial wood chipping in ${suburb}. High-volume processing of tree branches into rich, moisture-locking organic mulch. Call 0456 579 811.`,
      h1Subtitle: 'High-Volume On-Site Wood Chipping & Clean Garden Mulch Delivery',
    },
    'land-clearing': {
      titleHook: 'Commercial & Riverfront Clearing',
      descTemplate: (suburb) =>
        `Urban and riparian block clearing in ${suburb}. Strict compliance with Townsville City Council environmental overlays. Call 0456 579 811.`,
      h1Subtitle: 'TCC Riparian Corridor Alignment & Urban Allotment Site Clearing',
    },
  },

  'outer-masterplanned': {
    'tree-removal': {
      titleHook: 'Narrow Access & Zero-Lot Care',
      descTemplate: (suburb) =>
        `Tight-access tree removal in ${suburb}. Sectional dismantling for compact 400m² yards with zero lot line boundaries. Call 0456 579 811.`,
      h1Subtitle: 'Zero-Lot Line Dismantling & Narrow 800mm Side Access Specialists',
    },
    'stump-grinding': {
      titleHook: '800mm Gate Access & Deep Removal',
      descTemplate: (suburb) =>
        `Deep stump grinding in ${suburb}. Compact machines fit 800mm pedestrian gates to eradicate termite nests 300mm+ deep. Call 0456 579 811.`,
      h1Subtitle: 'Pedestrian Gate (800mm) Access & Precision Underground Utility Care',
    },
    'palm-tree-removal': {
      titleHook: 'Narrow Lot Golden Cane Removal',
      descTemplate: (suburb) =>
        `Palm removal in ${suburb}'s modern developments. Clear overgrown Golden Canes and Foxtails safely off boundary fences. Call 0456 579 811.`,
      h1Subtitle: 'Boundary Fence Palm Clearing & Compact Courtyard Root Extraction',
    },
    'tree-pruning-lopping': {
      titleHook: 'Boundary Clearance & Canopy Care',
      descTemplate: (suburb) =>
        `Certified canopy pruning in ${suburb}. AS4373 structural shaping and boundary clearance for young suburban shade trees. Call 0456 579 811.`,
      h1Subtitle: 'AS4373 Structural Tree Pruning & Compact Property Boundary Clearance',
    },
    'emergency-tree-removal': {
      titleHook: '24/7 Compact Lot Storm Care',
      descTemplate: (suburb) =>
        `24/7 emergency tree removal in ${suburb}. Fast storm response for snapped saplings and limbs threatening zero-lot walls. Call 0456 579 811.`,
      h1Subtitle: '24/7 Master-Planned Estate Storm Response & Urgent Boundary Care',
    },
    'wood-chipping-mulching': {
      titleHook: 'Narrow Gate Chipping & Mulch',
      descTemplate: (suburb) =>
        `Fast on-site wood chipping in ${suburb}. Compact chipping equipment for master-planned streets with pristine rake-outs. Call 0456 579 811.`,
      h1Subtitle: 'Compact Residential Wood Chipping & Clean Suburb Garden Mulch',
    },
    'land-clearing': {
      titleHook: 'Residential Block Clearing & DA',
      descTemplate: (suburb) =>
        `Residential block clearing in ${suburb}. Complete site preparation, civil scraping, and TCC DA compliance for new builds. Call 0456 579 811.`,
      h1Subtitle: 'New Home Build Preparation & TCC Approved Subdivision Clearing',
    },
  },

  'upper-catchment': {
    'tree-removal': {
      titleHook: 'Storm Canopy & Safe Dismantling',
      descTemplate: (suburb) =>
        `Tree removal in ${suburb}. Qualified arborists dismantling brittle poincianas and gums exposed to Hervey Range squalls. Call 0456 579 811.`,
      h1Subtitle: 'Hervey Range Squall Buffering & Large Suburban Canopy Dismantling',
    },
    'stump-grinding': {
      titleHook: 'Lawn & Pool-Safe Root Grinding',
      descTemplate: (suburb) =>
        `Stump grinding in ${suburb}. Deep root eradication 300mm+ below turf without damaging swimming pools or irrigation. Call 0456 579 811.`,
      h1Subtitle: 'Turf Replant Grinding & Pool Perimeter Lateral Root Eradication',
    },
    'palm-tree-removal': {
      titleHook: 'Bat Roost & Seed Pod Clearing',
      descTemplate: (suburb) =>
        `Safe palm removal in ${suburb}. Eradicate multi-stem Golden Canes and messy Cocos palms attracting fruit bats. Free quote: 0456 579 811.`,
      h1Subtitle: 'Suburban Palm Clump Eradication & Fruit Bat Roost Abatement',
    },
    'tree-pruning-lopping': {
      titleHook: 'Pre-Cyclone Canopy Clearance',
      descTemplate: (suburb) =>
        `Certified tree pruning in ${suburb} to AS4373 standards. Pre-cyclone deadwooding and powerline clearance for peace of mind. Call 0456 579 811.`,
      h1Subtitle: 'AS4373 Pre-Monsoon Canopy Thinning & Overhead Cable Clearances',
    },
    'emergency-tree-removal': {
      titleHook: '24/7 Roof & Powerline Hazard Care',
      descTemplate: (suburb) =>
        `24/7 emergency tree removal in ${suburb}. Rapid callouts for storm-felled poincianas on driveways, roofs, and fences. Call 0456 579 811.`,
      h1Subtitle: '24/7 Rapid Monsoon Response & Residential Structural Clearance',
    },
    'wood-chipping-mulching': {
      titleHook: 'Fast Yard Chipping & Site Cleanup',
      descTemplate: (suburb) =>
        `Commercial wood chipping in ${suburb}. High-capacity chippers turn yard debris into weed-free garden mulch on-site. Call 0456 579 811.`,
      h1Subtitle: 'High-Capacity Green Waste Chipping & Spotless Yard Cleanup',
    },
    'land-clearing': {
      titleHook: 'Suburban Subdivision Clearing',
      descTemplate: (suburb) =>
        `Block clearing in ${suburb}. Fast, compliant clearing for residential subdivisions, shed slabs, and dual occupancies. Call 0456 579 811.`,
      h1Subtitle: 'Subdivision Earthworks & Residential Block Vegetation Clearing',
    },
  },

  'rural-acreage': {
    'tree-removal': {
      titleHook: 'Acreage Firebreaks & Rigging',
      descTemplate: (suburb) =>
        `Acreage tree removal in ${suburb}. Heavy-duty machinery for large ironbarks, bloodwoods, and 20m firebreak asset protection. Call 0456 579 811.`,
      h1Subtitle: 'Acreage Eucalypt Dismantling & 20m Bushfire APZ Firebreak Clearing',
    },
    'stump-grinding': {
      titleHook: 'Acreage & Paddock Stump Removal',
      descTemplate: (suburb) =>
        `Commercial stump grinding on ${suburb} acreage. Eradicate multiple large hardwood stumps in paddocks and fence-lines. Call 0456 579 811.`,
      h1Subtitle: 'Multi-Acre Paddock Hardwood Grinding & Fence-Line Stump Eradication',
    },
    'palm-tree-removal': {
      titleHook: 'Wild Palm & Paddock Clearing',
      descTemplate: (suburb) =>
        `Acreage palm removal in ${suburb}. Eradicate feral date palms and invasive clusters threatening livestock paddocks. Call 0456 579 811.`,
      h1Subtitle: 'Acreage Wild Palm Removal & Semi-Rural Weed Eradication',
    },
    'tree-pruning-lopping': {
      titleHook: 'Firebreak & Boundary Branch Care',
      descTemplate: (suburb) =>
        `Certified acreage tree pruning in ${suburb}. Crown reductions, deadwooding, and fence-line clearing to AS4373 standards. Call 0456 579 811.`,
      h1Subtitle: 'AS4373 Acreage Canopy Reduction, Access Track & Fence Clearance',
    },
    'emergency-tree-removal': {
      titleHook: '24/7 Acreage Storm Callouts',
      descTemplate: (suburb) =>
        `24/7 emergency tree clearing in ${suburb}. Rapid removal of massive blown-down gums blocking tracks, sheds, and gates. Call 0456 579 811.`,
      h1Subtitle: '24/7 Acreage Roadway Clearance & Heavy Storm Timber Processing',
    },
    'wood-chipping-mulching': {
      titleHook: 'High-Volume Acreage Mulching',
      descTemplate: (suburb) =>
        `High-tonnage wood chipping on ${suburb} acreage. Industrial chippers clear massive fallen logs into rich organic mulch. Call 0456 579 811.`,
      h1Subtitle: 'High-Tonnage Commercial Wood Chipping & Whole-Tree Mulching',
    },
    'land-clearing': {
      titleHook: 'Acreage Forestry Mulching & APZ',
      descTemplate: (suburb) =>
        `Acreage land clearing & forestry mulching in ${suburb}. 20m bushfire APZ firebreaks & TCC compliant clearing. Free quotes: 0456 579 811.`,
      h1Subtitle: 'Tracked Forestry Mulching, Paddock Recovery & Bushfire APZ Zones',
    },
  },

  'northern-beaches': {
    'tree-removal': {
      titleHook: 'Coastal Highway & Storm Rigging',
      descTemplate: (suburb) =>
        `Specialist tree removal in ${suburb}. Certified Level 5 arborists handling gale-exposed melaleucas and coastal gums. Call 0456 579 811.`,
      h1Subtitle: 'Northern Coastal Highway Rigging & Severe Gale Tree Dismantling',
    },
    'stump-grinding': {
      titleHook: 'Beachfront Stump & Root Removal',
      descTemplate: (suburb) =>
        `Deep stump grinding across ${suburb}. Complete root eradication 300mm+ below sandy soils to prevent termite colonies. Call 0456 579 811.`,
      h1Subtitle: 'Beachfront & Paperbark Swamp Root Grinding (300mm+ Below Grade)',
    },
    'palm-tree-removal': {
      titleHook: 'Coastal Palm & Frond Clearing',
      descTemplate: (suburb) =>
        `Palm removal and de-nutting in ${suburb}. Eliminate heavy coconuts and decaying fronds before tropical storm season. Call 0456 579 811.`,
      h1Subtitle: 'Northern Beaches Coconut Eradication & Cyclonic Frond Trimming',
    },
    'tree-pruning-lopping': {
      titleHook: 'Beachfront Windbreak Thinning',
      descTemplate: (suburb) =>
        `AS4373 certified tree pruning in ${suburb}. Expert crown thinning that preserves salt-hardy coastal windbreaks. Call 0456 579 811.`,
      h1Subtitle: 'AS4373 Salt-Spray Canopy Preservation & Ocean Gale Reductions',
    },
    'emergency-tree-removal': {
      titleHook: '24/7 Highway & Beach Storm Care',
      descTemplate: (suburb) =>
        `24/7 emergency tree removal in ${suburb}. Immediate response for wind-thrown trees blocking access roads and properties. Call 0456 579 811.`,
      h1Subtitle: '24/7 Northern Beaches Emergency Dispatch & Storm Tree Removal',
    },
    'wood-chipping-mulching': {
      titleHook: 'Bulk Debris Chipping & Mulch',
      descTemplate: (suburb) =>
        `Commercial wood chipping in ${suburb}. High-capacity equipment processes coastal timber into premium garden mulch on-site. Call 0456 579 811.`,
      h1Subtitle: 'High-Capacity Coastal Debris Chipping & Salt-Resistant Mulch Supply',
    },
    'land-clearing': {
      titleHook: 'Coastal Highway Block Clearing',
      descTemplate: (suburb) =>
        `Acreage and coastal block clearing in ${suburb}. TCC-compliant vegetation management with tracked forestry mulching. Call 0456 579 811.`,
      h1Subtitle: 'Highway Corridor Acreage Clearing & Coastal Bushfire Zone Buffers',
    },
  },

  'offshore-islands': {
    'tree-removal': {
      titleHook: 'Island Barge & Protected Pines',
      descTemplate: (suburb) =>
        `Tree removal in ${suburb} with complete vehicular barge logistics. Qualified arborists managing native hoop pines & storm hazards. Call 0456 579 811.`,
      h1Subtitle: 'Island Barge Logistics & Protected Native Hoop Pine Care',
    },
    'stump-grinding': {
      titleHook: 'Island Equipment & Deep Grinding',
      descTemplate: (suburb) =>
        `Stump grinding in ${suburb}. Specialized island-transported machinery grinding deep roots below granite crevices. Call 0456 579 811.`,
      h1Subtitle: 'Island-Transported Mechanical Stump Grinding in Rocky Soils',
    },
    'palm-tree-removal': {
      titleHook: 'Island Coconut & Palm Solutions',
      descTemplate: (suburb) =>
        `Safe palm removal in ${suburb}. Eliminate hazardous 20kg falling coconuts and dead fronds from island guest villas. Call 0456 579 811.`,
      h1Subtitle: 'Island Resort & Residential Coconut Eradication & Crown De-Nutting',
    },
    'tree-pruning-lopping': {
      titleHook: 'Island Canopy & Salt-Hardy Care',
      descTemplate: (suburb) =>
        `Certified tree pruning in ${suburb} to AS4373 standards. Salt-spray thinning and cyclone canopy reduction on island properties. Call 0456 579 811.`,
      h1Subtitle: 'AS4373 Island Canopy Thinning & National Park Interface Care',
    },
    'emergency-tree-removal': {
      titleHook: '24/7 Island Cyclone Response',
      descTemplate: (suburb) =>
        `24/7 emergency tree clearing across ${suburb}. Dedicated storm response for island homes, roads, and resort precincts. Call 0456 579 811.`,
      h1Subtitle: '24/7 Island Cyclone Emergency Dispatch & Road Access Clearance',
    },
    'wood-chipping-mulching': {
      titleHook: 'Island Green Waste & Chipping',
      descTemplate: (suburb) =>
        `Commercial wood chipping in ${suburb}. Eliminate costly barge green waste transfer with on-site mulching. Call 0456 579 811.`,
      h1Subtitle: 'On-Site Island Mulching & Cost-Saving Green Waste Chipping',
    },
    'land-clearing': {
      titleHook: 'Island Conservation Buffer Clearing',
      descTemplate: (suburb) =>
        `Specialized land clearing in ${suburb}. Rigorous compliance with TCC Magnetic Island Natural Values & National Park overlays. Call 0456 579 811.`,
      h1Subtitle: 'TCC Natural Values Compliance & Island Eco-Conscious Clearing',
    },
  },
};

// ============================================================================
// Public Suburb SEO Generators
// ============================================================================

export function generateSuburbSeoTitle(
  suburbName: string,
  serviceId: string,
  serviceName: string,
  zoneKey: string,
  bespokeData?: BespokeSuburbData
): string {
  const zoneConfig = zoneHooks[zoneKey] || zoneHooks['alluvial-floodplain'];
  const hookData = zoneConfig[serviceId] || zoneConfig['tree-removal'];

  // For long service names, condense display for title tag efficiency
  // e.g. "Wood Chipping & Mulching" -> "Wood Chipping"
  const cleanServiceName = serviceName.replace(' & Mulching', '');

  // Base: "{ServiceName} {SuburbName} | {Hook} | Arbco"
  let title = `${cleanServiceName} ${suburbName} | ${hookData.titleHook} | Arbco`;

  // If title is a bit long (> 68 chars), drop the brand suffix
  if (title.length > 68) {
    title = `${cleanServiceName} ${suburbName} | ${hookData.titleHook}`;
  }

  // If still long (> 68 chars), condense hook
  if (title.length > 68) {
    const condensedHook = hookData.titleHook.split('&')[0].trim();
    title = `${cleanServiceName} ${suburbName} | ${condensedHook} | Arbco`;
    if (title.length > 68) {
      title = `${cleanServiceName} ${suburbName} | ${condensedHook}`;
    }
  }

  return title;
}

export function generateSuburbMetaDescription(
  suburbName: string,
  serviceId: string,
  serviceName: string,
  env: SuburbEnvironmentalProfile,
  bespokeData: any,
  zoneKey: string
): string {
  const zoneConfig = zoneHooks[zoneKey] || zoneHooks['alluvial-floodplain'];
  const hookData = zoneConfig[serviceId] || zoneConfig['tree-removal'];

  return hookData.descTemplate(suburbName);
}

export function generateSuburbH1Subtitle(
  serviceId: string,
  zoneKey: string
): string {
  const zoneConfig = zoneHooks[zoneKey] || zoneHooks['alluvial-floodplain'];
  const hookData = zoneConfig[serviceId] || zoneConfig['tree-removal'];
  return hookData.h1Subtitle;
}

export function generateSuburbCanonical(
  serviceId: string,
  suburbName: string
): string {
  return `${SITE_CANONICAL_DOMAIN}/service-areas/${serviceId}-${slugify(suburbName)}`;
}
