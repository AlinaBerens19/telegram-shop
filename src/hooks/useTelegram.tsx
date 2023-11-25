import { redirect } from "next/navigation";

interface CustomWindow extends Window {
    Telegram?: {
        WebApp: {
            close: () => void;
            MainButton: {
                isVisible: boolean;
                hide: () => void;
                show: () => void;
            };
            initDataUnsafe?: {
                user?: {
                    username?: string;
                };
                query_id?: string;
            };
        };
    };
}

export function useTelegram() {
    const tg = (window as CustomWindow).Telegram?.WebApp;

    const onClose = () => {
        if (tg) {
            tg.close();
        } else {
            console.error("Telegram WebApp not available.");
        }
    };

    const onToggleButton = () => {
        if (tg && tg.MainButton.isVisible) {
            tg.MainButton.hide();
        } else if (tg) {
            tg.MainButton.show();
        } else {
            console.error("Telegram WebApp not available.");
        }
    };

    return {
        tg,
        onToggleButton,
        onClose,
        user: tg?.initDataUnsafe?.user?.username,
        queryId: tg?.initDataUnsafe?.query_id,
    };
}
