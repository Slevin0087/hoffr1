import './StatRow.css'
import { useTranslation } from "react-i18next";

function StatRow({ label, value }) {
  const { t } = useTranslation();
  return (
    <tr className='stat-row-tr'>
      <td className="left-td">{t(label)}</td>
      <td className="right-td">{value ?? 0}</td>
    </tr>
  );
}

export default StatRow;
