
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
    margin: '0px 0px 40px 0px',
  },



  collumnContainer: {
    
    width: '400px',
    
  },


  firstLine: {
    /*[theme.fn.largerThan(750)]:{
        display: 'flex',
        justifyContent: 'space-between',
    },*/
    
    display: 'flex',
    justifyContent: 'center',
    
    
  },

  contentBox: {
    
  }
}));
