import Footer from "./Footer";
import "./index.css";
import LandingPageDescription from "./LandingPageDescription";
import Weather from "./Weather";

function App() {
  return (
    <div>
      <header className="lg:px-[380px] lg:rounded-lg ">
        <div className="flex items-center justify-center bg-blue-900 py-5">
          <h1 className="text-5xl font-display font-extrabold text-white">
            WeatherWise
          </h1>
        </div>
        <LandingPageDescription />

        <Weather />
        <Footer />
      </header>
    </div>
  );
}

export default App;
