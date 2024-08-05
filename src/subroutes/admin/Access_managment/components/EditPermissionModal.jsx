import React, { useState, useEffect } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Input, Box
} from '@chakra-ui/react';
import axios from 'axios';

const EditPermissionModal = ({ isOpen, onClose, onEditPermission, permission }) => {
  const [editedPermission, setEditedPermission] = useState(permission ? permission.Name : '');
  const [editedCode, setEditedCode] = useState(permission ? permission.Code : '');
  const [error, setError] = useState('');

  useEffect(() => {
    setEditedPermission(permission ? permission.Name : '');
    setEditedCode(permission ? permission.Code : '');
  }, [permission]);

  const handleSaveChanges = async () => {
    try {
      const response = await axios.patch(`https://api.bsadak.ir/api/admin/permision/${permission._id}`, {
        Name: editedPermission,
        Code: editedCode
      }, {
        headers: {
          'Authorization': ` ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json'
        }
      });
      onEditPermission(response.data);
      onClose();
    } catch (error) {
      console.error('Error editing permission', error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgColor={'gray.200'}>
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
          <Input
            placeholder="کد دسترسی"
            value={editedCode}
            onChange={(e) => setEditedCode(e.target.value)}
            mb={2}
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>لغو</Button>
          <Button colorScheme="green" mr={3} onClick={handleSaveChanges}>
            ذخیره
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditPermissionModal;
