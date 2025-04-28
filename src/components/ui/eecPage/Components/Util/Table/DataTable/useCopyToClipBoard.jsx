import { useCallback } from "react";
import { useState } from "react";


export const useCopyToClipboard=() => {
  const [copiedText, setCopiedText] = useState(null);

  const copy = useCallback(async (text) => {
    // Check for HTTPS and clipboard support
    if (window.isSecureContext && navigator?.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        setCopiedText(text);
        return true;
      } catch (error) {
        console.warn("Copy to clipboard failed", error);
      }
    }

    // Fallback method using execCommand
    return fallbackCopyText(text);
  }, []);

  const fallbackCopyText = async (text) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed"; // Avoid scrolling to bottom
    textarea.style.left = "-9999px"; // Element is out of viewport
    document.body.appendChild(textarea);
    textarea.select();

    try {
      const successful = document.execCommand("copy");
      setCopiedText(successful ? text : null);
      return successful;
    } catch (err) {
      console.warn("Copy to clipboard failed", err);
      setCopiedText(null);
      return false;
    } finally {
      document.body.removeChild(textarea);
    }
  };

  return [copiedText, copy];
}
