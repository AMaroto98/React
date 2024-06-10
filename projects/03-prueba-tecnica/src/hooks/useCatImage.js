import { useEffect, useState } from "react";
import { getRandomFact } from "../services/facts"

// Custom hook, reutilizar logica de nuestros componentes en otros componentes
// Aqui un ejemplo para el effect de la imagen
// Dentro de un custom hook puedes llamar hooks
// Es buena práctica pasar los parámetros como objetos para que sea extensible, explicado en el minuto 17 del vídeo de custom hooks
export function useCatImage({ fact }) {
  const [imageUrl, setImageUrl] = useState();
  useEffect(() => {
    if (!fact) {
      return;
    }
    const firstWord = fact.split(" ")[0];
    fetch(`https://cataas.com/cat/says/${firstWord}`)
      .then((res) => res.blob()) // Obtener el blob de la respuesta
      .then((blob) => {
        const imageUrl = URL.createObjectURL(blob);
        // En el código que proporcioné anteriormente, cuando llamamos a res.blob() en la respuesta de la solicitud, estamos extrayendo el contenido binario de la respuesta y creando un objeto blob. Luego, utilizamos URL.createObjectURL(blob) para convertir este objeto blob en una URL que podemos utilizar para mostrar la imagen en la aplicación. Es una forma de "enlazar" el contenido binario a una URL que el navegador puede manejar fácilmente para mostrar la imagen.
        setImageUrl(imageUrl);
      });
  }, [fact]);
  // La lista de dependencias vacias así lo lanzamos 1 vez cuando se renderize el componente
  // PONER LA LISTA DE DEPENDENCIAS SIEMPRE PUES SI NO LA PONGO SE HARÁ UN LOOP INFINITO PUES SE EJECUTARÁ SIEMPRE QUE SE RENDERIZA EL COMPONENTE

  return { imageUrl };
}

export function useCatFact() {
  const [fact, setFact] = useState();

  const refreshFact = () => {
    getRandomFact().then((newFact) => setFact(newFact));
  };
  useEffect(refreshFact, []);

  return { fact, refreshFact };
}
