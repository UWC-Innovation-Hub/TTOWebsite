# UWC Technology Transfer Office Website

A modern, responsive website for the University of the Western Cape (UWC) Technology Transfer Office (TTO), designed to facilitate innovation, intellectual property management, and technology commercialization.

## 📋 Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Key Features](#key-features)
- [Development](#development)
- [File Organization](#file-organization)
- [External Integrations](#external-integrations)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

The UWC TTO website serves as a central hub for researchers, innovators, and stakeholders to:
- Learn about technology transfer services
- Access intellectual property resources
- Submit innovation disclosures
- View news and events
- Contact the TTO team

## 📁 Project Structure

```
tto-website/
├── index.html                 # Homepage
├── news.html                  # News & Events page
├── README.md                  # This file
├── LICENSE                    # MIT License
├── .gitignore                # Git ignore rules
│
├── about/                    # About section pages
│   ├── about.html           # About TTO & innovation
│   ├── team.html            # Team member profiles
│   ├── contact-us.html      # Contact form & map
│   └── documents.html       # Document library (Google Apps Script)
│
├── for-innovators/          # Resources for researchers
│   ├── protecting-ip.html   # IP protection guide
│   ├── uwc-ip-policy.html   # UWC IP policy
│   └── ip-form.html         # IP disclosure form
│
├── for-stakeholders/        # Resources for partners
│   └── uwc-tech.html        # Available technologies
│
├── components/              # Reusable HTML components
│   ├── header.html          # Navigation bar
│   ├── footer.html          # Footer with links
│   ├── breadcrumb.html      # Breadcrumb navigation
│   └── carousel.html        # Image carousel
│
├── assets/                  # Static assets
│   ├── css/
│   │   └── tto.css          # Main stylesheet
│   ├── js/
│   │   ├── loadHeader.js           # Header loader
│   │   ├── components.js           # Component initialization
│   │   ├── generateBreadcrumb.js   # Breadcrumb generator
│   │   ├── contactValidation.js    # Form validation
│   │   └── load-navbar.js          # Navbar functionality
│   ├── img/                 # Images and icons
│   └── sendEmail.php        # Backend email handler
│
└── .github/
    └── ISSUE_TEMPLATE/      # GitHub issue templates
```

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Framework:** Bootstrap 5.3.3
- **Backend:** PHP (for email handling)
- **External Services:** 
  - Google Apps Script (document library, news feed, tech showcase)
  - Google Maps (embedded location)
  - YouTube (embedded videos)
- **Version Control:** Git & GitHub

## 🚀 Getting Started

### Prerequisites
- A web server with PHP support
- Modern web browser
- Git (optional, for version control)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/UWC-Innovation-Hub/TTOWebsite.git
   cd tto-website
   ```

2. **Configure email settings:**
   - Edit `assets/sendEmail.php`
   - Update the `$to` variable with your TTO email address

3. **Deploy to your web server:**
   - Copy all files to your web hosting directory
   - Ensure PHP is enabled on your server
   - Set proper file permissions (typically 644 for files, 755 for directories)

4. **Test locally:**
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using PHP
   php -S localhost:8000
   ```

## ✨ Key Features

### 1. **Dynamic Content Loading**
Components (header, footer, breadcrumbs) are loaded dynamically via JavaScript to maintain consistency across pages.

### 2. **Google Apps Script Integration**
- **News Feed:** Fetches latest TTO news via JSONP callback from a Google Sheet
- **Technology Showcase:** Displays available technologies for partners from a Google Sheet
- **Document Library:** Embedded viewer for policy documents

### 3. **Responsive Design**
- Mobile-first approach using Bootstrap
- Custom CSS with media queries for all breakpoints
- Accessible navigation with dropdown menus

### 4. **Form Validation**
Contact form includes:
- Client-side validation with Bootstrap classes
- Server-side PHP validation
- Email confirmation to users
- Error handling and feedback messages

### 5. **Breadcrumb Navigation**
Auto-generated breadcrumbs based on URL structure with custom labels mapping.

## 💻 Development

### Adding a New Page

1. Create HTML file in appropriate directory
2. Include header and footer containers:
   ```html
   <div id="header"></div>
   <div id="breadcrumb-placeholder"></div>
   
   <!-- Your content -->
   
   <div id="footer"></div>
   
   <script src="/assets/js/loadHeader.js"></script>
   <script src="/assets/js/components.js"></script>
   ```

3. Update navigation in `components/header.html`

4. Add breadcrumb label mapping in `assets/js/generateBreadcrumb.js`

### Styling

- Main styles: `assets/css/tto.css`
- CSS organized with detailed table of contents
- Color scheme defined in CSS variables:
  - Primary Blue: `#0a1a5c`
  - Gold Accent: `#bd9a50`
  - Neutral Gray: `#3c3c3e`

### Modifying Navigation

Edit `components/header.html` to:
- Add/remove menu items
- Update dropdowns
- Change logo links

## 🔗 External Integrations

### Google Apps Script Endpoints

| Purpose | URL Parameter |
|---------|---|
| News Feed | `page=news` |
| Technologies | `page=uwc-tech` |
| Document Library | Direct iframe embed |

**Base URL:** `https://script.google.com/macros/s/AKfycby1YngYPcv0vcaEUcaGyQPup1aY3Z24ZgWypYXcJ0AsB3f7FJWmZFBzael4-0xK4nSE/exec`

### Email Configuration

- **Handler:** `assets/sendEmail.php`
- **From Address:** `no-reply-tto@uwc.ac.za`
- **Reply-To:** User's provided email
- **Recipient:** `tto@uwc.ac.za`

## 📝 GitHub Workflow

Issue templates available in `.github/ISSUE_TEMPLATE/`:

- **Bug Report:** Report broken functionality
- **Feature Request:** Propose new features
- **Documentation:** Documentation updates
- **Website Task:** Development work
- **Testing:** QA procedures

## 🤝 Contributing

1. Create a new branch for your feature/fix
2. Make changes and test thoroughly
3. Submit a pull request with clear description
4. Ensure all tests pass before merging

## 📜 License

This project is licensed under the MIT License - see the `LICENSE` file for details.

---

## 📞 Support

For questions about the TTO website:
- **Email:** tto@uwc.ac.za
- **Phone:** +27 21 959 0000
- **Location:** UWC Innovation Hub, 2nd Floor, Cape Town

---

**Last Updated:** October 2025 | Maintained by UWC Innovation Hub