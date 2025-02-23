import { Alert, Button, Card, Col, Form, Input, message, Row, Spin, Typography, } from "antd";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";
import useScreenSize from "../../hooks/useScreenSize";
import { API } from "../../constant";
import { setToken } from "../../helpers";

const Signin = () => {
    const { isDesktopView } = useScreenSize();
    const navigate = useNavigate();

    const { setUser } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const onFinish = async (values) => {
        setIsLoading(true);
        try {
            const value = {
                identifier: values.email,
                password: values.password,
            };
            const response = await fetch(`${API}/auth/local`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(value),
            });

            const data = await response.json();

            if (data?.error) {
                throw data?.error;
            } else {
                setToken(data.jwt);
                setUser(data.user);

                message.success(`Welcome user ${data.user.username}!`);
                await new Promise(resolve => setTimeout(resolve, 500));
                navigate("/profile", { replace: true });
            }
        } catch (error) {
            console.error(error);
            setError(error?.message ?? "Something went wrong!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Fragment>
            <Row className="min-h-screen items-center px-4 pb-80">
                <Col span={isDesktopView ? 8 : 24} offset={isDesktopView ? 8 : 0}>
                    <Card className="w-full max-w-md mx-auto rounded-lg shadow-md" title="SignIn">
                        {error ? (
                            <Alert
                                className="mb-4"
                                message={error}
                                type="error"
                                closable
                                afterClose={() => setError("")}
                            />
                        ) : null}
                        <Form
                            name="basic"
                            layout="vertical"
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        type: "email",
                                    },
                                ]}
                            >
                                <Input placeholder="Email address" />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true }]}
                            >
                                <Input.Password placeholder="Password" />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="w-full bg-blue-500 hover:bg-blue-600 text-white border-none"
                                >
                                    Login {isLoading && <Spin size="small" fullscreen="true" />}
                                </Button>
                            </Form.Item>
                        </Form>
                        <Typography.Paragraph className="mt-4 text-center text-gray-600">
                            New User? <Link to="/signup">Sign Up</Link>
                        </Typography.Paragraph>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
};

export default Signin;