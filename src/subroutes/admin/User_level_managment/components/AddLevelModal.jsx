import React, { useState } from 'react';
import {
  Box, Button, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Checkbox, Menu, MenuButton, MenuList, MenuItem, Tag, TagLabel, TagCloseButton, VStack
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import axios from 'axios';

const AddLevelModal = ({ isOpen, onClose, onAddLevel, allPermissions }) => {
  const [newLevel, setNewLevel] = useState({
    Title: '',
    Permisions: []
  });

  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const handlePermissionChange = (permission) => {
    setSelectedPermissions((prevPermissions) =>
      prevPermissions.includes(permission)
        ? prevPermissions.filter((p) => p !== permission)
        : [...prevPermissions, permission]
    );
  };

  const handleAddPermissions = () => {
    setNewLevel((prevLevel) => ({
      ...prevLevel,
      Permisions: [...prevLevel.Permisions, ...selectedPermissions.map((p) => p._id)]
    }));
    setSelectedPermissions([]);
  };

  const handleRemovePermission = (permissionId) => {
    setNewLevel((prevLevel) => ({
      ...prevLevel,
      Permisions: prevLevel.Permisions.filter((p) => p !== permissionId)
    }));
  };

  const handleAddLevel = async () => {
    try {
      const response = await axios.post('https://api.bsadak.ir/api/admin/usertype', newLevel, {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json'
        }
      });
      onAddLevel(response.data.data);
      setNewLevel({
        Title: '',
        Permisions: []
      });
      onClose();
      window.location.reload(); 
    } catch (error) {
      console.error('Error adding level', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewLevel({ ...newLevel, [name]: value });
  };

  const availablePermissions = allPermissions.filter(
    (permission) => !newLevel.Permisions.includes(permission._id)
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>افزودن سطح کاربری</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="نام سطح کاربری"
            name="Title"
            value={newLevel.Title}
            onChange={handleChange}
            mb={2}
          />
          <Menu closeOnSelect={false}>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} mb={2} ms={2} borderRadius={5}>
              انتخاب دسترسی‌ها
            </MenuButton>
            <MenuList maxH="200px" overflowY="auto">
              {availablePermissions.map((permission) => (
                <MenuItem key={permission._id}>
                  <Checkbox
                    isChecked={selectedPermissions.includes(permission)}
                    onChange={() => handlePermissionChange(permission)}
                  >
                    {permission.Name}
                  </Checkbox>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Button 
            onClick={handleAddPermissions} 
            mb={2}
            colorScheme="green"
            color="white"
            bgColor="green.700"
            borderRadius={5}
          >
            افزودن دسترسی‌ها
          </Button>
          <Box mb={2} borderWidth="1px" borderRadius="lg" p={2}>
            <VStack align="start">
              {newLevel.Permisions.map((permissionId) => {
                const permission = allPermissions.find((p) => p._id === permissionId);
                return (
                  <Tag size="lg" key={permissionId} variant="solid" colorScheme="teal" borderRadius={5}>
                    <TagLabel>{permission.Name}</TagLabel>
                    <TagCloseButton onClick={() => handleRemovePermission(permissionId)} />
                  </Tag>
                );
              })}
            </VStack>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button 
            mr={3} 
            onClick={handleAddLevel}
            colorScheme="green"
            color="white"
            bgColor="green.700"
            borderRadius={5}
          >
            افزودن سطح کاربری
          </Button>
          <Button 
            variant="ghost"
            onClick={onClose}
            colorScheme="blackAlpha"
            bgColor="blackAlpha.800"
            color="white"
            borderRadius={5}
          >
            لغو
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddLevelModal;