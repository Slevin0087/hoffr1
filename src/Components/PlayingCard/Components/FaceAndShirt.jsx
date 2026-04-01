import "./FaceAndShirt.css";
import { faceAndShirtClassNames } from "../../../Configs/PlayingCardsConfigs/PlayingCardsConfigs";
import { usePlayingCardStyle } from "../../../hooks/usePlayingCardSlyle";

const FaceAndShirt = (props) => {
  const { cardSuit, cardValue } = props;
  const { faceStyle, shirtStyle } = usePlayingCardStyle(cardSuit, cardValue);
  return (
    <>
      <div className={faceAndShirtClassNames.shirt} style={shirtStyle} />
      <div className={faceAndShirtClassNames.face} style={faceStyle} />
    </>
  );
};

export default FaceAndShirt;
