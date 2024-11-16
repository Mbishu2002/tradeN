import { OrdersComponent } from "@/components/Orders/orders";
import { HomeLayoutComponent } from "@/components/Shared/home-layout";

const Orders = () => {
    return(
        <HomeLayoutComponent>
            <OrdersComponent />
        </HomeLayoutComponent>
    );
};

export default Orders;