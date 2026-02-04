<pre>

## backend

src/
│
├── config/
│   ├── db.js
│   ├── env.js
│   └── jwt.js
│
├── modules/                👈 MAIN BUSINESS FEATURES
│
│   ├── auth/
│   │   ├── auth.controller.js
│   │   ├── auth.routes.js
│   │   ├── auth.service.js
│   │   └── auth.validation.js
│   │
│   ├── users/
│   │   ├── user.model.js
│   │   ├── user.controller.js
│   │   ├── user.routes.js
│   │   └── user.service.js
│   │
│   ├── sellers/
│   │   ├── seller.model.js
│   │   ├── seller.controller.js
│   │   ├── seller.routes.js
│   │   └── seller.service.js
│   │
│   ├── services/           👈 products / services being sold
│   │   ├── service.model.js
│   │   ├── service.controller.js
│   │   ├── service.routes.js
│   │   └── service.service.js
│   │
│   ├── orders/
│   │   ├── order.model.js
│   │   ├── order.controller.js
│   │   ├── order.routes.js
│   │   └── order.service.js
│   │
│   ├── payments/
│   │   ├── payment.controller.js
│   │   ├── payment.routes.js
│   │   └── payment.service.js
│   │
│   ├── reviews/
│   │   ├── review.model.js
│   │   ├── review.controller.js
│   │   └── review.routes.js
│
├── middlewares/
│   ├── auth.middleware.js
│   ├── user.middleware.js
│   ├── seller.middleware.js
│   └── error.middleware.js
│
├── utils/
│   ├── hash.js
│   ├── token.js
│   ├── response.js
│   └── logger.js
│
├── routes/
│   └── index.js             👈 combines all routes
│
├── app.js
└── server.js


## frontend

src/
│
├── app/                    👈 app-level setup
│   ├── store.js            // global state
│   ├── router.jsx          // all routes
│   └── providers.jsx
│
├── features/               👈 FEATURE-BASED (VERY IMPORTANT)
│
│   ├── auth/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── auth.api.js
│   │   ├── auth.slice.js   // or context
│   │   └── auth.utils.js
│   │
│   ├── users/
│   │   ├── pages/
│   │   │   └── UserDashboard.jsx
│   │   └── user.api.js
│   │
│   ├── sellers/
│   │   ├── pages/
│   │   │   ├── SellerDashboard.jsx
│   │   │   └── SellerServices.jsx
│   │   └── seller.api.js
│   │
│   ├── services/
│   │   ├── pages/
│   │   │   ├── ServiceList.jsx
│   │   │   ├── ServiceDetails.jsx
│   │   │   └── CreateService.jsx
│   │   ├── components/
│   │   │   └── ServiceCard.jsx
│   │   └── services.api.js
│   │
│   ├── orders/
│   │   ├── pages/
│   │   │   └── Orders.jsx
│   │   └── orders.api.js
│   │
│   ├── payments/
│   │   ├── pages/
│   │   │   └── Checkout.jsx
│   │   └── payments.api.js
│
├── components/             👈 SHARED UI
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Loader.jsx
│   └── ProtectedRoute.jsx
│
├── hooks/
│   ├── useAuth.js
│   └── useFetch.js
│
├── layouts/
│   ├── UserLayout.jsx
│   ├── SellerLayout.jsx
│   └── AuthLayout.jsx
│
├── services/               👈 API CORE
│   ├── axios.js
│   └── endpoints.js
│
├── utils/
│   ├── constants.js
│   └── helpers.js
│
├── styles/
│   └── globals.css
│
├── App.jsx
└── main.jsx

</pre>