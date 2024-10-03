import React, { useState, useEffect } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Select, Text } from '@chakra-ui/react';
import axios from 'axios';

const EditCategoryModal = ({ isOpen, onClose, personId, currentCategory, companyName, onSave }) => {
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(currentCategory?._id || '');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategoryOptions = async () => {
      try {
        const response = await axios.get('https://api.bsadak.ir/api/category', {
          headers: {
            'Authorization': `${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
          },
        });
        const filteredCategories = response.data.data.filter(category => category.Company.Name === companyName);
        setCategoryOptions(filteredCategories);
      } catch (error) {
        console.error('Error fetching category options:', error);
        setError('خطایی در بارگذاری گزینه‌های دسته‌بندی رخ داد. لطفاً دوباره تلاش کنید.');
      }
    };

    if (isOpen) {
      fetchCategoryOptions();
    }
  }, [isOpen, companyName]);

  const handleSave = async () => {
    if (!selectedCategory) {
      setError('لطفاً یک دسته‌بندی را انتخاب کنید.');
      return;
    }

    setIsLoading(true);
    try {
      await axios.patch(`https://api.bsadak.ir/api/groupdocument/category/${personId}`, {
        Category: selectedCategory,
      }, {
        headers: {
          'Authorization': `${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
      });

      onSave();
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Error updating category:', error);
      setError('خطایی در به‌روزرسانی دسته‌بندی رخ داد. لطفاً دوباره تلاش کنید.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>ویرایش دسته‌بندی</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {error && <Text color="red.500" mb={3}>{error}</Text>}
          <FormControl mb={3}>
            <FormLabel>دسته‌بندی</FormLabel>
            <Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              {categoryOptions.map(option => (
                <option key={option._id} value={option._id}>
                  {option.Name}
                </option>
              ))}
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button 
            onClick={handleSave} 
            isLoading={isLoading}
            mr={2}
            colorScheme="green"
            color="white"
            bgColor="green.300"
            borderRadius={5}>
            ذخیره
          </Button>
          <Button variant="ghost" onClick={onClose} bgColor={'gray.300'} >انصراف</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditCategoryModal;
