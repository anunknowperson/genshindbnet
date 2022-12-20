import { useRouter } from 'next/router';

import useStyles from '../../styles/foods.styles';

import { PostWrapper } from '../../components/PostWrapper/PostWrapper';

import { Layout } from '../../components/Layout/Layout';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import {  useState } from 'react';
import { Chip, Group, Text } from '@mantine/core';

import {SearchBar} from '../../components/SearchBar/SearchBar';

import { FoodsList } from '../../components/Foods/FoodsList/FoodsList';

import { useEffect } from 'react';

import { MultiSelect } from '@mantine/core';
export default function FoodsPage({}) {
  const { t } = useTranslation('common');

  const { classes } = useStyles();

  const [searchFilter, setSearchFilter] = useState('');

  const [rarities, setRarities] = useState(['1', '2', '3', '4', '5']);
  


  return (
    <>
        <h1 className={classes.materialsNameHeader}>{t('h_foods')}</h1>

        <SearchBar callback={setSearchFilter} placeholder={t("table_search")}/>
        

          <Chip.Group style={{paddingTop: '20px', paddingBottom: '10px'}} value={rarities} onChange={setRarities} multiple>
            <Chip value="1">1</Chip>
            <Chip value="2">2</Chip>
            <Chip value="3">3</Chip>
            <Chip value="4">4</Chip>
            <Chip value="5">5</Chip>
          </Chip.Group>
        

        <FoodsList  rarityFilter={rarities} searchFilter={searchFilter}/>
    </>
  );
}

FoodsPage.getLayout = function getLayout(page) {
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