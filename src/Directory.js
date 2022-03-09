import { useEffect, useState } from 'react';
import CoinGeckoErrorAlert from './CoinGeckoErrorAlert';

const Directory = () => {
  const [coingeckoRequestFailed, setCoingeckoRequestFailed] = useState(false);
  const url = 'https://api.coingecko.com/api/v3/exchanges?per_page=10&page=1';

  useEffect(() => {
    fetch(url).then((response) => {
      if (response.status !== 200) {
        setCoingeckoRequestFailed(true);
      }
    });
  });

  return (
    <>
      <h1>Cryptocurrency Exchanges</h1>
      {coingeckoRequestFailed && <CoinGeckoErrorAlert />}
    </>
  );
};

export default Directory;
