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
  commenterId: Scalars['ID'];
  content: Scalars['String'];
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  postId: Scalars['ID'];
  updatedAt: Scalars['Date'];
};

export type CreateCommentMutationInput = {
  commenterId: Scalars['ID'];
  content: Scalars['String'];
  postId: Scalars['ID'];
};

export type CreatePostMutationInput = {
  content?: InputMaybe<Scalars['String']>;
  posterId: Scalars['ID'];
  title: Scalars['String'];
  url?: InputMaybe<Scalars['String']>;
};

export type CreateVoteMutationInput = {
  postId: Scalars['ID'];
  voterId: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: Comment;
  createPost: Post;
  createVote: Vote;
  removeVote: Vote;
  updatePost: Post;
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


export type MutationRemoveVoteArgs = {
  filter: VoteFilter;
};


export type MutationUpdatePostArgs = {
  filter: PostFilter;
  input: UpdatePostMutationInput;
};

export enum OrderByDirection {
  AscNullsFirst = 'AscNullsFirst',
  AscNullsLast = 'AscNullsLast',
  DescNullsFirst = 'DescNullsFirst',
  DescNullsLast = 'DescNullsLast'
}

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
  title?: InputMaybe<Scalars['String']>;
};

export type PostOrderBy = {
  createdAt?: InputMaybe<OrderByDirection>;
  rankingScore?: InputMaybe<OrderByDirection>;
};

export type Profile = {
  __typename?: 'Profile';
  avatarUrl?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  updatedAt: Scalars['Date'];
  username: Scalars['String'];
  website?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  posts: PostConnection;
};


export type QueryPostsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type UpdatePostMutationInput = {
  content?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  url?: InputMaybe<Scalars['String']>;
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

export type VoteFilter = {
  postId?: InputMaybe<Scalars['String']>;
  voterId?: InputMaybe<Scalars['String']>;
};

export type PostCardFragment = { __typename?: 'Post', id: string, createdAt: Date, title: string, url?: string | null | undefined, viewCount: number, voteCount: number, commentCount: number, rankingScore: number, isVoted: boolean, poster?: { __typename?: 'Profile', id: string, username: string } | null | undefined };

export type CreateVoteMutationVariables = Exact<{
  input: CreateVoteMutationInput;
}>;


export type CreateVoteMutation = { __typename?: 'Mutation', createVote: { __typename?: 'Vote', id: string, post?: { __typename?: 'Post', id: string, isVoted: boolean } | null | undefined } };

export type RemoveVoteMutationVariables = Exact<{
  filter: VoteFilter;
}>;


export type RemoveVoteMutation = { __typename?: 'Mutation', removeVote: { __typename?: 'Vote', id: string, post?: { __typename?: 'Post', id: string, isVoted: boolean } | null | undefined } };

export type UpdatePostMutationVariables = Exact<{
  filter: PostFilter;
  input: UpdatePostMutationInput;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost: { __typename?: 'Post', id: string, viewCount: number } };

export type CreatePostMutationVariables = Exact<{
  input: CreatePostMutationInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: string } };

export type ListPostQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['Cursor']>;
}>;


