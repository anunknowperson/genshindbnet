import { useRouter } from 'next/router';

import useStyles from '../../styles/weapons.styles';

import { PostWrapper } from '../../components/PostWrapper/PostWrapper';

import { Layout } from '../../components/Layout/Layout';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { WeaponsList } from '../../components/WeaponsList/WeaponsList';
import {  useState } from 'react';
import { Chip, Group } from '@mantine/core';

import {SearchBar} from '../../components/SearchBar/SearchBar';

export default function WeaponsPage({}) {
  const { t } = useTranslation('common');

  const { classes } = useStyles();

  const [searchFilter, setSearchFilter] = useState('');
  const [types, setTypes] = useState(['claymore', 'sword', 'polearm', 'bow', 'catalyst']);
  const [rarities, setRarities] = useState(['3', '4', '5']);
  

  return (
    <>
        <h1 className={classes.weaponSetNameHeader}>{t('h_weapons')}</h1>

        <SearchBar callback={setSearchFilter} placeholder={t("table_search")}/>
        
        <Group position='apart' style={{marginBottom: '10px'}}>
          <Chip.Group value={types} onChange={setTypes} multiple>
            <Chip value="claymore">{t("w_claymore", { ns: 'weapons' })}</Chip>
            <Chip value="sword">{t("w_sword", { ns: 'weapons' })}</Chip>
            <Chip value="polearm">{t("w_polearm", { ns: 'weapons' })}</Chip>
            <Chip value="bow">{t("w_bow", { ns: 'weapons' })}</Chip>
            <Chip value="catalyst">{t("w_catalyst", { ns: 'weapons' })}</Chip>
          </Chip.Group>

          <Chip.Group value={rarities} onChange={setRarities} multiple>
            <Chip value="1">1</Chip>
            <Chip value="2">2</Chip>
            <Chip value="3">3</Chip>
            <Chip value="4">4</Chip>
            <Chip value="5">5</Chip>
          </Chip.Group>
        </Group>

        <WeaponsList rarityFilter={rarities} typeFilter={types} searchFilter={searchFilter}/>

    </>
  );
}

WeaponsPage.getLayout = function getLayout(page) {
  return (
    <Layout>
      <PostWrapper>
      {page}
      </PostWrapper>
    </Layout>
  )
}


export async function getStaticProps(context) {
    return {
        props: {...(await serverSideTranslations(context.locale, ['common', 'weapons' ])) },
    };
  }