import React from 'react'
import {useEffect} from 'react'

export default function translate() {
        useEffect(() => {
          // Load Google Translate script
          const googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
              { pageLanguage: 'en', includedLanguages: 'en,fr,es,de,it,ja,ko,zh-CN' },
              'google_translate_element'
            );
          };
        
          const script = document.createElement('script');
          script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
          document.body.appendChild(script);
        
          window.googleTranslateElementInit = googleTranslateElementInit;
        }, []);
  return (
        <div id="google_translate_element"></div>
  )
}
