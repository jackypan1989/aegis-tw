import { Role } from '.prisma/client';
import { Market } from '.prisma/client';
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Profile as ProfileModel, Post as PostModel, Vote as VoteModel, Comment as CommentModel } from '.prisma/client';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type EnumResolverSignature<T, AllowedValues = any> = { [key in keyof T]?: AllowedValues };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Cursor: string;
  Date: Date;
};

export type Comment = {
  __typename?: 'Comment';
  commentId?: Maybe<Scalars['ID']>;
  commenter?: Maybe<Profile>;
  commenterId: Scalars['ID'];
  content: Scalars['String'];
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  post?: Maybe<Post>;
  postId: Scalars['ID'];
  updatedAt: Scalars['Date'];
};

export type CommentConnection = {
  __typename?: 'CommentConnection';
  edges: Array<CommentEdges>;
  pageInfo: PageInfo;
};

export type CommentEdges = {
  __typename?: 'CommentEdges';
  cursor: Scalars['Cursor'];
  node: Comment;
};

export type CommentFilter = {
  postId?: InputMaybe<Scalars['ID']>;
};

export type CreateCommentMutationInput = {
  commentId?: InputMaybe<Scalars['ID']>;
  content: Scalars['String'];
  postId: Scalars['ID'];
};

export type CreatePostMutationInput = {
  content?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  url?: InputMaybe<Scalars['String']>;
};

export type CreateVoteMutationInput = {
  postId: Scalars['ID'];
};

export type GetUrlMetadataInput = {
  url: Scalars['String'];
};

export { Market };

export type Metadata = {
  __typename?: 'Metadata';
  title?: Maybe<Scalars['String']>;
  url: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: Comment;
  createPost: Post;
  createVote: Vote;
  getUrlMetadata?: Maybe<Metadata>;
  removeComment: Comment;
  removePost: Post;
  removeVote: Vote;
  updateEveryPostRankingScore: Scalars['Boolean'];
  updateProfile?: Maybe<Profile>;
  viewPost: Post;
};


export type MutationCreateCommentArgs = {
  input: CreateCommentMutationInput;
};


export type MutationCreatePostArgs = {
  input: CreatePostMutationInput;
};


export type MutationCreateVoteArgs = {
  input: CreateVoteMutationInput;
};


export type MutationGetUrlMetadataArgs = {
  input: GetUrlMetadataInput;
};


export type MutationRemoveCommentArgs = {
  input: RemoveCommentMutationInput;
};


export type MutationRemovePostArgs = {
  input: RemovePostMutationInput;
};


export type MutationRemoveVoteArgs = {
  input: RemoveVoteMutationInput;
};


export type MutationUpdateProfileArgs = {
  input: UpdateProfileMutationInput;
};


export type MutationViewPostArgs = {
  input: ViewPostMutationInput;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['Cursor']>;
  hasNextPage?: Maybe<Scalars['Boolean']>;
  hasPreviousPage?: Maybe<Scalars['Boolean']>;
  startCursor?: Maybe<Scalars['Cursor']>;
  totalPageCount?: Maybe<Scalars['Int']>;
};

export type Post = {
  __typename?: 'Post';
  commentCount: Scalars['Int'];
  comments: Array<Comment>;
  content?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  isVoted: Scalars['Boolean'];
  poster?: Maybe<Profile>;
  posterId: Scalars['ID'];
  rankingScore: Scalars['Float'];
  title: Scalars['String'];
  updatedAt: Scalars['Date'];
  url?: Maybe<Scalars['String']>;
  viewCount: Scalars['Int'];
  voteCount: Scalars['Int'];
};

export type PostConnection = {
  __typename?: 'PostConnection';
  edges: Array<PostEdges>;
  pageInfo: PageInfo;
};

export type PostEdges = {
  __typename?: 'PostEdges';
  cursor: Scalars['Cursor'];
  node: Post;
};

export type PostFilter = {
  onlyJobs: Scalars['Boolean'];
};

export type Profile = {
  __typename?: 'Profile';
  avatarUrl?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  email: Scalars['String'];
  facebook?: Maybe<Scalars['String']>;
  fullname?: Maybe<Scalars['String']>;
  github?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  linkedin?: Maybe<Scalars['String']>;
  markets: Array<Market>;
  roles: Array<Role>;
  twitter?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Date'];
  username: Scalars['String'];
  website?: Maybe<Scalars['String']>;
};

export type ProfileConnection = {
  __typename?: 'ProfileConnection';
  edges: Array<ProfileEdges>;
  pageInfo: PageInfo;
};

