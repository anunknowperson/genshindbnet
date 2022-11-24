
import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
    footer: {
        height: '80px',
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
    }
}));
