import DataTable from 'react-data-table-component';
import {
  convertCurrency,
  roundCurrencyToCents,
} from '../utils/currencyConstants';

function ExpandableComponent({ data: { transactions }, currency }) {
  const columns = [
    {
      name: 'Date',
      selector: 'date',
      format: (row) => row.date.toString(),
      sortable: true,
    },
    {
      name: 'Merchant',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Network ID',
      selector: 'networkId',
      right: true,
    },
    {
      name: 'Amount',
      selector: 'amountInUSDCents',
      format: (row) =>
        `$${roundCurrencyToCents(
          convertCurrency(currency, row.amountInUSDCents) / 100
        )}`,
      right: true,
      sortable: true,
    },
  ];
  return <DataTable title="Summary" columns={columns} data={transactions} />;
}

export default ExpandableComponent;
