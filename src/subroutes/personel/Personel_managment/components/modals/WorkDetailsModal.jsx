import React, { useEffect, useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Table, Thead, Tbody, Tr, Th, Td, Button, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const WorkDetailsModal = ({ isOpen, onClose, personId }) => {
  const [workDetails, setWorkDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (personId) {
      fetchWorkDetails();
    }
  }, [personId]);

  const fetchWorkDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.bsadak.ir/api/work/workPersonnel/${personId}`, {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'application/json',
        },
      });
      setWorkDetails(response.data);
    } catch (error) {
      console.error('Error fetching work details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewAttendance = (monthNumber) => {
    navigate(`/attendance/${personId}/${monthNumber}`);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>جزئیات کارکرد</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {loading ? (
            <Spinner size="xl" />
          ) : (
            <Table variant="striped" mt={5}>
              <Thead>
                <Tr>
                  <Th>ماه</Th>
                  <Th>تعداد روز کاری</Th>
                  <Th>تعداد روز بیمه</Th>
                  <Th>مشاهده حضور غیاب</Th>
                </Tr>
              </Thead>
              <Tbody>
                {workDetails.data.map((item) => (
                  <Tr key={item._id}>
                    <Td>{item.Month.Name}</Td>
                    <Td>{item.Days}</Td>
                    <Td>{item.DayInsurance}</Td>
                    <Td>
                      <Button colorScheme="teal" onClick={() => handleViewAttendance(item.Month.Number)}>
                        مشاهده
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} colorScheme="blue">
            بستن
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default WorkDetailsModal;
