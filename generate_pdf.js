const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Create PDF document
const doc = new PDFDocument({
    size: 'A4',
    margin: 40
});

// Create write stream
const filename = 'Ryan_Christoper_R_Vasquez_Resume.pdf';
const filepath = path.join(__dirname, filename);
doc.pipe(fs.createWriteStream(filepath));

// Set colors
const accentColor = '#e67e22';
const textColor = '#333333';

// Title
doc.fontSize(18).font('Helvetica-Bold').fillColor(textColor).text('RYAN CHRISTOPER R. VASQUEZ', { align: 'center' });
doc.fontSize(11).font('Helvetica').fillColor(textColor).text('Bachelor of Science in Information Technology (BSIT)', { align: 'center' });
doc.fontSize(10).fillColor(textColor).text('rcvasquez010805@gmail.com | Block 6 Lot 12 Marcelo 1 Extension Bagumbayan, Taguig City', { align: 'center' });
doc.moveTo(40, doc.y + 10).lineTo(555, doc.y + 10).stroke(accentColor);
doc.moveDown(0.5);

// Professional Summary
doc.fontSize(12).font('Helvetica-Bold').fillColor(accentColor).text('PROFESSIONAL SUMMARY');
doc.fontSize(10).font('Helvetica').fillColor(textColor).text('Passionate about technology, continuous learning, and building meaningful digital solutions. Motivated and adaptable Information Technology graduate with a strong background in programming, web development, and technical support with excellent problem-solving and communication skills.', { align: 'left' });
doc.moveDown(0.3);

// Skills
doc.fontSize(12).font('Helvetica-Bold').fillColor(accentColor).text('SKILLS & EXPERTISE');

const skillsData = [
    { left: 'Programming Languages', right: 'Web Development' },
    { left: 'Java, C#, Python, JavaScript', right: 'HTML5, CSS3, JavaScript, Responsive Design' },
    { left: '', right: '' },
    { left: 'Application Development', right: 'Core Competencies' },
    { left: 'Mobile (Java, Kotlin), Desktop (C#)', right: 'UI/UX Design, Team Collaboration, Problem-Solving, Continuous Learning' }
];

let skillsY = doc.y;
skillsData.forEach((skill) => {
    if (skill.left) {
        doc.fontSize(9).font('Helvetica-Bold').fillColor(accentColor).text(skill.left, 40, skillsY, { width: 200 });
    }
    if (skill.right) {
        doc.fontSize(9).font('Helvetica-Bold').fillColor(accentColor).text(skill.right, 280, skillsY, { width: 200 });
    }
    if (skill.left && skill.left.includes(',')) {
        doc.fontSize(9).font('Helvetica').fillColor(textColor).text(skill.left.split('\n')[0], 40, skillsY + 15, { width: 200 });
        doc.fontSize(9).font('Helvetica').fillColor(textColor).text(skill.right.split('\n')[0], 280, skillsY + 15, { width: 200 });
        skillsY += 40;
    } else if (skill.left) {
        skillsY += 20;
    }
});

doc.moveTo(40, doc.y + 5).lineTo(555, doc.y + 5).stroke(accentColor);
doc.moveDown(0.3);

// Seminars & Training
doc.fontSize(12).font('Helvetica-Bold').fillColor(accentColor).text('SEMINARS & TRAINING');

const seminars = [
    {
        title: 'Flowchart Design & Process Mapping',
        org: 'Professional Development Seminar',
        desc: 'Mastered visual flowchart design and process mapping using industry-standard tools for business processes and system workflows.'
    },
    {
        title: 'Cybersecurity Fundamentals & Best Practices',
        org: 'Information Security Seminar',
        desc: 'Explored core cybersecurity principles including threat identification, encryption, and secure coding practices.'
    },
    {
        title: 'UI/UX Design Principles & User Experience',
        org: 'User Interface Design Seminar',
        desc: 'Mastered user-centered design, wireframing, prototyping, and accessibility standards for digital experiences.'
    }
];

seminars.forEach((sem) => {
    doc.fontSize(10).font('Helvetica-Bold').fillColor(textColor).text(sem.title);
    doc.fontSize(9).font('Helvetica-Oblique').fillColor(accentColor).text(sem.org);
    doc.fontSize(9).font('Helvetica').fillColor(textColor).text(sem.desc);
    doc.moveDown(0.15);
});

doc.moveTo(40, doc.y + 5).lineTo(555, doc.y + 5).stroke(accentColor);
doc.moveDown(0.3);

// Education
doc.fontSize(12).font('Helvetica-Bold').fillColor(accentColor).text('EDUCATIONAL ATTAINMENT');

const education = [
    { level: 'Senior High School', school: 'ST. THEODORE SCHOOL', address: '3 V.P. Cruz St. Lower Bicutan, Taguig City', years: '2021-2023' },
    { level: 'Junior High School', school: 'ST. THEODORE SCHOOL, INC.', address: '3 V.P. Cruz St. Lower Bicutan, Taguig City', years: '2017-2021' },
    { level: 'Elementary', school: 'C.P. STA. TERESA ELEMENTARY SCHOOL', address: 'M.L. Quezon, Bagumbayan, Taguig City', years: '2011-2017' }
];

education.forEach((edu) => {
    doc.fontSize(10).font('Helvetica-Bold').fillColor(textColor).text(edu.level);
    doc.fontSize(9).font('Helvetica-Oblique').fillColor(accentColor).text(edu.school);
    doc.fontSize(9).font('Helvetica').fillColor(textColor).text(edu.address);
    doc.fontSize(9).font('Helvetica-Bold').fillColor(textColor).text(edu.years);
    doc.moveDown(0.1);
});

// Finalize PDF
doc.end();

// Listen for finish event
doc.on('finish', () => {
    console.log(`✓ PDF created successfully: ${filepath}`);
});

doc.on('error', (err) => {
    console.error('Error creating PDF:', err);
});
