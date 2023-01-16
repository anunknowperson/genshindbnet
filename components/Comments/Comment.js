import { createStyles, Text, Avatar, Group, Paper, Button } from '@mantine/core';
import { IconArrowDownLeft, IconArrowDownLeftCircle, IconArrowForward } from '@tabler/icons';
import { useState } from 'react';

import CommentInput from './CommentInput';

import { useTranslation } from "next-i18next";

const useStyles = createStyles((theme) => ({
  body: {
    paddingLeft: 20,
    paddingTop: theme.spacing.sm,
  },
}));


export default function Comment({ comment, trace, postId }) {
  const { classes } = useStyles();
  const { t } = useTranslation(['common']);
  const [reply, setReply] = useState(false);

  return (
    
    <Paper withBorder p={10} mb={10}>
      <Group position='apart'>
        <div>
          <Text  size="sm">{comment.name}</Text>
          <Text size="xs" color="dimmed">
            {comment.date}
          </Text>
        </div>

        <Button leftIcon={<IconArrowForward/>} onClick={() => setReply(!reply)}>
            {t('reply')}
        </Button>
      </Group>
      <Text className={classes.body} size="sm" mb={10}>
        {comment.text}
      </Text>

      {(reply) && <CommentInput postId={postId} trace={trace.concat(comment.id)} closeCallback={setReply} />}

      {comment.children != undefined && comment.children.map((el, val) => <Comment key={el.id} comment={el} trace={trace.concat(comment.id)} postId={postId}/>)}
    </Paper>
  );
}