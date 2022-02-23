import "bootstrap/dist/css/bootstrap.css"; 
import './app.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { NavHeader, Home, NotFound } from "./components";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavHeader />}>
            <Route index element={<Home />} />
            <Route path="*" element={<NotFound/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
