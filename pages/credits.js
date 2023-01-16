import { useRouter } from 'next/router';

import useStyles from '../styles/credits.styles';

import { PostWrapper } from '../components/PostWrapper/PostWrapper';
import { Layout } from '../components/Layout/Layout';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';

import { MantineLogo } from '@mantine/ds';

import {

    Image,
    Container,
    Title,

    Text,

} from '@mantine/core';

export default function CreditsPage({ }) {

    const { t } = useTranslation('common');

    const { classes } = useStyles();



    return (
        <>
            <Head>
                <title>Credits</title>
            </Head>

            <h1 className={classes.header}>{''}</h1>


            <Container>
                <div className={classes.inner}>
                    <div className={classes.content}>
                        <Title className={classes.title}>
                            Credits
                        </Title>


                        <h1>Team</h1>

                        <Text mt={20}>
                            Project leader (website development, translations, writing):
                        </Text>

                        <Text mt={20} c='white'>
                            maestro#1001
                        </Text>

                        <Text mt={20}>
                            The rest of the project participants can be found on Discord.
                        </Text>

                        <h1>Techologies</h1>



                    </div>

                </div>
            </Container>

            <div className={classes.container}>
                <div style={{ flex: '1' }}>
                    <Image width={170} src={'/credits/next.svg'} color='white' />
                </div>

                <div style={{ flex: '1', marginTop: '15px'}}>
                    <MantineLogo flex={'1'} size={60} />
                </div>

                <div style={{ flex: '1' }}>
                    <Text c='white' ta='center' fz={50}>
                        genshin-db
                    </Text>
                </div>

            </div>



        </>
    );
}

CreditsPage.getLayout = function getLayout(page) {
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
        props: { ...(await serverSideTranslations(context.locale, ['common'])) },
    };
}