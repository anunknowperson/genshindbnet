
import { useTranslation } from 'next-i18next';
import { Select } from '@mantine/core';

import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { forwardRef } from 'react';

import { Avatar } from '@mantine/core';

import { Text, Group } from '@mantine/core';

export function ArtifactsSelect({ selected, selectCallback }) {

    const { t } = useTranslation(['common']);

    const { locale } = useRouter();

    const fetchArtifacts = async (page, columnAccessor, direction, search, raritiesFilter) => {
        const res = await fetch(`/api/artifacts?lang=${locale}&page=${page}&recordsPerPage=${100}&columnAccessor=${columnAccessor}&direction=${direction}&search=${search}&rarities=${JSON.stringify(raritiesFilter)}`);

        const result = await res.json();

        const artSelect = [];

        for (const a of result.list) {
            artSelect.push({ value: a.label, label: a.name, group: a.rarities + ' Star', image: a.image });
        }

        return artSelect;
    };

    const { data, isFetching } = useQuery(
        ['artifacts', locale],
        async () => fetchArtifacts(1, 'name', 'asc', '', ['3', '4', '5']),
        { refetchOnWindowFocus: false }
    );

    const SelectItem = forwardRef  (
        ({ image, label, ...others }, ref) => (
            <div ref={ref} {...others}>
                <Group noWrap>
                    <Avatar src={"/resources/" + image} />

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
