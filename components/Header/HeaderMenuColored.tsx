import { createStyles, Header, Menu, Group, Center, Burger, Container, Transition, Paper } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons';
import { Image } from '@mantine/core';

import { useTranslation } from 'next-i18next';

import { NextLink } from '@mantine/next';

import { SetStateAction, useState, useEffect } from 'react';
import { Select } from '@mantine/core';
import { useRouter } from 'next/router'

import { useViewportSize } from '@mantine/hooks';

import locales from "../../global/locales"
import { debug } from 'console';

import { PageWrapper } from '../../components/PageWrapper/PageWrapper';
import Link from 'next/link';

const HEADER_HEIGHT = 80;

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.colors.dark[6],
    
    //borderBottom: '0px solid ' + theme.colors.dark[8],
  },

  inner: {
    height: 80,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan(751)]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan(750)]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.white,
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    

    [theme.fn.smallerThan(751)] : {
      minHeight: '75px',
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      flexDirection: 'column',
    },
    

    '&:hover': {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
        0.1
      ),
    },
  },

  linkMobileDropdown: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: '75px',

    [theme.fn.smallerThan(751)] : {
      flexDirection: 'row',
    },

    
  },

    planeLink: {
    
    lineHeight: 1,
    
    textDecoration: 'none',
    color: theme.white,
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    },
  
  dropdown: {
    
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    backgroundColor: theme.colors.dark[5],

    [theme.fn.largerThan(750)]: {
      display: 'none',
    },
  },

  linkLabel: {
    marginRight: 5,
  },
}));

interface HeaderSearchProps {
  links: { link: string; label: string; links: { link: string; label: string }[] }[];
}

export function HeaderMenuColored({ links }: HeaderSearchProps) {
  const { t } = useTranslation('common');

  const [opened, { toggle, close }] = useDisclosure(false);

  const [mobileSubMenuOpened, mobileSubMenuHandlers ] = useDisclosure(false);

  const { classes , cx} = useStyles();

  const { height, width } = useViewportSize();

  const router = useRouter()
  const { pathname, asPath, query, locale } = router

  const [lang, setLang] = useState<string | null>(locale!);

  useEffect(() => {
    setLang(locale!);
  });

  const onLanguageSelect = (lang :String | null) =>{
    setLang(lang as SetStateAction<string | null>);

    router.push({ pathname, query }, asPath, { locale: lang as string | false | undefined })
  }

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link} component={Link} href={item.link}>{t(item.label)}</Menu.Item>
    ));

    if (menuItems) {
      return ( (width > 750) ?
        <Menu key={link.label} trigger="hover" exitTransitionDuration={0}>
          <Menu.Target>
            <a
              className={classes.link}
              href={link.link}
            >

                  <Center>
                    <span className={classes.linkLabel}>{t(link.label)}</span>
                    <IconChevronDown  size={15} stroke={1.5} />
                  </Center> 
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu> 
        : 
        <div key={link.label} className={cx(classes.link, classes.linkMobileDropdown)} >
          <Link  href={link.link} legacyBehavior>
          <a className={classes.planeLink} style={{width: '100%', height: '100%'}} onClick={close}>
            <span className={classes.linkLabel}>{t(link.label)}</span>
          </a>
          </Link>
          

          <div style={{width: '100%', height: '100%'}} onClick={(event) => mobileSubMenuHandlers.toggle()}>
            <IconChevronDown style={{float: 'right', marginRight: '10px'}} size={20} stroke={1.5}/>
          </div>
        </div>
      );
    }

    return (
      <Link key={link.label}
      href={link.link} legacyBehavior>
      <a
        
        
        className={classes.link}
        onClick={close}
      >
        {t(link.label)}
      </a>
      </Link>
      
    );
  });

  var languagesData = [];

  for (const language of locales){
    languagesData.push({value: language, label: language});
  }

  

  return (
    
    <PageWrapper mBottom={10}>
    <Header height={80} className={classes.header} mb={0}>
      <Container px={(width > 750) ? 40 : 20} fluid={true}>
        <div className={classes.inner}>

        
          <Group spacing={5} className={classes.links}>
            {items}
          </Group>
          
          <div style={{width: '70px'}}>
            <Select value={lang} onChange={onLanguageSelect} data={languagesData} />
          </div>

          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
            color="#fff"
          />
          

        </div>
        
      </Container>
    </Header>

      <Transition transition={"pop-top-right"} duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              <>
              {items}

              {(mobileSubMenuOpened) ? 
              
              links[3].links.map((link) => (
                <Link href={link.link} legacyBehavior>
                
                <a
                  style={{marginLeft: '20px'}}
                  key={link.label}
                  onClick={close}
                  className={classes.link}
                  
                  >
                    
                  {'> ' + t(link.label)}

                </a>

                </Link>
                
              ))
              
              : <></>}
              </>
            </Paper>
          )}
      </Transition>

    </PageWrapper>
    
  );
}
