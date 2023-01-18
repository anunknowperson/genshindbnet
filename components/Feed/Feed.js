
import { useQuery } from "@tanstack/react-query";

import { useSession } from 'next-auth/react';

import { Paper } from "@mantine/core";

import { createStyles } from '@mantine/core';

import { Text } from "@mantine/core";
import Link from "next/link";
import { useTranslation } from "next-i18next";

const useStyles = createStyles((theme, _params, getRef) => ({
    link: {
        '&:visited': {
            color: theme.colors.dark[0],
        },
        '&:hover': {
            color: 'gray',
        },

        color: theme.colors.dark[0],
    },
}));

export default function Feed({ type }) {

    const { t } = useTranslation(['common', 'index']);
    const { classes } = useStyles();

    const fetchFeed = async () => {

        var res = await fetch(`/api/getFeed?type=${type}`);

        const result = await res.json();

        return result;
    };

    const { data, isFetching } = useQuery(
        ['feed ' + type],
        async () => fetchFeed(),
        { refetchOnWindowFocus: false }
    );

    return (
        <div style={{ padding: '20px', width: '350px', minHeight: '280px' }}>
            <Paper style={{ width: '100%', height: '100%' }} withBorder>
                <div style={{ padding: '1px 20px 1px 20px' }}>
                    <h2>{(type === 'official') && t("i_official", { ns: 'index' }) }</h2>
                    <h2>{(type === 'character') && t("i_character", { ns: 'index' })}</h2>
                    <h2>{(type === 'tutorial') && t("i_tutorials", { ns: 'index' })}</h2>

                    <div>
                        {(data != undefined) && data.map((el, val) => <div key={val}>
                            <Text fs="italic" fz={13}>
                                {t("by") + ' ' + el.createdBy + ':'}
                            </Text>

                            <Link href={'/posts/' + el.id} legacyBehavior>
                                <a className={classes.link}>
                                    {el.name}
                                </a>
                            </Link>


                        </div>)}
                    </div>
                </div>


            </Paper>


        </div>

    );
}