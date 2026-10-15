import React from 'react';

// ============================================================================
// Types
// ============================================================================

export interface SuburbEnvironmentalProfile {
  zoneName: string;
  soilType: string;
  windExposure: string;
  dominantCanopy: string[];
  dominantPalms: string[];
  accessConstraint: string;
  councilOverlay: string;
}

export interface SuburbContentResult {
  h2: string;
  introParagraphs: string[];
  environmentalProfile: SuburbEnvironmentalProfile;
  serviceFocusHeading: string;
  serviceFocusParagraphs: string[];
  propertyAndAccessHeading: string;
  propertyAndAccessParagraphs: string[];
  councilAndSafetyHeading: string;
  councilAndSafetyParagraphs: string[];
  whyChoosePoints: { title: string; desc: string }[];
  processSteps: { title: string; desc: string }[];
  faqs: { question: string; answer: string }[];
  ctaHeadline: string;
  ctaText: string;
}

// ============================================================================
// 8 Verified Townsville Ecological & Geographic Micro-Zones
// ============================================================================

const microZones: Record<string, SuburbEnvironmentalProfile> = {
  'coastal-maritime': {
    zoneName: 'Coastal Maritime & Halifax / Cleveland Bay',
    soilType: 'Loose coastal marine sands, calcareous shell grit, and high saline water tables',
    windExposure: 'High maritime exposure with severe tropical cyclone wind gust vulnerability',
    dominantCanopy: ['Broad-Leaved Paperbark (Melaleuca quinquenervia)', 'Beach Casuarina (Casuarina equisetifolia)', 'Cottonwood Hibiscus (Talipariti tiliaceum)', 'Tamarind'],
    dominantPalms: ['Coconut Palms (Cocos nucifera)', 'Alexander Palms (Archontophoenix alexandrae)', 'Cuban Royal Palms', 'Cabbage Fan Palms'],
    accessConstraint: 'Sandy access tracks, coastal wind-funneling around beachfront homes, and pool perimeter fences',
    councilOverlay: 'TCC Coastal Hazard & Marine Erosion Management Overlay'
  },
  'granite-slopes': {
    zoneName: 'Granite Slopes & Hillside Ridges',
    soilType: 'Skeletal decomposed granite, surface rock shelves, and granite boulder scree',
    windExposure: 'Elevated ridge-top gusts, thermal updrafts, and accelerated storm downdrafts',
    dominantCanopy: ['Pink Bloodwood (Corymbia intermedia)', 'Narrow-Leaved Red Ironbark (Eucalyptus crebra)', 'Cocky Apple (Planchonia careya)', 'Native Fig (Ficus opposita)'],
    dominantPalms: ['Cocos Palm (Syagrus romanzoffiana)', 'Golden Cane Clumps (Dypsis lutescens)'],
    accessConstraint: 'Steep driveway inclines (15-25%+ grades), split-level retaining walls, and restricted crane outrigger pads',
    councilOverlay: 'TCC Steep Land & Landslide Hazard Overlay'
  },
  'alluvial-floodplain': {
    zoneName: 'Inner Urban & Ross River Floodplain',
    soilType: 'Heavy cracking alluvial clay, river silt, and waterlogged sub-soils during monsoon',
    windExposure: 'Moderate urban windward exposure with localized micro-burst turbulence around river bends',
    dominantCanopy: ['Weeping Tea Tree (Melaleuca leucadendra)', 'Rain Tree (Albizia saman)', 'African Mahogany (Khaya senegalensis)', 'Mature Mango (Mangifera indica)', 'Weeping Fig (Ficus benjamina)'],
    dominantPalms: ['Date Palms (Phoenix dactylifera)', 'Golden Cane Palms', 'Foxtail Palms (Wodyetia bifurcata)'],
    accessConstraint: 'Narrow Queenslander side driveways (<2.4m clearance), overhead power cables, and boundary fences',
    councilOverlay: 'TCC Riparian Corridor & Waterway Vegetation Protection Scheme'
  },
  'outer-masterplanned': {
    zoneName: 'Outer Master-Planned Urban Growth Corridors',
    soilType: 'Compacted urban clay fill, subsoil duplex formations, and engineered topsoil',
    windExposure: 'Exposed open savannah plains with minimal mature windbreak buffers',
    dominantCanopy: ['Fast-growing developer-planted Eucalypts', 'Bottle Trees (Brachychiton)', 'Golden Penda (Xanthostemon chrysanthus)', 'Umbrella Trees'],
    dominantPalms: ['Foxtail Palms', 'Alexander Palms', 'Pygmy Date Palms (Phoenix roebelenii)'],
    accessConstraint: 'Zero lot lines, 350-500m² compact allotments, side pedestrian gates (820-900mm), and underground NBN/conduits',
    councilOverlay: 'TCC Standard Urban Residential Subdivision Building Regulations'
  },
  'upper-catchment': {
    zoneName: 'Upper Catchment & Western Residential Suburbs',
    soilType: 'Alluvial sandy loams over mottled clay, prone to seasonal dry shrink and wet swelling',
    windExposure: 'Direct exposure to monsoon storms descending from the Hervey Range gap',
    dominantCanopy: ['Poinciana (Delonix regia)', 'Moreton Bay Ash (Corymbia tessellaris)', 'African Mahogany', 'Broad-Leaved Paperbark'],
    dominantPalms: ['Dense multi-stem Golden Cane clumps', 'Cocos Palms', 'Manila Palms (Adonidia merrillii)'],
    accessConstraint: 'Suburban double-gate access (up to 1.8m), proximity to swimming pools, sheds, and underground drainage easements',
    councilOverlay: 'TCC Urban Tree Canopy Conservation & Storm Preparedness Guidelines'
  },
  'rural-acreage': {
    zoneName: 'Rural Acreage & Dry Sclerophyll Bushland',
    soilType: 'Deep decomposed gravelly loams, rocky outcrops, and seasonal creek beds',
    windExposure: 'Full open-country storm exposure and dry, high-velocity bushfire winds',
    dominantCanopy: ['Poplar Box (Eucalyptus populnea)', 'Ghost Gum (Corymbia aparrerinja)', 'Narrow-Leaved Ironbark', 'Red River Gum (Eucalyptus camaldulensis)', 'Chinee Apple (Ziziphus mauritiana)'],
    dominantPalms: ['Self-sown Date Palms', 'Livistona species'],
    accessConstraint: 'Unsealed rural tracks, barbed-wire boundary fencing, stock paddocks, and heavy equipment access across culverts',
    councilOverlay: 'TCC Bushfire Hazard Reduction & Rural Vegetation Clearing Exemptions'
  },
  'northern-beaches': {
    zoneName: 'Northern Beaches Hamlets & Highway Corridor',
    soilType: 'Interspersed coastal sands, dark alluvial plains, and melaleuca paperbark swamps',
    windExposure: 'Severe coastal squalls and direct ocean gale exposure from the north-east',
    dominantCanopy: ['Melaleuca quinquenervia', 'Coastal She-Oak', 'Weeping Paperbark', 'Swamp Bloodwood', 'Burdekin Plum (Pleiogynium timorense)'],
    dominantPalms: ['Coconut Palms', 'Seaforthia Palms', 'Wild Golden Canes'],
    accessConstraint: 'Extended transit from central Townsville, high water table bogging risk, and large volume on-site processing needs',
    councilOverlay: 'TCC Coastal Protection & Significant Vegetation Overlay'
  },
  'offshore-islands': {
    zoneName: 'Offshore Cleveland Bay & Tropical Islands',
    soilType: 'Granitic boulders, coarse maritime sand, and fractured rock crevices',
    windExposure: 'Unshielded 360-degree oceanic maritime exposure and Category 3-5 cyclone vulnerability',
    dominantCanopy: ['Native Hoop Pine (Araucaria cunninghamii)', 'White Beech', 'Poplar Gum (Eucalyptus alba)', 'Forest Red Gum (Eucalyptus tereticornis)'],
    dominantPalms: ['Naturalized Coconut Palms', 'Cabbage Tree Palms (Livistona australis)'],
    accessConstraint: 'Vehicular ferry/barge transport logistics from Ross Street, restricted road gross weight limits, and national park interfaces',
    councilOverlay: 'Magnetic Island Natural Values & National Park Conservation Buffer Overlays'
  }
};

