
import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({

    link: {
        '&:visited': {
            color: theme.colors.dark[0],
        },
        '&:hover': {
            color: 'gray',
        },

        color: theme.colors.dark[0],
    },


}));
