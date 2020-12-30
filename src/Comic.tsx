interface ComicProps {
  numPanels: number,
  imgLinks: Array<string>
};

const Comic = (props: ComicProps) => {
  const comicPanels = [];
  for (let i=0; i < props.numPanels; i++) {
    comicPanels.push(
      <Panel imgLink={props.imgLinks[i]} key={i} />
    )
  }

  return (
    <div id="comic">{comicPanels}</div>
  )
};

const Panel = (props: {imgLink: string}) => {
  return (
    <img
      src={props.imgLink}
      alt="placeholder"
      height="200px"
    />
  )
};

export default Comic;
