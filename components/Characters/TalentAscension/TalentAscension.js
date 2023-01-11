
import useStyles from './TalentAscension.styles';

import { useTranslation } from 'next-i18next';

import { MaterialView } from '../../Materials/MaterialView/MaterialView';


export function TalentAscension({level, progression, costs}) {
    const { classes } = useStyles();

    const { t } = useTranslation(['common']);

    const getCosts = (level) => {
        if (level == 1){
            return undefined;
        } else{
            return costs['lvl' + level];
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
