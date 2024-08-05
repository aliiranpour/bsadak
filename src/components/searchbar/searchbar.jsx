import React, { useState } from 'react';
import { InputGroup, InputLeftElement, Input } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <InputGroup w="100%" h="50px" outline="1px solid black" borderRadius={5} mb={5}>
      <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.500" />} />
      <Input
        type="text"
        placeholder="عبارت مورد نظر را وارد کنید"
        value={searchQuery}
        onChange={handleSearchChange}
        fontFamily="yekan"
        h="50px"
      />
    </InputGroup>
  );
};

export default SearchBar;
