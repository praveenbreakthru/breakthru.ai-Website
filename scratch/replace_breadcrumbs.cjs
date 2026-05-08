const fs = require('fs');
const path = require('path');

const directoryPath = path.join('c:\\Users\\Abcom\\Desktop\\b\\src\\pages');

const replacements = [
  { file: 'WhoWeAre.jsx', breadcrumb: [{ name: 'Home', link: '/' }, { name: 'Who We Are' }] },
  { file: 'TelecomStory.jsx', breadcrumb: [{ name: 'Home', link: '/' }, { name: 'Telecom Story' }] },
  { file: 'Strategy.jsx', breadcrumb: [{ name: 'Home', link: '/' }, { name: 'Services', link: '/services' }, { name: 'Strategy' }] },
  { file: 'ServicesPage.jsx', breadcrumb: [{ name: 'Home', link: '/' }, { name: 'Services' }] },
  { file: 'ProductSquads.jsx', breadcrumb: [{ name: 'Home', link: '/' }, { name: 'Services', link: '/services' }, { name: 'Product Squads' }] },
  { file: 'OurStory.jsx', breadcrumb: [{ name: 'Home', link: '/' }, { name: 'About Us' }] },
  { file: 'ManufacturingStory.jsx', breadcrumb: [{ name: 'Home', link: '/' }, { name: 'Manufacturing Story' }] },
  { file: 'IndustriesPage.jsx', breadcrumb: [{ name: 'Home', link: '/' }, { name: 'Industries' }] },
  { file: 'Growth.jsx', breadcrumb: [{ name: 'Home', link: '/' }, { name: 'Services', link: '/services' }, { name: 'Growth' }] },
  { file: 'FintechStory.jsx', breadcrumb: [{ name: 'Home', link: '/' }, { name: 'Fintech Story' }] },
  { file: 'FamilyOffice.jsx', breadcrumb: [{ name: 'Home', link: '/' }, { name: 'Services', link: '/services' }, { name: 'Family Office' }] },
  { file: 'Engineering.jsx', breadcrumb: [{ name: 'Home', link: '/' }, { name: 'Services', link: '/services' }, { name: 'Platform Engineering' }] },
  { file: 'EcosystemPage.jsx', breadcrumb: [{ name: 'Home', link: '/' }, { name: 'Solutions' }] },
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
    
    const classNameIndex = content.indexOf('className="floating-back-btn"');
    if (classNameIndex !== -1) {
      // Find the starting < of the tag that has this className
      const tagOpenIndex = content.lastIndexOf('<', classNameIndex);
      
      // Get the tag name (e.g. 'div' or 'Link')
      let tagName = content.substring(tagOpenIndex + 1, content.indexOf(' ', tagOpenIndex + 1)).trim();
      // Handle cases like <Link\n or similar
      tagName = tagName.replace(/[\s\r\n>]/g, '');
      
      const closingTag = `</${tagName}>`;
      const tagCloseIndex = content.indexOf(closingTag, classNameIndex);
      
      if (tagOpenIndex !== -1 && tagCloseIndex !== -1) {
        content = content.substring(0, tagOpenIndex) + renderBreadcrumb(item.breadcrumb) + content.substring(tagCloseIndex + closingTag.length);
        
        // Ensure 'Link' is imported
        if (!content.includes('import { Link')) {
          if (content.includes('import { useNavigate')) {
            content = content.replace('import { useNavigate }', 'import { Link, useNavigate }');
            content = content.replace('import { useNavigate,', 'import { Link, useNavigate,');
          } else if (content.includes('import { useEffect')) {
            content = content.replace('import { useEffect', 'import { Link } from "react-router-dom";\nimport { useEffect');
          } else {
            content = 'import { Link } from "react-router-dom";\n' + content;
          }
        }
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Successfully updated ${item.file}`);
      } else {
        console.log(`Failed to find matching tags in ${item.file}: open=${tagOpenIndex}, close=${tagCloseIndex}, tag=${tagName}`);
      }
    } else {
      console.log(`Could not find floating-back-btn in ${item.file}`);
    }
  }
});
