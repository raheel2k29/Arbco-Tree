"use client";

import React, { useEffect } from "react";
import Script from "next/script";
import { GA_MEASUREMENT_ID, GTM_ID, trackClickToCall } from "@/lib/analytics";

export default function GoogleAnalytics() {
  useEffect(() => {
    // 1. Delegated Click-to-Call Event Listener
    // Automatically intercepts any tap or click on any tel: link site-wide
    const handleTelClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a[href^="tel:"]') as HTMLAnchorElement | null;
      if (!target) return;

      const rawHref = target.getAttribute('href') || '';
      const phoneNumber = rawHref.replace(/^tel:/i, '').trim();
      const linkText = target.innerText?.trim() || target.getAttribute('aria-label') || 'Phone Button';
      const containerSection = target.closest('header, footer, nav, section, form, div[id]')?.tagName.toLowerCase() || 'body';

      trackClickToCall(phoneNumber, `${containerSection}: ${linkText}`);
    };

    document.addEventListener('click', handleTelClick, { capture: true });

    // 2. Client-side route change pageview tracking
    const handleRouteChange = () => {
      if (typeof window !== 'undefined' && typeof window.gtag === 'function' && GA_MEASUREMENT_ID) {
        window.gtag('config', GA_MEASUREMENT_ID, {
          page_path: window.location.pathname,
          page_location: window.location.href,
        });
      }
    };

    window.addEventListener('popstate', handleRouteChange);

    return () => {
      document.removeEventListener('click', handleTelClick, { capture: true });
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return (
    <>
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
                  send_page_view: true
                });
              `,
            }}
          />
        </>
      )}

      {/* 2. Google Tag Manager (GTM) Container Script */}
      {GTM_ID && (
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
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        </>
      )}
    </>
  );
}
