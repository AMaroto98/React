import { useEffect, useState } from "react";

const Componen = () => {
  // False es el valor inicial.
  // Value es el valor
  // setValue es la forma de actualizar el valor
  const [value, setValue] = useState(false);

  // Se usa en el cuerpo del componente
  // Recibe 2 parámetros:
  // 1. código para ejecutar (función)
  // 2. La lista de dependencias que es una array y es opcional
  useEffect(() => {
    // Esto como mínimo se ejecutará una vez, cada vez que se renderize el componente
    console.log("Código a ejecutar");
    // Cuando algún elemento de la lista de dependencias cambia se vuelve a ejecutar el código anterior
  }, listOfDependencies);
};
