const fs = require('fs');
const path = require('path');

const directoryPath = path.join('c:\\Users\\Abcom\\Desktop\\b\\src\\pages');

const replacements = [
  { file: 'WhoWeAre.jsx', breadcrumb: [{ name: 'Home', link: '/' }, { name: 'Who We Are' }] },
  { file: 'TelecomStory.jsx', breadcrumb: [{ name: 'Home', link: '/' }, { name: 'Telecom Story' }] },
  { file: 'Strategy.jsx', breadcrumb: [{ name: 'Home', link: '/' }, { name: 'Services', link: '/services' }, { name: 'Strategy' }] },
  { file: 'ServicesPage.jsx', breadcrumb: [{ name: 'Home', link: '/' }, { name: 'Services' }] },
  { file: 'ProductSquads.jsx', breadcrumb: [{ name: 'Home', link: '/' }, { name: 'Services', link: '/services' }, { name: 'Product Squads' }] },
  { file: 'OurStory.jsx', breadcrumb: [{ name: 'Home', link: '/' }, { name: 'About Us' }] }, // OurStory has route /aboutus
  { file: 'ManufacturingStory.jsx', breadcrumb: [{ name: 'Home', link: '/' }, { name: 'Manufacturing Story' }] },
  { file: 'IndustriesPage.jsx', breadcrumb: [{ name: 'Home', link: '/' }, { name: 'Industries' }] },
  { file: 'Growth.jsx', breadcrumb: [{ name: 'Home', link: '/' }, { name: 'Services', link: '/services' }, { name: 'Growth' }] },
  { file: 'FintechStory.jsx', breadcrumb: [{ name: 'Home', link: '/' }, { name: 'Fintech Story' }] },
  { file: 'FamilyOffice.jsx', breadcrumb: [{ name: 'Home', link: '/' }, { name: 'Services', link: '/services' }, { name: 'Family Office' }] },
  { file: 'Engineering.jsx', breadcrumb: [{ name: 'Home', link: '/' }, { name: 'Services', link: '/services' }, { name: 'Engineering' }] },
  { file: 'EcosystemPage.jsx', breadcrumb: [{ name: 'Home', link: '/' }, { name: 'Solutions' }] }, // Ecosystem is /#ecosystem but file is EcosystemPage
  { file: 'DataAI.jsx', breadcrumb: [{ name: 'Home', link: '/' }, { name: 'Services', link: '/services' }, { name: 'Data & AI' }] },
  { file: 'ContactUs.jsx', breadcrumb: [{ name: 'Home', link: '/' }, { name: 'Contact Us' }] },
  { file: 'CareersPage.jsx', breadcrumb: [{ name: 'Home', link: '/' }, { name: 'Careers' }] },
  { file: 'BreakthruLabsStory.jsx', breadcrumb: [{ name: 'Home', link: '/' }, { name: 'Breakthru Labs' }] },
];

const renderBreadcrumb = (crumbs) => {
  let jsx = `      <div className="breadcrumb-nav">\n`;
  crumbs.forEach((crumb, index) => {
    if (crumb.link) {
      jsx += `        <Link to="${crumb.link}" className="breadcrumb-link">${crumb.name}</Link>\n`;
    } else {
      jsx += `        <span className="breadcrumb-current">${crumb.name}</span>\n`;
    }
    if (index < crumbs.length - 1) {
      jsx += `        <span className="breadcrumb-separator"> &gt; </span>\n`;
    }
  });
  jsx += `      </div>`;
  return jsx;
};

replacements.forEach(item => {
  const filePath = path.join(directoryPath, item.file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find the floating-back-btn section
    const regex = /<div onClick=\{[^}]+\}\s*className="floating-back-btn">[\s\S]*?<\/div>/;
    
    if (regex.test(content)) {
      const replacement = renderBreadcrumb(item.breadcrumb);
      content = content.replace(regex, replacement);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${item.file}`);
    } else {
      console.log(`Could not find back button in ${item.file}`);
    }
  }
});
