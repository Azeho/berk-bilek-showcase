import { useEffect } from "react";

const BASE_URL = "https://berk-bilek.com";

export function useCanonical(path: string) {
  useEffect(() => {
    const url = `${BASE_URL}${path}`;
    let link = document.querySelector<HTMLLinkElement>("link[rel='canonical']");
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", url);
    return () => {
      link?.setAttribute("href", BASE_URL + "/");
    };
  }, [path]);
}
