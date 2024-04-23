import "./App.css";
import { TwitterFollowCard } from "./TwitterFollowCard";

export function App() {

  const antonioMaroto = { isFollowing: true, userName: 'AMaroto98'}
  
  return (
    <section className="App">

      {/* 
        Para poner el contenido del name entre los tag hay usar el children
        Lo que se pone enmedio de los tags son childrens y para recuperar la informacion hay que modificar el componente padre
      */}
      <TwitterFollowCard userName={"AMaroto98"} initialisFollowing={true}>
        Antonio Maroto
      </TwitterFollowCard>

      <TwitterFollowCard userName={"elonmusk"} isFollowing={false}>
        Elon Musk
      </TwitterFollowCard>

      {/* Se pueden pasar todas las props juntas, en lugar de por separado, se necesita un objeto como el que tenemos arriba */}
      {/* Esta considerado mala practica */}
      <TwitterFollowCard {...antonioMaroto}>
        Antonio Maroto
      </TwitterFollowCard>

      {/* Asi estaba al principio pasando todas las props */}
      {/* <TwitterFollowCard
        userName={"elonmusk"}
        name={"Elon Musk"}
        isFollowing={false}
      /> */}

    </section>
  );
}
