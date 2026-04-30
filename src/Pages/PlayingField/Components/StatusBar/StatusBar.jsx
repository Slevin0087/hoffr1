import "./StatusBar.css";
import Time from "./Components/Time";
import Moves from "./Components/Moves";
import Points from "./Components/Points";
import Achievement from "./Components/Achievement";
import { Row, Col } from "react-bootstrap";
import Notifications from "./Components/Notifications";

function StatusBar() {
  return (
    <Row xs={3} lg={4} className="status-bar">
      <Col>
        <Points />
        <Time />
      </Col>
      <Col>
        <Notifications />
      </Col>
      <Col>
        <Moves />
        <Achievement />
      </Col>
    </Row>
  );
}

export default StatusBar;
