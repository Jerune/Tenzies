// @ts-nocheck
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import party from "party-js";
const root = document.getElementById("root");

export default function Dice() {
  const [dice, setDice] = useState(() => createBlankGame());
  const [chosenNumber, setChosenNumber] = useState(0);
  const [celebrate, setCelebration] = useState(false);

  // Show confetti/sparkles once tenzies is reached and celebrate is true
  if (celebrate) {
    party.sparkles(root);
    setTimeout(() => party.confetti(root), 900);
  }

  // Add a celebration once all dice are fixed & same value
  useEffect(() => {
    dice.every((die) => die.isFixed) && setCelebration(true);
    dice.every((die) => die.isFixed === false) && setChosenNumber(0);
  }, [dice]);

  function createBlankGame() {
    const firstDiceArray = [];
    while (firstDiceArray.length < 10) {
      firstDiceArray.push({
        id: nanoid(),
        value: setRandomNumber(),
        isFixed: false,
      });
    }
    return firstDiceArray;
  }

  function setRandomNumber() {
    const randomNumber = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
    return randomNumber;
  }

  function rollDice() {
    if (dice.every((die) => die.isFixed)) {
      setDice(createBlankGame());
      setCelebration(false);
    } else {
      setDice((prevState) =>
        prevState.map((die) =>
          die.isFixed === false
            ? { ...die, value: setRandomNumber(), isFixed: false }
            : die
        )
      );
    }
  }

  function freezeDie(item) {
    if (chosenNumber === 0) {
      setDice((prevState) =>
        prevState.map((die) =>
          item.id === die.id ? { ...die, isFixed: true } : die
        )
      );
      setChosenNumber(item.value);
    } else if (chosenNumber === item.value) {
      setDice((prevState) =>
        prevState.map((die) =>
          item.id === die.id ? { ...die, isFixed: !item.isFixed } : die
        )
      );
    } else {
      alert("Please select only the same value");
    }
  }

  // Generate list items from the dice array
  const diceElements = dice.map((die, index) => (
    <li
      key={index}
      className={`dice_list_die ${die.isFixed && "green"}`}
      onClick={() => freezeDie(die)}
    >
      {die.value}
    </li>
  ));

  return (
    <div className="dice">
      <ul className="dice_list">{diceElements}</ul>
      <button onClick={rollDice}>Roll</button>
    </div>
  );
}
