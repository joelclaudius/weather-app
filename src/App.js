import Footer from "./Footer";
import Header from "./Header";
import "./index.css";
import LandingPageDescription from "./LandingPageDescription";
import Weather from "./Weather";

function App() {
  return (
    <div>
      <header className="">
        <Header />
        <LandingPageDescription />

        <Weather />
        <Footer />
      </header>
    </div>
  );
}

export default App;
