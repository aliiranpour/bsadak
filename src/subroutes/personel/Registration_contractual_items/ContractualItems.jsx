import React, { useState, useRef } from 'react';
import {
  Box, Button, Heading, Table, Thead, Tbody, Tr, Th, Td, Flex, useDisclosure, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, useBreakpointValue, useMediaQuery
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, AddIcon } from '@chakra-ui/icons';
import AddContractualItemModal from './components/AddContractualItemModal';
import EditContractualItemModal from './components/EditContractualItemModal';
import DetailContractualItemModal from './components/DetailContractualItemModal';
import yekan from '../../../assets/font/BYekan/BYekan+.ttf'

const initialItems = [
  { id: 1, year: 2022, childAllowance: 1000, spouseAllowance: 500, insuranceAllowance: 700, housingAllowance: 2000, laborBenefit: 2500 },
  { id: 2, year: 2023, childAllowance: 1100, spouseAllowance: 550, insuranceAllowance: 750, housingAllowance: 2100, laborBenefit: 2600 }
];

const ContractualItemsManagement = () => {
  const [items, setItems] = useState(initialItems);
  const [editItem, setEditItem] = useState(null);
  const [detailItem, setDetailItem] = useState(null);
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isDetailOpen, onOpen: onDetailOpen, onClose: onDetailClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const cancelRef = useRef();

  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
  };

  const handleEditItem = (updatedItem) => {
    setItems(items.map(i => i.id === updatedItem.id ? updatedItem : i));
    setEditItem(null);
    onEditClose();
  };

  const handleDeleteItem = () => {
    setItems(items.filter(i => i.id !== editItem.id));
    setEditItem(null);
    onDeleteClose();
  };

  const handleEditClick = (item) => {
    setEditItem(item);
    onEditOpen();
  };

  const handleDeleteClick = (item) => {
    setEditItem(item);
    onDeleteOpen();
  };

  const handleDetailClick = (item) => {
    setDetailItem(item);
    onDetailOpen();
  };

  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const headingFontSize = useBreakpointValue({ base: 'lg', md: 'xl' });
  const textFontSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const [isMobile] = useMediaQuery('(max-width: 568px)');

  return (
    <Box p={5}>
      <Flex justifyContent="space-between" alignItems="center" mb={5} flexDirection={isMobile ? 'column' : 'row'} borderBottom='1px solid black' pb={5}>
        <Heading fontSize={headingFontSize} mb={isMobile ? 4 : 0} fontFamily={yekan} >مدیریت موارد قراردادی</Heading>
        <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={onAddOpen} size={buttonSize} w={isMobile ? '100%' : 'auto'}>
          ثبت مورد قراردادی
        </Button>
      </Flex>
      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th fontSize={textFontSize} textAlign="center" fontFamily={yekan}>سال</Th>
              <Th fontSize={textFontSize} textAlign="center" fontFamily={yekan}>حق اولاد</Th>
              <Th fontSize={textFontSize} textAlign="center" fontFamily={yekan}>حق همسر</Th>
              <Th fontSize={textFontSize} textAlign="center" fontFamily={yekan}>حق بیمه</Th>
              <Th fontSize={textFontSize} textAlign="center" fontFamily={yekan}>حق مسکن</Th>
              <Th fontSize={textFontSize} textAlign="center" fontFamily={yekan}>بن کارگری</Th>
              <Th fontSize={textFontSize} textAlign="center" fontFamily={yekan}>عملیات</Th>
            </Tr>
          </Thead>
          <Tbody>
            {items.map((item, index) => (
              <Tr key={item.id} bg={index % 2 === 0 ? '#B2F5EA' : 'white'} onClick={() => handleDetailClick(item)} cursor="pointer">
                <Td fontSize={textFontSize} textAlign="center">{item.year}</Td>
                <Td fontSize={textFontSize} textAlign="center">{item.childAllowance}</Td>
                <Td fontSize={textFontSize} textAlign="center">{item.spouseAllowance}</Td>
                <Td fontSize={textFontSize} textAlign="center">{item.insuranceAllowance}</Td>
                <Td fontSize={textFontSize} textAlign="center">{item.housingAllowance}</Td>
                <Td fontSize={textFontSize} textAlign="center">{item.laborBenefit}</Td>
                <Td>
                  <Flex justifyContent="center">
                    <Button
                      leftIcon={<EditIcon />}
                      size={buttonSize}
                      colorScheme="blue"
                      onClick={(e) => { e.stopPropagation(); handleEditClick(item); }}
                      mr={2}
                    >
                      ویرایش
                    </Button>
                    <Button
                      leftIcon={<DeleteIcon />}
                      size={buttonSize}
                      colorScheme="red"
                      onClick={(e) => { e.stopPropagation(); handleDeleteClick(item); }}
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

      <AddContractualItemModal
        isOpen={isAddOpen}
        onClose={onAddClose}
        onAddItem={handleAddItem}
      />

      {editItem && (
        <EditContractualItemModal
          isOpen={isEditOpen}
          onClose={onEditClose}
          onEditItem={handleEditItem}
          initialItem={editItem}
        />
      )}

      {detailItem && (
        <DetailContractualItemModal
          isOpen={isDetailOpen}
          onClose={onDetailClose}
          item={detailItem}
        />
      )}

      <AlertDialog isOpen={isDeleteOpen} leastDestructiveRef={cancelRef} onClose={onDeleteClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              حذف مورد قراردادی
            </AlertDialogHeader>
            <AlertDialogBody>
              آیا مطمئن هستید که می‌خواهید این مورد را حذف کنید؟
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                لغو
              </Button>
              <Button colorScheme="red" onClick={handleDeleteItem} ml={3}>
                حذف
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default ContractualItemsManagement;
