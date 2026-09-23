import { useEffect } from "react";

/**
 * Sets a unique <title> and meta description for the current page.
 *
 * Search engines rank pages individually — shipping the same <title> and
 * description for every route (as index.html does by default) makes every
 * page on the site look identical to a crawler, which hurts indexing and
 * ranking. Call this once per page component with content specific to
 * that page.
 */
export default function usePageMeta(title, description) {
  useEffect(() => {
    if (title) document.title = title;

    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", "description");
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", description);
    }
  }, [title, description]);
}
