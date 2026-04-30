import BaseTableau from "./BaseTableau";
import {
  field_components_type_ids,
  field_components_names,
  field_components_types,
  span_text,
} from "../../../../../../Configs/FieldComponentsConfigs";

function Tableaus() {
  console.log("Tableaus re-render");
  const classNames = ["tableaus"];
  const type = field_components_types.tableaus;
  const ids = field_components_type_ids[type];
  const spanText = span_text[field_components_names.tableau];

  return (
    <>
      {ids?.map((id) => {
        return (
          <BaseTableau
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

export default Tableaus;
