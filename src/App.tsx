import "@/App.css";

import { BrowserRouter as Router } from "react-router-dom";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Main from "@/components/Main/Main";

function App() {
  return (
    <Router>
      <Header></Header>
      <Main></Main>
      <Footer></Footer>
    </Router>
  );
}

export default App;
