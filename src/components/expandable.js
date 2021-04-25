import DataTable from 'react-data-table-component';

const columns = [
  {
    name: 'Date',
    selector: 'date',
    format: (row) => row.date.toString(),
    right: true,
  },
  {
    name: 'Merchant',
    selector: 'name',
    right: true,
  },
  {
    name: 'Amount',
    selector: 'amountInUSDCents',
    format: (row) => `$${row.amountInUSDCents / 100}`,
    right: true,
  },
];

function ExpandableComponent({ data: { transactions } }) {
  return <DataTable title="Summary" columns={columns} data={transactions} />;
}

export default ExpandableComponent;
