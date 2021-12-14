# NestJS Test

## Summary

Your task is to create a RESTful API for handling Order Transaction in an online store using NestJS framework with domain driven approach.

This repository contains a starter app ready for you to work on. Feel free to add any additional libraries you need.

## Instructions

### Objective

Design and implement Service(s) for handling Order Transaction with domain driven approach. Please use the following requirement and rule when working on the assessment. Your assessment will be scored based on the key indicators stated in Assessment Aspects section.

The service will be serving as a backend API for a client app in a RESTful manner with JSON as data format. It's best to focus on the main domain here: Order Transaction. You are free to add your assumption to ease your work, for any additional assumption please include in your readme file.

Develop the task with the mindset that it must be ready for production.

### Requirements

The situation in an online store are stated below. In this scenario we would like to focus on basic transactions that happen in general online stores in Indonesia.

1. Order transaction involves the following actors: **customer** and **admin**.
2. Product dictionary
   - Feel free to define product metadata and values as necessary
   - Product has quantity; product with quantity 0 can not be ordered
   - Please use seeder to initialize the product data
3. Order transaction process flow and verification; single transaction has the following steps:
   - Primary objectives:
     1. Customer can add product to an order
     2. Customer can submit an order and the order is finalized
     3. Customers can only pay via bank transfer
     4. When placing an order the following data is required: name, phone number, email, address
     5. When an order is submitted, the quantity for the ordered product will be reduced based on the quantity.
     6. An order is successfully submitted if all ordered products are available.
   - Bonus objectives:
     1. After an order is submitted, customer can submit payment proof
     2. Admin can view order detail
     3. Admin can verify the validity of order data: customer name, phone, email, address, payment proof
        - Given an order is valid, then Admin will prepare the ordered items for shipment
        - Given and order is invalid, then Admin can cancel the order
     4. Admin can mark the order as shipped and update the order with Shipping ID

## Submission

1. Fork this repository
2. Make some changes with proper commit logs
3. Make a Pull Request

## Assessment Aspects

- Feature completeness
- Code cleanliness
- Application design and abstraction layer
- Quality assessment with unit test and or functional API test

Good luck.

## More Explanation

- Run: yarn seed:up
- Documentation: {origin}/api/docs
- Coverage: yarn test:cov
