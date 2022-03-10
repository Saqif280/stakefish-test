import Alert from 'react-bootstrap/Alert';

/**
 * The CoinGeckoErrorAlert component is a static component that renders an alert to the
 * user warning them that the CoinGecko API request failed.
 */
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
