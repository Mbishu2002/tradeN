import { SettingsComponent } from "@/components/Settings/settings";
import { HomeLayoutComponent } from "@/components/Shared/home-layout";

const Settings = () => {
    return (
        <HomeLayoutComponent>
            <SettingsComponent />
        </HomeLayoutComponent>
    );
};

export default Settings;