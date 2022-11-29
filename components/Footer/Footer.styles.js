
import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
    footer: {
        minHeight: '80px',
        backgroundColor: theme.colors.dark[7],
        marginTop: '10px',
        textAlign: 'center',
        padding: '10px',
    },

    privacyLink: {
        '&:visited': {
            color: 'gray',
        },
        '&:hover': {
            color: 'white',
        },

        color: 'gray',
    },

    container: {
        paddingLeft: '50px',
        paddingRight: '50px',
        
    },

    containerFlex: {
        display: 'flex',
    },

    leftAlg: {
        textAlign: 'left',
    },


    friends: {
        marginLeft: '20px',
        textAlign: 'left',

    },

    friendButton: {
        transition: '.2s',
        '&:hover': {
            transform: 'scale(1.1)'
          },
    }


}));
