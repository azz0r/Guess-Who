!Guess Who! 👳🏼‍👷🏻‍👮🏾👼🏽👩🏽👱🏻👦🏿
====


## 📕 Index
 * [Installing](#installing)
 * [Launching](#launching)
 * [Unit Testing](#unit-tests)


## 🖥 <a name="installing">Installing</a>
```
npm cache clean;
npm install
npm run start;
```

## 🚀 <a name="launching">Launching</a>
* Development stack ```npm run start```
* Build production stack ```npm run build```

## 💪 <a name="unit-testing">Unit Testing</a>
Powered by Mocha, Chai, Enzyme, Sinon.

**Enzyme** is a JavaScript Testing utility for React that makes it easier to assert, manipulate, and traverse your React Components' output.

**Sinon** is for test spies, stubs and mocks.

**Mocha** is a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun.

**Chai** is a BDD / TDD assertion library

* Run unit tests ```npm run test:unit```
* Run unit tests with watch, any changes result in a re-run ```npm run test:unit:watch```

Tests are written by creating .spec. files inside the component directory, e.g.

```/src/components/button/expand.js``` pairs with ```/src/components/button/expand.spec.js```
```/src/components/brands/brands.js``` pairs with ```/src/components/brands/brands.spec.js```
