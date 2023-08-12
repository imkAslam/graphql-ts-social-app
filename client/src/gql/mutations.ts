import { gql } from "@apollo/client";

const LOGIN = gql`
  mutation Login($email: String, $password: String) {
    login(email: $email, password: $password) {
      id
      email
      userName
      token
    }
  }
`;

const REGISTER_USER = gql`
  mutation Register($registerInput: RegisterInput) {
    register(registerInput: $registerInput) {
      id
      userName
      updatedAt
      createdAt
    }
  }
`;

const CREATE_POST = gql`
  mutation Create_Post($postInput: PostInput) {
    createPost(postInput: $postInput) {
      id
      title
      body
      likesCount
      commentsCount
    }
  }
`;

const LIKE_POST = gql`
  mutation LikePost($postId: String) {
    likePost(postId: $postId) {
      id
      likesCount
      likes {
        id
        likedBy
      }
    }
  }
`;

const COMMENT = gql`
  mutation addComment($postId: String, $comment: String) {
    addComment(postId: $postId, comment: $comment) {
      id
      commentsCount
      comments {
        id
        comment
      }
    }
  }
`;

const Mutations = {
  REGISTER_USER,
  LOGIN,
  LIKE_POST,
  COMMENT,
  CREATE_POST,
};

export default Mutations;
