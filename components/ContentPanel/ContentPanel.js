
import useStyles from './ContentPanel.styles';

export function ContentPanel({children}) {
    const { classes } = useStyles();


    return (
    <>

        <div className={classes.panel}>
            {children}
        </div>
        
        
    </>
  );
}
