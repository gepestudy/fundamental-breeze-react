import { Button, Image, Menu, Space, Text } from "@mantine/core";
import { IconLanguage } from "@tabler/icons-react";
import { useLaravelReactI18n } from "laravel-react-i18n";

const Localization = () => {
    const { getLocales, currentLocale, setLocale } = useLaravelReactI18n();

    return (
        <Menu trigger="hover" openDelay={50} withArrow>
            <Menu.Target>
                <Button
                    leftIcon={<IconLanguage size={20} />}
                    uppercase
                    size="xs"
                >
                    {currentLocale()}
                </Button>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Label>Change Language</Menu.Label>
                <Menu.Divider />
                {getLocales().map((locale) => (
                    <Menu.Item key={locale} onClick={() => setLocale(locale)}>
                        <div className="flex items-center justify-center">
                            <Image
                                src={`https://ecomerce-fundamental-with-breeze.app/storage/img/lang/${locale}.png`}
                                height={20}
                                width={20}
                                alt={locale}
                            />
                            <Space w={5} />
                            <Text>{locale.toUpperCase()}</Text>
                        </div>
                    </Menu.Item>
                ))}
            </Menu.Dropdown>
        </Menu>
    );
};
export default Localization;
