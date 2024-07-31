"use client"

import React, { useEffect } from 'react';


export default function Translate() {
  useEffect(() => {
    const loadGoogleTranslate = () => {
      const script = document.createElement('script');
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    };

    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate && window.google.translate.TranslateElement) {
        // Clear any existing instances to prevent duplication
        const existingTranslateElement = document.getElementById('google_translate_element');
        if (existingTranslateElement) {
          existingTranslateElement.innerHTML = '';
        }
        new window.google.translate.TranslateElement(
          { pageLanguage: 'en', includedLanguages: 'en,hi,bn,gu,kn,ml,mr,ta,te,ur' },
          'google_translate_element'
        );
      }
    };

    if (!window.google || !window.google.translate) {
      loadGoogleTranslate();
    } else {
      window.googleTranslateElementInit();
    }

    return () => {
      delete window.googleTranslateElementInit;
    };
  }, []);

  return (
    <div id="google_translate_element"></div>
  );
}
