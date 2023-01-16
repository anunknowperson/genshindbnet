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
} from '@mantine/core';


import { Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons';

import { IconCircleCheck } from '@tabler/icons';

import { useState } from 'react';

import Router, { useRouter } from 'next/router';
import Head from 'next/head';

export default function PasswordResetConfirmPage() {
    const [status, setStatus] = useState({ ok: false, text: '' });

    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    const router = useRouter();
    const { pathname, asPath, query, locale } = router;


    const processReset = async () => {
        if (password1.length <= 6) {
            setStatus({ ok: false, text: 'Password should include at least 6 characters.' })

            return;
        }

        if (password1 !== password2) {
            setStatus({ ok: false, text: 'Passwords do not match.' })

            return;
        }

        const res = await fetch('/api/users/passwordResetConfirm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uid: query['uid'],
                secret: query['secret'],
                newPassword: password1,
            }),
        });

        if (res.status == 201) {
            setStatus({ ok: true, text: 'Password has been successfully changed.' })

            const delay = ms => new Promise(res => setTimeout(res, ms));
            await delay(1000);

            router.push('/login');

            return;
        } else {
            setStatus({ ok: false, text: (await res.json()).message })

            return;
        }


    }

    return (
        <div style={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Head>
                <title>Reset password</title>
            </Head>

            <Container style={{ width: '420px' }} size={420} my={40}>
                <Title
                    align="center"
                    sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
                >
                    Welcome back!
                </Title>


                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <PasswordInput value={password1} onChange={(event) => setPassword1(event.currentTarget.value)} label="New password" placeholder="Your new password" required mt="md" />
                    <PasswordInput value={password2} onChange={(event) => setPassword2(event.currentTarget.value)} label="Confirm new password" placeholder="Your new password" required mt="md" />

                    {(status.text !== '') && ((status.ok) ?
                        <Alert style={{ marginTop: '20px' }} icon={<IconCircleCheck size={16} />} title="Success" color="green">
                            {status.text}
                        </Alert> :
                        <Alert style={{ marginTop: '20px' }} icon={<IconAlertCircle size={16} />} title="Bummer!" color="red">
                            {status.text}
                        </Alert>
                    )
                    }

                    <Button fullWidth mt="xl" onClick={processReset}>
                        Reset password!
                    </Button>


                </Paper>
            </Container>
        </div>
    );
}