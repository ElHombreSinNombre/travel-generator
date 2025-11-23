# OpenAI Travel Generator

A powerful travel itinerary generator application powered by **OpenAI**.

##  Technologies

* **[Next.js](https://nextjs.org/)** - For a full-stack React framework and enhanced performance.
* **[React](https://react.dev/)** - The core library for building the user interface.
* **[Tailwind CSS](https://tailwindcss.com/)** - For utility-first styling and rapid UI development.
* **[Zustand](https://zustand-demo.pmnd.rs/)** - A small, fast, and scalable state management solution.
* **[Framer Motion](https://www.framer.com/motion/)** - For smooth, production-ready animations.


## How to deploy

**Rename** `.env.local.example` to `.env.local`.
**Fill in** the following API keys in your new `.env.local` file:

| API Key | Source |
| :--- | :--- |
| `OPENAI_API_KEY` | Get your key from the **[OpenAI Platform](https://platform.openai.com/account/api-keys)**. |
| `GOOGLE_API_KEY` | Get your key from the **[Google Cloud Console](https://console.cloud.google.com/projectselector/google/maps-apis)**. |
| `PEXELS_API_KEY` | Get your key from the **[Pexels API](https://www.pexels.com/api/)** documentation. |

Run the following commands in your terminal

```bash
 npm install
 npm run dev
```

The application will be accessible at `http://localhost:3000`.

### **Storybook**

We use **[Storybook](https://storybook.js.org/)** for UI component development and documentation.

> [!NOTE]
> Storybook currently includes only basic components like **button**, **spinner**, and **toast** for demonstration purposes.

To run Storybook:

```bash
npm run storybook
