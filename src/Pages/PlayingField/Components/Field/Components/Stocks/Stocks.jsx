import BaseStock from "./BaseStock";
import {
  field_components_type_ids,
  field_components_names,
  field_components_types,
  span_text,
} from "../../../../../../Configs/FieldComponentsConfigs";

function Stocks() {
  const classnames = ["stocks"];
  const type = field_components_types.stocks;
  const ids = field_components_type_ids[type];
  const spanText = span_text[field_components_names.stock];
  const needByRedealsText = `+${spanText}`;
  return (
    <>
      {ids?.map((id) => {
        return (
          <BaseStock
            key={id}
            id={id}
            classNames={classnames}
            spanText={spanText}
            needByRedealsText={needByRedealsText}
          />
        );
      })}
    </>
  );
}

export default Stocks;
