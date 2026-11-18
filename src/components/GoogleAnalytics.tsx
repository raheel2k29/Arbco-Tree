"use client";

import React, { useEffect, useRef, Suspense } from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import {
  GA_MEASUREMENT_ID,
  GTM_ID,
  trackClickToCall,
  trackEmailClick,
} from "@/lib/analytics";

/**
 * Tracks client-side page transitions in Next.js App Router
 * Skips the first render so the initial pageview is handled by gtag('config') without duplication
 */
function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Avoid duplicate page_view on initial page load
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (
      typeof window !== "undefined" &&
      typeof window.gtag === "function" &&
      GA_MEASUREMENT_ID
    ) {
      const url =
        pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");

      window.gtag("event", "page_view", {
        page_path: url,
        page_location: window.location.href,
        page_title: document.title,
        send_to: GA_MEASUREMENT_ID,
      });
    }
  }, [pathname, searchParams]);

  return null;
}

export default function GoogleAnalytics() {
  useEffect(() => {
    // Delegated Click Listener for Phone (tel:) & Email (mailto:) site-wide
    const handleDocumentClick = (e: MouseEvent) => {
      // 1. Phone Click Tracking (0456 579 811)
      const telTarget = (e.target as HTMLElement)?.closest('a[href^="tel:"]') as HTMLAnchorElement | null;
      if (telTarget) {
        const rawHref = telTarget.getAttribute("href") || "";
        const phoneNumber = rawHref.replace(/^tel:/i, "").trim();
        const linkText =
          telTarget.innerText?.trim() ||
          telTarget.getAttribute("aria-label") ||
          "Phone Button";
        const containerSection =
          telTarget
            .closest("header, footer, nav, section, form, div[id]")
            ?.tagName.toLowerCase() || "body";

        trackClickToCall(phoneNumber, `${containerSection}: ${linkText}`);
        return;
      }

      // 2. Email Click Tracking (info@arbco.com.au)
      const mailtoTarget = (e.target as HTMLElement)?.closest('a[href^="mailto:"]') as HTMLAnchorElement | null;
      if (mailtoTarget) {
        const rawHref = mailtoTarget.getAttribute("href") || "";
        const emailAddress = rawHref
          .replace(/^mailto:/i, "")
          .split("?")[0]
          .trim();
        const linkText =
          mailtoTarget.innerText?.trim() ||
          mailtoTarget.getAttribute("aria-label") ||
          "Email Link";
        const containerSection =
          mailtoTarget
            .closest("header, footer, nav, section, form, div[id]")
            ?.tagName.toLowerCase() || "body";

        trackEmailClick(emailAddress, `${containerSection}: ${linkText}`);
        return;
      }
    };

    document.addEventListener("click", handleDocumentClick, { capture: true });

    return () => {
      document.removeEventListener("click", handleDocumentClick, {
        capture: true,
      });
    };
  }, []);

  return (
    <>
      {/* Route Change Tracker (Wrapped in Suspense for Next.js static prerendering safety) */}
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>

      {/* 1. Google Analytics 4 (gtag.js) Direct Installation */}
      {GA_MEASUREMENT_ID && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          />
          <Script
            id="google-analytics-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                  page_location: window.location.href,
                  send_page_view: true
                });
              `,
            }}
          />
        </>
      )}

      {/* 2. Optional Separate GTM Container (Loaded only if explicitly set and distinct from GA4) */}
      {GTM_ID &&
        GTM_ID !== GA_MEASUREMENT_ID &&
        GTM_ID !== "GTM-N4TSXHTH" && (
          <>
            <Script
              id="google-tag-manager-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','${GTM_ID}');
                `,
              }}
            />
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
              />
            </noscript>
          </>
        )}
    </>
  );
}
