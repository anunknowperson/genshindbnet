import { Button, Group, Paper, Textarea } from "@mantine/core";

import { useQueryClient } from "@tanstack/react-query";

import { useState } from "react";

import { useTranslation } from "next-i18next";
import { useSession } from 'next-auth/react';

import Date from 'dayjs';

export default function CommentInput({ postId, trace, closeCallback }) {
    const { data: session, status } = useSession();

    const { t } = useTranslation(['common']);
    const queryClient = useQueryClient()

    const [value, setValue] = useState('');

    const [lastComment, setLastComment] = useState(Date(1));

    return (
        <Paper mb={10} withBorder p={10}>
            <Textarea
                placeholder={t('your_comment')}
                label={t('your_comment')}
                withAsterisk

                autosize
                minRows={2}
                maxRows={6}

                value={value} onChange={(event) => setValue(event.currentTarget.value)}
            >

            </Textarea>

            <Group mt={10} position="apart">
                <div />
                <Button onClick={async () => {
                    if (Date().diff(lastComment, 'second') < 10){
                        alert('Please wait before posting new comment.');
                        return;
                    } 

                    setLastComment(Date());

                    const res = await fetch('/api/comments/addComment', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            postId: postId,
                            trace: trace,
                            text: value,
                            name: session.user.name,
                        }),
                    });

                    queryClient.invalidateQueries('likes')

                    if (closeCallback != undefined){
                        closeCallback();
                    }
                }}>{t('b_post')}</Button>
            </Group>
        </Paper>

    );
}