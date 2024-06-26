import React from 'react';
import { useNavigate } from 'react-router-dom';

const Page23 = () => {
  const navigate = useNavigate();

  const goToNextPage = () => {
    navigate('/Page24');
  };

  return (
    <div>
      <h1>Page 23</h1>
      <button onClick={goToNextPage}>Go to Page 24</button>
    </div>
  );
};

export default Page23;
