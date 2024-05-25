import Header from "../components/Header/Header";
import { Outlet } from 'react-router-dom';
import { useAppContext } from "../store/app-context/app-context";
import React from 'react';

const PublicRouter = () => {
  const { loadingContext } = useAppContext();
  if (loadingContext) {
    return <div>Loading...</div>
  }
    return (
        <>
          <Outlet />
        </>
    )
}
export default PublicRouter