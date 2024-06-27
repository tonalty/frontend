import { RefreshIcon } from '@/icons/RefreshIcon';
import { Triggers } from '@/interfaces/Triggers';
import { Button, Caption, Switch } from '@telegram-apps/telegram-ui';
import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';
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
  trigger: Triggers;
}

export const SetupTasksForm = ({ id, trigger }: Props) => {
  const [referralSwitchValue, setReferralSwitchValue] = useState(trigger?.referral.isEnabled);
  const onChangeReferralSwitch = (e) => {
    setReferralSwitchValue(e.target.checked);
  };

  const [inviterInputValue, setInviterInputValue] = useState(trigger?.referral.inviterPoints);
  const onChangeReferralInput = (e) => {
    if (Number(e.target.value) || e.target.value === '') {
      setInviterInputValue(e.target.value);
    }
  };

  const [reactionSwitchValue, setReactionSwitchValue] = useState(trigger?.reaction.isEnabled);
  const onChangeReactionSwitch = (e) => {
    setReactionSwitchValue(e.target.checked);
  };

  const [reactionInputQtyValue, setReactionInputQtyValue] = useState(trigger?.reaction.threshold);
  const onChangeInputQty = (e) => {
    if (Number(e.target.value) || e.target.value === '') {
      setReactionInputQtyValue(e.target.value);
    }
  };

  const [reactionPointsValue, setReactionPointsValue] = useState(trigger?.reaction.points);
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
          inviteePoints: -1,
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
      {trigger?.referral && (
        <InputSwitchContainer>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Switch checked={referralSwitchValue} onChange={onChangeReferralSwitch} />
            <Caption>Referral invited</Caption>
          </div>

          <Input
            disabled={!referralSwitchValue}
            placeholder="Points"
            value={inviterInputValue}
            onChange={onChangeReferralInput}
            header="Points"
          />
        </InputSwitchContainer>
      )}

      {trigger?.reaction && (
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
