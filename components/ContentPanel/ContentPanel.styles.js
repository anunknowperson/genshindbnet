
import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
    panel: {
        
        height: '100%',

        background: theme.colors.dark[6],
        borderRadius: '10px',


        [theme.fn.smallerThan(751)]:{
            margin: '25px 0px 25px 0px',
      
        },

        [theme.fn.largerThan(750)]:{
            width: '100%',
      
        },
    },

}));
