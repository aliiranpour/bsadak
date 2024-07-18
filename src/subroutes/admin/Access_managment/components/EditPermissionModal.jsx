import React, { useState, useEffect } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Input, Box
} from '@chakra-ui/react';

const EditPermissionModal = ({ isOpen, onClose, onEditPermission, initialPermission, allPermissions }) => {
  const [editedPermission, setEditedPermission] = useState(initialPermission);
  const [error, setError] = useState('');

  useEffect(() => {
    setEditedPermission(initialPermission);
  }, [initialPermission]);

  const handleSaveChanges = () => {
    if (allPermissions.includes(editedPermission) && editedPermission !== initialPermission) {
      setError('این دسترسی از قبل وجود دارد!');
    } else {
      onEditPermission(editedPermission);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>ویرایش دسترسی</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="نام دسترسی"
            value={editedPermission}
            onChange={(e) => setEditedPermission(e.target.value)}
            mb={2}
          />
          {error && <Box color="red.500">{error}</Box>}
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

export default EditPermissionModal;
