import { PageWrapper } from '../../components/PageWrapper/PageWrapper';

import useStyles from './Footer.styles';


import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import Image from 'next/image';
import Link from 'next/link';

import { IconArrowUp } from '@tabler/icons';
import { useWindowScroll } from '@mantine/hooks';
import { Affix, Button, Text, Transition } from '@mantine/core';

export function Footer() {
    const { classes, cx } = useStyles();
  
    const { pathname, asPath, query, locale } = useRouter();
  
    const { t } = useTranslation(['common']);

    const [scroll, scrollTo] = useWindowScroll();

    var friends = false;

    if (locale == 'ru') {
      friends = true;
    }

    return (
      <PageWrapper mTop={10}>
        <Affix position={{ bottom: 20, right: 20 }}>
          <Transition transition="slide-up" mounted={scroll.y > 0}>
            {(transitionStyles) => (
              <Button
                leftIcon={<IconArrowUp size={16} />}
                style={transitionStyles}
                onClick={() => scrollTo({ y: 0 })}
              >
                Scroll to top
              </Button>
            )}
          </Transition>
        </Affix>

      <footer className={classes.footer}>
        <div className={friends ? cx(classes.container, classes.containerFlex) : classes.container}>
          <div>
            <div className={ friends ? classes.leftAlg : null}>
              {t('f_about')} <a className={classes.privacyLink} href='https://genshindb.net/privacy'>{t('f_policy')}</a>.
            </div>
      
            <div className={ friends ? classes.leftAlg : null}>© genshindb.net 2023</div>

          </div>
          {
            friends ?
              <div className={classes.friends}>
                <div>Наши друзья:</div>
            
                <Link href="https://poklonniki.gitbook.io/poklonniki-tumana/" legacyBehavior>
                  <a>
                  <Image className={classes.friendButton} width={30} height={30} src="/mist.png" alt={'Friends'}></Image>
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
  