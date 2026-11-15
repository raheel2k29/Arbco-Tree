export interface SuburbServiceOverride {
  seoTitle?: string;
  metaDescription?: string;
  h1Subtitle?: string;
  heroDescription?: string;
  challengesSection?: {
    heading: string;
    introParagraphs: string[];
    bulletPoints: string[];
    footerParagraph?: string;
  };
  stormDamagedSection?: {
    heading: string;
    paragraphs: string[];
  };
  processHeading?: string;
  processSteps?: { title: string; desc: string }[];
  faqs?: { question: string; answer: string }[];
  quoteCtaSection?: {
    heading: string;
    paragraphs: string[];
  };
}

export const suburbServiceOverrides: Record<string, SuburbServiceOverride> = {
  'tree-removal-aitkenvale': {
    seoTitle: 'Tree Removal Aitkenvale | Arbco Tree Services',
    metaDescription:
      'Need tree removal in Aitkenvale? Arbco provides professional tree removal, storm-damaged tree assessments and stump grinding options. Call 0456 579 811.',
    processHeading: 'Our Tree Removal Process in Aitkenvale',
    processSteps: [
      {
        title: 'Tree Inspection and Risk Assessment',
        desc: 'Before removing a tree in Aitkenvale, we assess its size, condition, location and proximity to surrounding structures. Particular attention is given to residential buildings, fences, driveways, overhead services and neighbouring properties. This assessment helps determine the most appropriate removal technique and identify potential hazards.',
      },
      {
        title: 'Property Access and Equipment Planning',
        desc: 'We assess the available working space and determine which equipment and removal methods are suitable for the property. Trees positioned in narrow side yards, close to buildings or within restricted access areas may require climbing, sectional dismantling or controlled rigging techniques.',
      },
      {
        title: 'Controlled Tree Removal',
        desc: "Depending on the tree's condition and location, removal may involve cutting branches and trunk sections in a planned sequence. Appropriate equipment and controlled removal techniques are used to minimise risks to surrounding buildings, fences, gardens and neighbouring vegetation.",
      },
      {
        title: 'Site Cleanup and Green Waste Management',
        desc: "Following tree removal, our team completes the cleanup included in the agreed scope of work. Branches and timber may be chipped, removed or retained on-site depending on the customer's requirements. Stump grinding and additional waste disposal can also be discussed during quoting.",
      },
    ],
    challengesSection: {
      heading: 'Tree Removal Challenges in Aitkenvale',
      introParagraphs: [
        'Tree removal in Aitkenvale can involve working around established residential properties, nearby buildings, driveways, fences and existing landscaping.',
        'Trees growing close to homes or neighbouring structures may require additional planning, particularly where conventional ground-level felling is unsuitable.',
        'Common considerations when planning tree removal in Aitkenvale include:',
      ],
      bulletPoints: [
        'Large trees growing close to residential buildings.',
        'Branches extending over roofs, fences or neighbouring properties.',
        'Restricted access through side gates and narrow driveways.',
        'Trees with storm-damaged limbs or structural defects.',
        'Root systems located near paving, driveways or underground services.',
        'Green waste handling and stump grinding following removal.',
      ],
      footerParagraph:
        "Arbco Tree Services assesses each property individually to determine an appropriate removal method based on the tree's condition, surrounding hazards and available working space.",
    },
    stormDamagedSection: {
      heading: 'Storm-Damaged Tree Removal in Aitkenvale',
      paragraphs: [
        "Townsville's tropical storm season can expose trees to strong winds, heavy rainfall and changing ground conditions.",
        'Trees with split trunks, broken branches, damaged root systems or significant structural defects may present risks to nearby buildings, vehicles and pedestrians.',
        'Arbco Tree Services can assess enquiries involving storm-damaged and hazardous trees in Aitkenvale.',
        'Depending on the condition of the tree, suitable options may include removing damaged sections, undertaking further assessment or removing the tree where necessary.',
        'Customers should avoid approaching fallen trees or branches near electrical infrastructure and contact the appropriate electricity network operator if powerlines are involved.',
      ],
    },
    faqs: [
      {
        question: 'How much does tree removal cost in Aitkenvale?',
        answer:
          "Tree removal costs in Aitkenvale depend on the tree's size, condition, location, access requirements and the equipment needed to complete the work. Trees positioned close to buildings, fences or overhead services may require additional planning and specialised removal techniques. Contact Arbco Tree Services on 0456 579 811 for a quote based on your property.",
      },
      {
        question: 'Can you remove trees close to houses and fences?',
        answer:
          "Trees located close to buildings, fences and neighbouring properties may require sectional dismantling, climbing or controlled rigging techniques. The most appropriate removal method depends on the tree's condition, available working space and surrounding hazards.",
      },
      {
        question: 'Do I need council approval to remove a tree in Aitkenvale?',
        answer:
          'Tree removal requirements depend on the property, vegetation type and any applicable planning or environmental protections. Property owners should confirm whether approval is required through Townsville City Council before proceeding with tree removal.',
      },
      {
        question: 'Can you remove the stump after cutting down a tree?',
        answer:
          "Stump grinding can be arranged as an additional service where suitable. The appropriate grinding method depends on the stump's size, location, surrounding structures, underground services and available machinery access.",
      },
      {
        question: 'What happens to the branches and timber after tree removal?',
        answer:
          "Branches and timber may be chipped, removed or retained on-site depending on the agreed scope of work. Customers can discuss cleanup, green waste disposal and stump grinding requirements when requesting a quote.",
      },
    ],
    quoteCtaSection: {
      heading: 'Request a Tree Removal Quote in Aitkenvale',
      paragraphs: [
        'Need assistance with an unwanted, damaged or potentially hazardous tree in Aitkenvale?',
        'Arbco Tree Services provides tree removal assessments and quoting for residential and commercial properties throughout Aitkenvale and surrounding Townsville suburbs.',
        'Whether your tree is positioned close to a building, affected by storm damage or located in a restricted access area, contact our team to discuss the available removal options.',
        'Call Arbco Tree Services on 0456 579 811 to request a quote.',
      ],
    },
  },
};
