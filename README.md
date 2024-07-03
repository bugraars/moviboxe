# Moviboxe

Moviboxe is a modern movie browsing application built with the latest technologies. The project is designed to be a client-side application, providing a seamless user experience with multi-language support (English and German).

## Demo

You can check out the live demo of Moviboxe [here](https://moviboxe.vercel.app/de).

## Features

- **Multi-language support**: English and German using i18n.
- **Responsive Design**: Full responsive design with a semantic structure.
- **API Integration**: Data fetched from The Movie Database (TMDb) API.
- **Custom Search Functionality**: Search movies without any library.
- **Featured Movies**: Display featured movies on the homepage.
- **New Arrivals**: Show new arrival movies.
- **Movie Details**: Detailed movie pages with a slider showcasing top 3 backdrops.

## Tech Stack

- **React.js 18**
- **Next.js 14 (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **i18n**: For multi-language support.
- **Swiper**: For horizontal sliders.
- **API**: The Movie Database (TMDb)

## Installation

To get started with the project, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/bugraars/moviboxe.git
    cd moviboxe
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Create a `.env.local` file and add your TMDb API Key:**
    ```env
    NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
    ```

4. **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.


