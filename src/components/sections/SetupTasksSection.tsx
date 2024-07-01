import { BaseSyntheticEvent, FC, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Button, Caption, Switch } from '@telegram-apps/telegram-ui';
import styled from 'styled-components';

import { useUpdateTriggers } from '@/api/mutations';
import { RefreshIcon } from '@/icons/RefreshIcon';
import { Triggers } from '@/interfaces/Triggers';
import { setNumberInputValue } from '@/utils/setNumberInputValue';
import { QuestionTooltip } from '../QuestionTooltip';
import { SectionWithTitleContainer } from '../SectionWithCaptionContainer';
import { Section } from '../telegram-ui/Blocks';
import { Input } from '../telegram-ui/Form/Input/Input';

const InputSwitchContainer = styled.div`
  position: relative;
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
  chatId?: string | number;
  triggers?: Triggers;
}

export const SetupTasksSection: FC<Props> = ({ chatId, triggers }) => {
  const { mutateAsync: updateTriggers } = useUpdateTriggers();

  const [referralSwitchValue, setReferralSwitchValue] = useState<boolean | undefined>(
    triggers?.referral.isEnabled
  );
  const [inviterInputValue, setInviterInputValue] = useState<string | undefined>(
    triggers?.referral.inviterPoints.toString()
  );
  const [inviteeInputValue, setInviteeInputValue] = useState<string | undefined>(
    triggers?.referral.inviteePoints.toString()
  );

  const [reactionSwitchValue, setReactionSwitchValue] = useState(triggers?.reaction.isEnabled);
  const [reactionInputQtyValue, setReactionInputQtyValue] = useState<string | undefined>(
    triggers?.reaction.threshold.toString()
  );
  const [reactionPointsValue, setReactionPointsValue] = useState<string | undefined>(
    triggers?.reaction.points.toString()
  );

  useEffect(() => {
    setReferralSwitchValue(triggers?.referral.isEnabled);
    setInviterInputValue(triggers?.referral.inviterPoints.toString());
    setInviteeInputValue(triggers?.referral.inviteePoints.toString());
    setReactionSwitchValue(triggers?.reaction.isEnabled);
    setReactionInputQtyValue(triggers?.reaction.threshold.toString());
    setReactionPointsValue(triggers?.reaction.points.toString());
  }, [triggers]);

  const onChangeReferralSwitch = (e: BaseSyntheticEvent) => {
    setReferralSwitchValue(e.target.checked);
  };

  const onChangeReferralInviterInput = (e: BaseSyntheticEvent) => {
    const { value: newValue, notShow, floatValue } = setNumberInputValue(e.target.value);
    if (!isNaN(floatValue) && !notShow) setInviterInputValue(newValue);
  };

  const onChangeReferralInviteeInput = (e: BaseSyntheticEvent) => {
    const { value: newValue, notShow, floatValue } = setNumberInputValue(e.target.value);
    if (!isNaN(floatValue) && !notShow) setInviteeInputValue(newValue);
  };

  const onChangeReactionSwitch = (e: BaseSyntheticEvent) => {
    setReactionSwitchValue(e.target.checked);
  };

  const onChangeInputQty = (e: BaseSyntheticEvent) => {
    const { value: newValue, notShow, floatValue } = setNumberInputValue(e.target.value);
    if (!isNaN(floatValue) && !notShow) setReactionInputQtyValue(newValue);
  };

  const onChangeInputPoints = (e: BaseSyntheticEvent) => {
    const { value: newValue, notShow, floatValue } = setNumberInputValue(e.target.value);
    if (!isNaN(floatValue) && !notShow) setReactionPointsValue(newValue);
  };

  const onClickUpdate = async () => {
    try {
      if (!chatId) {
        // TODO: validation
        return;
      }

      await updateTriggers({
        chatId: Number(chatId),
        triggers: {
          referral: {
            inviterPoints: Number(inviterInputValue),
            inviteePoints: Number(inviteeInputValue),
            isEnabled: referralSwitchValue ?? false
          },
          reaction: {
            points: Number(reactionPointsValue),
            threshold: Number(reactionInputQtyValue),
            isEnabled: reactionSwitchValue ?? false
          }
        }
      });
    } catch (error) {
      console.log('Could not update triggers', error);
    }
  };

  return (
    <SectionWithTitleContainer
      title={
        <Section.Header>
          <Box display="flex" justifyContent="space-between">
            Set up tasks <QuestionTooltip />
          </Box>
        </Section.Header>
      }>
      {triggers?.referral ? (
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
      ) : null}

      {triggers?.reaction ? (
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
      ) : null}
      <Button size="l" stretched before={<RefreshIcon />} onClick={onClickUpdate}>
        Update
      </Button>
    </SectionWithTitleContainer>
  );
};
