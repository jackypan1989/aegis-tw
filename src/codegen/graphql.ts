import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Profile as ProfileModel, Post as PostModel, Vote as VoteModel, Comment as CommentModel } from '.prisma/client';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = undefined | T;
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
  Date: string;
};

export type AddCommentMutationInput = {
  commenterId: Scalars['ID'];
  content: Scalars['String'];
  postId: Scalars['ID'];
};

export type AddPostMutationInput = {
  content?: InputMaybe<Scalars['String']>;
  posterId: Scalars['ID'];
  title: Scalars['String'];
  url?: InputMaybe<Scalars['String']>;
};

export type AddVoteMutationInput = {
  postId: Scalars['ID'];
  voterId: Scalars['ID'];
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

export type CursorArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addComment: Comment;
  addPost: Post;
  addVote: Vote;
};


export type MutationAddCommentArgs = {
  input: AddCommentMutationInput;
};


export type MutationAddPostArgs = {
  input: AddPostMutationInput;
};


export type MutationAddVoteArgs = {
  input: AddVoteMutationInput;
};

export enum OrderByDirection {
  AscNullsFirst = 'AscNullsFirst',
  AscNullsLast = 'AscNullsLast',
  DescNullsFirst = 'DescNullsFirst',
  DescNullsLast = 'DescNullsLast'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['Cursor'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor: Scalars['Cursor'];
  totalPageCount?: Maybe<Scalars['Int']>;
};

export type Post = {
  __typename?: 'Post';
  commentCount: Scalars['Int'];
  comments: Array<Comment>;
  content?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  poster: Profile;
  posterId: Scalars['ID'];
  rankingScore: Scalars['Int'];
  title: Scalars['String'];
  updatedAt: Scalars['Date'];
  url?: Maybe<Scalars['String']>;
  viewCount: Scalars['Int'];
  voteCount: Scalars['Int'];
  votes: Array<Vote>;
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
  cursorArgs?: InputMaybe<CursorArgs>;
  filter?: InputMaybe<PostFilter>;
  orderBy?: InputMaybe<Array<PostOrderBy>>;
};

export type Vote = {
  __typename?: 'Vote';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  postId: Scalars['ID'];
  updatedAt: Scalars['Date'];
  voterId: Scalars['ID'];
};

export type PostCardFragment = { __typename?: 'Post', id: string, createdAt: string, title: string, url?: string | null, viewCount: number, voteCount: number, commentCount: number, rankingScore: number, poster: { __typename?: 'Profile', id: string, username: string } };

export type AddPostMutationVariables = Exact<{
  input: AddPostMutationInput;
}>;


export type AddPostMutation = { __typename?: 'Mutation', addPost: { __typename?: 'Post', id: string } };

export type ListPostQueryVariables = Exact<{
  cursorArgs: CursorArgs;
}>;


export type ListPostQuery = { __typename?: 'Query', posts: { __typename?: 'PostConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: string }, edges: Array<{ __typename?: 'PostEdges', cursor: string, node: { __typename?: 'Post', id: string, createdAt: string, title: string, url?: string | null, viewCount: number, voteCount: number, commentCount: number, rankingScore: number, poster: { __typename?: 'Profile', id: string, username: string } } }> } };

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
  poster {
    id
    username
  }
}
    `;
export const AddPostDocument = gql`
    mutation addPost($input: AddPostMutationInput!) {
  addPost(input: $input) {
    id
  }
}
    `;
export type AddPostMutationFn = Apollo.MutationFunction<AddPostMutation, AddPostMutationVariables>;

/**
 * __useAddPostMutation__
 *
 * To run a mutation, you first call `useAddPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPostMutation, { data, loading, error }] = useAddPostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddPostMutation(baseOptions?: Apollo.MutationHookOptions<AddPostMutation, AddPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddPostMutation, AddPostMutationVariables>(AddPostDocument, options);
      }
export type AddPostMutationHookResult = ReturnType<typeof useAddPostMutation>;
export type AddPostMutationResult = Apollo.MutationResult<AddPostMutation>;
export type AddPostMutationOptions = Apollo.BaseMutationOptions<AddPostMutation, AddPostMutationVariables>;
export const ListPostDocument = gql`
    query listPost($cursorArgs: CursorArgs!) {
  posts(
    cursorArgs: $cursorArgs
    orderBy: [{rankingScore: DescNullsLast}, {createdAt: DescNullsLast}]
  ) {
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
 *      cursorArgs: // value for 'cursorArgs'
 *   },
 * });
 */
export function useListPostQuery(baseOptions: Apollo.QueryHookOptions<ListPostQuery, ListPostQueryVariables>) {
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
  AddCommentMutationInput: AddCommentMutationInput;
  AddPostMutationInput: AddPostMutationInput;
  AddVoteMutationInput: AddVoteMutationInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Comment: ResolverTypeWrapper<CommentModel>;
  Cursor: ResolverTypeWrapper<Scalars['Cursor']>;
  CursorArgs: CursorArgs;
  Date: ResolverTypeWrapper<Scalars['Date']>;
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
  Vote: ResolverTypeWrapper<VoteModel>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddCommentMutationInput: AddCommentMutationInput;
  AddPostMutationInput: AddPostMutationInput;
  AddVoteMutationInput: AddVoteMutationInput;
  Boolean: Scalars['Boolean'];
  Comment: CommentModel;
  Cursor: Scalars['Cursor'];
  CursorArgs: CursorArgs;
  Date: Scalars['Date'];
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
  Vote: VoteModel;
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
  addComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationAddCommentArgs, 'input'>>;
  addPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationAddPostArgs, 'input'>>;
  addVote?: Resolver<ResolversTypes['Vote'], ParentType, ContextType, RequireFields<MutationAddVoteArgs, 'input'>>;
};

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  endCursor?: Resolver<ResolversTypes['Cursor'], ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<ResolversTypes['Cursor'], ParentType, ContextType>;
  totalPageCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  commentCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  comments?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  poster?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  posterId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  rankingScore?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  viewCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  voteCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  votes?: Resolver<Array<ResolversTypes['Vote']>, ParentType, ContextType>;
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
  postId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  voterId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
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
};

