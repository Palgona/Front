import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Category from "../Page/Category";

const Drawer = createDrawerNavigator();

const Drawernavigator = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name = "Category" component={Category}/>
        </Drawer.Navigator>
    );
};

export default Drawernavigator;