import { useState } from 'react';
import { Button, Caption, Switch } from '@telegram-apps/telegram-ui';
import axios from 'axios';
import styled from 'styled-components';

import { RefreshIcon } from '@/icons/RefreshIcon';
import { Triggers } from '@/interfaces/Triggers';
import { Input } from './telegram-ui/Form/Input/Input';

const InputSwitchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
`;

const ReactionSwitcherContainer = styled.div`
  display: flex;
  gap: 20px;
`;

interface Props {
  id: number;
  triggers: Triggers;
}

export const SetupTasksForm = ({ id, triggers }: Props) => {
  const [referralSwitchValue, setReferralSwitchValue] = useState(triggers?.referral.isEnabled);
  const onChangeReferralSwitch = (e) => {
    setReferralSwitchValue(e.target.checked);
  };

  const [inviterInputValue, setInviterInputValue] = useState(triggers?.referral.inviterPoints);
  const onChangeReferralInviterInput = (e) => {
    if (Number(e.target.value) || e.target.value === '') {
      setInviterInputValue(e.target.value);
    }
  };

  const [inviteeInputValue, setInviteeInputValue] = useState(triggers?.referral.inviteePoints);
  const onChangeReferralInviteeInput = (e) => {
    if (Number(e.target.value) || e.target.value === '') {
      setInviteeInputValue(e.target.value);
    }
  };

  const [reactionSwitchValue, setReactionSwitchValue] = useState(triggers?.reaction.isEnabled);
  const onChangeReactionSwitch = (e) => {
    setReactionSwitchValue(e.target.checked);
  };

  const [reactionInputQtyValue, setReactionInputQtyValue] = useState(triggers?.reaction.threshold);
  const onChangeInputQty = (e) => {
    if (Number(e.target.value) || e.target.value === '') {
      setReactionInputQtyValue(e.target.value);
    }
  };

  const [reactionPointsValue, setReactionPointsValue] = useState(triggers?.reaction.points);
  const onChangeInputPoints = (e) => {
    if (Number(e.target.value) || e.target.value === '') {
      setReactionPointsValue(e.target.value);
    }
  };

  const onClickUpdate = async () => {
    const payload = {
      chatId: id,
      triggers: {
        referral: {
          inviterPoints: Number(inviterInputValue),
          inviteePoints: Number(inviteeInputValue),
          isEnabled: referralSwitchValue
        },
        reaction: {
          points: Number(reactionPointsValue),
          threshold: Number(reactionInputQtyValue),
          isEnabled: reactionSwitchValue
        }
      }
    };

    try {
      // TODO: rewrite with mutations hook
      await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/triggers/community`, payload, {
        headers: { tmaInitData: window.Telegram.WebApp.initData }
      });
    } catch (error) {
      console.log('Could not update triggers', error);
    }
  };

  return (
    <>
      {triggers?.referral && (
        <InputSwitchContainer>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Switch checked={referralSwitchValue} onChange={onChangeReferralSwitch} />
            <Caption>Referral invited</Caption>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Input
              disabled={!referralSwitchValue}
              placeholder="Points for inviter"
              value={inviterInputValue}
              onChange={onChangeReferralInviterInput}
              header="Inviter points"
            />

            <Input
              disabled={!referralSwitchValue}
              placeholder="Points for invitee"
              value={inviteeInputValue}
              onChange={onChangeReferralInviteeInput}
              header="Invitee points"
            />
          </div>
        </InputSwitchContainer>
      )}

      {triggers?.reaction && (
        <InputSwitchContainer>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Switch checked={reactionSwitchValue} onChange={onChangeReactionSwitch} />
            <Caption>Reactions</Caption>
          </div>

          <ReactionSwitcherContainer>
            <Input
              disabled={!reactionSwitchValue}
              value={reactionInputQtyValue}
              onChange={onChangeInputQty}
              placeholder="Q-ty"
              header="Q-ty"
            />
            <Input
              disabled={!reactionSwitchValue}
              header="Points"
              placeholder="Points"
              onChange={onChangeInputPoints}
              value={reactionPointsValue}
            />
          </ReactionSwitcherContainer>
        </InputSwitchContainer>
      )}
      <Button size="l" stretched before={<RefreshIcon />} onClick={onClickUpdate}>
        Update
      </Button>
    </>
  );
};
