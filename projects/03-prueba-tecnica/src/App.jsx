import "./App.css";
import { useCatImage, useCatFact } from "./hooks/useCatImage";

export function App() {
  const { fact, refreshFact } = useCatFact();
  const { imageUrl } = useCatImage({ fact });

  const handleClick = async () => {
    refreshFact();
  };

  // Para hacer el fetch de datos usamos un useEffect pues si en lugar de hacer un fetch dentro el useEffect lo hacemos fuera cada vez que se renderiza el componente se haría el fetch y hariamos un bucle infinito

  // Esto mal
  // fetch('https://catfact.ninja/fact')

  // Esto bien
  // useEffect(() => {
  //   getRandomFact().then((newFact) => setFact(newFact));
  // }, []);

  return (
    <main>
      <h1>App de gatitos</h1>
      {/* Renderizado condicional */}
      <button onClick={handleClick}>Get new fact</button>
      {fact && <p>{fact}</p>}
      {imageUrl && <img src={imageUrl} alt="cat" />}
    </main>
  );
}
