
import { useTranslation } from 'next-i18next';
import { ActionIcon, Divider, Select } from '@mantine/core';

import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { forwardRef } from 'react';

import { Avatar } from '@mantine/core';

import { Text, Group } from '@mantine/core';
import { WeaponSelect } from './WeaponSelect';
import { Radio } from '@mantine/core';
import { WeaponCharacterView } from './WeaponCharacterView';
import { Textarea } from '@mantine/core';
import { ContentPanel } from '../../ContentPanel/ContentPanel';
import { IconMinus } from '@tabler/icons';

import debounce from 'lodash.debounce';

import { useCallback } from 'react';

const MyTextField = ({ value, changedCallback }) => {
    const [txt, setTxt] = useState(value);

    const debouncedFilter = useCallback(debounce(query =>
        changedCallback(query), 300), []
    )

    const textChanged = (val) => {
        setTxt(val);



        debouncedFilter(val);

    }

    return <Textarea
        mt={10}
        placeholder="Your comment"
        value={txt}
        onChange={(event) => textChanged(event.currentTarget.value)}
        autosize
    />;
}

export function WeaponLine({ readOnly, id, removeCallback, changeCallback, selected, comment, weaponType }) {

    const { t } = useTranslation(['common']);

    const { locale } = useRouter();


    const setSelectedValue = (v) => {
        changeCallback(id, 'selected', v);

    }

    const setComment = (v) => {
        changeCallback(id, 'comment', v);
    }



    return (
        <div style={{ width: '100%', marginBottom: '10px' }}>
            <ContentPanel>
                <div style={{ padding: '20px' }}>
                    {(readOnly != true) &&
                        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                            <WeaponSelect selected={selected} selectCallback={setSelectedValue} weaponType={weaponType} />

                            <ActionIcon color="red" variant="light" onClick={() => { removeCallback(id) }}>
                                <IconMinus size={20} />
                            </ActionIcon>
                        </div>}


                    <div>

                        {(selected != '') &&
                            <WeaponCharacterView label={selected} />}
                    </div>

                    <Divider mt={10} mb={10} />

                    {(readOnly != true) ?
                        <MyTextField changedCallback={setComment} value={comment} />
                        :
                        <div>
                            {comment}
                        </div>
                    }

                </div>
            </ContentPanel>
        </div>
    );
}
