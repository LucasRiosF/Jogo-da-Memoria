import { useEffect, useState } from 'react'
import { FiRefreshCw } from "react-icons/fi";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './Components/Card'
import { cards } from './cardsData'

function App() {
  const [cartas, setCartas] = useState([]);
  const [primeiraCarta, setPrimeiraCarta] = useState(null);
  const [bloqueado, setBloqueado] = useState(false);

function gerarDeck(cartas) {
  const deck = []

  for (let i = 0; i < cartas.length; i++) {
    const card = cartas[i]
    const parID = card.id

    const carta1 = {
      id: Math.random().toString(36).substring(2, 9),
      parID: parID,
      image: card.image,
      acerto: false,
      erro: false,
      virada: false
    }

    const carta2 = {
      id: Math.random().toString(36).substring(2, 9),
      parID: parID,
      image: card.image,
      acerto: false,
      erro: false,
      virada: false
    }

    deck.push(carta1)
    deck.push(carta2)
  }

  return deck
}

  useEffect(() => {
    iniciarJogo()
  }, []);

  function iniciarJogo() {
  const d = gerarDeck(cards);
  const embaralhado = embaralhar(d);

  setCartas(embaralhado);
  setPrimeiraCarta(null);
  setBloqueado(false);
}

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
     c.id === carta.id ? { ...c, virada: true, erro: false } : c
    )
  )

if (!primeiraCarta) {
  setPrimeiraCarta({...carta, virada: true});
  return;
}

  setBloqueado(true);

   if (primeiraCarta.parID === carta.parID) {
    setCartas(prev => prev.map( c => 
      (c.id === primeiraCarta.id || c.id === carta.id)
         ? {... c, acerto: true}
        : c
     )
    );
    setPrimeiraCarta(null);
    setBloqueado(false);
  } else {
    setTimeout(() => {
     setCartas (prev => prev.map( c => 
      (c.id === primeiraCarta.id || c.id === carta.id)
         ? {... c, virada: false, erro: true}
        :c
      )
     );
    setPrimeiraCarta(null);
    setBloqueado(false);

    }, 2000);
  }
}
function reiniciarJogo() {
  iniciarJogo();
}

  return (
    <>
     <div className= "jogo">
      {cartas.map(carta => (
        <Card
          key={carta.id}
          image={carta.image}
          virada={carta.virada}
          acerto={carta.acerto}
          erro={carta.erro}
          onClick={() => virarCarta(carta)}
        />
      ))}
    </div>

    <button className="reiniciar" onClick={reiniciarJogo}>
      <FiRefreshCw className="reloadIcon" size={30} />
      Reiniciar
    </button>
    </>
  )
}

export default App
