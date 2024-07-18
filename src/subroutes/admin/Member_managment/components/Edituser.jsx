import React from 'react';
import {
  Box, Button, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Select
} from '@chakra-ui/react';

const EditUserModal = ({ isOpen, onClose, onEditUser, user, positions }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onEditUser({ ...user, [name]: value });
  };

  const handleSaveUser = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>ویرایش کاربر</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="نام"
            name="first_name"
            value={user.first_name}
            onChange={handleChange}
            mb={2}
          />
          <Input
            placeholder="نام خانوادگی"
            name="last_name"
            value={user.last_name}
            onChange={handleChange}
            mb={2}
          />
          <Input
            placeholder="نام کاربری"
            name="username"
            value={user.username}
            onChange={handleChange}
            mb={2}
          />
          <Input
            placeholder="رمز عبور"
            name="password"
            value={user.password}
            onChange={handleChange}
            mb={2}
          />
          <Select
            placeholder="انتخاب موقعیت"
            name="position"
            value={user.position}
            onChange={handleChange}
            mb={2}
          >
            {positions.map((pos) => (
              <option key={pos.id} value={pos.name}>{pos.name}</option>
            ))}
          </Select>
          <Input
            placeholder="تلفن"
            name="tel"
            value={user.tel}
            onChange={handleChange}
            mb={2}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSaveUser}>
            ذخیره
          </Button>
          <Button variant="ghost" onClick={onClose}>لغو</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditUserModal;
