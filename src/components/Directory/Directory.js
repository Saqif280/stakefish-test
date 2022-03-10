import { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';
import CoinGeckoErrorAlert from '../CoinGeckoErrorAlert';
import ExchangesTable from './ExchangesTable';

/**
 * TODO: Add shimmer for when lastFetchedPage !== currentPage
 * TODO: Consider adding current page to url params
 */

/**
 * The Directory component attempts to make an API call to coingecko to get a paginated
 * list of exchanges with some details. Navigation between pages and the related API calls
 * are made in this component. The table of information is rendered by ExchangesTable. If
 * the API call fails, CoinGeckoErrorAlert is rendered.
 */
const Directory = () => {
  const [coingeckoRequestFailed, setCoingeckoRequestFailed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastFetchedPage, setLastFetchedPage] = useState();
  const [totalExchanges, setTotalExchanges] = useState();
  const [exchanges, setExchanges] = useState();
  const jumpToPageNumberInput = useRef();
  const RESULTS_PER_PAGE = 10;
  const MIN_PAGE = 1;
  const MAX_PAGE = Math.ceil(totalExchanges / RESULTS_PER_PAGE);
  const GET_EXCHANGES_URL = `https://api.coingecko.com/api/v3/exchanges?per_page=${RESULTS_PER_PAGE}&page=${currentPage}`;

  useEffect(() => {
    if (lastFetchedPage !== currentPage) {
      fetch(GET_EXCHANGES_URL)
        .then((response) => {
          if (response.status !== 200) {
            setCoingeckoRequestFailed(true);
          } else {
            setLastFetchedPage(currentPage);
            setTotalExchanges(response.headers.get('total'));
            return response.json();
          }
        })
        .then((data) => {
          setExchanges(data);
        });
    }
  });

  const canGoPageBack = currentPage > MIN_PAGE;
  const canGoPageForward = currentPage < MAX_PAGE;

  const handlePageBack = () => {
    if (canGoPageBack) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageForward = () => {
    if (canGoPageForward) {
      setCurrentPage(currentPage + 1);
    }
  };

  const setCurrentPageToInput = () => {
    const pageToJumpTo = parseInt(jumpToPageNumberInput.current.value);
    if (isNaN(pageToJumpTo) || pageToJumpTo < MIN_PAGE) {
      setCurrentPage(MIN_PAGE);
    } else if (pageToJumpTo >= MAX_PAGE) {
      setCurrentPage(MAX_PAGE);
    } else {
      setCurrentPage(pageToJumpTo);
    }
  };

  /**
   * If a user inputs a page outside of the acceptable range,
   * correct that value to the closest acceptable value
   */
  const correctJumpToPageValue = () => {
    const pageToJumpTo = parseInt(jumpToPageNumberInput.current.value);
    if (isNaN(pageToJumpTo) || pageToJumpTo < MIN_PAGE) {
      jumpToPageNumberInput.current.value = MIN_PAGE;
    } else if (pageToJumpTo >= MAX_PAGE) {
      jumpToPageNumberInput.current.value = MAX_PAGE;
    }
  };

  return (
    <div data-testid="directory">
      <h1>Crypto Exchange Directory</h1>
      {coingeckoRequestFailed && <CoinGeckoErrorAlert />}
      {exchanges && (
        <div className="exchanges-table-with-navigation">
          <ExchangesTable exchanges={exchanges} />
          <div className="exchanges-table-navigation">
            <span className="back-forth-navigation">
              <Button
                variant="link"
                onClick={handlePageBack}
                disabled={!canGoPageBack}
                data-testid="back-page-button">
                <FaChevronCircleLeft />
              </Button>
              <span className="page-count">{`Page ${currentPage} / ${MAX_PAGE} `}</span>
              <Button
                variant="link"
                onClick={handlePageForward}
                disabled={!canGoPageForward}
                data-testid="next-page-button">
                <FaChevronCircleRight />
              </Button>
            </span>
            <span className="input-navigation">
              Jump to Page{' '}
              <input
                ref={jumpToPageNumberInput}
                type="number"
                min={MIN_PAGE}
                max={MAX_PAGE}
                onBlur={correctJumpToPageValue}
                data-testid="page-input"
              />
              <Button variant="light" onClick={setCurrentPageToInput}>
                Go
              </Button>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Directory;
