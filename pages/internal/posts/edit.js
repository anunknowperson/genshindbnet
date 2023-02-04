
import { PostWrapper } from '../../../components/PostWrapper/PostWrapper';
import { Layout } from '../../../components/Layout/Layout';

import { useState } from 'react';
import { withMongo } from '../../../lib/mw';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useStyles from '../../../styles/internal/posts/edit.styles';

import { Notification } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons';

import { Button, Group } from '@mantine/core';

import { CharacterEdit } from '../../../components/Posts/CharacterEdit';

import { useTranslation } from "next-i18next";
import { useRef } from 'react';
import Head from 'next/head';

import dynamic from "next/dynamic";
export default function PostEditPage({ postId, postName, postContent, postType, characterData, postArtifacts, postWeapons, postComments, postTeams }) {
    const Editor = dynamic(() => import('../../../components/Editor/Editor'), { ssr: false })
    const { classes } = useStyles();

    const { t } = useTranslation(['common']);
    const [notificationLoading, setNotificationLoading] = useState(false);
    const [notificationSuccess, setNotificationSuccess] = useState(false);
    const [notificationFail, setNotificationFail] = useState(false);

    const mainPostContent = useRef(postContent);
    const artifactsList = useRef(postArtifacts);
    const weaponsList = useRef(postWeapons);
    const commentsList = useRef(postComments);
    const teamsList = useRef(postTeams);

    const upload = async () => {
        setNotificationLoading(true);

        const delay = ms => new Promise(res => setTimeout(res, ms));

        await delay(1000);

        const updicts = {};

        updicts['content'] = mainPostContent.current;
        updicts['artifacts'] = artifactsList.current;
        updicts['weapons'] = weaponsList.current;
        updicts['comments'] = commentsList.current;
        updicts['teams'] = teamsList.current;

        
        const res = await fetch('/api/posts/contentEdit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: postId,
                updict: updicts,
            }),
        });


        setNotificationLoading(false);

        if (res.status == 201) {
            setNotificationSuccess(true);

            await delay(3000);

            setNotificationSuccess(false);
        } else {
            setNotificationFail(true);
        }

    }

    return (
        <>
            <Head>
                <title>{'Edit: ' + postName}</title>
            </Head>

            {notificationLoading &&
                <Notification
                    loading
                    title={t('uploading')}
                    disallowClose
                >
                    {t('pleasewait')}
                </Notification>}

            {notificationSuccess &&
                <Notification icon={<IconCheck size={18} />} color="teal" title={t('success')} onClose={() => { setNotificationSuccess(false) }}>
                    {t('postsuccesfull')}
                </Notification>}

            {notificationFail &&
                <Notification icon={<IconX size={18} />} color="red" title={t('fail')} onClose={() => { setNotificationSuccess(false) }}>
                    {t('postfail')}
                </Notification>}

            <Group position='apart'>
                <h1 className={classes.nameHeader}>{postName}</h1>
                <Button mb={10} variant="light" color="teal" onClick={upload}>{t('save')}</Button>
            </Group>

            {(postType === 'post') &&

                <Editor
                    name="description"

                    value={mainPostContent.current}

                    onChange={(data) => {
                        mainPostContent.current = data;

                    }}

                    disabled={false}

                />
            }

            {(postType === 'character') &&

                <CharacterEdit ed={Editor} character={characterData} initMainContent={mainPostContent.current} mainContentChangeCallback={(val) => { mainPostContent.current = val; }} initArtifacts={artifactsList}
                    artifactsChangeCallback={
                        (val) => { artifactsList.current = val; }
                    } initWeapons={weaponsList}
                    weaponsChangeCallback={
                        (val) => { weaponsList.current = val; }
                    }

                    initComments={postComments}

                    commentsChangeCallback={
                        (nick, val) => {
                            commentsList.current[nick] = val;
                        }
                    }

                    initTeams={teamsList}

                    teamsChangeCallback={
                        (val) => { teamsList.current = val; }
                    }
                />

            }

        </>
    );
}

PostEditPage.getLayout = function getLayout(page) {
    return (
        <Layout>
            <PostWrapper>
                {page}
            </PostWrapper>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const post = await withMongo('data', async (db) => {
        const collection = db.collection('posts');
        return await collection.findOne({ id: context.query['id'] });
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
        props: { postId: context.query['id'], postName: post.name, postContent: post.content, postType: post.type, characterData: character, postArtifacts: post.artifacts, postWeapons: post.weapons, postComments: post.comments, postTeams: post.teams, ...(await serverSideTranslations(context.locale, ['common'])) },
    };
}