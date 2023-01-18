
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
export function WeaponCharacterView({ label }) {

    const { t } = useTranslation(['common']);

    const { classes } = useStyles();
    const { locale } = useRouter();

    const fetchWeapon = async (page, columnAccessor, direction, search, raritiesFilter, typesFilter) => {
        const res = await fetch(`/api/weapons?lang=${locale}&page=${page}&recordsPerPage=${100}&columnAccessor=${columnAccessor}&direction=${direction}&search=${search}&rarities=${JSON.stringify(raritiesFilter)}&types=${JSON.stringify(typesFilter)}`);

        const result = await res.json();

        return result.list[0];
    };

    const { data, isFetching } = useQuery(
        ['weapon ' + label, locale],
        async () => fetchWeapon(1, 'name', 'asc', label, ['3', '4', '5'], ['claymore', 'sword', 'polearm', 'bow', 'catalyst']),
        { refetchOnWindowFocus: false }
    );


    return (
        <>

            {(!isFetching) &&

                <div>
                    <div style={{ marginBottom: '20px' }}>
                        <Image alt={data.name} height={60} width={60} src={"/resources/" + data.images.icon + '.png'}></Image> {data.rarity}<Image alt={'star'} height={15} width={15} src={'/star.svg'}></Image> <Link href={'/weapons/' + data.label} legacyBehavior>
                            <a className={classes.link}>
                                {data.name}
                            </a>
                        </Link>
                    </div>

                    <div>
                        Base ATK: {data.baseatk}
                    </div>
                    <div>
                        {data.substat}: {data.subvalue}
                    </div>
                    <br />
                    <i>
                        {data.effectname}
                    </i>

                    <div>
                        {(() => {
                            var eff = data.effect;

                            String.prototype.splitAndKeep = function (separator) {
                                var str = this;

                                str = str.split(new RegExp(`(${separator})`, 'g'));

                                return str;
                            };

                            var filter = '';

                            var toReplace = [];

                            for (var i = 0; i < data.r1.length; i++) {
                                toReplace.push(`{${i}}`);

                                filter += `\\{${i}\\}`;

                                if (i != data.r1.length - 1) {
                                    filter += '|';
                                }

                            }


                            const format = (str) => {
                                var res = str.splitAndKeep(filter);

                                for (var i = 0; i < res.length; i++) {
                                    if (toReplace.includes(res[i])) {
                                        res[i] = <span key={i} style={{ color: 'lightblue' }}>{`${data.r1[parseInt(res[i][1])]} ~ ${data.r5[parseInt(res[i][1])]}`}</span>;
                                    } else {
                                        res[i] = <TextFormat key={i}>{res[i]}</TextFormat>
                                    }
                                }

                                return res;

                            }

                            eff = format(eff);

                            return eff;
                        })()}
                    </div>

                    {/*<div>
                        2: { <TextFormat>{data.twoPiecesBonus}</TextFormat>}
                    </div>
                    {needF &&
                    <div>
                        4: { <TextFormat>{data.fourPiecesBonus}</TextFormat>}
                    </div>}*/}
                </div>



            }
        </>
    );
}
