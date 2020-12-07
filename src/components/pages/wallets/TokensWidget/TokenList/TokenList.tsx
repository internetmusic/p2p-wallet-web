import React, { FunctionComponent } from 'react';

import { styled } from '@linaria/react';

import { TokenAccount } from 'api/token/TokenAccount';

import { TokenRow } from '../TokenRow';

const Wrapper = styled.div`
  display: grid;
  grid-gap: 10px;
`;

type Props = {
  items: TokenAccount[];
};

export const TokenList: FunctionComponent<Props> = ({ items = [] }) => {
  return (
    <Wrapper>
      {items.map((item) => (
        <TokenRow key={item.address.toBase58()} token={item} />
      ))}
    </Wrapper>
  );
};