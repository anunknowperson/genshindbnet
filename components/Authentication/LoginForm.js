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
import { MailButton, GoogleButton, DiscordButton } from './SocialButtons/SocialButtons';

import { Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons';

import { IconCircleCheck } from '@tabler/icons';

import { useRouter } from 'next/router';
import { signIn } from "next-auth/react"

import { useTranslation } from "next-i18next";
import { useState } from 'react';

import { useEffect, useMemo } from 'react';

export function LoginForm({ passwordlessCallback, passwordForgotCallback, closeCallback }) {
  const [type, toggle] = useToggle(['login', 'register']);

  const { pathname, asPath, query, locale } = useRouter();

  const { t } = useTranslation(['common']);
  const [status, setStatus] = useState({ ok: false, text: '' });

  const confirmMemo = useMemo(
    () => {
      if (query['afterConfirm'] === 'yes') {
        setStatus({ ok: true, text: t('emailconfirmed') });
      }
    },
    []
  );


  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : t('invalidemail')),
      password: (val) => (val.length < 6 ? t('password6') : null),
    },
  });


  const tryRegisterUser = async (name, email, password) => {

    const res = await fetch('/api/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
        redirect: asPath,
      }),
    });

    return res.status;

  }

  const submit = async (type, name, email, password) => {
    if (type === 'register') {

      var registerResult = await tryRegisterUser(name, email, password);

      if (registerResult == 201) {
        setStatus({ ok: true, text: t('linksent') + ' (Please check spam/junk folders)' });
      } else if (registerResult == 422) {
        setStatus({ ok: false, text: t('emailused') });
      } else {
        setStatus({ ok: false, text: t('fail') });
      }

    } else if (type === 'login') {
      var result = await signIn('credentials', { redirect: false, email: email, password: password })


      if (result.error == null) {
        setStatus({ ok: true, text: t('welcomeback') });

        const delay = ms => new Promise(res => setTimeout(res, ms));
        await delay(1000);

        closeCallback();
      } else {
        setStatus({ ok: false, text: result.error });
      }
    }

  }

  const forgot = () => {
    passwordForgotCallback();
  }

  return (
    <Paper radius="md" >
      <Text size="lg" weight={500}>
        {t('welcometoour')}
      </Text>
      {/*
      <Group grow mb="md" mt="md">
        <MailButton onClick={passwordlessCallback} radius="xl">Paswordless e-mail</MailButton>
      </Group>

      
      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
        <DiscordButton radius="xl">Discord</DiscordButton>
  </Group>*/}

      <Divider labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(() => { submit(type, form.values.name, form.values.email, form.values.password) })}>
        <Stack>
          {type === 'register' && (
            <TextInput
              required
              label={t('visiblename')}
              placeholder={t('visiblename')}
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="example@genshindb.net"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && t("invalidemail")}
          />

          <PasswordInput
            required
            label={t('password')}
            placeholder={t('yourpassword')}
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && t('password6')}
          />

          {(status.text !== '') && ((status.ok) ?
            <Alert style={{ marginTop: '20px' }} icon={<IconCircleCheck size={16} />} title="Success" color="green">
              {status.text}
            </Alert> :
            <Alert style={{ marginTop: '20px' }} icon={<IconAlertCircle size={16} />} title="Bummer!" color="red">
              {status.text}
            </Alert>
          )
          }

        </Stack>

        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === 'register'
              ? t('alreadyaccount')
              : t('noaccount')}
          </Anchor>
          {type === 'login' &&
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => forgot()}
              size="xs"
            >
              {t('forgotpassword')}
            </Anchor>
          }

        </Group>

        <Button style={{ width: '100%' }} position="apart" mt="xl" type="submit">{t(type)}</Button>
      </form>
    </Paper>
  );
}