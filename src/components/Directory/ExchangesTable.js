import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';

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
          <td>{exchange.trust_score_rank}</td>
          <td
            onClick={() => {
              handleExchangeClick(exchange.id);
            }}>
            <img src={exchange.image} />
            {exchange.name}
          </td>
          <td>{exchange.country}</td>
          <td>
            <a href={exchange.url} target="_blank" rel="noreferrer">
              {exchange.url}
            </a>
          </td>
        </tr>
      );
    });
  };

  return (
    <div data-testid="exchanges-table">
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>Trust Rank</th>
            <th>Exchange</th>
            <th>Country</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </Table>
    </div>
  );
};

ExchangesTable.propTypes = {
  exchanges: PropTypes.array.isRequired
};

export default ExchangesTable;
