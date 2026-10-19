# 🏡 Wanderlust

> A full-stack **Airbnb-style property listing platform** where users can browse stays, host their own listings, upload photos, see locations on an interactive map, and leave reviews.

![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue)

<!-- Add screenshots here once you have them, e.g.:
![Home page](docs/home.png)
![Listing page](docs/listing.png)
-->

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [Sample Data & Demo Login](#-sample-data--demo-login)
- [Routes](#-routes)
- [Data Models](#-data-models)
- [Authentication & Authorization](#-authentication--authorization)
- [Troubleshooting](#-troubleshooting)
- [Security](#-security)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## ✨ Features

- 🏠 Browse all property listings
- 🔐 Sign up, log in and log out (session-based authentication)
- ➕ Create, edit and delete your own listings
- 🖼️ Image uploads to Cloudinary
- 🗺️ Interactive Mapbox map with a marker for each listing
- 📍 Automatic geocoding of the location you enter
- ⭐ Ratings and reviews on every listing
- 🔒 Owner-only listing management and author-only review deletion
- ✅ Server-side validation with Joi
- 💬 Flash messages for success and error feedback
- 💰 Price display with an optional "total after taxes" toggle
- ☁️ Sessions stored in MongoDB Atlas
- 📱 Responsive Bootstrap interface

---

## 🧰 Tech Stack

| Layer | Technologies |
|---|---|
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas, Mongoose |
| **Frontend** | EJS, EJS-Mate, Bootstrap, vanilla JavaScript |
| **Authentication** | Passport.js, passport-local-mongoose, express-session, connect-mongo |
| **Validation** | Joi |
| **Image storage** | Multer, Cloudinary |
| **Maps & geocoding** | Mapbox GL JS, Mapbox SDK |
| **Utilities** | connect-flash, method-override, dotenv |

---

## 🏗 Architecture

```text
                ┌──────────────────────┐
                │   EJS + Bootstrap    │
                │      (Browser)       │
                └──────────┬───────────┘
                           │ HTTP
                           ▼
                ┌──────────────────────┐
                │   Express.js Server  │
                │ Routes • Controllers │
                │ Middleware • Auth    │
                └───────┬──────┬───────┘
                        │      │
              ┌─────────┘      └──────────┐
              ▼                           ▼
       ┌─────────────┐             ┌─────────────┐
       │ MongoDB     │             │ Cloudinary  │
       │ Atlas       │             │ (images)    │
       │ users       │             └─────────────┘
       │ listings    │
       │ reviews     │             ┌─────────────┐
       │ sessions    │             │ Mapbox      │
       └─────────────┘             │ (geocoding  │
                                   │  + maps)    │
                                   └─────────────┘
```

---

## 📁 Project Structure

```text
wanderlust/
├── controllers/        # Request handling logic
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
├── models/             # Mongoose schemas
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── routes/             # Express routers
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── views/              # EJS templates
│   ├── layouts/
│   ├── includes/
│   ├── listings/
│   ├── users/
│   └── error.ejs
├── public/             # Static assets
│   ├── css/
│   └── js/
├── init/               # Database seeding
│   ├── data.js
│   └── index.js
├── utils/              # Helpers
│   ├── ExpressError.js
│   └── wrapAsync.js
├── app.js              # App entry point
├── cloudConfig.js      # Cloudinary + Multer storage
├── middleware.js       # Auth / ownership middleware
├── schema.js           # Joi validation schemas
├── .env.example        # Template for environment variables
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) **v22 or newer**
- npm (included with Node.js)
- A free [MongoDB Atlas](https://www.mongodb.com/atlas) account
- A free [Cloudinary](https://cloudinary.com/) account
- A free [Mapbox](https://www.mapbox.com/) account

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/wanderlust.git
cd wanderlust
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up the external services

**MongoDB Atlas**
1. Create a free **M0** cluster.
2. Under **Database Access**, create a database user and password.
3. Under **Network Access**, allow your IP address (use `0.0.0.0/0` for local testing only).
4. Click **Connect → Drivers** and copy the connection string.
5. Add `/wanderlust` as the database name before the `?`.

**Cloudinary**
1. From the Dashboard, copy the **Cloud name**, **API Key** and **API Secret**.

**Mapbox**
1. Copy your default **public token** (starts with `pk.`) from the Tokens page.

### 4. Configure environment variables

Copy the example file and fill in your values:

```bash
# macOS / Linux
cp .env.example .env

# Windows (PowerShell)
Copy-Item .env.example .env
```

See [Environment Variables](#-environment-variables) for details.

### 5. (Optional) Load sample data

```bash
npm run seed
```

### 6. Start the app

```bash
npm start
```

Open **http://localhost:8080/listings** in your browser.

---

## 🔑 Environment Variables

Create a `.env` file in the project root:

```env
ATLASDB_URL=mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/wanderlust?retryWrites=true&w=majority
SECRET=your-long-random-session-secret

CLOUD_NAME=your-cloudinary-cloud-name
CLOUD_API_KEY=your-cloudinary-api-key
CLOUD_API_SECRET=your-cloudinary-api-secret

MAP_TOKEN=pk.your-mapbox-public-token
```

| Variable | Description |
|---|---|
| `ATLASDB_URL` | MongoDB Atlas connection string (database name `wanderlust`) |
| `SECRET` | Secret used to sign sessions and encrypt session data |
| `CLOUD_NAME` | Cloudinary cloud name |
| `CLOUD_API_KEY` | Cloudinary API key |
| `CLOUD_API_SECRET` | Cloudinary API secret |
| `MAP_TOKEN` | Mapbox public access token |

> ⚠️ **Never commit your `.env` file.** It is already listed in `.gitignore`.
>
> 💡 If your database password contains special characters, URL-encode them (for example `@` → `%40`, `#` → `%23`).

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm start` | Start the server on port 8080 |
| `npm run seed` | Clear listings and insert the sample data |

For auto-reload during development you can use [nodemon](https://www.npmjs.com/package/nodemon):

```bash
npx nodemon app.js
```

---

## 🌱 Sample Data & Demo Login

`npm run seed` will:

1. Connect to the database in `ATLASDB_URL`.
2. Create a demo user (if it does not exist yet).
3. **Delete all existing listings.**
4. Geocode each sample location with Mapbox and insert the listings owned by the demo user.

**Demo account**

| Username | Password |
|---|---|
| `demo` | `demo1234` |

> ⚠️ Re-running the seed removes every listing, including ones you created. Change or delete the demo account before any public deployment.

---

## 🛣 Routes

### Listings

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/listings` | View all listings | Public |
| GET | `/listings/new` | New listing form | Logged in |
| POST | `/listings` | Create a listing | Logged in |
| GET | `/listings/:id` | View a listing | Public |
| GET | `/listings/:id/edit` | Edit form | Owner |
| PUT | `/listings/:id` | Update a listing | Owner |
| DELETE | `/listings/:id` | Delete a listing | Owner |

### Reviews

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/listings/:id/reviews` | Add a review | Logged in |
| DELETE | `/listings/:id/reviews/:reviewId` | Delete a review | Review author |

### Users

| Method | Endpoint | Description |
|---|---|---|
| GET / POST | `/signup` | Register |
| GET / POST | `/login` | Log in |
| GET | `/logout` | Log out |

---

## 🗃 Data Models

**User**
```text
username, email, hash, salt   (hash and salt managed by passport-local-mongoose)
```

**Listing**
```text
title, description, image { url, filename }, price, location, country,
geometry { type: "Point", coordinates: [lng, lat] },
owner → User, reviews → [Review]
```

**Review**
```text
rating (1–5), comment, author → User, createdAt
```

Deleting a listing also deletes its reviews.

---

## 🔐 Authentication & Authorization

- Local username/password authentication with **Passport.js**.
- Passwords are never stored in plain text; only salted hashes are saved.
- Sessions are stored in MongoDB with **connect-mongo** and sent as HTTP-only cookies.
- Middleware checks that the user is logged in, owns the listing, or wrote the review before allowing protected actions.

| Visitor | Can do |
|---|---|
| **Anyone** | Browse listings, view details and reviews |
| **Logged-in user** | Create listings, post reviews, delete own reviews |
| **Listing owner** | Edit and delete their own listings |

---

## 🛠 Troubleshooting

**`querySrv ECONNREFUSED` when connecting to Atlas**
Your network's DNS can't resolve `mongodb+srv://` addresses. Add this as the first line of `app.js` and `init/index.js`:
```js
require("dns").setServers(["8.8.8.8", "1.1.1.1"]);
```
Or switch your system DNS to Google (`8.8.8.8`) or Cloudflare (`1.1.1.1`), or use the standard (non-SRV) connection string from Atlas.

**Connection times out**
In Atlas, open **Network Access** and make sure your IP address is allowed.

**`bad auth` error**
The database username or password is wrong, or the password has unencoded special characters.

**`Cannot find module` errors after `npm install`**
Delete `node_modules` and reinstall:
```bash
rm -rf node_modules      # PowerShell: Remove-Item -Recurse -Force node_modules
npm install
```

**`Cannot read properties of null (reading 'username')` on a listing**
The listing's owner no longer exists. Re-run `npm run seed`.

**Image upload or map not working**
Check the Cloudinary and Mapbox values in `.env`.

---

## 🛡 Security

- Secrets live in environment variables and are excluded from Git.
- Input is validated with Joi and routes are protected by auth and ownership middleware.
- For production: use HTTPS, set cookies to `secure`, restrict Atlas network access and API keys, and use a long random `SECRET`.

If you ever commit a secret by accident, **rotate it immediately** — deleting the file in a later commit does not remove it from Git history.

---

## 🗺 Roadmap

- [ ] Search and filter listings (price, location, category)
- [ ] Multiple images per listing
- [ ] Booking and availability calendar
- [ ] Favorites / wishlist
- [ ] Edit reviews
- [ ] Deployment guide (Render / Railway)

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Your Name**
GitHub: [@YOUR_USERNAME](https://github.com/Maliksarmad01)

If you found this project useful, consider giving it a ⭐
