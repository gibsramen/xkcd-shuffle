import { useRef, useState } from 'react';
import './Comic.css';

interface ComicProps {
  numPanels: number,
  imgLinks: Array<string>,
  comicsUsed: Array<string>,
};

const Comic = (props: ComicProps) => {
  const altText = props.comicsUsed.map((comic) => "comic-" + comic)

  //https://stackoverflow.com/a/56903585
  const [loading, setLoading] = useState(true);
  const counter = useRef(0);
  const imgLoaded = () => {
    counter.current += 1;
    if (counter.current >= props.numPanels) {
      setLoading(false);
      counter.current = 0;
    } else {
      setLoading(true);
    }
  };

  const comicPanels = [];
  for (let i=0; i < props.numPanels; i++) {
    comicPanels.push(
      <img
        src={props.imgLinks[i]}
        key={i}
        alt={altText[i]}
        onLoad={imgLoaded}
      />
    )
  }

  return (
    <div id="comic-container">
      <div id="loading" style={{display: loading ? "block" : "none"}}>Loading...</div>
      <div id="comic" style={{display: loading ? "none" : "inline-block"}}>{comicPanels}</div>
      <ComicInfo comicsList={props.comicsUsed} numPanels={props.numPanels} />
    </div>
  )
};

interface ComicInfoProps {
  comicsList: Array<string>,
  numPanels: number
};

const ComicInfo = (props: ComicInfoProps) => {
  const links = props.comicsList.map((comic) =>
    "https://xkcd.com/" + comic
  ).slice(0, props.numPanels);

  const comicLinks = links.map( (link, index) =>
    <p className="comic-link" key={index}>
      <a href={link} target="_blank" rel="noreferrer">{link}</a>
    </p>
  );

  return (
    <div id="comic-info">
      <p>Comics used:</p>
      {comicLinks}
    </div>
  )
};

export default Comic;
