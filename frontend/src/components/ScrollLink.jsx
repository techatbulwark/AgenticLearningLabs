import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollLink() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 0);
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [hash]);

  return null;
}