export type ProfileEdges = {
  __typename?: 'ProfileEdges';
  cursor: Scalars['Cursor'];
  node: Profile;
};

export type ProfileFilter = {
  markets?: InputMaybe<Array<Market>>;
  roles?: InputMaybe<Array<Role>>;
};

export type Query = {
  __typename?: 'Query';
  comments?: Maybe<CommentConnection>;
  post?: Maybe<Post>;
  posts: PostConnection;
  profile?: Maybe<Profile>;
  profiles: ProfileConnection;
};


export type QueryCommentsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<CommentFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryPostArgs = {
  id: Scalars['ID'];
};


export type QueryPostsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<PostFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryProfileArgs = {
  id: Scalars['ID'];
};


export type QueryProfilesArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<ProfileFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type RemoveCommentMutationInput = {
  id: Scalars['ID'];
};

export type RemovePostMutationInput = {
  id: Scalars['ID'];
};

export type RemoveVoteMutationInput = {
  postId: Scalars['ID'];
};

export { Role };

export type UpdateProfileMutationInput = {
  avatarUrl?: InputMaybe<Scalars['String']>;
  facebook?: InputMaybe<Scalars['String']>;
  fullname?: InputMaybe<Scalars['String']>;
  github?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  linkedin?: InputMaybe<Scalars['String']>;
  markets: Array<Market>;
  roles: Array<Role>;
  twitter?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
};

export type ViewPostMutationInput = {
  id: Scalars['ID'];
};

export type Vote = {
  __typename?: 'Vote';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  post?: Maybe<Post>;
  postId: Scalars['ID'];
  updatedAt: Scalars['Date'];
  voterId: Scalars['ID'];
};

export type VoteConnection = {
  __typename?: 'VoteConnection';
  edges: Array<VoteEdges>;
  pageInfo: PageInfo;
};

export type VoteEdges = {
  __typename?: 'VoteEdges';
  cursor: Scalars['Cursor'];
  node: Vote;
};

export type CommentsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<CommentFilter>;
}>;


