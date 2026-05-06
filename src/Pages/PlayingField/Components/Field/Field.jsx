import "./Field.css";
import "./Components/BaseComponents.css";
import Wastes from "./Components/Wastes/Wastes";
import Stocks from "./Components/Stocks/Stocks";
import Tableaus from "./Components/Tableaus/Tableaus";
import Foundations from "./Components/Foundations/Foundations";
import { LayoutGroup } from "motion/react";
import { Container, Stack } from "react-bootstrap";

function Field() {
  console.log("Field re-render");
  return (
    <LayoutGroup>
      <Container fluid className="field-container">
        <div className="cards-container cards-swf-container-min-height">
          <Stack direction="horizontal" gap={3}>
            <Stocks />
            <Wastes />
          </Stack>
          <div className="cards-container cards-fns-container">
            <Foundations />
          </div>
        </div>
        <div className="cards-container cards-tbs-container">
          <Tableaus />
        </div>
      </Container>
    </LayoutGroup>
  );
}

export default Field;
