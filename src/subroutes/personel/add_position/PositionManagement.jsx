import React, { useState, useRef } from 'react';
import {
  Box, Button, Heading, Table, Thead, Tbody, Tr, Th, Td, Flex, IconButton, useDisclosure, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, useBreakpointValue, useMediaQuery
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, AddIcon } from '@chakra-ui/icons';
import AddPositionModal from './components/AddPositionModal';
import EditPositionModal from './components/EditPositionModal';
import DetailPositionModal from './components/DetailPositionModal';
import yekan from '../../../assets/font/BYekan/BYekan+.ttf';

const initialPositions = [
  { id: 1, name: 'مدیر', description: 'مدیر شرکت' },
  { id: 2, name: 'کارشناس', description: 'کارشناس فنی' }
];

const PositionManagement = () => {
  const [positions, setPositions] = useState(initialPositions);
  const [editPosition, setEditPosition] = useState(null);
  const [detailPosition, setDetailPosition] = useState(null);
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isDetailOpen, onOpen: onDetailOpen, onClose: onDetailClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const cancelRef = useRef();

  const handleAddPosition = (newPosition) => {
    setPositions([...positions, newPosition]);
  };

  const handleEditPosition = (updatedPosition) => {
    setPositions(positions.map(p => p.id === updatedPosition.id ? updatedPosition : p));
    setEditPosition(null);
    onEditClose();
  };

  const handleDeletePosition = () => {
    setPositions(positions.filter(p => p.id !== editPosition.id));
    setEditPosition(null);
    onDeleteClose();
  };

  const handleEditClick = (position) => {
    setEditPosition(position);
    onEditOpen();
  };

  const handleDeleteClick = (position) => {
    setEditPosition(position);
    onDeleteOpen();
  };

  const handleRowClick = (position) => {
    setDetailPosition(position);
    onDetailOpen();
  };

  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const headingFontSize = useBreakpointValue({ base: 'lg', md: 'xl' });
  const textFontSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  const truncateText = (text, length) => (text.length > length ? `${text.substring(0, length)}...` : text);

  return (
    <Box p={5}>
      <Flex justifyContent="space-between" alignItems="center" mb={5} flexDirection={isMobile ? 'column' : 'row'}>
        <Heading fontSize={headingFontSize} mb={isMobile ? 4 : 0} fontFamily={yekan}>مدیریت سمت‌ها</Heading>
        <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={onAddOpen} size={buttonSize} w={isMobile ? '100%' : 'auto'}>
          افزودن سمت جدید
        </Button>
      </Flex>
      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th fontSize={textFontSize} fontFamily={yekan} textAlign="center">نام سمت</Th>
              <Th fontSize={textFontSize} fontFamily={yekan} textAlign="center">توضیحات</Th>
              <Th fontSize={textFontSize} fontFamily={yekan} textAlign="center">عملیات</Th>
            </Tr>
          </Thead>
          <Tbody>
            {positions.map((position) => (
              <Tr key={position.id} onClick={() => handleRowClick(position)} cursor="pointer">
                <Td fontSize={textFontSize} textAlign="center">{position.name}</Td>
                <Td fontSize={textFontSize} textAlign="center">{truncateText(position.description, 20)}</Td>
                <Td>
                  <Flex justifyContent="center">
                    <Button
                      leftIcon={<EditIcon />}
                      size={buttonSize}
                      colorScheme="blue"
                      onClick={(e) => { e.stopPropagation(); handleEditClick(position); }}
                      mr={2}
                    >
                      ویرایش
                    </Button>
                    <Button
                      leftIcon={<DeleteIcon />}
                      size={buttonSize}
                      colorScheme="red"
                      onClick={(e) => { e.stopPropagation(); handleDeleteClick(position); }}
                    >
                      حذف
                    </Button>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <AddPositionModal
        isOpen={isAddOpen}
        onClose={onAddClose}
        onAddPosition={handleAddPosition}
      />

      {editPosition && (
        <EditPositionModal
          isOpen={isEditOpen}
          onClose={onEditClose}
          onEditPosition={handleEditPosition}
          initialPosition={editPosition}
        />
      )}

      {detailPosition && (
        <DetailPositionModal
          isOpen={isDetailOpen}
          onClose={onDetailClose}
          position={detailPosition}
        />
      )}

      <AlertDialog isOpen={isDeleteOpen} leastDestructiveRef={cancelRef} onClose={onDeleteClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              حذف سمت
            </AlertDialogHeader>
            <AlertDialogBody>
              آیا مطمئن هستید که می‌خواهید این سمت را حذف کنید؟
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                لغو
              </Button>
              <Button colorScheme="red" onClick={handleDeletePosition} ml={3}>
                حذف
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default PositionManagement;
