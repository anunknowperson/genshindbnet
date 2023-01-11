
import { useTranslation } from 'next-i18next';
import { Select } from '@mantine/core';

import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { forwardRef } from 'react';

import { Avatar } from '@mantine/core';

import { Text, Group } from '@mantine/core';

export function CharacterSelect({ selected, selectCallback }) {

    const { t } = useTranslation(['common']);

    const { locale } = useRouter();

    const fetchCharacters = async (search) => {
        const res = await fetch(`/api/characters?lang=${locale}&search=${search}`);

        const result = await res.json();

        const charSelect = [];

        for (const a of result.list) {
            charSelect.push({ value: a.label, label: a.name, group: a.rarity + ' Star', image: a.images.namesideicon });
        }

        return charSelect;
    };

    const { data, isFetching } = useQuery(
        ['characters', locale],
        async () => fetchCharacters(''),
        { refetchOnWindowFocus: false }
    );

    const SelectItem = forwardRef  (
        ({ image, label, ...others }, ref) => (
            <div ref={ref} {...others}>
                <Group noWrap>
                    <Avatar  src={"/resources/" + image + '.png'} />

                    <div>
                        <Text size="sm">{label}</Text>
                        
                    </div>
                </Group>
            </div>
        )
    );

    return (
        <div style={{ display: 'flex', width: '100%'}}>
            
                <Select
                    placeholder="Pick one"
                    searchable
                    value={selected}
                    data={(isFetching) ? [] : data}
                    onChange={selectCallback}
                    itemComponent={SelectItem}
                />
            

        </div>
    );
}
