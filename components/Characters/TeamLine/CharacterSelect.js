
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
            var nameh = a.name;

            if (a.label == 'traveleranemo') {
                nameh += ' (Anemo)';
            }
            if (a.label == 'travelergeo') {
                nameh += ' (Geo)';
            }
            if (a.label == 'travelerelectro') {
                nameh += ' (Electro)';
            }
            if (a.label == 'travelerdendro') {
                nameh += ' (Dendro)';
            }
            charSelect.push({ value: a.label, label: nameh, group: a.element , image: a.images.namesideicon });
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
