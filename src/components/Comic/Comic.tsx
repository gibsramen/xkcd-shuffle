import './Comic.css';

interface ComicProps {
  numPanels: number,
  imgLinks: Array<string>,
  comicsUsed: Array<string>
};

const Comic = (props: ComicProps) => {
  const comicPanels = [];
  for (let i=0; i < props.numPanels; i++) {
    comicPanels.push(
      <img src={props.imgLinks[i]} key={i} alt="placeholder" height="200px"/>
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
  const links = props.comicsList.map( (comic) =>
    "https://xkcd.com/" + comic
  ).slice(0, props.numPanels);

  const comicLinks = links.map( (link, index) =>
    <p class-name="comic-link" key={index}>
      <a href={link}>{link}</a>
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
