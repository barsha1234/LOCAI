import React from "react";
import { Card, CardBody, Stack, Heading, Text, ButtonGroup, Button, Image } from '@chakra-ui/react'

const ItemCard = ({name, cost, image_url}) => {
    return (
        <Card maxW='xs' m="2" border="1px solid #CBD5E0">
            <CardBody>
                <Image
                    src={image_url}
                    alt='name'
                    borderRadius='lg'
                    boxSize="300px"
                    objectFit="cover"
                />
                <Stack mt='6' spacing='3'>
                    <Heading size='md' noOfLines={1}>{name}</Heading>
                    <Text color='orange.600' fontSize='2xl'>
                        ₹{cost}
                    </Text>
                </Stack>
                <ButtonGroup spacing='2' mt="2">
                    <Button colorScheme='orange' w="100%">
                        Add to cart
                    </Button>
                </ButtonGroup>
            </CardBody>
        </Card>
    )
};

export default ItemCard;