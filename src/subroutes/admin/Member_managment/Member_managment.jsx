import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  Thead,
  Tbody,
  Text,
  Tr,
  Th,
  Td,
  Flex,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useBreakpointValue,
  useMediaQuery,
  Stack,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, AddIcon, SearchIcon } from '@chakra-ui/icons';
import AddUserModal from './components/AddUsesr';
import EditUserModal from './components/Edituser';
import yekan from '../../../assets/font/BYekan/BYekan+.ttf';

const positions = [
  { id: 1, name: 'admin' },
  { id: 2, name: 'user' },
  { id: 3, name: 'moderator' },
];

const MemberManagement = () => {
  const initialData = [
    { id: 1, first_name: 'وحید', last_name: 'رضوانی', username: 'vahidre20', password: 'vahidRE20##', position: 'admin', tel: '09923312951' },
    { id: 2, first_name: 'علی', last_name: 'ایران پور', username: 'aliiranpour', password: 'aliiran', position: 'admin', tel: '09305182174' },
  ];

  const [data, setData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState('');
  const [editUser, setEditUser] = useState(null);
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const cancelRef = useRef();

  const handleDeleteUser = () => {
    setData(data.filter((user) => user.id !== editUser.id));
    onDeleteClose();
  };

  const handleEditUser = (updatedUser) => {
    setData(data.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
    setEditUser(null);
    onEditClose();
  };

  const handleAddUser = (newUser) => {
    setData([...data, { ...newUser, id: data.length + 1 }]);
  };

  const handleEditClick = (user) => {
    setEditUser(user);
    onEditOpen();
  };

  const handleDeleteClick = (user) => {
    setEditUser(user);
    onDeleteOpen();
  };

  const filteredUsers = data.filter((user) =>
    `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const textFontSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  return (
    <Box p={5} mt={10}>
      <Flex justifyContent="space-between" alignItems="center" mb={5} flexDirection={isMobile ? 'column' : 'row'}>
        <InputGroup mb={isMobile ? 4 : 0} w={isMobile ? '100%' : '80%'} h="50px" outline="1px solid black" borderRadius={5}>
          <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.500" />} />
          <Input
            type="text"
            placeholder="نام کاربر مورد نظر را وارد کنید"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fontFamily={yekan}
            h="50px"
          />
        </InputGroup>
        <Button
          leftIcon={<AddIcon />}
          onClick={onAddOpen}
          size={buttonSize}
          w={isMobile ? '100%' : '30%'}
          borderRadius={5}
          mx={isMobile ? '10px' : '1.5rem'}
          h="50px"
          colorScheme="green"
          color="white"
          bgColor="green.700"
        >
          افزودن کاربر
        </Button>
      </Flex>
      {isMobile ? (
        <Stack spacing={4}>
          {filteredUsers.map((user, index) => (
            <Box key={user.id} p={4} border="1px solid" borderColor="gray.200" borderRadius="10px" bg={index % 2 === 0 ? 'gray.50' : 'gray.200'}>
              <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                <GridItem>
                  <Text fontSize={textFontSize} fontFamily={yekan} textAlign="left">
                    شناسه:
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontSize={textFontSize} fontFamily={yekan} textAlign="left">
                    {user.id}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontSize={textFontSize} fontFamily={yekan} textAlign="left">
                    نام:
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontSize={textFontSize} fontFamily={yekan} textAlign="left">
                    {user.first_name}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontSize={textFontSize} fontFamily={yekan} textAlign="left">
                    نام خانوادگی:
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontSize={textFontSize} fontFamily={yekan} textAlign="left">
                    {user.last_name}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontSize={textFontSize} fontFamily={yekan} textAlign="left">
                    نام کاربری:
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontSize={textFontSize} fontFamily={yekan} textAlign="left">
                    {user.username}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontSize={textFontSize} fontFamily={yekan} textAlign="left">
                    رمز عبور:
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontSize={textFontSize} fontFamily={yekan} textAlign="left">
                    {user.password}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontSize={textFontSize} fontFamily={yekan} textAlign="left">
                    موقعیت:
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontSize={textFontSize} fontFamily={yekan} textAlign="left">
                    {user.position}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontSize={textFontSize} fontFamily={yekan} textAlign="left">
                    تلفن:
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontSize={textFontSize} fontFamily={yekan} textAlign="left">
                    {user.tel}
                  </Text>
                </GridItem>
              </Grid>
              <Flex justifyContent="center" mt={4}>
                <Button
                  leftIcon={<EditIcon />}
                  size={buttonSize}
                  colorScheme="green"
                  onClick={() => handleEditClick(user)}
                  mr={2}
                  bgColor="green.300"
                  color="white"
                  borderRadius={5}
                >
                  ویرایش
                </Button>
                <Button
                  leftIcon={<DeleteIcon />}
                  size={buttonSize}
                  colorScheme="blackAlpha"
                  onClick={() => handleDeleteClick(user)}
                  bgColor="blackAlpha.800"
                  color="white"
                  borderRadius={5}
                >
                  حذف
                </Button>
              </Flex>
            </Box>
          ))}
        </Stack>
      ) : (
        <Box overflowX="auto" border="1px solid" borderColor="gray.200" borderRadius="10px">
          <Table variant="striped" colorScheme="gray">
            <Thead>
              <Tr>
                <Th fontSize={textFontSize} fontFamily={yekan} textAlign="center">
                  شناسه
                </Th>
                <Th fontSize={textFontSize} fontFamily={yekan} textAlign="center">
                  نام
                </Th>
                <Th fontSize={textFontSize} fontFamily={yekan} textAlign="center">
                  نام خانوادگی
                </Th>
                <Th fontSize={textFontSize} fontFamily={yekan} textAlign="center">
                  نام کاربری
                </Th>
                <Th fontSize={textFontSize} fontFamily={yekan} textAlign="center">
                  رمز عبور
                </Th>
                <Th fontSize={textFontSize} fontFamily={yekan} textAlign="center">
                  موقعیت
                </Th>
                <Th fontSize={textFontSize} fontFamily={yekan} textAlign="center">
                  تلفن
                </Th>
                <Th fontSize={textFontSize} fontFamily={yekan} textAlign="center">
                  عملیات
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredUsers.map((user, index) => (
                <Tr key={user.id} bg={index % 2 === 0 ? 'gray.50' : 'gray.200'}>
                  <Td fontSize={textFontSize} textAlign="center">
                    {user.id}
                  </Td>
                  <Td fontSize={textFontSize} textAlign="center">
                    {user.first_name}
                  </Td>
                  <Td fontSize={textFontSize} textAlign="center">
                    {user.last_name}
                  </Td>
                  <Td fontSize={textFontSize} textAlign="center">
                    {user.username}
                  </Td>
                  <Td fontSize={textFontSize} textAlign="center">
                    {user.password}
                  </Td>
                  <Td fontSize={textFontSize} textAlign="center">
                    {user.position}
                  </Td>
                  <Td fontSize={textFontSize} textAlign="center">
                    {user.tel}
                  </Td>
                  <Td textAlign="center">
                    <Flex justifyContent="center">
                      <Button
                        leftIcon={<EditIcon />}
                        size={buttonSize}
                        colorScheme="green"
                        onClick={() => handleEditClick(user)}
                        mr={2}
                        bgColor="green.300"
                        color="white"
                        borderRadius={5}
                      >
                        ویرایش
                      </Button>
                      <Button
                        leftIcon={<DeleteIcon />}
                        size={buttonSize}
                        colorScheme="blackAlpha"
                        onClick={() => handleDeleteClick(user)}
                        bgColor="blackAlpha.800"
                        color="white"
                        borderRadius={5}
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
      )}

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

      <AlertDialog isOpen={isDeleteOpen} leastDestructiveRef={cancelRef} onClose={onDeleteClose}>
        <AlertDialogOverlay >
          <AlertDialogContent bgColor={'red.100'} >
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              حذف کاربر
            </AlertDialogHeader>
            <AlertDialogBody>
              آیا مطمئن هستید که می‌خواهید این کاربر را حذف کنید؟
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose} borderRadius={5} bgColor={'gray.300'}>
                لغو
              </Button>
              <Button 
                onClick={handleDeleteUser} 
                ml={3}
                bgColor="blackAlpha.800"
                color="white"
                borderRadius={5}
                colorScheme="blackAlpha"
                >
                حذف
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default MemberManagement;
