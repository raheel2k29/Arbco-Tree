import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { services, regions, slugify, allSuburbs } from '@/lib/locationData';
import ServiceQuoteForm from '@/components/ServiceQuoteForm';

// Generate static routes for all 7 core services
export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.id,
  }));
}

// Service-specific detailed data (benefits, FAQs, and process details)
const serviceDetails: Record<
  string,
  {
    heroTagline: string;
    subheading: string;
    highlights: string[];
    overview: string[];
    features: { title: string; desc: string; icon: string }[];
    faqs: { question: string; answer: string }[];
  }
> = {
  'tree-removal': {
    heroTagline: 'Professional, Hazard-Free Tree Removal in Townsville',
    subheading:
      'From emergency cyclone prep to complex confined-space dismantling, our certified arborists deliver precision tree removals with zero damage to surrounding property.',
    highlights: [
      '$20M Public Liability Coverage',
      'Confined Space & Crane Rigging',
      'Townsville Council Permit Guidance',
      'Complete Debris Chipping & Site Rake-Out',
    ],
    overview: [
      'Removing trees in tropical North Queensland requires specialized rigging knowledge, heavy-duty machinery, and deep understanding of native tree anatomy. At Arbco Tree Solutions, we provide full-service tree removal for hazardous, storm-damaged, dead, or structurally compromised trees.',
      'Our team uses precision sectional dismantling (climbing and rigging block by block) or mechanical crane assistance to safely lower large limbs in tight residential backyards, adjacent to powerlines, swimming pools, or neighbouring fences.',
    ],
    features: [
      {
        title: 'Sectional Dismantling',
        desc: 'Advanced rope rigging techniques ensure every branch and trunk section is guided safely to the ground.',
        icon: '🪓',
      },
      {
        title: 'Council Compliance',
        desc: 'We assist with Townsville City Council tree preservation orders and planning permits.',
        icon: '📋',
      },
      {
        title: 'Total Site Cleanup',
        desc: 'Every branch is wood-chipped on-site, logs stacked or removed, and your yard thoroughly raked clean.',
        icon: '🧹',
      },
    ],
    faqs: [
      {
        question: 'Do I need council approval to remove a tree in Townsville?',
        answer:
          'Council approval depends on your property zoning, local tree preservation orders, and whether the tree is considered an exempt weed species or imminent safety hazard. Our qualified arborists can inspect the tree and assist you with council documentation.',
      },
      {
        question: 'How do you remove a large tree in a tight space?',
        answer:
          'We use sectional dismantling. Our climbers scale the tree and use pulleys, lowering lines, and rigging blocks to dismantle it piece by piece from the top down, keeping your home, fences, and garden beds completely safe.',
      },
      {
        question: 'What happens to the wood and green waste afterwards?',
        answer:
          'We chip branches on-site into valuable organic mulch. You can choose to keep the mulch for your garden or have us transport all green waste completely off your property.',
      },
      {
        question: 'Are you fully insured for damage?',
        answer:
          'Yes, Arbco Tree Solutions carries comprehensive $20 Million Public Liability Insurance and all workers are covered under WorkCover Queensland.',
      },
    ],
  },
  'stump-grinding': {
    heroTagline: 'Fast, Deep Mechanical Stump Grinding & Removal',
    subheading:
      'Reclaim your lawn, eliminate tripping hazards, and stop subterranean termite colonies from taking over remaining tree stumps.',
    highlights: [
      'Grinding 300mm+ Below Ground Level',
      'Termite Hub & Root Flare Elimination',
      'Access Through 800mm Standard Gates',
      'Nutrient-Rich Mulch Backfill Included',
    ],
    overview: [
      'Leaving a tree stump behind invites termites, fungal rot, and creates ongoing lawn mowing obstacles. Arbco Tree Solutions uses high-horsepower, compact commercial stump grinders capable of reaching tight residential yards.',
      'We grind the stump, root flare, and surface lateral roots well below the soil surface, allowing you to replant grass, pave, or install garden beds immediately.',
    ],
    features: [
      {
        title: 'Deep Root Grinding',
        desc: 'We grind 200–350mm below surface grade to ensure roots do not sprout or host pests.',
        icon: '⚙️',
      },
      {
        title: 'Tight-Access Grinders',
        desc: 'Our compact machinery easily maneuvers through standard domestic side gates without turf damage.',
        icon: '🚪',
      },
      {
        title: 'Underground Safety',
        desc: 'We check utility clearances (Dial Before You Dig) to safeguard underground pipes and cables.',
        icon: '🛡️',
      },
    ],
    faqs: [
      {
        question: 'How deep do you grind tree stumps?',
        answer:
          'Standard grinding goes 200mm to 350mm below grade, which completely removes the root crown and enables easy replanting of lawn, laying turf, or garden paving.',
      },
      {
        question: 'Does grinding a stump kill termites?',
        answer:
          'Grinding removes the soft rotting cellulose wood that termites thrive on, eliminating the nest and nesting conditions before colonies can migrate toward your home.',
      },
      {
        question: 'Will the tree grow back after stump grinding?',
        answer:
          'Because we grind down the primary root plate and growth node, 99% of tree species cannot regrow after thorough grinding.',
      },
      {
        question: 'What happens to the wood shavings after grinding?',
        answer:
          'The resulting mix of fine wood chips and soil backfills the hole safely. Any excess mulch can be spread throughout your garden or removed upon request.',
      },
    ],
  },
  'palm-tree-removal': {
    heroTagline: 'Expert Palm Tree Trimming, Shaving & Full Removal',
    subheading:
      'Keep your pool, gutters, and roof free of heavy falling fronds, dangerous seed pods, and bat roosts with Townsville’s premier palm care team.',
    highlights: [
      'Coccs, Alexandra & Date Palms',
      'Complete Trunk De-Barking / Shaving',
      'Bat & Pest Infestation Removal',
      'Poolside & Confined Space Rigging',
    ],
    overview: [
      'Palm trees are a staple of tropical Townsville living, but neglected palms present serious safety hazards. Heavy fronds crashing into pool fences, falling seed pods, and bat or rat nesting can quickly turn a backyard palm into a liability.',
      'Arbco Tree Solutions specializes in climbing and rigging palms in tight spaces. Whether you need a seasonal clean (removing dead fronds and flowers) or complete removal and stump grinding of unwanted palms, we have the specialized equipment to do it cleanly.',
    ],
    features: [
      {
        title: 'Palm Trunk Shaving',
        desc: 'We remove old fibrous frond boots from the trunk to give your palms an immaculate resort-style look.',
        icon: '🌴',
      },
      {
        title: 'Poolside Protection',
        desc: 'Controlled rigging prevents falling palm spears and fronds from puncturing pool liners or glass fences.',
        icon: '🏊',
      },
      {
        title: 'Cyclone Preparation',
        desc: 'De-heading heavy seed bunches and fronds before cyclone season minimizes wind load and property impact.',
        icon: '🌪️',
      },
    ],
    faqs: [
      {
        question: 'Why should I remove or trim palm trees before cyclone season?',
        answer:
          'Heavy palm fronds and seed pods act as sails during high-wind events, putting extreme stress on the trunk and turning falling debris into high-velocity projectiles.',
      },
      {
        question: 'Can you remove palms right next to a swimming pool?',
        answer:
          'Yes, we specialize in poolside removals. We employ protective tarping and precision ropes to ensure zero debris or damage affects your pool water or glass balustrades.',
      },
      {
        question: 'Do palm tree stumps need to be ground out?',
        answer:
          'Yes. Palm stumps consist of dense, fibrous root balls that do not rot quickly and will attract pests if left in the ground. Grinding removes the entire root ball cleanly.',
      },
      {
        question: 'Do you clean out bat roosts in palms?',
        answer:
          'Yes, removing dead hanging fronds (skirts) removes the sheltered habitat where bats, snakes, and rats nest.',
      },
    ],
  },
  'tree-pruning-lopping': {
    heroTagline: 'Certified Tree Pruning & Canopy Management',
    subheading:
      'Maintain strong tree health, boost sunlight to your lawn, and safeguard your roof from overhanging branches with Australian Standard AS4373 pruning.',
    highlights: [
      'Australian Standards AS4373-2007 Compliance',
      'Deadwooding & Crown Thinning',
      'Powerline & Roof Clearance',
      'Wind & Storm Windload Reduction',
    ],
    overview: [
      'Pruning a tree correctly requires understanding tree biology and branch collar mechanics. Improper lopping (topping) causes stress, stimulates weak and hazardous epicormic regrowth, and can permanently damage the tree.',
      'Our qualified arborists prune according to Australian Standard AS4373-2007 (Pruning of Amenity Trees). We target dead, diseased, crossing, and dangerous limbs while preserving the natural architectural form and structural vitality of your trees.',
    ],
    features: [
      {
        title: 'Crown Thinning',
        desc: 'Selective branch reduction increases airflow through the canopy, drastically decreasing cyclone wind resistance.',
        icon: '🍃',
      },
      {
        title: 'Structure Clearance',
        desc: 'Pruning away from roofs, solar panels, and service lines prevents gutter clogging and abrasion damage.',
        icon: '🏠',
      },
      {
        title: 'Health Diagnosis',
        desc: 'We identify early signs of fungal decay, wood boring pests, or hollows before major limb drops occur.',
        icon: '🩺',
      },
    ],
    faqs: [
      {
        question: 'What is the difference between pruning and lopping?',
        answer:
          'Pruning follows Australian Standards (AS4373-2007) by making precise cuts at branch collars to promote clean healing. Lopping is indiscriminate cutting that creates decaying stubs and weak regrowth that is prone to sudden failure.',
      },
      {
        question: 'How often should trees be pruned in North Queensland?',
        answer:
          'Most tropical trees benefit from an annual or bi-annual inspection and maintenance prune, preferably in autumn or early spring before the summer wet and storm season.',
      },
      {
        question: 'Can you trim branches hanging over my boundary fence from a neighbor?',
        answer:
          'Under Queensland neighborhood dispute legislation, you generally have the right to prune branches that cross onto your side of the property line up to the boundary. We can perform this safely and professionally.',
      },
      {
        question: 'Does pruning help solar panel efficiency?',
        answer:
          'Yes, pruning overhanging canopies on the northern and western sides of roofs significantly increases sunlight hours to solar arrays, maximizing energy generation.',
      },
    ],
  },
  'emergency-tree-removal': {
    heroTagline: '24/7 Rapid Response Emergency Tree Services',
    subheading:
      'Urgent storm damage response, tree failure mitigation, and emergency road and driveway clearances across Greater Townsville.',
    highlights: [
      '24 Hours / 7 Days On-Call Response',
      'Storm & Cyclone Damage Specialists',
      'Crane & Heavy Rigging Capabilities',
      'Direct Insurance Work & Reporting',
    ],
    overview: [
      'Severe weather, tropical lows, and intense summer storms can strike Townsville with little warning, causing large branches or entire trees to crash onto roofs, vehicles, driveways, and power connections.',
      'Arbco Tree Solutions maintains rapid-response emergency crews equipped with chain saws, rigging, wood chippers, and lighting rigs to secure your property immediately, prevent secondary water damage, and restore safety.',
    ],
    features: [
      {
        title: 'Immediate Mobilization',
        desc: 'Fast callout response times across Townsville and Thuringowa during and following severe weather events.',
        icon: '🚨',
      },
      {
        title: 'Structure Stabilization',
        desc: 'We safely relieve weight and tension off impacted roofs and walls without inflicting further damage.',
        icon: '🏗️',
      },
      {
        title: 'Insurance Assistance',
        desc: 'We provide detailed arborist incident reports, photographic evidence, and quotes for insurance claim processing.',
        icon: '📄',
      },
    ],
    faqs: [
      {
        question: 'What should I do if a tree falls on my house or power lines?',
        answer:
          'Immediately evacuate the affected area and keep everyone clear. If power lines are involved, call Ergon Energy immediately on 13 22 96. Then call Arbco Tree Solutions at 0426 204 514 for urgent stabilization.',
      },
      {
        question: 'Do you bill insurance companies directly?',
        answer:
          'Yes, we regularly work with all major Australian home insurers. We provide comprehensive photo logs, certified risk documentation, and itemized billing to expedite your claim approval.',
      },
      {
        question: 'Are you available late at night or on weekends?',
        answer:
          'Yes, our emergency lines are monitored 24 hours a day, 7 days a week, 365 days a year.',
      },
      {
        question: 'Can you tarp a damaged roof after removing the fallen tree?',
        answer:
          'Yes, our crews carry emergency weatherproofing tarps and can secure openings to stop rain intrusion while repairs are arranged.',
      },
    ],
  },
  'wood-chipping-mulching': {
    heroTagline: 'High-Capacity On-Site Wood Chipping & Mulch Delivery',
    subheading:
      'Turn bulky branches and green waste into premium, weed-suppressing organic garden mulch for your landscaping needs.',
    highlights: [
      'High-Volume Commercial Chippers',
      'Processes Branches Up to 18" Diameter',
      'Rich Organic Soil Nourishment',
      'Bulk Mulch Delivery Across Townsville',
    ],
    overview: [
      'Disposing of green waste through council transfer stations is time-consuming, costly, and labor-intensive. Our industrial commercial wood chippers process massive piles of branches, prunings, and logs directly on your property in minutes.',
      'The chipped wood creates fresh organic mulch that retains vital soil moisture under the harsh Townsville sun, prevents weed germination, and steadily enriches soil structure.',
    ],
    features: [
      {
        title: 'Fast Pile Reduction',
        desc: 'Our high-powered chippers swallow whole tree branches in seconds, clearing your yard without manual hauling.',
        icon: '⚡',
      },
      {
        title: 'Moisture Retention',
        desc: 'Townsville’s hot climate causes rapid water evaporation; quality mulch cuts watering requirements by up to 60%.',
        icon: '💧',
      },
      {
        title: 'Zero Waste Commitment',
        desc: '100% of organic matter we cut is recycled into mulch, preventing landfill dumping and supporting local ecology.',
        icon: '♻️',
      },
    ],
    faqs: [
      {
        question: 'Can I keep the mulch created from my tree job?',
        answer:
          'Absolutely! We can blow the mulch directly into your garden beds, pile it in a convenient location for later use, or take it away if you prefer.',
      },
      {
        question: 'Do you sell and deliver bulk mulch to properties without a tree job?',
        answer:
          'Yes, we regularly supply high-quality organic arborist mulch by the truckload to homeowners, schools, and commercial landscapers across Townsville.',
      },
      {
        question: 'How thick should I spread the mulch?',
        answer:
          'We recommend a layer 75mm to 100mm (3–4 inches) thick. This provides optimal thermal insulation for plant roots and effectively chokes out weeds.',
      },
      {
        question: 'Can you chip palm trees?',
        answer:
          'Palm fronds and trunks require specialized handling due to fibrous strings. We have equipment equipped to process palms safely and cleanly.',
      },
    ],
  },
  'land-clearing': {
    heroTagline: 'Acreage, Subdivision & Commercial Land Clearing',
    subheading:
      'From single house block preparation to multi-hectare civil subdivisions, our heavy machinery clears dense scrub, trees, and stumps rapidly.',
    highlights: [
      'Acreage & Residential Block Clearing',
      'Bushfire Buffer Zones & Firebreaks',
      'Excavator, Bobcat & Tub Grinder Fleets',
      'Environmental & Council Native Tree Audits',
    ],
    overview: [
      'Preparing raw land for construction, fencing, agriculture, or bushfire protection demands experienced operators and heavy-duty machinery. Arbco Tree Solutions undertakes complete site preparation across Greater Townsville and surrounding rural areas.',
      'We clear scrub, unwanted vegetation, deadfall, and massive trees, followed by complete root ball grubbing and earth leveling so your builders or earthmovers can step onto a pristine site immediately.',
    ],
    features: [
      {
        title: 'Full Civil Readiness',
        desc: 'We remove trees, grub root balls, and grade terrain so civil infrastructure and building pads can commence without delays.',
        icon: '🚜',
      },
      {
        title: 'Bushfire Mitigation',
        desc: 'Creation of mandatory asset protection zones (APZ) and cleared perimeter firebreaks to protect rural properties.',
        icon: '🔥',
      },
      {
        title: 'Ecological Compliance',
        desc: 'We conduct pre-clearance fauna checks and adhere strictly to regional vegetation management codes.',
        icon: '🌿',
      },
    ],
    faqs: [
      {
        question: 'What size properties do you clear?',
        answer:
          'We handle everything from small 400m² residential building blocks to large multi-hectare rural subdivisions and commercial industrial sites.',
      },
      {
        question: 'Do you remove the tree roots and stumps during land clearing?',
        answer:
          'Yes, we use excavators with root rippers and heavy stump grinders to pull and grind root balls below ground level, leaving the land structurally stable for building.',
      },
      {
        question: 'Can you help identify which trees must be preserved by law?',
        answer:
          'Yes, our Level 5 qualified arborists conduct pre-clearing tree health and legal compliance audits, tagging trees that are protected by state or local Townsville planning schemes.',
      },
      {
        question: 'What happens to the cleared vegetation?',
        answer:
          'Depending on your site plan and preferences, vegetation can be processed into mulch on-site, stockpiled for rural erosion control, or completely carted off-site.',
      },
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const service = services.find((s) => s.id === resolvedParams.slug);

  if (!service) {
    return { title: 'Service Not Found | Arbco Tree Solutions' };
  }

  const details = serviceDetails[service.id];
  const pageTitle = `${service.name} Townsville | Arbco Tree Solutions`;
  const pageDesc = details
    ? `${details.heroTagline}. Fully insured Level 5 arborists servicing all Townsville suburbs. Call 0426 204 514 for a free quote.`
    : `${service.description} Servicing all 97 Greater Townsville suburbs.`;

  return {
    title: pageTitle,
    description: pageDesc,
    openGraph: {
      title: pageTitle,
      description: pageDesc,
      images: [
        {
          url: service.localImage || service.heroImage,
          width: 1200,
          height: 630,
          alt: service.name,
        },
      ],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const service = services.find((s) => s.id === resolvedParams.slug);

  if (!service) {
    notFound();
  }

  const details = serviceDetails[service.id] || {
    heroTagline: service.description,
    subheading: service.description,
    highlights: ['$20M Insurance', 'Qualified Arborists', 'Townsville-Wide', 'Free Quotes'],
    overview: [service.description],
    features: [],
    faqs: [],
  };

  // Other services for navigation
  const otherServices = services.filter((s) => s.id !== service.id);

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden bg-[#051c0e] text-white">
        {/* Background Image Overlay */}
        <div
          className="absolute inset-0 opacity-25 bg-cover bg-center"
          style={{ backgroundImage: `url('${service.heroImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#051c0e] via-[#051c0e]/85 to-[#051c0e]/90" />

        <div className="max-w-[1440px] mx-auto relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center text-xs text-slate-400 gap-2 mb-6 font-medium">
            <Link href="/" className="hover:text-[#7cc043] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-[#7cc043] transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-[#7cc043] font-bold">{service.name}</span>
          </div>

          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#7cc043]/20 border border-[#7cc043]/30 text-[#7cc043] text-xs font-bold tracking-widest uppercase">
                <span>🌿</span> {service.tag || 'PROFESSIONAL ARBORIST SERVICES'}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading leading-tight">
                {service.name} <span className="text-[#7cc043]">Townsville</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 max-w-2xl font-sans leading-relaxed">
                {details.subheading}
              </p>

              {/* Highlights Pill Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {details.highlights.map((badge, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 text-sm text-slate-200 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 backdrop-blur-sm"
                  >
                    <svg
                      className="w-4 h-4 text-[#7cc043] shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{badge}</span>
                  </div>
                ))}
              </div>

              {/* Call to Actions */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href="tel:0426204514"
                  className="quote-btn-gradient rounded-xl px-7 py-4 text-sm font-extrabold text-white flex items-center gap-2 transition-transform hover:scale-105 shadow-xl"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  Call 0426 204 514
                </a>
                <Link
                  href={`/quote?service=${service.id}`}
                  className="rounded-xl px-7 py-4 text-sm font-extrabold text-white border border-[#7cc043]/40 hover:bg-[#7cc043]/15 transition-all"
                >
                  Request a Free Quote →
                </Link>
              </div>
            </div>

            {/* Right Card: Feature Image */}
            <div className="lg:col-span-5">
              <div className="relative h-[380px] sm:h-[440px] w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                <Image
                  src={service.localImage || service.heroImage}
                  alt={`${service.name} in Townsville`}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#051c0e]/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#7cc043] block">
                    Certified Queensland Arborists
                  </span>
                  <p className="text-white font-heading font-extrabold text-lg mt-1">
                    Servicing All 97 Townsville & Thuringowa Suburbs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Value Cards */}
      <section className="py-16 bg-white border-b border-slate-200/60">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {details.features.map((feat, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-[#7cc043]/40 hover:shadow-lg transition-all"
              >
                <div className="text-3xl mb-4">{feat.icon}</div>
                <h3 className="text-xl font-extrabold text-slate-900 font-heading mb-2">
                  {feat.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* In-Depth Overview & Visual Gallery */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            {/* Text details */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[#036829] font-black uppercase tracking-wider text-xs">
                Comprehensive Tree Care
              </span>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 font-heading">
                Why Property Owners in Townsville Choose Arbco for {service.name}
              </h2>
              {details.overview.map((para, pIdx) => (
                <p key={pIdx} className="text-slate-600 text-base leading-relaxed">
                  {para}
                </p>
              ))}

              <div className="bg-emerald-950 text-white rounded-2xl p-6 space-y-3 mt-6">
                <div className="flex items-center gap-2 text-[#7cc043] font-bold text-sm">
                  <span>🛡️</span> Complete Property & Safety Guarantee
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Every project is backed by our strict zero-property-damage commitment and $20M
                  insurance policy. We treat your lawns, driveways, garden beds, and fences with
                  absolute care.
                </p>
              </div>
            </div>

            {/* Gallery Images */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-md border border-slate-200">
                <Image
                  src={service.contentImage1 || service.heroImage}
                  alt={`${service.name} on-site action`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-md border border-slate-200">
                <Image
                  src={service.contentImage2 || service.heroImage}
                  alt={`${service.name} equipment in action`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Process Section */}
      <section className="py-20 bg-white border-y border-slate-200/60">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-[#036829] font-black uppercase tracking-wider text-xs">
              Simple & Transparent
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
              How We Deliver Our {service.name} Service
            </h2>
            <p className="text-slate-600 text-base">
              A streamlined, hassle-free process from your initial inquiry to final yard inspection.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: '01',
                title: 'Free On-Site Inspection',
                desc: 'We visit your property, assess the tree anatomy and access points, and provide an honest, obligation-free quote.',
              },
              {
                step: '02',
                title: 'Safety & Council Checks',
                desc: 'We review utility lines, verify permit requirements, and formulate a controlled rigging plan.',
              },
              {
                step: '03',
                title: 'Precision Work',
                desc: 'Our certified climbers and machine operators execute the job with precision, utilizing commercial grade equipment.',
              },
              {
                step: '04',
                title: 'Complete Cleanup',
                desc: 'We chip green waste, sweep pathways, rake lawns, and leave your outdoor area looking immaculate.',
              },
            ].map((st, i) => (
              <div
                key={i}
                className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-all space-y-3 relative overflow-hidden"
              >
                <div className="text-4xl font-extrabold text-[#7cc043]/30 font-heading">
                  {st.step}
                </div>
                <h4 className="text-lg font-bold text-slate-900 font-heading">{st.title}</h4>
                <p className="text-slate-600 text-xs leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section id="quote-form" className="py-20 bg-slate-50">
        <div className="max-w-[1000px] mx-auto px-4">
          <ServiceQuoteForm serviceName={service.name} />
        </div>
      </section>

      {/* FAQs Section */}
      {details.faqs.length > 0 && (
        <section className="py-20 bg-white border-b border-slate-200/60">
          <div className="max-w-[1000px] mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
              <span className="text-[#036829] font-black uppercase tracking-wider text-xs">
                Common Inquiries
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 font-heading">
                Frequently Asked Questions About {service.name}
              </h2>
            </div>

            <div className="space-y-4">
              {details.faqs.map((faq, fIdx) => (
                <div
                  key={fIdx}
                  className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 hover:border-[#7cc043]/50 transition-colors"
                >
                  <h4 className="text-base font-bold text-slate-900 font-heading flex items-start gap-3">
                    <span className="text-[#036829] font-black shrink-0 text-lg">Q.</span>
                    <span>{faq.question}</span>
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed mt-3 pl-7">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Service Areas Link Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-[#036829] font-black uppercase tracking-wider text-xs">
              Local Suburbs
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 font-heading">
              {service.name} Across Greater Townsville
            </h2>
            <p className="text-slate-600 text-sm">
              We service all 97 suburbs across Townsville, Thuringowa, and the surrounding islands.
              Select your suburb below for local details:
            </p>
          </div>

          {/* Region Tabs / Suburb Samples */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {regions.map((region, rIdx) => (
              <div
                key={rIdx}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm"
              >
                <h4 className="font-extrabold text-[#036829] font-heading text-lg mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-5 bg-[#7cc043] rounded-full inline-block" />
                  {region.name}
                </h4>
                <ul className="space-y-2 text-xs">
                  {region.suburbs.slice(0, 6).map((sub, sIdx) => (
                    <li key={sIdx}>
                      <Link
                        href={`/service-areas/${service.id}-${slugify(sub)}`}
                        className="text-slate-600 hover:text-[#036829] flex items-center justify-between group py-1 border-b border-slate-100 last:border-0"
                      >
                        <span>
                          {service.name} {sub}
                        </span>
                        <span className="text-[#7cc043] opacity-0 group-hover:opacity-100 transition-opacity">
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/service-areas"
              className="inline-flex items-center gap-2 text-sm font-extrabold text-[#036829] hover:underline font-heading"
            >
              <span>View All 97 Townsville Suburbs in our Service Directory</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Explore Other Services */}
      <section className="py-20 bg-white border-t border-slate-200/60">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-[#036829] font-black uppercase tracking-wider text-xs">
              Complete Tree Solutions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              Other Arborist Services We Offer
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherServices.map((other, idx) => (
              <Link
                key={idx}
                href={`/services/${other.id}`}
                className="group bg-slate-50 hover:bg-[#051c0e] rounded-2xl p-6 border border-slate-200/80 transition-all flex flex-col justify-between"
              >
                <div>
                  <h4 className="font-extrabold text-slate-900 group-hover:text-white font-heading text-lg transition-colors">
                    {other.name}
                  </h4>
                  <p className="text-slate-500 group-hover:text-slate-300 text-xs mt-2 leading-relaxed transition-colors">
                    {other.description}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-[#036829] group-hover:text-[#7cc043] transition-colors">
                  <span>Learn More</span>
                  <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
