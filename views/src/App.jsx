import Navbar from './components/navbar/Navbar';
import Footer from "./components/footer/Footer"; 
import AllRoutes from './routes/AllRoutes';
// import PrivateRoutes from './routes/PrivateRoutes';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="main">
        <AllRoutes />
        {/* <PrivateRoutes /> */}
        <Footer />
      </div>
    </div>
  );
}

export default App;
