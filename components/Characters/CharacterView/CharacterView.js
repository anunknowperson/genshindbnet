
import useStyles from './CharacterView.styles';

import { useTranslation } from 'next-i18next';

import {getRarityImage} from '../../../helpers/gradients';

import Image from 'next/image';
import Link from 'next/link';
import { Text } from '@mantine/core';

export function CharacterView({ label, rarity, image, name}) {
    const { classes } = useStyles();

    const { t } = useTranslation(['common']);

    var rarityImage = getRarityImage(rarity);


    return (
        <div style={{color: 'inherit', textDecoration: 'none',}} href={`/characters/${label}`}>
        <div className={classes.container}>

            <div className={classes.imageContainer}>
                
            <Image className={classes.topPanel} width={70} height={70} src={rarityImage} alt={`Rarity ${rarity}`}/>

            
                <div className={classes.materialIcon}>
                
                    <Image style={{objectFit: 'contain'}} width={70} height={70} src={`/resources/${image}.png`} alt={label}/>
                </div>
            </div>
            
            

            
            <div className={classes.botPanel}>
                <Text lineClamp={1}>
                {name}
                </Text>
            
            </div>
            
        </div>
        </div>
    );
}
