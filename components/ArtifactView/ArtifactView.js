
import useStyles from './ArtifactView.style';



import { ArtifactPieceSelector } from '../../components/ArtifactPieceSelector/ArtifactPieceSelector';

import { ContentPanel } from '../../components/ContentPanel/ContentPanel';

import { ArtifactPieceDisplay } from '../../components/ArtifactPieceDisplay/ArtifactPieceDisplay';


export function ArtifactView({artifactName}) {
    const { classes } = useStyles();


    return (
    <>

      <h1 className={classes.artifactSetNameHeader}>{artifactName}</h1>

      <div className={classes.firstLine}>
    
      <ArtifactPieceSelector/>

      <div className={classes.artifactPieceBox}>
        <ContentPanel>
          <ArtifactPieceDisplay/>
        </ContentPanel>
      
      </div>
      <div className={classes.artifactStoryBox}>
        <ContentPanel>
          <div className={classes.artifactStory}>

          </div>
        </ContentPanel>
      </div>

      </div>

    </>
    
  );
}

export async function getStaticProps(context) {
  return {
    props: {
      artifactName: "Name",
    }, // will be passed to the page component as props
  }
}