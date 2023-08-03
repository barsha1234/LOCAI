import React, { useState } from "react";
import { Button, Flex, Heading, Stack, Input, Text, Box, Select } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();
    const [name,  setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [accountType, setAccountType] = useState("Customer");
    const [homeLocation, setHomeLocation] = useState("Odisha");
    // console.log("[" + email + ", " + name + ", " + password + ", " + accountType + "]")
    
    const addUser = () => {
        fetch('http://127.0.0.1:5000/add_user', {
            method: 'POST',
            mode: "cors",
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                accountType: accountType,
                homeLocation: homeLocation
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then(response => response.json())  
        .then(json => {
            console.log(json);
            navigate(`/home/${json.id}`)
        })
        .catch((err) => {
            console.log(err.message);
        })
    }

    return (
        <Flex w="100vw" h="91vh" justifyContent="center" alignItems="center"> 
            <Stack align="center">
                <Heading>Sign Up</Heading>
                <Box mt="5">
                    <Text fontWeight="medium">Name</Text>
                    <Input 
                        placeholder='Enter your name'
                        value={name}
                        onChange={(e) => setName(e.target.value)} 
                    />
                </Box> 
                <Box>
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
                <Box w="100%">
                    <Text fontWeight="medium">Type of Account</Text>
                    <Select 
                        placeholder='Select option' 
                        defaultValue="Customer"
                        value={accountType}
                        onChange={(e) => setAccountType(e.target.value)}
                    >
                        <option value='Business/Charity'>Business/Charity</option>
                        <option value='Customer'>Customer</option>
                    </Select>
                </Box>  
                <Box w="100%">
                    <Text fontWeight="medium">Home Location</Text>
                    <Select 
                        placeholder='Select option' 
                        defaultValue="Odisha"
                        value={homeLocation}
                        onChange={(e) => setHomeLocation(e.target.value)}
                    >
                        <option value='Odisha'>Odisha</option>
                        <option value='Gujarat'>Gujarat</option>
                        <option value='Hyderabad'>Hyderabad</option>
                    </Select>
                </Box>  
                <Button 
                    variant="solid" 
                    colorScheme="purple" 
                    mt="2"
                    onClick={() => {
                        if(name !== "" && email !== "" && password !== "" && accountType !== "" && homeLocation !== "")
                            addUser()
                    }}
                >
                    Sign Up
                </Button>
            </Stack>
        </Flex>
    )
};

export default SignUp;