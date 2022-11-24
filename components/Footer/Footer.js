import { PageWrapper } from '../../components/PageWrapper/PageWrapper';

import useStyles from './Footer.styles';


import { useTranslation } from 'next-i18next';


export function Footer() {
    const { classes } = useStyles();
  
  
    const { t } = useTranslation(['common']);


    return (
      <PageWrapper mTop={10}>
      <footer className={classes.footer}>
        <div>
          {t('f_about')} <a className={classes.privacyLink} href='https://genshindb.net/privacy'>{t('f_policy')}</a>.
        </div>
      
        <div>
        © genshindb.net 2022
        </div>
      
      </footer>
      </PageWrapper>
      
    );
  }
  