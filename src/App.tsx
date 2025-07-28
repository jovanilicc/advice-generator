import dividerImgD from "./assets/pattern-divider-desktop.svg";
import dividerImgM from "./assets/pattern-divider-mobile.svg";
import diceIcon from "./assets/icon-dice.svg";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

function App() {
  const [advice, setAdvice] = useState<null | { id: number; advice: string }>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const getAdvice = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://api.adviceslip.com/advice");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setAdvice((_prev) => {
        return data.slip;
      });
    } catch (error) {
      setError(
        `An unexpected error has occured, please shuffle again or try later.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAdvice();
  }, []);

  const handleNewAdvice = async () => {
    getAdvice();
  };

  return (
    <main>
      <div className="container" aria-live="polite">
        {isLoading ? (
          <div className="loader">
            <BeatLoader
              color="#52ffa8"
              size={30}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div>
            <h1>ADVICE #{advice?.id}</h1>
            <p>"{advice?.advice}"</p>
          </div>
        )}

        <picture>
          <source media="(min-width: 550px)" srcSet={dividerImgD} />
          <source media="(max-width: 440px)" srcSet={dividerImgM} />
          <img src={dividerImgD} alt="" />
        </picture>
        <button
          disabled={isLoading}
          aria-label="Shuffle advice"
          className="dice"
          onClick={handleNewAdvice}
        >
          <img src={diceIcon} alt="" />
        </button>
      </div>
    </main>
  );
}

export default App;
