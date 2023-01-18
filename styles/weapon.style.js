
import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  breadcrumbs: {
    color: theme.white,
    fontSize: '18px',
    fontWeight: 500,
    margin: '0px 0px 0px 0px',
  },

  breadcrumbsLink :{
    color: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'inherit'
  },

  artifactSetNameHeader: {
    color: theme.white,
    fontSize: '48px',
    fontWeight: 500,
    margin: '0px 0px 20px 0px',
  },

  leftCollumnBox: {
    

    flexBasis: '49%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    
  },

  leftCollumn: {
    
    

  },

  leftCollimnPiecesUp :{
    whiteSpace: 'pre-wrap',
    flexBasis: '49%',
    padding: '0px 0px 10px 0px',
  },

  leftCollimnPiecesDown :{
    whiteSpace: 'pre-wrap',
    flexBasis: '49%',
    padding: '10px 0px 0px 0px',
  },

  artifactStoryBox: {
    whiteSpace: 'pre-wrap',

    flexBasis: '49%',

  },

  artifactStory: {
    

    padding: '20px 20px 20px 20px'
  },

  firstLine: {
    [theme.fn.largerThan(750)]:{
      display: 'flex',
      flexWrap: 'wrap',
    justifyContent: 'space-between',
    },
    
    
    

    
  },

  contentBox: {
    
  }
}));
