
import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({


  nameHeader: {
    color: theme.white,
    fontSize: '48px',
    fontWeight: 500,
    margin: '0px 0px 20px 0px',
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
}));
