import { Button, Paper } from "@mui/material";

export function Join() {
    const userData = window.Telegram.WebApp.initDataUnsafe?.start_param;
    return (
        <Paper>
            {JSON.stringify(userData)}
            <Button>Join</Button>
        </Paper>
    )
}