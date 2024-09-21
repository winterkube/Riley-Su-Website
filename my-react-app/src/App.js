import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Home from "./components/home";
import Exp from "./components/exp";
import Misc from "./components/misc";
import Contact from "./components/contact";
import Nav from "./components/nav";
import FAQ from "./components/FAQ";
function App() {
  return (
      <div className="App">
          <Nav/>
          <Home/>
          <Exp/>
          <Misc/>
          <Contact/>
          <FAQ/>
      </div>
  );
}

export default App;
