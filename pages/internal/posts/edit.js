
import { PostWrapper } from '../../../components/PostWrapper/PostWrapper';
import { Layout } from '../../../components/Layout/Layout';

import { useState } from 'react';
import { withMongo } from '../../../lib/mw';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useStyles from '../../../styles/internal/posts/edit.styles';

import { Notification } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons';

import Editor from '../../../components/Editor/Editor';
import { Button, Group } from '@mantine/core';

import { CharacterEdit } from '../../../components/Posts/CharacterEdit';

import { useRef } from 'react';

export default function PostEditPage({ postId, postName, postContent, postType, characterData, postArtifacts, postWeapons, postComments, postTeams }) {

    const { classes } = useStyles();

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

        const res = await fetch('/api/posts/propEdit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: postId,
                field: 'content',
                value: mainPostContent.current,
            }),
        });

        const res2 = await fetch('/api/posts/propEdit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: postId,
                field: 'artifacts',
                value: artifactsList.current,
            }),
        });

        const res3 = await fetch('/api/posts/propEdit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: postId,
                field: 'weapons',
                value: weaponsList.current,
            }),
        });
        const res4 = await fetch('/api/posts/propEdit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: postId,
                field: 'comments',
                value: commentsList.current,
            }),
        });

        console.log(teamsList.current);

        const res5 = await fetch('/api/posts/propEdit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: postId,
                field: 'teams',
                value: teamsList.current,
            }),
        });

        setNotificationLoading(false);

        if (res.status == 201) {
            setNotificationSuccess(true);
        } else {
            setNotificationFail(true);
        }

    }

    return (
        <>
            {notificationLoading &&
                <Notification
                    loading
                    title="Uploading data to the server"
                    disallowClose
                >
                    Please wait...
                </Notification>}

            {notificationSuccess &&
                <Notification icon={<IconCheck size={18} />} color="teal" title="Success" onClose={() => { setNotificationSuccess(false) }}>
                    Post successfully updated!
                </Notification>}

            {notificationFail &&
                <Notification icon={<IconX size={18} />} color="red" title="Sorry! Something went wrong" onClose={() => { setNotificationSuccess(false) }}>
                    Please backup your work.
                </Notification>}

            <Group position='apart'>
                <h1 className={classes.nameHeader}>{postName}</h1>
                <Button mb={10} variant="light" color="teal" onClick={upload}>Save</Button>
            </Group>

            {(postType === 'post') &&

                <Editor
                    name="description"

                    value={postContent}

                    onChange={(data) => {
                        mainPostContent.current = data;

                    }}

                />
            }

            {(postType === 'character') &&

                <CharacterEdit character={characterData} initMainContent={postContent} mainContentChangeCallback={(val) => { mainPostContent.current = val; }} initArtifacts={postArtifacts}
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