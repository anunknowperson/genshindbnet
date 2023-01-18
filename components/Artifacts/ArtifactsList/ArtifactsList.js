import useStyles from './ArtifactsList.styles';


import { useTranslation } from 'next-i18next';

import { Box, useMantineTheme } from '@mantine/core';

import { useQuery } from '@tanstack/react-query';

import { DataTable} from 'mantine-datatable';
import { useState, useEffect } from 'react';

import { TextFormat } from '../../TextFormat/TextFormat';


import Link from 'next/link';
import Image from "next/image"
import { useRouter } from 'next/router';

export function ArtifactsList({searchFilter, rarityFilter}) {
  const recordsPerPage = 50;

  const {classes} = useStyles();

  const { t } = useTranslation(['common', 'artifacts']);

  const [page, setPage] = useState(1);
  const [sortStatus, setSortStatus] = useState({ columnAccessor: 'name', direction: 'asc' });

  const router = useRouter();

  const { locale } = useRouter();

  const handleSortStatusChange = (status) => {
    setPage(1);
    setSortStatus(status);
  };

  useEffect(() => {
    setPage(1);
  }, [searchFilter, rarityFilter]);

  const fetchArtifacts = async (page, columnAccessor, direction, search, raritiesFilter) => {
    const res = await fetch(`/api/artifacts?lang=${locale}&page=${page}&recordsPerPage=${recordsPerPage}&columnAccessor=${columnAccessor}&direction=${direction}&search=${search}&rarities=${JSON.stringify(raritiesFilter)}`);

    const result = await res.json();

    return {total: result.total, artifacts: result.list};
  };

  const { data, isFetching } = useQuery(
    ['artifacts', page, sortStatus, searchFilter, rarityFilter, locale],
    async () => fetchArtifacts(page, sortStatus.columnAccessor, sortStatus.direction, searchFilter, rarityFilter),
    { refetchOnWindowFocus: false }
  );

  const {
    breakpoints: { xs: xsBreakpoint },
    colors
  } = useMantineTheme();

  
  const changePage = (id) => {
    setPage(id);

    window.scrollTo(0, 0) 

    
  }

  return (
    
    
    <Box>

      <DataTable
        height={(data?.total == 0) ? 800 : undefined}

        sx={{ '& tbody tr td': { verticalAlign: 'middle' },  '& thead tr th div': { textAlign: 'left' }, '& tbody tr' : {'&:hover': {backgroundColor: colors.dark[6]}, transition: 'background-color 1s'}}}

        borderRadius="sm"
        
        verticalAlignment="top"
        fetching={isFetching}
        columns={[
          {
            accessor: 'name',
            title: t("a_name", { ns: 'artifacts' }),
            width: 140,
            textAlignment : 'center',

            sortable: true,
            render: ({label, name, image }) => <>
            
              <Image
                priority="true"
                src={"/resources/" + image}
                alt={ label + ""}
                width={50}
                height={50}

              />

              <br/>
              <Link  href={'/artifacts/' + label} legacyBehavior>
                <a  className={classes.link}>
                  {name}
                </a>
              </Link>

            </>,
          },
          {
            accessor: 'rarities',
            title: t("a_rarities", { ns: 'artifacts' }),
            width: 140,
            textAlignment : 'center',

            sortable: true,
            render: ({rarities}) => <>{
                rarities.sort().reverse().map((rarity) => (
                    <li key={rarity} className={classes.li}>
                    {[...Array(rarity)].map((e, i) =>
                    <Image
                        key={i}
                        priority="true"
                        src={"/star.svg"}
                        alt={ ""}
                        width={15}
                        height={15}
                        
                    />
                    
                    )}
                    </li>

                ))}
            </>,
          },
          {
            accessor: 'twoPiecesBonus',
            title: t("a_twoPiecesBonus", { ns: 'artifacts' }),
            width: 200,
            textAlignment : 'center',

            sortable: true,
            render: ({twoPiecesBonus}) => <TextFormat>{twoPiecesBonus}</TextFormat>,
          },
          {
            accessor: 'fourPiecesBonus',
            title: t("a_fourPiecesBonus", { ns: 'artifacts' }),
            width: 500,
            textAlignment : 'center',

            sortable: true,
            render: ({fourPiecesBonus}) => <TextFormat>{fourPiecesBonus}</TextFormat>,
          },
        ]}
        records={data?.artifacts}
        page={page}
        onPageChange={changePage}
        totalRecords={data?.total}
        recordsPerPage={recordsPerPage}
        sortStatus={sortStatus}
        onSortStatusChange={handleSortStatusChange}

        idAccessor="label"

        classNames={classes}
        
        onRowClick={(value, rowIndex) => {
          router.push(`/artifacts/${data?.artifacts[rowIndex]['label']}`);
        }}
      />
    </Box>
  );
}
