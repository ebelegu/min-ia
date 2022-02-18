import React from "react";
import { LinkPanel } from "@navikt/ds-react";
import styles from "./Lenkeflis-ekstern.module.scss";
import { ExternalLink } from "@navikt/ds-icons";

export const LenkeflisEkstern: React.FunctionComponent<{
  overskrift: string;
  ikon: React.ReactElement;
  brødtekst: string;
}> = ({ overskrift, ikon, brødtekst }) => {
  return (
    <div className={styles.linkpanel}>
      <a className="navds-panel navds-link-panel navds-panel--border" href="#">
        <div className="navds-link-panel__content">
          <div className={styles.panel}>
            {ikon}
            <div>
              <div className="navds-link-panel__title navds-heading navds-heading--medium">
                {overskrift}
              </div>
              <div className="navds-link-panel__description navds-body-long">
                {brødtekst}
              </div>
            </div>
          </div>
        </div>
        <ExternalLink />
      </a>
    </div>
  );
};