
import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({

    nameHeader: {
        color: theme.white,
        fontSize: '48px',
        fontWeight: 500,
        margin: '0px 0px 20px 0px',
    },

    topContainer: {

        [theme.fn.smallerThan(751)]: {
            marginLeft: '20px', width: '100%', height: '320px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
        },

        [theme.fn.largerThan(750)]: {
            width: '100%', height: '150px', display: 'flex', flexDirection: 'row'
        },

    },

    imgName: {
        display: 'flex',
        flexDirection: 'row'
    },

    cardImage: {
        [theme.fn.smallerThan(751)]: {
            position: 'relative',
            height: '120px',
            width: '120px'
        },
        [theme.fn.largerThan(750)]: {
            position: 'relative',
            height: '100%',
            width: '150px'
        },
    },

    stats: {
        width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        [theme.fn.largerThan(750)]: {
            flexDirection: 'row',
        },
        [theme.fn.smallerThan(751)]: {
            flexDirection: 'column',
        },
    },

    rows: {
        width: '100%', display: 'flex',
        [theme.fn.largerThan(750)]: {
            flexDirection: 'row'
        },
        [theme.fn.smallerThan(751)]: {
            flexDirection: 'column'
        },
    },

    buttons: {
        flex: '1',

        [theme.fn.smallerThan(751)]: {
            width: '100%', height: '20px',
        },
    },

    buttonContainer: {
        marginTop: '10px', width: '100%', display: 'flex', gap: '10px',

        [theme.fn.smallerThan(751)]: {
            height: '200px',
            flexDirection: 'column',
        },
    },

    waContainer: {
        width: '100%', display: 'flex',
        [theme.fn.largerThan(750)]: {
            gap: '20px',
        },
        [theme.fn.smallerThan(751)]: {
            flexDirection: 'column',
        },
    }
}));
