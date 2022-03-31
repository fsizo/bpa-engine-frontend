import React from 'react';
import './styles/update.css'
import Header from './Header';
import Content from './Content';
import { getTheme } from '@fluentui/react';

const theme = getTheme()

function App({ Component, pageProps }) {
  return (
    <>
      <Header theme={theme}/>
      <Content theme={theme}/>
    </>
  )
}

export default App

