import React, { ReactText } from 'react'
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  BoxProps,
  FlexProps,
} from '@chakra-ui/react'
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiMenu,
} from 'react-icons/fi'
import { IconType } from 'react-icons'
import NextLink from 'next/link'

interface LinkItemProps {
  name: string
  icon: IconType
  route: string
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Dashboard', icon: FiHome, route: '/' },
  { name: 'Users', icon: FiTrendingUp, route: '/users' },
  { name: 'Registration', icon: FiCompass, route: '/registration' },
  { name: 'Search', icon: FiStar, route: '/search' },
]

interface SidebarProps extends BoxProps {
  onClose: () => void
}

export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
        bg={useColorModeValue('white', 'gray.900')}
        borderRight='1px'
        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
        w={{ base: 'full', md: 60 }}
        pos='fixed'
        h='full'
        {...rest}>
        <Flex h='20' alignItems='center' mx='8' justifyContent='space-between'>
            <Text fontSize='2xl' fontFamily='monospace' fontWeight='bold'>
                delman.io
            </Text>
            <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
        </Flex>
        {LinkItems.map((link) => (
            <NavItem key={link.name} icon={link.icon} route={link.route}>
                {link.name}
            </NavItem>
        ))}
    </Box>
  )
}

interface NavItemProps extends FlexProps {
  icon: IconType
  children: ReactText
  route: string
}
const NavItem = ({ icon, route, children, ...rest }: NavItemProps) => {
  return (
    <Box
        as={NextLink}
        href={route}
        style={{ textDecoration: 'none' }}
        _focus={{ boxShadow: 'none' }}>
            <Flex
                align='center'
                p='4'
                mx='4'
                borderRadius='lg'
                role='optgroup'
                cursor='pointer'
                _hover={{
                    bg: 'cyan.400',
                    color: 'white',
                }}
                _active={{
                    bg: 'pink.400',
                    color: 'white',
                }}
                _activeLink={{
                  bg: 'pink.400',
                  color: 'white',
              }}
                {...rest}>
                    {icon && (
                    <Icon
                        mr='4'
                        fontSize='16'
                        _groupHover={{
                            color: 'white',
                        }}
                        as={icon}
                    />
                    )}
                    {children}
            </Flex>
    </Box>
  )
}

interface MobileProps extends FlexProps {
    onOpen: () => void
}
export const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 24 }}
        height='20'
        alignItems='center'
        bg={useColorModeValue('white', 'gray.900')}
        borderBottomWidth='1px'
        borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
        justifyContent='flex-start'
        {...rest}>
            <IconButton
                variant='outline'
                onClick={onOpen}
                aria-label='open menu'
                icon={<FiMenu />}
            />

            <Text fontSize='2xl' ml='8' fontFamily='monospace' fontWeight='bold'>
                delman.io
            </Text>
    </Flex>
  )
}
