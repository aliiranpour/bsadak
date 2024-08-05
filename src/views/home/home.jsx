import React from 'react';
import { Box, Flex, Button, Link, Heading } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import image1Desktop from '../../assets/img/home/desktop-bg.png';
import image1Tablet from '../../assets/img/home/tablet-bg.png';
import image1Mobile from '../../assets/img/home/mobile-bg.png';
import whysepand1 from '../../assets/img/home/ثبت حضور غیاب و جریمه پرسنل.png';
import whysepand2 from '../../assets/img/home/ثبت قراردادها و حسابداری.png';
import whysepand3 from '../../assets/img/home/ثبت قراردادها و حسابداری (2).png';
import yekan from '../../assets/font/BYekan/BYekan+.ttf';

const Home = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Box>
      <Box
        position="relative"
        height="100vh"
        width="100%"
        overflow="hidden"
      >
        <Box
          bgImage={{
            base: `url(${image1Mobile})`,
            md: `url(${image1Tablet})`,
            lg: `url(${image1Desktop})`,
          }}
          bgSize="cover"
          bgPosition="center"
          height="100%"
          width="100%"
          position="absolute"
          top="0"
          left="0"
          zIndex="-1"
        />
        <Box
          w="100%"
          p={4}
          color="white"
          position="absolute"
          top="0"
          zIndex="10"
        >
          <Flex
            // justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
          >
            <Box mt={10} textAlign="center">
              <Link href="#" px={2} color="white" fontSize={{ base: "14px", md: "20px" }} mx={2}>راهنما</Link>
              <Link href="#" px={2} color="white" fontSize={{ base: "14px", md: "20px" }} mx={2}> وبلاگ </Link>
              <Link href="#" px={2} color="white" fontSize={{ base: "14px", md: "20px" }} mx={2}>تماس با ما </Link>
            </Box>
          </Flex>
        </Box>

        <Flex
          direction="column"
          alignItems="center"
          justifyContent="center"
          height="100%"
          position="relative"
          zIndex="1"
          textAlign="center"
          color="white"
        >
          <Heading mb={4} fontFamily={yekan} fontSize={{ base: "24px", md: "32px" }}>به سامانه سپند خوش آمدید</Heading>
          <RouterLink to="/auth/auth/login">
            <Button colorScheme="teal" size="lg" borderRadius={5} px={65} h={'50px'} my={3} bgColor={'gray.600'} fontSize={{ base: "16px", md: "20px" }}>ورود به سامانه سپند</Button>
          </RouterLink>
        </Flex>
      </Box>

      <Box mt={10} width="95%" mx="auto">
        <Box borderBottom={'1px solid black'} mb={55} pb={10}>
          <Heading fontFamily={yekan} fontSize={{ base: "20px", md: "28px" }}>
            بخشی از ویژگی‌های سامانه سپند
          </Heading>
        </Box>
        <Box width="85%" mx="auto">
          <Slider {...sliderSettings}>
            <Box borderRadius={5}>
              <img src={whysepand2} alt="Slide 1" style={{ width: '100%', height: 'auto' }} />
            </Box>
            <Box>
              <img src={whysepand1} alt="Slide 2" style={{ width: '100%', height: 'auto' }} borderRadius={5} />
            </Box>
            <Box>
              <img src={whysepand3} alt="Slide 3" style={{ width: '100%', height: 'auto' }} borderRadius={5} />
            </Box>
          </Slider>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
