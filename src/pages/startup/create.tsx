import { gql } from '@apollo/client'
import {
    Box, Button, Center, Checkbox, CheckboxGroup, FormControl, FormErrorMessage,
    FormLabel, Heading, Input, Textarea, useToast, Wrap, WrapItem
} from '@chakra-ui/react'
import { useUser } from '@supabase/auth-helpers-react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Controller, useForm } from 'react-hook-form'
import { Market, useCreateStartupMutation } from '../../../codegen/graphql'
import SignInPanel from '../../components/signInPanel'
import { getEnumString } from '../../utils/getEnumString'

type FormValues = {
  name: string
  url: string
  logo: string
  description: string
  teamSize: number
  stage: string
  funding: number
  valuation: number
  revenue: number
  dau: number
  markets: Market[]
  foundedAt: Date
}

export const ADD_STARTUP = gql`
  mutation createStartup($input: CreateStartupMutationInput!) {
    createStartup(input: $input) {
      id
    }
  }
`

const StartupCreate: NextPage = () => {
  const toast = useToast()
  const router = useRouter()
  const user = useUser()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    control
  } = useForm<FormValues>()

  const [createStartup, { loading, error }] = useCreateStartupMutation()

  if (!user) return <Center p={{ base: 4, lg: 10 }}><SignInPanel /></Center>
  if (loading) return <Center p={{ base: 4, lg: 10 }}>Submitting...</Center>
  if (error) return <Center p={{ base: 4, lg: 10 }}>Submission error! ${error.message}</Center>

  const onSubmit = async (value: FormValues) => {
    await createStartup({
      variables: {
        input: {
          name: value.name,
          url: value.url,
          logo: value.logo,
          description: value.description,
          teamSize: value.teamSize,
          funding: value.funding,
          valuation: value.valuation,
          revenue: value.revenue,
          dau: value.dau,
          markets: value.markets,
          foundedAt: value.foundedAt,
        }
      }
    })
    toast({
      position: 'bottom-left',
      status: 'success',
      title: 'Successfully created startup.'
    })
    router.push('/startup')
  }

  return (
    <Box p={{ base: 4, lg: 8 }}>
      <Heading size='lg'>上傳新創資料</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mt='4' isInvalid={!!errors.name}>
          <FormLabel htmlFor='name'>Name</FormLabel>
          <Input
            {...register('name', {
              required: 'This is required'
            })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl mt='4' isInvalid={!!errors.url}>
          <FormLabel htmlFor='url'>Url</FormLabel>
          <Input
            {...register('url', {
              pattern: { value: /^((?:https?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b[-a-zA-Z0-9@:%_+.~#?&/=]*|)$/, message: 'Please enter a valid url'}
            })}
          />
          <FormErrorMessage>
            {errors.url && errors.url.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl mt='4'>
          <FormLabel htmlFor='logo'>Logo</FormLabel>
          <Input
            {...register('logo', {
              pattern: { value: /^((?:https?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b[-a-zA-Z0-9@:%_+.~#?&/=]*|)$/, message: 'Please enter a valid url'}
            })}
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
          <FormLabel htmlFor='description'>Description</FormLabel>
          <Textarea
            {...register('description')}
          />
        </FormControl>
        <FormControl mt='4'>
          <FormLabel htmlFor='foundedAt'>Founded At</FormLabel>
          <Input
            type='date'
            defaultValue={'1900-01-01'}
            {...register('foundedAt', {
              valueAsDate: true
            })}
          />
        </FormControl>
        <FormControl mt='4'>
          <FormLabel htmlFor='teamSize'>Team Size</FormLabel>
          <Input
            type="number"
            defaultValue={0}
            {...register('teamSize', {
              valueAsNumber: true
            })}
          />
        </FormControl>
        <FormControl mt='4'>
          <FormLabel htmlFor='funding'>Funding(USD)</FormLabel>
          <Input
            type="number"
            defaultValue={0}
            {...register('funding', {
              valueAsNumber: true,
            })}
          />
        </FormControl>
        <FormControl mt='4'>
          <FormLabel htmlFor='valuation'>Valuation(USD)</FormLabel>
          <Input
            type="number"
            defaultValue={0}
            {...register('valuation', {
              valueAsNumber: true
            })}
          />
        </FormControl>
        <FormControl mt='4'>
          <FormLabel htmlFor='revenue'>Annual Recuring Revenue</FormLabel>
          <Input
            type="number"
            defaultValue={0}
            {...register('revenue', {
              valueAsNumber: true
            })}
          />
        </FormControl>
        <FormControl mt='4'>
          <FormLabel htmlFor='dau'>Daily Active User</FormLabel>
          <Input
            type="number"
            defaultValue={0}
            {...register('dau', {
              valueAsNumber: true
            })}
          />
        </FormControl>
        <Button mt={4} isLoading={isSubmitting} type='submit'>
          送出
        </Button>
      </form>
    </Box>
  )
}

export default StartupCreate