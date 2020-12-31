import { useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import PanelSelection from '../PanelSelection/PanelSelection';
import Comic from '../Comic/Comic';
import Footer from '../Footer/Footer';
import axios from 'axios';
import './App.css';

const apiUrl = "https://ohls623gud.execute-api.us-west-1.amazonaws.com/default/return-random-xkcd-panels";
const defaultImgLinks: string[] = [];
for (let i = 0; i < 5; i++) {
  defaultImgLinks.push("https://i.kym-cdn.com/entries/icons/mobile/000/024/523/sad.jpg");
}

function getRandomPanels(numPanels: number) {
  return axios.post(apiUrl, {numPanels: numPanels});
}

const App = () => {
  const [numPanels, setNumPanels] = useState(3);
  const [selectedValue, setSelectedValue] = useState(3);
  const [imgLinks, setImgLinks] = useState(defaultImgLinks);
  const [isComicPresent, setIsComicPresent] = useState(false); //don't display anything to start

  useEffect( () => {
    if (process.env.NODE_ENV === "production") {
      getRandomPanels(numPanels).then( response => {
        setImgLinks(response.data.img_links);
      });
    }
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
      <Footer />
     </div>
  );
};

export default App;