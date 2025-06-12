import { useEffect } from 'react';
import i18n from 'i18next';

const useLanguageEffect = () => {
  useEffect(() => {
    const applyDirectionAndFont = (lng) => {
      const isArabic = lng === 'ar';
      document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
      document.documentElement.lang = lng;

      // 👇 You can also apply a font class
      document.body.classList.toggle('arabic-font', isArabic);
      document.body.classList.toggle('english-font', !isArabic);
    };

    // Apply once on load
    applyDirectionAndFont(i18n.language);

    // Watch for language changes
    i18n.on('languageChanged', applyDirectionAndFont);

    return () => {
      i18n.off('languageChanged', applyDirectionAndFont);
    };
  }, []);
};

export default useLanguageEffect;
