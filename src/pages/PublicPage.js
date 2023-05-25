import { useNavigate } from "react-router-dom";
import React from 'react';

export function PublicPage() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Public page</h1>

      <button onClick={() => navigate('/login')}>Log in</button>
    </>
  );
}
