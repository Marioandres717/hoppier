import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { getMerchants, getTransactions, getUsers } from './utils/GraphQLData';
import ExpandableComponent from './components/expandable';

const columns = [
  {
    name: 'First Name',
    selector: 'firstName',
    sortable: true,
  },
  {
    name: 'Last Name',
    selector: 'lastName',
    sortable: true,
  },
  {
    name: 'Card Id',
    selector: 'cardId',
    sortable: true,
  },
  {
    name: 'Summary',
    cell: (row) => summaryOfTotalSpending(row.transactions),
  },
];

function summaryOfTotalSpending(transactions) {
  const total = transactions.reduce(
    (acc, { amountInUSDCents }) => acc + amountInUSDCents,
    0
  );
  return <span>${total / 100}</span>;
}

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const users = await getUsers();
      const transactions = await getTransactions();
      const merchants = await getMerchants();

      const userWithTransactionInformation = users.reduce((acc, user) => {
        const transactionsWithMerchantInfo = transactions.reduce(
          (acc, transaction) => {
            if (transaction.cardId === user.cardId) {
              const merchant = merchants.find(
                (merchant) =>
                  merchant.networkId === transaction.merchantNetworkId
              );
              const transactionWithMerchantInfo = {
                ...transaction,
                ...merchant,
              };
              return [...acc, transactionWithMerchantInfo];
            }
            return acc;
          },
          []
        );
        return [
          ...acc,
          { ...user, transactions: transactionsWithMerchantInfo },
        ];
      }, []);

      console.log(`object`, userWithTransactionInformation);
      setUsers(userWithTransactionInformation);
    }
    fetchData();
  }, []);

  return (
    <div style={{ maxWidth: 700, margin: 'auto' }}>
      <DataTable
        title="Users Transactions"
        columns={columns}
        data={users}
        expandableRows
        expandableRowsComponent={<ExpandableComponent />}
        progressPending={users.length === 0}
      />
    </div>
  );
}

export default App;
