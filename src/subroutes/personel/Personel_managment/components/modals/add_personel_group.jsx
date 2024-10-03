import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  Input,
  VStack,
  Checkbox,
  CheckboxGroup,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';

const AddPersonnelToGroupModal = ({ isOpen, onClose }) => {
  const [groups, setGroups] = useState([]);
  const [personnelList, setPersonnelList] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedPersonnel, setSelectedPersonnel] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const toast = useToast();

  useEffect(() => {
    if (isOpen) {
      const fetchGroups = async () => {
        try {
          const response = await axios.post('https://api.bsadak.ir/api/group/company', {}, {
            headers: {
              'Authorization': localStorage.getItem('accessToken'),
              'Content-Type': 'application/json',
            },
          });
          if (Array.isArray(response.data.data)) {
            // Filter out groups where Company is null
            const validGroups = response.data.data.filter(group => group.Company !== null);
            setGroups(validGroups);
          } else {
            console.error('Invalid data format:', response.data);
          }
        } catch (error) {
          console.error('Error fetching groups:', error);
        }
      };

      fetchGroups();
    }
  }, [isOpen]);

  const handleGroupChange = async (event) => {
    const groupId = event.target.value;
    setSelectedGroup(groupId);
    setSelectedPersonnel([]); 

    if (groupId) {
      try {
        const response = await axios.get(`https://api.bsadak.ir/api/group/join/${groupId}`, {
          headers: {
            'Authorization': localStorage.getItem('accessToken'),
            'Content-Type': 'application/json',
          },
        });
        if (Array.isArray(response.data.data)) {
          setPersonnelList(response.data.data);
        } else {
          console.error('Invalid data format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching personnel:', error);
      }
    }
  };

  const handlePersonnelChange = (personnelId) => {
    setSelectedPersonnel((prevSelected) => {
      if (prevSelected.includes(personnelId)) {
        return prevSelected.filter((id) => id !== personnelId);
      } else {
        return [...prevSelected, personnelId];
      }
    });
  };

  const handleSubmit = async () => {
    const selectedGroupData = groups.find((group) => group._id === selectedGroup);
    const selectedPersonnelData = personnelList.filter((person) =>
      selectedPersonnel.includes(person._id)
    );

    if (selectedGroupData && selectedPersonnelData.length > 0) {
      const body = selectedPersonnelData.map((person) => ({
        Personnel: person._id,
        Company: selectedGroupData.Company?._id,
        Year: selectedGroupData.Year?._id,
      }));

      try {
        await Promise.all(
          body.map(async (personnelData) => {
            await axios.post('https://api.bsadak.ir/api/group/join/', personnelData, {
              headers: {
                'Authorization': localStorage.getItem('accessToken'),
                'Content-Type': 'application/json',
              },
            });
          })
        );
        toast({
          title: 'موفقیت',
          description: 'پرسنل‌ها با موفقیت به گروه اضافه شدند.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        onClose();
      } catch (error) {
        console.error('خطا در افزودن پرسنل به گروه:', error);
        toast({
          title: 'خطا',
          description: 'افزودن پرسنل به گروه با شکست مواجه شد.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  const filteredPersonnelList = personnelList.filter(
    (person) =>
      person.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(person.PersonnelCode).includes(searchQuery)
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>افزودن پرسنل به گروه</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <Select placeholder="انتخاب گروه" onChange={handleGroupChange}>
              {groups.map((group) => (
                <option key={group._id} value={group._id}>
                  {group.Company?.Name} ({group.Year?.Number})
                </option>
              ))}
            </Select>

            <Input
              placeholder="جستجو بر اساس نام یا کد پرسنلی"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              isDisabled={!selectedGroup}
            />

            <CheckboxGroup
              value={selectedPersonnel}
              onChange={(values) => setSelectedPersonnel(values)}
            >
              {filteredPersonnelList.map((person) => (
                <Checkbox key={person._id} value={person._id}>
                  {person.Name} {person.LastName} ({person.PersonnelCode})
                </Checkbox>
              ))}
            </CheckboxGroup>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            onClick={handleSubmit}
            isDisabled={selectedPersonnel.length === 0}
          >
            ثبت پرسنل‌ها
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddPersonnelToGroupModal;