// ============================================================================
// Suburb to Micro-Zone Mapping for All 97 Suburbs
// ============================================================================

const suburbZoneMap: Record<string, string> = {
  // Townsville City (35)
  'Aitkenvale': 'alluvial-floodplain',
  'Annandale': 'alluvial-floodplain',
  'Belgian Gardens': 'coastal-maritime',
  'Castle Hill': 'granite-slopes',
  'Cluden': 'alluvial-floodplain',
  'Cosgrove': 'outer-masterplanned',
  'Cranbrook': 'alluvial-floodplain',
  'Currajong': 'alluvial-floodplain',
  'Douglas': 'alluvial-floodplain',
  'Garbutt': 'alluvial-floodplain',
  'Gulliver': 'alluvial-floodplain',
  'Heatley': 'alluvial-floodplain',
  'Hermit Park': 'alluvial-floodplain',
  'Hyde Park': 'alluvial-floodplain',
  'Idalia': 'alluvial-floodplain',
  'Mount Louisa': 'granite-slopes',
  'Mount St John': 'alluvial-floodplain',
  'Mount Stuart': 'granite-slopes',
  'Mundingburra': 'alluvial-floodplain',
  'Murray': 'alluvial-floodplain',
  'Mysterton': 'alluvial-floodplain',
  'North Ward': 'granite-slopes',
  'Oonoonba': 'alluvial-floodplain',
  'Pallarenda': 'coastal-maritime',
  'Pimlico': 'alluvial-floodplain',
  'Railway Estate': 'alluvial-floodplain',
  'Rosslea': 'alluvial-floodplain',
  'Rowes Bay': 'coastal-maritime',
  'South Townsville': 'alluvial-floodplain',
  'Stuart': 'granite-slopes',
  'Town Common': 'coastal-maritime',
  'Townsville West': 'alluvial-floodplain',
  'Vincent': 'alluvial-floodplain',
  'West End': 'alluvial-floodplain',
  'Wulguru': 'granite-slopes',

  // Rural Townsville (28)
  'Alligator Creek': 'rural-acreage',
  'Barringha': 'rural-acreage',
  'Beach Holm': 'coastal-maritime',
  'Blue Hills': 'rural-acreage',
  'Brookhill': 'rural-acreage',
  'Calcium': 'rural-acreage',
  'Cape Cleveland': 'coastal-maritime',
  'Clemant': 'northern-beaches',
  'Crimea': 'rural-acreage',
  'Crystal Creek': 'northern-beaches',
  'Cungulla': 'coastal-maritime',
  'Granite Vale': 'rural-acreage',
  'Gumlow': 'rural-acreage',
  'Hervey Range': 'rural-acreage',
  'Julago': 'rural-acreage',
  'Lynam': 'rural-acreage',
  'Majors Creek': 'rural-acreage',
  'Mount Elliot': 'rural-acreage',
  'Nome': 'rural-acreage',
  'Oak Valley': 'rural-acreage',
  'Partington': 'alluvial-floodplain',
  'Purono Park': 'coastal-maritime',
  'Rangewood': 'rural-acreage',
  'Roseneath': 'rural-acreage',
  'Ross River': 'alluvial-floodplain',
  'Rupertswood': 'rural-acreage',
  'Toonpan': 'rural-acreage',
  'Woodstock': 'rural-acreage',

  // Urban Thuringowa (12)
  'Alice River': 'rural-acreage',
  'Bohle': 'outer-masterplanned',
  'Bohle Plains': 'outer-masterplanned',
  'Burdell': 'outer-masterplanned',
  'Bushland Beach': 'coastal-maritime',
  'Condon': 'upper-catchment',
  'Deeragun': 'outer-masterplanned',
  'Kelso': 'upper-catchment',
  'Kirwan': 'upper-catchment',
  'Pinnacles': 'rural-acreage',
  'Rasmussen': 'upper-catchment',
  'Thuringowa Central': 'upper-catchment',

  // Rural Thuringowa (14)
  'Balgal Beach': 'northern-beaches',
  'Black River': 'northern-beaches',
  'Bluewater': 'northern-beaches',
  'Jensen': 'northern-beaches',
  'Mount Low': 'outer-masterplanned',
  'Mutarnee': 'northern-beaches',
  'Paluma': 'granite-slopes',
  'Reid River': 'rural-acreage',
  'Rollingstone': 'northern-beaches',
  'Saunders Beach': 'coastal-maritime',
  'Shaw': 'outer-masterplanned',
  'Toolakea': 'coastal-maritime',
  'Toomulla': 'coastal-maritime',
  'Yabulu': 'northern-beaches',

  // Islands (8)
  'Arcadia': 'offshore-islands',
  'Florence Bay': 'offshore-islands',
  'Horseshoe Bay': 'offshore-islands',
  'Magnetic Island': 'offshore-islands',
  'Nelly Bay': 'offshore-islands',
  'Orpheus Island': 'offshore-islands',
  'Palm Island': 'offshore-islands',
  'Picnic Bay': 'offshore-islands'
};

// ============================================================================
// Flagship Bespoke Suburb Profiles (300-500+ Words of Authentic Local Details)
// ============================================================================

interface FlagshipProfile {
  headlineContext: string;
  localHistoryAndCanopy: string;
  environmentalRealities: string;
  accessAndPropertyTypologies: string;
  treeRemovalSpecifics: string;
  stumpGrindingSpecifics: string;
  palmTreeSpecifics: string;
  councilInsights: string;
  faqOverrides?: { question: string; answer: string }[];
}

