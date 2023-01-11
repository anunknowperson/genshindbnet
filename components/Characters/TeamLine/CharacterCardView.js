
import { useTranslation } from 'next-i18next';
import { Select } from '@mantine/core';

import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { forwardRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Text, Group } from '@mantine/core';

import { TextFormat } from '../../TextFormat/TextFormat';

import { useViewportSize } from '@mantine/hooks';

import useStyles from '../views.styles';

export function CharacterCardView({ label }) {
    const { height, width } = useViewportSize();
    const { t } = useTranslation(['common']);

    const { classes } = useStyles();
    const { locale } = useRouter();

    const fetchCharacters = async (search) => {
        const res = await fetch(`/api/characters?lang=${locale}&search=${search}`);

        const result = await res.json();

        return result.list[0];
    };

    const { data, isFetching } = useQuery(
        ['character ' + label, locale],
        async () => fetchCharacters(label),
        { refetchOnWindowFocus: false }
    );


    return (
        <>

            {(!isFetching) &&

                <div>
                    <div style={{ marginBottom: '20px' }}>
                        <Image alt={data.name} height={(width< 750) ? 50 : 100} width={(width< 750) ? 50 : 100} src={"/resources/" + data.images.namesideicon + '.png'}></Image>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <Link href={'/characters?c=' + data.label} legacyBehavior>
                            <a className={classes.link}>
                                {data.name}
                            </a>
                        </Link>

                    </div>
                </div>



            }
        </>
    );
}
