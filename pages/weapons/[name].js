import { useRouter } from 'next/router'

import { ContentPanel } from '../../components/ContentPanel/ContentPanel';

import useStyles from '../../styles/weapon.style'

import { TextFormat } from '../../components/TextFormat/TextFormat';

import { useState } from 'react'

import { Switch } from '@mantine/core';

import locales from '../../global/locales';

import { PostWrapper } from '../../components/PostWrapper/PostWrapper';

import { Layout } from '../../components/Layout/Layout';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


import { useTranslation } from 'next-i18next';

import { WeaponDisplay } from '../../components/Weapons/WeaponDisplay/WeaponDisplay';

// Server only
import { withMongo } from '../../lib/mongowrapper'
import { WeaponAscension } from '../../components/Weapons/WeaponAscension/WeaponAscension';

import { Text } from '@mantine/core';
import Link from 'next/link';
import Head from 'next/head';
export default function WeaponPage({ label, strings }) {
  const router = useRouter();


  const { t } = useTranslation(['common', 'weapons']);

  const [level, setLevel] = useState(strings['baseatk'].length - 1);
  const [progression, setProgression] = useState(true);

  const { classes } = useStyles();

  const onLevelChanged = (level) => {
    setLevel(level);
  }

  return (
    <>
      <Head>
        <title>{strings.name}</title>
      </Head>

      <div className={classes.breadcrumbs}>
        <Link className={classes.breadcrumbsLink} href="/weapons">{t('h_weapons')}</Link> &gt;
      </div>


      <h1 className={classes.artifactSetNameHeader}>{strings.name}</h1>


      <div className={classes.firstLine}>

        <div className={classes.leftCollumnBox}>

          <div className={classes.leftCollimnPiecesUp}>
            <ContentPanel>
              <WeaponDisplay levelCallback={onLevelChanged} strings={strings} />
            </ContentPanel>
          </div>
          <div className={classes.leftCollimnPiecesDown}>
            <ContentPanel>
              <div style={{ padding: '20px 10px 10px 20px' }}>
                <h2 style={{ margin: 0, padding: '0px 0px 10px 0px' }}>{t("w_ascension", { ns: 'weapons' })}</h2>

                <Switch
                  style={{ margin: 0, padding: '0px 0px 10px 0px' }}
                  checked={progression}
                  onChange={(event) => setProgression(event.currentTarget.checked)}
                  label={t("w_fullprogression", { ns: 'weapons' })}
                />

                <WeaponAscension level={level} progression={progression} costs={strings.costs} />
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
    return await collection.find({}, { projection: { label: true, _id: false } }).toArray()
  });


  var paths = []

  for (const weapon of weapons) {

    for (const locale of locales) {


      paths.push({ params: { name: weapon['label'] }, locale: locale });
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
    return await collection.find({ label: label }).toArray()
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


  return localized;

}

export async function getStaticProps(context) {
  var label = context.params.name;

  const data = await fetchArtifactDataFromDb(context.locale, label);

  return {
    props: { label: label, strings: data, ...(await serverSideTranslations(context.locale, ['common', 'weapons'])) },
  };
}

