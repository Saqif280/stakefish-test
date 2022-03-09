import { Routes, Route } from 'react-router-dom';
import Directory from './Directory';
import ExchangePage from './ExchangePage';
import './App.scss';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Directory />} />
      <Route path="exchange/:id" element={<ExchangePage />} />
    </Routes>
  );
};

export default App;
