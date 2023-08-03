import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Flex, Text, Box } from "@chakra-ui/react";
import { Items } from "../mio_amore_data";
import { Odisha } from "../odisha_data";
import { Gujarat } from "../gujarat_data";
import { Hyderabad } from "../hyderabad_data";
import ItemCard from "../components/ItemCard";
import Navbar from "../components/Navbar";

const Home = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    // console.log("USER: " + user);

    {/*
        useEffect(() => {
            fetch(`http://127.0.0.1:5000/otp`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })
        })

    */}

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/get_user?id=${id}`, {
            method: 'GET',
            mode: "cors",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then(response => response.json())  
        .then(json => {
            console.log("USER: " + JSON.parse(json.user));
            setUser(JSON.parse(json.user));
        })
    }, [id])

    return (
        <div>
            <Navbar name={user?.name}/> 
            <Flex w="75vw" h="100%" ml="auto" mr="auto" mt="2">
                <Text fontWeight="normal" fontSize="18px">Showing Foods for <b>{user?.homeLocation}</b> Cuisine</Text>
            </Flex>
            {user?.accountType === "Customer" ?
                (user?.homeLocation === "Odisha" ? 
                <Box>
                    <Flex maxW="75vw" h="100%" ml="auto" mr="auto" justifyContent="space-evenly" flexWrap="wrap">
                        {Odisha.map(({name, cost, image_url}) => (
                            <Box>
                                <ItemCard name={name} cost={cost} image_url={image_url} />
                            </Box>
                        ))}
                    </Flex>
                </Box>
                :
                (user?.homeLocation === "Gujarat" ?
                <Box>
                    <Flex maxW="75vw" h="100%" ml="auto" mr="auto" justifyContent="space-evenly" flexWrap="wrap">
                        {Gujarat.map(({name, cost, image_url}) => (
                            <Box>
                                <ItemCard name={name} cost={cost} image_url={image_url} />
                            </Box>
                        ))}
                    </Flex>
                </Box> 
                : (user?.homeLocation === "Hyderabad" ? 
                <Box>
                    <Flex maxW="75vw" h="100%" ml="auto" mr="auto" justifyContent="space-evenly" flexWrap="wrap">
                        {Hyderabad.map(({name, cost, image_url}) => (
                            <Box>
                                <ItemCard name={name} cost={cost} image_url={image_url} />
                            </Box>
                        ))}
                    </Flex>
                </Box>
                : null)))    
            :
            null}
        </div> 
    )
}

export default Home;