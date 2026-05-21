import './LandscapeStatusBar.css'
import { Row, Col } from "react-bootstrap";
import Points from "../StatusBar/Components/Points";
import Time from "../StatusBar/Components/Time";
import Notifications from "../StatusBar/Components/Notifications";
import Moves from "../StatusBar/Components/Moves";
import Achievement from "../StatusBar/Components/Achievement";

function LandscapeStatusBar() {
  return (
    <Row xs={3} lg={4} className="landscape-status-bar">
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

export default LandscapeStatusBar;
