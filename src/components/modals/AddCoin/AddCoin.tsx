import React, { FunctionComponent, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as web3 from '@solana/web3.js';
import { styled } from 'linaria/react';

import { Modal } from 'components/common/Modal';
import { Button } from 'components/ui';
import { TOKENS_BY_ENTRYPOINT } from 'constants/tokens';
import { createAndInitializeMint } from 'store/actions/complex/tokens';
import { RootState } from 'store/types';

import { TokenList } from './common/TokenList';

const WrapperModal = styled(Modal)`
  flex-basis: 588px;
  padding-bottom: 20px;
`;

const ScrollableContainer = styled.div`
  max-height: 668px;
  overflow-y: auto;

  &::-webkit-scrollbar-track {
    margin-bottom: 16px;
  }
`;

// const ITEMS = [
//   {
//     symbol: 'SRM',
//     name: 'Serum',
//     price: '$0.887832',
//     delta: '+16.9% for 24hrs',
//   },
//   {
//     symbol: 'MSRM',
//     name: 'MegaSerum',
//     price: '$0.887832',
//     delta: '+16.9% for 24hrs',
//   },
//   {
//     symbol: 'BTC',
//     name: 'Wrapped Bitcoin',
//     price: '$0.887832',
//     delta: '+16.9% for 24hrs',
//   },
//   {
//     symbol: 'ETH',
//     name: 'Wrapped Ethereum',
//     price: '$0.887832',
//     delta: '+16.9% for 24hrs',
//   },
//   {
//     symbol: 'FTT',
//     name: 'Wrapped FTT',
//     price: '$0.887832',
//     delta: '+16.9% for 24hrs',
//   },
//   {
//     symbol: 'YFI',
//     name: 'Wrapped YFI',
//     price: '$0.887832',
//     delta: '+16.9% for 24hrs',
//   },
//   {
//     symbol: 'YFI',
//     name: 'Wrapped YFI',
//     price: '$0.887832',
//     delta: '+16.9% for 24hrs',
//   },
// ];

type Props = {
  close: () => void;
};

export const AddCoin: FunctionComponent<Props> = ({ close }) => {
  const dispatch = useDispatch();
  const ownerAccount = useSelector((state: RootState) => state.data.blockchain.account);
  const entrypoint = useSelector((state: RootState) => state.data.blockchain.entrypoint);
  const isMainnetEntrypoint = entrypoint === web3.clusterApiUrl('mainnet-beta');
  const tokens = TOKENS_BY_ENTRYPOINT[entrypoint];

  const handleMintTestTokenClick = () => {
    if (!ownerAccount) {
      return;
    }

    dispatch(
      createAndInitializeMint({
        owner: ownerAccount,
        mint: new web3.Account(),
        amount: 1000,
        decimals: 2,
        initialAccount: new web3.Account(),
      }),
    );
  };

  const filteredTokens = useMemo(() => tokens, [tokens]);

  return (
    <WrapperModal
      title="Add coins"
      description={
        <>
          Add a token to your wallet. This will cost 0.002039 SOL.
          {!isMainnetEntrypoint ? (
            <>
              {' '}
              <Button link onClick={handleMintTestTokenClick}>
                Mint test token
              </Button>
            </>
          ) : null}
        </>
      }
      close={close}>
      <ScrollableContainer>
        <TokenList items={tokens} />
      </ScrollableContainer>
    </WrapperModal>
  );
};