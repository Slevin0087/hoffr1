import {
  setPlayerName,
  skipPlayerName,
} from "../../Store/slices/pages/ipnStore.js";
import { Form, ButtonGroup, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { PAGES_IDS } from "../../Configs/UIConfigs.js";
import { useState } from "react";
import "./InputPlayerName.css";
import { setActivePageId } from "../../Store/slices/ui/slice.js";

function InputPlayerName() {
  console.log("в InputPlayerName");

  const dispatch = useDispatch();
  const playerName = useSelector((state) => state.inputPlayerName.playerName);
  const [disabled, setDisabled] = useState(false);
  console.log("disabled: ", disabled);

  const { t } = useTranslation();

  const placeholder = playerName || t("inputPlayerName.input_name_placeholder");

  const formik = useFormik({
    initialValues: { playerName },
    onSubmit: (values) => {
      setDisabled(true);
      dispatch(setPlayerName(values.playerName));
      dispatch(setActivePageId(PAGES_IDS.GREETINGS));
      setDisabled(false);
    },
  });

  const onClickSkip = () => {
    console.log("skip");

    dispatch(skipPlayerName());
    dispatch(setActivePageId(PAGES_IDS.GREETINGS));
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
            name="playerName"
            id="playerName"
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
