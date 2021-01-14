import { useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import Header from '../Header/Header';
import PanelSelection from '../PanelSelection/PanelSelection';
import Comic from '../Comic/Comic';
import Footer from '../Footer/Footer';
import axios from 'axios';
import './App.css';

const apiUrl = "https://ohls623gud.execute-api.us-west-1.amazonaws.com/default/return-random-xkcd-panels";

const defaultComicLinks: string[] = [];
for (let i = 0; i < 5; i++) {
  let rand = Math.floor(Math.random()*2400)
  defaultComicLinks.push(rand.toString());
}

interface Placeholder {
  author: string,
  id: string,
  height: number,
  width: number,
  url: string,
  download_url: string
};

function getRandomPlaceholders(numPanels: number) {
  let rand = Math.floor(Math.random()*100)
  let url = "https://picsum.photos/v2/list?page=" + rand + "&limit=" + numPanels;
  return axios.get(url)
}

function getRandomPanels(numPanels: number) {
  return axios.post(apiUrl, {numPanels: numPanels});
}

const App = () => {
  const [numPanels, setNumPanels] = useState(-1);
  const [selectedValue, setSelectedValue] = useState(3);
  const [imgLinks, setImgLinks] = useState([]);
  const [comicsUsed, setComicsUsed] = useState(defaultComicLinks);
  const [refresh, toggleRefresh] = useState(true);
  const [isComicPresent, setIsComicPresent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (numPanels !== -1) {
      if (process.env.NODE_ENV === "production") {
        getRandomPanels(numPanels).then(response => {
          setImgLinks(response.data.img_links);
          setComicsUsed(response.data.original_comics);
        });
      } else {
        getRandomPlaceholders(numPanels).then(response => {
          setImgLinks(response.data.map((data: Placeholder) => data.download_url))
        })
        setComicsUsed(defaultComicLinks);
      }
      setIsLoading(true);
    }
  }, [numPanels, refresh])

  //https://stackoverflow.com/a/56903585
  useEffect(() => {
    if (counter >= numPanels && numPanels !== -1) {
      setIsLoading(false);
      setCounter(0);
    }
  }, [counter, isLoading, numPanels])

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
          imgLoaded={() => setCounter(counter+1)}
          isLoading={isLoading}
        />
      }
      <Footer />
     </div>
  );
};

export default App;
