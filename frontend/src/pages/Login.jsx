import React, { useState } from "react";
import { Button, Flex, Heading, Stack, Input, Text, Box } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    
    // console.log("[" + email + ", " + password + "]")
    // console.log("error: " + errorMessage)

    const loginUser = () => {
        fetch('http://127.0.0.1:5000/login_user', {
            method: 'POST',
            mode: "cors",
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then(response => response.json())  
        .then(json => {
            console.log(json);
            if (json.message)
                setErrorMessage(json.message)
            else
                navigate(`/home/${json.id}`)
        })
        .catch((err) => {
            console.log(err.message);
        })
    }

    return (
        <Flex w="100vw" h="91vh" justifyContent="center" alignItems="center"> 
            <Stack align="center">
                <Heading>Login</Heading>
                {errorMessage.length !== 0 ? 
                    <Text mt="2" color="red">{errorMessage}</Text>
                : null}
                <Box mt="5">
                    <Text fontWeight="medium">Email</Text>
                    <Input 
                        placeholder='Enter your email' 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Box> 
                <Box>
                    <Text fontWeight="medium">Password</Text>
                    <Input 
                        placeholder='Enter your password' 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </Box>   
                <Button 
                    variant="solid" 
                    colorScheme="blue" 
                    mt="2"
                    onClick={() => {
                        if(email !== "" && password !== "")
                            loginUser()
                    }}
                >
                    Login
                </Button>
            </Stack>
        </Flex>
    )
};

export default Login;