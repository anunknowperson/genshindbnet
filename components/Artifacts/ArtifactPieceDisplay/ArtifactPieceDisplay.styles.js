
import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
    container: {
        minHeight: '420px',

    },


    topPanel: {
        height: '50%',

        

        borderRadius: '10px 10px 0px 0px',

        display: 'flex',

    },

    pieceName :{
        color: theme.white,
        fontSize: '20px',
        fontWeight: 400,
        padding: '20px 30px 0px 30px',
    },

    pieceType :{
        color: theme.gray,
        fontSize: '20px',
        fontWeight: 400,
        padding: '0px 30px 10px 30px',
    },

    tableCell : {
        width: "50%",
            
    },

    tableCellUnderline : {
        width: "50%",
        borderBottom: `3px solid ${theme.colors.dark[7]}`,
    }

}));
