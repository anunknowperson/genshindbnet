import { useRouter } from 'next/router'

import { Welcome } from '../../components/Welcome/Welcome';

import { ArtifactPieceSelector } from '../../components/ArtifactPieceSelector/ArtifactPieceSelector';

import { ContentPanel } from '../../components/ContentPanel/ContentPanel';

import { ArtifactPieceDisplay } from '../../components/ArtifactPieceDisplay/ArtifactPieceDisplay';

import { ArtifactMainStatsTable } from '../../components/ArtifactMainStatsTable/ArtifactMainStatsTable';
import {ArtifactSubStatsTable} from '../../components/ArtifactSubStatsTable/ArtifactSubStatsTable';

import useStyles from '../../styles/weapon.style'

import { TextFormat } from '../../components/TextFormat/TextFormat';

import {useState} from 'react'

import { Switch } from '@mantine/core';

import locales from '../../global/locales';

import { PostWrapper } from '../../components/PostWrapper/PostWrapper';

import { Layout } from '../../components/Layout/Layout';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


import { useTranslation } from 'next-i18next';

import { WeaponDisplay } from '../../components/WeaponDisplay/WeaponDisplay';

// Server only
import { withMongo } from '../../lib/mongowrapper'
import { WeaponAscension } from '../../components/WeaponAscension/WeaponAscension';


export default function WeaponPage({label, strings}) {
  const router = useRouter();
  
  
  const { t } = useTranslation(['common', 'artifacts']);

  const [level, setLevel] = useState(strings['baseatk'].length - 1);
  const [progression, setProgression] = useState(true);

  const { classes } = useStyles();

  const onLevelChanged = (level) => {
    setLevel(level);
  }

  return (
    <>

      <h1 className={classes.artifactSetNameHeader}>{strings.name}</h1>

        
      <div className={classes.firstLine}>

          <div className={classes.leftCollumnBox}>
            
            <div className={classes.leftCollimnPiecesUp}>
              <ContentPanel>
                <WeaponDisplay levelCallback={onLevelChanged} strings={strings}/>
              </ContentPanel>
            </div>
            <div className={classes.leftCollimnPiecesDown}>
              <ContentPanel>
                <div style={{padding: '20px 10px 10px 20px'}}>
                <h2 style={{margin: 0, padding: '0px 0px 10px 0px'}}>{'Ascension'}</h2>

                <Switch
                  style={{margin: 0, padding: '0px 0px 10px 0px'}}
                  checked={progression}
                  onChange={(event) => setProgression(event.currentTarget.checked)}
                  label="Full progression"
                />

                <WeaponAscension level={level} progression={progression} costs={strings.costs}/>
                </div>
                
              </ContentPanel>
            </div>

          </div>
          <div className={classes.artifactStoryBox}>
            <ContentPanel>
              <div className={classes.artifactStory}>
                <TextFormat>{strings.story}</TextFormat>
              </div>
            </ContentPanel>
          </div>

        </div>


      

      
      
    </>
  );
}

WeaponPage.getLayout = function getLayout(page) {
  return (
    <Layout>
      <PostWrapper>
      {page}
      </PostWrapper>
    </Layout>
  )
}

export async function getStaticPaths() {
  var weapons = await withMongo(async (db) => {
    const collection = db.collection('weapons')
    return await collection.find({}, {projection: {label : true, _id : false}}).toArray()
  });


  var paths = []

  for (const weapon of weapons){

    for (const locale of locales){
      

      paths.push({params: {name: weapon['label']}, locale: locale });
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

  const weapons = await withMongo(async (db) => {
    const collection = db.collection('weapons')
    return await collection.find({label: label}).toArray()
  });

  var localized = {}

  localized.name = weapons[0]['name'][lang];
  localized.weapontype = weapons[0]['weapontype'][lang];
  localized.description = weapons[0]['description'][lang];
  localized.story = weapons[0]['story'][lang];
  localized.rarity = weapons[0]['rarity'];

  localized.substat = weapons[0]['substat'][lang];
  localized.subvalue = weapons[0]['subvalue'];
  localized.baseatk = weapons[0]['baseatk'];

  localized.r1 = weapons[0]['r1'][lang];
  localized.r2 = weapons[0]['r2'][lang];
  localized.r3 = weapons[0]['r3'][lang];
  localized.r4 = weapons[0]['r4'][lang];
  localized.r5 = weapons[0]['r5'][lang];

  localized.effectname = weapons[0]['effectname'][lang];
  localized.effect = weapons[0]['effect'][lang];

  localized.costs = weapons[0]['costs'];

  localized.images = weapons[0]['images'];

  /*localized.rarities = artifact[0]['rarities'];
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
  }*/

  return localized;

}

export async function getStaticProps(context) {
  var label = context.params.name;

  const data = await fetchArtifactDataFromDb(context.locale,label );

  return {
      props: { label: label, strings: data, ...(await serverSideTranslations(context.locale, ['common', 'artifacts' ])) },
  };
}

