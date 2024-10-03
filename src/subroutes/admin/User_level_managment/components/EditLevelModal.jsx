import React, { useState, useEffect } from 'react';
import {
  Box, Button, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Checkbox, Menu, MenuButton, MenuList, MenuItem, Tag, TagLabel, TagCloseButton, VStack, Divider, Text
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import axios from 'axios';

const EditLevelModal = ({ isOpen, onClose, onEditLevel, level, allPermissions }) => {
  const [editedLevel, setEditedLevel] = useState({ Title: '', Permisions: [] });
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [availablePermissions, setAvailablePermissions] = useState([]);
  const [oldPermissions, setOldPermissions] = useState([]);
  const [newPermissions, setNewPermissions] = useState([]);

  useEffect(() => {
    if (level) {
      setEditedLevel(level);
      const selectedPerms = allPermissions.filter(permission =>
        level.Permisions.some(p => p._id === permission._id)
      );
      setSelectedPermissions([]);
      setOldPermissions(selectedPerms);

      // Update the available permissions
      setAvailablePermissions(getAvailablePermissions(allPermissions, level.Permisions));
    }
  }, [level, allPermissions]);

  const handlePermissionChange = (permission) => {
    setSelectedPermissions((prevPermissions) =>
      prevPermissions.includes(permission)
        ? prevPermissions.filter((p) => p !== permission)
        : [...prevPermissions, permission]
    );
  };

  const handleAddPermissions = () => {
    const newPerms = selectedPermissions.filter(p => !oldPermissions.includes(p));
    setEditedLevel((prevLevel) => ({
      ...prevLevel,
      Permisions: [...prevLevel.Permisions, ...newPerms]
    }));
    setNewPermissions(newPerms);
    setSelectedPermissions([]);
  };

  const handleRemovePermission = (permissionId) => {
    setEditedLevel((prevLevel) => ({
      ...prevLevel,
      Permisions: prevLevel.Permisions.filter((p) => p._id !== permissionId)
    }));

    // Update the available permissions when a permission is removed
    const updatedUserTypePermissions = editedLevel.Permisions.filter((p) => p._id !== permissionId);
    setAvailablePermissions(getAvailablePermissions(allPermissions, updatedUserTypePermissions));
  };

  const handleSaveChanges = async () => {
    try {
      await axios.patch(`https://api.bsadak.ir/api/admin/usertype/${editedLevel._id}`, editedLevel, {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json'
        }
      });
      onEditLevel(editedLevel);
      onClose();
    } catch (error) {
      console.error('Error saving changes', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedLevel({ ...editedLevel, [name]: value });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>ویرایش سطح کاربری</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="نام سطح کاربری"
            name="Title"
            value={editedLevel?.Title || ''}
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
          <Box mb={2} borderWidth="1px" borderRadius="lg" p={2} maxH="200px" overflowY="auto">
            <Text fontWeight="bold">دسترسی‌های قدیمی:</Text>
            <VStack align="start">
              {oldPermissions.map((permission) => (
                <Tag size="lg" key={permission._id} variant="solid" colorScheme="teal" borderRadius={5}>
                  <TagLabel>{permission?.Name || 'نامشخص'}</TagLabel>
                  <TagCloseButton onClick={() => handleRemovePermission(permission._id)} />
                </Tag>
              ))}
            </VStack>
            <Divider mt={4} mb={4} />
            <Text fontWeight="bold">دسترسی‌های جدید:</Text>
            <VStack align="start">
              {newPermissions.map((permission) => (
                <Tag size="lg" key={permission._id} variant="solid" colorScheme="blue" borderRadius={5}>
                  <TagLabel>{permission.Name}</TagLabel>
                  <TagCloseButton onClick={() => handleRemovePermission(permission._id)} />
                </Tag>
              ))}
            </VStack>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button 
            mr={3} 
            onClick={handleSaveChanges}
            colorScheme="green"
            color="white"
            bgColor="green.700"
            borderRadius={5}
          >
            ذخیره تغییرات
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

const getAvailablePermissions = (allPermissions, userTypePermissions) => {
  const userTypePermissionIds = userTypePermissions.map(permission => permission._id);
  const availablePermissions = allPermissions.filter(permission => 
    !userTypePermissionIds.includes(permission._id)
  );
  return availablePermissions;
};

export default EditLevelModal;
