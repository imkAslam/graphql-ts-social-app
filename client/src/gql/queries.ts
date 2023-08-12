import { gql } from "@apollo/client";

const GET_USERS = gql`
  query User {
    getUsers {
      id
      userName
      email
    }
  }
`;

const GET_POSTS = gql`
  query GetPosts($offset: Int, $limit: Int) {
    getPosts(offset: $offset, limit: $limit) {
      id
      title
      body
      likesCount
      commentsCount
    }
  }
`;
const Queries = {
  GET_USERS,
  GET_POSTS,
};

export default Queries;
