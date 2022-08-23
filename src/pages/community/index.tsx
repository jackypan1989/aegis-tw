import { gql } from "@apollo/client"
import { SearchIcon } from "@chakra-ui/icons"
import { Box, Button, Center, Checkbox, CheckboxGroup, Flex, FormControl, FormLabel, Heading, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, Spinner, useDisclosure, Wrap, WrapItem } from "@chakra-ui/react"
import { Controller, useForm } from "react-hook-form"
import { ListProfileQueryHookResult, Market, Role, useListProfileQuery } from "../../../codegen/graphql"
import ProfileCard, { PROFILE_CARD } from "../../components/profileCard"
import { getEnumString } from "../../utils/getEnumString"

export const LIST_PROFILE = gql` 
  ${PROFILE_CARD}

  query listProfile (
    $first: Int,
    $after: Cursor,
    $filter: ProfileFilter
  ) {
    profiles(
      first: $first,
      after: $after,
      filter: $filter
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        cursor
        node {
          ...ProfileCard
        }
      }
    }
  }
`

type FormValues = {
  roles: Role[]
  markets: Market[]
}

type ProfileFilterModalProps = {
  isOpen: boolean,
  onOpen: () => void,
  onClose: () => void,
  refetch: ListProfileQueryHookResult['refetch']
}

const ProfileFilterModal = (props: ProfileFilterModalProps) => {
  const { isOpen, onOpen, onClose, refetch } = props
  const {
    handleSubmit,
    control,
  } = useForm<FormValues>()

  const onSubmit = async (value: FormValues) => {
    onClose()
    await refetch({
      filter: {
        roles: value.roles,
        markets: value.markets
      }
    })
  }

  return (
    <>
      <IconButton size='sm' onClick={onOpen} icon={<SearchIcon />} aria-label="filter"></IconButton>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent maxW='90vw' ml='4' mr='4'>
            <ModalHeader>Profle Filter</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel htmlFor='roles'>Roles</FormLabel>
                <Controller
                  name='roles'
                  control={control}
                  render={({ field }) => (
                    <CheckboxGroup {...field}>
                      <Wrap spacing='12px'>
                        {Object.values(Role).map(role => {
                          return <WrapItem key={role}>
                            <Checkbox value={role}>{getEnumString(role)}</Checkbox>
                          </WrapItem>
                        })}
                      </Wrap>
                    </CheckboxGroup>
                  )}
                />
              </FormControl>
              <FormControl mt='4'>
                <FormLabel htmlFor='markets'>Markets</FormLabel>
                <Controller
                  name='markets'
                  control={control}
                  render={({ field }) => (
                    <CheckboxGroup {...field}>
                      <Wrap spacing='12px'>
                        {Object.values(Market).map(market => {
                          return <WrapItem key={market}>
                            <Checkbox value={market}>{getEnumString(market)}</Checkbox>
                          </WrapItem>
                        })}
                      </Wrap>
                    </CheckboxGroup>
                  )}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' type='submit'>
                Search
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  )
}

const Community = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data, loading, error, fetchMore, refetch } = useListProfileQuery({
    variables: {
      first: 10
    }
  })

  if (loading) return <Center h='80vh'><Spinner size='lg'/></Center>
  if (error) return <Center h='80vh'>{error.message}</Center>

  const nodes = data?.profiles.edges.map(edge => edge.node) ?? []
  const pageInfo = data?.profiles?.pageInfo
  const hasNextPage = pageInfo?.hasNextPage

  const onLoadMore = () => {
    if (hasNextPage) {
      fetchMore({
        variables: {
          after: pageInfo.endCursor,
        }
      })
    }
  }

  return <Box>
    <Flex p={{ base: 4, lg: 8 }}>
      <Heading size='lg'>Find out people 👋</Heading>
      <Spacer />
      <ProfileFilterModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} refetch={refetch} />
    </Flex>
    {nodes.length === 0 && <Center>No matched result, please update filter.</Center>}
    <Flex direction='column' gap={{ base: 1, lg: 2 }}>
      {nodes.map(node => {
        return node && <ProfileCard key={node?.id} profile={node} />
      })}
    </Flex>
    {hasNextPage && <Center p={{ base: 4, lg: 8 }}>
      <Button onClick={onLoadMore}>Load More</Button>
    </Center>}
  </Box>
}

export default Community