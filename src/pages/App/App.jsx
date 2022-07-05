// @ts-nocheck
import { useState } from "react";
import Dice from "../../components/Dice/Dice";
import party from "party-js";
const root = document.getElementById("root");

export default function App() {
  const [celebrate, setCelebration] = useState(false);

  // Show confetti/sparkles once tenzies is reached and celebrate is true
  if (celebrate) {
    party.sparkles(root);
    setTimeout(() => party.confetti(root), 900);
  }

  return (
    <main className="main">
      <h1 className="title">Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <Dice fiesta={setCelebration} />
    </main>
  );
}
