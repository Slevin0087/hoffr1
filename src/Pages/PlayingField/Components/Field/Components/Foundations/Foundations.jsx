import BaseFoundation from "./BaseFoundation";
import {
  field_components_type_ids,
  field_components_names,
  field_components_types,
  span_text,
} from "../../../../../../Configs/FieldComponentsConfigs";

function Foundations() {
  const classNames = ["foundations"];
  const type = field_components_types.foundations;
  const ids = field_components_type_ids[type];
  const spanText = span_text[field_components_names.foundation];
  return (
    <>
      {ids?.map((id) => {
        return (
          <BaseFoundation
            key={id}
            id={id}
            type={type}
            classNames={classNames}
            spanText={spanText}
          />
        );
      })}
    </>
  );
}

export default Foundations;
