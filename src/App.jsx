import { useEffect, useMemo, useState } from 'react';
const logo = '/images/helpdude_logo_transparent.svg';
const mailDomainSetup = '/images/domain_set_up.svg';
const emailReplyTemplate = '/images/email_template_setup.svg';
const portalSetup = '/images/portal_Setup.svg';
const chatEmbeddedSetup = '/images/Chat_embeded_Setup.svg';
const chatWidgetFullChat = '/images/chat_widget_full_chat.svg';
const chatWidgetWeb = '/images/Chat_widget_web.svg';
const liveAgentScript = '/images/live_Agent_script.svg';
const liveAgentPicture = '/images/live_agent_pic(1).svg';
const liveAgentFullPicture = '/images/live_Agent_full_pic.svg';

// Configure these in your .env file when the production URLs are available.
const demoUrl = import.meta.env.VITE_DEMO_URL;
const signupUrl = import.meta.env.VITE_SIGNUP_URL;

const navGroups = [
  {
    id: 'workspace',
    title: 'Workspace',
    links: [{ id: 'accounts-company-workspace', label: 'Accounts & Company Workspace' }],
  },
  {
    id: 'tickets',
    title: 'Tickets',
    links: [
      { id: 'tickets-inbox', label: 'Tickets Inbox' },
      { id: 'helpdude-auto-copilot', label: 'HelpDude Auto & Co-Pilot' },
    ],
  },
  {
    id: 'channels',
    title: 'Channels',
    links: [
      { id: 'mail-channel', label: 'Mail Channel' },
      { id: 'public-ticket-portal', label: 'Public Ticket Portal' },
      { id: 'custom-domains', label: 'Custom Domains' },
      { id: 'ai-webchat', label: 'AI Webchat' },
      { id: 'human-chat', label: 'Human Chat (Live Chat)' },
      { id: 'voice-live', label: 'Voice Live' },
      { id: 'whatsapp', label: 'WhatsApp' },
    ],
  },
  {
    id: 'knowledge',
    title: 'Knowledge',
    links: [
      { id: 'knowledge-base', label: 'Knowledge Base (KB)' },
      { id: 'sme-knowledge-sources', label: 'SME & Knowledge Sources' },
    ],
  },
  {
    id: 'admin',
    title: 'Admin',
    links: [
      { id: 'admin', label: 'Admin' },
      { id: 'analytics', label: 'Analytics' },
    ],
  },
  {
    id: 'customers',
    title: 'Customers',
    links: [{ id: 'public-customer-pages', label: 'Public Customer Pages' }],
  },
];

const tocSections = [
  { id: 'accounts-company-workspace', label: 'Accounts & Company Workspace' },
  { id: 'tickets-inbox', label: 'Tickets Inbox' },
  { id: 'helpdude-auto-copilot', label: 'HelpDude Auto & Co-Pilot' },
  { id: 'mail-channel', label: 'Mail Channel' },
  { id: 'public-ticket-portal', label: 'Public Ticket Portal' },
  { id: 'custom-domains', label: 'Custom Domains' },
  { id: 'ai-webchat', label: 'AI Webchat' },
  { id: 'human-chat', label: 'Human Chat (Live Chat)' },
  { id: 'voice-live', label: 'Voice Live' },
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'knowledge-base', label: 'Knowledge Base (KB)' },
  { id: 'sme-knowledge-sources', label: 'SME & Knowledge Sources' },
  { id: 'admin', label: 'Admin' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'public-customer-pages', label: 'Public Customer Pages' },
];

const sectionIds = tocSections.map((section) => section.id);

