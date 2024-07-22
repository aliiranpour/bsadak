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
  Tr,
  Th,
  Td,
  Flex,
  IconButton,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useBreakpointValue,
  useMediaQuery,
  Center,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, AddIcon, SearchIcon } from '@chakra-ui/icons';
import EditPermissionModal from './components/EditPermissionModal';
import AddPermissionModal from './components/AddPermissionModal';
import yekan from '../../../assets/font/BYekan/BYekan+.ttf';

const PermissionManagement = () => {
  const [permissions, setPermissions] = useState([
    'مشاهده مدیریت دسترسی',
    'افزودن شرکت جدید',
    'ویرایش شرکت',
    'حذف شرکت',
    'مشاهده لیست شرکت',
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editPermission, setEditPermission] = useState(null);
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const cancelRef = useRef();

  const handleDeletePermission = () => {
    setPermissions(permissions.filter((p) => p !== editPermission));
    onDeleteClose();
  };

  const handleEditPermission = (updatedPermission) => {
    setPermissions(permissions.map((p) => (p === editPermission ? updatedPermission : p)));
    setEditPermission(null);
    onEditClose();
  };

  const handleAddPermission = (newPermission) => {
    setPermissions([...permissions, newPermission]);
  };

  const handleEditClick = (permission) => {
    setEditPermission(permission);
    onEditOpen();
  };

  const handleDeleteClick = (permission) => {
    setEditPermission(permission);
    onDeleteOpen();
  };

  const filteredPermissions = permissions.filter((permission) =>
    permission.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const textFontSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const [isMobile] = useMediaQuery('(max-width: 568px)');

  return (
    <Box p={5} mt={10}>
      <Flex justifyContent="space-between" alignItems="center" mb={5} flexDirection={isMobile ? 'column' : 'row'}>
        <InputGroup mb={isMobile ? 4 : 0} w={isMobile ? '100%' : '80%'} h="50px" outline="1px solid black" borderRadius={5}>
          <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.500" />} />
          <Input
            type="text"
            placeholder="نام دسترسی مورد نظر را وارد کنید"
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
          افزودن دسترسی
        </Button>
      </Flex>
      <Box overflowX="auto" border="1px solid" borderColor="gray.200" borderRadius="10px">
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th fontSize={textFontSize} fontFamily={yekan} textAlign="center">
                نام دسترسی
              </Th>
              <Th fontSize={textFontSize} fontFamily={yekan} textAlign="center">
                عملیات
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredPermissions.map((permission, index) => (
              <Tr key={permission} bg={index % 2 === 0 ? 'gray.50' : 'gray.200'}>
                <Td fontSize={textFontSize} textAlign="center">
                  {permission}
                </Td>
                <Td textAlign="center">
                  <Flex justifyContent="center">
                    <Button
                      leftIcon={<EditIcon />}
                      size={buttonSize}
                      colorScheme="green"
                      onClick={() => handleEditClick(permission)}
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
                      onClick={() => handleDeleteClick(permission)}
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

      <AddPermissionModal
        isOpen={isAddOpen}
        onClose={onAddClose}
        onAddPermission={handleAddPermission}
        allPermissions={permissions}
      />

      <EditPermissionModal
        isOpen={isEditOpen}
        onClose={onEditClose}
        onEditPermission={handleEditPermission}
        initialPermission={editPermission}
        allPermissions={permissions}
      />

      <AlertDialog isOpen={isDeleteOpen} leastDestructiveRef={cancelRef} onClose={onDeleteClose}>
        <AlertDialogOverlay>
          <AlertDialogContent bgColor={'red.100'}>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              حذف دسترسی
            </AlertDialogHeader>
            <AlertDialogBody>
              آیا مطمئن هستید که می‌خواهید این دسترسی را حذف کنید؟
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose} borderRadius={5} bgColor={'gray.300'}>
                لغو
              </Button>
              <Button 
                onClick={handleDeletePermission} ml={3}
                bgColor="blackAlpha.800"
                color="white"
                borderRadius={5}
                colorScheme="blackAlpha">
                حذف
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default PermissionManagement;
