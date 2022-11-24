
import useStyles from './TextFormat.styles';



import { useTranslation } from 'next-i18next';



export function TextFormat({children}) {
    const { classes } = useStyles();

    const { t } = useTranslation(['common']);

    const filter = t('e_filter');

    const styles = {};

    styles[t('e_pyro')] = 'textPyro';
    styles[t('e_hydro')] = 'textHydro';
    styles[t('e_electro')] = 'textElectro';
    styles[t('e_cryo')] = 'textCryo';
    styles[t('e_dendro')] = 'textDendro';
    styles[t('e_anemo')] = 'textAnemo';
    styles[t('e_geo')] = 'textGeo';
    

    String.prototype.splitAndKeep = function(separator){
        var str = this;

        str = str.split(new RegExp(`(${separator})`, 'g'));

        return str;
    };

    const format = (str) => {
        var res = str.splitAndKeep(filter);

        for (var i = 0; i < res.length; i++){
            if (res[i].toLowerCase() in styles){
                res[i] = <span key={i} className={classes[styles[res[i].toLowerCase()]]}>{res[i]}</span> ;
            }
        }

        return res;

    }

    return (
        <>
        {format(children)}
        </>
    );
}