function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeId, setActiveId] = useState(() => {
    if (typeof window === 'undefined') return 'accounts-company-workspace';
    const id = window.location.hash.slice(1);
    return sectionIds.includes(id) ? id : 'accounts-company-workspace';
  });
  const [collapsedGroups, setCollapsedGroups] = useState(() =>
    Object.fromEntries(navGroups.map(({ id }) => [id, true]))
  );

  const filteredGroups = useMemo(() => {
    const sanitizedQuery = query.trim().toLowerCase();

    return navGroups
      .map((group) => {
        const links = group.links.filter((link) => {
          const text = `${group.title} ${link.label}`.toLowerCase();
          return !sanitizedQuery || text.includes(sanitizedQuery);
        });

        return { ...group, links };
      })
      .filter((group) => !sanitizedQuery || group.links.length > 0);
  }, [query]);

  const searchEmpty = Boolean(query.trim()) && filteredGroups.every((group) => group.links.length === 0);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('.section'));

    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0] && visible[0].target.id) {
          setActiveId(visible[0].target.id);
          window.history.replaceState(null, '', `#${visible[0].target.id}`);
        }
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle('nav-open', navOpen);
    return () => document.body.classList.remove('nav-open');
  }, [navOpen]);

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      if (sectionIds.includes(id)) {
        setActiveId(id);
      }
    }
  }, []);

  const toggleGroup = (groupId) => {
    setCollapsedGroups((previous) => ({
      ...previous,
      [groupId]: !previous[groupId],
    }));
  };

  const handleNavLinkClick = (id) => {
    setActiveId(id);
    setNavOpen(false);
    window.history.replaceState(null, '', `#${id}`);
  };

  return (
    <>
      <header className="site-header">
        <div className="logo-container">
          <img src={logo} alt="HelpDude logo" className="logo" />
        </div>
        {/* <a className="logo-text" href="#overview">
          helpdude
        </a> */}
        <button
          className="menu-toggle"
          id="menuToggle"
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setNavOpen((previous) => !previous)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="header-search">
          <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <input
            type="search"
            id="docSearch"
            aria-label="Search documentation"
            placeholder="Search"
            autoComplete="off"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <div className="header-actions">
          {demoUrl && (
            <a className="btn btn-ghost" href={demoUrl}>
              Book a Demo
            </a>
          )}
          {signupUrl && (
            <a className="btn btn-primary" href={signupUrl}>
              Try for Free
            </a>
          )}
        </div>
      </header>

      <div className="sidebar-backdrop" id="sidebarBackdrop" onClick={() => setNavOpen(false)} />

      <div className="layout">
        <aside className={`sidebar ${navOpen ? 'nav-open' : ''}`} id="sidebar">
          <nav>
            <div className="sidebar-menu-container">
              {filteredGroups.map((group) => {
                const isCollapsed = Boolean(collapsedGroups[group.id]) && !query.trim();
                const hasActiveLink = group.links.some((link) => link.id === activeId);

                return (
                  <div
                    key={group.id}
                    className={`sidebar-group ${isCollapsed ? 'collapsed' : ''} ${hasActiveLink ? 'active' : ''}`}
                    data-group={group.id}
                  >
                    <h3 className="sidebar-group-heading">
                      <button
                        className="sidebar-group-btn"
                        type="button"
                        aria-expanded={!isCollapsed}
                        aria-controls={`sidebar-links-${group.id}`}
                        onClick={() => toggleGroup(group.id)}
                      >
                        {group.title}
                        <svg className="chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </button>
                    </h3>
                    <ul className="sidebar-links" id={`sidebar-links-${group.id}`}>
                      {group.links.map((link) => (
                        <li key={link.id}>
                          <a
                            href={`#${link.id}`}
                            className={activeId === link.id ? 'active' : ''}
                            onClick={() => handleNavLinkClick(link.id)}
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </nav>
          {searchEmpty && (
            <p className="search-empty" id="searchEmpty" style={{ display: 'block' }}>
              No matching sections.
            </p>
          )}
          {!searchEmpty && <p className="search-empty" id="searchEmpty" style={{ display: 'none' }}>No matching sections.</p>}
        </aside>

        <div className="main-wrap">
          <article className="doc-card">
            <h1 id="overview">Features</h1>
            <p className="lead">
              Learn how to configure and use HelpDude’s workspace, ticket management, AI assistance, communication channels, knowledge tools, and administration features.
              Use this guide to understand each feature, follow setup instructions, and deliver a consistent customer support experience.
            </p>

            <div className="doc-sections-container">
            <section className="section" id="accounts-company-workspace">
              <h2>Accounts &amp; Company Workspace</h2>
              <h3>Overview</h3>
              <p>
                Each organization operates in its own company workspace. After signing in, users are directed to the workspace associated with their account. The features and actions available to each user depend on their assigned role and permissions.
              </p>
              <h3>Accessing the Workspace</h3>
              <ol>
                <li>
                  New users can open the <strong>HelpDude Login page</strong> and select <a className="inline-link-label" href="https://helpdude-ai.supporticon.com/signup">Sign Up</a> to register a company account.
                </li>
                <li>After registration, return to the Login page and sign in with your company name and account credentials.</li>
                <li>
                  After authentication, HelpDude opens your company workspace. The sidebar displays the features available to your role, including <strong>Tickets, Human Chat, AI Webchat, Knowledge Base, SME, Channels, Admin,</strong> and <strong>Analytics</strong>.
                </li>
              </ol>
              <h3>Workspace Configuration</h3>
              <ul>
                <li>
                  Administrators can add or invite agents and manage user access from <strong className="inline-link-label">Admin</strong>.
                </li>
              </ul>
              <div className="workspace-admin-note">
                To access <strong>Admin</strong>, use your company-specific workspace path.
              </div>
            </section>

            <section className="section" id="tickets-inbox">
              <h2>Tickets Inbox</h2>
              <h3>Overview</h3>
              <p>
                The Tickets Inbox is the central workspace for reviewing and managing customer support requests. Tickets submitted through email, the public ticket portal, and supported chat channels appear here for agents to handle.
              </p>
              <h3>Managing Tickets</h3>
              <ol>
                <li>
                  Open <a className="inline-link-label" href="https://helpdude-ai.supporticon.com/xyz/tickets">Tickets</a> from the workspace sidebar.
                </li>
                <li>
                  Use the available filters, including <strong>All</strong>, <strong>HelpDude Auto</strong>, <strong>Co-Pilot Answered</strong>, and <strong>Needs Answer</strong>, to find tickets by their current handling state.
                </li>
                <li>Open a ticket to review its conversation history, customer details, status, priority, and available AI assistance.</li>
                <li>Depending on the ticket and your permissions, reply to the customer, add an internal note, forward the ticket, request CSAT feedback, or close the ticket.</li>
              </ol>
              <h3>Ticket Status and Priority</h3>
              <p>The Assignment Engine can route tickets to appropriate team members. Ticket status and priority help the support team track progress and determine which requests require attention.</p>
              <ul>
                <li>Keep tickets moving with clear statuses and priorities.</li>
                <li>Use AI assistance to draft replies when needed.</li>
              </ul>
            </section>

           <section className="section" id="helpdude-auto-copilot">
  <h2>HelpDude Auto &amp; Co-Pilot</h2>

  <h3>What it is</h3>
  <p>
    HelpDude Auto and Co-Pilot use relevant Knowledge Base content and ticket context to generate customer response suggestions. Response quality depends on the relevance and accuracy of the available source content.
  </p>

  <h3>How it works</h3>
  <ol>
    <li>
      A customer submits a query through a configured support channel.
    </li>
    <li>
      HelpDude uses the ticket context and relevant Knowledge Base content to generate a response.
    </li>
    <li>
      HelpDude Auto can send eligible responses automatically. Co-Pilot presents a suggested reply for the agent to review, edit if needed, and send.
    </li>
  </ol>

  <div className="example">
    <strong>Example:</strong> A customer asks about account suspension. HelpDude
    retrieves the relevant policy from the Knowledge Base and generates a
    response. Auto can send the answer automatically, while Co-Pilot allows
    the agent to review and edit it before sending.
  </div>
</section>

            <section className="section" id="mail-channel">
  <h2>Mail Channel</h2>

  <h3>Overview</h3>
  <p>
    The Mail Channel enables customers to contact your support team by email. Incoming messages are converted into tickets in the Tickets Inbox, where agents can review the request and respond.
  </p>

  <h3>Configure Mail</h3>
  <ol>
    <li>
      Open <a className="inline-link-label" href="https://helpdude-ai.supporticon.com/xyz/channels">Channels</a> from the workspace sidebar and select <strong>Mail</strong>.
    </li>
    <li>
      Copy the support email address assigned to your company, or configure a custom email address if required.
    </li>
    <li>
      If you use a custom domain, add the DNS records provided by HelpDude and complete the domain verification process.
      <figure className="section-illustration">
        <img src={mailDomainSetup} alt="Mail domain setup" width={500} height={500} loading="lazy" />
      </figure>
    </li>
    <li>
      Configure the customer-facing email template by setting the logo, greeting, sign-off, brand color, and signature.
      <figure className="section-illustration">
        <img src={emailReplyTemplate} alt="Email template setup" width={500} height={500} />
      </figure>
    </li>
    <li>
      Publish the configured support email address on your website, within your product, or through other customer-facing channels.
    </li>
  </ol>
  <h3>How It Works</h3>
  <ol>
    <li>
      A customer sends a message to the configured support email address.
    </li>
    <li>
      HelpDude converts the incoming email into a ticket and adds it to the Tickets Inbox.
    </li>
    <li>
      An agent reviews the ticket and sends a response from HelpDude.
    </li>
    <li>
      The customer receives the response with the configured email template applied.
    </li>
  </ol>

  <div className="example">
    <strong>Example</strong>
    <p>
      A customer sends a billing question to the support email address.
      HelpDude creates a ticket in the Tickets Inbox, where an agent can
      review the request and send a response using the configured company
      email template.
    </p>
  </div>
</section>
            <section className="section" id="public-ticket-portal">
              <h2>Public Ticket Portal</h2>
             
              <h3>What it is</h3>
              <p>
                The Public Ticket Portal provides a web form that allows customers to submit support requests without signing in to HelpDude. Depending on the portal configuration, the form can collect details such as name, email address, subject, description, priority, and ticket type.
              </p>
              <h3>How it runs</h3>
              <ol>
                <li>In the workspace sidebar, open <a className="inline-link-label" href="https://helpdude-ai.supporticon.com/xyz/channels">Channels</a> and select <strong>Portals</strong>.</li>
                <li>
                  Copy or open the portal URL, for example <code>…/{'{company}'}/ticket/create</code>.
                </li>
                 <figure className="section-illustration">
                <img src={portalSetup} alt="Public ticket portal setup" width={500} height={500} />
              </figure>
                <li>
                  The customer completes and submits the form. HelpDude creates a ticket and makes it available in the agent inbox for review.
                </li>
              </ol>
              <h3>How to implement / use</h3>
              <ol>
                <li>
                  To use a branded host, open <a className="inline-link-label" href="https://helpdude-ai.supporticon.com/xyz/domains">Manage portal domain</a> and configure the portal’s custom domain.
                </li>
                <li>Set a portal slug, usually based on your company name.</li>
                <li>
                  Publish the portal link on your help site, in-app <strong>Contact support</strong> page, or email footer.
                </li>
              </ol>
              <div className="example">
                <strong>Example</strong>
                <p>
                  A mobile app's <strong>Get help</strong> button opens
                  <code>https://help.acme.com/acme/ticket/create</code>. The customer submits “App crashes on login,”
                  and the support team sees it as a new portal ticket.
                </p>
              </div>
            </section>

            <section className="section" id="custom-domains">
              <h2>Custom Domains</h2>
              <h3>What it is</h3>
              <p>
                Custom domains allow your organization to use its own domain for HelpDude email and/or the customer portal instead of the shared HelpDude host.
              </p>
              
              <h3>How it runs</h3>
              <ul>
                <li>
                  <strong>Mail:</strong> Verify the required DNS records to send and receive support email using an address such as
                  <code>you@yourdomain.com</code>.
                </li>
                <li>
                  <strong>Portal:</strong> Point a host such as <code>help.yourdomain.com</code> to HelpDude to provide a branded public ticket form and login experience.
                </li>
                <li>
                  On a company-locked custom login host, only users associated with that company can sign in, and new sign-up is disabled.
                </li>
              </ul>
              <h3>How to implement / use</h3>
              <ol>
                <li>Open the Mail or Portal setup page under <strong>Channels</strong>.</li>
                <li>Enter the domain and, where required, the email address or portal slug.</li>
                <li>Add the DNS records shown in setup, such as CNAME or TXT records.</li>
                <li>Select <strong>Check status</strong> to check the domain verification status. Repeat as needed until verification is complete.</li>
                <li>Once verification is complete, use the custom URLs in customer-facing materials.</li>
              </ol>
              <div className="example">
                <strong>Example</strong>
                <p>
                  Instead of using the shared HelpDude address, customers visit
                  <code>https://{'{custom domain}'}/ticket/create</code> for the branded support
  portal. Agents from other companies cannot sign in through that company's locked host.
                </p>
              </div>
            </section>

            <section className="section" id="ai-webchat">
              <h2>AI Webchat</h2>
              <h3>What it is</h3>
              <p>
                AI Webchat is an embeddable website widget that allows visitors to ask questions, receive answers based on your Knowledge Base, and create tickets when additional support is needed. Agents can review conversations in the HelpDude workspace.
              </p>
              <h3>How it runs</h3>
              <ol>
                <li>Open <strong>Channels</strong>, select <a className="inline-link-label" href="https://helpdude-ai.supporticon.com/xyz/channels/web-widget">AI Webchat</a>, and start the setup process or edit the existing template.</li>
            <li>Configure the widget title, welcome message, colors, launcher icon, and suggested questions.</li>
                <li>Add the provided embed script to your website.</li>
                <figure className="section-illustration">
                <img src={chatEmbeddedSetup} alt="Embedded chat setup" width={500} height={500} />
              </figure>
              
                <li>Visitors can open the chat launcher to start a conversation. Agents can review sessions under <strong>View conversations</strong>.</li>
                <figure className="section-illustration section-illustration--compact">
                <img src={chatWidgetFullChat} alt="Full chat widget setup" width={500} height={500} />
              </figure>
                <li>If a visitor needs assistance from a person, the conversation can be handed off to <strong>Human Chat</strong>.</li>
              </ol>
              <h3>How to implement / use</h3>
              <ol>
                <li>Complete the widget configuration and save your changes.</li>
                <li>
                  Insert the embed script immediately before <code>&lt;/body&gt;</code> on the relevant marketing or product pages.
                <figure className="section-illustration">
                <img src={chatWidgetWeb} alt="Web chat widget setup" width={500} height={500} />
              </figure>
                </li>
                <li>
                  For signed-in users, you can optionally pass <code>visitorEmail</code> and <code>visitorName</code> so they can skip the email form.
                </li>
                <li>Monitor conversations and ticket creation from the HelpDude workspace.</li>
              </ol>
              <div className="example">
                <strong>Example</strong>
                <p>
                  A documentation site embeds the widget in its footer. A visitor asks how to rotate API keys, and the
                  bot answers from a Knowledge Base article. When the visitor asks to speak to a person, the
                  conversation waits for an agent in Human Chat.
                </p>
              </div>
            </section>

            <section className="section" id="human-chat">
              <h2>Human Chat (Live Chat)</h2>
              <h3>What it is</h3>
              <p>
                Human Chat is the real-time inbox for conversations that require assistance from a support agent, including conversations handed off by AI. Agents can review waiting or unread chats, open a conversation, respond in real time, and mark it as read.
              </p>
              <h3>How it runs</h3>
              <ol>
                <li>Open <a className="inline-link-label" href="https://helpdude-ai.supporticon.com/xyz/live-chat">Human Chat</a> from the sidebar.</li>
                <li>Review conversations that are waiting for an agent or contain unread messages.</li>
                <li>Open a conversation, review the visitor, bot, and agent message history, then compose and send a reply.</li>
                <li>Respond to notifications when a customer needs attention.</li>
              </ol>
              <h3>How to implement / use</h3>
              <ul>
                <li>Enable AI Webchat or another supported channel through which visitors can initiate conversations.</li>
                <li>Ensure Human Chat is staffed during the hours when customers expect a live response.</li>
                <li>Use Human Chat for escalations, billing disputes, and requests that require human judgment or cannot be resolved by AI.</li>
              </ul>
              <div className="example">
                <strong>Example</strong>
                <p>
                  A visitor asks for a refund on last month's invoice. The bot cannot approve it, so the conversation
                  waits for a human. An agent reviews the request, confirms the refund, and closes the conversation.
                </p>
              </div>
            </section>

            <section className="section" id="voice-live">
              <h2>Voice Live</h2>
              <h3>What it is</h3>
              <p>
                Voice Live is an embeddable voice support experience that lets visitors speak with an agent and, where supported, share their camera or screen for visual assistance. The experience is configured during setup, and the Knowledge Base can support the agent when answering questions.
              </p>

             
              <h3>How it runs</h3>
              <ol>
                <li>Open <strong>Channels</strong>, select <a className="inline-link-label" href="https://helpdude-ai.supporticon.com/xyz/voice-wid">Voice Live</a>, and start setup.</li>
                <li>Configure the agent name, voice, and branding, then provide the required live API key.</li>
                
  
                <li>Add the voice embed script to your website.</li>
                <figure className="section-illustration">
                <img src={liveAgentScript} alt="Live agent script setup" width={500} height={500} />
              </figure>

                <li>Visitors select <strong>Start</strong> to begin speaking and can optionally share their camera or screen, where supported.</li>
                <li>Review sessions under <strong>View activity</strong>.</li>
              </ol>
              <h3>How to implement / use</h3>
              <ol>
                <li>Complete the Voice Live configuration, including the agent settings, API key, and embed script.</li>
              
                <li>Add the script to pages where voice support is useful, such as onboarding or troubleshooting pages.</li>
                <figure className="section-illustration section-illustration--compact">
                <img src={liveAgentPicture} alt="Live agent setup" width={500} height={500} />
              </figure>
                <li>Keep the Knowledge Base accurate and up to date to support reliable answers during voice sessions.</li>

                
                <li>Review Voice Activity to identify recurring questions and potential quality issues.</li>
                <figure className="section-illustration">
                <img src={liveAgentFullPicture} alt="Full live agent setup" width={500} height={500} />
              </figure>
              </ol>
              <div className="example">
                <strong>Example</strong>
                <p>
                  A developer on a webhook setup page starts Voice Live and shares their screen showing a 401 error.
                  The agent uses a Knowledge Base procedure to guide them through fixing the signature header.
                </p>
              </div>
            </section>

            <section className="section" id="whatsapp">
              <h2>WhatsApp (If Enabled)</h2>
              <h3>What it is</h3>
              <p>
                The WhatsApp Business integration allows customers to message your business number and receive Knowledge Base-based answers or initiate ticket creation, similar to web chat. Configuration requires Meta credentials, including an access token, phone number ID, webhook URL, and verify token.
              </p>
              <h3>How it runs</h3>
              <ol>
                <li>Open WhatsApp setup under <strong>Channels</strong> when the feature is enabled.</li>
                <li>Enter the required Meta credentials and complete webhook verification.</li>
                <li>Customers can message the business number to receive AI assistance or begin the ticket submission flow.</li>
              </ol>
              <div className="example">
                <strong>Example</strong>
                <p>
                  A customer messages the business asking for pricing for 50 seats. The bot answers from the pricing
                  Knowledge Base and opens a ticket if the customer requests a quote.
                </p>
              </div>
              <p className="note">
                These instructions apply only if WhatsApp is enabled for your workspace. If the option is unavailable, contact your HelpDude administrator or product owner to confirm availability.
              </p>
            </section>

            <section className="section" id="knowledge-base">
              <h2>Knowledge Base (KB)</h2>
              <h3>What it is</h3>
              <p>
                The Knowledge Base stores company articles that can support HelpDude Auto, Co-Pilot, web chat, and voice experiences. Agents can create and maintain articles, and public article pages can be shared with customers.
              </p>
              <h3>How it runs</h3>
              <ol>
                <li>Open <a className="inline-link-label" href="https://helpdude-ai.supporticon.com/xyz/knowledge">KB</a> from the sidebar.</li>
                <li>Search existing articles, or create and update content as needed.</li>
                <li>
                  Share public article links, such as <code>/kb/…</code>, with readers who do not need to sign in.
                </li>
                <li>AI features can use relevant Knowledge Base articles to help answer customer questions.</li>
              </ol>
              <h3>How to implement / use</h3>
              <ol>
                <li>Create articles for frequently asked questions, how-to guides, and product policies.</li>
                <li>Use descriptive titles and well-structured content to help AI features retrieve relevant information.</li>
                <li>Link to public Knowledge Base articles from the portal, chat widget, or product help menu.</li>
                <li>Convert validated Co-Pilot answers and approved POC content into reusable Knowledge Base articles.</li>
              </ol>
              <div className="example">
                <strong>Example</strong>
                <p>
                  After publishing an article about resetting two-factor authentication, HelpDude Auto and web chat
                  can use it to answer customer questions about 2FA recovery.
                </p>
              </div>
            </section>

            <section className="section" id="sme-knowledge-sources">
              <h2>SME &amp; Knowledge Sources</h2>
              <h3>What it is</h3>
              <p>
                The SME (Subject Matter Expert) area brings together expert information and content workflows that support the organization’s knowledge system.
              </p>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Tool</th>
                      <th>Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>Web Scrape</td><td>Retrieve website content for use as a knowledge source.</td></tr>
                    <tr><td>Confluence</td><td>Import or synchronize Confluence documentation.</td></tr>
                    <tr><td>Jira</td><td>Bring Jira-related documentation and knowledge-transfer (KT) materials into the knowledge workflow.</td></tr>
                    <tr><td>QA POCs</td><td>Review the quality of proof-of-concept (POC) answers.</td></tr>
                    <tr><td>Dev POCs</td><td>Manage development-related POC workflows.</td></tr>
                    <tr><td>New Response</td><td>Create or register new response content.</td></tr>
                    <tr><td>Send to QA (POC)</td><td>Submit Co-Pilot POC answers for validation before adding them to the Knowledge Base.</td></tr>
                    <tr><td>SME directory</td><td>Maintain expert profiles, including domains, languages, and availability, to support routing decisions.</td></tr>
                  </tbody>
                </table>
              </div>
              <h3>How it runs</h3>
              <ol>
                <li>Open <a className="inline-link-label" href="https://helpdude-ai.supporticon.com/xyz/sme">SME</a>.</li>
                <li>Select a content source or POC workflow.</li>
                <li>Import or validate content before making it available for future AI-generated replies.</li>
              </ol>
              <h3>How to implement / use</h3>
              <ul>
                <li>Start with frequently asked questions by using Web Scrape or creating Knowledge Base articles manually.</li>
                <li>Connect Confluence or Jira when they are your organization’s source of truth for relevant documentation.</li>
                <li>Route uncertain Co-Pilot answers through <strong>Send to QA (POC)</strong> for review before publishing them to the Knowledge Base.</li>
              </ul>
              <div className="example">
                <strong>Example</strong>
                <p>
                  Engineering documents failed webhook deliveries in a Confluence runbook. SME imports the runbook,
                  and Co-Pilot can later use it to help answer tickets about that issue.
                </p>
              </div>
            </section>

            <section className="section" id="admin">
              <h2>Admin</h2>
              <h3>What it is</h3>
              <p>
                Admin provides company-level user management. Authorized administrators can view agents, assign roles such as agent, admin, or user, and reset passwords. Access to Admin and Analytics is limited to authorized roles.
              </p>
              <h3>How it runs</h3>
              <ol>
                <li>Sign in with an administrator account.</li>
                <li>Open <a className="inline-link-label" href="https://helpdude-ai.supporticon.com/xyz/admin">Admin</a>.</li>
                <li>Add or update agent accounts, roles, and passwords as required.</li>
              </ol>
              <h3>How to implement / use</h3>
              <ul>
                <li>Configure an administrator account, then add the support agents who require workspace access.</li>
                <li>Grant Analytics access only to team leads or other users who require reporting access.</li>
                <li>When a team member leaves, reset or revoke their access in accordance with your organization’s access-management process.</li>
              </ul>
              <div className="example">
                <strong>Example</strong>
                <p>
                  A support lead promotes Priya from agent to admin so she can manage agents and access Analytics.
                </p>
              </div>
            </section>

            <section className="section" id="analytics">
              <h2>Analytics</h2>
              <h3>What it is</h3>
              <p>
                Analytics provides an administrator dashboard for reviewing response volume and support activity over a selected week, month, year, or custom date range. Available metrics can include:
              </p>
              <ul>
                <li>HelpDude Auto replies</li>
                <li>Manual replies</li>
                <li>Co-Pilot Without New</li>
                <li>Validated KB With New / New with POC</li>
                <li>Tickets by channel, repeated issues, agent filters</li>
              </ul>
              <p>Displayed counts reflect the selected reporting period and any active agent filters.</p>
              <h3>How it runs</h3>
              <ol>
                <li>An administrator opens <a className="inline-link-label" href="https://helpdude-ai.supporticon.com/xyz/analytics">Analytics</a>.</li>
                <li>Select a week, month, year, or custom date range. Apply an agent filter if needed.</li>
                <li>Review the summary cards and charts to identify support trends and areas that may require attention.</li>
              </ol>
              <h3>How to implement / use</h3>
              <ul>
                <li>Review the relationship between HelpDude Auto replies and tickets marked Needs Answer each week.</li>
                <li>If manual replies are high, review Knowledge Base coverage and identify opportunities to improve Auto responses.</li>
                <li>Use the channel breakdown to compare ticket volume across mail, the public portal, and web chat.</li>
              </ul>
              <div className="example">
                <strong>Example</strong>
                <p>
                  The monthly report shows 420 HelpDude Auto replies and 80 tickets needing an answer. The support
                  lead uses the repeated-issues list to prioritize five new Knowledge Base articles.
                </p>
              </div>
            </section>

            <section className="section" id="public-customer-pages">
              <h2>Public Customer Pages</h2>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Page</th>
                      <th>Who uses it</th>
                      <th>Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>/{'{company}'}/ticket/create</code></td>
                      <td>Customers</td>
                      <td>Submit a ticket without login</td>
                    </tr>
                    <tr>
                      <td><code>/{'{company}'}/articles</code></td>
                      <td>Customers</td>
                      <td>Browse public articles list</td>
                    </tr>
                    <tr>
                      <td><code>/kb/{'…'}</code></td>
                      <td>Customers</td>
                      <td>Read a single public KB article</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                Agents work within the authenticated HelpDude workspace. Customers can access the public ticket submission and article pages without signing in.
              </p>
            </section>
            </div>
          </article>
        </div>

        <div className="toc" id="toc">
          <h4>On this page</h4>
          <ul>
            {tocSections.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={activeId === item.id ? 'active' : ''}
                  onClick={() => handleNavLinkClick(item.id)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
