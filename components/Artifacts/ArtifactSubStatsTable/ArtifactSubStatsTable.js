
import { ScrollArea } from '@mantine/core';
import useStyles from './ArtifactSubStatsTable.styles';

import { Table } from '@mantine/core';


import { useTranslation } from 'next-i18next';


export function ArtifactSubStatsTable({type, rarity, children}) {
    const {classes} = useStyles();
    //{}

    
    const { t } = useTranslation(['common', 'artifacts']);

    const atkhpStats = [[1.17, 1.46], [1.63, 2.33], [2.45, 3.5], [3.26, 4.66], [4.08, 5.83]];

    const substats = {};

    substats[t('a_healthFlat', { ns: 'artifacts' })] = [[23.9, 29.88], [50.19, 71.7], [100.38, 143.4], [167.3, 239.0], [209.13, 298.75]];
    substats[t('a_healthPercent', { ns: 'artifacts' })] = atkhpStats;
    substats[t('a_attackFlat', { ns: 'artifacts' })] = [[1.56, 1.95], [3.27, 4.67], [6.54, 9.34], [10.89, 15.56], [13.62, 19.45]];
    substats[t('a_attackPercent', { ns: 'artifacts' })] = atkhpStats;
    substats[t('a_defenceFlat', { ns: 'artifacts' })] = [[1.85, 2.31], [3.89, 5.56], [7.78, 11.11], [12.96, 18.52], [16.2, 23.15]];
    substats[t('a_defencePercent', { ns: 'artifacts' })] = [[1.46, 1.82], [2.04, 2.48], [3.06, 4.37], [4.08, 5.83], [5.1, 7.29]];
    substats[t('a_energyRechargePercent', { ns: 'artifacts' })] =  [[1.3, 1.62], [1.81, 2.59], [2.72, 3.89], [3.63, 5.18], [4.53, 6.48]];
    substats[t('a_elementalMastery', { ns: 'artifacts' })] =[[4.66, 5.83], [6.53, 9.33], [9.79, 13.99], [13.06, 18.65], [16.32, 23.31]];
    substats[t('a_critRatePercent', { ns: 'artifacts' })] = [[0.78, 0.97], [1.09, 1.55], [1.63, 2.33], [2.18, 3.11], [2.72, 3.89]];
    substats[t('a_critDamagePercent', { ns: 'artifacts' })] = [[1.55, 1.94], [2.18, 3.11], [3.26, 4.66], [4.35, 6.22], [5.44, 7.77]];



    var headers = 
    <tr>
        <th  style={{width:'200px'}}>{t('a_name', { ns: 'artifacts' })}</th>

        {[...Array(Math.min(rarity + 1, 4))].map((e, i) =>
                <th style={{minWidth:'100px'}} key={i.toString()}>
                    {t('a_tier', { ns: 'artifacts' }) + " " + (i + 1)}
                </th>
            )}
    </tr>;

    var lines = [];

    for (const [key, value] of Object.entries(substats)) {
        if ((type === 'Flower' && key === 'Health Flat') || (type === 'Plume' && key === 'Attack Flat')) continue;

        lines.push(
            <tr key={key}>
                <td className={classes.td}>{key}</td>

                {(()=>{
                    var elements = []

                    for (var i = 0; i < Math.min(rarity + 1, 4); i++){
                        var calculated = value[rarity - 1][0] + (value[rarity - 1][1] - value[rarity - 1][0]) / (Math.min(rarity + 1, 4)-1) * i;
                        
                        if (key.includes('%')){
                            elements.push(
                                <td key={i} className={classes.td}>{Math.round(calculated * 100) / 100}%</td>
                            )
                        } else {
                            elements.push(
                                <td key={i} className={classes.td}>{Math.round(calculated * 100) / 100 }</td>
                            )
                        }
                       
                    }

                    return elements;
                })()}
            </tr>
        );
    }

    return (
    <>
        <ScrollArea>
        <Table sx={{ '& thead tr th': { textAlign: 'center' } }}>
            <thead className={classes.header}>
              {headers}
            </thead>

            <tbody>
                {lines}
            </tbody>
        </Table>
        </ScrollArea>
    </>
  );
}
