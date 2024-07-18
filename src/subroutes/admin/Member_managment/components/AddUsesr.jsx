import React, { useState } from 'react';
import {
  Box, Button, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Select
} from '@chakra-ui/react';

const AddUserModal = ({ isOpen, onClose, onAddUser, positions }) => {

  const [newUser, setNewUser] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    position: '',
    tel: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = () => {
    onAddUser(newUser);
    setNewUser({
      first_name: '',
      last_name: '',
      username: '',
      password: '',
      position: '',
      tel: ''
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>افزودن کاربر</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="نام"
            name="first_name"
            value={newUser.first_name}
            onChange={handleChange}
            mb={2}
          />
          <Input
            placeholder="نام خانوادگی"
            name="last_name"
            value={newUser.last_name}
            onChange={handleChange}
            mb={2}
          />
          <Input
            placeholder="نام کاربری"
            name="username"
            value={newUser.username}
            onChange={handleChange}
            mb={2}
          />
          <Input
            placeholder="رمز عبور"
            name="password"
            value={newUser.password}
            onChange={handleChange}
            mb={2}
          />
          <Select
            placeholder="انتخاب موقعیت"
            name="position"
            value={newUser.position}
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
            value={newUser.tel}
            onChange={handleChange}
            mb={2}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleAddUser}>
            افزودن
          </Button>
          <Button variant="ghost" onClick={onClose}>لغو</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddUserModal;