export type ListPostQuery = { __typename?: 'Query', posts: { __typename?: 'PostConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage?: boolean | null | undefined, endCursor?: string | null | undefined }, edges: Array<{ __typename?: 'PostEdges', cursor: string, node: { __typename?: 'Post', id: string, createdAt: Date, title: string, url?: string | null | undefined, viewCount: number, voteCount: number, commentCount: number, rankingScore: number, isVoted: boolean, poster?: { __typename?: 'Profile', id: string, username: string } | null | undefined } }> } };

export const PostCardFragmentDoc = gql`
    fragment PostCard on Post {
  id
  createdAt
  title
  url
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
    mutation removeVote($filter: VoteFilter!) {
  removeVote(filter: $filter) {
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
 *      filter: // value for 'filter'
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
export const UpdatePostDocument = gql`
    mutation updatePost($filter: PostFilter!, $input: UpdatePostMutationInput!) {
  updatePost(filter: $filter, input: $input) {
    id
    viewCount
  }
}
    `;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      filter: // value for 'filter'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
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
export const ListPostDocument = gql`
    query listPost($first: Int, $after: Cursor) {
  posts(first: $first, after: $after) {
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
  CreateCommentMutationInput: CreateCommentMutationInput;
  CreatePostMutationInput: CreatePostMutationInput;
  CreateVoteMutationInput: CreateVoteMutationInput;
  Cursor: ResolverTypeWrapper<Scalars['Cursor']>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  OrderByDirection: OrderByDirection;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Post: ResolverTypeWrapper<PostModel>;
  PostConnection: ResolverTypeWrapper<Omit<PostConnection, 'edges'> & { edges: Array<ResolversTypes['PostEdges']> }>;
  PostEdges: ResolverTypeWrapper<Omit<PostEdges, 'node'> & { node: ResolversTypes['Post'] }>;
  PostFilter: PostFilter;
  PostOrderBy: PostOrderBy;
  Profile: ResolverTypeWrapper<ProfileModel>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  UpdatePostMutationInput: UpdatePostMutationInput;
  Vote: ResolverTypeWrapper<VoteModel>;
  VoteConnection: ResolverTypeWrapper<Omit<VoteConnection, 'edges'> & { edges: Array<ResolversTypes['VoteEdges']> }>;
  VoteEdges: ResolverTypeWrapper<Omit<VoteEdges, 'node'> & { node: ResolversTypes['Vote'] }>;
  VoteFilter: VoteFilter;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Comment: CommentModel;
  CreateCommentMutationInput: CreateCommentMutationInput;
  CreatePostMutationInput: CreatePostMutationInput;
  CreateVoteMutationInput: CreateVoteMutationInput;
  Cursor: Scalars['Cursor'];
  Date: Scalars['Date'];
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Mutation: {};
  PageInfo: PageInfo;
  Post: PostModel;
  PostConnection: Omit<PostConnection, 'edges'> & { edges: Array<ResolversParentTypes['PostEdges']> };
  PostEdges: Omit<PostEdges, 'node'> & { node: ResolversParentTypes['Post'] };
  PostFilter: PostFilter;
  PostOrderBy: PostOrderBy;
  Profile: ProfileModel;
  Query: {};
  String: Scalars['String'];
  UpdatePostMutationInput: UpdatePostMutationInput;
  Vote: VoteModel;
  VoteConnection: Omit<VoteConnection, 'edges'> & { edges: Array<ResolversParentTypes['VoteEdges']> };
  VoteEdges: Omit<VoteEdges, 'node'> & { node: ResolversParentTypes['Vote'] };
  VoteFilter: VoteFilter;
};

export type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  commenterId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  postId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface CursorScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Cursor'], any> {
  name: 'Cursor';
}

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationCreateCommentArgs, 'input'>>;
  createPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'input'>>;
  createVote?: Resolver<ResolversTypes['Vote'], ParentType, ContextType, RequireFields<MutationCreateVoteArgs, 'input'>>;
  removeVote?: Resolver<ResolversTypes['Vote'], ParentType, ContextType, RequireFields<MutationRemoveVoteArgs, 'filter'>>;
  updatePost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationUpdatePostArgs, 'filter' | 'input'>>;
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
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  posts?: Resolver<ResolversTypes['PostConnection'], ParentType, ContextType, Partial<QueryPostsArgs>>;
};

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
  Cursor?: GraphQLScalarType;
  Date?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  PostConnection?: PostConnectionResolvers<ContextType>;
  PostEdges?: PostEdgesResolvers<ContextType>;
  Profile?: ProfileResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Vote?: VoteResolvers<ContextType>;
  VoteConnection?: VoteConnectionResolvers<ContextType>;
  VoteEdges?: VoteEdgesResolvers<ContextType>;
};

