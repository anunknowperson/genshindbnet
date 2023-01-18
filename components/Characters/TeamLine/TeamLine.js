
import { useTranslation } from 'next-i18next';
import { ActionIcon, Divider, Select } from '@mantine/core';

import { useRouter } from 'next/router';
import { useState } from 'react';
import { Textarea } from '@mantine/core';
import { ContentPanel } from '../../ContentPanel/ContentPanel';
import { IconMinus } from '@tabler/icons';

import { CharacterSelect } from './CharacterSelect';

import debounce from 'lodash.debounce';

import { useCallback } from 'react';

import { CharacterCardView } from './CharacterCardView';

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

export function TeamLine({ readOnly, id, removeCallback, changeCallback, selected1, selected2, selected3, selected4, comment }) {

    const { t } = useTranslation(['common']);

    const { locale } = useRouter();


    const setSelected1Value = (v) => {
        changeCallback(id, 'c1', v);

    }
    const setSelected2Value = (v) => {
        changeCallback(id, 'c2', v);

    }
    const setSelected3Value = (v) => {
        changeCallback(id, 'c3', v);

    }
    const setSelected4Value = (v) => {
        changeCallback(id, 'c4', v);

    }

    const setComment = (v) => {
        changeCallback(id, 'comment', v);
    }



    return (
        <div style={{ width: '100%', marginBottom: '10px' }}>
            <ContentPanel>
                <div style={{ padding: '20px' }}>
                    {(readOnly != true) && <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>


                        <CharacterSelect selected={selected1} selectCallback={setSelected1Value} />
                        <CharacterSelect selected={selected2} selectCallback={setSelected2Value} />
                        <CharacterSelect selected={selected3} selectCallback={setSelected3Value} />
                        <CharacterSelect selected={selected4} selectCallback={setSelected4Value} />

                        <ActionIcon color="red" variant="light" onClick={() => { removeCallback(id) }}>
                            <IconMinus size={20} />
                        </ActionIcon>

                    </div>
                    }

                    <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around', alignItems: 'center' }}>

                        {(selected1 !== '') &&
                            <CharacterCardView label={selected1} />}
                        {(selected2 !== '') &&
                            <CharacterCardView label={selected2} />}
                        {(selected3 !== '') &&
                            <CharacterCardView label={selected3} />}
                        {(selected4 !== '') &&
                            <CharacterCardView label={selected4} />}

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
