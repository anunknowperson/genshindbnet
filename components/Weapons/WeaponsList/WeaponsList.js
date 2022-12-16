import useStyles from './WeaponsList.styles';


import { useTranslation } from 'next-i18next';

import { Box, useMantineTheme } from '@mantine/core';

import { useQuery } from '@tanstack/react-query';

import { DataTable} from 'mantine-datatable';
import { useState, useEffect } from 'react';

import { TextFormat } from '../../TextFormat/TextFormat';


import Link from 'next/link';
import Image from "next/image"
import { useRouter } from 'next/router';

export function WeaponsList({searchFilter, rarityFilter, typeFilter}) {
  const recordsPerPage = 50;

  const {classes} = useStyles();

  const { t } = useTranslation(['common', 'weapons']);

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
  }, [searchFilter, rarityFilter, typeFilter]);

  const fetchWeapons = async (page, columnAccessor, direction, search, raritiesFilter, typesFilter) => {
    const res = await fetch(`/api/weapons?lang=${locale}&page=${page}&recordsPerPage=${recordsPerPage}&columnAccessor=${columnAccessor}&direction=${direction}&search=${search}&rarities=${JSON.stringify(raritiesFilter)}&types=${JSON.stringify(typesFilter)}`);

    const result = await res.json();

    return {total: result.total, weapons: result.list};
  };

  const { data, isFetching } = useQuery(
    ['weapons', page, sortStatus, searchFilter, rarityFilter, typeFilter, locale],
    async () => fetchWeapons(page, sortStatus.columnAccessor, sortStatus.direction, searchFilter, rarityFilter, typeFilter),
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
            title: t("w_name", { ns: 'weapons' }),
            width: 100,
            textAlignment : 'center',

            sortable: true,
            render: ({label, name, images }) => <>
            
              <Image
                priority="true"
                src={"/resources/" + images['icon'] + '.png'}
                alt={ label + ""}
                width={50}
                height={50}

              />

              <br/>
              <Link  href={'/weapons/' + label} legacyBehavior>
                <a  className={classes.link}>
                  {name}
                </a>
              </Link>

            </>,
          },
          {
            accessor: 'rarity',
            title: t("w_rarity", { ns: 'weapons' }),
            width: 100,
            textAlignment : 'center',
            sortable: true,

            render: ({rarity }) => <>
            
            {rarity}
            <Image
                    priority="true"
                    src={"/star.svg"}
                    alt={ ""}
                    width={15}
                    height={15}
                    
                />

            </>
          },
          {
            accessor: 'effect',
            title: t("w_effect", { ns: 'weapons' }),
            width: 500,
            textAlignment : 'center',
            sortable: true,
            
            render: ({ effect, r1, r5 }) => (() => {
              var eff = effect;

              String.prototype.splitAndKeep = function(separator){
                  var str = this;
            
                  str = str.split(new RegExp(`(${separator})`, 'g'));
            
                  return str;
                };
            
                var filter = '';
            
                var toReplace = [];
            
                for (var i = 0; i < r1.length; i++){
                  toReplace.push(`{${i}}`);
            
                  filter += `\\{${i}\\}`;
            
                  if (i != r1.length -1) {
                    filter += '|';
                  }
                  
                } 
            
            
                const format = (str) => {
                    var res = str.splitAndKeep(filter);
            
                    for (var i = 0; i < res.length; i++){
                        if (toReplace.includes(res[i])){
                          res[i] = <span key={i} style={{color: 'lightblue'}}>{`${r1[parseInt(res[i][1])]} ~ ${r5[parseInt(res[i][1])]}`}</span> ;
                        } else {
                          res[i] = <TextFormat  key={i}>{res[i]}</TextFormat>
                        }
                    }
            
                    return res;
            
                }
            
                eff = format(eff);

                return eff;
          })()
          },
        ]}
        records={data?.weapons}
        page={page}
        onPageChange={changePage}
        totalRecords={data?.total}
        recordsPerPage={recordsPerPage}
        sortStatus={sortStatus}
        onSortStatusChange={handleSortStatusChange}

        idAccessor="label"

        classNames={classes}

        onRowClick={(value, rowIndex) => {
          router.push(`/weapons/${data?.weapons[rowIndex]['label']}`);
        }}
        
      />
    </Box>
  );
}
