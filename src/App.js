import { Routes, Route } from 'react-router-dom';
import Directory from './Directory';
import ExchangePage from './ExchangePage';
import './App.scss';

const App = () => {
  return (
    <>
      <h1>Cryptocurrency Exchanges</h1>
      <Routes>
        <Route path="/" element={<Directory />} />
        <Route path="exchange/:id" element={<ExchangePage />} />
      </Routes>
    </>
  );
};

export default App;
