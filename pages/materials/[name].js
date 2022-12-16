import { useRouter } from 'next/router'

import { ContentPanel } from '../../components/ContentPanel/ContentPanel';

import useStyles from '../../styles/material.style'

import { TextFormat } from '../../components/TextFormat/TextFormat';

import {useState} from 'react'

import locales from '../../global/locales';

import { PostWrapper } from '../../components/PostWrapper/PostWrapper';

import { Layout } from '../../components/Layout/Layout';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { MaterialPageView } from '../../components/Materials/MaterialPageView/MaterialPageView';

import { useTranslation } from 'next-i18next';

import Link from 'next/link';
// Server only
import { withMongo } from '../../lib/mongowrapper'


export default function MaterialPage({label, strings}) {
  const router = useRouter();
  
  
  const { t } = useTranslation(['common', 'weapons']);

  const { classes } = useStyles();

  return (
    <>

      <div className={classes.breadcrumbs}>
        <Link className={classes.breadcrumbsLink}  href="/materials">{t('h_materials')}</Link> &gt;
      </div>

      <h1 className={classes.artifactSetNameHeader}>{strings.name}</h1>

        
      <div className={classes.firstLine}>

          <div className={classes.collumnContainer}>
            
              <ContentPanel>
                <MaterialPageView strings={strings}>

                </MaterialPageView>
              </ContentPanel>
          
          </div>

        </div>

      <div style={{height: '200px'}}/>
      

      
      
    </>
  );
}

MaterialPage.getLayout = function getLayout(page) {
  return (
    <Layout>
      <PostWrapper>
      {page}
      </PostWrapper>
    </Layout>
  )
}

export async function getStaticPaths() {
  var materials = await withMongo(async (db) => {
    const collection = db.collection('materials')
    return await collection.find({}, {projection: {label : true, _id : false}}).toArray()
  });


  var paths = []

  for (const material of materials){

    for (const locale of locales){
      

      paths.push({params: {name: material['label']}, locale: locale });
    }
    
  }


  return {

    paths: paths,

    fallback: false,
  }
}

async function fetchMaterialDataFromDb(locale, label) {

  const lang = locale;

  const materials = await withMongo(async (db) => {
    const collection = db.collection('materials')
    return await collection.find({label: label}).toArray()
  });

  var localized = {}

  localized.name = materials[0]['name'][lang];
  localized.materialtype = materials[0]['materialtype'][lang];
  localized.description = materials[0]['description'][lang];
  localized.rarity = materials[0]['rarity'];

  localized.source = materials[0]['source'][lang];

  localized.images = materials[0]['images'];


  return localized;

}

export async function getStaticProps(context) {
  var label = context.params.name;

  const data = await fetchMaterialDataFromDb(context.locale,label );

  return {
      props: { label: label, strings: data, ...(await serverSideTranslations(context.locale, ['common', 'weapons' ])) },
  };
}

