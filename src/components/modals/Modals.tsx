import { ModalRenderer } from 'react-modal-state';

// import { ModalAllRewards } from './ModalAllRewards';
import { ModalCreateOrUpdateReward } from './ModalCreateOrUpdateReward';
import { ModalOwnedReward } from './ModalOwnedReward';
// import { ModalEarnPoints } from './ModalEarnPoints';
// import { ModalNewCommunity } from './ModalNewCommunity/ModalNewCommunity';
import { ModalReward } from './ModalReward';

// TODO: all modals
export const Modals = () => {
  return (
    <>
      <ModalRenderer Component={ModalReward} />
      <ModalRenderer Component={ModalOwnedReward} />
      {/* <ModalRenderer Component={ModalEarnPoints} />
      <ModalRenderer Component={ModalAllRewards} />
  <ModalRenderer Component={ModalNewCommunity} />*/}
      <ModalRenderer Component={ModalCreateOrUpdateReward} />
    </>
  );
};
