import { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import CoinGeckoErrorAlert from './CoinGeckoErrorAlert';
import ExchangesTable from './ExchangesTable';

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
          }
          setLastFetchedPage(currentPage);
          setTotalExchanges(response.headers.get('total'));
          return response.json();
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
    const pageToJumpTo = jumpToPageNumberInput.current.value;
    if (pageToJumpTo < MIN_PAGE) {
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
    const pageToJumpTo = jumpToPageNumberInput.current.value;
    if (pageToJumpTo < MIN_PAGE) {
      jumpToPageNumberInput.current.value = MIN_PAGE;
    } else if (pageToJumpTo >= MAX_PAGE) {
      jumpToPageNumberInput.current.value = MAX_PAGE;
    }
  };

  /**
   * TODO: Add shimmer for when lastFetchedPage !== currentPage
   */

  return (
    <>
      <h1>Cryptocurrency Exchanges</h1>
      {coingeckoRequestFailed && <CoinGeckoErrorAlert />}
      {exchanges && (
        <>
          <ExchangesTable exchanges={exchanges} />
          <Button variant="light" onClick={handlePageBack} disabled={!canGoPageBack}>
            Previous Page
          </Button>
          Page {currentPage} / {MAX_PAGE + ' '}
          <Button variant="light" onClick={handlePageForward} disabled={!canGoPageForward}>
            Next Page
          </Button>
          Jump to Page{' '}
          <input
            ref={jumpToPageNumberInput}
            type="number"
            min={MIN_PAGE}
            max={MAX_PAGE}
            onBlur={correctJumpToPageValue}
          />
          <Button variant="light" onClick={setCurrentPageToInput}>
            Go
          </Button>
        </>
      )}
    </>
  );
};

export default Directory;
