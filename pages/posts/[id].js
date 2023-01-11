
import { PostWrapper } from '../../components/PostWrapper/PostWrapper';

import { Layout } from '../../components/Layout/Layout';
import { withMongo } from '../../lib/mw.js'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import parse from 'html-react-parser';
import { useTranslation } from 'next-i18next';

import { Text } from '@mantine/core';
import Link from 'next/link';

import dynamic from "next/dynamic";

import { CharacterPostView } from '../../components/Posts/CharacterPostView';

export default function PostPage({ postId, postName, postContent, postType, characterData, postArtifacts, postWeapons, postComments, postTeams }) {

  const { t } = useTranslation(['common']);

  const Viewer = dynamic(() => import('../../components/Editor/Viewer'), { ssr: false })

  return (<>
    {(postType === 'post') &&
      <Viewer
        name="post"

        value={postContent}
      />
    }

    {(postType === 'character') &&

      <CharacterPostView character={characterData} initMainContent={postContent} mainContentChangeCallback={(val) => { mainPostContent.current = val; }} initArtifacts={postArtifacts}
        artifactsChangeCallback={
          (val) => { artifactsList.current = val; }
        } initWeapons={postWeapons}
        weaponsChangeCallback={
          (val) => { weaponsList.current = val; }
        }

        initComments={postComments}

        commentsChangeCallback={
          (nick, val) => {
            commentsList.current[nick] = val;
          }
        }

        initTeams={postTeams}

        teamsChangeCallback={
          (val) => { teamsList.current = val; }
        }
      />

    }
  </>

  );
}

PostPage.getLayout = function getLayout(page) {
  return (
    <Layout>
      <PostWrapper>
        {page}
      </PostWrapper>
    </Layout>
  )
}

export async function getStaticPaths() {

  return {
    // ['chs', 'cht', 'en', 'fr', 'de', 'es', 'pt', 'ru', 'jp', 'kr', 'th', 'vi', 'id'],
    // Only `/posts/1` and `/posts/2` are generated at build time



    paths: [],

    // Enable statically generating additional pages
    // For example: `/posts/3`
    fallback: 'blocking',
  }
}

export async function getStaticProps(context) {
  const post = await withMongo('data', async (db) => {
    const collection = db.collection('posts');
    return await collection.findOne({ id: context.params['id'] });
});

var character = {};

if (post.type === 'character') {
    var c = await withMongo('content', async (db) => {
        const collection = db.collection('characters');
        return await collection.findOne({ label: post.character });
    });

    character['label'] = c.label;
    character['rarity'] = c.rarity;

    character['name'] = c.name[context.locale];
    character['fullname'] = c.fullname[context.locale];
    character['title'] = c.title[context.locale];

    character['description'] = c.description[context.locale];
    character['element'] = c.element[context.locale];
    character['weapontype'] = c.weapontype[context.locale];

    character['substat'] = c.substat[context.locale];
    character['region'] = c.region[context.locale];
    character['affiliation'] = c.affiliation[context.locale];
    character['birthday'] = c.birthday[context.locale];
    character['constellation'] = c.constellation[context.locale];

    character['images'] = c.images;
    character['stats'] = c.stats;
    character['talents'] = c.talents[context.locale];
    character['constellations'] = c.constellations[context.locale];

    character['costs'] = c.costs;
    character['talentcosts'] = c.talentcosts;

    character['weapontypeint'] = c.weapontype['en'];
}

  return {
    props: { postId: context.params['id'], postName: post.name, postContent: post.content, postType: post.type, characterData: character, postArtifacts: post.artifacts, postWeapons: post.weapons, postComments: post.comments, postTeams: post.teams, ...(await serverSideTranslations(context.locale, ['common'])) },
  };
}

