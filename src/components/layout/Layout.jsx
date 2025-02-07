import {
  NavItem,
  SiteFooter,
  SiteFooterLink,
  SiteHeader,
  SiteLogo,
  SiteNavItems,
} from "@tesla/design-system-react";

import useAuthStore from "../../store/authStore";

export const Layout = ({ children }) => {
  const { user, setUser, isAuthenticated, login, logout } = useAuthStore();
  
  return (
    <div className="tds-shell">
      <div id="header" className="tds-shell-masthead">
        <SiteHeader animated>
          <SiteLogo appTitle="Lithium"  />
          <NavItem key="confluence" href="https://confluence.teslamotors.com/display/CONHUB/TIA+Portal+Openness+-+Lithium+2.0" animated>
            Confluence Page
          </NavItem>
          <SiteNavItems align="end">
            {isAuthenticated && (
              <NavItem key="profile" animated>
                {user && user.email}
              </NavItem>
            )}

            {isAuthenticated === false ? (
              <NavItem key="login" animated onClick={login}>
                Login
              </NavItem>
            ) : (
              <NavItem key="logout" animated onClick={logout}>
                Logout
              </NavItem>
            )} 
          </SiteNavItems>
        </SiteHeader>
      </div>

      <div id="main-content" className="tds-shell-content">
    
        <div style={{ padding: 8 }}>{children}</div>
      </div>

      <div id="footer" className="tds-shell-footer">
        <SiteFooter>
          {`Tesla © ${new Date().getFullYear()}`}
          <SiteFooterLink
            href="https://issues.teslamotors.com/secure/CreateIssue.jspa?pid=42217&issuetype=1"
            target="_blank"
          >
            Report Issue
          </SiteFooterLink>
        </SiteFooter>
      </div>
    </div>
  );
};
