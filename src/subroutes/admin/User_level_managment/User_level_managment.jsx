import React, { useState, useRef } from 'react';
import {
  Box, Button, Heading, Flex, IconButton, Table, Thead, Tbody, Tr, Th, Td, useDisclosure, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter
} from '@chakra-ui/react';
import yekan from '../../../assets/font/BYekan/BYekan+.ttf';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import AddLevelModal from './components/AddLevelModal';
import EditLevelModal from './components/EditLevelModal';

const allPermissions = [
  'مشاهده مدیریت دسترسی', 'افزودن شرکت جدید', 'ویرایش شرکت', 'حذف شرکت', 'مشاهده لیست شرکت', 
  'مشاهده لیست دسته بندی', 'افزودن دسته بندی', 'ویرایش دسته بندی', 'حذف دسته بندی',
  'مدیریت پرسنل', 'افزودن پرسنل', 'ویرایش پرسنل', 'حذف پرسنل', 'لیست پرسنل', 'لیست تسویه ها',
  'افزودن تسویه پرسنل', 'ویرایش تسویه پرسنل', 'برگشت به کار تسویه', 'لیست دریافتی ها',
  'افزودن دریافتی جدید', 'ویرایش دریافتی ها', 'حذف دریافتی ها', 'لیست سمت پرسنل',
  'افزودن سمت جدید', 'ویرایش سمت پرسنل', 'حذف سمت پرسنل', 'لیست شیفت های کاری',
  'افزودن شیفت کاری', 'ویرایش شیفت کاری', 'حذف شیفت کاری', 'فعال کردن شیفت کاری',
  'مشاهده لیست کارکرد ها', 'ویرایش کارکرد', 'حذف کارکرد', 'محسابه کارکرد', 'مدیریت حساب پرسنل',
  'مدیریت موارد قراردادی پرسنل', 'حذف پرسنل از گروه', 'افزودن پرسنل به گروه', 'حضور و غیاب پرسنل',
  'ویرایش حضور و غیاب پرسنل', 'افزودن دسترسی', 'ویرایش دسترسی', 'حذف دسترسی', 'مشاهده لیست سطوح کاربری',
  'افزودن سطوح کاربری', 'ویرایش سطح کاربری', 'حذف سطح کاربری', 'مشاهده لیست کاربران سایت',
  'افزودن کاربر جدید', 'ویرایش کاربر سایت', 'حذف کاربر سایت', 'حذف حضور و غیاب پرسنل',
  'لیست حضور و غیاب', 'افزودن تعطیلی', 'افزودن اضافه کارپرسنل', 'لیست اضافه کار پرسنل'
];

const initialAccessLevels = [
  {
    name: 'ادمین',
    permissions: allPermissions
  }
];

const UserLevelManagement = () => {
  const [accessLevels, setAccessLevels] = useState(initialAccessLevels);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const [editLevel, setEditLevel] = useState(null);
  const cancelRef = useRef();

  const handleDeletePermission = (permission) => {
    const updatedPermissions = selectedLevel.permissions.filter((p) => p !== permission);
    setSelectedLevel({
      ...selectedLevel,
      permissions: updatedPermissions
    });
    setAccessLevels(accessLevels.map(level => level.name === selectedLevel.name ? { ...level, permissions: updatedPermissions } : level));
  };

  const handleAddLevel = (newLevel) => {
    setAccessLevels([...accessLevels, newLevel]);
  };

  const handleEditLevel = (updatedLevel) => {
    setAccessLevels(accessLevels.map(level => level.name === editLevel.name ? updatedLevel : level));
    setSelectedLevel(null);
    onEditClose();
  };

  const handleDeleteLevel = () => {
    const updatedLevels = accessLevels.filter(level => level.name !== editLevel.name);
    setAccessLevels(updatedLevels);
    setSelectedLevel(null);
    onDeleteClose();
  };

  const handleEditClick = (level) => {
    setEditLevel(level);
    onEditOpen();
  };

  const handleDeleteClick = (level) => {
    setEditLevel(level);
    onDeleteOpen();
  };

  const handleDetailsClick = (level) => {
    setSelectedLevel(level);
    onEditOpen();
  };

  return (
    <Box p={5}>
      <Flex justifyContent="space-between" alignItems="center" mb={35}>
        <Heading fontFamily={yekan}>سطوح کاربری</Heading>
        <Button colorScheme="teal" onClick={onAddOpen}>
          افزودن سطح کاربری
        </Button>
      </Flex>
      <Table variant="simple" mb={5}>
        <Thead>
          <Tr>
            <Th>سطح کاربری</Th>
            <Th>عملیات</Th>
          </Tr>
        </Thead>
        <Tbody>
          {accessLevels.map((level) => (
            <Tr key={level.name}>
              <Td>{level.name}</Td>
              <Td>
                <Button size="sm" colorScheme="blue" onClick={() => handleDetailsClick(level)} mr={2}>
                  جزییات
                </Button>
                <Button size="sm" colorScheme="red" onClick={() => handleDeleteClick(level)}>
                  حذف
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {selectedLevel && (
        <Modal isOpen={isEditOpen} onClose={onEditClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>جزئیات سطح {selectedLevel.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>میزان دسترسی</Th>
                    <Th>عملیات</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {selectedLevel.permissions.map((permission) => (
                    <Tr key={permission}>
                      <Td>{permission}</Td>
                      <Td>
                        <IconButton
                          icon={<DeleteIcon />}
                          size="sm"
                          colorScheme="red"
                          onClick={() => handleDeletePermission(permission)}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={() => handleEditClick(selectedLevel)}>
                ویرایش سطح کاربری
              </Button>
              <Button variant="ghost" onClick={onEditClose}>بستن</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      <AddLevelModal
        isOpen={isAddOpen}
        onClose={onAddClose}
        onAddLevel={handleAddLevel}
        allPermissions={allPermissions}
      />
      {editLevel && (
        <EditLevelModal
          isOpen={isEditOpen}
          onClose={onEditClose}
          onEditLevel={handleEditLevel}
          level={editLevel}
          allPermissions={allPermissions}
        />
      )}
      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              حذف سطح کاربری
            </AlertDialogHeader>

            <AlertDialogBody>
              آیا مطمئن هستید که می‌خواهید این سطح کاربری را حذف کنید؟
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                لغو
              </Button>
              <Button colorScheme="red" onClick={handleDeleteLevel} ml={3}>
                حذف
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default UserLevelManagement;
