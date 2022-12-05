import { useRouter } from 'next/router';

import useStyles from '../../styles/artifacts.styles';

import { PostWrapper } from '../../components/PostWrapper/PostWrapper';

import { Layout } from '../../components/Layout/Layout';

import { ArtifactsListTable } from '../../components/ArtifactsListTable/ArtifactsListTable';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';


export default function ArtifactsPage({list}) {
  const router = useRouter();
  
  const { t } = useTranslation('common');

  const { classes } = useStyles();


  return (
    <>
        <h1 className={classes.artifactSetNameHeader}>{t('h_artifacts')}</h1>

        <ArtifactsListTable list={list}/>
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

async function fetchArtifactsFromDb(locale) {

    const lang = locale;
  
    const lib = await import('../../lib/mongowrapper');

    

    const artifacts = await lib.withMongo(async (db) => {
      const collection = db.collection('artifacts')
      return await collection.find({}, {projection: { "_id" : 0, "name" : 1,  "rarities" : 1, "twoPiecesBonus" : 1, "fourPiecesBonus" : 1, "label" : 1, "flower": 1, "circlet": 1}}).toArray()
    });
    
    var result = [];

    for (var i = 0; i < artifacts.length; i++){
        var ln = {
          label: artifacts[i]['label'],
          name: artifacts[i]['name'][lang],
          rarities: artifacts[i]['rarities'],
          twoPiecesBonus: artifacts[i]['twoPiecesBonus'][lang],
          fourPiecesBonus: artifacts[i]['fourPiecesBonus'][lang],
          
        };

        if (ln['fourPiecesBonus'] === ''){
          ln['image'] = artifacts[i]['circlet']['image'];

        } else {
          ln['image'] = artifacts[i]['flower']['image'];
        }

        result.push(
            ln
        );
    }

    return result;
  
  }

export async function getStaticProps(context) {
    const list = await fetchArtifactsFromDb(context.locale );
  
    return {
        props: { list: list, ...(await serverSideTranslations(context.locale, ['common', 'artifacts' ])) },
    };
  }