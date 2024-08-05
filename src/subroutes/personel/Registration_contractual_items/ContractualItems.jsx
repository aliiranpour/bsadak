import React, { useState, useRef } from 'react';
import {
  Box, Button, Table, Thead, Tbody, Tr, Th, Td, Flex, useDisclosure, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, useBreakpointValue, useMediaQuery, InputGroup, InputLeftElement, Input
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, AddIcon, SearchIcon } from '@chakra-ui/icons';
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
  const [searchQuery, setSearchQuery] = useState('');
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

  const filteredItems = items.filter((item) =>
    item.year.toString().includes(searchQuery) ||
    item.childAllowance.toString().includes(searchQuery) ||
    item.spouseAllowance.toString().includes(searchQuery) ||
    item.insuranceAllowance.toString().includes(searchQuery) ||
    item.housingAllowance.toString().includes(searchQuery) ||
    item.laborBenefit.toString().includes(searchQuery)
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
            placeholder="سال مورد قراردادی مورد نظر را وارد کنید"
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
          ثبت مورد قراردادی
        </Button>
      </Flex>
      <Box overflowX="auto" border="1px solid" borderColor="gray.200" borderRadius="10px">
        <Table variant="striped" colorScheme="gray">
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
            {filteredItems.map((item, index) => (
              <Tr key={item.id} bg={index % 2 === 0 ? 'gray.50' : 'gray.200'} onClick={() => handleDetailClick(item)} cursor="pointer">
                <Td fontSize={textFontSize} textAlign="center">{item.year}</Td>
                <Td fontSize={textFontSize} textAlign="center">{item.childAllowance}</Td>
                <Td fontSize={textFontSize} textAlign="center">{item.spouseAllowance}</Td>
                <Td fontSize={textFontSize} textAlign="center">{item.insuranceAllowance}</Td>
                <Td fontSize={textFontSize} textAlign="center">{item.housingAllowance}</Td>
                <Td fontSize={textFontSize} textAlign="center">{item.laborBenefit}</Td>
                <Td textAlign="center">
                  <Flex justifyContent="center">
                    <Button
                      leftIcon={<EditIcon />}
                      size={buttonSize}
                      colorScheme="green"
                      onClick={(e) => { e.stopPropagation(); handleEditClick(item); }}
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
                      onClick={(e) => { e.stopPropagation(); handleDeleteClick(item); }}
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
              <Button ref={cancelRef} onClick={onDeleteClose} borderRadius={5} bgColor={'gray.300'}>
                لغو
              </Button>
              <Button 
                onClick={handleDeleteItem} 
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

export default ContractualItemsManagement;
