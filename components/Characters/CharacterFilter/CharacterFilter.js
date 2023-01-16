
import { useTranslation } from 'next-i18next';

import { getRarityImage } from '../../../helpers/gradients';

import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { Loader, Text } from '@mantine/core';
import { useState } from 'react';

import { Paper } from '@mantine/core';

function CharacterButton({ el }) {
    return <div style={{ position: 'relative' }}>
        <Image alt={'Selected ' + el.label} width={75} height={75} src={'/resources/' + el.image + '.png'} />
        {[...Array(el.rarity)].map((el2, val2) =>
            <div key={val2} style={{ position: 'absolute', top: '60px', left: (((el.rarity == 5) ? 13 : 20) + val2 * 10) + 'px' }}>
                <Image style={{}} alt={'Rarity'} width={12} height={12} src={'/star.svg'} />
            </div>
        )}
        <div style={{ position: 'absolute', top: '15px', left: '10px' }}>
            <Image style={{}} alt={'Element'} width={20} height={20} src={`/${el.element.toLowerCase()}.png`} />
        </div>
    </div>
}

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
                        <Paper key={el.value} shadow="xs" withBorder>
                            <CharacterButton  el={el} />
                        </Paper>
                        :
                        <div key={el.value} onClick={() => { selectCharacter(el.value) }}>
                            <CharacterButton  el={el} />

                        </div>

                }
                )
            }
        </div>
    );
}