const flagshipProfiles: Record<string, FlagshipProfile> = {
  'Kirwan': {
    headlineContext: 'Townsville’s largest residential community spanning established family estates from The Willows and Greenwood Estate to modern enclaves.',
    localHistoryAndCanopy: 'Developed heavily throughout the 1980s, 1990s, and early 2000s, Kirwan features extensive mature street and backyard trees. Heavy canopies of introduced African Mahogany, weeping figs, and spreading poincianas frequently dominate residential fence lines. As these trees have reached 30 to 40 years of maturity, their extensive limb spans and shallow surface root networks increasingly overhang low-set brick homes, outdoor patios, and colorbond boundary fences.',
    environmentalRealities: 'Situated in the broad catchment between Ross River and the Bohle River drainage systems, Kirwan experiences substantial ground saturation during the North Queensland monsoon. The underlying alluvial clay expands rapidly during prolonged wet spells, creating ground heave that can compromise root anchorage for top-heavy canopy trees. During summer storm season, severe wind gusts descending from the Hervey Range funnel straight through Kirwan’s residential corridors, making proactive limb weight reduction and deadwood removal essential for property preservation.',
    accessAndPropertyTypologies: 'The majority of properties in Kirwan are detached suburban residences on 600m² to 800m² blocks. Side access is typically restricted to standard pedestrian or single-vehicle side gates (between 900mm and 1500mm wide). Our crews navigate tight clearances alongside air-conditioning compressors, pool pumps, and garden sheds by deploying compact articulated equipment, motorized barrows, and specialized sectional lowering rigging that allows large limbs to be dismantled without touching neighbouring roofs.',
    treeRemovalSpecifics: 'Tree removal in Kirwan almost always demands sectional dismantling. When dismantling large African Mahoganies or overgrown figs in confined backyards, our qualified climbing arborists rig each branch back towards the trunk, lowering timber under precise friction control to protect underlying garden beds, fences, and swimming pool enclosures.',
    stumpGrindingSpecifics: 'Stump grinding throughout Kirwan must navigate extensive underground domestic services including irrigation pipes, stormwater runoffs, and underground power feeds. Furthermore, decomposing eucalypt and mahogany stumps in Kirwan’s warm, damp soils serve as prime primary nesting sites for subterranean termites (Coptotermes acinaciformis). Grinding the stump and major buttress roots 300mm below grade eliminates this structural termite hazard near house footings.',
    palmTreeSpecifics: 'Kirwan properties frequently have dense, overgrown clumps of Golden Cane palms, towering Cocos palms, and Alexander palms planted close to boundary fences in the 1990s. Overgrown palm clumps trap organic debris, attract snakes and nesting rodents, and drop heavy seed pods into pool filtration systems. We provide complete root-ball excavation and tight-quarter palm felling.',
    councilInsights: 'In Kirwan residential allotments under standard zoning, nuisance or hazardous trees located wholly within private freehold boundaries generally do not require complex council permits unless subject to a specific vegetation protection covenant or heritage register. We verify your exact property zoning against Townsville City Council maps before beginning work.'
  },

  'Bushland Beach': {
    headlineContext: 'Northern coastal locality fronting Halifax Bay, characterized by maritime winds, sand-based soils, and sprawling tropical coastal homes.',
    localHistoryAndCanopy: 'Bushland Beach stretches along the coast north of Townsville, featuring a unique mix of direct beachfront allotments, elevated hillside pockets, and newer family subdivisions. Coastal vegetation is characterized by tall Coconut Palms, Alexander palms, native coastal she-oaks, paperbarks, and salt-tolerant tamarinds. Trees in this area must contend with relentless prevailing north-easterly breezes and salt-laden maritime air that burns tender foliage.',
    environmentalRealities: 'The defining challenge in Bushland Beach is the interaction between high coastal wind exposure and loose sandy soil. Because coastal sands lack the binding cohesion of inland clays, trees and palms develop broad, shallow root plates rather than deep taproots. During tropical cyclones or prolonged monsoonal rain events, saturated sands lose their shear strength, leaving tall, top-heavy canopy trees and unpruned coconut palms highly susceptible to catastrophic wind-throw and uprooting.',
    accessAndPropertyTypologies: 'Properties range from beachfront acreage and traditional quarter-acre blocks to modern compact master-planned lots. Many properties feature extensive poolside landscaping, outdoor entertaining decks, and delicate tropical garden beds. Salt air accelerates corrosion on equipment, requiring our arborists to utilize specialized marine-grade rigging hardware and lightweight turf-protection mats to prevent machinery from sinking into soft beach sand.',
    treeRemovalSpecifics: 'Tree removal in Bushland Beach focuses heavily on pre-cyclone hazard mitigation. Trees with asymmetrical wind-loaded canopies, leaning trunks, or root decay in the sand are systematically dismantled using precision rope rigging to ensure limbs do not collapse into roofs, solar arrays, or adjacent nature reserves.',
    stumpGrindingSpecifics: 'Stump grinding in Bushland Beach requires specialized sand-resistant grinder teeth, as abrasive quartz sands cause extreme friction wear on standard cutting tips. We grind deep into the root ball to remove all fibrous coastal roots, allowing homeowners to replant lawn or construct new retaining walls and pool decking without settlement issues.',
    palmTreeSpecifics: 'Bushland Beach has one of the highest concentrations of mature Coconut Palms and Alexander palms in Townsville. Unmaintained coconut palms represent a severe liability due to falling 2-3kg coconuts and massive heavy fronds that can crush patio awnings or injure pets. We perform complete palm removals as well as systematic crown cleaning and de-nutting before cyclone season.',
    councilInsights: 'Properties directly bordering Halifax Bay, foreshore reserves, or coastal dunes are subject to strict Townsville City Council Coastal Protection overlays. Removing native marine vegetation within foreshore buffer zones requires specific environmental verification, which our Level 5 arborists evaluate and document for you.'
  },

  'Mount Louisa': {
    headlineContext: 'Prominent foothill and elevated ridgeline suburb featuring steep topography, granite boulder formations, and dry tropical woodland.',
    localHistoryAndCanopy: 'Built across the slopes and foothills of Mount Louisa—encompassing established estates like Crestbrook and modern hillside developments—properties here feature dramatic elevation changes. The natural vegetation comprises hardy dry tropical species including Pink Bloodwood, Narrow-Leaved Red Ironbark, native figs, and Cocky Apple. Trees on these hillsides have evolved extensive root networks that snake through fractures in the underlying granite bedrock.',
    environmentalRealities: 'Mount Louisa properties experience severe weather extremes: blistering dry season heat on exposed rock faces, followed by high-velocity storm downdrafts that whip across the ridge lines during summer. The decomposed granite soils on hillside allotments are thin and prone to rapid surface erosion once topsoil is disturbed. However, large trees on steep slopes can also exert excessive leverage on retaining walls or become unstable if their anchoring roots rot.',
    accessAndPropertyTypologies: 'Access is the primary operational consideration in Mount Louisa. Many homes are multi-level or pole-style constructions built on steep hillside gradients (15% to 30%+ slopes) with narrow, winding driveways and split-level terraced backyards. Standard elevated work platforms or heavy wood chippers often cannot be safely positioned on steep driveway inclines. Our crews specialize in technical high-angle tree climbing, aerial friction lowering, and zip-line rope rigging to transport heavy logs up or down embankments without damaging retaining walls.',
    treeRemovalSpecifics: 'Removing hazardous trees on Mount Louisa’s rocky slopes requires elite rigging capability. We use high-tensile arborist bull-ropes and friction bollards mounted to solid anchor trees to lower trunk wood safely against gravity, preventing boulders or heavy timber from rolling down onto houses, glass pool fences, or downhill neighbours.',
    stumpGrindingSpecifics: 'Stump grinding on Mount Louisa is uniquely challenging because tree roots frequently grow around and beneath buried granite boulders. Our operators use compact track grinders with multidirectional articulating heads to carefully work around rock obstructions without shattering tungsten teeth, grinding the stump down to a safe depth below ground level.',
    palmTreeSpecifics: 'Terraced hillside gardens in Mount Louisa frequently feature towering Cocos palms and Golden Cane clumps that have outgrown their original landscape planters. Overgrown palm roots can exert immense pressure on structural block retaining walls, causing bowing and cracking. We safely dismantle these palms piece by piece in confined spaces.',
    councilInsights: 'Parts of Mount Louisa fall under Townsville City Council’s Steep Land & Landslide Hazard Overlays. Tree root systems on steep embankments often contribute to slope stabilization, so our certified Level 5 arborists can assess whether selective pruning or complete root-ball retention is the safest engineering approach.'
  },

  'Townsville City': {
    headlineContext: 'High-density commercial, heritage, and urban precinct encompassing the CBD, Flinders Street, Palmer Street dining strip, and commercial zones.',
    localHistoryAndCanopy: 'Townsville City represents a dense urban environment where mature historic street trees—such as sweeping figs, raintrees, and tamarinds—coexist with commercial office towers, multi-storey residential apartments, dining precincts, and utility infrastructure. Urban trees here are subject to confined root zones, reflective building heat, subterranean asphalt compaction, and frequent utility trenching.',
    environmentalRealities: 'In the CBD, tree management is governed by extreme public liability considerations and dense infrastructure. A single failing branch over a public footpath, alfresco dining area, or high-traffic street can cause catastrophic personal injury or structural property damage. Cyclone preparedness in the city requires meticulous canopy thinning and deadwood removal to ensure wind passes cleanly through canopies without tearing out limbs.',
    accessAndPropertyTypologies: 'Townsville City sites feature zero-clearance access: narrow commercial laneways, pedestrian arcades, shared loading docks, and underground car park roofs. Tree work frequently requires coordination with Townsville City Council for road and footpath occupancy permits, traffic management control, and pedestrian detours. Where ground access is non-existent, we deploy heavy hydraulic mobile cranes capable of lifting whole dismantled tree sections over commercial buildings.',
    treeRemovalSpecifics: 'Urban tree removal in the CBD requires zero-drop-zone execution. Every cut piece of wood and branch must be suspended by crane or dual-rope rigging systems, lifted up and away from building parapets, neon signage, and glass curtain walls, and lowered directly into the back of haulage trucks with zero ground impact.',
    stumpGrindingSpecifics: 'Stump grinding in the city center demands rigorous utility location. The subsoil beneath Townsville City is packed with high-voltage electrical conduits, telecommunications fiber optics, gas lines, and historic brick drainage channels. We conduct thorough Dial Before You Dig (DBYD) pipe and cable locator scans before a grinder wheel touches the ground.',
    palmTreeSpecifics: 'CBD commercial properties and waterfront esplanades feature formal plantings of Royal palms, Date palms, and Fan palms. Overripe seed pods and dropping fronds pose significant public safety and slip hazards on commercial walkways. We provide commercial palm maintenance and rapid scheduled removals outside normal business hours.',
    councilInsights: 'Works within Townsville City are closely monitored under Townsville City Council urban local laws and Queensland Heritage registers. Street tree pruning and removals require formal permits and certified traffic management plans, which Arbco Tree Solutions manages end-to-end.'
  },

  'Magnetic Island': {
    headlineContext: 'Offshore tropical island 8km across Cleveland Bay, recognized for national park boundaries, granitic landscapes, and isolated logistical requirements.',
    localHistoryAndCanopy: 'Magnetic Island (Yunbenun) encompasses the communities of Nelly Bay, Arcadia, Horseshoe Bay, and Picnic Bay. With over 78% of the island protected as National Park, the residential areas blend directly into sensitive natural ecosystems. The island canopy is characterized by majestic native Hoop Pines (Araucaria cunninghamii) clinging to granite headlands, Forest Red Gums, Poplar Gums, and coastal paperbarks, supporting significant populations of native wildlife including wild koalas and curlews.',
    environmentalRealities: 'Operating on an offshore island introduces real environmental and logistical factors that mainland operators cannot replicate. Equipment, machinery, and vehicles must be transported across Cleveland Bay via the vehicular barge (Fantasea barge from Ross Street). During severe weather, island residents can be cut off from mainland utility crews for days. Furthermore, the island’s rocky granite topography means trees grow in shallow pockets of soil between massive boulders, creating unpredictable root anchorage during tropical cyclones.',
    accessAndPropertyTypologies: 'Properties on Magnetic Island range from beachfront baches to steep hillside chalets accessed via narrow unsealed tracks, granite rock driveways, and low-clearance residential lanes. Standard heavy mainland boom trucks cannot navigate many island roads or tight residential gates. Arbco utilizes specialized compact arborist equipment that meets ferry weight classifications and navigates island tracks effortlessly.',
    treeRemovalSpecifics: 'Tree removal on Magnetic Island requires an arborist who understands the local ecosystem. We take extreme care to avoid disturbing native wildlife habitats (inspecting canopies for resting koalas before starting work). Sectional dismantling over granite boulder gardens is executed using high-friction rigging blocks, lowering wood without damaging rocky natural features or tropical timber home decks.',
    stumpGrindingSpecifics: 'Stump grinding on the island is heavily influenced by surface granite boulders. We deploy compact, high-torque hydraulic track grinders capable of negotiating rocky paths, grinding tree stumps level with surrounding granite outcrops to leave yards safe and ready for island landscaping.',
    palmTreeSpecifics: 'Naturalized Coconut Palms thrive across the island bays and create significant hazards along driveways and holiday accommodation. Dropping coconuts and heavy fronds cause severe liability for island holiday rentals and homeowners. We provide full palm removals, coconut harvesting, and crown stabilization.',
    councilInsights: 'Magnetic Island has some of the strictest vegetation protection bylaws in Queensland. Townsville City Council enforces the Magnetic Island Natural Values and Significant Tree Register, particularly regarding native hoop pines and eucalypts. Our Level 5 arborists prepare compliant arborist reports and liaise directly with council environmental officers.'
  },

  'Annandale': {
    headlineContext: 'Premier residential community situated along the sweeping banks of the Ross River, characterized by mature tree canopies and expansive parklands.',
    localHistoryAndCanopy: 'Established in the late 1970s through the 1990s as one of Townsville’s premier master-planned suburbs, Annandale is celebrated for its lush greenery. The suburb features massive, established canopy trees including Rain Trees, Broad-Leaved Paperbarks, and Weeping Tea Trees along the river corridor, alongside sprawling mango trees and native eucalypts in private residential yards.',
    environmentalRealities: 'Annandale’s proximity to the Ross River means much of the suburb sits upon alluvial clay floodplains. During the wet season, the water table rises significantly, softening the subsoil and causing heavy, waterlogged branches on mature Rain Trees and African Mahoganies to shear off under their own weight. Subsoil movement also leads to root-binding issues with underground pipes.',
    accessAndPropertyTypologies: 'Homes are predominantly established single-storey and two-storey brick family residences with manicured lawns, in-ground swimming pools, and rear gardens abutting river reserves or parklands. Access is generally via standard side gates or narrow easements alongside garage walls.',
    treeRemovalSpecifics: 'Due to the sheer scale of mature trees in Annandale backyards, removals frequently involve heavy sectional dismantling using aerial rigging blocks. Limbs must be rigged carefully around solar pool heating systems, pergolas, and decorative boundary fencing.',
    stumpGrindingSpecifics: 'Annandale’s clay soil creates ideal conditions for deep subterranean termite nests within old tree stumps. Our high-powered grinders eliminate both the central root ball and lateral surface roots to protect home foundations from pest migration.',
    palmTreeSpecifics: 'Many Annandale homes feature large, 30-year-old clumps of Golden Cane and Cocos palms planted during the suburb’s initial development. These dense root masses choke irrigation lines and lift concrete pathways, requiring full mechanical extraction.',
    councilInsights: 'Properties in Annandale adjacent to the Ross River Parkway or drainage reserves may be subject to riparian vegetation overlays under the Townsville City Council planning scheme. We ensure all pruning and removal work complies with local environmental covenants.'
  },

  'Douglas': {
    headlineContext: 'Vibrant university and health precinct along the Ross River, encompassing Riverside Gardens, James Cook University, and Townsville University Hospital.',
    localHistoryAndCanopy: 'Douglas blends modern master-planned living (such as Riverside Gardens) with major institutional facilities. The urban canopy features native melaleucas, eucalyptus, and tropical riverine vegetation that reflects its position alongside the freshwater reaches of the Ross River.',
    environmentalRealities: 'Riverbank micro-climates lead to high humidity and rapid seasonal vegetative growth. Fast-growing developer plantings in newer sections of Douglas have matured quickly, often outpacing the space allocated to them on modern residential blocks and causing structural root conflicts with stormwater drains and retaining walls.',
    accessAndPropertyTypologies: 'Properties in Riverside Gardens feature modern, high-density residential designs with compact side boundaries and low roof eaves. Efficient access requires compact machinery that can pass through standard 900mm gates without disturbing manicured turf or garden edging.',
    treeRemovalSpecifics: 'Tree removal in Douglas demands high-precision sectional dismantling. Working in tight quarters between two-storey residences, our arborists rig every limb down with zero ground impact.',
    stumpGrindingSpecifics: 'Due to dense underground residential utility networks (NBN, gas, irrigation), our operators conduct comprehensive service locating before grinding stumps in Douglas front and rear yards.',
    palmTreeSpecifics: 'Foxtail palms and Alexander palms are prevalent throughout Douglas. While aesthetically pleasing, overgrown palms close to rooflines deposit heavy fronds directly into gutters, causing blockages during heavy tropical rainstorms.',
    councilInsights: 'Vegetation bordering the Ross River corridor in Douglas is protected under strict local and state environmental laws. We provide certified arborist assessments to ensure your tree works are fully compliant.'
  },

  'North Ward': {
    headlineContext: 'Historic coastal suburb wrapping the foot of Castle Hill and fronting The Strand, characterized by heritage homes and steep granite terrain.',
    localHistoryAndCanopy: 'As one of Townsville’s oldest and most prestigious suburbs, North Ward boasts magnificent mature vegetation. Centuries-old Tamarinds, Moreton Bay Figs, Poincianas, and Frangipanis grow alongside steep hillside slopes and heritage Queenslander properties.',
    environmentalRealities: 'High coastal winds from Cleveland Bay collide directly with the granite face of Castle Hill, creating intense wind shearing. Trees rooted in the shallow, rocky soils of North Ward must withstand both severe wind loading and high-salinity maritime breezes.',
    accessAndPropertyTypologies: 'Narrow colonial streets, steep private driveways, and elevated high-set Queenslanders create challenging access conditions. Overhead power lines and lack of off-street parking necessitate precision rigging and compact chipper setups.',
    treeRemovalSpecifics: 'Removing large, declining heritage trees or hazardous hillside limbs in North Ward requires advanced rigging techniques and crane assistance to safely clear historic tin roofs and steep embankments.',
    stumpGrindingSpecifics: 'Grinding stumps among North Ward’s rocky granite outcrops and old brick retaining walls requires surgical precision to remove roots without damaging historic structural masonry.',
    palmTreeSpecifics: 'Historic North Ward gardens feature towering Cuban Royal palms and Date palms. Their immense trunk height and heavy fronds require specialist climbing and lowering equipment.',
    councilInsights: 'Many properties in North Ward fall within Heritage Character overlays and Castle Hill Scenic Amenity zones. We assist homeowners with Townsville City Council tree preservation applications.'
  },

  'Castle Hill': {
    headlineContext: 'Iconic pink granite monolith suburb featuring multi-level architectural homes perched on steep cliffs and rocky ridge lines.',
    localHistoryAndCanopy: 'Properties on Castle Hill are set amidst native dry tropical woodland dominated by Pink Bloodwood, Ironbark, and resilient fig species whose roots penetrate deep into granite fractures.',
    environmentalRealities: 'Elevated terrain creates maximum exposure to tropical cyclone winds. Shallow rocky soils provide limited root purchase, making structurally compromised or decaying trees an immediate threat to downhill properties and access roads.',
    accessAndPropertyTypologies: 'Access is among the most demanding in regional Queensland: single-lane winding hillside roads, 20-30% driveway slopes, and zero flat ground for equipment staging. Our team uses specialized technical rope rigging and compact machinery.',
    treeRemovalSpecifics: 'Hillside tree removal requires complex aerial rigging systems to lower timber uphill or away from multi-level glass and timber homes, preventing heavy logs from rolling down rocky declivities.',
    stumpGrindingSpecifics: 'Stumps rooted into granite rock crevices are ground with precision track grinders, carefully removing stump meat while working around bedrock formations.',
    palmTreeSpecifics: 'Ornamental palms planted on steep terraces often outgrow their stability. We dismantle these high-risk palms in tight confined hillside spaces.',
    councilInsights: 'Castle Hill is subject to strict Townsville City Council Scenic Amenity and Landslide Hazard overlays. Arbco provides comprehensive Level 5 reports for council approval.'
  },

  'Burdell': {
    headlineContext: 'Fast-growing master-planned heart of the Northern Beaches (North Shore), characterized by modern homes, parks, and active family communities.',
    localHistoryAndCanopy: 'Burdell features extensive new-build residential estates where developer-planted street and garden trees—such as fast-growing eucalypts and ornamental palms—have matured into dense canopies over the past 10-15 years.',
    environmentalRealities: 'Built across low-lying coastal plains with engineered clay fills, Burdell properties experience seasonal ground saturation. Young trees with rapid top growth often develop weak root systems in compacted urban fill, making them vulnerable to storm failure.',
    accessAndPropertyTypologies: 'Compact lot sizes (350m² to 500m²) with zero lot lines and narrow 800-900mm side gates are standard. Equipment must be lightweight and maneuverable to access rear yards without damaging concrete paths or lawn.',
    treeRemovalSpecifics: 'Tree removal in Burdell requires careful sectional dismantling in tight residential spaces directly between neighbouring dwellings, ensuring zero impact on adjacent rooflines and solar panels.',
    stumpGrindingSpecifics: 'With dense sub-surface networks of optic fiber, underground electricity, and irrigation lines in modern estates, thorough DBYD location is conducted before grinding.',
    palmTreeSpecifics: 'Foxtail and Alexander palms planted by original estate developers have now grown to roof height, shedding heavy fronds into gutters and dropping seeds into pool pumps. We provide rapid removal and clean-up.',
    councilInsights: 'Standard suburban residential tree works in Burdell typically do not require permits unless situated on council-managed road verges or community easements.'
  },

  'Aitkenvale': {
    headlineContext: 'Central urban commercial and residential hub centered around Stockland Townsville and established suburban post-war neighbourhoods.',
    localHistoryAndCanopy: 'Aitkenvale features large, established 800-1000m² residential allotments with extensive mature vegetation including 50-year-old mango trees, broad-leaved paperbarks, and weeping figs.',
    environmentalRealities: 'Heavy alluvial clay soils and high summer rainfall lead to aggressive canopy growth and subterranean root intrusion into aging clay stormwater and sewer infrastructure.',
    accessAndPropertyTypologies: 'Traditional post-war high-set homes feature narrow side driveways, carports, and backyard sheds. Our equipment easily navigates established garden layouts.',
    treeRemovalSpecifics: 'Removals often involve massive legacy mango and fig trees that have grown over houses and powerlines, requiring systematic limb-by-limb lowering.',
    stumpGrindingSpecifics: 'Old hardwood stumps in Aitkenvale are prime hosts for white ants (termites). We thoroughly grind the entire root base 300mm below surface grade to eliminate pest risks.',
    palmTreeSpecifics: 'Established clumps of Golden Cane palms and tall Cocos palms are removed to open up backyard space and prevent ongoing frond maintenance.',
    councilInsights: 'Standard residential freehold blocks in Aitkenvale have minimal tree removal restrictions unless located within the Ross River drainage corridor.'
  }
};