export type CommentsQuery = { __typename?: 'Query', comments?: { __typename?: 'CommentConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage?: boolean | null | undefined, endCursor?: string | null | undefined }, edges: Array<{ __typename?: 'CommentEdges', cursor: string, node: { __typename?: 'Comment', id: string, createdAt: Date, content: string, commenter?: { __typename?: 'Profile', id: string, username: string, fullname?: string | null | undefined } | null | undefined } }> } | null | undefined };

export type CreateCommentMutationVariables = Exact<{
  input: CreateCommentMutationInput;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comment', id: string, createdAt: Date, content: string, commenter?: { __typename?: 'Profile', id: string, username: string, fullname?: string | null | undefined } | null | undefined } };

export type RemoveCommentMutationVariables = Exact<{
  input: RemoveCommentMutationInput;
}>;


export type RemoveCommentMutation = { __typename?: 'Mutation', removeComment: { __typename?: 'Comment', id: string, createdAt: Date, content: string, commenter?: { __typename?: 'Profile', id: string, username: string, fullname?: string | null | undefined } | null | undefined } };

export type PostCardFragment = { __typename?: 'Post', id: string, createdAt: Date, title: string, url?: string | null | undefined, content?: string | null | undefined, viewCount: number, voteCount: number, commentCount: number, rankingScore: number, isVoted: boolean, poster?: { __typename?: 'Profile', id: string, username: string } | null | undefined };

export type RemovePostMutationVariables = Exact<{
  input: RemovePostMutationInput;
}>;


export type RemovePostMutation = { __typename?: 'Mutation', removePost: { __typename?: 'Post', id: string } };

export type CreateVoteMutationVariables = Exact<{
  input: CreateVoteMutationInput;
}>;


export type CreateVoteMutation = { __typename?: 'Mutation', createVote: { __typename?: 'Vote', id: string, post?: { __typename?: 'Post', id: string, isVoted: boolean } | null | undefined } };

export type RemoveVoteMutationVariables = Exact<{
  input: RemoveVoteMutationInput;
}>;


export type RemoveVoteMutation = { __typename?: 'Mutation', removeVote: { __typename?: 'Vote', id: string, post?: { __typename?: 'Post', id: string, isVoted: boolean } | null | undefined } };

export type ViewPostMutationVariables = Exact<{
  input: ViewPostMutationInput;
}>;


export type ViewPostMutation = { __typename?: 'Mutation', viewPost: { __typename?: 'Post', id: string, viewCount: number } };

export type ProfileCardFragment = { __typename?: 'Profile', id: string, email: string, username: string, fullname?: string | null | undefined, roles: Array<Role>, markets: Array<Market>, avatarUrl?: string | null | undefined, website?: string | null | undefined, linkedin?: string | null | undefined, facebook?: string | null | undefined, twitter?: string | null | undefined, github?: string | null | undefined };

export type ListProfileQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<ProfileFilter>;
}>;


export type ListProfileQuery = { __typename?: 'Query', profiles: { __typename?: 'ProfileConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage?: boolean | null | undefined, endCursor?: string | null | undefined }, edges: Array<{ __typename?: 'ProfileEdges', cursor: string, node: { __typename?: 'Profile', id: string, email: string, username: string, fullname?: string | null | undefined, roles: Array<Role>, markets: Array<Market>, avatarUrl?: string | null | undefined, website?: string | null | undefined, linkedin?: string | null | undefined, facebook?: string | null | undefined, twitter?: string | null | undefined, github?: string | null | undefined } }> } };

export type ListPostOnlyJobQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<PostFilter>;
}>;


export type ListPostOnlyJobQuery = { __typename?: 'Query', posts: { __typename?: 'PostConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage?: boolean | null | undefined, endCursor?: string | null | undefined }, edges: Array<{ __typename?: 'PostEdges', cursor: string, node: { __typename?: 'Post', id: string, createdAt: Date, title: string, url?: string | null | undefined, content?: string | null | undefined, viewCount: number, voteCount: number, commentCount: number, rankingScore: number, isVoted: boolean, poster?: { __typename?: 'Profile', id: string, username: string } | null | undefined } }> } };

export type GetPostQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetPostQuery = { __typename?: 'Query', post?: { __typename?: 'Post', id: string, createdAt: Date, title: string, url?: string | null | undefined, content?: string | null | undefined, viewCount: number, voteCount: number, commentCount: number, rankingScore: number, isVoted: boolean, poster?: { __typename?: 'Profile', id: string, username: string } | null | undefined } | null | undefined };

export type CreatePostMutationVariables = Exact<{
  input: CreatePostMutationInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: string } };

export type GetUrlMetadataMutationVariables = Exact<{
  input: GetUrlMetadataInput;
}>;


export type GetUrlMetadataMutation = { __typename?: 'Mutation', getUrlMetadata?: { __typename?: 'Metadata', url: string, title?: string | null | undefined } | null | undefined };

export type ListPostQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<PostFilter>;
}>;


export type ListPostQuery = { __typename?: 'Query', posts: { __typename?: 'PostConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage?: boolean | null | undefined, endCursor?: string | null | undefined }, edges: Array<{ __typename?: 'PostEdges', cursor: string, node: { __typename?: 'Post', id: string, createdAt: Date, title: string, url?: string | null | undefined, content?: string | null | undefined, viewCount: number, voteCount: number, commentCount: number, rankingScore: number, isVoted: boolean, poster?: { __typename?: 'Profile', id: string, username: string } | null | undefined } }> } };

export type GetProfileQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetProfileQuery = { __typename?: 'Query', profile?: { __typename?: 'Profile', id: string, email: string, username: string, fullname?: string | null | undefined, roles: Array<Role>, markets: Array<Market>, avatarUrl?: string | null | undefined, website?: string | null | undefined, linkedin?: string | null | undefined, facebook?: string | null | undefined, twitter?: string | null | undefined, github?: string | null | undefined } | null | undefined };

export type UpdateProfileMutationVariables = Exact<{
  input: UpdateProfileMutationInput;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile?: { __typename?: 'Profile', id: string, email: string, username: string, fullname?: string | null | undefined, roles: Array<Role>, markets: Array<Market>, avatarUrl?: string | null | undefined, website?: string | null | undefined, linkedin?: string | null | undefined, facebook?: string | null | undefined, twitter?: string | null | undefined, github?: string | null | undefined } | null | undefined };

export const PostCardFragmentDoc = gql`
    fragment PostCard on Post {
  id
  createdAt
  title
  url
  content
  viewCount
  voteCount
  commentCount
  rankingScore
  isVoted
  poster {
    id
    username
  }
}
    `;
export const ProfileCardFragmentDoc = gql`
    fragment ProfileCard on Profile {
  id
  email
  username
  fullname
  roles
  markets
  avatarUrl
  website
  linkedin
  facebook
  twitter
  github
}
    `;
export const CommentsDocument = gql`
    query comments($first: Int, $after: Cursor, $filter: CommentFilter) {
  comments(first: $first, after: $after, filter: $filter) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      cursor
      node {
        id
        createdAt
        content
        commenter {
          id
          username
          fullname
        }
      }
    }
  }
}
    `;

/**
 * __useCommentsQuery__
 *
 * To run a query within a React component, call `useCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useCommentsQuery(baseOptions?: Apollo.QueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, options);
      }
export function useCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, options);
        }
export type CommentsQueryHookResult = ReturnType<typeof useCommentsQuery>;
export type CommentsLazyQueryHookResult = ReturnType<typeof useCommentsLazyQuery>;
export type CommentsQueryResult = Apollo.QueryResult<CommentsQuery, CommentsQueryVariables>;
export const CreateCommentDocument = gql`
    mutation createComment($input: CreateCommentMutationInput!) {
  createComment(input: $input) {
    id
    createdAt
    content
    commenter {
      id
      username
      fullname
    }
  }
}
    `;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const RemoveCommentDocument = gql`
    mutation removeComment($input: RemoveCommentMutationInput!) {
  removeComment(input: $input) {
    id
    createdAt
    content
    commenter {
      id
      username
      fullname
    }
  }
}
    `;
export type RemoveCommentMutationFn = Apollo.MutationFunction<RemoveCommentMutation, RemoveCommentMutationVariables>;

/**
 * __useRemoveCommentMutation__
 *
 * To run a mutation, you first call `useRemoveCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCommentMutation, { data, loading, error }] = useRemoveCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveCommentMutation(baseOptions?: Apollo.MutationHookOptions<RemoveCommentMutation, RemoveCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveCommentMutation, RemoveCommentMutationVariables>(RemoveCommentDocument, options);
      }
export type RemoveCommentMutationHookResult = ReturnType<typeof useRemoveCommentMutation>;
export type RemoveCommentMutationResult = Apollo.MutationResult<RemoveCommentMutation>;
export type RemoveCommentMutationOptions = Apollo.BaseMutationOptions<RemoveCommentMutation, RemoveCommentMutationVariables>;
export const RemovePostDocument = gql`
    mutation removePost($input: RemovePostMutationInput!) {
  removePost(input: $input) {
    id
  }
}
    `;
export type RemovePostMutationFn = Apollo.MutationFunction<RemovePostMutation, RemovePostMutationVariables>;

/**
 * __useRemovePostMutation__
 *
 * To run a mutation, you first call `useRemovePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemovePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removePostMutation, { data, loading, error }] = useRemovePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemovePostMutation(baseOptions?: Apollo.MutationHookOptions<RemovePostMutation, RemovePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemovePostMutation, RemovePostMutationVariables>(RemovePostDocument, options);
      }
export type RemovePostMutationHookResult = ReturnType<typeof useRemovePostMutation>;
export type RemovePostMutationResult = Apollo.MutationResult<RemovePostMutation>;
export type RemovePostMutationOptions = Apollo.BaseMutationOptions<RemovePostMutation, RemovePostMutationVariables>;
export const CreateVoteDocument = gql`
    mutation createVote($input: CreateVoteMutationInput!) {
  createVote(input: $input) {
    id
    post {
      id
      isVoted
    }
  }
}
    `;
export type CreateVoteMutationFn = Apollo.MutationFunction<CreateVoteMutation, CreateVoteMutationVariables>;

/**
 * __useCreateVoteMutation__
 *
 * To run a mutation, you first call `useCreateVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVoteMutation, { data, loading, error }] = useCreateVoteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateVoteMutation(baseOptions?: Apollo.MutationHookOptions<CreateVoteMutation, CreateVoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateVoteMutation, CreateVoteMutationVariables>(CreateVoteDocument, options);
      }
export type CreateVoteMutationHookResult = ReturnType<typeof useCreateVoteMutation>;
export type CreateVoteMutationResult = Apollo.MutationResult<CreateVoteMutation>;
export type CreateVoteMutationOptions = Apollo.BaseMutationOptions<CreateVoteMutation, CreateVoteMutationVariables>;
export const RemoveVoteDocument = gql`
    mutation removeVote($input: RemoveVoteMutationInput!) {
  removeVote(input: $input) {
    id
    post {
      id
      isVoted
    }
  }
}
    `;
export type RemoveVoteMutationFn = Apollo.MutationFunction<RemoveVoteMutation, RemoveVoteMutationVariables>;

/**
 * __useRemoveVoteMutation__
 *
 * To run a mutation, you first call `useRemoveVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeVoteMutation, { data, loading, error }] = useRemoveVoteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveVoteMutation(baseOptions?: Apollo.MutationHookOptions<RemoveVoteMutation, RemoveVoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveVoteMutation, RemoveVoteMutationVariables>(RemoveVoteDocument, options);
      }
export type RemoveVoteMutationHookResult = ReturnType<typeof useRemoveVoteMutation>;
export type RemoveVoteMutationResult = Apollo.MutationResult<RemoveVoteMutation>;
export type RemoveVoteMutationOptions = Apollo.BaseMutationOptions<RemoveVoteMutation, RemoveVoteMutationVariables>;
export const ViewPostDocument = gql`
    mutation viewPost($input: ViewPostMutationInput!) {
  viewPost(input: $input) {
    id
    viewCount
  }
}
    `;
export type ViewPostMutationFn = Apollo.MutationFunction<ViewPostMutation, ViewPostMutationVariables>;

/**
 * __useViewPostMutation__
 *
 * To run a mutation, you first call `useViewPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useViewPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [viewPostMutation, { data, loading, error }] = useViewPostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useViewPostMutation(baseOptions?: Apollo.MutationHookOptions<ViewPostMutation, ViewPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ViewPostMutation, ViewPostMutationVariables>(ViewPostDocument, options);
      }
export type ViewPostMutationHookResult = ReturnType<typeof useViewPostMutation>;
export type ViewPostMutationResult = Apollo.MutationResult<ViewPostMutation>;
export type ViewPostMutationOptions = Apollo.BaseMutationOptions<ViewPostMutation, ViewPostMutationVariables>;
export const ListProfileDocument = gql`
    query listProfile($first: Int, $after: Cursor, $filter: ProfileFilter) {
  profiles(first: $first, after: $after, filter: $filter) {
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
    ${ProfileCardFragmentDoc}`;

/**
 * __useListProfileQuery__
 *
 * To run a query within a React component, call `useListProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useListProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListProfileQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useListProfileQuery(baseOptions?: Apollo.QueryHookOptions<ListProfileQuery, ListProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListProfileQuery, ListProfileQueryVariables>(ListProfileDocument, options);
      }
export function useListProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListProfileQuery, ListProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListProfileQuery, ListProfileQueryVariables>(ListProfileDocument, options);
        }
export type ListProfileQueryHookResult = ReturnType<typeof useListProfileQuery>;
export type ListProfileLazyQueryHookResult = ReturnType<typeof useListProfileLazyQuery>;
export type ListProfileQueryResult = Apollo.QueryResult<ListProfileQuery, ListProfileQueryVariables>;
export const ListPostOnlyJobDocument = gql`
    query listPostOnlyJob($first: Int, $after: Cursor, $filter: PostFilter) {
  posts(first: $first, after: $after, filter: $filter) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      cursor
      node {
        ...PostCard
      }
    }
  }
}
    ${PostCardFragmentDoc}`;

/**
 * __useListPostOnlyJobQuery__
 *
 * To run a query within a React component, call `useListPostOnlyJobQuery` and pass it any options that fit your needs.
 * When your component renders, `useListPostOnlyJobQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListPostOnlyJobQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useListPostOnlyJobQuery(baseOptions?: Apollo.QueryHookOptions<ListPostOnlyJobQuery, ListPostOnlyJobQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListPostOnlyJobQuery, ListPostOnlyJobQueryVariables>(ListPostOnlyJobDocument, options);
      }
export function useListPostOnlyJobLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListPostOnlyJobQuery, ListPostOnlyJobQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListPostOnlyJobQuery, ListPostOnlyJobQueryVariables>(ListPostOnlyJobDocument, options);
        }
export type ListPostOnlyJobQueryHookResult = ReturnType<typeof useListPostOnlyJobQuery>;
export type ListPostOnlyJobLazyQueryHookResult = ReturnType<typeof useListPostOnlyJobLazyQuery>;
export type ListPostOnlyJobQueryResult = Apollo.QueryResult<ListPostOnlyJobQuery, ListPostOnlyJobQueryVariables>;
export const GetPostDocument = gql`
    query getPost($id: ID!) {
  post(id: $id) {
    ...PostCard
  }
}
    ${PostCardFragmentDoc}`;

/**
 * __useGetPostQuery__
 *
 * To run a query within a React component, call `useGetPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPostQuery(baseOptions: Apollo.QueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
      }
export function useGetPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
        }
export type GetPostQueryHookResult = ReturnType<typeof useGetPostQuery>;
export type GetPostLazyQueryHookResult = ReturnType<typeof useGetPostLazyQuery>;
export type GetPostQueryResult = Apollo.QueryResult<GetPostQuery, GetPostQueryVariables>;
export const CreatePostDocument = gql`
    mutation createPost($input: CreatePostMutationInput!) {
  createPost(input: $input) {
    id
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const GetUrlMetadataDocument = gql`
    mutation getUrlMetadata($input: GetUrlMetadataInput!) {
  getUrlMetadata(input: $input) {
    url
    title
  }
}
    `;
export type GetUrlMetadataMutationFn = Apollo.MutationFunction<GetUrlMetadataMutation, GetUrlMetadataMutationVariables>;

/**
 * __useGetUrlMetadataMutation__
 *
 * To run a mutation, you first call `useGetUrlMetadataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetUrlMetadataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getUrlMetadataMutation, { data, loading, error }] = useGetUrlMetadataMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetUrlMetadataMutation(baseOptions?: Apollo.MutationHookOptions<GetUrlMetadataMutation, GetUrlMetadataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetUrlMetadataMutation, GetUrlMetadataMutationVariables>(GetUrlMetadataDocument, options);
      }
export type GetUrlMetadataMutationHookResult = ReturnType<typeof useGetUrlMetadataMutation>;
export type GetUrlMetadataMutationResult = Apollo.MutationResult<GetUrlMetadataMutation>;
export type GetUrlMetadataMutationOptions = Apollo.BaseMutationOptions<GetUrlMetadataMutation, GetUrlMetadataMutationVariables>;
export const ListPostDocument = gql`
    query listPost($first: Int, $after: Cursor, $filter: PostFilter) {
  posts(first: $first, after: $after, filter: $filter) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      cursor
      node {
        ...PostCard
      }
    }
  }
}
    ${PostCardFragmentDoc}`;

/**
 * __useListPostQuery__
 *
 * To run a query within a React component, call `useListPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useListPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListPostQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useListPostQuery(baseOptions?: Apollo.QueryHookOptions<ListPostQuery, ListPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListPostQuery, ListPostQueryVariables>(ListPostDocument, options);
      }
export function useListPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListPostQuery, ListPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListPostQuery, ListPostQueryVariables>(ListPostDocument, options);
        }
export type ListPostQueryHookResult = ReturnType<typeof useListPostQuery>;
export type ListPostLazyQueryHookResult = ReturnType<typeof useListPostLazyQuery>;
export type ListPostQueryResult = Apollo.QueryResult<ListPostQuery, ListPostQueryVariables>;
export const GetProfileDocument = gql`
    query getProfile($id: ID!) {
  profile(id: $id) {
    ...ProfileCard
  }
}
    ${ProfileCardFragmentDoc}`;

/**
 * __useGetProfileQuery__
 *
 * To run a query within a React component, call `useGetProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProfileQuery(baseOptions: Apollo.QueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
      }
export function useGetProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
        }
export type GetProfileQueryHookResult = ReturnType<typeof useGetProfileQuery>;
export type GetProfileLazyQueryHookResult = ReturnType<typeof useGetProfileLazyQuery>;
export type GetProfileQueryResult = Apollo.QueryResult<GetProfileQuery, GetProfileQueryVariables>;
export const UpdateProfileDocument = gql`
    mutation updateProfile($input: UpdateProfileMutationInput!) {
  updateProfile(input: $input) {
    ...ProfileCard
  }
}
    ${ProfileCardFragmentDoc}`;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;


export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Comment: ResolverTypeWrapper<CommentModel>;
  CommentConnection: ResolverTypeWrapper<Omit<CommentConnection, 'edges'> & { edges: Array<ResolversTypes['CommentEdges']> }>;
  CommentEdges: ResolverTypeWrapper<Omit<CommentEdges, 'node'> & { node: ResolversTypes['Comment'] }>;
  CommentFilter: CommentFilter;
  CreateCommentMutationInput: CreateCommentMutationInput;
  CreatePostMutationInput: CreatePostMutationInput;
  CreateVoteMutationInput: CreateVoteMutationInput;
  Cursor: ResolverTypeWrapper<Scalars['Cursor']>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  GetUrlMetadataInput: GetUrlMetadataInput;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Market: Market;
  Metadata: ResolverTypeWrapper<Metadata>;
  Mutation: ResolverTypeWrapper<{}>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Post: ResolverTypeWrapper<PostModel>;
  PostConnection: ResolverTypeWrapper<Omit<PostConnection, 'edges'> & { edges: Array<ResolversTypes['PostEdges']> }>;
  PostEdges: ResolverTypeWrapper<Omit<PostEdges, 'node'> & { node: ResolversTypes['Post'] }>;
  PostFilter: PostFilter;
  Profile: ResolverTypeWrapper<ProfileModel>;
  ProfileConnection: ResolverTypeWrapper<Omit<ProfileConnection, 'edges'> & { edges: Array<ResolversTypes['ProfileEdges']> }>;
  ProfileEdges: ResolverTypeWrapper<Omit<ProfileEdges, 'node'> & { node: ResolversTypes['Profile'] }>;
  ProfileFilter: ProfileFilter;
  Query: ResolverTypeWrapper<{}>;
  RemoveCommentMutationInput: RemoveCommentMutationInput;
  RemovePostMutationInput: RemovePostMutationInput;
  RemoveVoteMutationInput: RemoveVoteMutationInput;
  Role: Role;
  String: ResolverTypeWrapper<Scalars['String']>;
  UpdateProfileMutationInput: UpdateProfileMutationInput;
  ViewPostMutationInput: ViewPostMutationInput;
  Vote: ResolverTypeWrapper<VoteModel>;
  VoteConnection: ResolverTypeWrapper<Omit<VoteConnection, 'edges'> & { edges: Array<ResolversTypes['VoteEdges']> }>;
  VoteEdges: ResolverTypeWrapper<Omit<VoteEdges, 'node'> & { node: ResolversTypes['Vote'] }>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Comment: CommentModel;
  CommentConnection: Omit<CommentConnection, 'edges'> & { edges: Array<ResolversParentTypes['CommentEdges']> };
  CommentEdges: Omit<CommentEdges, 'node'> & { node: ResolversParentTypes['Comment'] };
  CommentFilter: CommentFilter;
  CreateCommentMutationInput: CreateCommentMutationInput;
  CreatePostMutationInput: CreatePostMutationInput;
  CreateVoteMutationInput: CreateVoteMutationInput;
  Cursor: Scalars['Cursor'];
  Date: Scalars['Date'];
  Float: Scalars['Float'];
  GetUrlMetadataInput: GetUrlMetadataInput;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Metadata: Metadata;
  Mutation: {};
  PageInfo: PageInfo;
  Post: PostModel;
  PostConnection: Omit<PostConnection, 'edges'> & { edges: Array<ResolversParentTypes['PostEdges']> };
  PostEdges: Omit<PostEdges, 'node'> & { node: ResolversParentTypes['Post'] };
  PostFilter: PostFilter;
  Profile: ProfileModel;
  ProfileConnection: Omit<ProfileConnection, 'edges'> & { edges: Array<ResolversParentTypes['ProfileEdges']> };
  ProfileEdges: Omit<ProfileEdges, 'node'> & { node: ResolversParentTypes['Profile'] };
  ProfileFilter: ProfileFilter;
  Query: {};
  RemoveCommentMutationInput: RemoveCommentMutationInput;
  RemovePostMutationInput: RemovePostMutationInput;
  RemoveVoteMutationInput: RemoveVoteMutationInput;
  String: Scalars['String'];
  UpdateProfileMutationInput: UpdateProfileMutationInput;
  ViewPostMutationInput: ViewPostMutationInput;
  Vote: VoteModel;
  VoteConnection: Omit<VoteConnection, 'edges'> & { edges: Array<ResolversParentTypes['VoteEdges']> };
  VoteEdges: Omit<VoteEdges, 'node'> & { node: ResolversParentTypes['Vote'] };
};

export type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  commentId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  commenter?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  commenterId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  postId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommentConnection'] = ResolversParentTypes['CommentConnection']> = {
  edges?: Resolver<Array<ResolversTypes['CommentEdges']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentEdgesResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommentEdges'] = ResolversParentTypes['CommentEdges']> = {
  cursor?: Resolver<ResolversTypes['Cursor'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Comment'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface CursorScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Cursor'], any> {
  name: 'Cursor';
}

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type MarketResolvers = EnumResolverSignature<{ AD_TECH?: any, AI?: any, ANALYTICS?: any, COMSUMER?: any, CRYPTO?: any, DATABASES?: any, DEVELOPER_TOOL?: any, EDUCATION?: any, E_COMMERCE?: any, FASHION?: any, FINANCE?: any, FITNESS?: any, FOOD?: any, GAMES?: any, HEALTH_CARE?: any, HUMAN_RESOURCE?: any, LOGISTICS?: any, MEDIA?: any, PRODUCTIVITY?: any, REAL_ESTATE?: any, SECURITY?: any, SOCIAL_MEDIA?: any, TRAVEL?: any, VIRTUAL_REALITY?: any, WEARABLES?: any }, ResolversTypes['Market']>;

export type MetadataResolvers<ContextType = any, ParentType extends ResolversParentTypes['Metadata'] = ResolversParentTypes['Metadata']> = {
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationCreateCommentArgs, 'input'>>;
  createPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'input'>>;
  createVote?: Resolver<ResolversTypes['Vote'], ParentType, ContextType, RequireFields<MutationCreateVoteArgs, 'input'>>;
  getUrlMetadata?: Resolver<Maybe<ResolversTypes['Metadata']>, ParentType, ContextType, RequireFields<MutationGetUrlMetadataArgs, 'input'>>;
  removeComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationRemoveCommentArgs, 'input'>>;
  removePost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationRemovePostArgs, 'input'>>;
  removeVote?: Resolver<ResolversTypes['Vote'], ParentType, ContextType, RequireFields<MutationRemoveVoteArgs, 'input'>>;
  updateEveryPostRankingScore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  updateProfile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType, RequireFields<MutationUpdateProfileArgs, 'input'>>;
  viewPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationViewPostArgs, 'input'>>;
};

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  endCursor?: Resolver<Maybe<ResolversTypes['Cursor']>, ParentType, ContextType>;
  hasNextPage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  hasPreviousPage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  startCursor?: Resolver<Maybe<ResolversTypes['Cursor']>, ParentType, ContextType>;
  totalPageCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  commentCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  comments?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isVoted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  poster?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  posterId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  rankingScore?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  viewCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  voteCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostConnection'] = ResolversParentTypes['PostConnection']> = {
  edges?: Resolver<Array<ResolversTypes['PostEdges']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostEdgesResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostEdges'] = ResolversParentTypes['PostEdges']> = {
  cursor?: Resolver<ResolversTypes['Cursor'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['Profile'] = ResolversParentTypes['Profile']> = {
  avatarUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  facebook?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fullname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  github?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  linkedin?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  markets?: Resolver<Array<ResolversTypes['Market']>, ParentType, ContextType>;
  roles?: Resolver<Array<ResolversTypes['Role']>, ParentType, ContextType>;
  twitter?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProfileConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProfileConnection'] = ResolversParentTypes['ProfileConnection']> = {
  edges?: Resolver<Array<ResolversTypes['ProfileEdges']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProfileEdgesResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProfileEdges'] = ResolversParentTypes['ProfileEdges']> = {
  cursor?: Resolver<ResolversTypes['Cursor'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  comments?: Resolver<Maybe<ResolversTypes['CommentConnection']>, ParentType, ContextType, Partial<QueryCommentsArgs>>;
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryPostArgs, 'id'>>;
  posts?: Resolver<ResolversTypes['PostConnection'], ParentType, ContextType, Partial<QueryPostsArgs>>;
  profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType, RequireFields<QueryProfileArgs, 'id'>>;
  profiles?: Resolver<ResolversTypes['ProfileConnection'], ParentType, ContextType, Partial<QueryProfilesArgs>>;
};

export type RoleResolvers = EnumResolverSignature<{ ANGEL_INVESTOR?: any, DESIGNER?: any, ENGINEERING?: any, FOUNDER?: any, MARKETING?: any, OPERATIONS?: any, PRODUCT?: any, SALES?: any, VENTURE_CAPITAL?: any }, ResolversTypes['Role']>;

export type VoteResolvers<ContextType = any, ParentType extends ResolversParentTypes['Vote'] = ResolversParentTypes['Vote']> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  postId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  voterId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VoteConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['VoteConnection'] = ResolversParentTypes['VoteConnection']> = {
  edges?: Resolver<Array<ResolversTypes['VoteEdges']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VoteEdgesResolvers<ContextType = any, ParentType extends ResolversParentTypes['VoteEdges'] = ResolversParentTypes['VoteEdges']> = {
  cursor?: Resolver<ResolversTypes['Cursor'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Vote'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Comment?: CommentResolvers<ContextType>;
  CommentConnection?: CommentConnectionResolvers<ContextType>;
  CommentEdges?: CommentEdgesResolvers<ContextType>;
  Cursor?: GraphQLScalarType;
  Date?: GraphQLScalarType;
  Market?: MarketResolvers;
  Metadata?: MetadataResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  PostConnection?: PostConnectionResolvers<ContextType>;
  PostEdges?: PostEdgesResolvers<ContextType>;
  Profile?: ProfileResolvers<ContextType>;
  ProfileConnection?: ProfileConnectionResolvers<ContextType>;
  ProfileEdges?: ProfileEdgesResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Role?: RoleResolvers;
  Vote?: VoteResolvers<ContextType>;
  VoteConnection?: VoteConnectionResolvers<ContextType>;
  VoteEdges?: VoteEdgesResolvers<ContextType>;
};

