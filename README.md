# Desafio Genezys

This project is a challenge built using Next.js with TypeScript and styled with Tailwind CSS. It demonstrates the implementation of user authentication, API integration, and a responsive frontend.
## Features

   - Authentication: Login, token validation, and secure routes.
   - API Integration: Fetch and manage user data.
   - Frontend: Responsive design built with Tailwind CSS.

## Getting Started

1. Clone the repository:

``` bash
git clone https://github.com/renanbianchi/desafio-genezys.git
cd desafio-genezys
```

2. Install dependencies:
``` 
npm install
```

3. Create a .env.local file:
```
JWT_SECRET=your_secret
EMAIL_USER=your_secret
EMAIL_PASSWORD=your_secret
NEXT_PUBLIC_URL=your_local_project_address
```
4. Run the development server:
```
npm run dev
``` 
5. Visit http://localhost:3000.

Build for production:
```
npm run build
npm start
```
## Tech Stack

- Framework: Next.js
- Language: TypeScript
- Styling: Tailwind CSS
- Authentication: JWT

## Folder Structure

- `/src`: Source code.
- `/pages`: Next.js pages, including API routes.
- `/components`: Reusable UI components.
- `/services`: API service functions.
- `/styles`: Tailwind configuration.

## Feedback & Contributions

Feel free to open issues or submit pull requests. Contributions are welcome!

## License

This project is open-source and licensed under the MIT License.
