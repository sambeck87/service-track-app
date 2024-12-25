<a name="readme-top"></a>

<div align="center">
  <img src="https://carapi.app/img/vehicle-api-database-hero.png" alt="logo" width="140"  height="auto" />
  <h1><b>Service Track App</b></h1>
</div>

# 📗 Table of Contents

- [📗 Table of Contents](#-table-of-contents)
- [🎯 Service Track App](#-service-track-app)
  - [🛠 Backend repository: ](#-backend-repository-)
  - [🛠 Built With ](#-built-with-)
    - [Tech Stack ](#tech-stack-)
    - [Key Features ](#key-features-)
  - [Live\_Demo ](#live_demo-)
  - [💻 Getting Started ](#-getting-started-)
    - [Prerequisites](#prerequisites)
    - [Clone Repository](#clone-repository)
    - [Add necessary packages](#add-necessary-packages)
    - [Setup environment variable](#setup-environment-variable)
    - [Run the server in development mode](#run-the-server-in-development-mode)
  - [👥 Authors ](#-authors-)
    - [First Author:](#first-author)
  - [🔭 Future Features ](#-future-features-)
  - [🤝 Contributing ](#-contributing-)
  - [👋 Show your support ](#-show-your-support-)
  - [📝 License ](#-license-)

<!-- PROJECT DESCRIPTION -->

# 🎯 Service Track App<a name="about-project"></a>

This React project provides the user interface for the ServiceTrack API, enabling user registration and login, vehicle management (creation, modification, viewing), and maintenance record tracking.

Note: The deployment of this project was done with a free instance on render.com. These instances are disabled after a few minutes of inactivity. So it is suggested that, in case there is a failure when trying to access the page, try again after a couple of minutes of waiting.

## 🛠 Backend repository: <a name="frontend"></a>

To visit the frontend repository, please [click here](https://github.com/sambeck87/service-track-API).

## 🛠 Built With <a name="built-with"></a>

### Tech Stack <a name="tech-stack"></a>

<details>
  <summary>Technology</summary>
  <ul>
    <li>React</li>
    <li>Vite</li>
    <li>CSS</li>
  </ul>
</details>

<details>
  <summary>Tools</summary>
  <ul>
    <li>VS Code</li>
    <li>Git</li>
    <li>GitHub</li>
  </ul>
</details>

<!-- Features -->

### Key Features <a name="key-features"></a>

Main functionalities which the app will have:

- **User creation:** Allows create new users.
- **Logging :** It's necessary to create a new user to use the interface
- **Car views:** Contains views showing a list of registered vehicles, this view allows you to go to the maintenance details of the vehicle or delete it.
Contains a vehicle detail view. Here you can edit the vehicle, view or add maintenance. You also have access to edit your maintenance.
- **Maintenance Service views:** Contains a view where you can visualize all the maintenance performed, as well as filters by license plate and status.
The maintenance list is paginated and you can choose between 10, 50 or 100 items per page.


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LIVE DEMO -->


## Live_Demo <a name="live-demo"></a>

- [Live Demo Version](https://service-track-app.onrender.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## 💻 Getting Started <a name="getting-started"></a>

To get a local copy up and running follow these simple example steps.

### Prerequisites

you have to those tools in your local machine.

- [ ] Node.js
- [ ] npm
- [ ] Git & GitHub
- [ ] Any Code Editor (VS Code, Brackets, etc)

### Clone Repository

Clone the repository using the following bash command in an appropriate location.

```bash
  git git@github.com:sambeck87/service-track-app.git
```

Go to the project directory.

```bash
  cd service-track-app
```

### Add necessary packages

For installing necessary packages, run the following bash command:

```bash
  npm install
```

### Setup environment variable

Open the project in your code editor and add the file .env at the root of your project

Add the following line with the port number that the API is running on:

```
  VITE_API_BASE_URL=http://127.0.0.1:3000
```

### Run the server in development mode

In the project directory, you can run the project by using following bash command:

```bash
  npm run dev

```

And now you can use the the URL http://localhost:5173/ to use the API


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- AUTHORS -->

## 👥 Authors <a name="authors"></a>

### First Author:

**Sandro Hernandez**

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://sambeck87.github.io/Portfolio/) [![linkedin](https://img.shields.io/badge/sandro_israel_hernández_zamora-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sandro-israel-hern%C3%A1ndez-zamora/) [![twitter](https://img.shields.io/badge/@sambeck4488-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/sambeck4488)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🔭 Future Features <a name="future-features"></a>

- [ ] **Simplify functions and make them reusable**

- [ ] **Create a test**

- [ ] **Improve visual styles**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## 🤝 Contributing <a name="contributing"></a>

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](../../../issues/).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- SUPPORT -->

## 👋 Show your support <a name="support"></a>

Give a ⭐️ if you like this project!


<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 📝 License <a name="license"></a>

This project is [MIT](./LICENSE) licensed.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
