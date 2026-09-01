import React from 'react';

// Simple deterministic hash based on a string to always return the same index for the same slug
function hashSlug(slug: string, max: number): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = slug.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % max;
}

export function generateSpintaxContent(slug: string, serviceName: string, suburbName: string) {
  const serviceLower = serviceName.toLowerCase();
  
  // Variations for the first H2
  const h2Variations = [
    `Expert ${serviceName} in ${suburbName}`,
    `Professional ${serviceName} Services for ${suburbName} Residents`,
    `Your Trusted Local Arborists for ${serviceName} in ${suburbName}`
  ];

  // Variations for the Intro Paragraph
  const introVariations = [
    <p key="intro-1">
      Are you dealing with an overgrown, hazardous, or simply unwanted tree? Arbco Tree Solutions is your trusted local provider for professional <strong>{serviceLower}</strong> throughout {suburbName}. As a locally owned and operated business, we pride ourselves on delivering prompt, efficient, and exceptionally safe tree care solutions tailored specifically to the unique environment of {suburbName}.
    </p>,
    <p key="intro-2">
      Finding reliable <strong>{serviceLower}</strong> in {suburbName} shouldn't be a hassle. At Arbco Tree Solutions, we bring years of hands-on arborist experience directly to your doorstep. Whether you have a residential backyard or a large commercial property in {suburbName}, our dedicated team guarantees safe, top-tier workmanship that protects your property and enhances your landscape.
    </p>,
    <p key="intro-3">
      When property owners in {suburbName} need safe and effective <strong>{serviceLower}</strong>, they turn to Arbco Tree Solutions. Trees are a beautiful part of the {suburbName} landscape, but when they become damaged, diseased, or dangerous, you need qualified professionals to step in. We handle every job with the utmost precision, ensuring your complete satisfaction.
    </p>
  ];

  // Variations for the Body Paragraph
  const bodyVariations = [
    <p key="body-1">
      Whether it's the aftermath of a severe Townsville storm, a tree encroaching on your property's foundations, or general landscape clearing, our qualified arborists arrive fully equipped to handle projects of any scale. We understand that every property in {suburbName} is different, which is why we conduct thorough site assessments before beginning any {serviceLower} work to ensure maximum safety for your home and family.
    </p>,
    <p key="body-2">
      Every {serviceLower} project we undertake in {suburbName} begins with a comprehensive risk assessment. From navigating tight property boundaries to protecting your pristine gardens, our crews utilize state-of-the-art rigging and machinery. You can rest easy knowing that the leading tree care specialists in {suburbName} are actively managing your project from start to finish.
    </p>,
    <p key="body-3">
      Townsville's unique weather patterns mean that trees in {suburbName} require specialized care and attention. Our local arborists are not only fully licensed but possess deep knowledge of the native and introduced species common to {suburbName}. This expertise allows us to perform {serviceLower} with unmatched efficiency, ensuring no damage to your surrounding infrastructure.
    </p>
  ];

  // Pick variations based on the slug hash! 
  // By passing different offset values (+1, +2), we ensure they don't all pick index 0 simultaneously.
  const selectedH2 = h2Variations[hashSlug(slug, h2Variations.length)];
  const selectedIntro = introVariations[hashSlug(slug + "intro", introVariations.length)];
  const selectedBody = bodyVariations[hashSlug(slug + "body", bodyVariations.length)];

  return {
    h2: selectedH2,
    intro: selectedIntro,
    body: selectedBody
  };
}
