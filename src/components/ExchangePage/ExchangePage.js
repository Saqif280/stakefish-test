import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import CoinGeckoErrorAlert from '../CoinGeckoErrorAlert';

/**
 * TODO: Add shimmer for when exchangeInfo is undefined
 */

/**
 * The ExchangePage component attempts to make an API call to coingecko to get details on
 * the selected exchange. The data is rendered to the user if available. If the API call
 * fails, CoinGeckoErrorAlert is rendered.
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
        });
    }
  });

  return (
    <div data-testid="exchange-page">
      <Link to="/" className="back-link">
        <FaChevronLeft /> Back to Exchanges List
      </Link>
      <div>
        {coingeckoRequestFailed && <CoinGeckoErrorAlert />}
        {exchangeInfo && (
          <div className="exchange-info" data-testid="exchange-info">
            {exchangeInfo.trust_score_rank && (
              <span className="rank">Ranked #{exchangeInfo.trust_score_rank}</span>
            )}
            {exchangeInfo.image && (
              <img src={exchangeInfo.image} alt={`${exchangeInfo.name} logo`} />
            )}
            {exchangeInfo.name && <h2>{exchangeInfo.name}</h2>}
            {exchangeInfo.country && <p>Based in {exchangeInfo.country}</p>}
            {exchangeInfo.year_established && <p>Established in {exchangeInfo.year_established}</p>}
            {exchangeInfo.description && <p>{exchangeInfo.description}</p>}
            <p className="social-links">
              Social Links:{' '}
              {exchangeInfo.twitter_handle && (
                <span>
                  <a href={exchangeInfo.url} target="_blank" rel="noreferrer">
                    Website
                  </a>
                </span>
              )}
              {exchangeInfo.twitter_handle && (
                <span>
                  <a
                    href={`https://www.facebook.com/${exchangeInfo.facebook_url}`}
                    target="_blank"
                    rel="noreferrer">
                    Facebook
                  </a>
                </span>
              )}
              {exchangeInfo.twitter_handle && (
                <span>
                  <a
                    href={`https://www.twitter.com/${exchangeInfo.twitter_handle}`}
                    target="_blank"
                    rel="noreferrer">
                    Twitter
                  </a>
                </span>
              )}
              {exchangeInfo.reddit_url && (
                <span>
                  <a
                    href={`https://www.reddit.com/${exchangeInfo.reddit_url}`}
                    target="_blank"
                    rel="noreferrer">
                    Reddit
                  </a>
                </span>
              )}
              {exchangeInfo.telegram_url && (
                <span>
                  <a
                    href={`https://www.t.me/${exchangeInfo.telegram_url}`}
                    target="_blank"
                    rel="noreferrer">
                    Telegram
                  </a>
                </span>
              )}
              {exchangeInfo.slack_url && (
                <span>
                  <a
                    href={`https://www.slack.com/${exchangeInfo.slack_url}`}
                    target="_blank"
                    rel="noreferrer">
                    Slack
                  </a>
                </span>
              )}
              {exchangeInfo.other_url_1 && (
                <span>
                  <a href={exchangeInfo.other_url_1} target="_blank" rel="noreferrer">
                    Additional Link 1
                  </a>
                </span>
              )}
              {exchangeInfo.other_url_2 && (
                <span>
                  <a href={exchangeInfo.other_url_2} target="_blank" rel="noreferrer">
                    Additional Link 2
                  </a>
                </span>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExchangePage;
