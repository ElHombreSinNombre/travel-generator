# Travel Generator

A travel itinerary generator application.

##  Technologies

* **[Next.js](https://nextjs.org/)**
* **[React](https://react.dev/)** 
* **[Tailwind](https://tailwindcss.com/)** 
* **[Zustand](https://zustand-demo.pmnd.rs/)** 
* **[Framer Motion](https://www.framer.com/motion/)**

## How to deploy

**Rename** `.env.local.example` to `.env.local` and **fill in** the following API keys:

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
```

