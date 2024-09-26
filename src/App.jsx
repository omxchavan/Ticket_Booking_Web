import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import MuseumList from './components/MuseumList';
import MuseumDetails from './components/MuseumDetails';
import BookingPage from './components/BookingPage';
import Navigation from './components/Navbar';
import BuyTicket from './components/BuyTicket';
import PrivacyPolicy from './components/PrivacyPolicy';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/museums" element={<MuseumList />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        {/* Ensure the path uses the correct syntax for react-router v6 */}
        <Route path="/museums/:id/buy" element={<BuyTicket />} />
        <Route path="/museums/:id" element={<MuseumDetails />} />
        <Route path="/book/:id" element={<BookingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
