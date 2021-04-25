import DataTable from 'react-data-table-component';

const columns = [
  {
    name: 'Date',
    selector: 'date',
    // sortable: true,
  },
  {
    name: 'Merchant',
    selector: 'name',
    // sortable: true,
  },
  {
    name: 'Amount',
    selector: 'amountInUSDCents',
    // sortable: true
  },
];

function ExpandableComponent({ data }) {
  return <DataTable title="Summary" columns={columns} data={data} />;
}

export default ExpandableComponent;
