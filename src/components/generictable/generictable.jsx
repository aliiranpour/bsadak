import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Flex, Button } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

const GenericTable = ({ columns, data, onEdit, onDelete }) => {
  return (
    <Table variant="striped" colorScheme="gray">
      <Thead>
        <Tr>
          {columns.map((column) => (
            <Th key={column.accessor} textAlign="center">{column.Header}</Th>
          ))}
          <Th textAlign="center">عملیات</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((item) => (
          <Tr key={item.id}>
            {columns.map((column) => (
              <Td key={column.accessor} textAlign="center">{item[column.accessor]}</Td>
            ))}
            <Td textAlign="center">
              <Flex justifyContent="center">
                <Button
                  leftIcon={<EditIcon />}
                  size="sm"
                  colorScheme="blue"
                  onClick={() => onEdit(item)}
                  mr={2}
                >
                  ویرایش
                </Button>
                <Button
                  leftIcon={<DeleteIcon />}
                  size="sm"
                  colorScheme="red"
                  onClick={() => onDelete(item)}
                >
                  حذف
                </Button>
              </Flex>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default GenericTable;
