
import useStyles from './MaterialView.styles';

import { useTranslation } from 'next-i18next';

import {getRarityImage} from '../../../helpers/gradients';

import Image from 'next/image';
import Link from 'next/link';

export function MaterialView({ name, rarity, image, count}) {
    const { classes } = useStyles();

    const { t } = useTranslation(['common']);

    var rarityImage = getRarityImage(rarity);

    const simplifyNumber = (num) =>{
        if (num >= 1000){
            return parseInt(num / 1000) + 'K'
        } else {
            return num;
        }
    }

    return (
        <Link style={{color: 'inherit', textDecoration: 'none',}} href={`/materials/${name}`}>
        <div className={classes.container}>

            <div className={classes.imageContainer}>
                
            <Image className={classes.topPanel} width={70} height={70} src={rarityImage} alt={`Rarity ${rarity}`}/>

            
                <div className={classes.materialIcon}>
                
                    <Image style={{objectFit: 'contain'}} width={70} height={70} src={`/resources/${image}.png`} alt={name}/>
                </div>
            </div>
            
            

            
            <div className={classes.botPanel}>
            {simplifyNumber(count)}
            </div>
            
        </div>
        </Link>
    );
}
