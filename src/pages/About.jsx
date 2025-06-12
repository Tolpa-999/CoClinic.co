import { useTranslation } from "react-i18next";

const About = () => {
  const {t} = useTranslation()
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 text-center">
      <h2 className="text-4xl font-bold text-gray-800 mb-6">
        {t('about.co')}
      </h2>
      <p className="text-lg text-gray-600 mb-4">
        {t('about.description1')}
      </p>
      <p className="text-lg text-gray-600">
        {t('about.description2')}
      </p>
    </div>
  );
}

export default About;
