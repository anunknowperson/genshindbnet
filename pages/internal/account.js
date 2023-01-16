import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
    Input,
} from '@mantine/core';


import { Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons';

import { IconCircleCheck } from '@tabler/icons';

import { useState } from 'react';

import Router, { useRouter } from 'next/router';

import { useSession } from 'next-auth/react';
import Head from 'next/head';

export default function Account() {
    const [status, setStatus] = useState({ ok: false, text: '' });

    const [name, setName] = useState('');
    const { data: session } = useSession()
    const router = useRouter();
    const { pathname, asPath, query, locale } = router;


    const processChange = async () => {

        if (name.length > 30) {
            alert('Nickname is too long');
            return;
        }

        const res = await fetch('/api/users/setNickname', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uid: session.user.uid,
                newNickname: name,
            }),
        });

        if (res.status == 201) {
            setStatus({ ok: true, text: 'Nickname has been successfully changed.' })

            const delay = ms => new Promise(res => setTimeout(res, ms));
            await delay(1000);

            router.push('/');

            return;
        } else {
            setStatus({ ok: false, text: (await res.json()).message })

            return;
        }

    }

    return (
        <div style={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Head>
                <title>Account settings</title>
            </Head>

            <Container style={{ width: '420px' }} size={420} my={40}>
                <Title
                    align="center"
                    sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
                >
                    Account settings
                </Title>


                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <TextInput placeholder="Your nickname"
                        label="Nickname"
                        withAsterisk value={name} onChange={(event) => setName(event.currentTarget.value)} />


                    {(status.text !== '') && ((status.ok) ?
                        <Alert style={{ marginTop: '20px' }} icon={<IconCircleCheck size={16} />} title="Success" color="green">
                            {status.text}
                        </Alert> :
                        <Alert style={{ marginTop: '20px' }} icon={<IconAlertCircle size={16} />} title="Bummer!" color="red">
                            {status.text}
                        </Alert>
                    )
                    }

                    <Button mb={10} fullWidth mt="xl" onClick={processChange}>
                        Change nickname
                    </Button>
                    <div>
                        P.S. This is page heavily WIP!!! (but nickname change works) Stay tuned! ~Admin
                    </div>
                    <div>
                        P.P.S. If nickname doesn't changed immediately, please relogin
                    </div>
                </Paper>
            </Container>
        </div>
    );
}