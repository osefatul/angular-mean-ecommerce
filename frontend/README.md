# E-commerce monorepo

- create a new workspace:`npx create-nx-workspace@latest`
    - choose integrated monorepo
    - choose angular

- start an app: `nx serve app-name`
- start an app in different port: `nx serve admin --port 5000`
- create another app: `nx generate @nrwl/angular:app admin`
- create a library: `npx nx g  @nrwl/js:lib ui`
- using `nx console` for generating components, libraries or modules.
- For style:
    - install bootstrap
    ```javascript
    npm install bootstrap@5.3.0-alpha1
    ```
    - install primeeng:
    ```javascript
        npm install primeng --save
        npm install primeicons --save
    ```
    - install Flex which is another library from primeeng for flex and grid support:
    ```javascript
    npm install primeflex --save
    ```