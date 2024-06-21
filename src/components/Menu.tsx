
import { Box } from "@mui/material";
import { TabsList } from "@telegram-apps/telegram-ui";
import { TabsItem } from "@telegram-apps/telegram-ui/dist/components/Navigation/TabsList/components/TabsItem/TabsItem";
import { MouseEventHandler, useState } from "react";

export function Menu() {
    const [value, setValue] = useState(0);

    const handleChange = (event: any) => {
        // setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 360 }}>
            <TabsList>
                <TabsItem
                    onClick={handleChange}
                    selected
                >
                    Subscribed
                </TabsItem>
                <TabsItem
                    onClick={handleChange}
                >
                    Managing
                </TabsItem>
            </TabsList>
        </Box>
    )
}