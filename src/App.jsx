import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './Components/Card'
import { cards } from './cardsData'

function App() {
  const [cartas, setCartas] = useState([]);
  const [primeiraCarta, setPrimeiraCarta] = useState(null);
  const [segundaCarta, setSegundaCarta] = useState(null);
  const [bloqueado, setBloqueado] = useState(false);
  const [virada, setVirada] = useState(false);

function gerarDeck(cartas) {
  const deck = []

  for (let i = 0; i < cartas.length; i++) {
    const card = cartas[i]
    const parID = card.id

    const carta1 = {
      id: Math.random().toString(36).substring(2, 9),
      parID: parID,
      image: card.image,
      virada: false
    }

    const carta2 = {
      id: Math.random().toString(36).substring(2, 9),
      parID: parID,
      image: card.image,
      virada: false
    }

    deck.push(carta1)
    deck.push(carta2)
  }

  return deck
}

  useEffect(() => {
    const d = gerarDeck(cards);
    const embaralhado = embaralhar(d);
    setCartas(embaralhado);
  }, []);

function embaralhar(deck) {
  const embaralhado = [...deck]

  for (let i = embaralhado.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));

    const temp = embaralhado[i];
    embaralhado[i] = embaralhado[j];
    embaralhado[j] = temp;
  }
  return embaralhado;
}

function virarCarta(carta) {
  if (bloqueado) return;
  if (carta.virada) return;

   setCartas(prev =>
    prev.map(c =>
     c.id === carta.id ? { ...c, virada: true } : c
    )
  )

if (!primeiraCarta) {
  setPrimeiraCarta(carta);
  return;
}

  //setSegundaCarta(carta);
  setBloqueado(true);

   if (primeiraCarta.parID === carta.parID) {
    const novasCartas = cartas.map( c => {
      if (c.id === primeiraCarta.id || c.id === carta.id){
         return {... c, virada: true}
      }
      return c;
    });
    setCartas(novasCartas);
    setPrimeiraCarta(null);
    setBloqueado(false);
  } else {
    setTimeout(() => {

     const desvira = cartas.map( c => {
      if (c.id === primeiraCarta.id || c.id === carta.id){
         return {... c, virada: false}
      }
      return c;
    });
    setCartas(desvira);
    setPrimeiraCarta(null);
    setSegundaCarta(null);
    setBloqueado(false);

    }, 2000);
  }
}

  return (
    <>
     <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 140px)",
        gap: "20px",
        justifyContent: "center",
        marginTop: "40px"
      }}
    >
      {cartas.map(carta => (
        <Card
          key={carta.id}
          image={carta.image}
          virada={carta.virada}
          onClick={() => virarCarta(carta)}
        />
      ))}
    </div>
    </>
  )
}

export default App
