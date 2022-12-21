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
import Image from 'next/image';
import { MultiSelect } from '@mantine/core';
export default function FoodsPage({}) {
  const { t } = useTranslation('common');

  const { classes } = useStyles();

  const [searchFilter, setSearchFilter] = useState('');

  const categoriesInit = ['Atk_Add', 'Atk_CritRate', 'Recovery_HpAdd', 'Recovery_HpAddAll', 'Recovery_Revive', 'Other_SPAdd', 'Other_SPReduceConsume', 'Def_Add', 'Climate_Heat'];

  const [categories, setCategories] = useState(categoriesInit);

  const [rarities, setRarities] = useState(['1', '2', '3', '4', '5']);
  
  const selectAllCallback = () => {
    setCategories(categoriesInit);
  }

  const resetSelectionCallback = () => {
    setCategories([]);
  }

  return (
    <>
        <h1 className={classes.materialsNameHeader}>{t('h_foods')}</h1>

        <SearchBar callback={setSearchFilter} placeholder={t("table_search")}/>

        <Text style={{marginBottom: '15px'}}  fz="sm" fw={500}>
          {t('filter')} (<Text  span td="underline" c="blue" inherit><a className={classes.resetAll} onClick={resetSelectionCallback}>{t('remove_all')}</a></Text>) (<Text  span td="underline" c="blue" inherit><a className={classes.resetAll} onClick={selectAllCallback}>{t('select_all')}</a></Text>)
        </Text>

        <Group position='apart' style={{paddingTop: '0px', paddingBottom: '10px'}}>
          <Chip.Group value={categories} onChange={setCategories} multiple >
            <Chip value="Recovery_Revive"><Image style={{objectFit: 'contain'}} height={18} width={18} src={`/resources/UI_Buff_Item_${'Recovery_Revive'}.png`} alt={'Filter Image'}></Image></Chip>
            <Chip value="Recovery_HpAdd"><Image style={{objectFit: 'contain'}} height={18} width={18} src={`/resources/UI_Buff_Item_${'Recovery_HpAdd'}.png`} alt={'Filter Image'}></Image></Chip>
            <Chip value="Recovery_HpAddAll"><Image style={{objectFit: 'contain'}} height={18} width={18} src={`/resources/UI_Buff_Item_${'Recovery_HpAddAll'}.png`} alt={'Filter Image'}></Image></Chip>
            <Chip value="Atk_Add"><Image style={{objectFit: 'contain'}} height={18} width={18} src={`/resources/UI_Buff_Item_${'Atk_Add'}.png`} alt={'Filter Image'}></Image></Chip>
            <Chip value="Atk_CritRate"><Image style={{objectFit: 'contain'}} height={18} width={18} src={`/resources/UI_Buff_Item_${'Atk_CritRate'}.png`} alt={'Filter Image'}></Image></Chip>
            <Chip value="Other_SPReduceConsume"><Image style={{objectFit: 'contain'}} height={18} width={18} src={`/resources/UI_Buff_Item_${'Other_SPReduceConsume'}.png`} alt={'Filter Image'}></Image></Chip>
            <Chip value="Other_SPAdd"><Image style={{objectFit: 'contain'}} height={18} width={18} src={`/resources/UI_Buff_Item_${'Other_SPAdd'}.png`} alt={'Filter Image'}></Image></Chip>
            <Chip value="Def_Add"><Image style={{objectFit: 'contain'}} height={18} width={18} src={`/resources/UI_Buff_Item_${'Def_Add'}.png`} alt={'Filter Image'}></Image></Chip>
            <Chip value="Climate_Heat"><Image style={{objectFit: 'contain'}} height={18} width={18} src={`/resources/UI_Buff_Item_${'Climate_Heat'}.png`} alt={'Filter Image'}></Image></Chip>
            
          </Chip.Group>

          <Chip.Group  value={rarities} onChange={setRarities} multiple>
            <Chip value="1">1</Chip>
            <Chip value="2">2</Chip>
            <Chip value="3">3</Chip>
            <Chip value="4">4</Chip>
            <Chip value="5">5</Chip>
          </Chip.Group>
        </Group>

        <FoodsList categoryFilter={categories}  rarityFilter={rarities} searchFilter={searchFilter}/>
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
        props: {...(await serverSideTranslations(context.locale, ['common' ])) },
    };
  }