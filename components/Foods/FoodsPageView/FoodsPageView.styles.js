
import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
    container: {
        minHeight: '420px',
        paddingBottom: '20px',
    },
    ingredientsContainer: {
        width: '100%', padding: '10px 20px 0px 20px', display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '0px',
    },
    sourceDiv: {
        background: theme.colors.dark[7],
        borderRadius: '10px',


        margin: '10px 25px 10px 25px',
        
        paddingTop: '5px',
        paddingBottom: '5px',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left',
        paddingLeft: '20px',
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
        padding: '0px 30px 0px 30px',
    },

    statVal :{
        color: theme.white,
        fontSize: '20px',
        fontWeight: 400,
        padding: '0px 30px 0px 30px',
    },

    tableCell : {
        width: "50%",
            
    },

    tableCellUnderline : {
        width: "50%",
        borderBottom: `3px solid ${theme.colors.dark[7]}`,
    }

}));
