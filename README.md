# Taroko Homework

## Run in local

- Clone the repo
- Run local server:
  - `cd ./taroko-server`
  - install deps with `npm install`
  - `npm run dev`
  - it should run in port:3000 by default
- Run local contacts-app:
  - `cd ./contacts-app`
  - install deps with `npm install`
  - `npm run dev`
- The local app is fetching api in `localhost:3000`

## Tech Choices

- About some tech choices I used

### The Framework

- When taking this homework,first I need to thinking about which framework to use.the original CRA react or Nextjs.my thoughts as follows:

  - CRA React:
    - I'm way more familiar about it
    - It's more suitable for this case, as we already having a existed API server,and the client side is so simple we don't need to consider performance and SSR.
  - Nextjs:
    - Actually,It's my first time to using it build app from start.
    - It's the preferred way to do this homework
    - Nextjs recently introduce Server components with React18, It's a important changing and deserved learning it!

- After consideration ,I choose **Nextjs** for implementation.one is because it's preferred way,another reason is that I want take the challenge although I'm not familiar with it. it's worth spending time on it and make this assignment more meaningful.

- Because I think `CRA` a more suitable way to handle this case. I will discuss my decision with `NEXTjs`(this prj) and both `CRA`(if I used it) and in bellow.

### State Management:

- CRA:
  - In my previous projects ,I used redux a lot.but it had some criticism like too many boilerplate code.now a optional choice may be with `react-query`+other lightweight redux-like lib (ex.`zustand`).I would use this option in this prj.the reason I think this [article](https://tkdodo.eu/blog/practical-react-query) has a good point.a simple version is that lots of state we handle in client side may actually be no need if we have a better caching mechanism to handle the server side data. with that we can reduce the complexity instead of lifting them up to client state.
- Nextjs:
  - nexjs have lots of it's own caching mechanism to have the similar effect like react-query.also this app is quit simple, so I am not using any other third-party lib in prj.

### Styles System:

- CRA:

  - I used Material UI the most in the previous project. the pros is that it let you implement easy ui quickly.but it's hard to fully customize.Someone draw a illustration to explain it:
    ![image](https://github.com/s88037z/taroko-hw/blob/main/readme-assests/css-circles.png)

    Our goal is to be in the intersection of three circle (with functionality,good styles,and CSS+:make use do work easily). however as engineer we should be able to fully control every circle (i.e. we can choose any solution in each pieces). but with lib like material UI, we are bond to the solutions it gave us.
    for this prj,I may try to use `tailwind` or pure css combined with `some headless ui`.

- Nextjs
  - Since `css-module` is the preferred way,and the app is simple.so I choose it. some styles I peek `Bulma` and `Radix` for quick setup, the functionality I use `Radix` for something like Dialog,Notification.

### Sum up

- So the libs I install was:

  - Framework:Nextjs
  - State management: No (utilizing Nextjs caching & rTact context)
  - Styles:Css-module,Radix
    - react-spring: for some physics effect, I just use it in [one place](contacts-app/components/Boop/Boop.tsx)
    - react-responsive: for using some media-query hook in component for RWD
  - Form handling: react-hook-form.

  - Testing: jest ,and testing-library

## About the achievements:

- In this assignment I spent most time tackling with Nextjs.Since it's unfamiliar to me and the new Nextjs13 server component change lots of things. so there are few requirement is not fully completed.
  - **About Testing**: There are some [issues](https://github.com/s88037z/taroko-hw/blob/main/contacts-app/__test__/ContactsPage.test.tsx#L61) when using `react-testing-library` and Next async server component. and I ran out of time , so I just completed [one unit test](contacts-app/__test__/Title.test.tsx).but I want to explain about how I would test if there are enough time:
    - First of all , "we can gain more confident the more likely we test like a real user". So the confident we got from top to low is : E2E > Integration > Unit test. however the maintain cost is also E2E > Integration > Unit test.
    - so when introduce testing to app, I may first write some E2E(ex.Cypress) tests to cover the most common paths user would using, also some other paths we afraid to broken(like the payment flow). then we can add some Integration test for some edge case or less priorities. and for some important pure logic we can use unit test to protect it.
  - Deployment: also because ran out of time

## Folder Structure

- Since It's my first time use Nextjs,I think the structures may not be the best practices. I'm glad to hear any feedback ,Thanks!

```
├── README.md
├── __test__
│   ├── ContactsPage.test.tsx
│   └── Title.test.tsx
├── api                                     // All CRUD to contacts
│   └── contact.ts
├── app
│   ├── _context                            // App level context: Dialog,Notification
│   │   ├── DialogContext.tsx
│   │   └── NotificationContext.tsx
│   ├── contacts                            // Contacts route:
│   │   ├── _components                     // component sharing in Contacts
│   │   ├── _types
│   │   ├── loading.module.css
│   │   ├── loading.tsx                    // Loading comp for page comp fallback
│   │   ├── page.module.css
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.module.css
│   ├── layout.tsx
│   ├── page.module.css
│   └── page.tsx
├── components                             // Global sharing components
│   ├── Boop
│   │   ├── Boop.tsx
│   │   └── index.ts
│   ├── Dialog
│   │   ├── Dialog.module.css
│   │   ├── Dialog.tsx
│   │   └── index.tsx
│   ├── Navbar
│   │   ├── Dropdown.module.css
│   │   ├── Dropdown.tsx
│   │   ├── Navbar.module.css
│   │   ├── Navbar.tsx
│   │   └── index.tsx
│   └── Notification
│       ├── Notification.module.css
│       ├── Notification.tsx
│       └── index.tsx
├── jest.config.js
├── jest.setup.js
├── next-env.d.ts
├── next.config.js
├── package-lock.json
├── package.json
├── postcss.config.json
├── public
│   ├── next.svg
│   └── vercel.svg
├── tsconfig.json
└── utils
    ├── index.ts
    └── types.ts
```

## Requirement

- Feature Requirements

  - [:white_check_mark:] The following elements must be visible per contact: **First Name**, **Last Name**, **Job** and **Description**.
  - [:white_check_mark:] There are separate UI elements that allow the user to activate each CRUD operation.
  - [:white_check_mark:] When clicked, each operation should show a confirmation to the user which automatically disappears after 3-5 seconds.
  - [:white_check_mark:] Contacts can be sorted in both descending and ascending order.

- Technical Requirements

  - [ :white_check_mark: ] The application must be written using React and TypeScript as the front-end.
  - [ :white_check_mark: ] The application must be responsive for desktop and mobile.
  - [ :white_check_mark: ] You must write your own CSS for this project.
  - [ :white_check_mark: ] You may use any HTTP client for the data requests.
  - [ :white_check_mark: ] The application should run correctly on the latest versions of Chrome, Firefox and Safari.
  - [ :heavy_exclamation_mark: ] The application must be tested using React-related best practices (unit tests,snapshots...)

    - half done, plz check [here](#about-the-achievements).

  - [ :white_check_mark: ] A README file must be provided that explains how to run the application locally.

- Extra Points:
- [ :white_check_mark: ]Sass and CSS modules are used.
- [ :white_check_mark: ]CSS basic animations to beautify the UI are used.
- [ :white_check_mark: ]The application is written in Next.js.
- [ :white_check_mark: ]ESLint is added to the repo.
- [ :white_check_mark: ]Validation is provided when entering new contact data.
- [ :x: ]The application is deployed for public access.
  - sorry , ran out of time
