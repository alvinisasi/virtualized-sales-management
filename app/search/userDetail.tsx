import ModalConfirm from "@/components/modal"
import { deleteUser } from "@/services/users"
import { DeleteUser, UserDetailsProps, UsersData } from "@/types"
import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, GridItem, Stack, Text, Grid, useDisclosure, useToast } from "@chakra-ui/react"
import { useMutation } from "@tanstack/react-query"

const deleteUserData = async (data: DeleteUser) => {
    const user = await deleteUser(data)
    const res = user.data.data as UsersData
    return res 
}

const UserDetails: React.FC<UserDetailsProps> = ({ data, isOpen, onClose }) => {
    const keys = Object.keys(data)
    const values = Object.values(data)
    const toast = useToast()
    const { isOpen: isOpenModal, onOpen, onClose: onCloseModal } = useDisclosure()
    const mutation = useMutation({
        mutationFn: (data: UsersData) => deleteUserData({
            id: data.id,
            name: data.name,
            email: data.email
        })
    })

    const onConfirmDelete = () => {
        mutation.mutate(data, {
            onSuccess: (data, variables, context) => {
                toast({
                    title: 'User removed!',
                    description: "We've successfully remove a user.",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
            },
            onError: (error, variables, context) => {
                toast({
                    title: 'Remove failed!',
                    description: "We've failed remove a user.",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
            },
        })
    }
    
    return(
        <Drawer placement='right' onClose={onClose} isOpen={isOpen} size={'lg'}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader borderBottomWidth='1px'>User Details</DrawerHeader>
                <DrawerBody>
                {
                    keys && keys.map((item, index) => (
                        // <Stack key={item} direction='row' spacing={4}>
                        //     <Text>{item}</Text> : <Text>{values[index]}</Text>
                        // </Stack>
                        <Grid templateColumns='30% 70%' gap={6}>
                            <GridItem w='100%'>
                                <Text>{item}</Text>
                            </GridItem>
                            <GridItem w='100%'>
                                <Text>: {values[index]}</Text>
                            </GridItem>
                        </Grid>
                    ))
                }
                
                </DrawerBody>
                <Button colorScheme='red' mx={6} my={6} onClick={onOpen} width={'120px'}>
                    Delete User
                </Button>
            </DrawerContent>
            <ModalConfirm 
                title='Are you sure you want to delete?'
                body='The user will be permanently removed'
                onConfirm={onConfirmDelete}
                onCancel={onCloseModal}
                isOpen={isOpenModal}
            />
        </Drawer>
    )
}

export default UserDetails