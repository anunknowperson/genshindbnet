import { PageWrapper } from '../../components/PageWrapper/PageWrapper';
import { Footer } from '../Footer/Footer';
import Header from '../Header/Header';

import { appWithTranslation, useTranslation } from "next-i18next";

export function Layout({children}) {
   
    return (
      <>
        <Header/>
        <PageWrapper>
            {children}
        </PageWrapper>
        <Footer/>
      </>
      
    );
  }