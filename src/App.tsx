import { Routes, Route } from 'react-router-dom';
import RainWaterTrapped from './pages/RainWaterTrapped';
import Home from './pages/Hom';
import '@fontsource/manrope/400.css'
import '@fontsource/manrope/600.css'
import '@fontsource/manrope/700.css'
import '@fontsource/manrope/800.css'

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