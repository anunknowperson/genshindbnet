
import { useTranslation } from 'next-i18next';
import { ActionIcon, Divider, Select } from '@mantine/core';

import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { forwardRef } from 'react';

import { Avatar } from '@mantine/core';

import { Text, Group } from '@mantine/core';

import { ArtifactsSelect } from './ArtifactsSelect';
import { Radio } from '@mantine/core';

import { ArtifactCharacterView } from './ArtifactCharacterView';
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

export function ArtifactsLine({ readOnly, id, removeCallback, changeCallback, type, twoP, fourP, comment }) {

    const { t } = useTranslation(['common']);

    const { locale } = useRouter();



    const setSel2 = (val) => {
        changeCallback(id, 'twoP', val);
    }

    const setSel4 = (val) => {
        changeCallback(id, 'fourP', val);

    }

    const setSelectedValue = (v) => {
        changeCallback(id, 'type', v);

    }

    const setComment = (val) => {
        changeCallback(id, 'comment', val);
    }



    return (
        <div style={{ width: '100%', marginBottom: '10px' }}>
            <ContentPanel>
                <div style={{ padding: '20px' }}>
                    {(readOnly != true) &&
                        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Radio.Group
                                value={type}
                                onChange={setSelectedValue}
                                name={"count" + id}


                                mb={10}
                            >
                                <Radio value="4x" label="4x" />
                                <Radio value="2x 2x" label="2x 2x" />

                            </Radio.Group>

                            <ActionIcon color="red" variant="light" onClick={() => { removeCallback(id) }}>
                                <IconMinus size={20} />
                            </ActionIcon>
                        </div>}


                    {(type == '4x') ?
                        <div>
                            {(readOnly != true) && <ArtifactsSelect selected={twoP} selectCallback={setSel2} />}
                            {(twoP != '') &&
                                <ArtifactCharacterView label={twoP} needF={true} />}
                        </div>
                        :
                        <div style={{ display: 'flex', gap: '5px' }}>
                            <div style={{ flex: '1' }}>
                                {(readOnly != true) && <ArtifactsSelect selected={twoP} selectCallback={setSel2} />}
                                {(twoP != '') &&
                                    <ArtifactCharacterView label={twoP} />}



                            </div>

                            <div style={{ flex: '1' }}>
                                {(readOnly != true) && <ArtifactsSelect selected={fourP} selectCallback={setSel4} />}
                                {(fourP != '') &&
                                    <ArtifactCharacterView label={fourP} />}
                            </div>
                        </div>
                    }
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
