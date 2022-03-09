import { useEffect, useState } from 'react';
import CoinGeckoErrorAlert from './CoinGeckoErrorAlert';
import ExchangesTable from './ExchangesTable';

const Directory = () => {
  const [coingeckoRequestFailed, setCoingeckoRequestFailed] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setCurrentPage] = useState(1);
  const [lastFetchedPage, setLastFetchedPage] = useState();
  const [exchanges, setExchanges] = useState();
  const GET_EXCHANGES_URL = `https://api.coingecko.com/api/v3/exchanges?per_page=10&page=${currentPage}`;

  useEffect(() => {
    if (lastFetchedPage !== currentPage) {
      fetch(GET_EXCHANGES_URL)
        .then((response) => {
          if (response.status !== 200) {
            setCoingeckoRequestFailed(true);
          }
          setLastFetchedPage(currentPage);
          return response.json();
        })
        .then((data) => {
          setExchanges(data);
        });
    }
  });

  return (
    <>
      <h1>Cryptocurrency Exchanges</h1>
      {coingeckoRequestFailed && <CoinGeckoErrorAlert />}
      {exchanges && <ExchangesTable exchanges={exchanges} />}
    </>
  );
};

export default Directory;
