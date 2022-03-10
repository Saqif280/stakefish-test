import Alert from 'react-bootstrap/Alert';

const CoinGeckoErrorAlert = () => {
  return (
    <Alert variant="danger" data-testid="coingecko-error-alert">
      Hmm ... we can&apos;t reach&nbsp;
      <Alert.Link href="https://www.coingecko.com/" target="_blank">
        CoinGecko
      </Alert.Link>
      &nbsp;for some reason. Make sure you are connected to the internet.
    </Alert>
  );
};

export default CoinGeckoErrorAlert;
