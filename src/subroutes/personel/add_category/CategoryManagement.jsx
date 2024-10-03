import React, { useState, useRef, useEffect } from 'react';
import {
  Box, Button, Table, Thead, Tbody, Tr, Th, Td, Flex, useDisclosure, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, useBreakpointValue, useMediaQuery, InputGroup, InputLeftElement, Input
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, AddIcon, SearchIcon } from '@chakra-ui/icons';
import AddCategoryModal from './components/AddCategoryModal';
import EditCategoryModal from './components/EditCategoryModal';
import DetailCategoryModal from './components/DetailCategoryModal';
import axios from 'axios';
import yekan from '../../../assets/font/BYekan/BYekan+.ttf';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [editCategory, setEditCategory] = useState(null);
  const [detailCategory, setDetailCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isDetailOpen, onOpen: onDetailOpen, onClose: onDetailClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const cancelRef = useRef();
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://api.bsadak.ir/api/category', {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json'
        }
      });
      const data = response.data;
      if (Array.isArray(data)) {
        setCategories(data);
      } else if (data && Array.isArray(data.data)) {
        setCategories(data.data);
      } else {
        console.error('Invalid data format:', data);
      }
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDeleteCategory = async () => {
    try {
      await axios.delete(`https://api.bsadak.ir/api/category/${editCategory._id}`, {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json'
        }
      });
      fetchCategories();
      onDeleteClose();
    } catch (error) {
      console.error('Error deleting category', error);
    }
  };

  const handleEditCategory = async (updatedCategory) => {
    try {
      await axios.patch(`https://api.bsadak.ir/api/category/${editCategory._id}`, updatedCategory, {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json'
        }
      });
      fetchCategories();
      setEditCategory(null);
      onEditClose();
    } catch (error) {
      console.error('Error editing category', error);
    }
  };

  const handleAddCategory = async (newCategory) => {
    try {
      await axios.post('https://api.bsadak.ir/api/category', newCategory, {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json'
        }
      });
      fetchCategories();
      onAddClose();
    } catch (error) {
      console.error('Error adding category', error);
    }
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

  const filteredCategories = Array.isArray(categories) ? categories.filter((category) =>
    category.Name.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const textFontSize = useBreakpointValue({ base: 'sm', md: 'md' });

  return (
    <Box p={5}>
      <Flex justifyContent="space-between" alignItems="center" mb={5} flexDirection={isMobile ? 'column' : 'row'}>
        <InputGroup mb={isMobile ? 4 : 0} w={isMobile ? '100%' : '80%'} h="50px" outline="1px solid black" borderRadius={5}>
          <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.500" />} />
          <Input
            type="text"
            placeholder="نام دسته بندی مورد نظر را وارد کنید"
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
          افزودن دسته بندی جدید
        </Button>
      </Flex>
      <Box overflowX="auto" border="1px solid" borderColor="gray.200" borderRadius="10px">
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th fontSize={textFontSize} fontFamily={yekan} textAlign="center">نام شرکت</Th>
              <Th fontSize={textFontSize} fontFamily={yekan} textAlign="center">نام دسته بندی</Th>
              <Th fontSize={textFontSize} fontFamily={yekan} textAlign="center">توضیحات</Th>
              <Th fontSize={textFontSize} fontFamily={yekan} textAlign="center">عملیات</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredCategories.map((category, index) => (
              <Tr key={category._id} bg={index % 2 === 0 ? 'gray.50' : 'gray.200'} onClick={() => handleRowClick(category)} cursor="pointer">
                <Td fontSize={textFontSize} textAlign="center" >{category.Company.Name}</Td>
                <Td fontSize={textFontSize} textAlign="center">{category.Name}</Td>
                <Td fontSize={textFontSize} textAlign="center">{category.Caption}</Td>
                <Td>
                  <Flex justifyContent="center">
                    <Button
                      leftIcon={<EditIcon />}
                      size={buttonSize}
                      colorScheme="green"
                      onClick={(e) => { e.stopPropagation(); handleEditClick(category); }}
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
                      onClick={(e) => { e.stopPropagation(); handleDeleteClick(category); }}
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

      <AddCategoryModal
        isOpen={isAddOpen}
        onClose={onAddClose}
        onAddCategory={handleAddCategory}
      />

      {editCategory && (
        <EditCategoryModal
          isOpen={isEditOpen}
          onClose={onEditClose}
          onEditCategory={handleEditCategory}
          initialCategory={editCategory}
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
              <Button ref={cancelRef} onClick={onDeleteClose} borderRadius={5} bgColor={'gray.300'}>
                لغو
              </Button>
              <Button 
                onClick={handleDeleteCategory} 
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

export default CategoryManagement;
