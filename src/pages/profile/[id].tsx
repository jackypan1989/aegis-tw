import { Market, Role } from ".prisma/client"
import { gql } from "@apollo/client"
import { Box, Button, Center, Checkbox, CheckboxGroup, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Spacer, Spinner, Text, useToast, Wrap, WrapItem } from "@chakra-ui/react"
import { supabaseClient } from "@supabase/auth-helpers-nextjs"
import { useUser } from "@supabase/auth-helpers-react"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { useGetProfileQuery, useUpdateProfileMutation } from "../../../codegen/graphql"
import ProfileCard, { PROFILE_CARD } from "../../components/profileCard"
import { getEnumString } from "../../utils/getEnumString"

export const GET_PROFILE = gql`
  ${PROFILE_CARD}

  query getProfile($id: ID!) {
    profile(id: $id) {
      ...ProfileCard
    }
  }
`

export const UPDATE_PROFILE = gql`
  ${PROFILE_CARD}

  mutation updateProfile($input: UpdateProfileMutationInput!) {
    updateProfile(input: $input) {
      ...ProfileCard
    }
  }
`

type FormValues = {
  username: string
  fullname: string
  roles: Role[]
  markets: Market[]
  avatarUrl: string
  website: string
  linkedin: string
  facebook: string
  twitter: string
  github: string
}

const ProfileDetail = () => {
  const toast = useToast()
  const { user } = useUser()
  const router = useRouter()
  const id = router.query.id as string
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>()
  const { data, loading } = useGetProfileQuery({
    variables: {
      id: id
    }
  })
  const [updateProfile] = useUpdateProfileMutation()

  const profile = data?.profile

  useEffect(() => {
    const defaultValues: FormValues = {
      username: profile?.username ?? '',
      fullname: profile?.fullname ?? '',
      roles: profile?.roles ?? [],
      markets: profile?.markets ?? [],
      avatarUrl: profile?.avatarUrl ?? '',
      website: profile?.website ?? '',
      linkedin: profile?.linkedin ?? '',
      facebook: profile?.facebook ?? '',
      twitter: profile?.twitter ?? '',
      github: profile?.github ?? ''
    };

    reset({ ...defaultValues });
  }, [profile, reset])

  if (loading) return <Center h='80vh'><Spinner size='lg'/></Center>
  if (!profile) return <Center h='80vh'>Can not find this user.</Center>
  
  const onSubmit = async (value: FormValues) => {
    if (profile) {
      await updateProfile({
        variables: {
          input: {
            id: profile.id,
            ...value
          }
        }
      })
      toast({
        position: 'bottom-left',
        status: 'success',
        title: 'Successfully updated profile.'
      })
    }
  }

  if (id === user?.id) {
    return <Box p='30'>
      <Flex>
        <Heading size='lg'>{profile?.fullname || profile?.username || profile?.email}</Heading>
        <Spacer />
        <Button size='sm' onClick={() => supabaseClient.auth.signOut()}>Sign Out</Button>
      </Flex>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mt='4'>
          <FormLabel htmlFor='email'>Email</FormLabel>
          <Text>{profile?.email}</Text>
        </FormControl>
        <FormControl mt='4' isInvalid={!!errors.username}>
          <FormLabel htmlFor='username'>Username</FormLabel>
          <Input
            id='username'
            placeholder='username'
            {...register('username', {
              required: 'This is required',
              minLength: { value: 4, message: 'Minimum length should be 4' },
            })}
          />
          <FormErrorMessage>
            {errors.username && errors.username.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl mt='4' isInvalid={!!errors.fullname}>
          <FormLabel htmlFor='fullname'>Fullname</FormLabel>
          <Input
            id='fullname'
            placeholder='fullname'
            {...register('fullname')}
          />
          <FormErrorMessage>
            {errors.fullname && errors.fullname.message}
          </FormErrorMessage>
        </FormControl>
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
        <FormControl mt='4'>
          <FormLabel htmlFor='website'>Website</FormLabel>
          <Input
            id='website'
            placeholder='website url'
            {...register('website')}
          />
        </FormControl>
        <FormControl mt='4'>
          <FormLabel htmlFor='linkedin'>Linkedin</FormLabel>
          <Input
            id='linkedin'
            placeholder='linkedin url'
            {...register('linkedin')}
          />
        </FormControl>
        <FormControl mt='4'>
          <FormLabel htmlFor='facebook'>Facebook</FormLabel>
          <Input
            id='facebook'
            placeholder='facebook url'
            {...register('facebook')}
          />
        </FormControl>
        <FormControl mt='4'>
          <FormLabel htmlFor='twitter'>Twitter</FormLabel>
          <Input
            id='twitter'
            placeholder='twitter url'
            {...register('twitter')}
          />
        </FormControl>
        <FormControl mt='4'>
          <FormLabel htmlFor='github'>Github</FormLabel>
          <Input
            id='github'
            placeholder='github url'
            {...register('github')}
          />
        </FormControl>
        <Button mt={4} isLoading={isSubmitting} type='submit'>
          Update
        </Button>
      </form>
      
    </Box>
  } else {
    return <ProfileCard profile={profile}></ProfileCard>
  }
}

export default ProfileDetail