
import useStyles from './ArtifactPieceSelector.styles';
import Image from 'next/image'

export function ArtifactPieceSelector({label, strings, changedCallback, children}) {
    const { classes } = useStyles();

    const setSelected = (selected) => {
        changedCallback(selected);
    }   

    var selectButtons;

    if (!label.includes('prayers')){
        selectButtons = <>
        <div className={classes.button}>
            <button className={classes.innerButton} onClick={() => setSelected('Flower')}>
                <Image
                    priority="true"
                    src={"/resources/" + strings['flower']['image']}
                    alt={ label + " Flower"}
                    fill
                />
            </button>
        </div>
        <div className={classes.button}>
            <button className={classes.innerButton} onClick={() => setSelected('Plume')}>
                <Image
                    priority="true"
                    src={"/resources/" + strings['plume']['image']}
                    alt={ label + " Plume"}
                    fill
                />
            </button>
        </div>
        <div className={classes.button}>
            <button className={classes.innerButton} onClick={() => setSelected('Sands')}>
                <Image
                    priority="true"
                    src={"/resources/" + strings['sands']['image']}
                    alt={ label + " Sands"}
                    fill
                />
            </button>
        </div>
        <div className={classes.button}>
            <button className={classes.innerButton} onClick={() => setSelected('Goblet')}>
                <Image
                    priority="true"
                    src={"/resources/" + strings['goblet']['image']}
                    alt={ label + " Goblet"}
                    fill
                />
            </button>
        </div>
        </>
    }

    return (
    <>

    <div className={classes.buttonContainer}>
        {selectButtons}
        <div className={classes.button}>
            <button className={classes.innerButton} onClick={() => setSelected('Circlet')}>
                <Image
                    priority="true"
                    src={"/resources/" + strings['circlet']['image']}
                    alt={ label + " Circlet"}
                    fill
                />
            </button>
        </div>

        
    </div>


        
    </>
  );
}
