import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Directory from '../Directory';
import ExchangePage from '../ExchangePage';

const App = () => {
  return (
    <div data-testid="app">
      <div className="bg-shape"></div>
      <div className="content">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Directory />} />
            <Route path="exchange/:id" element={<ExchangePage />} />
          </Routes>
        </BrowserRouter>
      </div>
      <div className="footer">
        © 2022 Crypto Exchange Directory | All rights reserved | by Saqif
      </div>
    </div>
  );
};

export default App;
