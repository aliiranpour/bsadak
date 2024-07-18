import React, { useState, useRef } from 'react';
import {
  Box, Button, Heading, Table, Thead, Tbody, Tr, Th, Td, Flex, IconButton, useDisclosure, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, useBreakpointValue, useMediaQuery
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, AddIcon } from '@chakra-ui/icons';
import AddCategoryModal from './components/AddCategoryModal';
import EditCategoryModal from './components/EditCategoryModal';
import DetailCategoryModal from './components/DetailCategoryModal';
import yekan from '../../../assets/font/BYekan/BYekan+.ttf';

const initialCategories = [
  { id: 1, company: 'شرکت الف', name: 'دسته بندی ۱', description: 'توضیحات دسته بندی ۱' },
  { id: 2, company: 'شرکت ب', name: 'دسته بندی ۲', description: 'توضیحات دسته بندی ۲' }
];

const initialCompanies = [
  { id: 1, name: 'شرکت الف' },
  { id: 2, name: 'شرکت ب' }
];

const CategoryManagement = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [editCategory, setEditCategory] = useState(null);
  const [detailCategory, setDetailCategory] = useState(null);
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isDetailOpen, onOpen: onDetailOpen, onClose: onDetailClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const cancelRef = useRef();

  const handleAddCategory = (newCategory) => {
    setCategories([...categories, newCategory]);
  };

  const handleEditCategory = (updatedCategory) => {
    setCategories(categories.map(c => c.id === updatedCategory.id ? updatedCategory : c));
    setEditCategory(null);
    onEditClose();
  };

  const handleDeleteCategory = () => {
    setCategories(categories.filter(c => c.id !== editCategory.id));
    setEditCategory(null);
    onDeleteClose();
  };

  const handleEditClick = (category) => {
    setEditCategory(category);
    onEditOpen();
  };

  const handleDeleteClick = (category) => {
    setEditCategory(category);
    onDeleteOpen();
  };

  const handleRowClick = (category) => {
    setDetailCategory(category);
    onDetailOpen();
  };

  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const headingFontSize = useBreakpointValue({ base: 'lg', md: 'xl' });
  const textFontSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  const truncateText = (text, length) => (text.length > length ? `${text.substring(0, length)}...` : text);

  return (
    <Box p={5}>
      <Flex justifyContent="space-between" alignItems="center" mb={5} flexDirection={isMobile ? 'column' : 'row'} borderBottom='1px solid black' pb={5}>
        <Heading fontSize={headingFontSize} mb={isMobile ? 4 : 0} fontFamily={yekan}>مدیریت دسته بندی‌ها</Heading>
        <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={onAddOpen} size={buttonSize} w={isMobile ? '100%' : 'auto'}>
          افزودن دسته بندی جدید
        </Button>
      </Flex>
      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th fontSize={textFontSize} fontFamily={yekan} textAlign="center">نام شرکت</Th>
              <Th fontSize={textFontSize} fontFamily={yekan} textAlign="center">نام دسته بندی</Th>
              <Th fontSize={textFontSize} fontFamily={yekan} textAlign="center">توضیحات</Th>
              <Th fontSize={textFontSize} fontFamily={yekan} textAlign="center">عملیات</Th>
            </Tr>
          </Thead>
          <Tbody>
            {categories.map((category) => (
              <Tr key={category.id} onClick={() => handleRowClick(category)} cursor="pointer">
                <Td fontSize={textFontSize} textAlign="center">{category.company}</Td>
                <Td fontSize={textFontSize} textAlign="center">{category.name}</Td>
                <Td fontSize={textFontSize} textAlign="center">{truncateText(category.description, 20)}</Td>
                <Td>
                  <Flex justifyContent="center">
                    <Button
                      leftIcon={<EditIcon />}
                      size={buttonSize}
                      colorScheme="blue"
                      onClick={(e) => { e.stopPropagation(); handleEditClick(category); }}
                      mr={2}
                    >
                      ویرایش
                    </Button>
                    <Button
                      leftIcon={<DeleteIcon />}
                      size={buttonSize}
                      colorScheme="red"
                      onClick={(e) => { e.stopPropagation(); handleDeleteClick(category); }}
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

      <AddCategoryModal
        isOpen={isAddOpen}
        onClose={onAddClose}
        onAddCategory={handleAddCategory}
        companies={initialCompanies}
      />

      {editCategory && (
        <EditCategoryModal
          isOpen={isEditOpen}
          onClose={onEditClose}
          onEditCategory={handleEditCategory}
          initialCategory={editCategory}
          companies={initialCompanies}
        />
      )}

      {detailCategory && (
        <DetailCategoryModal
          isOpen={isDetailOpen}
          onClose={onDetailClose}
          category={detailCategory}
        />
      )}

      <AlertDialog isOpen={isDeleteOpen} leastDestructiveRef={cancelRef} onClose={onDeleteClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              حذف دسته بندی
            </AlertDialogHeader>
            <AlertDialogBody>
              آیا مطمئن هستید که می‌خواهید این دسته بندی را حذف کنید؟
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                لغو
              </Button>
              <Button colorScheme="red" onClick={handleDeleteCategory} ml={3}>
                حذف
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default CategoryManagement;
