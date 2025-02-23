import { Button, Space } from "antd";
import React from "react";
import { CgHomeAlt } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";
import { removeToken } from "../../helpers";

const AppHeader = () => {

    const { user } = useAuthContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        removeToken();
        navigate("/", { replace: true });
        console.log("user logged out!");

    };

    return (
        <Space className="w-full justify-between py-4 px-6 bg-gray-800">
            <Button className="text-white hover:text-gray-300" href="/" type="link">
                <CgHomeAlt className="text-4xl" />

            </Button>
            <Space className="flex gap-4">
                {user ? (
                    <>
                        <Button
                            className="text-white hover:text-gray-300"
                            href="/profile" type="link">
                            {user.username + "'s chatbox"}
                        </Button>
                        <Button
                            className="bg-blue-500 hover:bg-blue-600 text-white border-none"
                            href="/"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            className="text-white hover:text-gray-300"
                            href="/profile"
                            type="link">
                            Login
                        </Button>
                        <Button
                            className="bg-blue-500 hover:bg-blue-600 text-white border-none"
                            href="/signup"
                        >
                            SignUp
                        </Button>
                    </>
                )}
            </Space>
        </Space>
    );
};

export default AppHeader;