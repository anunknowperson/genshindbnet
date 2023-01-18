
import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({

    header: {
        color: theme.white,

        fontWeight: 500,
        margin: '0px 0px 20px 0px',
        width: '100%',
        textAlign: 'center',

        [theme.fn.largerThan(750)]: {
            fontSize: '48px',
        },

        [theme.fn.smallerThan(750)]: {
            fontSize: '30px',
        },
    },


    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: theme.spacing.xl * 4,
        paddingBottom: theme.spacing.xl * 4,
    },

    content: {
        maxWidth: 480,
        marginRight: theme.spacing.xl * 3,

        [theme.fn.smallerThan('751')]: {
            maxWidth: '100%',
            marginRight: 0,
        },
    },

    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: 44,
        lineHeight: 1.2,
        fontWeight: 900,

        [theme.fn.smallerThan('751')]: {
            fontSize: 28,
        },
    },

    control: {
        [theme.fn.smallerThan('750')]: {
            flex: 1,
        },
    },

    image: {
        flex: 1,

        [theme.fn.smallerThan('751')]: {
            display: 'none',
        },
    },
    imageMobile: {

        [theme.fn.largerThan('750')]: {
            display: 'none',
        },
    },
    highlight: {
        position: 'relative',
        backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
        borderRadius: theme.radius.sm,
        padding: '4px 12px',

    },

    container: {
        width: '100%', display: 'flex', flexWrap: 'wrap',
        
        [theme.fn.largerThan('750')]: {
            paddingLeft: '150px', paddingRight: '150px'
        },
        
    }

}));
