// Google Analytics 4 (GA4) & Google Tag Manager (GTM) Event Tracking Helper
// Supports Next.js App Router and standard gtag / dataLayer dispatches

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';

// Type-safe global Window interface augmentation
declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Dispatch a generic custom event to GA4 via gtag or dataLayer
 */
export function trackEvent(eventName: string, params: Record<string, any> = {}) {
  if (typeof window === 'undefined') return;

  // 1. GA4 gtag dispatch
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }

  // 2. GTM dataLayer dispatch
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: eventName,
      ...params,
    });
  }

  // 3. Dev / Debug log
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics Event] ${eventName}`, params);
  }
}

export interface QuoteSubmissionData {
  service?: string;
  suburb?: string;
  name?: string;
  phone?: string;
  source?: 'homepage_hero' | 'quote_page_multi_step' | 'service_page_quote_form' | string;
}

/**
 * Fire GA4 conversion event for successful quote requests
 * Dispatches both standard GA4 'generate_lead' and custom 'quote_submission'
 */
export function trackQuoteSubmission(data: QuoteSubmissionData) {
  const payload = {
    event_category: 'conversion',
    event_label: `${data.service || 'General Inquiry'} - ${data.suburb || 'Townsville'}`,
    service: data.service || 'General Tree Service',
    suburb: data.suburb || 'Greater Townsville',
    source: data.source || 'website_form',
    currency: 'AUD',
    value: 0,
    page_location: typeof window !== 'undefined' ? window.location.href : '',
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
  };

  // Standard GA4 Lead Generation Conversion Event
  trackEvent('generate_lead', payload);

  // Custom Arbco Quote Submission Event
  trackEvent('quote_submission', payload);
}

/**
 * Fire GA4 event when user clicks any click-to-call phone link (0456 579 811)
 * Dispatches both custom 'click_to_call' and standard GA4 'contact'
 */
export function trackClickToCall(phoneNumber: string = '0456 579 811', location?: string) {
  const payload = {
    event_category: 'engagement',
    event_label: phoneNumber,
    phone_number: phoneNumber,
    method: 'phone',
    location: location || 'unknown',
    page_location: typeof window !== 'undefined' ? window.location.href : '',
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
  };

  trackEvent('click_to_call', payload);
  trackEvent('contact', payload);
}
