import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Directory from '../Directory';
import ExchangePage from '../ExchangePage';
import './App.scss';

const App = () => {
  return (
    <div data-testid="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Directory />} />
          <Route path="exchange/:id" element={<ExchangePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
