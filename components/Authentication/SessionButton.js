
import { useState } from 'react';
import { useSession } from 'next-auth/react';

import { getSession } from 'next-auth/react';
import { signOut } from "next-auth/react"
import { Button, LoadingOverlay, Modal } from '@mantine/core';

import { Menu } from '@mantine/core';

import { IconChevronDown } from '@tabler/icons';

import { Text } from '@mantine/core';
import { IconSettings, IconDoorExit, IconWriting } from '@tabler/icons';

import { useTranslation } from "next-i18next";
import Link from 'next/link';

import dynamic from 'next/dynamic'
import { Center } from '@mantine/core';
const ParentLoginForm = dynamic(() => import("./ParentLoginForm"), {
    loading: () => 'Loading...',
})

export function SessionButton({}) {
    const { data: session, status } = useSession()

    const { t } = useTranslation(['common']);
    const [opened, setOpened] = useState(false);


    return <>
        <div>






            {(status === 'authenticated') && <>
                <Menu shadow="md" width={200} trigger="hover" exitTransitionDuration={0}>

                    <Menu.Target>
                        <a>
                            <Center style={{ height: '100%', color: 'white' }}>
                                {session.user.name} <IconChevronDown size={15} stroke={1.5} />
                            </Center>
                        </a>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Label>{t('application')}</Menu.Label>
                        <Menu.Item icon={<IconWriting size={14} /> } component={Link} href='/internal/posts/list'>{t('myposts')}</Menu.Item>
                        
                        

                        <Menu.Divider />

                        <Menu.Item icon={<IconSettings size={14} />} component={Link} href='/internal/account'>{t('accountsettings')}</Menu.Item>
                        <Menu.Item color="red" icon={<IconDoorExit size={14} />} onClick={() => signOut()}>{t('logout')}</Menu.Item>
                    </Menu.Dropdown>


                </Menu>
            </>}





            {(status === 'unauthenticated') && <Button onClick={() => { setOpened(true) }}>
                {t('signin')}
            </Button>}



            <Modal
                size="400px"
                exitTransitionDuration={300}
                opened={opened}
                onClose={() => setOpened(false)}
            >

                <ParentLoginForm parentCloseCallback={() => { setOpened(false) }} />



            </Modal>
        </div>
    </>


}