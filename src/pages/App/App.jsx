// @ts-nocheck
import Dice from "../../components/Dice/Dice";

export default function App() {
  return (
    <main className="main">
      <h1 className="title">Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <Dice />
    </main>
  );
}
