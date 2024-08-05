import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, VStack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import api from '../../../utils/api';
import yekan from '../../../assets/font/BYekan/BYekan+.ttf';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');

  const onSubmit = async (data) => {
    try {
      const response = await api.post('/web/login', {
        phone: data.username,
        pass: data.password,
      });

      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);

      api.defaults.headers.common['Authorization'] = response.data.accessToken;

      console.log('Login successful', response.data);

      navigate('/admin/admin/counter');
    } catch (error) {
      console.error('Error logging in', error);
      setLoginError('نام کاربری و رمز عبور اشتباه است');
    }
  };

  return (
    <Flex
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
      bgColor="green.900"
      p={{ base: 4, md: 8 }}
    >
      <Box
        width={{ base: "100%", sm: "400px" }}
        p={{ base: 6, md: 8 }}
        borderRadius={10}
        boxShadow="lg"
        bgColor="gray.300"
        position="relative"
      >
        <Box position="absolute" top="-40px" left="50%" transform="translateX(-50%)">
          <Heading as="h1" fontSize={{ base: 20, md: 25 }} textAlign="center" color="white" px={6} py={2} mb={4} borderRadius="8px" fontFamily={yekan}>
            ورود به سامانه سپند
          </Heading>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4} dir='rtl'>
            <FormControl id="username" isInvalid={errors.username}>
              <FormLabel>نام کاربری</FormLabel>
              <Input
                type="text"
                bgColor={"green.900"}
                color={'white'}
                {...register('username', { required: 'نام کاربری الزامی است' })}
              />
              {errors.username && <Text color="red.500">{errors.username.message}</Text>}
            </FormControl>
            <FormControl id="password" isInvalid={errors.password} mb={4}>
              <FormLabel>رمز ورود</FormLabel>
              <Input
                type="password"
                bgColor={"green.900"}
                color={'white'}
                {...register('password', { required: 'رمز ورود الزامی است' })}
              />
              {errors.password && <Text color="red.500">{errors.password.message}</Text>}
            </FormControl>
            {loginError && <Text color="red.500">{loginError}</Text>}
            <Button
              type="submit"
              colorScheme="teal"
              width="full"
              borderRadius={5}
              bgColor={'#238636'}
              mt={4}
            >
              ورود
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default Login;
