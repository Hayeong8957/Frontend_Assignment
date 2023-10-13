import React from 'react';
import { MutatingDots } from 'react-loader-spinner';

function Loading() {
  return (
    <>
      <MutatingDots
        height='30'
        width='30'
        color='#3478F6'
        secondaryColor='#3478F6'
        radius='12.5'
        ariaLabel='mutating-dots-loading'
        wrapperStyle={{}}
        wrapperClass=''
        visible={true}
      />
    </>
  );
}

export default Loading;
