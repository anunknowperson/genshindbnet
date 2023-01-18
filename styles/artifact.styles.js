
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

  artifactPieceBox: {
    

    flexBasis: '44%',
    
  },

  artifactStoryBox: {
    whiteSpace: 'pre-wrap',

    flexBasis: '44%',

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
