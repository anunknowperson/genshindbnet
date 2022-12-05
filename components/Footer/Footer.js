import { PageWrapper } from '../../components/PageWrapper/PageWrapper';

import useStyles from './Footer.styles';


import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
    const { classes, cx } = useStyles();
  
    const { pathname, asPath, query, locale } = useRouter();
  
    const { t } = useTranslation(['common']);

    var friends = false;

    if (locale == 'ru') {
      friends = true;
    }

    return (
      <PageWrapper mTop={10}>
      <footer className={classes.footer}>
        <div className={friends ? cx(classes.container, classes.containerFlex) : classes.container}>
          <div>
            <div className={ friends ? classes.leftAlg : null}>
              {t('f_about')} <a className={classes.privacyLink} href='https://genshindb.net/privacy'>{t('f_policy')}</a>.
            </div>
      
            <div className={ friends ? classes.leftAlg : null}>© genshindb.net 2022</div>

          </div>
          {
            friends ?
              <div className={classes.friends}>
                <div>Наши друзья:</div>
            
                <Link href="https://poklonniki.gitbook.io/poklonniki-tumana/">
                  <a>
                  <Image className={classes.friendButton} width={30} height={30} src="/mist.png"></Image>
                  </a>
                  
                </Link>
            
              </div>
            : <></>
          }
          
        </div>
        
      
      </footer>
      </PageWrapper>
      
    );
  }
  