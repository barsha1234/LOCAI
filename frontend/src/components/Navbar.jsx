import React from "react";
import { Flex, Text, Avatar, Menu, MenuButton, MenuItem, MenuList, IconButton } from "@chakra-ui/react";
import { ArrowBackIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const Navbar = ({ name }) => {
    const navigate = useNavigate();

    return (
        <Flex 
            vw="100vw" 
            bgGradient="linear(to-r,#ED8936,#C05621)" 
            p='2' 
            justifyContent="space-between" 
            alignItems="center"
        >
            <Flex>
                <Text fontSize="18px" color="white" fontWeight="bold">Shopping App</Text>
            </Flex>
            <Flex alignItems={"center"} mr="5">
                <Avatar name={name} src='' />
                <Text color="white" ml="2">{name}</Text>
                <Menu>
                    <MenuButton
                        ml="2"
                        as={IconButton}
                        aria-label='Options'
                        icon={<HamburgerIcon color="white"/>}
                        variant='outline'
                    />
                    <MenuList>
                        <MenuItem 
                            icon={<ArrowBackIcon />}
                            onClick={() => {
                                navigate("/");
                            }}
                        >
                            Log out
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </Flex>
    )
}

export default Navbar;