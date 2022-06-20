import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigInt: any;
  Cursor: any;
  Date: any;
  Datetime: any;
  JSON: any;
  Time: any;
  UUID: any;
};

/** Boolean expression comparing fields on type "BigInt" */
export type BigIntFilter = {
  eq?: InputMaybe<Scalars['BigInt']>;
  gt?: InputMaybe<Scalars['BigInt']>;
  gte?: InputMaybe<Scalars['BigInt']>;
  lt?: InputMaybe<Scalars['BigInt']>;
  lte?: InputMaybe<Scalars['BigInt']>;
  neq?: InputMaybe<Scalars['BigInt']>;
};

/** Boolean expression comparing fields on type "Boolean" */
export type BooleanFilter = {
  eq?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['Boolean']>;
  gte?: InputMaybe<Scalars['Boolean']>;
  lt?: InputMaybe<Scalars['Boolean']>;
  lte?: InputMaybe<Scalars['Boolean']>;
  neq?: InputMaybe<Scalars['Boolean']>;
};

export type Comment = {
  __typename?: 'Comment';
  commenter_id?: Maybe<Scalars['UUID']>;
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  id: Scalars['BigInt'];
  post?: Maybe<Post>;
  postId?: Maybe<Scalars['BigInt']>;
  profile?: Maybe<Profile>;
  updatedAt?: Maybe<Scalars['Datetime']>;
};

export type CommentConnection = {
  __typename?: 'CommentConnection';
  edges: Array<CommentEdge>;
  pageInfo: PageInfo;
};

export type CommentDeleteResponse = {
  __typename?: 'CommentDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Comment>;
};

export type CommentEdge = {
  __typename?: 'CommentEdge';
  cursor: Scalars['String'];
  node?: Maybe<Comment>;
};

export type CommentFilter = {
  commenter_id?: InputMaybe<UuidFilter>;
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<BigIntFilter>;
  postId?: InputMaybe<BigIntFilter>;
  updatedAt?: InputMaybe<DatetimeFilter>;
};

