import gql from 'graphql-tag';

export const QUERY_OFFERINGS = gql`

  query{
      me {
      _id
      firstName
      LastName
      email
      role
      tutor
      bio
      image
      location
      timezone
      orders
      feedback
      savedBooks {
          _id
          bookId
          authors
          image
          link
          title
      }
      }
    }
  query getProducts($category: ID) {
    products(category: $category) {
      _id
      name
      description
      price
      quantity
      image
      subject {
        _id
      }
    }
  }
`;

export const QUERY_ALL_OFFERINGS = gql`
  {
    offerings {
      _id
      name
      description
      price
      quantity
      subject {
        name
      }
    }
  }
`;

export const QUERY_SUBJECTS = gql`
{
  subjects {
    _id
    # name
  }
}
`;

export const QUERY_USER = gql`
{
  user {
    firstName
    lastName
    orders {
      _id
      purchaseDate
      offerings {
        _id
        name
        description
        price
        quantity
        image
      }
    }
  }
}
`;


export const QUERY_CHECKOUT = gql`
  query getCheckout($offerings: [ID]!) {
    checkout(offerings: $offerings) {
      session
    }
  }
`;