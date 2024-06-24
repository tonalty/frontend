import { Box } from '@mui/material';
import { TabsList } from '@telegram-apps/telegram-ui';
import { TabsItem } from '@telegram-apps/telegram-ui/dist/components/Navigation/TabsList/components/TabsItem/TabsItem';

export function Menu() {
  return (
    <Box sx={{ width: '100%', maxWidth: 360 }}>
      <TabsList>
        <TabsItem onClick={() => {}} selected>
          Subscribed
        </TabsItem>
        <TabsItem onClick={() => {}}>Managing</TabsItem>
      </TabsList>
    </Box>
  );
}
