import DataTable from 'react-data-table-component';
import ExpandableComponent from './expandable';
import SetCurrencyComponent from './setCurrency';

const columns = [
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
    cell: (row) => summaryOfTotalSpending(row.transactions),
    right: true,
  },
];

function summaryOfTotalSpending(transactions) {
  const total = transactions.reduce(
    (acc, { amountInUSDCents }) => acc + amountInUSDCents,
    0
  );
  return <span>${total / 100}</span>;
}

function Table({ data, currency, onSelectCurrency }) {
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
