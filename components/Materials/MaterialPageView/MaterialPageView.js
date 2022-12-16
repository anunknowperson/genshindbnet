
import useStyles from './MaterialPageView.styles';
import Image from 'next/image'

import { useViewportSize } from '@mantine/hooks';

import { Slider, Divider, Paper } from '@mantine/core';

import { TextFormat } from '../../TextFormat/TextFormat';

import { useState } from 'react';

import { useTranslation } from 'next-i18next';

import {getRarityGradient} from '../../../helpers/gradients';

export function MaterialPageView({strings}) {
    const { classes } = useStyles();
    const { height, width } = useViewportSize();

    const { t } = useTranslation(['common', 'weapons']);

    var selectedRarity = strings['rarity'];
    var gradientStyle = getRarityGradient((selectedRarity != null && !isNaN(selectedRarity)) ? parseInt(selectedRarity) : 1);
    
    return (
    <>
        <div className={classes.container}>

            <div className={classes.topPanel}
            
            style={gradientStyle}
            
            >
                <div style={{width: "50%"}}>
                    <div className={classes.pieceName}>{strings['materialtype']}</div>
                    

                        <div style = {{paddingLeft: '30px', paddingTop: '10px', paddingBottom: '20px',  width: '150px'}}>
                            { 
                            [...Array(Number( (strings['rarity'] != null && !isNaN(strings['rarity'])) ? parseInt(strings['rarity']) : 1))].map((val, el) =>
                              <Image key={el} width={15} alt={'star'} height={15} src={"/star.svg"}/>
                            ) 
                            }
                        </div>
                    
                    </div>
                    <div style={{width: "50%"}}>
                        <div style={{width: "100%", height: "100%", position: 'relative'}}>



                          <Image
                              style={{objectFit: 'contain'}}
                              fill
                              priority="true"
                              src={`/resources/${strings['images']['icon']}.png`}
                              alt={strings['images']['icon']}

                            />



                        </div>


                    </div>

                
                </div>

            <div>

            <div style={{padding: "10px 20px 20px 20px"}}>
              <TextFormat cursive={true}>{strings['description']}</TextFormat>
            </div>
            {(strings.source.length == 0) ? undefined : <div style={{color: 'white', padding: "0px 20px 10px 20px"}}>{('Source')}</div>}
            

            {strings.source.map((val, el) =>
                <div id={el} className={classes.sourceDiv}>
                <div>
                    {val}
                </div>
            </div>
            )}

            
            </div>


            
        </div>
        
        
    </>
  );
}
