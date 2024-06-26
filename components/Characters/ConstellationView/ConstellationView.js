
import { useTranslation } from 'next-i18next';

import { ContentPanel } from '../../ContentPanel/ContentPanel';

import { Center, Tabs } from '@mantine/core';
import Image from 'next/image';
import { Text, Paper } from '@mantine/core';
import { TextFormat } from '../../TextFormat/TextFormat';

import ReactMarkdown from 'react-markdown'
import { useViewportSize } from '@mantine/hooks';
import { useState } from 'react';
import { Slider } from '@mantine/core';

import { Textarea } from '@mantine/core';
import debounce from 'lodash.debounce';

import { Divider } from '@mantine/core';

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


export function ConstellationView({ readOnly, talent, image, nick, comment, commentCallback }) {

    const { height, width } = useViewportSize();
    const { t } = useTranslation(['common']);

    return (
        <div style={{ flex: '1', padding: '5px' }}>
            <ContentPanel>
                <div style={{ padding: '5px' }}>

                    <Center>
                        <Text pl={5} pr={5} ta={'center'} c={'white'} fz={18}>{talent.name}</Text>
                    </Center>
                    <Center>

                        <Image alt="passive talent" width={64} height={64} src={`/resources/${image.split('/')[image.split('/').length - 1]}`} />
                    </Center>

                    <div style={{ paddingLeft: '10px', paddingRight: '10px', whiteSpace: 'pre-wrap' }}>

                        <ReactMarkdown components={{

                            p: ({ node, ...props }) => {
                                return <p> {props.children.map((el, val) => {

                                    if (typeof el === 'string') {
                                        return <TextFormat key={val}>{el}</TextFormat>
                                    }

                                    return <span key={val}>{el}</span>;

                                })}</p>
                            }
                        }}>
                            {talent.effect}
                        </ReactMarkdown>


                    </div>


                    <Divider my="sm" />

                    {(readOnly != true) ?
                        <MyTextField changedCallback={(val) => { commentCallback(nick, val) }} value={comment} />
                        :
                        <div style={{padding: '5px', whiteSpace: 'pre-wrap'}}>
                            {comment}
                        </div>
                    }

                    <div style={{ marginBottom: '10px' }} />

                </div>

            </ContentPanel>
        </div>
    );
}
