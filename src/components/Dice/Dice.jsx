import { useEffect, useState } from "react";

export default function Dice(props) {
  const [dice, setDice] = useState(() => createBlankGame());
  const [chosenNumber, setChosenNumber] = useState(0);

  // Add a celebration once all dice are fixed & same value
  useEffect(() => {
    dice.every((die) => die.isFixed) && props.fiesta(true);
  }, [dice, props]);

  function createBlankGame() {
    const firstDiceArray = [];
    while (firstDiceArray.length < 10) {
      firstDiceArray.push({ value: setRandomNumber(), isFixed: false });
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
      props.fiesta(false);
    } else {
      let newDiceArray = dice.map((die) =>
        die.isFixed === false
          ? { value: setRandomNumber(), isFixed: false }
          : die
      );
      setDice(newDiceArray);
    }
  }

  function freezeDie({ die }, itemNumber) {
    if (chosenNumber === 0) {
      setDice((prevState) =>
        prevState.map((die, index) =>
          index === itemNumber.index ? { ...die, isFixed: true } : die
        )
      );
      setChosenNumber(die.value);
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
