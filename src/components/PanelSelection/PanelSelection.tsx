import { ChangeEvent, MouseEvent } from 'react';
import './PanelSelection.css';

interface Props {
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void,
  onClick: (event: MouseEvent<HTMLButtonElement>) => void,
  value: number
};

const PanelSelection = (props: Props) => {
  return (
    <div id="panel-number-select">
      <label>Number of panels: </label>
      <select
        name="num-panels"
        id="num-panels-select"
        onChange={props.onChange}
      >
        <option value="3-panels">3</option>
        <option value="4-panels">4</option>
        <option value="5-panels">5</option>
      </select>
      <button onClick={props.onClick}>Submit</button>
    </div>
  )
};

export default PanelSelection;
