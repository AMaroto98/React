import { useEffect, useState } from "react";

const CAT_ENDPOINT_RANDOM_FACT = "https://catfact.ninja/fact";
const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstWord}`;

export function App() {
  const [fact, setFact] = useState();

  // Para hacer el fetch de datos usamos un useEffect pues si en lugar de hacer un fetch dentro el useEffect lo hacemos fuera cada vez que se renderiza el componente se haría el fetch y hariamos un bucle infinito

  // Esto mal
  // fetch('https://catfact.ninja/fact')

  // Esto bien
  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then(res => res.json())
      .then(data => {
        // No acabo de entender esto
        const { fact } = data
        console.log('fact: ', fact);
        setFact(fact)


        const firstWord = fact.split(' ')[0]
        console.log(firstWord);

        fetch(`https://cataas.com/cat/says/${firstWord}`)
        .then(res => res.json())
        .then(res =>
            console.log(res)
        )
        
      })
  }, []); // La lista de dependencias vacias así lo lanzamos 1 vez cuando se renderize el componente
  // PONER LA LISTA DE DEPENDENCIAS SIEMPRE PUES SI NO LA PONGO SE HARÁ UN LOOP INFINITO PUES SE EJECUTARÁ SIEMPRE QUE SE RENDERIZA EL COMPONENTE
  return (
    <main>
      <h1>App de gatitos</h1>
      {/* Renderizado condicional */}
      {fact && <p>{fact}</p>}
    </main>
  );
}
