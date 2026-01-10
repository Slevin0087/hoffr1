import { useState } from "react";
import { useFormik } from "formik";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./InputPlayerName.css";
import { setPlayerName } from "../../Store/ipnStore.jsx";
import { useDispatch, useSelector } from "react-redux";

function InputPlayerName() {
  const dispatch = useDispatch();
  const playerName = useSelector((state) => state.inputPlayerName.playerName);
  const [disabled, setDisabled] = useState(false);

  const formik = useFormik({
    initialValues: { playerName },
    onSubmit: (values) => {
      setDisabled(true);
      console.log("ddddddddd: ", values, playerName);
      dispatch(setPlayerName(values.playerName));
      setDisabled(false);
    },
  });
  return (
    <div className="inputPlayerName-page">
      <Form className="inputPlayerName-form" onSubmit={formik.handleSubmit}>
        <Form.Group className="inputPlayerName-group">
          <Form.Label htmlFor="playerName">Введите имя</Form.Label>
          <Form.Control
            placeholder={playerName}
            name="playerName"
            id="playerName"
            onChange={formik.handleChange}
            value={formik.values.playerName}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="inputPlayerName-btns-group">
          <Button type="submit" disabled={disabled}>
            Начать игру
          </Button>
          <Button type="button">Пропустить</Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default InputPlayerName;
