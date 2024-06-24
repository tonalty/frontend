import { Box } from '@mui/material';
import { Badge, TabsList } from '@telegram-apps/telegram-ui';
import { TabsItem } from '@telegram-apps/telegram-ui/dist/components/Navigation/TabsList/components/TabsItem/TabsItem';
import { CommunityUser } from '@/interfaces/CommunityUser';
import { View } from '@/enums/View';

interface Props {
  subscribed: CommunityUser[];
  managed: CommunityUser[];
  currentView: View;
  onClickView: (view: View) => void;
}

export function Menu(props: Props) {
  return (
    <Box sx={{ width: '100%', maxWidth: 360 }}>
      <TabsList>
        <TabsItem
          selected={props.currentView === View.SUBSCRIBED}
          onClick={() => {
            props.onClickView(View.SUBSCRIBED);
          }}>
          Subscribed
          <Badge type="number">{props.subscribed.length}</Badge>
        </TabsItem>
        <TabsItem
          selected={props.currentView === View.MANAGED}
          onClick={() => props.onClickView(View.MANAGED)}>
          Managing
          <Badge type="number">{props.managed.length}</Badge>
        </TabsItem>
      </TabsList>
    </Box>
  );
}
