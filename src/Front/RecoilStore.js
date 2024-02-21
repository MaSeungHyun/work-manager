import React from 'react';
import { RecoilRoot } from 'recoil';

export default function RecoilStore(props) {
  return (
    <>
      <RecoilRoot>{props.children}</RecoilRoot>
    </>
  );
}
