
import { useTranslation } from 'next-i18next';

import { getRarityImage } from '../../../helpers/gradients';

import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { Loader, Text } from '@mantine/core';
import { useState } from 'react';

import { Paper } from '@mantine/core';

export function CharacterFilter({ selectionChanged, elements, weapons, rarities }) {

    const { t } = useTranslation(['common']);

    const [selected, setSelected] = useState('');


    const { locale } = useRouter();

    const selectCharacter = (val) => {
        setSelected(val);
        selectionChanged(val);
    }

    const fetchCharacters = async (search) => {
        const res = await fetch(`/api/characters?lang=${locale}&search=${search}`);

        const result = await res.json();

        const charSelect = [];

        for (const a of result.list) {
            charSelect.push({ value: a.label, label: a.name, rarity: a.rarity, weapontype: a.weapontype, element: a.element, image: a.images.namesideicon });
        }

        console.log(charSelect)

        return charSelect;
    };

    const { data, isFetching } = useQuery(
        ['characters', locale],
        async () => fetchCharacters(''),
        { refetchOnWindowFocus: false }
    );

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
            {(isFetching) ? <Loader />

                :

                data.map((el, val) => {
                    if (!rarities.includes('' + el.rarity)) {
                        return;
                    }

                    if (!elements.includes('' + el.element.toLowerCase())) {
                        return;
                    }

                    if (!weapons.includes('' + el.weapontype.toLowerCase())) {
                        return;
                    }

                    return (selected == el.value) ?
                        <Paper shadow="xs" withBorder>
                            <Image width={75} height={75} src={'/resources/' + el.image + '.png'} />
                        </Paper>
                        :
                        <Image onClick={() => { selectCharacter(el.value) }} width={75} height={75} src={'/resources/' + el.image + '.png'} />

                }
                )
            }
        </div>
    );
}
