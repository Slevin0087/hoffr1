import "./AllAchievements.css";
import cn from "classnames";
import { Button, Card, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectAchUnlockedIds } from "../../../../Store/slices/achievements/selectors";
import {
  all_achs_ids_arr,
  currency,
} from "../../../../Configs/AchievementsConfigs";
import {
  getAchIconById,
  getAchPropertyById,
} from "../../../../utils/achievementsUtils";
import { useTranslation } from "react-i18next";
import { selectGame } from "../../../../Store/slices/game/selectors";

function AllAchievements({ onClickClose }) {
  const { t } = useTranslation();
  const unlockedIds = useSelector(selectAchUnlockedIds);
  const gameAllState = useSelector(selectGame);
  return (
    <div className="all-achs-page">
      <Container fluid className="all-ach-container">
        {all_achs_ids_arr?.map((id) => {
          const icon = getAchIconById(id);
          const reward = getAchPropertyById(id, "reward");
          const getProgress = getAchPropertyById(id, "getProgress");
          const currencyData = getAchPropertyById(id, "currency");
          const isUnlocked = unlockedIds?.includes(id);
          const isReward = reward > 0 && reward !== null;
          const isCurrencyData = currencyData !== null;
          const isCurrencyScore = currencyData === currency.SCORE;
          const currencyIcon = isCurrencyData && isCurrencyScore ? "🌟" : "🪙";

          const progessResult = isUnlocked ? 100 : getProgress(gameAllState);

          const progressClasses = cn("ach-item-progress-text", {
            "ach-item-progress-unlocked-text": isUnlocked,
          });

          const achItemClasses = cn("ach-item", {
            "ach-item-unlocked": isUnlocked,
          });

          return (
            <Card key={id} className={achItemClasses}>
              <h5 className={`ach-item-h5 ${isUnlocked ? "unlocked" : ""}`}>
                {t(`achievements.${id}_title`)}
              </h5>
              <div className="ach-item-icon">{icon}</div>
              <p>{t(`achievements.${id}_description`)}</p>
              {isReward && isCurrencyData ? (
                <div className="ach-item-reward">
                  {`${isUnlocked ? "+" : t("achievements.reward")} ${reward}${currencyIcon}`}
                </div>
              ) : null}

              {!isUnlocked ? (
                <div className="ach-item-progress-container">
                  <div
                    className="ach-item-progress-bar"
                    style={{ width: `${progessResult}%` }}
                  />
                  <span className={progressClasses}>
                    {`${progessResult}%/100%`}
                  </span>
                </div>
              ) : null}
            </Card>
          );
        })}
      </Container>
      <Button variant="danger" onClick={onClickClose} className="ach-close-btn">
        {t("playerStats.close_all_achs_btn")}
      </Button>
    </div>
  );
}

export default AllAchievements;
