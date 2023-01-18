
import useStyles from './ArtifactMainStatsTable.styles';

import { Table } from '@mantine/core';
import { ScrollArea } from '@mantine/core';


import { useTranslation } from 'next-i18next';



export function ArtifactMainStatsTable({type, rarity, children}) {
    const {classes} = useStyles();
 
    const { t } = useTranslation(['common', 'artifacts']);

    const stats = {};

    const hpatkelStats = [[3.1, 7.9], [4.2, 9.0], [5.2, 23.1], [6.3, 34.8], [7.0, 46.6]];
    const defphysStats = [[3.9, 9.9], [5.2, 11.2], [6.6, 28.8], [7.9, 43.5], [8.7, 58.3]];

    stats[t('a_healthFlat', { ns: 'artifacts' })] = [[129.0, 324.0], [258.0, 551.0], [430.0, 1893.0], [645.0, 3571.0], [717.0, 4780.0]];
    stats[t('a_healthPercent', { ns: 'artifacts' })] = hpatkelStats;
    stats[t('a_attackFlat', { ns: 'artifacts' })] = [[8.0, 21.0], [17.0, 36.0], [28.0, 123.0], [42.0, 232.0], [47.0, 311.0]];
    stats[t('a_attackPercent', { ns: 'artifacts' })] = hpatkelStats;
    
    stats[t('a_defencePercent', { ns: 'artifacts' })] = defphysStats;
    stats[t('a_energyRechargePercent', { ns: 'artifacts' })] = [[3.5, 8.8], [4.7, 9.9], [5.8, 25.6], [7.0, 38.7], [7.8, 51.8]];
    stats[t('a_elementalMastery', { ns: 'artifacts' })] =[[12.6, 31.6], [16.8, 35.8], [21.0, 92.3], [25.2, 139.3], [28.0, 186.5]];

    stats[t('a_elementalDamagePercent', { ns: 'artifacts' })] = hpatkelStats;
    stats[t('a_physicalDamagePercent', { ns: 'artifacts' })] = defphysStats;

    stats[t('a_critRatePercent', { ns: 'artifacts' })] =  [[2.1, 5.3], [2.8, 6.0], [3.5, 15.4], [4.2, 23.2], [4.7, 31.1]];
    stats[t('a_critDamagePercent', { ns: 'artifacts' })] =  [[4.2, 10.5], [5.6, 11.9], [7.0, 30.8], [8.4, 46.4], [9.3, 62.2]];

    stats[t('a_critAdditionalHealingPercent', { ns: 'artifacts' })] = [[2.4, 6.1], [3.2, 6.9], [4.0, 17.8], [4.8, 26.8], [5.4, 35.9]];

    const statsFilters = {
        'Flower' : [t('a_healthFlat', { ns: 'artifacts' })],
        'Plume' : [t('a_attackFlat', { ns: 'artifacts' })],
        'Sands' : [t('a_healthPercent', { ns: 'artifacts' }), t('a_attackPercent', { ns: 'artifacts' }), t('a_defencePercent', { ns: 'artifacts' }), t('a_elementalMastery', { ns: 'artifacts' }), t('a_energyRechargePercent', { ns: 'artifacts' })],
        'Goblet' : [t('a_healthPercent', { ns: 'artifacts' }), t('a_attackPercent', { ns: 'artifacts' }), t('a_defencePercent', { ns: 'artifacts' }), t('a_elementalMastery', { ns: 'artifacts' }), t('a_elementalDamagePercent', { ns: 'artifacts' }), t('a_physicalDamagePercent', { ns: 'artifacts' })],
        'Circlet' : [t('a_healthPercent', { ns: 'artifacts' }), t('a_attackPercent', { ns: 'artifacts' }), t('a_defencePercent', { ns: 'artifacts' }), t('a_elementalMastery', { ns: 'artifacts' }), t('a_critRatePercent', { ns: 'artifacts' }), t('a_critDamagePercent', { ns: 'artifacts' }), t('a_critAdditionalHealingPercent', { ns: 'artifacts' })],

    }

    var headers;
    var lines;
    
    headers = 
    <tr>
        <th className={classes.th}>LVL</th>
        
        {[...Array(statsFilters[type].length)].map((e, i) =>
                <th className={classes.th} key={i.toString()}>
                    {statsFilters[type][i]}
                </th>
            )}
                
    </tr>

    lines = [];

    var count;

    if (rarity == 1 || rarity == 2) {
        count = 4;
    } else if (rarity == 3){
        count = 12;
    } else if (rarity == 4){
        count = 16;
    } else if (rarity == 5){
        count = 20;
    }

    for (var i = 0; i <= count; i++) {
        lines.push(
            <tr key={i}>
                <td className={classes.td}>{i}</td>

                {(()=>{
                    var elements = []

                    for (const statName of statsFilters[type]){
                        var calculated = stats[statName][rarity - 1][0] + (stats[statName][rarity - 1][1] - stats[statName][rarity - 1][0]) / (count) * i;

                        if (statName.includes('%')){
                            elements.push(
                                <td key={statName} className={classes.td}>{Math.round(calculated * 10) / 10}%</td>
                            )
                        } else {
                            elements.push(
                                <td key={statName} className={classes.td}>{Math.round(calculated * 10) / 10 }</td>
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
