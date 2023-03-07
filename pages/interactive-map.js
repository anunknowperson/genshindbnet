import { useEffect, useState } from 'react';
import { Dialog, Group, Button, TextInput, Text } from '@mantine/core';
import Head from 'next/head'

import useStyles from '../components/Characters/views.styles';

import Link from 'next/link';

export default function InteractiveMap({ }) {
    const [opened, setOpened] = useState(true);

    useEffect(() => {
        const timeId = setTimeout(() => {
            // After 3 seconds set the show value to false
            setOpened(false)
        }, 5000)

        return () => {
            clearTimeout(timeId)
        }
    }, []);

    const { classes } = useStyles();

    return (
        <div style={{ height: '100vh' }}>
            <Head>
                <title>Interactive Map - Genshin Impact Guides & Database</title>
                <meta name="description" content="The interactive world map will help you find items in Genshin Impact." />
                <link rel="canonical" href="https://genshindb.net/interactive-map/" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="article" />
                <meta property="og:title" content="Interactive Map - Genshin Impact Guides &amp; Database" />
                <meta property="og:description" content="The interactive world map will help you find items in Genshin Impact." />
                <meta property="og:url" content="https://genshindb.net/interactive-map/" />
                <meta property="og:site_name" content="Genshin Impact Guides &amp; Database" />
                <meta property="article:modified_time" content="2023-02-05T06:53:43+00:00" />

            </Head>

            <iframe src="https://genshin-impact-map.appsample.com/" height="100%" width="100%" />

            <Dialog
                opened={opened}
                withCloseButton
                onClose={() => setOpened(false)}
                size="lg"
                radius="md"
            >
                <Text size="sm" style={{ marginBottom: 10 }} weight={500}>
                    Reminder: this map is just a convenient mirror of another project and does not belong to us.
                </Text>

                <Group position="center" grow>
                    <Link className={classes.link} href="/">To our main page</Link>
                    <Link className={classes.link} href="https://genshin-impact-map.appsample.com/">To map main page</Link>
                </Group>
            </Dialog>
        </div>


    );
}
