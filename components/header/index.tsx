import { HeaderProps } from "@/types"
import { Box, Heading, Text } from "@chakra-ui/react"

const Header: React.FC<HeaderProps> = ({ title, description }) => {
    return(
        <Box w='100%'>
            <Heading as='h1' size='lg' m='2'>{title}</Heading>
            <Text fontSize='md' m='2' as='b'>{description}</Text>
        </Box>
    )
}

export default Header