import { gql } from "@apollo/client"
import { Box, Button, Center, Checkbox, CheckboxGroup, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Spacer, Spinner, Text, useToast, Wrap, WrapItem } from "@chakra-ui/react"
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { useUser } from "@supabase/auth-helpers-react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useGetProfileQuery, useUpdateProfileMutation } from "../../../codegen/graphql"
import { Market, Role } from "../../../codegen/prisma/client"
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
  location: string
  website: string
  linkedin: string
  facebook: string
  twitter: string
  github: string
}

const ProfileDetail = () => {
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient<any>()
  )
  const toast = useToast()
  const user = useUser()
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
      location: profile?.location ?? '',
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
    return <Box p={{ base: 4, lg: 8 }}>
      <Flex>
        <Heading size='lg'>{profile?.fullname || profile?.username || profile?.email}</Heading>
        <Spacer />
        <Button size='sm' onClick={() => supabaseClient.auth.signOut()}>登出</Button>
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
            placeholder='輸入你的帳號'
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
            placeholder='輸入你的本名'
            {...register('fullname')}
          />
          <FormErrorMessage>
            {errors.fullname && errors.fullname.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl mt='4' isInvalid={!!errors.avatarUrl}>
          <FormLabel htmlFor='avatarUrl'>Avatar Url</FormLabel>
          <Input
            id='avatarUrl'
            placeholder='輸入你的頭像網址'
            {...register('avatarUrl')}
          />
          <FormErrorMessage>
            {errors.avatarUrl && errors.avatarUrl.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl mt='4'>
          <FormLabel htmlFor='roles'>角色身份</FormLabel>
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
          <FormLabel htmlFor='markets'></FormLabel>
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
          <FormLabel htmlFor='location'>Location</FormLabel>
          <Input
            id='location'
            placeholder='ex: Miami, America'
            {...register('location')}
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
          更新
        </Button>
      </form>
    </Box>
  } else {
    return <ProfileCard profile={profile}></ProfileCard>
  }
}

export default ProfileDetail