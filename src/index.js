import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'assets/css/App.css';
import AuthLayout from 'layouts/auth/index';
import AdminLayout from 'layouts/admin';
import RtlLayout from 'layouts/rtl';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';
import { RtlProvider } from 'components/rtlProvider/RtlProvider'; 
import Home from 'views/home/home';

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <ThemeEditorProvider>
        <RtlProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/auth/*" element={<AuthLayout />} />
              <Route path="/admin/*" element={<AdminLayout />} />
              <Route path="/rtl/*" element={<RtlLayout />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </RtlProvider>
      </ThemeEditorProvider>
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById('root')
);
