import DataTable from 'react-data-table-component';
import {
  convertCurrency,
  roundCurrencyToCents,
} from '../utils/currencyConstants';
import ExpandableComponent from './expandable';
import SetCurrencyComponent from './setCurrency';

function summaryOfTotalSpending(transactions) {
  const total = transactions.reduce(
    (acc, { amountInUSDCents }) => acc + amountInUSDCents,
    0
  );
  return total;
}

function getColumns(currency) {
  return [
    {
      name: 'First Name',
      selector: 'firstName',
    },
    {
      name: 'Last Name',
      selector: 'lastName',
    },
    {
      name: 'Card Id',
      selector: 'cardId',
      right: true,
    },
    {
      name: 'Summary',
      cell: (row) =>
        `$${roundCurrencyToCents(
          convertCurrency(currency, summaryOfTotalSpending(row.transactions)) /
            100
        )}`,
      right: true,
    },
  ];
}

function Table({ data, currency, onSelectCurrency }) {
  const columns = getColumns(currency);
  return (
    <DataTable
      title="Users Transactions"
      columns={columns}
      data={data}
      expandableRows
      expandableRowsComponent={<ExpandableComponent currency={currency} />}
      progressPending={data.length === 0}
      pagination
      actions={<SetCurrencyComponent onClick={onSelectCurrency} />}
    />
  );
}

export default Table;
