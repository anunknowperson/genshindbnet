
import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
    container: {
        height:'146px',
        width: '93px',
        
        transition: 'transform .2s',
        '&:hover': {transform: 'scale(1.1)'},

        
        paddingTop: '10px',
    },

    materialIcon :{
        position:'absolute',
        top: '0',
        left: '0',
    },
    
    imageContainer: {
        position: 'relative',
        height: '93px',
    },

    topPanel: {
        height: '93px',

        

        borderRadius: '10px 10px 0px 0px',

        display: 'flex',
        
    },

    link: {
        '&:visited': {
            color: theme.colors.dark[0],
        },
        '&:hover': {
            color: 'gray',
        },

        color: theme.colors.dark[0],
        textDecoration: 'underline',
    },

    botPanel: {
        height: '53px',
        borderRadius: '0px 0px 10px 10px',
        textAlign: 'center',
        backgroundColor: theme.colors.dark[7],
        
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',

        border: 'solid 3px ' + theme.colors.dark[4],
        borderTop: 'none !important',

    },

}));