import { useEffect, useState } from 'react';
import { getMerchants, getTransactions, getUsers } from './utils/GraphQLData';
import { CurrencyEnum } from './utils/currencyEnum';
import Table from './components/table';

function App() {
  const [users, setUsers] = useState([]);
  const [currency, setCurrency] = useState(CurrencyEnum.USD);

  const onSelectCurrency = () =>
    setCurrency((value) =>
      value === CurrencyEnum.USD ? CurrencyEnum.CAD : CurrencyEnum.USD
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
    <div style={{ maxWidth: 1200, margin: 'auto' }}>
      <Table
        data={users}
        currency={currency}
        onSelectCurrency={onSelectCurrency}
      />
    </div>
  );
}

export default App;
