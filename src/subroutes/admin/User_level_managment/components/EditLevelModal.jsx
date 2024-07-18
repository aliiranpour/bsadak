import React, { useState, useEffect } from 'react';
import {
  Box, Button, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Checkbox, Menu, MenuButton, MenuList, MenuItem
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

const EditLevelModal = ({ isOpen, onClose, onEditLevel, level, allPermissions }) => {
  const [editedLevel, setEditedLevel] = useState(level);

  useEffect(() => {
    setEditedLevel(level);
  }, [level]);

  const handlePermissionChange = (permission) => {
    setEditedLevel((prevLevel) => ({
      ...prevLevel,
      permissions: prevLevel.permissions.includes(permission)
        ? prevLevel.permissions.filter((p) => p !== permission)
        : [...prevLevel.permissions, permission]
    }));
  };

  const handleSaveChanges = () => {
    onEditLevel(editedLevel);
    onClose();
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
            name="name"
            value={editedLevel.name}
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
                    isChecked={editedLevel.permissions.includes(permission)}
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
          <Button colorScheme="blue" mr={3} onClick={handleSaveChanges}>
            ذخیره
          </Button>
          <Button variant="ghost" onClick={onClose}>لغو</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditLevelModal;
