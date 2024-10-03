import React from 'react';
import {
  Box, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, VStack, Tag, TagLabel, TagCloseButton
} from '@chakra-ui/react';

const ViewPermissionsModal = ({ isOpen, onClose, level, allPermissions }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>نمایش دسترسی‌ها</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mb={2} borderWidth="1px" borderRadius="lg" p={2} maxH="200px" overflowY="auto">
            <VStack align="start">
              {level.Permisions.map((permissionId) => {
                const permission = allPermissions.find((p) => p._id === permissionId);
                return (
                  <Tag size="lg" key={permissionId} variant="solid" colorScheme="teal" borderRadius={5}>
                    <TagLabel>{permissionId?.Name || 'نامشخص'}</TagLabel>
                  </Tag>
                );
              })}
            </VStack>
          </Box>
        </ModalBody>
        <Button 
          variant="ghost"
          onClick={onClose}
          colorScheme="blackAlpha"
          bgColor="blackAlpha.800"
          color="white"
          borderRadius={5}
        >
          بستن
        </Button>
      </ModalContent>
    </Modal>
  );
};

export default ViewPermissionsModal;
