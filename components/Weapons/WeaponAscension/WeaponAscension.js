
import useStyles from './WeaponAscension.styles';

import { useTranslation } from 'next-i18next';

import { MaterialView } from '../../Materials/MaterialView/MaterialView';


export function WeaponAscension({level, progression, costs}) {
    const { classes } = useStyles();

    const { t } = useTranslation(['common']);

    const getCosts = (level) => {
        if (level == 2){
            return costs['ascend1'];
        } else if (level == 4){
            return costs['ascend2'];
        } else if (level == 5){
            return costs['ascend3'];
        } else if (level == 6){
            return costs['ascend4'];
        } else if (level == 7){
            return costs['ascend5'];
        } else if (level == 8){
            return costs['ascend6'];
        } else {
            return undefined;
        }
    }

    const getSumCosts = (level) => {
        var sumCosts = [];
        
        for (var lv = level; lv >=0; lv -= 1) {
            var currentCost = getCosts(lv);

            if (currentCost == undefined){
                continue;
            }

            for (const cc of currentCost){
                var finded = false;

                for (const sc of sumCosts){
                    if (cc.name === sc.name){


                        sc['count'] += ((cc['count'] == undefined) ? 0 : cc['count']);
                        finded = true;
                    }
                }

                if (!finded){
                    var copyCost = {...cc}

                    if(copyCost.count == undefined){
                        copyCost.count = 0
                    }

                    sumCosts.push(copyCost);
                }
            }

            
        }

        return sumCosts;
    }

    var selectedCosts = (progression) ? getSumCosts(level) : getCosts(level);

    if (selectedCosts == undefined){
        selectedCosts=[];
    }
    

    return (
        <div className={classes.container}>

            {selectedCosts.map((element, i) => 
                <MaterialView key={i}  name={element['name']} rarity={(element['rarity'] == null) ? 1 : element['rarity']} image={element['image']} count={element['count']}></MaterialView>
            )}
            


        </div>
    );
}
