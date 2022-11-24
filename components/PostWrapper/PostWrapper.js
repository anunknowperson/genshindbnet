
import useStyles from './PostWrapper.styles';

export function PostWrapper({children}) {
  const { classes } = useStyles();

  return (
    <>
        <div className={classes.wrapper}>
          
            {children}
        
        </div>
    </>
  );
}
