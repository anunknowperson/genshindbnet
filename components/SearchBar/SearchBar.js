import { IconSearch } from '@tabler/icons';
import { useCallback, useState, useEffect } from 'react';
import { TextInput } from '@mantine/core';


export function SearchBar ({callback, placeholder}) {
    const [search, setSearch] = useState('');
  
    const handleSearchChange = useCallback((event) => {
      const { value } = event.currentTarget;
      setSearch(value);
    
    });
  
    useEffect(() => {
      const timeOutId = setTimeout(() => callback(search), 500);
      return () => clearTimeout(timeOutId);
    }, [search]);
  
    return <>
      <TextInput
        placeholder={placeholder}
        mb="md"
        icon={<IconSearch size={14} stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
    </>
  
  }