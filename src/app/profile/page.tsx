import { BusinessProfileComponent } from "@/components/Profile/Business/business-profile";
import { HomeLayoutComponent } from "@/components/Shared/home-layout";

const BusinessProfile = () =>{
    return (
        <HomeLayoutComponent>
            <BusinessProfileComponent/>
        </HomeLayoutComponent>
    );
};

export default BusinessProfile;