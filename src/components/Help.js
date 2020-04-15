import React, { Component } from "react";
import plantMeUpA from "../assets/plantMeUpA.jpg";
import plantMeUpB from "../assets/plantMeUpB.jpg";
import plantMeUpC from "../assets/plantMeUpC.jpg";
import plantMeUpD from "../assets/plantMeUpD.jpg";
import plantMeUpE from "../assets/plantMeUpE.jpg";
import plantMeUpF from "../assets/plantMeUpF.jpg";
import plantMeUpG from "../assets/plantMeUpG.jpg";

export class Help extends Component {
  render() {
    return (
      <div className="c-site-content">
        <h1 style={{ textTransform: "none" }}>plant me up.</h1>
        <h3>v. 1.0.0 &#169; 2020</h3>
        <div className="c-help-info">
          <p>
            Aplikacja dla posiadaczy domowej dżungli: <br />
            - działa na telefonie i w przeglądarce <br />
            - w pełni prywatna dla zalogowanego użytkownika <br />- intuicyjna i
            przyjazna w używaniu
          </p>
        </div>
        <div className="c-help-gallery">
          <div className="c-help-gallery-item">
            <h3>1.</h3>
            <img src={plantMeUpA} alt="help-gallery" />
          </div>
          <div className="c-help-gallery-item">
            <h3>2.</h3>
            <img src={plantMeUpB} alt="help-gallery" />
          </div>
          <div className="c-help-gallery-item">
            <h3>3.</h3>
            <img src={plantMeUpC} alt="help-gallery" />
          </div>
          <div className="c-help-gallery-item">
            <h3>4.</h3>
            <img src={plantMeUpD} alt="help-gallery" />
          </div>
          <div className="c-help-gallery-item">
            <h3>5.</h3>
            <img src={plantMeUpE} alt="help-gallery" />
          </div>
          <div className="c-help-gallery-item">
            <h3>6.</h3>
            <img src={plantMeUpF} alt="help-gallery" />
          </div>
          <div className="c-help-gallery-item">
            <h3>7.</h3>
            <img src={plantMeUpG} alt="help-gallery" />
          </div>
        </div>
        <div className="c-help-info">
          <p>
            Aplikacja powstała we współpracy i przy wsparciu projektu FAIRit.
          </p>
          <h4>
            Kontakt:
            <a href="mailto: turrrbokitty@gmail.com"> turrrbokitty@gmail.com</a>
          </h4>
        </div>
      </div>
    );
  }
}
