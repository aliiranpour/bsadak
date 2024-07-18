import React, { useState } from 'react';
import {
  Box, Button, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Checkbox, Menu, MenuButton, MenuList, MenuItem
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

const AddLevelModal = ({ isOpen, onClose, onAddLevel, allPermissions }) => {
  const [newLevel, setNewLevel] = useState({
    name: '',
    permissions: []
  });

  const handlePermissionChange = (permission) => {
    setNewLevel((prevLevel) => ({
      ...prevLevel,
      permissions: prevLevel.permissions.includes(permission)
        ? prevLevel.permissions.filter((p) => p !== permission)
        : [...prevLevel.permissions, permission]
    }));
  };

  const handleAddLevel = () => {
    onAddLevel(newLevel);
    setNewLevel({
      name: '',
      permissions: []
    });
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewLevel({ ...newLevel, [name]: value });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>افزودن سطح کاربری</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="نام سطح کاربری"
            name="name"
            value={newLevel.name}
            onChange={handleChange}
            mb={2}
          />
          <Menu closeOnSelect={false}>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} mb={2}>
              انتخاب دسترسی‌ها
            </MenuButton>
            <MenuList maxH="200px" overflowY="auto">
              {allPermissions.map((permission) => (
                <MenuItem key={permission}>
                  <Checkbox
                    isChecked={newLevel.permissions.includes(permission)}
                    onChange={() => handlePermissionChange(permission)}
                  >
                    {permission}
                  </Checkbox>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleAddLevel}>
            افزودن
          </Button>
          <Button variant="ghost" onClick={onClose}>لغو</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddLevelModal;
