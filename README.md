# Nextjs Tailwind ECommerce Website

## Installation dev environement

git clone <the repository>
npm install
npm run dev

Description

## Lessons

1. Introduction
2. Install Tools
3. Create Next App
4. Publish to Github
5. Layouts
6. List Products
   1. add data.js
   2. add images
   3. render products
7. Create Product Details
   1. create product page
   2. create 3 columns
   3. show image in firs column
   4. show product info in second column
   5. show add to cart action on third column
   6. add styles
8. Handle Add To Cart
   1. define react context
   2. define cart items state
   3. create add to cart action
   4. add reducer
   5. create store provider
   6. handle add to cart button
9. Create Cart Page
   1. create cart.js
   2. use context to get cart items
   3. list items in cart items
   4. redirect to cart screen after add to cart
10. Handle Changing Cart Items
    add select box for quantity
    handle select box change
11. Save Cart Items
    install js-cookie package
    save & retreive cart items in cookies
12. Create Login Form
    install react hook form
    craete input boxes
    add login button
13. Connect With MongoDB
    install mongoose
    install mongoDB or use mongodb atlas
    save connection url in .env file (.env.local file)
    create db utils file
    create sample users
14. Create Login API
    install next-auth
    create nextauth.js
    use signin in login form
15. Add User Menu
    check user authentication
    install headlessui
    show user menu
16. Create Shipping Screen
    display address fields
    save address in context
17. Create Payment Method
    display payment methods
    save payment method in context
18. Seed Sample Products
    instert sample products to mongodb
    load products form db in home and product screen
    check product count in stock and add to cart
19. Load Products MongoDB
    load products in home page from mongodb
    load products in product page from mongodb
    use product api to check count in stock in add to cart
20. Create Place Order Screen
    display shipping address
    display payment method
    display order items
    implement create order
