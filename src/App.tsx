import { Routes, Route } from 'react-router-dom';
import RainWaterTrapped from './pages/RainWaterTrapped';
import Home from './pages/Hom';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rain-water" element={<RainWaterTrapped />} />
      </Routes>
    </div>
  );
}

export default App;