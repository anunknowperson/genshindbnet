
import useStyles from './PageWrapper.styles';

export function PageWrapper({children, mBottom=0, mTop=0}) {
  const { classes } = useStyles();



  return (
    <>
        

        <div className={classes.wrapper} >
          
            <div className={classes.innerWrapper} style={{marginBottom : mBottom, marginTop : mTop}}>
                {children}
                
            </div>
        
        </div>
    </>
  );
}
