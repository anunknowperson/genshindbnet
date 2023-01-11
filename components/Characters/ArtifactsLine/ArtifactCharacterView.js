
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

import useStyles from '../views.styles';
export function ArtifactCharacterView({ label, needF }) {

    const { t } = useTranslation(['common']);

    const { classes } = useStyles();
    const { locale } = useRouter();

    const fetchArtifact = async (page, columnAccessor, direction, search, raritiesFilter) => {
        const res = await fetch(`/api/artifacts?lang=${locale}&page=${page}&recordsPerPage=${100}&columnAccessor=${columnAccessor}&direction=${direction}&search=${search}&rarities=${JSON.stringify(raritiesFilter)}`);

        const result = await res.json();

        return result.list[0];
    };

    const { data, isFetching } = useQuery(
        ['artifact ' + label, locale],
        async () => fetchArtifact(1, 'name', 'asc', label, ['3', '4', '5']),
        { refetchOnWindowFocus: false }
    );


    return (
        <>

            {(!isFetching) &&

                <div>
                    <div style={{ marginBottom: '20px' }}>
                        <Image alt={data.name} height={60} width={60} src={"/resources/" + data.image}></Image> {data.rarities[data.rarities.length - 1]}<Image alt={'star'} height={15} width={15} src={'/star.svg'}></Image> <Link href={'/artifacts/' + data.label} legacyBehavior>
                            <a className={classes.link}>
                                {data.name}
                            </a>
                        </Link>
                    </div>
                    <div>
                        2: {<TextFormat>{data.twoPiecesBonus}</TextFormat>}
                    </div>
                    {needF &&
                        <div>
                            4: {<TextFormat>{data.fourPiecesBonus}</TextFormat>}
                        </div>}
                </div>



            }
        </>
    );
}
