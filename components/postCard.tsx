import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { Box, Button, Center, Flex, Heading, Icon, Link, Text } from '@chakra-ui/react'
import { formatDistanceToNowStrict } from 'date-fns'
import React from 'react'
import { Post } from '../codegen/graphql'
import { BiMessageAdd, BiUser } from 'react-icons/bi'

type PostCardProps = {
  post: Post
}

const PostCard = (props: PostCardProps) => {
  const { post } = props

  return <Flex w='800px' bg='white' p='8px 16px' borderRadius='lg' boxShadow='0px 0px 15px rgba(0, 0, 0, 0.1)' gap='20px'>
    <Flex direction='column' w='32px' alignItems='center'>
      <TriangleUpIcon m='8px'/>
      <Center>{post.upvoteCount}</Center>  
      <TriangleDownIcon m='8px' />
    </Flex>
    <Flex flex='1' pt='12px'>
      <Flex flex='1' direction='column' gap='12px'>
        {post.url 
          ? <Link href={post.url} target='_new'>
              <Box>
                <Heading size='sm' display='inline'>{post.title}</Heading>
                <Text display='inline' size='8' ml='1' color='gray'>{`(${new URL(post.url).hostname})`}</Text>
              </Box>
            </Link>
          : <Box>
              <Heading size='sm' display='inline'>{post.title}</Heading>
            </Box>
        }
        <Flex fontSize='sm' fontWeight='thin' gap='8px'>
          <Button size='sm' borderRadius='100px' bg='blackAlpha.50' fontWeight='normal' leftIcon={<Icon boxSize='18px' as={BiMessageAdd}/>}>
            {post.commentCount} Comments
          </Button>
          <Button size='sm' borderRadius='100px' bg='blackAlpha.50' fontWeight='normal' leftIcon={<Icon boxSize='18px' as={BiUser}/>}>
            {post.poster?.username}
          </Button>
        </Flex>
      </Flex>
      <Flex w='60px' justifyContent='flex-end'>
        <Text fontSize='xs' color='gray'>{formatDistanceToNowStrict(post.createdAt)}</Text>
      </Flex> 
    </Flex>
  </Flex>
}

export default PostCard