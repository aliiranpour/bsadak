import React, { useState, useEffect, useRef } from 'react';
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
import axios from 'axios';
import yekan from '../../../assets/font/BYekan/BYekan+.ttf';

const MemberManagement = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editUser, setEditUser] = useState(null);
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const cancelRef = useRef();
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.bsadak.ir/api/admin/user', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('accessToken')
        }
      });
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`https://api.bsadak.ir/api/admin/user/${editUser._id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('accessToken')
        }
      });
      fetchData();
      onDeleteClose();
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  const handleEditUser = (updatedUser) => {
    fetchData();
    setEditUser(null);
    onEditClose();
  };

  const handleAddUser = (newUser) => {
    fetchData();
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
    `${user.Name} ${user.LastName}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const textFontSize = useBreakpointValue({ base: 'sm', md: 'md' });

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
            <Box key={user._id} p={4} border="1px solid" borderColor="gray.200" borderRadius="10px" bg={index % 2 === 0 ? 'gray.50' : 'gray.200'}>
              <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                <GridItem>
                  <Text fontSize={textFontSize} fontFamily={yekan} textAlign="left">
                    شناسه:
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontSize={textFontSize} fontFamily={yekan} textAlign="left">
                    {user._id}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontSize={textFontSize} fontFamily={yekan} textAlign="left">
                    نام:
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontSize={textFontSize} fontFamily={yekan} textAlign="left">
                    {user.Name}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontSize={textFontSize} fontFamily={yekan} textAlign="left">
                    نام خانوادگی:
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontSize={textFontSize} fontFamily={yekan} textAlign="left">
                    {user.LastName}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontSize={textFontSize} fontFamily={yekan} textAlign="left">
                    نام کاربری:
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontSize={textFontSize} fontFamily={yekan} textAlign="left">
                    {user.UserName}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontSize={textFontSize} fontFamily={yekan} textAlign="left">
                    رمز عبور:
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontSize={textFontSize} fontFamily={yekan} textAlign="left">
                    {user.Password}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontSize={textFontSize} fontFamily={yekan} textAlign="left">
                    موقعیت:
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontSize={textFontSize} fontFamily={yekan} textAlign="left">
                    {user.UserType.Title}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontSize={textFontSize} fontFamily={yekan} textAlign="left">
                    تلفن:
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontSize={textFontSize} fontFamily={yekan} textAlign="left">
                    {user.Phone}
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
                <Tr key={user._id} bg={index % 2 === 0 ? 'gray.50' : 'gray.200'}>
                  <Td fontSize={textFontSize} textAlign="center">
                    {user._id}
                  </Td>
                  <Td fontSize={textFontSize} textAlign="center">
                    {user.Name}
                  </Td>
                  <Td fontSize={textFontSize} textAlign="center">
                    {user.LastName}
                  </Td>
                  <Td fontSize={textFontSize} textAlign="center">
                    {user.UserName}
                  </Td>
                  <Td fontSize={textFontSize} textAlign="center">
                    {user.Password}
                  </Td>
                  <Td fontSize={textFontSize} textAlign="center">
                    {user.UserType.Title}
                  </Td>
                  <Td fontSize={textFontSize} textAlign="center">
                    {user.Phone}
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
      />

      {editUser && (
        <EditUserModal
          isOpen={isEditOpen}
          onClose={onEditClose}
          onEditUser={handleEditUser}
          user={editUser}
          positions={data} // این قسمت را اضافه کنید تا مقادیر مربوط به positions به صورت صحیح به EditUserModal منتقل شود
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
