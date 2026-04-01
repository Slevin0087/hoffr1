import { useTranslation } from "react-i18next";

function Welcome() {
  const { t } = useTranslation();

  return (
    <>
      {/* Заголовок */}
      <h1 className="greetings-page-h1 text-center mb-4">
        {t("greetings.welcome_h1")}
      </h1>
    </>
  );
}

export default Welcome;
