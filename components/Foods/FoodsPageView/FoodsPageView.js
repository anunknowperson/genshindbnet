
import useStyles from './FoodsPageView.styles';
import Image from 'next/image'

import { useViewportSize } from '@mantine/hooks';

import { Slider, Divider, Paper } from '@mantine/core';

import { TextFormat } from '../../TextFormat/TextFormat';

import { useState } from 'react';

import { useTranslation } from 'next-i18next';

import {getRarityGradient} from '../../../helpers/gradients';

import { FoodView } from '../FoodView/FoodView';
import { CharacterView } from '../../Characters/CharacterView/CharacterView';

import { MaterialView } from '../../Materials/MaterialView/MaterialView';

export function FoodsPageView({strings}) {
    const { classes } = useStyles();
    const { height, width } = useViewportSize();

    const { t } = useTranslation(['common', 'weapons']);

    var selectedRarity = strings['rarity'];
    var gradientStyle = getRarityGradient((selectedRarity != null && !isNaN(selectedRarity)) ? parseInt(selectedRarity) : 1);
    
    const [quality, setQuality] = useState(2);

    var marks = [
        { value: 0, label: 'Suspicious' },
        { value: 1, label: 'Normal' },
        { value: 2, label: 'Delicious' },
      ];

    const getQualityString = () => {
        if (quality == 0) {
            return 'suspicious';
        } else if (quality == 1) {
            return 'normal';
        } else if (quality == 2){
            return 'delicious';
        }
    }


    return (
    <>
        <div className={classes.container}>

            <div className={classes.topPanel}
            
            style={gradientStyle}
            
            >
              <div style={{width: "50%"}}>
                  <div className={classes.pieceName}>{strings['name']}</div>
                  
                  <Image style={{marginLeft: '30px'}} width={20}  height={20} src={`/resources/UI_Buff_Item_${strings['foodcategory']}.png`} alt={strings['foodcategory']}/>

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

            </div>
            
            {(strings['foodtype'] === 'NORMAL') ? 
            <>
            <Slider label={null} min={0} max={2} step={1} defaultValue={2} marks={marks} value={quality} onChange={setQuality}
            style={{
                padding: '30px 40px 20px 40px'
            }}
            ></Slider>
            
            <div style={{padding: "30px 20px 20px 20px"}}>
              <TextFormat >{strings[getQualityString()]['effect']}</TextFormat>
            </div>

            <div style={{padding: "10px 20px 20px 20px"}}>
              <TextFormat cursive={true}>{strings[getQualityString()]['description']}</TextFormat>
            </div> 
            </> :
            <>

            <div style = {{
              paddingTop: '20px',
              display: 'flex', justifyContent: 'space-evenly'
            }}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  <div style={{display: 'flex', justifyContent: 'center', color: 'white', paddingBottom: '10px'}}>
                  Base dish
                  </div>
                  
                  <FoodView label={strings['basedish']['label']} rarity={strings['basedish']['rarity']} image={strings['basedish']['image']} name={strings['basedish']['name']} category={strings['basedish']['foodcategory']}>
                
                  </FoodView>
                  
                </div>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  <div style={{display: 'flex', justifyContent: 'center', color: 'white', paddingBottom: '10px'}}>
                  Character
                  </div>

                  <CharacterView label={strings['character']['label']} rarity={strings['character']['rarity']} image={strings['character']['image']} name={strings['character']['name']}>

                  </CharacterView>
                </div>
            </div>

            

            <div style={{padding: "20px 20px 20px 20px"}}>
              <TextFormat >{strings['effect']}</TextFormat>
            </div>

            <div style={{padding: "10px 20px 20px 20px"}}>
              <TextFormat cursive={true}>{strings['description']}</TextFormat>
            </div> 
            </>}

            <div style={{color: 'white', padding: "0px 20px 10px 20px"}}>{('Ingredients')}</div>

            <div className={classes.ingredientsContainer}>

              {strings['ingredients'].map((element, i) => 
                  <MaterialView key={i}  name={element['name']} rarity={(element['rarity'] != null && !isNaN(element['rarity'])) ? parseInt(element['rarity']) : 1} image={element['image']} count={element['count']}></MaterialView>
              )}

            </div>
        </div>
        
        
    </>
  );
}
