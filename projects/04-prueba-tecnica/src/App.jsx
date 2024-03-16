import { useEffect, useState } from "react";
import "./App.css";

const CAT_ENDPOINT_RANDOM_FACT = "https://catfact.ninja/fact";
// const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstWord}`;

export function App() {
  const [fact, setFact] = useState();
  const [imageUrl, setImageUrl] = useState();

  // Para hacer el fetch de datos usamos un useEffect pues si en lugar de hacer un fetch dentro el useEffect lo hacemos fuera cada vez que se renderiza el componente se haría el fetch y hariamos un bucle infinito

  // Esto mal
  // fetch('https://catfact.ninja/fact')

  // Esto bien
  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then((res) => res.json())
      .then((data) => {
        const { fact } = data;
        setFact(fact);
        const firstWord = fact.split(" ")[0];
        fetch(`https://cataas.com/cat/says/${firstWord}`)
          .then((res) => res.blob()) // Obtener el blob de la respuesta
          .then((blob) => {
            const imageUrl = URL.createObjectURL(blob);
            setImageUrl(imageUrl);
          });

        // En el código que proporcioné anteriormente, cuando llamamos a res.blob() en la respuesta de la solicitud, estamos extrayendo el contenido binario de la respuesta y creando un objeto blob. Luego, utilizamos URL.createObjectURL(blob) para convertir este objeto blob en una URL que podemos utilizar para mostrar la imagen en la aplicación. Es una forma de "enlazar" el contenido binario a una URL que el navegador puede manejar fácilmente para mostrar la imagen.
      });
  }, []);

  useEffect(() => {
    if (!fact) {
      return;
    }
    const firstWord = fact.split(" ")[0];
    fetch(`https://cataas.com/cat/says/${firstWord}`)
      .then((res) => res.blob()) // Obtener el blob de la respuesta
      .then((blob) => {
        const imageUrl = URL.createObjectURL(blob);
        setImageUrl(imageUrl);
      });
  }, [fact]);
  // La lista de dependencias vacias así lo lanzamos 1 vez cuando se renderize el componente
  // PONER LA LISTA DE DEPENDENCIAS SIEMPRE PUES SI NO LA PONGO SE HARÁ UN LOOP INFINITO PUES SE EJECUTARÁ SIEMPRE QUE SE RENDERIZA EL COMPONENTE
  return (
    <main>
      <h1>App de gatitos</h1>
      {/* Renderizado condicional */}
      <section>
        {fact && <p>{fact}</p>}
        {imageUrl && <img src={imageUrl} alt="cat" />}
      </section>
    </main>
  );
}
