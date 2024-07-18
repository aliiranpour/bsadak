import React, { useState } from 'react';
import {
  Box, Button, Heading, Table, Thead, Tbody, Tr, Th, Td, Flex, useDisclosure 
} from '@chakra-ui/react';
import { AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import yekan from '../../../assets/font/BYekan/BYekan+.ttf';
import AddUserModal from './components/AddUsesr';
import EditUserModal from './components/Edituser';

const positions = [
  { id: 1, name: 'admin' },
  { id: 2, name: 'user' },
  { id: 3, name: 'moderator' },
];

const Member_managment = () => {
  const initialData = [
    { id: 1, first_name: 'وحید', last_name: 'رضوانی', username: 'vahidre20', password: 'vahidRE20##', position: 'admin', tel: '09923312951' },
    { id: 2, first_name: 'علی', last_name: 'ایران پور', username: 'aliiranpour', password: 'aliiran', position: 'admin', tel: '09305182174' },
  ];

  const [data, setData] = useState(initialData);
  const [editUser, setEditUser] = useState(null);
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();

  const handleAddUser = (newUser) => {
    setData([...data, { ...newUser, id: data.length + 1 }]);
  };

  const handleEditUser = (updatedUser) => {
    setData(data.map(user => (user.id === updatedUser.id ? updatedUser : user)));
    setEditUser(null);
  };

  const handleDeleteUser = (id) => {
    setData(data.filter(user => user.id !== id));
  };

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={10}>
        <Heading size="md" fontFamily={yekan}>لیست کاربران</Heading>
        <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={onAddOpen} w={165} h={45} >
          افزودن کاربر
        </Button>
      </Box>
      <Box overflowX="auto">
        <Table variant="striped" colorScheme="teal" size="sm">
          <Thead>
            <Tr h={20}>
              <Th textAlign="center" fontFamily={yekan} >شناسه</Th>
              <Th textAlign="center" fontFamily={yekan} >نام</Th>
              <Th textAlign="center" fontFamily={yekan} >نام خانوادگی</Th>
              <Th textAlign="center" fontFamily={yekan} >نام کاربری</Th>
              <Th textAlign="center" fontFamily={yekan} >رمز عبور</Th>
              <Th textAlign="center" fontFamily={yekan} >موقعیت</Th>
              <Th textAlign="center" fontFamily={yekan} >تلفن</Th>
              <Th textAlign="center" fontFamily={yekan} >عملیات</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((user) => (
              <Tr key={user.id} h={20}>
                <Td textAlign="center">{user.id}</Td>
                <Td textAlign="center">{user.first_name}</Td>
                <Td textAlign="center">{user.last_name}</Td>
                <Td textAlign="center">{user.username}</Td>
                <Td textAlign="center">{user.password}</Td>
                <Td textAlign="center">{user.position}</Td>
                <Td textAlign="center">{user.tel}</Td>
                <Td textAlign="center">
                  <Flex mt={2} justifyContent="center">
                    <Button
                      leftIcon={<EditIcon />}
                      colorScheme="blue"
                      onClick={() => {
                        setEditUser(user);
                        onEditOpen();
                      }}
                      mr={2}
                    >
                      ویرایش
                    </Button>
                    <Button
                      leftIcon={<DeleteIcon />}
                      colorScheme="red"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      حذف
                    </Button>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <AddUserModal
        isOpen={isAddOpen}
        onClose={onAddClose}
        onAddUser={handleAddUser}
        positions={positions}
      />

      {editUser && (
        <EditUserModal
          isOpen={isEditOpen}
          onClose={onEditClose}
          onEditUser={handleEditUser}
          user={editUser}
          positions={positions}
        />
      )}
    </Box>
  );
}

export default Member_managment;
