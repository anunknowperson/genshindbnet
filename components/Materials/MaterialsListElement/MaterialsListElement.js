
import useStyles from './MaterialsListElement.styles';

import { useTranslation } from 'next-i18next';

import {getRarityImage} from '../../../helpers/gradients';

import Image from 'next/image';
import { Text } from '@mantine/core';

import Link from 'next/link';

export function MaterialsListElement({label, name, rarity, image}) {
    const { classes } = useStyles();

    const { t } = useTranslation(['common']);

    var rarityImage = getRarityImage(rarity);


    return (
        <Link href={`/materials/${label}`}>
        
        <div className={classes.container}>

            <div className={classes.imageContainer}>
                
            <Image className={classes.topPanel} width={93} height={93} src={rarityImage} alt={`Rarity ${rarity}`}/>

            
                <div className={classes.materialIcon}>
                
                    <Image style={{objectFit: 'contain'}}  width={93} height={93} src={`/resources/${image}.png`} alt={name}/>
                </div>
            </div>
            
            

            <div  className={classes.link}>
            <div className={classes.botPanel}>
            
            <Text lineClamp={2}>
                {name}
            </Text>
            
            </div>
            </div>
        </div>
        </Link>
        
    );
}
