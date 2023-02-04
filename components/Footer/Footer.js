import { PageWrapper } from '../../components/PageWrapper/PageWrapper';

import useStyles from './Footer.styles';


import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import Image from 'next/image';
import Link from 'next/link';

import { IconArrowUp } from '@tabler/icons';
import { useWindowScroll } from '@mantine/hooks';
import { Affix, Button, Text, Transition } from '@mantine/core';

import { DiscordIcon } from '@mantine/ds';

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
        <div className={cx(classes.container, classes.containerFlex)}>
          <div>
            <div className={classes.leftAlg}>
              {t('f_about')} <Link className={classes.privacyLink} href='/credits'>{t('f_credits')}</Link> <Link className={classes.privacyLink} href='/policy'>{t('f_policy')}</Link>.
            </div>

            <div className={classes.leftAlg}>© genshindb.net 2023</div>

          </div>
          {
            friends ?
              <div className={classes.friends}>
                <div>Полезные ссылки:</div>
                <Link href="https://discord.gg/jE8gCxvyeq" legacyBehavior>
                  <a>
                    <Image className={classes.friendButton} width={30} height={30} src="/discord.svg" alt={'Friends'}></Image>
                  </a>

                </Link>
                <Link href="https://poklonniki.gitbook.io/poklonniki-tumana/" legacyBehavior>
                  <a>
                    <Image className={classes.friendButton} width={30} height={30} src="/mist.png" alt={'Friends'}></Image>
                  </a>

                </Link>
                <Link href="http://theorylib.space/" legacyBehavior>
                  <a>
                  <Image className={classes.friendButton} width={30} height={30} src="/theory.png" alt={'Friends'}></Image>
                  </a>
                  
                </Link>

              </div>
              : <div className={classes.friends}>
                <div>Useful links:</div>

                <Link href="https://discord.gg/fzDBJfBq2M" legacyBehavior>
                  <a>
                    <Image className={classes.friendButton} width={30} height={30} src="/discord.svg" alt={'Friends'}></Image>
                  </a>

                </Link>

              </div>
          }

        </div>


      </footer>
    </PageWrapper>

  );
}