export type CommentInsertInput = {
  commenter_id?: InputMaybe<Scalars['UUID']>;
  content?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['Datetime']>;
  postId?: InputMaybe<Scalars['BigInt']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

export type CommentInsertResponse = {
  __typename?: 'CommentInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Comment>;
};

export type CommentOrderBy = {
  commenter_id?: InputMaybe<OrderByDirection>;
  content?: InputMaybe<OrderByDirection>;
  createdAt?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  postId?: InputMaybe<OrderByDirection>;
  updatedAt?: InputMaybe<OrderByDirection>;
};

export type CommentUpdateInput = {
  commenter_id?: InputMaybe<Scalars['UUID']>;
  content?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['Datetime']>;
  postId?: InputMaybe<Scalars['BigInt']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

export type CommentUpdateResponse = {
  __typename?: 'CommentUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Comment>;
};

/** Boolean expression comparing fields on type "Date" */
export type DateFilter = {
  eq?: InputMaybe<Scalars['Date']>;
  gt?: InputMaybe<Scalars['Date']>;
  gte?: InputMaybe<Scalars['Date']>;
  lt?: InputMaybe<Scalars['Date']>;
  lte?: InputMaybe<Scalars['Date']>;
  neq?: InputMaybe<Scalars['Date']>;
};

/** Boolean expression comparing fields on type "Datetime" */
export type DatetimeFilter = {
  eq?: InputMaybe<Scalars['Datetime']>;
  gt?: InputMaybe<Scalars['Datetime']>;
  gte?: InputMaybe<Scalars['Datetime']>;
  lt?: InputMaybe<Scalars['Datetime']>;
  lte?: InputMaybe<Scalars['Datetime']>;
  neq?: InputMaybe<Scalars['Datetime']>;
};

/** Boolean expression comparing fields on type "Float" */
export type FloatFilter = {
  eq?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  neq?: InputMaybe<Scalars['Float']>;
};

/** Boolean expression comparing fields on type "Int" */
export type IntFilter = {
  eq?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  neq?: InputMaybe<Scalars['Int']>;
};

/** Boolean expression comparing fields on type "JSON" */
export type JsonFilter = {
  eq?: InputMaybe<Scalars['JSON']>;
  neq?: InputMaybe<Scalars['JSON']>;
};

/** The root type for creating and mutating data */
export type Mutation = {
  __typename?: 'Mutation';
  /** Deletes zero or more records from the collection */
  deleteFromCommentCollection: CommentDeleteResponse;
  /** Deletes zero or more records from the collection */
  deleteFromPostCollection: PostDeleteResponse;
  /** Deletes zero or more records from the collection */
  deleteFromProfileCollection: ProfileDeleteResponse;
  /** Adds one or more `CommentInsertResponse` records to the collection */
  insertIntoCommentCollection?: Maybe<CommentInsertResponse>;
  /** Adds one or more `PostInsertResponse` records to the collection */
  insertIntoPostCollection?: Maybe<PostInsertResponse>;
  /** Adds one or more `ProfileInsertResponse` records to the collection */
  insertIntoProfileCollection?: Maybe<ProfileInsertResponse>;
  /** Updates zero or more records in the collection */
  updateCommentCollection: CommentUpdateResponse;
  /** Updates zero or more records in the collection */
  updatePostCollection: PostUpdateResponse;
  /** Updates zero or more records in the collection */
  updateProfileCollection: ProfileUpdateResponse;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromCommentCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<CommentFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromPostCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<PostFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromProfileCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<ProfileFilter>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoCommentCollectionArgs = {
  objects: Array<CommentInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoPostCollectionArgs = {
  objects: Array<PostInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoProfileCollectionArgs = {
  objects: Array<ProfileInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationUpdateCommentCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<CommentFilter>;
  set: CommentUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdatePostCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<PostFilter>;
  set: PostUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateProfileCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<ProfileFilter>;
  set: ProfileUpdateInput;
};

/** Defines a per-field sorting order */
export enum OrderByDirection {
  AscNullsFirst = 'AscNullsFirst',
  AscNullsLast = 'AscNullsLast',
  DescNullsFirst = 'DescNullsFirst',
  DescNullsLast = 'DescNullsLast'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type Post = {
  __typename?: 'Post';
  commentCollection?: Maybe<CommentConnection>;
  commentCount?: Maybe<Scalars['BigInt']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  id: Scalars['BigInt'];
  poster?: Maybe<Profile>;
  posterId?: Maybe<Scalars['UUID']>;
  rankingScore?: Maybe<Scalars['Float']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  upvoteCount?: Maybe<Scalars['BigInt']>;
  url?: Maybe<Scalars['String']>;
  viewCount?: Maybe<Scalars['BigInt']>;
};


export type PostCommentCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<CommentFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<CommentOrderBy>>;
};

export type PostConnection = {
  __typename?: 'PostConnection';
  edges: Array<PostEdge>;
  pageInfo: PageInfo;
};

export type PostDeleteResponse = {
  __typename?: 'PostDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Post>;
};

export type PostEdge = {
  __typename?: 'PostEdge';
  cursor: Scalars['String'];
  node?: Maybe<Post>;
};

export type PostFilter = {
  commentCount?: InputMaybe<BigIntFilter>;
  createdAt?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<BigIntFilter>;
  posterId?: InputMaybe<UuidFilter>;
  rankingScore?: InputMaybe<FloatFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DatetimeFilter>;
  upvoteCount?: InputMaybe<BigIntFilter>;
  url?: InputMaybe<StringFilter>;
  viewCount?: InputMaybe<BigIntFilter>;
};

export type PostInsertInput = {
  commentCount?: InputMaybe<Scalars['BigInt']>;
  createdAt?: InputMaybe<Scalars['Datetime']>;
  posterId?: InputMaybe<Scalars['UUID']>;
  rankingScore?: InputMaybe<Scalars['Float']>;
  title?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
  upvoteCount?: InputMaybe<Scalars['BigInt']>;
  url?: InputMaybe<Scalars['String']>;
  viewCount?: InputMaybe<Scalars['BigInt']>;
};

export type PostInsertResponse = {
  __typename?: 'PostInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Post>;
};

export type PostOrderBy = {
  commentCount?: InputMaybe<OrderByDirection>;
  createdAt?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  posterId?: InputMaybe<OrderByDirection>;
  rankingScore?: InputMaybe<OrderByDirection>;
  title?: InputMaybe<OrderByDirection>;
  updatedAt?: InputMaybe<OrderByDirection>;
  upvoteCount?: InputMaybe<OrderByDirection>;
  url?: InputMaybe<OrderByDirection>;
  viewCount?: InputMaybe<OrderByDirection>;
};

export type PostUpdateInput = {
  commentCount?: InputMaybe<Scalars['BigInt']>;
  createdAt?: InputMaybe<Scalars['Datetime']>;
  posterId?: InputMaybe<Scalars['UUID']>;
  rankingScore?: InputMaybe<Scalars['Float']>;
  title?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
  upvoteCount?: InputMaybe<Scalars['BigInt']>;
  url?: InputMaybe<Scalars['String']>;
  viewCount?: InputMaybe<Scalars['BigInt']>;
};

export type PostUpdateResponse = {
  __typename?: 'PostUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Post>;
};

export type Profile = {
  __typename?: 'Profile';
  avatarUrl?: Maybe<Scalars['String']>;
  commentCollection?: Maybe<CommentConnection>;
  createdAt?: Maybe<Scalars['Datetime']>;
  id: Scalars['UUID'];
  postCollection?: Maybe<PostConnection>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  username?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};


export type ProfileCommentCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<CommentFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<CommentOrderBy>>;
};


export type ProfilePostCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<PostFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<PostOrderBy>>;
};

export type ProfileConnection = {
  __typename?: 'ProfileConnection';
  edges: Array<ProfileEdge>;
  pageInfo: PageInfo;
};

export type ProfileDeleteResponse = {
  __typename?: 'ProfileDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Profile>;
};

export type ProfileEdge = {
  __typename?: 'ProfileEdge';
  cursor: Scalars['String'];
  node?: Maybe<Profile>;
};

export type ProfileFilter = {
  avatarUrl?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  updatedAt?: InputMaybe<DatetimeFilter>;
  username?: InputMaybe<StringFilter>;
  website?: InputMaybe<StringFilter>;
};

export type ProfileInsertInput = {
  avatarUrl?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['UUID']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
  username?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
};

export type ProfileInsertResponse = {
  __typename?: 'ProfileInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Profile>;
};

export type ProfileOrderBy = {
  avatarUrl?: InputMaybe<OrderByDirection>;
  createdAt?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  updatedAt?: InputMaybe<OrderByDirection>;
  username?: InputMaybe<OrderByDirection>;
  website?: InputMaybe<OrderByDirection>;
};

export type ProfileUpdateInput = {
  avatarUrl?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['UUID']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
  username?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
};

export type ProfileUpdateResponse = {
  __typename?: 'ProfileUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Profile>;
};

/** The root type for querying data */
export type Query = {
  __typename?: 'Query';
  /** A pagable collection of type `Comment` */
  commentCollection?: Maybe<CommentConnection>;
  /** A pagable collection of type `Post` */
  postCollection?: Maybe<PostConnection>;
  /** A pagable collection of type `Profile` */
  profileCollection?: Maybe<ProfileConnection>;
};


/** The root type for querying data */
export type QueryCommentCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<CommentFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<CommentOrderBy>>;
};


/** The root type for querying data */
export type QueryPostCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<PostFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<PostOrderBy>>;
};


/** The root type for querying data */
export type QueryProfileCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<ProfileFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ProfileOrderBy>>;
};

/** Boolean expression comparing fields on type "String" */
export type StringFilter = {
  eq?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  neq?: InputMaybe<Scalars['String']>;
};

/** Boolean expression comparing fields on type "Time" */
export type TimeFilter = {
  eq?: InputMaybe<Scalars['Time']>;
  gt?: InputMaybe<Scalars['Time']>;
  gte?: InputMaybe<Scalars['Time']>;
  lt?: InputMaybe<Scalars['Time']>;
  lte?: InputMaybe<Scalars['Time']>;
  neq?: InputMaybe<Scalars['Time']>;
};

/** Boolean expression comparing fields on type "UUID" */
export type UuidFilter = {
  eq?: InputMaybe<Scalars['UUID']>;
  neq?: InputMaybe<Scalars['UUID']>;
};

export type CreatePostMutationVariables = Exact<{
  input: PostInsertInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', insertIntoPostCollection?: { __typename?: 'PostInsertResponse', affectedCount: number, records: Array<{ __typename?: 'Post', id: any }> } | null };


export const CreatePostDocument = gql`
    mutation createPost($input: PostInsertInput!) {
  insertIntoPostCollection(objects: [$input]) {
    affectedCount
    records {
      id
    }
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