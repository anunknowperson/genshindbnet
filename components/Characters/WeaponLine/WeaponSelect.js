
import { useTranslation } from 'next-i18next';
import { Select } from '@mantine/core';

import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { forwardRef } from 'react';

import { Avatar } from '@mantine/core';

import { Text, Group } from '@mantine/core';

export function WeaponSelect({ selected, selectCallback, weaponType }) {

    const { t } = useTranslation(['common']);

    const { locale } = useRouter();

    const fetchWeapons = async (page, columnAccessor, direction, search, raritiesFilter, typesFilter) => {
        const res = await fetch(`/api/weapons?lang=${locale}&page=${page}&recordsPerPage=${100}&columnAccessor=${columnAccessor}&direction=${direction}&search=${search}&rarities=${JSON.stringify(raritiesFilter)}&types=${JSON.stringify(typesFilter)}`);
        
        const result = await res.json();
    
        const weapSelect = [];

        for (const a of result.list) {
            weapSelect.push({ value: a.label, label: a.name, group: a.rarity + ' Star', image: a.images.icon });
        }

        return weapSelect;
      };

    const { data, isFetching } = useQuery(
        ['weapons', locale],
        async () => fetchWeapons(1, 'name', 'asc', '', ['3', '4', '5'], weaponType.toLowerCase()),
        { refetchOnWindowFocus: false }
    );

    const SelectItem = forwardRef  (
        ({ image, label, ...others }, ref) => (
            <div ref={ref} {...others}>
                <Group noWrap>
                    <Avatar src={"/resources/" + image + '.png'} />

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
