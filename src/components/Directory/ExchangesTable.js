import PropTypes from 'prop-types';
import { FaExternalLinkAlt } from 'react-icons/fa';

/**
 * The ExchangesTable component takes in a list of exchanges and their data and renders an
 * HTML table. If an exchange is clicked, it routes the browser to the exchange page.
 */
const ExchangesTable = ({ exchanges }) => {
  const handleExchangeClick = (exchange_id) => {
    window.location.href = `/exchange/${exchange_id}`;
  };

  /**
   * TODO: Figure out why some urls are not rendering, like Kraken's
   */
  const renderTableRows = () => {
    return exchanges.map((exchange) => {
      return (
        <tr key={exchange.id}>
          <td>{exchange.trust_score_rank ? exchange.trust_score_rank : '?'}</td>
          <td
            className="exchange-target"
            onClick={() => {
              handleExchangeClick(exchange.id);
            }}>
            <img src={exchange.image} alt={`${exchange.name} logo`} />
            {exchange.name}
          </td>
          <td>{exchange.country ? exchange.country : 'Unknown'}</td>
          <td>
            {exchange.url && (
              <a href={exchange.url} target="_blank" rel="noreferrer">
                <FaExternalLinkAlt />
              </a>
            )}
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="exchanges-table" data-testid="exchanges-table">
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Exchange</th>
            <th>Country</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </table>
    </div>
  );
};

ExchangesTable.propTypes = {
  exchanges: PropTypes.array.isRequired
};

export default ExchangesTable;
