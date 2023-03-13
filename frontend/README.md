# E-commerce monorepo

- Create a new workspace:`npx create-nx-workspace@latest`
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
- Creating a shortcut can be done under `path` in `tsconfig.base.json`:
- For creating `environment` files, 
    - Create a folder in the root directory and add two files; one for production and other for development.
    - Go to `project.json` file and add below lines in `configuration.production`:
    ```javascript
        "fileReplacements": [
        {
            "replace": "apps/ngshop/src/environments/environment.ts",
            "with": "apps/ngshop/src/environments/environment.prod.ts"
        }
        ],
    ```
    - Add a path for environment under `paths` in `tsconfig.base.json`:
    ```javascript
        "@env/*":["environments/*"]
    ```

## Authentication
- Create a new component in the `lib/users`
- Add login router in the `users.module`