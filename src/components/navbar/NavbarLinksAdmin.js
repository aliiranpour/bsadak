// Chakra Imports
import {
	Avatar,
	Flex,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
	useColorModeValue
  } from '@chakra-ui/react';
  // Custom Components
  import SidebarResponsive from 'components/sidebar/components/SidebarResponsive';
  import PropTypes from 'prop-types';
  import React from 'react';
  import { useNavigate } from 'react-router-dom'; 
  // Assets
  import routes from 'routes.js';
  
  export default function HeaderLinks(props) {
	const { secondary } = props;
	const navigate = useNavigate(); 

	let menuBg = useColorModeValue('white', 'navy.800');
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const borderColor = useColorModeValue('#E6ECFA', 'rgba(135, 140, 189, 0.3)');
	const shadow = useColorModeValue(
	  '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
	  '14px 17px 40px 4px rgba(112, 144, 176, 0.06)'
	);
  

	const logout = () => {
	  localStorage.removeItem('accessToken');
	  localStorage.removeItem('refreshToken');
	  navigate('/auth/auth/login'); // هدایت به صفحه ورود
	};
  
	return (
	  <Flex
		w={{ sm: '100px', md: 'auto' }}
		alignItems="center"
		justifyContent="space-around"
		flexDirection="row"
		bg={menuBg}
		flexWrap={secondary ? { base: 'wrap', md: 'nowrap' } : 'unset'}
		p="10px"
		borderRadius="30px"
		boxShadow={shadow}>
		{/* <SearchBar mb={secondary ? { base: '10px', md: 'unset' } : 'unset'} me="10px" borderRadius="30px" /> */}
  
		<SidebarResponsive routes={routes} />
  
		<Menu>
		  <MenuButton p="0px">
			<Avatar
			  _hover={{ cursor: 'pointer' }}
			  color="white"
			  name="وحید رمضانی"
			  bg="#11047A"
			  size="sm"
			  w="40px"
			  h="40px"
			/>
		  </MenuButton>
		  <MenuList boxShadow={shadow} p="0px" mt="10px" borderRadius="20px" bg={menuBg} border="none">
			<Flex w="100%" mb="0px">
			  <Text
				ps="20px"
				pt="16px"
				pb="10px"
				w="100%"
				borderBottom="1px solid"
				borderColor={borderColor}
				fontSize="sm"
				fontWeight="700"
				color={textColor}>
				وحید رمضانی
			  </Text>
			</Flex>
			<Flex flexDirection="column" p="10px">
			  {/* <MenuItem _hover={{ bg: 'none' }} _focus={{ bg: 'none' }} borderRadius="8px" px="14px">
				<Text fontSize="sm">تنظیمات پروفایل</Text>
			  </MenuItem> */}
			  <MenuItem
				_hover={{ bg: 'none' }}
				_focus={{ bg: 'none' }}
				color="red.400"
				borderRadius="8px"
				px="14px"
				onClick={logout} 
			  >
				<Text fontSize="sm">خروج</Text>
			  </MenuItem>
			</Flex>
		  </MenuList>
		</Menu>
	  </Flex>
	);
  }
  
  HeaderLinks.propTypes = {
	variant: PropTypes.string,
	fixed: PropTypes.bool,
	secondary: PropTypes.bool,
	onOpen: PropTypes.func
  };
  