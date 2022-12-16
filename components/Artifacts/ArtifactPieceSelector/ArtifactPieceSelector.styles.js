
import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
    buttonContainer: {
        width: '100%',


        display: 'flex',
        

        [theme.fn.largerThan(750)]:{
            
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            
        },
        

        flexBasis: '5%',
        textAlign: 'center',
        

        [theme.fn.smallerThan(751)]:{
            marginBottom: '20px',
            justifyContent: 'space-between',
        },
        
    },

    button: {
    
        
        margin: '0px',


        [theme.fn.largerThan(750)]:{
            width: '75px',
            height: '75px',
        },
        
        [theme.fn.smallerThan(751)]:{
            display: 'inline',
            
        },

        

      },

    innerButton: {
        padding: "0px", 
        [theme.fn.largerThan(750)]:{
            width: '75px',
            height: '75px',
        },

        borderRadius: '10px',

        borderColor: theme.colors.dark[7],
        background: theme.colors.dark[6],

        position: 'relative',
    }
}));
