import { useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import Header from '../Header/Header';
import PanelSelection from '../PanelSelection/PanelSelection';
import Comic from '../Comic/Comic';
import Footer from '../Footer/Footer';
import axios from 'axios';
import placeholder from '../../placeholder.jpg'
import './App.css';

const apiUrl = "https://ohls623gud.execute-api.us-west-1.amazonaws.com/default/return-random-xkcd-panels";
const defaultImgLinks: string[] = [];
for (let i = 0; i < 5; i++) {
  defaultImgLinks.push(placeholder);
}

const defaultComicLinks: string[] = [];
for (let i = 0; i < 5; i++) {
  defaultComicLinks.push("1");
}

function getRandomPanels(numPanels: number) {
  return axios.post(apiUrl, {numPanels: numPanels});
}

const App = () => {
  const [numPanels, setNumPanels] = useState(3);
  const [selectedValue, setSelectedValue] = useState(3);
  const [imgLinks, setImgLinks] = useState(defaultImgLinks);
  const [comicsUsed, setComicsUsed] = useState(defaultComicLinks);
  const [refresh, toggleRefresh] = useState(true);
  const [isComicPresent, setIsComicPresent] = useState(false);

  useEffect( () => {
    if (process.env.NODE_ENV === "production") {
      getRandomPanels(numPanels).then( response => {
        let x = response.data.img_links;
        let y = response.data.original_comics;
        setImgLinks(x);
        setComicsUsed(y);
      });
    } else {
      setImgLinks(defaultImgLinks);
      setComicsUsed(defaultComicLinks);
    }
  }, [numPanels, refresh])

  const selectNumPanels = (event: ChangeEvent<HTMLSelectElement>) => {
    const panelSelection = event.target.value;
    const panelSelectionNum = parseInt(panelSelection.charAt(0));
    setSelectedValue(panelSelectionNum);
  };

  const submitEvent = (event: MouseEvent<HTMLButtonElement>) => {
    setIsComicPresent(true); //don't show before button clicked
    toggleRefresh(!refresh); //allow refresh even if no new numPanels
    setNumPanels(selectedValue);
    event.preventDefault();
  };

  return (
    <div className="App">
      <Header />
      <PanelSelection
        onChange={selectNumPanels}
        onClick={submitEvent}
        value={selectedValue}
        extraBtnsDisabled={!isComicPresent}
      />
      {
        isComicPresent &&
        <Comic
          numPanels={numPanels}
          imgLinks={imgLinks}
          comicsUsed={comicsUsed}
        />
      }
      <Footer />
     </div>
  );
};

export default App;
