
import useStyles from './WeaponDisplay.styles';
import Image from 'next/image'

import { useViewportSize } from '@mantine/hooks';

import RaritySelector from '../RaritySelector/RaritySelector';

import { Slider, Divider } from '@mantine/core';

import { TextFormat } from '../../components/TextFormat/TextFormat';

import { useState } from 'react';

import { useTranslation } from 'next-i18next';

import {getRarityGradient} from '../../helpers/gradients';

export function WeaponDisplay({strings, levelCallback}) {
    const { classes } = useStyles();
    const { height, width } = useViewportSize();

    const [level, setLevel] = useState(strings['baseatk'].length - 1);
    const [r, setR] = useState(1);
  
    const { t } = useTranslation(['common', 'weapons']);

    const selectLevel = (selected) => {
      levelCallback(selected);
      setLevel(selected);
  }   

    var selectedRarity = strings['rarity'];
    var gradientStyle = getRarityGradient(selectedRarity);


    var sliderMarks = [
        { value: 0, label: '1' },
    ];

    var max = ((parseInt(selectedRarity) <= 2) ? 70 : 90);

    for (var i = 10; i <= max; i+=10){
        sliderMarks.push({value: i / 10, label: i.toString()});
    }

    const rSliderMarks = [
        { value: 1, label: '1' },
        { value: 2, label: '2' },
        { value: 3, label: '3' },
        { value: 4, label: '4' },
        { value: 5, label: '5' },
    ]

    var effect = strings['effect'];



    String.prototype.splitAndKeep = function(separator){
      var str = this;

      str = str.split(new RegExp(`(${separator})`, 'g'));

      return str;
    };

    var filter = '';

    var toReplace = [];

    for (var i = 0; i < strings['r1'].length; i++){
      toReplace.push(`{${i}}`);

      filter += `\\{${i}\\}`;

      if (i != strings['r1'].length -1) {
        filter += '|';
      }
      
    } 


    const format = (str) => {
        var res = str.splitAndKeep(filter);

        for (var i = 0; i < res.length; i++){
            if (toReplace.includes(res[i])){
              res[i] = <span key={i} style={{color: 'lightblue'}}>{strings['r' + r][parseInt(res[i][1])]}</span> ;
            } else {
              res[i] = <TextFormat  key={i}>{res[i]}</TextFormat>
            }
        }

        return res;

    }

    effect = format(effect);

    return (
    <>
        <div className={classes.container}>

            <div className={classes.topPanel}
            
            style={gradientStyle}
            
            >
                <div style={{width: "50%"}}>
                    <div className={classes.pieceName}>{strings['weapontype']}</div>
                    <div className={classes.pieceType}>{t("w_baseatk", { ns: 'weapons' })}</div>
                    <div className={classes.statVal}>{(strings['baseatk'][level])}</div>
                    <div className={classes.pieceType}>{strings['substat']}</div>
                    <div className={classes.statVal}>{(strings['subvalue'][level] !== '0%') ? strings['subvalue'][level] : ''}</div>
                    

                    <div style = {{paddingLeft: '30px', paddingTop: '10px', paddingBottom: '20px',  width: '150px'}}>
                    {[...Array(Number(parseInt(strings['rarity'])))].map((val, el) =>
                      <Image key={el} width={15} height={15} src={"/star.svg"}/>
                    )}
                    </div>
                    
                </div>
                <div style={{width: "50%"}}>
                    <div style={{width: "100%", height: "100%", position: 'relative'}}>
                  

                      
                      <Image
                          style={{objectFit: 'contain'}}
                          fill
                          priority="true"
                          src={`/resources/${(r == 1) ? strings['images']['icon'] : strings['images']['nameawakenicon']}.png`}
                          alt={strings['images']['icon']}
                          
                        />
                      
                      

                    </div>

                    
                </div>

                
              </div>

            <div>

            
            <div style={{padding: "20px 20px 20px 20px", display:'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                <div style={{flex: '0.1'}}>LVL <span>{(level == 0) ? 1 : level * 10}</span></div>
                <Slider
                value={level} onChange={selectLevel}

                style={{flex: '0.8'}} marks={(width > 750) ? sliderMarks : undefined} max={strings['baseatk'].length - 1} label={null} />
            </div>

            <div style={{padding: "20px 20px 20px 20px", display:'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                <div style={{flex: '0.1'}}>R<span>{r}</span></div>
                <Slider
                value={r} onChange={setR}

                style={{flex: '0.8'}} marks={(width > 750) ? rSliderMarks : undefined} min={1} max={5} label={null} />
            </div>

            <div style={{color: 'white', padding: "0px 20px 10px 20px"}}>{(strings['effectname'])}</div>

            <div style={{padding: "0px 20px 10px 20px"}}>
              {effect}
            </div>
            
            <div style={{padding: "0px 20px 0px 20px"}}>
            <Divider variant="dashed" />

            </div>
            

            <div style={{padding: "10px 20px 20px 20px"}}>
              <TextFormat cursive={true}>{strings['description']}</TextFormat>
            </div>

            </div>
            
        </div>
        
        
    </>
  );
}
