import React, { useState } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Input, Box
} from '@chakra-ui/react';

const AddPermissionModal = ({ isOpen, onClose, onAddPermission, allPermissions }) => {
  const [newPermission, setNewPermission] = useState('');
  const [error, setError] = useState('');

  const handleAddPermission = () => {
    if (allPermissions.includes(newPermission)) {
      setError('این دسترسی از قبل وجود دارد!');
    } else {
      onAddPermission(newPermission);
      setNewPermission('');
      setError('');
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>افزودن دسترسی</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="نام دسترسی"
            value={newPermission}
            onChange={(e) => setNewPermission(e.target.value)}
            mb={2}
          />
          {error && <Box color="red.500">{error}</Box>}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={handleAddPermission}>
            افزودن
          </Button>
          <Button variant="ghost" onClick={onClose}>لغو</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddPermissionModal;
