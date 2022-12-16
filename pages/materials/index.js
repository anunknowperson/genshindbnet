import { useRouter } from 'next/router';

import useStyles from '../../styles/materials.styles';

import { PostWrapper } from '../../components/PostWrapper/PostWrapper';

import { Layout } from '../../components/Layout/Layout';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import {  useState } from 'react';
import { Chip, Group, Text } from '@mantine/core';

import {SearchBar} from '../../components/SearchBar/SearchBar';

import { MaterialsList } from '../../components/Materials/MaterialsList/MaterialsList';

import { useEffect } from 'react';
import { withMongo } from '../../lib/mongowrapper'
import { MultiSelect } from '@mantine/core';
export default function MaterialsPage({materialtypes}) {
  const { t } = useTranslation('common');

  const { classes } = useStyles();

  const [searchFilter, setSearchFilter] = useState('');

  const typesSelectData =  materialtypes.map( (val, el ) => ({value: val, label: val}))

  const [types, setTypes] = useState(materialtypes);
  const [rarities, setRarities] = useState(['1', '2', '3', '4', '5']);
  
  useEffect(() => {
    setTypes(materialtypes);
  }, [materialtypes]);

  const selectAllCallback = () => {
    setTypes(materialtypes);
  }

  return (
    <>
        <h1 className={classes.materialsNameHeader}>{'Materials'}</h1>

        <SearchBar callback={setSearchFilter} placeholder={t("table_search")}/>
        
          <Text style={{marginBottom: '15px'}}  fz="sm" fw={500}>
            {t('filter')} (<Text  span td="underline" c="blue" inherit><a className={classes.resetAll} onClick={selectAllCallback}>{t('select_all')}</a></Text>)
          </Text>
          
          <MultiSelect
            data={typesSelectData}

            value={types} onChange={setTypes}

            placeholder="Select any elements"

            searchable
            clearable
          />

          <Chip.Group style={{paddingTop: '20px', paddingBottom: '10px'}} value={rarities} onChange={setRarities} multiple>
            <Chip value="1">1</Chip>
            <Chip value="2">2</Chip>
            <Chip value="3">3</Chip>
            <Chip value="4">4</Chip>
            <Chip value="5">5</Chip>
          </Chip.Group>
        

        <MaterialsList typeFilter={types} rarityFilter={rarities} searchFilter={searchFilter}/>
    </>
  );
}

MaterialsPage.getLayout = function getLayout(page) {
  return (
    <Layout>
      <PostWrapper>
      {page}
      </PostWrapper>
    </Layout>
  )
}

async function fetchMaterialTypesDataFromDb(locale) {

  const lang = locale;

  const materialtypes = await withMongo(async (db) => {
    const collection = db.collection('materialtypes')
    return await collection.findOne()
  });

  return materialtypes[lang];

}

export async function getStaticProps(context) {
    return {
        props: {materialtypes: await fetchMaterialTypesDataFromDb(context.locale), ...(await serverSideTranslations(context.locale, ['common', 'weapons' ])) },
    };
  }