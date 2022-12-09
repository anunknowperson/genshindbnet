
import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  wrapper: {
    
    width:'100%',
    height: '100%',

    [theme.fn.largerThan(750)]:{
        padding: '30px 50px 50px 50px',
        
    },
    [theme.fn.smallerThan(751)]:{
        padding: '10px 20px 50px 20px',
        
    }
    
  },

}));
