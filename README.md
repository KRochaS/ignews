
<p align="center">
  <img src="https://github.com/KRochaS/ignews/blob/master/.github/ignite-reactjs.svg" width="470" > 
</p>
<p align="center">
  <img src="https://github.com/KRochaS/ignews/blob/master/.github/ig.news.svg" width="170" > 
</p>

<p align="center">	
   <img src="https://img.shields.io/badge/-ReactJS-202024?style=flat&logoColor=white" />
  
   <img src="https://img.shields.io/badge/-NextJS-202024?style=flat&logoColor=white" />
   
   <img src="https://img.shields.io/badge/-Prismic-202024?style=flat&logoColor=white" />

   <img src="https://img.shields.io/badge/-Stripe-202024?style=flat&logoColor=white" />

  <img src="https://img.shields.io/badge/-FaunaDB-202024?style=flat&logoColor=white" />

  <img src="https://img.shields.io/badge/-BFF-202024?style=flat&logoColor=white" />
</p>



## :bar_chart: About
Developed using ReactJS and NextJS, the project is a technology blog where users can subscribe to gain access to the posts.

Applying concepts such as external API consumption, Server Side Rendering (SSR), Static Site Generation (SSG), Stripe for subscription payments, NextAuth for GitHub authentication, FaunaDB for storing user information in a database, and Prismic CMS for adding and managing post content.

## :books: Technologies e libs  

- [React](https://pt-br.reactjs.org/)
- [NextJS](https://nextjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [SCSS](https://sass-lang.com/)
- [Stripe](https://stripe.com/)
- [Prismic](https://prismic.io/)
- [Testing Library](https://testing-library.com/)
- [Jest](https://jestjs.io/pt-BR/)


## :test_tube: Unit Tests
   #### Components
- [x] ActiveLink
     - [x] renders correctly
     - [x] adds active class if the link as currently active
- [x] Header
     - [x] renders correctly
- [x] SignInButton
     - [x] renders correctly when user is not authenticated
     - [x] renders correctly when user is authenticated
- [x] SubscribeButton
     - [x] renders correctly
     - [x] redirect to signin when not authenticated
     - [x] redirect to post when user is authenticated and had an active subscription
    #### Pages
- [x] Home
     - [x] renders correctly
     - [x] loads initial data
- [x] Posts
     - [x] renders correctly
     - [x] redirects user if no subscription is found
     - [x] loads initial data
- [x] Post
     - [x] renders correctly
     - [x] loads initial data
- [x] PostPreview
     - [x] renders correctly
     - [x] redirects user to full post when user is subscribed
     - [x] loads initial data

 <img src="https://github.com/KRochaS/ignews/blob/master/.github/tests.PNG" />
  


 
 ## :computer: Layout
 
<p align="center">
  <img src="https://github.com/KRochaS/ignews/blob/master/.github/screenshot-01.png" width="986" >
  <img src="https://github.com/KRochaS/ignews/blob/master/.github/screenshot-02.png" width="986" >
  <img src="https://github.com/KRochaS/ignews/blob/master/.github/screenshot-03.png"  width="986" >
  <img src="https://github.com/KRochaS/ignews/blob/master/.github/screenshot-04.png"  width="986" >
</p>
