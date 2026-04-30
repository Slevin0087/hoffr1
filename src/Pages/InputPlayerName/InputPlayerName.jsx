import "./InputPlayerName.css";
import { useState } from "react";
import { useFormik } from "formik";
import { PAGES_IDS } from "../../Configs/UIConfigs.js";
import { setPlayerName } from "../../Store/slices/game/slice.js";
import { useTranslation } from "react-i18next";
import { setActivePageId } from "../../Store/slices/ui/slice.js";
import { selectPlayerName } from "../../Store/slices/game/selectors.js";
import { useDispatch, useSelector } from "react-redux";
import { Form, ButtonGroup, Button } from "react-bootstrap";
import { handleGameInit } from "../../Store/slices/game/thunks.js";

function InputPlayerName() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const playerName = useSelector(selectPlayerName);
  const [disabled, setDisabled] = useState(false);
  const placeholder = playerName || t("inputPlayerName.input_name_placeholder");
  const formik = useFormik({
    initialValues: { playerName },
    onSubmit: (values) => {
      setDisabled(true);
      const name = values.playerName.trim();
      dispatch(setPlayerName({ name }));
      dispatch(setActivePageId(PAGES_IDS.PLAYING_FIELD));
      dispatch(handleGameInit());
      setDisabled(false);
    },
  });
  const onClickSkip = () => {
    dispatch(setActivePageId(PAGES_IDS.PLAYING_FIELD));
    dispatch(handleGameInit());
  };
  return (
    <div className="inputPlayerName-page">
      <Form className="inputPlayerName-form" onSubmit={formik.handleSubmit}>
        <Form.Group className="inputPlayerName-group">
          <Form.Label
            htmlFor="playerName"
            className="fs-5 fs-md-4 fw-bold mb-3"
            style={{ cursor: "pointer" }}
          >
            {t("inputPlayerName.input_name")}
          </Form.Label>
          <Form.Control
            placeholder={placeholder}
            id="playerName"
            name="playerName"
            onChange={formik.handleChange}
            value={formik.values.playerName}
            required
          ></Form.Control>
        </Form.Group>
        <ButtonGroup
          aria-label={t("inputPlayerName.input_name_aria_label")}
          className="d-flex gap-3"
        >
          <Button className="pages-btn" type="submit" disabled={disabled}>
            {t("inputPlayerName.input_name_submit_btn")}
          </Button>
          <Button className="pages-btn" type="button" onClick={onClickSkip}>
            {t("inputPlayerName.input_name_skip_btn")}
          </Button>
        </ButtonGroup>
      </Form>
    </div>
  );
}

export default InputPlayerName;
