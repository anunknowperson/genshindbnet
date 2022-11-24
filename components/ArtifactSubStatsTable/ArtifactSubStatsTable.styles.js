
import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
    table: {
        tableLayout: "fixed",
        width: "100%",
        height: "100%",
        padding: "0px 0px 0px 0px"
    },

    header: {
        position: 'sticky',
        top: 0,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        transition: 'box-shadow 150ms ease',
    
        '&::after': {
            content: '""',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            borderBottom: `1px solid ${
                theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]
            }`,

        }
    },

    td: {
        textAlign: 'center',
    }
}));
