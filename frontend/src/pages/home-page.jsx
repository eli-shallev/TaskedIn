import { AppHeader } from "../cmps/app-header";

export function HomePage() {
  return (
    <section className="home-page">
      <AppHeader />
      <main>
        <section className="signup-main-section">
          <section className="signup-sub-section">
            <div className="left-signup-sub">
              <h1 className="left-signup-h1">
                TaskedIn brings all your tasks, teammates, and tools together
              </h1>
              <p className="left-signup-p">
                Keep everything in the same place—even if your team isn't.
              </p>
              <div className="left-signup-div">
                <button className="signin-btn">
                  <a href="/workspace" className="signin-a">
                    START DEMO
                  </a>
                </button>
              </div>
            </div>
            <div className="right-signup-sub-section">
              <img
                className="ui-img"
                src={require(`../assets/img/trello-ui-collage.webp`)}
                alt="ui home page picture"
              />
            </div>
          </section>
        </section>
      </main>
    </section>
  );
}
