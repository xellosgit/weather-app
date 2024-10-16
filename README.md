weather-app

This project is a responsive, multilingual weather forecast web application that allows users to view current weather data and forecasts for various cities, manage a list of favorite locations, and toggle between light and dark themes. Utilizing React and TypeScript, the app integrates with a weather API to fetch real-time weather data, displays forecast visualizations, and saves user preferences (e.g., theme and favorite cities) in localStorage.

Key Features:

Real-Time Weather Data: Displays current weather and forecast data for any city selected. IP-based City Detection: Automatically detects and displays the user’s current city based on IP geolocation. Favorite Cities Management: Users can add, reorder, and remove cities in a list of favorites. Multilingual Support: Provides language options (Ukrainian and English) for localization using react-i18next. Dark/Light Theme Toggle: Enables a dynamic theme switcher, allowing users to toggle between dark and light themes, with the chosen theme saved in localStorage. Technologies Used:

React with TypeScript for strong typing and improved development experience. React Lazy and Suspense for efficient loading of large components (like the forecast chart). CSS for responsive and modern styling, with dedicated styles for dark and light themes. React Hooks like useEffect and useCallback to manage state and side effects cleanly. i18n for multilingual support. localStorage for persistence of user preferences. This app is designed to provide an intuitive and visually appealing experience for users seeking quick access to weather information and convenient customization options.
![Screenshot 2024-10-13 172257](https://github.com/user-attachments/assets/d471cfab-3378-4769-9e7d-f41f909ecf60)
![Screenshot 2024-10-13 172319](https://github.com/user-attachments/assets/31690fb5-652a-4338-80d1-1cebb382906c)
