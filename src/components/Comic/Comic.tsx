import './Comic.css';

interface ComicProps {
  numPanels: number,
  imgLinks: Array<string>,
  comicsUsed: Array<string>,
  imgLoaded: () => void,
  isLoading: boolean
};

const Comic = (props: ComicProps) => {
  const altText = props.comicsUsed.map((comic) => "comic-" + comic)

  const comicPanels = [];
  for (let i=0; i < props.numPanels; i++) {
    comicPanels.push(
      <img
        src={props.imgLinks[i]}
        key={i}
        alt={altText[i]}
        onLoad={props.imgLoaded}
      />
    )
  }

  return (
    <div id="comic-container">
      <div id="loading" style={{display: props.isLoading ? "inline-block" : "none"}}>Loading...</div>
      <div id="comic" style={{display: !props.isLoading ? "inline-block" : "none"}}>{comicPanels}</div>
      <ComicInfo
        comicsList={props.comicsUsed}
        numPanels={props.numPanels}
        isLoading={props.isLoading}
      />
    </div>
  )
};

interface ComicInfoProps {
  comicsList: Array<string>,
  numPanels: number,
  isLoading: boolean
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
    <div id="comic-info" style={{display: !props.isLoading ? "block" : "none"}}>
      <p>Comics used:</p>
      {comicLinks}
    </div>
  )
};

export default Comic;