// ============================================================================
// Service-Specific Content Generators
// ============================================================================

function getServiceSpecificFocus(serviceId: string, suburbName: string, env: SuburbEnvironmentalProfile): {
  heading: string;
  paragraphs: string[];
  whyChoosePoints: { title: string; desc: string }[];
  processSteps: { title: string; desc: string }[];
} {
  if (serviceId === 'stump-grinding') {
    return {
      heading: `Precision Stump Grinding & Root Eradication in ${suburbName}`,
      paragraphs: [
        `Leaving an unsightly tree stump in your ${suburbName} yard isn't just an aesthetic nuisance—it represents a serious structural and biosecurity hazard. In North Queensland's tropical climate, decaying subterranean root systems and tree stumps rapidly become prime nesting hubs for destructive subterranean termites (Coptotermes acinaciformis). Left unaddressed, these aggressive termite colonies expand through ${suburbName}'s ${env.soilType.toLowerCase()} directly into nearby home footings, subfloors, and structural framing.`,
        `At Arbco Tree Solutions, we deploy high-performance commercial stump grinders engineered to access tight residential backyards through standard side gates. We grind the tree stump and lateral root flares 200mm to 350mm below natural ground level, completely severing the root plate. This not only destroys potential pest colonies, but eliminates dangerous lawnmower trip hazards, halts fungal spore proliferation, and allows you to immediately replant turf, lay paving, or construct structural extensions.`
      ],
      whyChoosePoints: [
        {
          title: 'Subterranean Termite Prevention',
          desc: `Eliminate rotting underground wood hubs in ${suburbName} before destructive white ants colonize the stump and target your residential structural timber.`
        },
        {
          title: 'Compact Gate Access Technology',
          desc: `Our specialized track and wheeled stump grinders easily navigate narrow gates (${env.accessConstraint}), preserving your turf and concrete pathways.`
        },
        {
          title: 'Thorough DBYD Underground Safety',
          desc: `We verify underground utility locations—including domestic irrigation, stormwater, power, and NBN lines—ensuring zero service disruption during excavation.`
        },
        {
          title: 'Complete Yard Restoration',
          desc: `Stump grindings are processed into fine, clean mulch that backfills the hole level with your yard, leaving the area completely ready for immediate replanting.`
        }
      ],
      processSteps: [
        {
          title: 'Site Scan & Service Location',
          desc: `We inspect the stump area for hidden stones, conduit, and underground pipes, confirming safe clearance before commencing work in ${suburbName}.`
        },
        {
          title: 'Precision Mechanical Grinding',
          desc: `Our high-torque carbide cutter wheel sweeps across the stump, grinding both the main core and spreading buttress roots to 300mm below finished grade.`
        },
        {
          title: 'Root Flare Chase-Out',
          desc: `We systematically trace and grind surface lateral roots spreading across your lawn or pressing against paving, fences, and garden beds.`
        },
        {
          title: 'Clean Backfill & Site Rake',
          desc: `We backfill the cavity with the generated organic mulch mound, raking the surrounding lawn spotless and ready for turf or new landscaping.`
        }
      ]
    };
  }

  if (serviceId === 'palm-tree-removal') {
    return {
      heading: `Specialist Tropical Palm Tree Removal & Pruning in ${suburbName}`,
      paragraphs: [
        `Palms are an iconic feature of tropical North Queensland landscapes, but without dedicated maintenance, species such as ${env.dominantPalms.slice(0, 2).join(' and ')} quickly transform into serious property liabilities. In ${suburbName}, unmaintained palms produce massive, heavy dead fronds and dense fruit/seed clusters that weigh up to 20–30 kilograms. When dislodged during summer storms, these falling projectiles can crush pergola roofs, shatter solar panels, and cause severe personal injury.`,
        `Furthermore, the fibrous skirts of neglected palm trees in ${suburbName} serve as prime harborages for nesting flying foxes, vermin, and venomous snakes. Palm root systems are exceptionally dense and fibrous; as they expand, they lift concrete driveways, crack swimming pool shells, and choke drainage pipes. Arbco Tree Solutions provides complete palm tree removal, root ball excavation, trunk skinning, and seasonal crown de-nutting, executed safely in confined residential settings.`
      ],
      whyChoosePoints: [
        {
          title: 'Cyclone Season Frond & Seed Hazard Reduction',
          desc: `Eliminate high-risk falling fronds and heavy seed bunches before ${suburbName}'s tropical storm season causes property damage.`
        },
        {
          title: 'Pest & Harborage Eradication',
          desc: `Clearing dead palm skirts eliminates favored roosting habitats for fruit bats, rodents, and snakes directly adjacent to your home's bedrooms and patios.`
        },
        {
          title: 'Fibrous Root-Ball Extraction',
          desc: `We completely remove invasive palm root balls that invade garden beds, crack plumbing pipes, or lift poolside paving slabs.`
        },
        {
          title: 'Specialized Climbers & Zero Damage Rigging',
          desc: `Our climbers use non-damaging climbing techniques or elevated platforms to dismantle tall palms section by section without touching surrounding structures.`
        }
      ],
      processSteps: [
        {
          title: 'Palm Health & Drop-Zone Assessment',
          desc: `We examine the palm trunk for rot, calculate fall trajectories, and establish safe landing zones around ${suburbName} residential structures.`
        },
        {
          title: 'Crown Stripping & Seed Removal',
          desc: `Our qualified climbers ascend the palm to strip fronds and heavy seed bunches first, lowering them under friction control to protect underlying gardens.`
        },
        {
          title: 'Sectional Trunk Dismantling',
          desc: `The trunk is cut into manageable timber rounds, lowered under rope control to prevent heavy palm sections from denting lawns or underground services.`
        },
        {
          title: 'Debris Processing & Chipping',
          desc: `All fibrous palm fronds and trunks are chipped or removed from the property, leaving your yard immaculately clean and tidy.`
        }
      ]
    };
  }

  // Default: tree-removal
  return {
    heading: `Safe, Precision Tree Removal Services in ${suburbName}`,
    paragraphs: [
      `Removing a mature or hazardous tree in ${suburbName} requires experienced arboricultural knowledge, specialized heavy-duty rigging equipment, and a thorough understanding of local tropical tree anatomy. Whether you are dealing with a storm-damaged ${env.dominantCanopy[0] || 'canopy tree'}, invasive root systems threatening foundations, or a declining hardwood showing dangerous structural decay, Arbco Tree Solutions delivers controlled, zero-damage tree removals across ${suburbName}.`,
      `In tropical North Queensland, tree removals cannot be approached with a one-size-fits-all methodology. Trees growing in ${suburbName}'s ${env.soilType.toLowerCase()} face intense environmental stressors, from prolonged dry spells to rapid cyclonic wind-loading. Our certified Level 5 arborists evaluate timber soundboard integrity, branch weight distributions, and nearby hazards to execute precision sectional dismantling, safely lowering massive limbs in tight residential yards without disturbing surrounding structures.`
    ],
    whyChoosePoints: [
      {
        title: '$20M Public Liability Insurance',
        desc: `Complete protection and peace of mind for residential, commercial, and body corporate properties across ${suburbName}.`
      },
      {
        title: 'Level 5 Certified Arborists',
        desc: `Every tree removal in ${suburbName} is guided by qualified arborists adhering to Australian Standards AS4373-2007 (Pruning of Amenity Trees).`
      },
      {
        title: 'Controlled Sectional Lowering',
        desc: `Using high-tensile arborist rigging, heavy limbs are lowered smoothly under friction, ensuring zero impact on roofs, solar arrays, or fences.`
      },
      {
        title: 'Thorough Site Cleanup Guarantee',
        desc: `We don't leave a mess. All timber is cut, branches wood-chipped on-site, and your ${suburbName} yard raked spotless before we leave.`
      }
    ],
    processSteps: [
      {
        title: 'Comprehensive Site Risk Assessment',
        desc: `We visit your ${suburbName} property to examine structural tree defects, ground conditions, underground services, and nearby buildings.`
      },
      {
        title: 'Transparent Written Quotation',
        desc: `You receive a clear, upfront quote detailing the removal scope, equipment required, and total site cleanup with zero hidden fees.`
      },
      {
        title: 'Technical Sectional Dismantling',
        desc: `Our climbers ascend using access ropes and cranes, systematically removing outer branches before dismantling the main trunk piece by piece.`
      },
      {
        title: 'Complete Wood Chipping & Site Rake',
        desc: `All debris is processed through our high-capacity chipper. We can leave nutrient-rich mulch for your gardens or haul everything away.`
      }
    ]
  };
}

