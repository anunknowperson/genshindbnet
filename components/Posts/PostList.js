import useStyles from './PostList.styles'

import { useTranslation } from 'next-i18next';

import { Box, Checkbox, useMantineTheme } from '@mantine/core';

import { useQuery } from '@tanstack/react-query';

import { DataTable } from 'mantine-datatable';
import { useState, useEffect } from 'react';
import { Button } from '@mantine/core';
import Link from 'next/link';
import Image from "next/image"
import { useRouter } from 'next/router';

import { Group } from '@mantine/core';
import { ActionIcon } from '@mantine/core';

import { IconEye, IconEdit, IconTrash } from '@tabler/icons';

import { TextInput } from '@mantine/core';

import locales from '../../global/locales';
import { NativeSelect } from '@mantine/core';

import { CharacterSelect } from '../Characters/TeamLine/CharacterSelect';

import { Modal } from '@mantine/core';
import { useQueryClient } from '@tanstack/react-query';
export function PostList({ uid, searchFilter }) {
    const recordsPerPage = 20;


    const queryClient = useQueryClient();

    const { classes } = useStyles();

    const { t } = useTranslation(['common']);

    const [page, setPage] = useState(1);

    const router = useRouter();

    const [deleteOpened, setDeleteOpened] = useState(false);
    const [toDelete, setToDelete] = useState({});

    const [toChangeCharacter, setToChangeCharacter] = useState(null);
    const [charSelect, setCharSelect] = useState('');

    useEffect(() => {
        setPage(1);
    }, [searchFilter]);

    const fetchPosts = async (page, search) => {
        const res = await fetch(`/api/posts/myPosts?uid=${uid}&page=${page}&recordsPerPage=${recordsPerPage}&search=${search}`);

        const result = await res.json();

        return { total: result.total, posts: result.posts };
    };

    const { data, isFetching } = useQuery(
        ['myPosts', page, searchFilter],
        async () => fetchPosts(page, searchFilter),
        { refetchOnWindowFocus: false, enable: false }
    );


    const {
        breakpoints: { xs: xsBreakpoint },
        colors
    } = useMantineTheme();


    const changePage = (id) => {
        setPage(id);

        window.scrollTo(0, 0)
    }

    const editPost = async (id, field, newValue) => {
        const res = await fetch('/api/posts/propEdit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                field: field,
                value: newValue,
            }),
        });
    }

    const removePost = async () => {
        setDeleteOpened(false)

        const res = await fetch('/api/posts/removePost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: toDelete.id,
            }),
        });

        queryClient.invalidateQueries('myPosts');
    }

    const NameEdit = ({ id, name }) => {
        const [value, setValue] = useState(name);

        return <TextInput

            placeholder="Post name"
            withAsterisk
            error={(value == "") ? true : false}
            value={value}
            onChange={(event) => {
                setValue(event.currentTarget.value);
                editPost(id, 'name', event.currentTarget.value);
                for (const post of data.posts) {
                    if (post.name == name) {
                        post['name'] = event.currentTarget.value;
                    }
                }
            }}
        />

    }

    var languagesData = [];

    for (const language of locales) {
        languagesData.push({ value: language, label: language });
    }

    const LanguageEdit = ({ id, lang }) => {
        const [value, setValue] = useState(lang);

        return (<NativeSelect value={value} onChange={(event) => {

            setValue(event.currentTarget.value);
            editPost(id, 'lang', event.currentTarget.value);
            for (const post of data.posts) {
                if (post.id == id) {
                    post['lang'] = event.currentTarget.value;
                }
            }
        }} data={languagesData} />);

    }

    const PublicEdit = ({ id, isPublic }) => {
        const [value, setValue] = useState(isPublic);

        return (<Checkbox checked={value} onChange={(event) => {
            setValue(event.currentTarget.checked);
            editPost(id, 'public', event.currentTarget.checked);
            for (const post of data.posts) {
                if (post.id == id) {
                    post['public'] = event.currentTarget.checked;
                }
            }
        }
        } />);

    }



    return (

        <>
            <Box>

                <DataTable
                    height={(data?.total == 0) ? 800 : undefined}

                    sx={{ '& tbody tr td': { verticalAlign: 'middle' }, '& thead tr th div': { textAlign: 'left' } }}

                    borderRadius="sm"

                    verticalAlignment="top"
                    fetching={isFetching}
                    columns={[
                        {
                            accessor: 'name',
                            title: 'Name',
                            width: 140,
                            textAlignment: 'center',

                            sortable: true,
                            render: ({ id, name }) => <NameEdit id={id} name={name} />,
                        },
                        {
                            accessor: 'type',
                            title: 'Type',
                            width: 140,
                            textAlignment: 'center',

                            sortable: true,
                            render: ({ type }) => (type === 'character') ? 'Character' : 'Post',
                        },
                        {
                            accessor: 'character',
                            title: 'Character',
                            width: 140,
                            textAlignment: 'center',

                            sortable: true,
                            render: ({ id, character }) =>
                                <div style={{ display: 'flex' }}>
                                    {character}
                                    <ActionIcon color="blue" onClick={() => {
                                        setCharSelect(character);
                                        setToChangeCharacter(id);

                                    }}>
                                        <IconEdit size={16} />
                                    </ActionIcon>
                                </div>,
                        },
                        {
                            accessor: 'lang',
                            title: 'Language',
                            width: 140,
                            textAlignment: 'center',

                            sortable: true,
                            render: ({ id, lang }) => <LanguageEdit id={id} lang={lang} />,
                        },
                        {
                            accessor: 'public',
                            title: 'Public?',
                            width: 140,
                            textAlignment: 'center',

                            sortable: true,
                            render: (arr) => <PublicEdit id={arr['id']} isPublic={arr['public']} />,
                        },
                        {
                            accessor: 'id',
                            title: 'Action',
                            width: 140,
                            textAlignment: 'center',

                            sortable: true,
                            render: ({ id, name }) => <Group spacing={4} position='center' noWrap>
                                <ActionIcon color="green" onClick={() => router.push('/posts/' + id)}>
                                    <IconEye size={16} />
                                </ActionIcon>
                                <ActionIcon color="blue" onClick={() => router.push('/internal/posts/edit?id=' + id)}>
                                    <IconEdit size={16} />
                                </ActionIcon>
                                <ActionIcon color="red" onClick={() => { setToDelete({ id: id, name: name }); setDeleteOpened(true) }}>
                                    <IconTrash size={16} />
                                </ActionIcon>
                            </Group>,
                        },
                    ]}
                    records={data?.posts}
                    page={page}
                    onPageChange={changePage}
                    totalRecords={data?.total}
                    recordsPerPage={recordsPerPage}

                    idAccessor="name"

                    classNames={classes}

                />
            </Box>

            <Modal
                opened={deleteOpened}
                onClose={() => setDeleteOpened(false)}
                title="Confirmation"
            >
                Are you sure you want to delete this post? This action cannot be undone.

                <br /><br />

                {toDelete.name}

                <br /><br />

                <Button mr={20} variant="outline" color="green" onClick={() => { setDeleteOpened(false) }}>
                    Return
                </Button>

                <Button variant="outline" color="red" onClick={() => { removePost() }} >
                    Remove {toDelete.name}
                </Button>
            </Modal>

            <Modal
                opened={toChangeCharacter != null}
                onClose={() => setToChangeCharacter(null)}
                title="Select"
            >
                Change character

                <br /><br />

                <CharacterSelect selected={charSelect} selectCallback={(val) => {
                    setCharSelect(val);
                }} />

                <br /><br />

                <Button mr={20} variant="outline" color="green" onClick={() => { setToChangeCharacter(null) }}>
                    Return
                </Button>

                <Button variant="outline" color="red" onClick={() => {

                    editPost(toChangeCharacter, 'character', charSelect);
                    for (const post of data.posts) {
                        if (post.id == toChangeCharacter) {
                            post['character'] = charSelect;
                        }
                    }

                    setToChangeCharacter(null);

                }} >
                    Apply
                </Button>
            </Modal>

        </>
    );
}
