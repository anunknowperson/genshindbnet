import { useRouter } from 'next/router';


import { PostWrapper } from '../../../components/PostWrapper/PostWrapper';
import { Layout } from '../../../components/Layout/Layout';

import { useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { SearchBar } from '../../../components/SearchBar/SearchBar';

import useStyles from '../../../styles/internal/posts/list.styles';

import { Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons';

import { IconCircleCheck } from '@tabler/icons';
import { useSession } from 'next-auth/react';
import { Loader } from '@mantine/core';

import { Center } from '@mantine/core';

import { Button } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons';

import { useQueryClient } from '@tanstack/react-query';

import { IconWriting } from '@tabler/icons';

import { PostList } from '../../../components/Posts/PostList';

import Link from 'next/link';

import Date from 'dayjs';
import Head from 'next/head';

import { Text } from '@mantine/core';

export default function PostListPage({ }) {
    const router = useRouter();


    const queryClient = useQueryClient();

    const { pathname, asPath, query, locale } = router;
    const { data: session, status } = useSession()

    

    const { t } = useTranslation('common');

    

    const [cStatus, setcStatus] = useState({ ok: false, text: '' });

    const { classes } = useStyles();

    const [searchFilter, setSearchFilter] = useState('');

    const [lastChange, setLastChange] = useState(Date(1));

    if (status === "loading") {
        return <Center style={{ width: '100%', height: '100%' }}> <Loader /></Center>;
    }

    if (status === "unauthenticated") {
        router.push('/');
        return;
    }

    const createPost = async (type) => {
        if (Date().diff(lastChange, 'second') < 10) {
            alert('Please wait before creating new post.');
            return;
        }

        setLastChange(Date());


        const res = await fetch('/api/posts/createNew', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uid: session.user.uid,
                type: type,
                lang: locale,
            }),
        });

        if (res.status == 201) {
            setcStatus({ ok: true, text: t('newpostcreated') })

            queryClient.invalidateQueries('myPosts');
        } else if (res.status == 422) {
            setcStatus({ ok: false, text: t('newpostexist') })
        } else {
            setcStatus({ ok: false, text: t('fail') })
        }

        return res.status;

    }

    return (
        <>
            <Head>
                <title>Post List</title>
            </Head>

            <h1 className={classes.artifactSetNameHeader}>{t('myposts')}</h1>

            <div>
                <Link href='/posts/WfS3ABYhMDv3wd3O5hqE5' legacyBehavior>
                    <a className={classes.link}>

                        Publication rules

                    </a>
                </Link>

            </div>
            <div>
                <Link href='/posts/rZaw6KIk2SInAW4WT8uCK' legacyBehavior>
                    <a className={classes.link}>

                        Publication guidelines

                    </a>
                </Link>

            </div>



            <Button mt={10} mb={20} mr={10} variant="outline" leftIcon={<IconWriting size={14} />} onClick={() => { createPost('character') }}>
                {t('newcharacter')}
            </Button>

            <Button variant="outline" leftIcon={<IconWriting size={14} />} onClick={() => { createPost('post') }}>
                {t('newtutorial')}
            </Button>

            {
                (cStatus.text !== '') && ((cStatus.ok) ?
                    <Alert mb={10} icon={<IconCircleCheck size={16} />} title={t('success')} color="green">
                        {cStatus.text}
                    </Alert> :
                    <Alert mb={10} icon={<IconAlertCircle size={16} />} title={t('fail')} color="red">
                        {cStatus.text}
                    </Alert>
                )
            }

            <SearchBar callback={setSearchFilter} placeholder={t("table_search")} />

            <PostList uid={session.user.uid} searchFilter={searchFilter}>

            </PostList>
        </>
    );
}

PostListPage.getLayout = function getLayout(page) {
    return (
        <Layout>
            <PostWrapper>
                {page}
            </PostWrapper>
        </Layout>
    )
}

export async function getStaticProps(context) {

    return {
        props: { ...(await serverSideTranslations(context.locale, ['common', 'artifacts'])) },
    };
}