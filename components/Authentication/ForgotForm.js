import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from '@mantine/core';
import {MailButton, GoogleButton, DiscordButton } from './SocialButtons/SocialButtons';

import { Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons';

import { IconCircleCheck } from '@tabler/icons';

import { useRouter } from 'next/router';

import { useState } from 'react';


import { signIn } from "next-auth/react"


export function ForgotForm({returnToLogin}) {
  
  const { pathname, asPath, query, locale } = useRouter();

  const [status, setStatus] = useState('');

  const sendLinkCb = async (email) => {
    const res = await fetch('/api/users/passwordResetStart', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          email: email,
          
      }),
    });
    
     res.status;

    if (res.status == 201){
      setStatus('ok');
    } else {
      setStatus((await res.json()).message);
    }

  }

  const form = useForm({
    initialValues: {
      email: '',
      
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      
    },
  });

  return (
    <Paper style={{width: '100%', height: '100%'}} radius="md"  >
      <form style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column'}} onSubmit={form.onSubmit(() => {sendLinkCb(form.values.email)})}>
      
      <Text size="lg" weight={500}>
      Restore password
      </Text>


      <Divider labelPosition="center" my="lg" />

      <TextInput
        required
        label="Email"
        placeholder="example@genshindb.net"
        value={form.values.email}
        onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
        error={form.errors.email && 'Invalid email'}
      />
      { (status) && ((status === 'ok') ?
      <Alert style={{marginTop: '20px'}} icon={<IconCircleCheck size={16} />} title="Success" color="green">
        A password reset link has been sent to your email.
      </Alert> :
      <Alert style={{marginTop: '20px'}} icon={<IconAlertCircle size={16} />} title="Bummer!" color="red">
        Something terrible happened! {status}
      </Alert>
      )
      }
      <div style={{ flex: '1 1 auto'}}/>

      <Group style={{flex: '0 1', width: '100%'}} position="apart" mt="xl">
        <Button onClick={returnToLogin}>Return</Button>
        <Button type="submit" data-disabled={(status == 'ok' ? true : undefined)} >Continue</Button>
      </Group>
        
      </form>
      
    </Paper>
  );
}