# CoffeeRus | Enterprise Inventory System

## Project Overview

CoffeeRus is a boutique inventory and storefront application built with React and Tailwind CSS. It combines a polished shopping experience with an administrative dashboard so teams can manage premium coffee listings in one centralized interface.

## What This App Demonstrates

- Single source of truth state management using the React Context API
- Full CRUD product workflows with live remote persistence
- Smart form behavior for both creating and editing products
- Brand-driven Tailwind styling with a premium visual system

## Core Features

### Shop Experience
- Live product inventory loaded from a remote MockAPI endpoint
- Visual product cards with image, origin, price, and location
- Filtering and pagination-ready interface for customer browsing

### Admin Dashboard
- Add new coffee blends with a single form
- Edit existing products with autofilled values
- Delete products and keep the UI synchronized instantly
- Supports inventory state across pages without manual refresh

## Architecture & Data Flow

### React Context API
The app uses a centralized `ProductsProvider` in `src/context/ProductsContext.jsx`.
- `ProductsProvider` fetches the product list once when the app starts
- It exposes shared state and CRUD functions to any child component
- Components use the `useProducts` hook to read product data and trigger updates

### Why PUT for Updates
The admin update flow calls `PUT` on the product resource.
- `PUT` replaces the entire product object in the remote API
- This matches the app’s current pattern of sending the full updated record
- It avoids partial update ambiguity when the form manages all fields

### Product Form Autofill
The `ProductForm` component supports both create and edit modes.
- When `initial` product data is passed, the form fields populate automatically
- This is handled by a `useEffect` hook watching the `initial` prop
- The form also keeps the original product ID for updates

## Installation

```bash
git clone https://github.com/your-username/coffee-rus.git
cd coffee-rus
npm install
npm run dev
```

## Configuration

- Verify the API endpoint in `src/context/ProductsContext.jsx` matches your MockAPI resource
- The current endpoint is:
  `https://6a0568f0aa826ca75c09c6d7.mockapi.io/api/products`

## API Schema

Each product object includes:

```json
{
  "id": "1",
  "name": "Ethiopian Yirgacheffe",
  "description": "Bright floral notes, peach, lemon zest",
  "price": 18.75,
  "origin": "Yirgacheffe, Ethiopia",
  "location": "Downtown",
  "image": "https://url-to-image.jpg",
  "status": "active"
}
```

## Notes for Beginners

- `ProductsContext.jsx` is the global data source for the app
- `useEffect` in the provider loads the inventory on startup
- `ProductForm.jsx` uses a second `useEffect` to fill fields when editing an existing record
- `PUT` is intentionally used for updates because the API expects a full replacement of the product object

## Recommended Next Steps

- Add authentication for separate admin and customer experiences
- Add a shopping cart flow for the storefront
- Extend the product schema with categories and roast level
