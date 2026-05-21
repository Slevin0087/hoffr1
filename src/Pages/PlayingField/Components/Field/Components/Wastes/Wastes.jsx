import BaseWaste from "./BaseWaste";
import {
  field_components_type_ids,
  // field_components_names,
  field_components_types,
  // span_text,
} from "../../../../../../Configs/FieldComponentsConfigs";

function Wastes() {
  console.log("Wastes re-render");
  const classNames = ["wastes"];
  const type = field_components_types.wastes;
  const ids = field_components_type_ids[type];
  // const spanText = span_text[field_components_names.waste];
  return (
    <>
      {ids?.map((id) => {
        return (
          <BaseWaste
            key={id}
            id={id}
            classNames={classNames}
            // spanText={spanText}
          />
        );
      })}
    </>
  );
}

export default Wastes;
