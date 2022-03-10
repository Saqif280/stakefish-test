import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import CoinGeckoErrorAlert from '../CoinGeckoErrorAlert';

/**
 * TODO: Add shimmer for when exchangeInfo is undefined
 */
const ExchangePage = () => {
  const [coingeckoRequestFailed, setCoingeckoRequestFailed] = useState(false);
  const [exchangeInfo, setExchangeInfo] = useState();
  const { id } = useParams();
  const GET_EXCHANGE_URL = `https://api.coingecko.com/api/v3/exchanges/${id}`;

  useEffect(() => {
    if (!exchangeInfo) {
      fetch(GET_EXCHANGE_URL)
        .then((response) => {
          if (response.status !== 200) {
            setCoingeckoRequestFailed(true);
          }
          return response.json();
        })
        .then((data) => {
          setExchangeInfo(data);
          console.log(data.slack_url);
        });
    }
  });

  return (
    <div data-testid="exchange-page">
      <Link to="/">Back to Exchanges List</Link>
      <div>
        {coingeckoRequestFailed && <CoinGeckoErrorAlert />}
        {exchangeInfo && (
          <>
            {exchangeInfo.image && <img src={exchangeInfo.image} />}
            {exchangeInfo.name && <h1>{exchangeInfo.name}</h1>}
            {exchangeInfo.country && <p>Country: {exchangeInfo.country}</p>}
            {exchangeInfo.trust_score_rank && (
              <p>Trust Score Rank: {exchangeInfo.trust_score_rank}</p>
            )}
            {exchangeInfo.year_established && (
              <p>Year Established: {exchangeInfo.year_established}</p>
            )}
            {exchangeInfo.description && <p>Description: {exchangeInfo.description}</p>}
            {exchangeInfo.twitter_handle && (
              <p>
                <a href={exchangeInfo.url} target="_blank" rel="noreferrer">
                  Website
                </a>
              </p>
            )}
            {exchangeInfo.twitter_handle && (
              <p>
                <a
                  href={`https://www.facebook.com/${exchangeInfo.facebook_url}`}
                  target="_blank"
                  rel="noreferrer">
                  Facebook
                </a>
              </p>
            )}
            {exchangeInfo.twitter_handle && (
              <p>
                <a
                  href={`https://www.twitter.com/${exchangeInfo.twitter_handle}`}
                  target="_blank"
                  rel="noreferrer">
                  Twitter
                </a>
              </p>
            )}
            {exchangeInfo.reddit_url && (
              <p>
                <a
                  href={`https://www.reddit.com/${exchangeInfo.reddit_url}`}
                  target="_blank"
                  rel="noreferrer">
                  Reddit
                </a>
              </p>
            )}
            {exchangeInfo.telegram_url && (
              <p>
                <a
                  href={`https://www.t.me/${exchangeInfo.telegram_url}`}
                  target="_blank"
                  rel="noreferrer">
                  Telegram
                </a>
              </p>
            )}
            {exchangeInfo.slack_url && (
              <p>
                <a
                  href={`https://www.slack.com/${exchangeInfo.slack_url}`}
                  target="_blank"
                  rel="noreferrer">
                  Slack
                </a>
              </p>
            )}
            {exchangeInfo.other_url_1 && (
              <p>
                <a href={exchangeInfo.other_url_1} target="_blank" rel="noreferrer">
                  Additional Link 1
                </a>
              </p>
            )}
            {exchangeInfo.other_url_2 && (
              <p>
                <a href={exchangeInfo.other_url_2} target="_blank" rel="noreferrer">
                  Additional Link 2
                </a>
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ExchangePage;
