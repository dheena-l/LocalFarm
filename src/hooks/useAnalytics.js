import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Sends a GA4 page_view event to Google Analytics every time the route
 * changes. Needed because this is a single-page app — React Router
 * updates the URL without a real browser navigation, so gtag's automatic
 * page_view (which only fires on initial script load) would never see
 * the Products, About, Contact, or Product Detail pages as separate views.
 *
 * Safe to call even if gtag hasn't loaded yet (e.g. an ad blocker, or the
 * placeholder Measurement ID hasn't been replaced) — it just no-ops.
 */
export default function useAnalytics() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag !== "function") return;

    window.gtag("event", "page_view", {
      page_path: location.pathname + location.search,
      page_title: document.title,
      page_location: window.location.href,
    });
  }, [location]);
}
