import { useEffect, useState } from "react";
import { defaultData } from "../../data/defaultData";

export default function Dice(props) {
  const [dice, setDice] = useState(defaultData);
  const [chosenNumber, setChosenNumber] = useState(0);

  // Create a new game when there are no dice initiated yet
  dice[0].value === "" && createBlankGame();

  // Add a celebration once all dice are fixed & same value
  useEffect(() => {
    dice.every((die) => die.isFixed) && props.fiesta(true);
  }, [dice, props]);

  // Creates a completely new game
  function createBlankGame() {
    let firstDiceArray = [];
    while (firstDiceArray.length < 10) {
      firstDiceArray.push({ value: setRandomNumber(), isFixed: false });
    }
    // @ts-ignore
    setDice(firstDiceArray);
    props.fiesta(false);
  }

  function setRandomNumber() {
    const randomNumber = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
    return randomNumber;
  }

  function rollDice() {
    if (dice.every((die) => die.isFixed)) {
      createBlankGame();
    } else {
      let newDiceArray = dice.map((die) =>
        die.isFixed === false
          ? { value: setRandomNumber(), isFixed: false }
          : die
      );
      // @ts-ignore
      setDice(newDiceArray);
    }
  }

  function updateChosenNumber(newNumber) {
    setChosenNumber(newNumber);
  }

  function freezeDie({ die }, itemNumber) {
    if (chosenNumber === 0) {
      setDice((prevState) =>
        prevState.map((die, index) =>
          index === itemNumber.index ? { ...die, isFixed: true } : die
        )
      );
      updateChosenNumber(die.value);
    } else if (chosenNumber === die.value) {
      setDice((prevState) =>
        prevState.map((die, index) =>
          index === itemNumber.index ? { ...die, isFixed: true } : die
        )
      );
    } else {
      alert("Please select only the same value");
    }
  }

  return (
    <div className="dice">
      <ul className="dice_list">
        {dice.length === 10 &&
          dice.map((die, index) => (
            <li
              key={index}
              className={`dice_list_die ${die.isFixed && "green"}`}
              onClick={() => freezeDie({ die }, { index })}
            >
              {die.value}
            </li>
          ))}
      </ul>
      <button onClick={rollDice}>Roll</button>
    </div>
  );
}
