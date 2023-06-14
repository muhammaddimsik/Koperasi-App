import React, {FC, useState} from "react"
import { NavigationContainer } from "@react-navigation/native"
import { API_URL } from "../constants/constant"
import AppStack from "./appstack"
import AuthStack from "./authstack"

const MainNav : FC = () => {
    const [user, setUser] = useState(null)

    return (
        <NavigationContainer>
            {user !== null ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    )
}

export default MainNav;