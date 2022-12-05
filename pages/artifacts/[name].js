import { useRouter } from 'next/router'

import { Welcome } from '../../components/Welcome/Welcome';

import { ArtifactPieceSelector } from '../../components/ArtifactPieceSelector/ArtifactPieceSelector';

import { ContentPanel } from '../../components/ContentPanel/ContentPanel';

import { ArtifactPieceDisplay } from '../../components/ArtifactPieceDisplay/ArtifactPieceDisplay';

import { ArtifactMainStatsTable } from '../../components/ArtifactMainStatsTable/ArtifactMainStatsTable';
import {ArtifactSubStatsTable} from '../../components/ArtifactSubStatsTable/ArtifactSubStatsTable';

import useStyles from '../../components/ArtifactView/ArtifactView.style';

import { TextFormat } from '../../components/TextFormat/TextFormat';

import {useState} from 'react'

import locales from '../../global/locales';

import { PostWrapper } from '../../components/PostWrapper/PostWrapper';

import { Layout } from '../../components/Layout/Layout';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


import { useTranslation } from 'next-i18next';


// Server only
import { withMongo } from '../../lib/mongowrapper'


export default function ArtifactSetPage({label, strings}) {
  const router = useRouter();
  
  
  const { t } = useTranslation(['common', 'artifacts']);



  const [selected, setSelected] = useState('Circlet');
  const [rarity, setRarity] = useState(strings.rarities[strings.rarities.length - 1]);

  const { classes } = useStyles();

  const selectedCallback = (selected) => {
    setSelected(selected);
  } 

  return (
    <>

        <h1 className={classes.artifactSetNameHeader}>{strings.name}</h1>

        <div className={classes.firstLine}>
          
          <ArtifactPieceSelector label={label} strings={strings} changedCallback={selectedCallback}/>

          <div className={classes.artifactPieceBox}>
            <ContentPanel>
              <ArtifactPieceDisplay label={label} type={selected} strings={strings} rarityCallback={setRarity}/>
            </ContentPanel>

          </div>
          <div className={classes.artifactStoryBox}>
            <ContentPanel>
              <div className={classes.artifactStory}>
              <TextFormat>{strings[selected.toLowerCase()]['story']}</TextFormat>
              </div>
            </ContentPanel>
          </div>

        </div>

      <h2 style={{margin: '40px 0px 10px 0px'}}>{t('a_mainStats', { ns: 'artifacts' })}</h2>

      <ArtifactMainStatsTable type={selected} rarity={Number(rarity)}/>
      

      <h2 style={{margin: '40px 0px 10px 0px'}}>{t('a_subStats', { ns: 'artifacts' })}</h2>
      
      <ArtifactSubStatsTable type={selected} rarity={Number(rarity)}/>
      
    </>
  );
}

ArtifactSetPage.getLayout = function getLayout(page) {
  return (
    <Layout>
      <PostWrapper>
      {page}
      </PostWrapper>
    </Layout>
  )
}

export async function getStaticPaths() {
  var artifacts = await withMongo(async (db) => {
    const collection = db.collection('artifacts')
    return await collection.find({}, {projection: {label : true, _id : false}}).toArray()
  });

  var paths = []

  for (const artifact of artifacts){

    for (const locale of locales){
      

      paths.push({params: {name: artifact['label']}, locale: locale });
    }
    
  }


  return {
    // ['chs', 'cht', 'en', 'fr', 'de', 'es', 'pt', 'ru', 'jp', 'kr', 'th', 'vi', 'id'],
    // Only `/posts/1` and `/posts/2` are generated at build time

    

    paths: paths,

    // Enable statically generating additional pages
    // For example: `/posts/3`
    fallback: false,
  }
}

async function fetchArtifactDataFromDb(locale, label) {

  const lang = locale;

  const artifact = await withMongo(async (db) => {
    const collection = db.collection('artifacts')
    return await collection.find({label: label}).toArray()
  });

  var localized = {}

  localized.name = artifact[0]['name'][lang];
  localized.rarities = artifact[0]['rarities'];
  localized.twoPiecesBonus = artifact[0]['twoPiecesBonus'][lang];
  localized.fourPiecesBonus = artifact[0]['fourPiecesBonus'][lang];

  localized.flower = {
    name : artifact[0]['flower']['name'][lang],
    description : artifact[0]['flower']['description'][lang],
    story : artifact[0]['flower']['story'][lang],
    image:  artifact[0]['flower']['image'],
  }

  localized.plume = {
    name : artifact[0]['plume']['name'][lang],
    description : artifact[0]['plume']['description'][lang],
    story : artifact[0]['plume']['story'][lang],
    image:  artifact[0]['plume']['image'],
  }

  localized.sands = {
    name : artifact[0]['sands']['name'][lang],
    description : artifact[0]['sands']['description'][lang],
    story : artifact[0]['sands']['story'][lang],
    image:  artifact[0]['sands']['image'],
  }

  localized.goblet = {
    name : artifact[0]['goblet']['name'][lang],
    description : artifact[0]['goblet']['description'][lang],
    story : artifact[0]['goblet']['story'][lang],
    image:  artifact[0]['goblet']['image'],
  }

  localized.circlet = {
    name : artifact[0]['circlet']['name'][lang],
    description : artifact[0]['circlet']['description'][lang],
    story : artifact[0]['circlet']['story'][lang],
    image:  artifact[0]['circlet']['image'],
  }

  return localized;

}

export async function getStaticProps(context) {
  var label = context.params.name;

  const data = await fetchArtifactDataFromDb(context.locale,label );

  return {
      props: { label: label, strings: data, ...(await serverSideTranslations(context.locale, ['common', 'artifacts' ])) },
  };
}

