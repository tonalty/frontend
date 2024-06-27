import { useTriggers, useUserCommunity } from '@/api/queries';
import { SectionWithTitleContainer } from '@/components/SectionWithCaptionContainer';
import { SetupTasksForm } from '@/components/SetupTasksForm';
import { PlusCircleIcon } from '@/icons/PlusCircleIcon';
import { RefreshIcon } from '@/icons/RefreshIcon';
import { Button, Caption, Input, List, Switch, Tappable } from '@telegram-apps/telegram-ui';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

export const Manage = () => {
  const { id } = useParams();
  const { data: userCommunity } = useUserCommunity(id);
  const { data: trigger } = useTriggers(Number(id));

  return (
    <SectionWithTitleContainer title="Set up tasks">
      {id && trigger && <SetupTasksForm id={Number(id)} trigger={trigger} />}
    </SectionWithTitleContainer>
  );
};
