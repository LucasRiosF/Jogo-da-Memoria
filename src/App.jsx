import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './Components/Card'
import { cards } from './cardsData'

function App() {
  const [deck, setDeck] = useState([]);

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
    setDeck(embaralhado);
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

function virarCarta(id) {
  setDeck(prev => 
    prev.map(carta =>
      carta.id === id
      ? {...carta, virada: !carta.virada}
      : carta
    ));
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
      {deck.map(carta => (
        <Card
          key={carta.id}
          image={carta.image}
          virada={carta.virada}
          onClick={() => virarCarta(carta.id)}
        />
      ))}
    </div>
    </>
  )
}

export default App
