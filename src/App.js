import { useEffect, useState } from 'react';
import { getMerchants, getTransactions, getUsers } from './utils/GraphQLData';
import { CURRENCY_ENUM } from './utils/currencyConstants';
import Table from './components/table';

function App() {
  const [users, setUsers] = useState([]);
  const [currency, setCurrency] = useState(CURRENCY_ENUM.USD);
  const onSelectCurrency = () =>
    setCurrency((value) =>
      value === CURRENCY_ENUM.USD ? CURRENCY_ENUM.CAD : CURRENCY_ENUM.USD
    );

  useEffect(() => {
    async function fetchData() {
      const users = await getUsers();
      const transactions = await getTransactions();
      const merchants = await getMerchants();

      const userWithTransactionInformation = transformData(
        users,
        transactions,
        merchants
      );
      setUsers(userWithTransactionInformation);
    }
    fetchData();
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: 'auto' }}>
      <Table
        data={users}
        currency={currency}
        onSelectCurrency={onSelectCurrency}
      />
    </div>
  );
}

export default App;

function transformData(users, transactions, merchants) {
  return transactions
    .map((transaction) => {
      const user = users.find(({ cardId }) => cardId === transaction.cardId);
      const merchant = merchants.find(
        ({ networkId }) => networkId === transaction.merchantNetworkId
      );
      return {
        ...user,
        transactionWithCompleteInfo: { ...transaction, ...merchant },
      };
    })
    .reduce((acc, val) => {
      const userIndex = acc.findIndex(({ cardId }) => cardId === val.cardId);
      if (userIndex >= 0) {
        acc[userIndex].transactions = [
          ...acc[userIndex].transactions,
          val.transactionWithCompleteInfo,
        ];
        return acc;
      }
      const { transactionWithCompleteInfo } = val;
      return [...acc, { ...val, transactions: [transactionWithCompleteInfo] }];
    }, []);
}
