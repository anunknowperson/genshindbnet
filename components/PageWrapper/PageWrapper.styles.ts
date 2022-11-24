
import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontSize: 100,
    fontWeight: 900,
    letterSpacing: -2,

    [theme.fn.smallerThan('md')]: {
      fontSize: 50,
    },
  },

  wrapper: {
    
    width:'100%',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.colors.dark[8],
    
  },

  innerWrapper: {
    
    

    backgroundColor: theme.colors.dark[7],

    [theme.fn.largerThan(750)]:{
        width: '1200px',
        
    },
    [theme.fn.smallerThan(751)]:{
        width: '100%',
        
    }
  }
}));
