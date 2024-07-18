import React, { useState, useRef } from 'react';
import {
  Box, Button, Heading, Table, Thead, Tbody, Tr, Th, Td, Flex, IconButton, useDisclosure, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, useBreakpointValue, useMediaQuery
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, AddIcon } from '@chakra-ui/icons';
import EditPermissionModal from './components/EditPermissionModal';
import AddPermissionModal from './components/AddPermissionModal';
import yekan from '../../../assets/font/BYekan/BYekan+.ttf'

const PermissionManagement = () => {
  const [permissions, setPermissions] = useState([
    'مشاهده مدیریت دسترسی', 'افزودن شرکت جدید', 'ویرایش شرکت', 'حذف شرکت', 'مشاهده لیست شرکت'
  ]);
  const [editPermission, setEditPermission] = useState(null);
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const cancelRef = useRef();

  const handleDeletePermission = () => {
    setPermissions(permissions.filter(p => p !== editPermission));
    onDeleteClose();
  };

  const handleEditPermission = (updatedPermission) => {
    setPermissions(permissions.map(p => p === editPermission ? updatedPermission : p));
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

  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const headingFontSize = useBreakpointValue({ base: 'lg', md: 'xl' });
  const textFontSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const [isMobile] = useMediaQuery('(max-width: 568px)');

  return (
    <Box p={5}>
      <Flex justifyContent="space-between" alignItems="center" mb={5} flexDirection={isMobile ? 'column' : 'row'}>
        <Heading fontSize={headingFontSize} mb={isMobile ? 4 : 0} fontFamily={yekan}>مدیریت دسترسی‌ها</Heading>
        <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={onAddOpen} size={buttonSize} w={isMobile ? '100%' : 'auto'}>
          افزودن دسترسی
        </Button>
      </Flex>
      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th fontSize={textFontSize} fontFamily={yekan}>نام دسترسی</Th>
              <Th fontSize={textFontSize} fontFamily={yekan}>عملیات</Th>
            </Tr>
          </Thead>
          <Tbody>
            {permissions.map((permission) => (
              <Tr key={permission}>
                <Td fontSize={textFontSize}>{permission}</Td>
                <Td>
                  <Flex>
                    <IconButton
                      icon={<EditIcon />}
                      size={buttonSize}
                      colorScheme="blue"
                      onClick={() => handleEditClick(permission)}
                      mr={2}
                    />
                    <IconButton
                      icon={<DeleteIcon />}
                      size={buttonSize}
                      colorScheme="red"
                      onClick={() => handleDeleteClick(permission)}
                    />
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
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              حذف دسترسی
            </AlertDialogHeader>
            <AlertDialogBody>
              آیا مطمئن هستید که می‌خواهید این دسترسی را حذف کنید؟
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                لغو
              </Button>
              <Button colorScheme="red" onClick={handleDeletePermission} ml={3}>
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
