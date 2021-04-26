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
