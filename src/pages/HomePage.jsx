import { Box } from '@mui/material';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/home/HeroSection';
import ShopByPerformance from '../components/home/ShopByPerformance';
import TrendingGear from '../components/home/TrendingGear';

function HomePage() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <HeroSection />
        <ShopByPerformance />
        <TrendingGear />
      </Box>
      <Footer />
    </Box>
  );
}

export default HomePage;
