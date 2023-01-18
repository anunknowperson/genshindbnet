
import { PostWrapper } from '../../components/PostWrapper/PostWrapper';

import { Layout } from '../../components/Layout/Layout';
import { withMongo } from '../../lib/mw.js'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import parse from 'html-react-parser';
import { useTranslation } from 'next-i18next';

import { Button, Center, Text } from '@mantine/core';
import Link from 'next/link';

import dynamic from "next/dynamic";

import { CharacterPostView } from '../../components/Posts/CharacterPostView';
import { IconHeart } from '@tabler/icons';

import { useState } from 'react';

import { useSession } from 'next-auth/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import Comments from '../../components/Comments/Comments';
import Head from 'next/head';

import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme, _params, getRef) => ({
  nameHeader: {
    color: theme.white,
    fontSize: '48px',
    fontWeight: 500,
    margin: '0px 0px 20px 0px',
  },
}));

export default function PostPage({ postId, postName, postContent, postType, characterData, postArtifacts, postWeapons, postComments, postTeams, postLikes }) {

  const { t } = useTranslation(['common']);

  const Editor = dynamic(() => import('../../components/Editor/Editor'), { ssr: false })

  const { data: session, status } = useSession();
  const queryClient = useQueryClient()
  const fetchLikes = async (s) => {

    var res;

    if (s != null) {
      res = await fetch(`/api/posts/getLikes?uid=${s.user.uid}&postId=${postId}`);
    } else {
      res = await fetch(`/api/posts/getLikes?postId=${postId}`);
    }


    const result = await res.json();
    return result;
  };

  const { data, isFetching } = useQuery(
    ['likes', session],
    async () => fetchLikes(session),
    { refetchOnWindowFocus: false, enabled: status != 'loading' }
  );
  const { classes } = useStyles();

  return (<>
    <Head>
      <title>{postName}</title>
    </Head>

    {(postType === 'post') &&
      <>
        <h1 className={classes.nameHeader}>{postName}</h1>


        <Editor
          key="viewer"
          name="post"

          value={postContent}
          disabled={true}
        /></>
    }

    {(postType === 'character') &&

      <CharacterPostView ed={Editor} character={characterData} initMainContent={postContent} mainContentChangeCallback={(val) => { mainPostContent.current = val; }} initArtifacts={postArtifacts}
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

    <Center mt={20} mb={20}>
      <Button leftIcon={<IconHeart />} variant={(data != undefined && data.my == true) ? "light" : "outline"} onClick={async () => {

        if (session == null) {
          return;
        }

        await fetch(`/api/posts/changeLike?uid=${session.user.uid}&postId=${postId}&check=${!data.my}`);

        queryClient.invalidateQueries('likes')

      }}>
        {(data != undefined) && data.count}
      </Button>
    </Center>

    <Comments postId={postId} />
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

