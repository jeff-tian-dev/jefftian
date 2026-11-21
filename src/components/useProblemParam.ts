"use client";

import { useCallback, useEffect, useState } from "react";

const PARAM = "p";

/**
 * Keeps the open problem in sync with `?p=<id>` so every problem has a
 * shareable URL, and the browser back button closes the panel.
 *
 * Opening from the list pushes one history entry; switching between
 * problems replaces it, so a single Back always returns to the list.
 */
export function useProblemParam(ids: readonly string[]) {
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    const sync = () => {
      const id = new URLSearchParams(window.location.search).get(PARAM);
      setOpenId(id && ids.includes(id) ? id : null);
    };
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, [ids]);

  const open = useCallback((id: string) => {
    const url = new URL(window.location.href);
    const alreadyOpen = url.searchParams.has(PARAM);
    url.searchParams.set(PARAM, id);
    url.hash = "";
    // Spread the existing state so Next.js keeps its router entry.
    const state = { ...(window.history.state ?? {}) };
    if (alreadyOpen) {
      window.history.replaceState(state, "", url);
    } else {
      window.history.pushState({ ...state, problemOverlay: true }, "", url);
    }
    setOpenId(id);
  }, []);

  const close = useCallback(() => {
    if (window.history.state?.problemOverlay) {
      // We pushed this entry, so going back restores the list URL exactly.
      window.history.back();
      return;
    }
    // Arrived via a shared link: drop the param without leaving the page.
    const url = new URL(window.location.href);
    url.searchParams.delete(PARAM);
    window.history.replaceState({ ...(window.history.state ?? {}) }, "", url);
    setOpenId(null);
  }, []);

  return { openId, open, close };
}
