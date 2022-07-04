export default function Dice() {
  return (
    <div className="dice">
      <ul className="dice_list">
        <li className="dice_list_die green">1</li>
        <li className="dice_list_die">2</li>
        <li className="dice_list_die green">3</li>
        <li className="dice_list_die">4</li>
        <li className="dice_list_die">5</li>
        <li className="dice_list_die">6</li>
      </ul>
      <button>Roll</button>
    </div>
  );
}