// ============================================================================
// Localized FAQs Generator (Service + Suburb Specific)
// ============================================================================

function generateLocalizedFaqs(
  suburbName: string,
  serviceId: string,
  serviceName: string,
  env: SuburbEnvironmentalProfile,
  flagship?: FlagshipProfile
): { question: string; answer: string }[] {
  if (flagship?.faqOverrides) {
    return flagship.faqOverrides;
  }

  if (serviceId === 'stump-grinding') {
    return [
      {
        question: `How deep do you grind tree stumps in ${suburbName}?`,
        answer: `We typically grind stumps between 200mm and 350mm below natural ground level throughout ${suburbName}. This depth completely severs the root crown, eradicates subterranean termite harborage, and allows ample room for backfilling, topsoil placement, and healthy new lawn turf or paving.`
      },
      {
        question: `Can your stump grinder fit through narrow side gates in ${suburbName}?`,
        answer: `Yes. We operate specialized compact, high-torque stump grinders specifically designed to pass through standard residential pedestrian and side gates (down to 750mm–800mm clearance). This allows us to access confined backyards in ${suburbName} without removing boundary fence panels.`
      },
      {
        question: `What happens to the wood chips and mulch left after grinding?`,
        answer: `The grinding process produces a nutrient-dense mixture of wood mulch and soil. We use this material to completely backfill and mound the excavation hole to account for natural settling, raking the surrounding area neat and tidy. Any excess mulch can be distributed across your garden beds.`
      }
    ];
  }

  if (serviceId === 'palm-tree-removal') {
    return [
      {
        question: `Why should I remove or de-nut palms before cyclone season in ${suburbName}?`,
        answer: `In ${suburbName}, tropical storm winds easily dislodge heavy dead fronds and seed pods weighing up to 25kg from species like Cocos and Coconut palms. These falling items become dangerous airborne projectiles during severe weather, causing extensive roof, vehicle, and solar panel damage.`
      },
      {
        question: `Will palm tree roots damage my pipes or paving in ${suburbName}?`,
        answer: `Yes. Palms have aggressive, fibrous root balls that expand laterally. In ${suburbName}'s ${env.soilType.toLowerCase()}, expanding palm root masses frequently crack nearby pool shells, bow retaining walls, and penetrate underground stormwater and sewer pipes.`
      },
      {
        question: `Do you remove the entire palm root ball as well?`,
        answer: `Yes. While standard palm felling cuts the trunk flush with the ground, we also offer complete mechanical root ball excavation and stump grinding to ensure the fibrous base is eradicated, allowing you to replant immediately.`
      }
    ];
  }

  // Default: tree-removal
  return [
    {
      question: `Do I need Townsville City Council approval to remove a tree in ${suburbName}?`,
      answer: `In most standard residential zones across ${suburbName}, trees situated wholly on private freehold land do not require council permits unless they are protected under a specific Natural Assets overlay, heritage register, or riparian corridor scheme (${env.councilOverlay}). As qualified Level 5 arborists, we verify your property’s zoning and handle all documentation if a permit is required.`
    },
    {
      question: `How do you protect my fences, lawn, and sheds during tree removal in ${suburbName}?`,
      answer: `We specialize in confined-space sectional dismantling. Using friction-controlled lowering blocks, high-tensile rigging lines, and ground-protection mats, our arborists rope each branch down in controlled increments. Heavy logs are never dropped freely where they could impact your lawn, gardens, or boundary structures in ${suburbName}.`
    },
    {
      question: `How quickly can you respond for hazardous or emergency tree removal in ${suburbName}?`,
      answer: `Because our crews operate continuously throughout ${suburbName} and surrounding suburbs, we provide same-day on-site assessments and rapid 24/7 priority emergency response for storm-damaged, split, or structurally hazardous trees.`
    }
  ];
}

