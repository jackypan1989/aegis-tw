import { gql } from "@apollo/client"
import { AddIcon, Icon, SearchIcon } from "@chakra-ui/icons"
import { Box, Button, Center, Checkbox, CheckboxGroup, Flex, FormControl, FormLabel, Heading, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, Spinner, Text, useDisclosure, Wrap, WrapItem } from "@chakra-ui/react"
import Head from "next/head"
import NextLink from 'next/link'
import { Controller, useForm } from "react-hook-form"
import { ListStartupQueryHookResult, Market, Role, useListStartupQuery } from "../../../codegen/graphql"
import StartupCard, { STARTUP_CARD } from "../../components/startupCard"
import { getEnumString } from "../../utils/getEnumString"

export const LIST_STARTUP = gql` 
  ${STARTUP_CARD}
  query listStartup (
    $first: Int,
    $after: Cursor,
    $filter: StartupFilter
  ) {
    startups(
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
          ...StartupCard
        }
      }
    }
  }
`

type FormValues = {
  roles: Role[]
  markets: Market[]
}

type StartupFilterModalProps = {
  isOpen: boolean,
  onOpen: () => void,
  onClose: () => void,
  refetch: ListStartupQueryHookResult['refetch']
}

const StartupFilterModal = (props: StartupFilterModalProps) => {
  const { isOpen, onOpen, onClose, refetch } = props
  const {
    handleSubmit,
    control,
  } = useForm<FormValues>()

  const onSubmit = async (value: FormValues) => {
    onClose()
    await refetch({
      filter: {
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
            <ModalHeader>新創搜尋</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
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

const Startup = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data, loading, error, fetchMore, refetch } = useListStartupQuery({
    variables: {
      first: 10
    }
  })

  if (loading) return <Center h='80vh'><Spinner size='lg'/></Center>
  if (error) return <Center h='80vh'>{error.message}</Center>

  const nodes = data?.startups?.edges.map(edge => edge.node) ?? []
  const pageInfo = data?.startups?.pageInfo
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
      <title>尋找新創 | Aegis | 台灣人軟體新創社群</title>
    </Head>
    <Flex p={{ base: 4, lg: 8 }} direction='column'>
      <Flex>
        <Heading size='lg'>軟體新創資料庫 🦄</Heading>
        <Spacer />
        <StartupFilterModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} refetch={refetch} />
        <NextLink href='/startup/create' passHref>
          <IconButton ml='3' size='sm' icon={<Icon as={AddIcon} />} aria-label="Add"></IconButton>
        </NextLink>
      </Flex>
      <Text mt='3'>這裡是軟體新創共編資料庫，可以根據你感興趣的軟體領域進行搜尋，點擊新創標題可以查看新創更多詳情(如募資與估值等等)，一起共同編輯，幫助社群。</Text>
    </Flex>
    {nodes.length === 0 && <Center>無結果，請更新搜尋條件</Center>}
    <Flex direction='column' gap={{ base: 1, lg: 2 }}>
      {nodes.map(node => {
        return node && <StartupCard key={node?.id} startup={node} />
      })}
    </Flex>
    {hasNextPage && <Center p={{ base: 4, lg: 8 }}>
      <Button onClick={onLoadMore}>查看更多</Button>
    </Center>}
  </Box>
}

export default Startup