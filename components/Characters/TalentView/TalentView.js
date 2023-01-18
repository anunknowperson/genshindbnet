
import useStyles from './TalentView.styles';

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

export function TalentView({ readOnly, talent, image, nick, comment, commentCallback }) {
    const { classes } = useStyles();

    const { height, width } = useViewportSize();
    const { t } = useTranslation(['common']);

    const [level, setLevel] = useState(9);

    var sliderMarks = [];

    for (var i = 0; i <= 14; i += 1) {
        sliderMarks.push({ value: i, label: (i + 1).toString() });
    }

    const formatParam = (str) => {
        return str.replace(/{(.*?)}/g, (match, offset) => {
            var param = match.split(':')[0].substring(1);

            var val = talent.attributes.parameters[param][level];


            if (match.split(':')[1].includes('P')) {
                val = Math.round(val * 1000) / 10;

                val += '%';
            } else {
                val = Math.round(val * 10) / 10;
            }


            return val;
        });
    }

    return (
        <div style={{ flex: '1', paddingLeft: '5px', paddingRight: '5px' }}>
            <ContentPanel>
                <div style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                    <Tabs defaultValue="description">
                        <Tabs.List>
                            <Tabs.Tab value="description">{t('description')}</Tabs.Tab>
                            <Tabs.Tab value="attributes">{t('attributes')}</Tabs.Tab>
                        </Tabs.List>

                        <Tabs.Panel value="description" pt="xs">
                            <Center>
                                <Text pl={5} pr={5} ta={'center'} c={'white'} fz={18}>{talent.name}</Text>
                            </Center>
                            <Center>

                                <Image alt="Talent" width={64} height={64} src={`/resources/${image}.png`} />
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
                                    {talent.info}
                                </ReactMarkdown>


                            </div>



                            <Text mt={20} mb={10} fs="italic" ta="center">
                                {talent.description}
                            </Text>





                        </Tabs.Panel>

                        <Tabs.Panel value="attributes" pt="xs">
                            <div style={{ padding: '20px 20px 30px 20px', width: '100%' }}>
                                <Slider

                                    value={level} onChange={setLevel}
                                    max={14} label={null} />
                            </div>

                            <div>

                            </div>

                            <div style={{ width: '100%', flexDirection: 'column', paddingLeft: '20px', paddingRight: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>
                                        Level
                                    </div>
                                    <div>
                                        <Text c='white'>{level + 1}</Text>
                                    </div>
                                </div>
                                {talent.attributes.labels.map((el, val) => {
                                    return <div key={val} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div>
                                            {el.split('|')[0]}
                                        </div>
                                        <div>
                                            <Text c='white'>{formatParam(el.split('|')[1])}</Text>
                                        </div>
                                    </div>
                                })}



                            </div>
                        </Tabs.Panel>
                    </Tabs>


                    {(readOnly != true) ?
                        <MyTextField changedCallback={(val) => { commentCallback(nick, val) }} value={comment} />
                        :
                        <div>
                            {comment}
                        </div>
                    }

                    

                    <div style={{ marginBottom: '10px' }} />
                </div>

            </ContentPanel>
        </div>
    );
}
