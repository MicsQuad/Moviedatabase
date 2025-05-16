import "./About.css";

function About() {
  return (
    <div className="about-container">
      <h2>Group 16</h2>
      <ul className="members-roles-list">
        <li><b>Chathuli Madunima Jayasinghe</b>: Primarily on the backend development, Implementing Watchlist features based on
        the logged-in user for personalized functionality, Creating and managing relevant API routes.</li>
        <li><b>Milán Csontos</b>: Led the backend development and database modelling, Implementing secure user
        authentication, building essential API routes, Focused on security practices, password
        management.</li>
        <li><b>Marta Moroni</b>: Primarily on the front-end development of the application. Designed and implemented
        the Home page, Movie List and Movie card components. Developed the search and filtering.
        Handled dynamic UI changes based on user login status, implementing the core Watchlist
        feature from front-end side.</li>
        <li><b>Oscar Hedberg Nilsson</b>: Primarily on the front-end development. In charge of user authentication, including the
        login, registration functionality. Developed the About page (this one right here) with context about creators.</li>
      </ul>
    </div>
  );
}

export default About;
