import Comment from "./Comment";
import CommentInput from "./CommentInput";

import { useQuery } from "@tanstack/react-query";

import { useSession } from 'next-auth/react';

import { Center } from "@mantine/core";

export default function Comments({ postId }) {
    const { data: session, status } = useSession();

    const fetchComments = async () => {

        var res = await fetch(`/api/comments/getComments?postId=${postId}`);

        const result = await res.json();

        return result;
    };

    const { data, isFetching } = useQuery(
        ['comments'],
        async () => fetchComments(),
        { refetchOnWindowFocus: false }
    );

    return (
        <>
            {(session != null) ?
                <CommentInput postId={postId} trace={[]} />
                :
                <Center mt={10} mb={10}>Please login first</Center>}

            {(data != undefined) &&
                data.map((el, val) => <Comment key={el.id} comment={el} trace={[]} postId={postId} />)
            }

        </>

    );
}