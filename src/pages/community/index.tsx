import { gql } from "@apollo/client"
import { Box, Button, Center, Checkbox, CheckboxGroup, FormControl, FormLabel, Spinner, Wrap, WrapItem } from "@chakra-ui/react"
import { Controller, useForm } from "react-hook-form"
import { Market, Role, useListProfileQuery } from "../../../codegen/graphql"
import ProfileCard, { PROFILE_CARD } from "../../components/profileCard"

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

const Community = () => {
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>()
  
  const { data, loading, error, fetchMore, refetch } = useListProfileQuery({
    variables: {
      first: 30
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

  const onSubmit = async (value: FormValues) => {
    await refetch({
      filter: {
        roles: value.roles,
        markets: value.markets
      }
    })
  }

  return <Box>
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl mt='4'>
        <FormLabel htmlFor='roles'>Roles</FormLabel>
        <Controller
          name='roles'
          control={control}
          render={({ field }) => (
            <CheckboxGroup {...field}>
              <Wrap spacing='12px'>
                {Object.values(Role).map(role => {
                  return <WrapItem key={role}>
                    <Checkbox value={role}>{role}</Checkbox>
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
                    <Checkbox value={market}>{market}</Checkbox>
                  </WrapItem>
                })}
              </Wrap>
            </CheckboxGroup>
          )}
        />
      </FormControl>
      <Button mt={4} mb={4} isLoading={isSubmitting} type='submit'>
        Search
      </Button>
    </form>
    {nodes.map(node => {
      return node && <ProfileCard key={node?.id} profile={node} />
    })}
    {hasNextPage && <Box p='30px'>
      <Button onClick={onLoadMore}>Load More</Button>
    </Box>}
  </Box>
}

export default Community