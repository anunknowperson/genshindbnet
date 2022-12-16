import useStyles from './MaterialsList.styles';


import { useTranslation } from 'next-i18next';

import { Box, useMantineTheme } from '@mantine/core';

import { useQuery } from '@tanstack/react-query';

import { DataTable} from 'mantine-datatable';
import { useState, useEffect } from 'react';

import { TextFormat } from '../../TextFormat/TextFormat';

import { MaterialsListElement } from '../MaterialsListElement/MaterialsListElement';

import Link from 'next/link';
import Image from "next/image"
import { useRouter } from 'next/router';

import { Pagination, Group, Loader } from '@mantine/core';

export function MaterialsList({searchFilter, rarityFilter, typeFilter}) {
  const recordsPerPage = 100;

  const {classes} = useStyles();

  const { t } = useTranslation(['common', 'weapons']);

  const [page, setPage] = useState(1);
  const [sortStatus, setSortStatus] = useState({ columnAccessor: 'name', direction: 'asc' });

  const { locale } = useRouter();

  const handleSortStatusChange = (status) => {
    setPage(1);
    setSortStatus(status);
  };

  useEffect(() => {
    setPage(1);
  }, [searchFilter, rarityFilter, typeFilter]);

  const fetchMaterials = async (page, columnAccessor, direction, search, raritiesFilter, typesFilter) => {
    const res = await fetch(`/api/materials?lang=${locale}&page=${page}&recordsPerPage=${recordsPerPage}&columnAccessor=${columnAccessor}&direction=${direction}&search=${search}&rarities=${JSON.stringify(raritiesFilter)}&types=${JSON.stringify(typesFilter)}`);

    const result = await res.json();

    return {total: result.total, materials: result.list};
  };

  const { data, isFetching } = useQuery(
    ['materials', page, sortStatus, searchFilter, rarityFilter, typeFilter, locale],
    async () => fetchMaterials(page, sortStatus.columnAccessor, sortStatus.direction, searchFilter, rarityFilter, typeFilter),
    { refetchOnWindowFocus: false }
  );

  const {
    breakpoints: { xs: xsBreakpoint },
  } = useMantineTheme();

  
  const changePage = (id) => {
    setPage(id);

    window.scrollTo(0, 0) 

    
  }

    var materialTableElements;
    
    if (!isFetching){
        materialTableElements = <>
            <div className={classes.grid}>
                {data.materials.map ((el, val) => <MaterialsListElement label={el.label} name = {el.name} rarity={(el.rarity == null) ? 1 : el.rarity} image={el.images.icon}/>)}
            </div>

            <Group position='apart' style={{marginTop: '20px'}}>
                <div>
                    {`${(page-1) * recordsPerPage + 1} - ${Math.min((page) * recordsPerPage, data.total)} / ${data.total}`}
                </div>
                <Pagination page={page} onChange={setPage} total={Math.ceil(data.total / recordsPerPage)}  withEdges />
            </Group>
        </>
    }

  return (
    
    
    
    <Box style={{minHeight: '750px'}}>
        {
            
            (isFetching) ? <div className={classes.loaderWrapper}><Loader/></div> : materialTableElements

        }
        
    </Box>
  );
}
