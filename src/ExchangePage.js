import { useParams } from 'react-router-dom';

const ExchangePage = () => {
  const { id } = useParams();

  return (
    <>
      <h1>{id}</h1>
    </>
  );
};

export default ExchangePage;
