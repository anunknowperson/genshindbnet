import { useRouter } from 'next/router'

import { ContentPanel } from '../../components/ContentPanel/ContentPanel';

import useStyles from '../../styles/food.styles'

import { TextFormat } from '../../components/TextFormat/TextFormat';

import {useState} from 'react'

import locales from '../../global/locales';

import { PostWrapper } from '../../components/PostWrapper/PostWrapper';

import { Layout } from '../../components/Layout/Layout';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { useTranslation } from 'next-i18next';

import { FoodsPageView } from '../../components/Foods/FoodsPageView/FoodsPageView';

import Link from 'next/link';
// Server only
import { withMongo } from '../../lib/mongowrapper'


export default function FoodPage({label, strings}) {
  const router = useRouter();
  
  
  const { t } = useTranslation(['common', 'weapons']);

  const { classes } = useStyles();

  return (
    <>

      <div className={classes.breadcrumbs}>
        <Link className={classes.breadcrumbsLink}  href="/foods">{t('h_foods')}</Link> &gt;
      </div>

      <h1 className={classes.artifactSetNameHeader}>{strings.name}</h1>

        
      <div className={classes.firstLine}>

          <div className={classes.collumnContainer}>
            
              <ContentPanel>
                <FoodsPageView strings={strings}>

                </FoodsPageView>
              </ContentPanel>
          
          </div>

        </div>

      <div style={{height: '200px'}}/>
      

      
      
    </>
  );
}

FoodPage.getLayout = function getLayout(page) {
  return (
    <Layout>
      <PostWrapper>
      {page}
      </PostWrapper>
    </Layout>
  )
}

export async function getStaticPaths() {
  var foods = await withMongo(async (db) => {
    const collection = db.collection('foods')
    return await collection.find({}, {projection: {label : true, _id : false}}).toArray()
  });


  var paths = []

  for (const food of foods){

    for (const locale of locales){
      

      paths.push({params: {name: food['label']}, locale: locale });
    }
    
  }


  return {

    paths: paths,

    fallback: false,
  }
}

async function fetchFoodDataFromDb(locale, label) {

  const lang = locale;

  const foods = await withMongo(async (db) => {
    const collection = db.collection('foods')
    return await collection.find({label: label}).toArray()
  });

  var localized = {}

  localized.name = foods[0]['name'][lang];
  localized.foodtype = foods[0]['foodtype'];
  localized.foodcategory = foods[0]['foodcategory'];
  localized.rarity = foods[0]['rarity'];

  if (localized.foodtype !== 'NORMAL'){
    localized.basedish = foods[0]['basedish'];
    localized.basedish.name = foods[0]['basedish']['name'][lang];
    localized.character = foods[0]['character'];
    localized.character.name = foods[0]['character']['name'][lang];
    localized.description = foods[0]['description'][lang];
    localized.effect = foods[0]['effect'][lang];
  } else {
    localized.suspicious = {
      effect : foods[0]['suspicious']['effect'][lang],
      description : foods[0]['suspicious']['description'][lang],
    };
  
    localized.normal = {
      effect : foods[0]['normal']['effect'][lang],
      description : foods[0]['normal']['description'][lang],
    };
  
    localized.delicious = {
      effect : foods[0]['delicious']['effect'][lang],
      description : foods[0]['delicious']['description'][lang],
    };
  }
  
  

  localized.ingredients = foods[0]['ingredients'];

  localized.images = foods[0]['images'];


  return localized;

}

export async function getStaticProps(context) {
  var label = context.params.name;

  const data = await fetchFoodDataFromDb(context.locale,label );

  return {
      props: { label: label, strings: data, ...(await serverSideTranslations(context.locale, ['common', 'weapons' ])) },
  };
}

