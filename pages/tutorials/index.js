import { useRouter } from 'next/router';

import useStyles from '../../styles/weapons.styles';

import { PostWrapper } from '../../components/PostWrapper/PostWrapper';

import { Layout } from '../../components/Layout/Layout';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { TutorialPosts } from '../../components/Posts/TutorialsPosts';

import Head from 'next/head';

export default function TutorialsPage({ }) {
    const { t } = useTranslation('common');

    const { classes } = useStyles();



    return (
        <>
            <Head>
                <title>Tutorials</title>
            </Head>

            <h1 className={classes.weaponSetNameHeader}>{t('h_tutorials')}</h1>

            <TutorialPosts />
        </>
    );
}

TutorialsPage.getLayout = function getLayout(page) {
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
        props: { ...(await serverSideTranslations(context.locale, ['common', 'weapons'])) },
    };
}