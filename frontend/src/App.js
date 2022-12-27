
import { BrowserRouter, Route } from 'react-router-dom';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import Mid from "./Mid/Mid";

function App() {
  return (

    <BrowserRouter>

      <div>
        <Header></Header>
      </div>

      <div >
        <Mid></Mid>
      </div>

      <div>
        <Footer></Footer>
      </div>

    </BrowserRouter>


  );
}

export default App;