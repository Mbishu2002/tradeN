import { CatalogueComponent } from "@/components/Catalogue/catalogue";
import { HomeLayoutComponent } from "@/components/Shared/home-layout";

const Catalogue = () => {
    return (
        <HomeLayoutComponent>
            <CatalogueComponent />
        </HomeLayoutComponent>
    );
};

export default Catalogue;
