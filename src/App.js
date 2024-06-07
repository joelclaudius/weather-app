import "./index.css";
import Weather from "./Weather";

function App() {
  return (
    <div>
      <header>
        <div className="flex items-center justify-center bg-blue-900 py-5">
          <h1 className="text-5xl font-display font-extrabold text-white">
            Weather App
          </h1>
        </div>

        <Weather />
      </header>
    </div>
  );
}

export default App;
