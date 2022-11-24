
import useStyles from './ArtifactPieceDisplay.styles';
import Image from 'next/image'

import RaritySelector from '../RaritySelector/RaritySelector';

import { TextFormat } from '../../components/TextFormat/TextFormat';

import { useState } from 'react';

import { useTranslation } from 'next-i18next';



export function ArtifactPieceDisplay({label, type, strings, rarityCallback, children}) {
    const { classes } = useStyles();

  
    const { t } = useTranslation(['common', 'artifacts']);


    const [selectedRarity, setSelectedRarity] = useState(String(strings.rarities[strings.rarities.length - 1]));

    const onRarityChanges = (rar) => {
      setSelectedRarity(rar);

      rarityCallback(rar);
    }

    var gradientStyle;

    if (selectedRarity == "1"){
      gradientStyle = {background: 'linear-gradient(100deg, rgba(26,27,30,1) 48%, rgba(124,134,143,1) 100%)'};
    } 
    else if (selectedRarity == "2"){
      gradientStyle = {background: 'linear-gradient(100deg, rgba(26,27,30,1) 48%, rgba(136,179,150,1) 100%)'};
    } 
    else if (selectedRarity == "3"){
      gradientStyle = {background: 'linear-gradient(100deg, rgba(26,27,30,1) 48%, rgba(73,151,197,1) 100%)'};
    } 
    else if (selectedRarity == "4"){
      gradientStyle = {background: 'linear-gradient(100deg, rgba(26,27,30,1) 48%, rgba(109,55,176,1) 100%)'};
    } else if (selectedRarity == "5"){
      gradientStyle = {background: 'linear-gradient(100deg, rgba(26,27,30,1) 48%, rgba(255,166,0,1) 100%)'};
    }

    var bonusTable;

    if (label.includes('Prayers')){
      bonusTable = <>
      <tbody>
        <tr>
          <td className={classes.tableCellUnderline}>{t('a_onePieceBonusDots', { ns: 'artifacts' })}</td>
          <td className={classes.tableCellUnderline}><TextFormat>{strings['twoPiecesBonus']}</TextFormat></td>
        </tr>
      </tbody>
      </>
    }else {
      bonusTable = <>
      <tbody>
        <tr>
          <td className={classes.tableCellUnderline}>{t('a_twoPiecesBonusDots', { ns: 'artifacts' })}</td>
          <td className={classes.tableCellUnderline}><TextFormat>{strings['twoPiecesBonus']}</TextFormat></td>
        </tr>
        <tr>
          <td className={classes.tableCell}>{t('a_fourPiecesBonusDots', { ns: 'artifacts' })}</td>
          <td className={classes.tableCell}><TextFormat>{strings['fourPiecesBonus']}</TextFormat></td>
        </tr>
      </tbody>
      </>
    }

    return (
    <>
        <div className={classes.container}>

            <div className={classes.topPanel}
            
            style={gradientStyle}
            
            >
                <div style={{width: "50%"}}>
                    <div className={classes.pieceName}>{strings[type.toLowerCase()]['name']}</div>
                    <div className={classes.pieceType}>{t('a_' + type.toLowerCase(), { ns: 'artifacts' })}</div>
                    
                    <div style = {{paddingLeft: '30px', paddingTop: '10px', paddingBottom: '20px',  width: '150px'}}>
                      <RaritySelector rars={strings.rarities} callback={onRarityChanges}/>
                    </div>
                    
                </div>
                <div style={{width: "50%"}}>
                    <div style={{width: "100%", height: "100%", position: 'relative'}}>
                  

                      
                      <Image
                          priority="true"
                          src={`/resources/${label}${type}.png`}
                          alt={type}
                          objectFit="contain"
                          layout="fill"
                          style={{}}
                      />
                      
                      

                    </div>

                    
                </div>

                
            </div>

            <div>

            <table style={{tableLayout: "fixed", width: "100%", height: "100%", padding: "10px 20px 10px 20px"}}>
              {bonusTable}
            </table>

            <div style={{padding: "0px 20px 20px 20px"}}>
              <TextFormat>{strings[type.toLowerCase()]['description']}</TextFormat>
            </div>

            </div>
            
        </div>
        
        
    </>
  );
}
