import './Comic.css';

interface ComicProps {
  numPanels: number,
  imgLinks: Array<string>,
  comicsUsed: Array<string>
};

const Comic = (props: ComicProps) => {
  const altText = props.comicsUsed.map((comic) => "comic-" + comic)
  const comicPanels = [];
  for (let i=0; i < props.numPanels; i++) {
    comicPanels.push(
      <img src={props.imgLinks[i]} key={i} alt={altText[i]}/>
    )
  }

  return (
    <div id="comic-container">
      <div id="comic">{comicPanels}</div>
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
