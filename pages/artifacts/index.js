import { useRouter } from 'next/router';

import useStyles from '../../styles/artifacts.styles';

import { PostWrapper } from '../../components/PostWrapper/PostWrapper';

import { Layout } from '../../components/Layout/Layout';

import { ArtifactsList } from '../../components/Artifacts/ArtifactsList/ArtifactsList';

import { Chip, Group } from '@mantine/core';
import {  useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import {SearchBar} from '../../components/SearchBar/SearchBar';

export default function ArtifactsPage({}) {
  const router = useRouter();
  
  const { t } = useTranslation('common');

  const { classes } = useStyles();

  const [searchFilter, setSearchFilter] = useState('');
  const [rarities, setRarities] = useState(['4', '5']);


  return (
    <>
        <h1 className={classes.artifactSetNameHeader}>{t('h_artifacts')}</h1>

        <SearchBar callback={setSearchFilter} placeholder={t("table_search")}/>
        
        <Group position='apart' style={{marginBottom: '10px'}}>
          <Chip.Group value={rarities} onChange={setRarities} multiple>
            <Chip value="1">1</Chip>
            <Chip value="2">2</Chip>
            <Chip value="3">3</Chip>
            <Chip value="4">4</Chip>
            <Chip value="5">5</Chip>
          </Chip.Group>
        </Group>

        <ArtifactsList rarityFilter={rarities} searchFilter={searchFilter}/>

    </>
  );
}

ArtifactsPage.getLayout = function getLayout(page) {
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
        props: {...(await serverSideTranslations(context.locale, ['common', 'artifacts' ])) },
    };
  }