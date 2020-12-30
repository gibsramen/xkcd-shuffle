import { useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import PanelSelection from './PanelSelection';
import Comic from './Comic';
import axios from 'axios';
import './App.css';

const apiUrl = "https://ohls623gud.execute-api.us-west-1.amazonaws.com/default/return-random-xkcd-panels";

function getRandomPanels(numPanels: number) {
  return axios.post(apiUrl, {numPanels: numPanels});
}

const App = () => {
  const [numPanels, setNumPanels] = useState(3);
  const [selectedValue, setSelectedValue] = useState(3);
  const [imgLinks, setImgLinks] = useState([]);
  const [isComicPresent, setIsComicPresent] = useState(false); //don't display anything to start

  useEffect( () => {
    getRandomPanels(numPanels).then( response => {
      setImgLinks(response.data.img_links);
    });
  }, [numPanels])

  const selectNumPanels = (event: ChangeEvent<HTMLSelectElement>) => {
    const panelSelection = event.target.value;
    const panelSelectionNum = parseInt(panelSelection.charAt(0));
    setSelectedValue(panelSelectionNum);
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
        value={selectedValue}
      />
      {isComicPresent && <Comic numPanels={numPanels} imgLinks={imgLinks} />}
     </div>
  );
};

export default App;
