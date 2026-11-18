// Google Analytics 4 (GA4) & Google Tag Manager (GTM) Event Tracking Helper
// Supports Next.js App Router and standard gtag / dataLayer dispatches

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-CQ4T2ZN6VD";
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "";

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
  if (typeof window === "undefined") return;

  // 1. GA4 gtag dispatch
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, {
      send_to: GA_MEASUREMENT_ID,
      ...params,
    });
  }

  // 2. GTM dataLayer dispatch
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: eventName,
      ...params,
    });
  }

  // 3. Dev / Debug log
  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics Event] ${eventName}`, params);
  }
}

export interface QuoteSubmissionData {
  service?: string;
  suburb?: string;
  name?: string;
  phone?: string;
  source?:
    | "homepage_hero"
    | "quote_page_multi_step"
    | "service_page_quote_form"
    | string;
}

/**
 * Fire GA4 conversion event for successful quote requests
 * Dispatches both standard GA4 'generate_lead' (primary Key Event) and custom 'quote_submission'
 */
export function trackQuoteSubmission(data: QuoteSubmissionData) {
  const payload = {
    event_category: "conversion",
    event_label: `${data.service || "General Inquiry"} - ${data.suburb || "Townsville"}`,
    service: data.service || "General Tree Service",
    suburb: data.suburb || "Greater Townsville",
    source: data.source || "website_form",
    currency: "AUD",
    value: 150.0, // Benchmark lead value for arboriculture quotes
    page_location: typeof window !== "undefined" ? window.location.href : "",
    page_path: typeof window !== "undefined" ? window.location.pathname : "",
  };

  // Standard GA4 Lead Generation Conversion / Key Event
  trackEvent("generate_lead", payload);

  // Custom Arbco Quote Submission Event
  trackEvent("quote_submission", payload);
}

/**
 * Fire GA4 event when user clicks any click-to-call phone link (0456 579 811)
 * Dispatches both 'phone_click' and 'click_to_call' as separate engagement events for Google Ads
 */
export function trackClickToCall(
  phoneNumber: string = "0456 579 811",
  location?: string
) {
  const payload = {
    event_category: "engagement",
    event_label: phoneNumber,
    phone_number: phoneNumber,
    method: "phone",
    link_url: `tel:${phoneNumber.replace(/\s+/g, "")}`,
    location: location || "unknown",
    page_location: typeof window !== "undefined" ? window.location.href : "",
    page_path: typeof window !== "undefined" ? window.location.pathname : "",
  };

  trackEvent("phone_click", payload);
  trackEvent("click_to_call", payload);
  trackEvent("contact", payload);
}

/**
 * Fire GA4 event when user clicks any mailto: email link (info@arbco.com.au)
 * Kept as a separate event for Google Ads conversion tracking evaluation
 */
export function trackEmailClick(
  email: string = "info@arbco.com.au",
  location?: string
) {
  const payload = {
    event_category: "engagement",
    event_label: email,
    email_address: email,
    method: "email",
    link_url: `mailto:${email}`,
    location: location || "unknown",
    page_location: typeof window !== "undefined" ? window.location.href : "",
    page_path: typeof window !== "undefined" ? window.location.pathname : "",
  };

  trackEvent("email_click", payload);
  trackEvent("click_to_email", payload);
}
