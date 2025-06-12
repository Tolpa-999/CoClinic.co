import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { FaGlobe } from 'react-icons/fa';

const LanguageSwitcher = () => {
  const { t } = useTranslation();
  const currentLanguage = i18n.language;

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
  };

  return (
    <div className="relative group">
      <button 
        className="flex items-center space-x-1 text-gray-600 hover:text-green-700 transition-colors"
        aria-label={t('header.language_switcher')}
      >
        <FaGlobe className="w-4 h-4" />
        <span className="hidden md:inline text-sm font-medium">
          {currentLanguage === 'en' ? 'EN' : 'AR'}
        </span>
      </button>
      
      <div className={`absolute ${currentLanguage === 'en' ? 'left-0' : 'right-0'} mt-2 w-24 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200`}>
        <button
          onClick={() => changeLanguage('en')}
          className={`block w-full text-left px-4 py-2 text-sm ${currentLanguage === 'en' ? 'text-green-600 bg-green-50' : 'text-gray-700 hover:bg-green-50'}`}
        >
          {t('language.english')}
        </button>
        <button
          onClick={() => changeLanguage('ar')}
          className={`block w-full text-left px-4 py-2 text-sm ${currentLanguage === 'ar' ? 'text-green-600 bg-green-50' : 'text-gray-700 hover:bg-green-50'}`}
        >
          {t('language.arabic')}
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;