
import useStyles from './ArtifactPieceSelector.styles';
import Image from 'next/image'

export function ArtifactPieceSelector({label, changedCallback, children}) {
    const { classes } = useStyles();

    const setSelected = (selected) => {
        changedCallback(selected);
    }   

    var selectButtons;

    if (!label.includes('Prayers')){
        selectButtons = <>
        <div className={classes.button}>
            <button className={classes.innerButton} onClick={() => setSelected('Flower')}>
                <Image
                    priority="true"
                    src={"/resources/" + label + "Flower.png"}
                    alt={ label + " Flower"}
                    width="100%"
                    height="100%"
                    layout="intrinsic"
                />
            </button>
        </div>
        <div className={classes.button}>
            <button className={classes.innerButton} onClick={() => setSelected('Plume')}>
                <Image
                    priority="true"
                    src={"/resources/" + label + "Plume.png"}
                    alt={ label + " Plume"}
                    width="100%"
                    height="100%"
                    layout="intrinsic"
                />
            </button>
        </div>
        <div className={classes.button}>
            <button className={classes.innerButton} onClick={() => setSelected('Sands')}>
                <Image
                    priority="true"
                    src={"/resources/" + label + "Sands.png"}
                    alt={ label + " Sands"}
                    width="100%"
                    height="100%"
                    layout="intrinsic"
                />
            </button>
        </div>
        <div className={classes.button}>
            <button className={classes.innerButton} onClick={() => setSelected('Goblet')}>
                <Image
                    priority="true"
                    src={"/resources/" + label + "Goblet.png"}
                    alt={ label + " Goblet"}
                    width="100%"
                    height="100%"
                    layout="intrinsic"
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
                    src={"/resources/" + label + "Circlet.png"}
                    alt={ label + " Circlet"}
                    width="100%"
                    height="100%"
                    layout="intrinsic"
                />
            </button>
        </div>

        
    </div>


        
    </>
  );
}
