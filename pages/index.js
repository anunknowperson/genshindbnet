import { useRouter } from 'next/router';

import useStyles from '../styles/index.styles';

import { PostWrapper } from '../components/PostWrapper/PostWrapper';
import { Layout } from '../components/Layout/Layout';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';

import Feed from '../components/Feed/Feed';

import {
    createStyles,
    Image,
    Container,
    Title,
    Button,
    Group,
    Text,
    List,
    ThemeIcon,
} from '@mantine/core';
import { IconCheck } from '@tabler/icons';

export default function MainPage({ }) {

    const { t } = useTranslation('common');

    const { classes } = useStyles();



    return (
        <>
            <Head>
                <title>Index!!</title>
            </Head>

            <h1 className={classes.header}>{''}</h1>


            <Container>
                <div className={classes.inner}>
                    <div className={classes.content}>
                        <Title className={classes.title}>
                        {t("i_header", { ns: 'index' })}
                        </Title>
                        <Text color="dimmed" mt="md">

                        </Text>

                        <List
                            mt={30}
                            spacing="sm"
                            size="sm"
                            icon={
                                <ThemeIcon size={20} radius="xl">
                                    <IconCheck size={12} stroke={1.5} />
                                </ThemeIcon>
                            }
                        >
                            <List.Item>
                                <b>{t("i_explore", { ns: 'index' })}</b>{t("i_list_1", { ns: 'index' })}
                            </List.Item>
                            <List.Item>
                                <b>{t("i_discuss", { ns: 'index' })}</b>{t("i_list_2", { ns: 'index' })}
                            </List.Item>
                            <List.Item>
                                <b>{t("i_create", { ns: 'index' })}</b>{t("i_list_3", { ns: 'index' })}
                            </List.Item>
                            <List.Item>
                                <b>{t("i_share", { ns: 'index' })}</b>{t("i_list_4", { ns: 'index' })}
                            </List.Item>
                        </List>

                        <Text mt={20}>
                            {t("i_tip", { ns: 'index' })}
                        </Text>


                    </div>
                    <Image alt='post' mt={60} src={'/hero.png'} className={classes.image} />
                </div>
            </Container>

            <Image alt='post' src={'/hero.png'} className={classes.imageMobile} />

            <div style={{ width: '100%',  display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                <Feed type='official' />
                <Feed type='character' />
                <Feed type='tutorial' />
            </div>

        </>
    );
}

MainPage.getLayout = function getLayout(page) {
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
        props: { ...(await serverSideTranslations(context.locale, ['common', 'index'])) },
    };
}