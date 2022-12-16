
import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
    table: {
        
        width: "100%",
        height: "100%",
        padding: "0px 0px 0px 0px",
        
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
                theme.colors.dark[3]
            }`,

        }
    },

    

    td: {
        

    },

    ul : {
        padding: '0px',
    },

    li: {
        listStyleType: 'none',
        
    },
    
    link: {
        '&:visited': {
            color: theme.colors.dark[0],
        },
        '&:hover': {
            color: 'gray',
        },

        color: theme.colors.dark[0],
    },

    th: {
        
        padding: '0 !important',
      },
    
    control: {
      width: '100%',
      padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      },
    },

    icon: {
      width: 21,
      height: 21,
      borderRadius: 21,
    },

    grid: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        gap: '15px',

    },
    loaderWrapper: {
        width: '100%',
        height: '300px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}));
