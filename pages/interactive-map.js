import { useEffect, useState } from 'react';
import { Dialog, Group, Button, TextInput, Text } from '@mantine/core';


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
            <iframe src="https://genshin-impact-map.appsample.com/" height="100%" width="100%"/>

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
