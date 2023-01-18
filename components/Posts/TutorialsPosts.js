import { ContentPanel } from '../ContentPanel/ContentPanel'

import { createStyles, Divider, Text } from '@mantine/core';

import { useState } from 'react';
import { SegmentedControl } from '@mantine/core';

import { useQuery } from '@tanstack/react-query';

import { useRouter } from 'next/router';

import { Group, Pagination, MultiSelect } from '@mantine/core';

import Link from 'next/link';

import locales from '../../global/locales'
import { IconHeart } from '@tabler/icons';
import { SearchBar } from '../SearchBar/SearchBar';
import { useTranslation } from 'next-i18next';

const useStyles = createStyles((theme, _params, getRef) => ({
    link: {
        '&:visited': {
            color: theme.colors.dark[0],
        },
        '&:hover': {
            color: 'gray',
        },

        color: theme.colors.dark[0],
    },
}));


function TutorialPost({ name, by, desc, id, likes }) {

    const { classes } = useStyles();

    return (
        <div style={{ width: '100%', height: '250px' }} >

            <ContentPanel>

                <div style={{ padding: '20px' }}>

                    <Group position='apart'>


                        <Link href={'/posts/' + id} legacyBehavior>
                            <a className={classes.link}>
                                <Text fz={40} c="white">
                                    {name}
                                </Text>
                            </a>
                        </Link>

                        <div style={{ display: 'flex', alignContent: 'center' }}>
                            <div>{likes}</div> <IconHeart scale={13} />
                        </div>
                    </Group>

                    <Text mb={10}>
                        {'by ' + by}
                    </Text>


                    <Text lineClamp={4}>
                        {desc}
                    </Text>
                </div>
            </ContentPanel>
        </div>
    );
}

export function TutorialPosts({ }) {
    const { t } = useTranslation('common');

    const recordsPerPage = 21;

    const [sort, setSort] = useState('top');

    const [page, setPage] = useState(1);

    const { locale } = useRouter();

    const [langs, setLangs] = useState((locale === 'en') ? ['en'] : ['en', locale]);

    const [searchFilter, setSearchFilter] = useState('');
    const fetchPosts = async (sortp, pagep, searchp) => {
        const res = await fetch(`/api/posts/tutorialPosts?langs=${JSON.stringify(langs)}&sort=${sortp}&page=${pagep}&recordsPerPage=${recordsPerPage}&search=${searchp}`);

        const result = await res.json();


        return result;
    };

    const { data, isFetching } = useQuery(
        ['characters', langs, sort, page, searchFilter],
        async () => fetchPosts(sort, page, searchFilter),
        { refetchOnWindowFocus: false }
    );

    var languagesData = [];

    for (const language of locales) {
        languagesData.push({ value: language, label: language });
    }

    return (
        <>
            <Group mb={20} position="apart">
                <SegmentedControl
                    value={sort}
                    onChange={setSort}

                    data={[
                        { label: t('top'), value: 'top' },
                        { label: t('recent'), value: 'recent' },
                    ]}
                />

                <MultiSelect
                    data={languagesData}
                    label={t('languages')}
                    value={langs}
                    onChange={setLangs}
                />
            </Group>

            <SearchBar mb={20} callback={setSearchFilter} placeholder={t("table_search")} />

            <div style={{ width: '100%', display: 'flex', gap: '30px', flexDirection: 'column' }} >
                {(!isFetching && data != undefined) && data.posts.map((el, val) =>
                    <TutorialPost key={el.id} name={el.name} by={el.createdBy} desc={el.description} id={el.id} likes={el.likes} />
                )}
            </div>

            {(!isFetching && data != undefined) && <Group position='apart' style={{ marginTop: '20px' }}>
                <div>
                    {`${(page - 1) * recordsPerPage + 1} - ${Math.min((page) * recordsPerPage, data.total)} / ${data.total}`}
                </div>
                <Pagination page={page} onChange={setPage} total={Math.ceil(data.total / recordsPerPage)} withEdges />
            </Group>}
        </>
    );
}