// ============================================================================
// Main Public Export: getSuburbPageContent
// ============================================================================

export function getSuburbPageContent(suburbName: string, serviceId: string, serviceName: string): SuburbContentResult {
  const zoneKey = suburbZoneMap[suburbName] || 'alluvial-floodplain';
  const env = microZones[zoneKey] || microZones['alluvial-floodplain'];
  const flagship = flagshipProfiles[suburbName];

  const serviceFocus = getServiceSpecificFocus(serviceId, suburbName, env);
  const faqs = generateLocalizedFaqs(suburbName, serviceId, serviceName, env, flagship);

  // Determine dynamic intro paragraphs based on flagship profile or verified micro-zone
  let introParagraphs: string[];
  let propertyAndAccessParagraphs: string[];
  let councilAndSafetyParagraphs: string[];

  if (flagship) {
    introParagraphs = [
      `${flagship.headlineContext} When local residents and commercial property managers require dependable, fully certified ${serviceName.toLowerCase()} in ${suburbName}, Arbco Tree Solutions is the trusted local authority. With over 15 years of hands-on arborist experience in North Queensland, our certified crews deliver uncompromising safety, precision machinery, and transparent pricing.`,
      flagship.localHistoryAndCanopy,
      flagship.environmentalRealities
    ];
    propertyAndAccessParagraphs = [
      flagship.accessAndPropertyTypologies,
      serviceId === 'stump-grinding'
        ? flagship.stumpGrindingSpecifics
        : serviceId === 'palm-tree-removal'
        ? flagship.palmTreeSpecifics
        : flagship.treeRemovalSpecifics
    ];
    councilAndSafetyParagraphs = [
      flagship.councilInsights,
      `Every arborist project we undertake in ${suburbName} is backed by our comprehensive $20M Public Liability insurance policy and completed to strict Australian Standards (AS4373-2007). Whether your project involves a confined residential backyard or a large commercial facility, we prioritize safety, structural integrity, and flawless site cleanup.`
    ];
  } else {
    // Generate detailed, authentic content for any of the 97 suburbs using micro-zone intelligence
    introParagraphs = [
      `Arbco Tree Solutions is proud to deliver professional, fully insured ${serviceName.toLowerCase()} across ${suburbName} and the surrounding ${env.zoneName} district. As a locally owned and operated North Queensland tree care company, our qualified Level 5 arborists understand the unique environmental, meteorological, and botanical conditions that define properties in ${suburbName}.`,
      `The local landscape in ${suburbName} is shaped by ${env.soilType.toLowerCase()} and experiences ${env.windExposure.toLowerCase()}. Native and introduced tree species common to the area—including ${env.dominantCanopy.slice(0, 3).join(', ')}—require specialized arboricultural management to ensure they remain healthy, safe, and resilient against intense seasonal monsoons and tropical cyclones.`,
      `When trees become structurally unsound, outgrow their residential boundaries, or threaten domestic infrastructure in ${suburbName}, attempting amateur tree work presents severe safety hazards. Our certified team utilizes state-of-the-art rigging systems and compact equipment to carry out every project with unmatched surgical precision.`
    ];
    propertyAndAccessParagraphs = [
      `Properties across ${suburbName} encompass a diverse mix of residential, semi-rural, or commercial allotments. A primary operational challenge in this district is ${env.accessConstraint.toLowerCase()}. Our equipment fleet includes compact track machinery, specialized narrow-access stump grinders, and friction rigging devices that allow us to navigate confined easements and protect surrounding landscaping.`,
      `Before starting any ${serviceName.toLowerCase()} project in ${suburbName}, our lead arborist conducts a comprehensive on-site hazard audit. We inspect ground stability, identify underground utility easements, evaluate tree canopy weight distribution, and establish secure drop zones to ensure zero damage to fences, paving, pools, or neighbouring structures.`
    ];
    councilAndSafetyParagraphs = [
      `Navigating local council bylaws is an essential aspect of responsible tree care in ${suburbName}. Tree works in this area may intersect with the ${env.councilOverlay}. While nuisance or hazardous trees located on private residential freehold land generally do not require complex permits, specific environmental overlays or protected vegetation buffers must be adhered to.`,
      `Arbco Tree Solutions handles council planning permit guidance and provides certified Level 5 Arborist Reports when required. With $20M Public Liability insurance and complete compliance with Australian Standards AS4373-2007, you can trust our team for professional, compliant tree management in ${suburbName}.`
    ];
  }

  return {
    h2: `${serviceName} ${suburbName} — Certified Local Tree Specialists`,
    introParagraphs,
    environmentalProfile: env,
    serviceFocusHeading: serviceFocus.heading,
    serviceFocusParagraphs: serviceFocus.paragraphs,
    propertyAndAccessHeading: `Property & Access Realities in ${suburbName}`,
    propertyAndAccessParagraphs,
    councilAndSafetyHeading: `Council Bylaws & Safety Standards for ${suburbName}`,
    councilAndSafetyParagraphs,
    whyChoosePoints: serviceFocus.whyChoosePoints,
    processSteps: serviceFocus.processSteps,
    faqs,
    ctaHeadline: `Need Professional ${serviceName} in ${suburbName}?`,
    ctaText: `Our certified arborists are on call across ${suburbName} and surrounding suburbs. Contact Arbco Tree Solutions today for a free on-site hazard assessment and transparent quote.`
  };
}
