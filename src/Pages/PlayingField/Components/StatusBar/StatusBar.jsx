import "./StatusBar.css";
import Achievement from "./Components/Achievement";
import Points from "./Components/Points";
import Moves from "./Components/Moves";
import Time from "./Components/Time";
import { Row, Col } from "react-bootstrap";

function StatusBar() {
  return (
    <Row xs={3} lg={4} className="status-bar">
      <Col>
        <Points />
        <Time />
      </Col>
      <Col>Col2</Col>
      <Col>
        <Moves />
        <Achievement />
      </Col>
    </Row>
  );
}

export default StatusBar;
