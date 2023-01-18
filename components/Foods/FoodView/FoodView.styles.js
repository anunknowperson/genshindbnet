
import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
    container: {
        height:'95px',
        width: '70px',
        
        transition: 'transform .2s',
        '&:hover': {transform: 'scale(1.1)'},

        
    },

    materialIcon :{
        position:'absolute',
        top: '0',
        left: '0',
    },
    materialType :{
        position:'absolute',
        top: '1.5px',
        left: '45px',
    },
    imageContainer: {
        position: 'relative',
        height: '70px',
    },

    topPanel: {
        height: '70px',

        

        borderRadius: '10px 10px 0px 0px',

        display: 'flex',

    },

    botPanel: {
        height: '25px',
        borderRadius: '0px 0px 10px 10px',
        textAlign: 'center',
        backgroundColor: theme.colors.dark[7],
        

    },

}));