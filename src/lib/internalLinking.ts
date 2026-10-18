import { regions, services, slugify } from './locationData';

export interface NearbySuburb {
  name: string;
  slug: string;
  regionName: string;
}

export interface ComplementaryService {
  id: string;
  name: string;
  shortName: string;
  description: string;
  tag: string;
  localImage?: string;
  heroImage?: string;
  contentImage1?: string;
  contentImage2?: string;
  contextualReason: string;
}

/**
 * Maps each service to its most natural complementary companion services.
 * For example:
 * - Tree Removal naturally pairs with Stump Grinding, Palm Tree Removal, and 24/7 Emergency Work.
 * - Stump Grinding pairs with Tree Removal and Wood Chipping & Mulching.
 */
export function getComplementaryServices(serviceId: string): ComplementaryService[] {
  const servicePairs: Record<string, { id: string; reason: string }[]> = {
    'tree-removal': [
      { id: 'stump-grinding', reason: 'Felling a tree leaves an invasive root ball. Our commercial grinders extract stumps 30cm below grade.' },
      { id: 'palm-tree-removal', reason: 'Many Townsville yards feature high-risk African Oil and Cocos palms alongside standard hardwoods.' },
      { id: 'tree-pruning-lopping', reason: 'Keep remaining canopy trees balanced and AS4373-compliant to prevent future tree failures.' },
      { id: 'emergency-tree-removal', reason: '24/7 priority emergency arborist response for high-risk or storm-compromised limbs.' },
    ],
    'stump-grinding': [
      { id: 'tree-removal', reason: 'Need the entire hazardous tree dismantled before grinding? We handle complex crane and climb removals.' },
      { id: 'wood-chipping-mulching', reason: 'Turn stump grindings and surface branches into nutrient-rich organic mulch for your gardens.' },
      { id: 'land-clearing', reason: 'Complete site preparation and subterranean root ball clearing for building envelopes and subdivisions.' },
    ],
    'palm-tree-removal': [
      { id: 'stump-grinding', reason: 'Palm root balls are dense and fibrous. Mechanical grinding stops root balls from damaging pipes and paving.' },
      { id: 'tree-pruning-lopping', reason: 'Selective canopy thinning and weight reduction for overhanging native trees on your boundaries.' },
      { id: 'tree-removal', reason: 'Complete dismantling and removal for non-palm tropical hardwoods and cyclone-damaged trees.' },
    ],
    'tree-pruning-lopping': [
      { id: 'tree-removal', reason: 'When deadwood or structural internal rot is too severe for pruning, safe complete removal is necessary.' },
      { id: 'palm-tree-removal', reason: 'De-nutting and dead frond stripping to keep tropical palms tidy and rodent-free.' },
      { id: 'wood-chipping-mulching', reason: 'High-volume on-site chipping to recycle pruned branches into moisture-retaining organic mulch.' },
    ],
    'emergency-tree-removal': [
      { id: 'tree-removal', reason: 'Scheduled, controlled dismantling for trees showing progressive lean or root plate failure.' },
      { id: 'wood-chipping-mulching', reason: 'Rapid green waste chipping to clear blocked driveways, roads, and storm-strewn yards.' },
      { id: 'tree-pruning-lopping', reason: 'Post-storm weight reduction and crown cleaning to restore balance to battered canopies.' },
    ],
    'wood-chipping-mulching': [
      { id: 'tree-pruning-lopping', reason: 'Regular seasonal pruning to supply your gardens with fresh, weed-free organic hardwood mulch.' },
      { id: 'land-clearing', reason: 'Broad acreage vegetation clearing and on-site whole-tree mulching for developers and acreages.' },
      { id: 'tree-removal', reason: 'Complete felling and on-site processing of hazardous trees into clean wood chips in minutes.' },
    ],
    'land-clearing': [
      { id: 'tree-removal', reason: 'Targeted removal of individual high-value or hazardous mature trees across civil developments.' },
      { id: 'stump-grinding', reason: 'Complete below-ground root ball eradication across building footprints and roadways.' },
      { id: 'wood-chipping-mulching', reason: 'Heavy commercial mulching to process cleared scrub into compliant soil stabilization layers.' },
    ],
  };

  const pairings = servicePairs[serviceId] || [
    { id: 'tree-removal', reason: 'Complete tree dismantling and removal.' },
    { id: 'stump-grinding', reason: 'Mechanical stump grinding below grade.' },
    { id: 'tree-pruning-lopping', reason: 'Canopy pruning to Australian Standards.' },
  ];

  const results: ComplementaryService[] = [];
  for (const pair of pairings) {
    const s = services.find((srv) => srv.id === pair.id);
    if (s) {
      results.push({
        ...s,
        contextualReason: pair.reason,
      });
    }
  }
  return results;
}

/**
 * Finds the region containing a given suburb and returns nearby sibling suburbs.
 * This establishes powerful local topical clusters for search engines and users.
 */
export function getNearbySuburbs(suburbName: string, limit: number = 6): NearbySuburb[] {
  // Find which region contains this suburb
  const parentRegion = regions.find(r => r.suburbs.includes(suburbName));
  
  if (!parentRegion) {
    // Fallback: return first N suburbs excluding current
    return regions[0].suburbs
      .filter(s => s !== suburbName)
      .slice(0, limit)
      .map(s => ({
        name: s,
        slug: slugify(s),
        regionName: regions[0].name,
      }));
  }

  // Get index of current suburb in region list
  const siblings = parentRegion.suburbs.filter(s => s !== suburbName);
  const currentIndex = parentRegion.suburbs.indexOf(suburbName);

  // Pick adjacent suburbs around the current index for realistic clustering
  const half = Math.floor(limit / 2);
  let startIndex = Math.max(0, currentIndex - half);
  let selected = siblings.slice(startIndex, startIndex + limit);

  // If not enough selected near the end, wrap from the beginning
  if (selected.length < limit) {
    const needed = limit - selected.length;
    const remaining = siblings.filter(s => !selected.includes(s));
    selected = [...selected, ...remaining.slice(0, needed)];
  }

  return selected.map(s => ({
    name: s,
    slug: slugify(s),
    regionName: parentRegion.name,
  }));
}

/**
 * Returns high-priority hub suburbs across Townsville for featured links.
 */
export const priorityHubSuburbs = [
  'Kirwan',
  'Annandale',
  'Aitkenvale',
  'Bushland Beach',
  'North Ward',
  'Magnetic Island',
  'Douglas',
  'Belgian Gardens',
  'Bohle Plains',
  'Deeragun',
  'Hermit Park',
  'Mundingburra',
];
