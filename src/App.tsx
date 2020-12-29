import { useState, ChangeEvent, MouseEvent } from 'react';
import PanelSelection from './PanelSelection';
import Comic from './Comic';
import './App.css';

const App = () => {
  const [numPanels, setNumPanels] = useState(3);
  const [selectedValue, setSelectedValue] = useState(3);
  //eslint-disable-next-line
  const [imgLinks, setImgLinks] = useState([
    "https://www.nicepng.com/png/detail/113-1135840_sad-cowboy-hat-emoji.png",
    "https://www.nicepng.com/png/detail/113-1135840_sad-cowboy-hat-emoji.png",
    "https://www.nicepng.com/png/detail/113-1135840_sad-cowboy-hat-emoji.png",
    "https://www.nicepng.com/png/detail/113-1135840_sad-cowboy-hat-emoji.png",
    "https://www.nicepng.com/png/detail/113-1135840_sad-cowboy-hat-emoji.png"
  ]);
  const [isComicPresent, setIsComicPresent] = useState(false);

  const selectNumPanels = (event: ChangeEvent<HTMLSelectElement>) => {
    const panelSelection = event.target.value;
    setSelectedValue(parseInt(panelSelection.charAt(0)));
  };

  const submitEvent = (event: MouseEvent<HTMLButtonElement>) => {
    setIsComicPresent(true);
    setNumPanels(selectedValue);
    event.preventDefault();
  };

  return (
    <div className="App">
      <PanelSelection
        onChange={selectNumPanels}
        onClick={submitEvent}
        value={numPanels}
      />
      {isComicPresent && <Comic numPanels={numPanels} imgLinks={imgLinks} />}
     </div>
  );
};

export default App;
