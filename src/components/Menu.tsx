import { Box } from '@mui/material';
import { Badge, TabsList } from '@telegram-apps/telegram-ui';

import { View } from '@/enums/View';
import { CommunityUser } from '@/interfaces/CommunityUser';

interface Props {
  subscribed: CommunityUser[];
  managed: CommunityUser[];
  currentView: View;
  onClickView: (view: View) => void;
}

export function Menu(props: Props) {
  return (
    <TabsList>
      <TabsList.Item
        selected={props.currentView === View.SUBSCRIBED}
        onClick={() => {
          props.onClickView(View.SUBSCRIBED);
        }}>
        Subscribed
        <Badge type="number">{props.subscribed.length}</Badge>
      </TabsList.Item>
      <TabsList.Item
        selected={props.currentView === View.MANAGED}
        onClick={() => props.onClickView(View.MANAGED)}>
        Managing
        <Badge type="number">{props.managed.length}</Badge>
      </TabsList.Item>
    </TabsList>
  );
}
