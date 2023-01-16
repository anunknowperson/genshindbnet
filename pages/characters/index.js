import { useRouter } from 'next/router';

import useStyles from '../../styles/weapons.styles';

import { PostWrapper } from '../../components/PostWrapper/PostWrapper';

import { Layout } from '../../components/Layout/Layout';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { WeaponsList } from '../../components/Weapons/WeaponsList/WeaponsList';
import { useRef, useState } from 'react';
import { Chip, Group } from '@mantine/core';

import Image from 'next/image';

import { CharacterFilter } from '../../components/Characters/CharacterFilter/CharacterFilter';

import { CharacterPosts } from '../../components/Posts/CharacterPosts';
import Head from 'next/head';

export default function CharactersPage({ }) {
    const { t } = useTranslation('common');

    const { classes } = useStyles();

    const [types, setTypes] = useState(['claymore', 'sword', 'polearm', 'bow', 'catalyst']);
    const [elements, setElements] = useState(['pyro', 'hydro', 'anemo', 'electro', 'dendro', 'cryo', 'geo']);
    const [rarities, setRarities] = useState(['4', '5']);

    const [selected, setSelected] = useState('');

    const scroll = useRef();

    const changeCharacter = (val) => {
        setSelected(val);
        scroll.current.scrollIntoView()
    }

    return (
        <>
            <Head>
                <title>Character guides</title>
            </Head>

            <h1 className={classes.weaponSetNameHeader}>{t('h_characters')}</h1>

            <Group position='apart' style={{ marginBottom: '10px' }}>
                <Chip.Group value={elements} onChange={setElements} multiple>
                    <Chip value="pyro">{
                        <Image alt={'pyro'} src="/pyro.png" width={15} height={15} />
                    }</Chip>
                    <Chip value="hydro">{
                        <Image alt={'hydro'} src="/hydro.png" width={15} height={15} />
                    }</Chip>
                    <Chip value="anemo">{
                        <Image alt={'anemo'} src="/anemo.png" width={15} height={15} />
                    }</Chip>
                    <Chip value="electro">{
                        <Image alt={'electro'} src="/electro.png" width={15} height={15} />
                    }</Chip>

                    <Chip value="dendro">{
                        <Image alt={'dendro'} src="/dendro.png" width={15} height={15} />
                    }</Chip>
                    <Chip value="cryo">{
                        <Image alt={'cryo'} src="/cryo.png" width={15} height={15} />
                    }</Chip>
                    <Chip value="geo">{
                        <Image alt={'geo'} src="/geo.png" width={15} height={15} />
                    }</Chip>

                </Chip.Group>

                <Chip.Group value={types} onChange={setTypes} multiple>
                    <Chip value="claymore">{t("w_claymore", { ns: 'weapons' })}</Chip>
                    <Chip value="sword">{t("w_sword", { ns: 'weapons' })}</Chip>
                    <Chip value="polearm">{t("w_polearm", { ns: 'weapons' })}</Chip>
                    <Chip value="bow">{t("w_bow", { ns: 'weapons' })}</Chip>
                    <Chip value="catalyst">{t("w_catalyst", { ns: 'weapons' })}</Chip>
                </Chip.Group>

                <Chip.Group value={rarities} onChange={setRarities} multiple>
                    <Chip value="4">4</Chip>
                    <Chip value="5">5</Chip>
                </Chip.Group>
            </Group>

            <CharacterFilter selectionChanged={changeCharacter} elements={elements} weapons={types} rarities={rarities} />

            <div style={{ marginBottom: '40px' }} ref={scroll} />


            <CharacterPosts character={selected} />
        </>
    );
}

CharactersPage.getLayout = function getLayout(page) {
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