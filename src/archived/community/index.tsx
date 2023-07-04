import { gql } from "@apollo/client"
import { SearchIcon } from "@chakra-ui/icons"
import { Box, Button, Center, Checkbox, CheckboxGroup, Flex, FormControl, FormLabel, Heading, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, Spinner, Text, useDisclosure, Wrap, WrapItem } from "@chakra-ui/react"
import Head from "next/head"
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
          <ModalContent maxW={{ base: '90vw', lg: '50vw' }} ml='4' mr='4'>
            <ModalHeader>人脈搜尋</ModalHeader>
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
                搜尋
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
    <Head>
      <title>尋找人脈 | Aegis Taiwan | 台灣人軟體新創社群</title>
    </Head>
    <Flex p={{ base: 4, lg: 8 }} direction='column'>
      <Flex>
        <Heading size='lg'>尋找軟體業人脈 👋</Heading>
        <Spacer />
        <ProfileFilterModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} refetch={refetch} />
      </Flex>
      <Text color='gray.500' mt='3'>根據創辦人、投資人、工程師等不同身份別及特定領域市場進行人脈搜尋。</Text>
    </Flex>
    {nodes.length === 0 && <Center>無結果，請更新搜尋條件</Center>}
    <Flex direction='column' gap={{ base: 1, lg: 2 }}>
      {nodes.map(node => {
        return node && <ProfileCard key={node?.id} profile={node} />
      })}
    </Flex>
    {hasNextPage && <Center p={{ base: 4, lg: 8 }}>
      <Button onClick={onLoadMore}>查看更多</Button>
    </Center>}
  </Box>
}

export default Community