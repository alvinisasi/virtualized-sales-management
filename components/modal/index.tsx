import { ModalProps } from "@/types"
import { Modal, ModalOverlay, ModalHeader, ModalCloseButton, ModalBody, ModalContent, Text, ModalFooter, Button } from "@chakra-ui/react"

const ModalConfirm: React.FC<ModalProps> = ({ isOpen, onCancel, onConfirm, title, body }) => {
  
    return (
      <>
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onCancel}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Text mb='1rem'>
                    {body}
                </Text>
            </ModalBody>
            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onConfirm}>
                    OK
                </Button>
                <Button colorScheme='red' mr={3} onClick={onCancel}>
                    Cancel
                </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}

export default ModalConfirm