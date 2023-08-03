import React from "react";
import { Button, Flex, Heading, Stack } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";

const Landing = () => {
    const navigate = useNavigate();

    return (
        <Flex w="100vw" h="91vh" justifyContent="center" alignItems="center"> 
            <Stack align="center">
                <Heading>Shopping App</Heading>
                <Button 
                    colorScheme='green' 
                    size='md' 
                    w="80%" 
                    mt="18"
                    onClick={() => {
                        navigate("/login")
                    }}
                >
                    Login
                </Button>
                <Button 
                    colorScheme='blue' 
                    size='md' 
                    w="80%"
                    onClick={() => {
                        navigate("/signup")
                }}>
                    Sign Up
                </Button>
            </Stack>
        </Flex>
    )
}

export default Landing;