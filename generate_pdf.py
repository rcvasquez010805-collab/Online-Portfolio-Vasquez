from reportlab.lib.pagesizes import letter, A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib import colors
from datetime import datetime

# Create PDF
pdf_path = "Ryan_Christoper_R_Vasquez_Resume.pdf"
doc = SimpleDocTemplate(pdf_path, pagesize=A4, topMargin=0.5*inch, bottomMargin=0.5*inch)

# Container for the 'Flowable' objects
elements = []

# Define styles
styles = getSampleStyleSheet()
title_style = ParagraphStyle(
    'CustomTitle',
    parent=styles['Heading1'],
    fontSize=18,
    textColor=colors.HexColor('#111111'),
    spaceAfter=6,
    alignment=1  # Center
)

section_style = ParagraphStyle(
    'SectionTitle',
    parent=styles['Heading2'],
    fontSize=12,
    textColor=colors.HexColor('#e67e22'),
    spaceAfter=6,
    spaceBefore=10,
    borderColor=colors.HexColor('#e67e22'),
    borderWidth=0.5,
    borderPadding=3
)

normal_style = ParagraphStyle(
    'Normal',
    parent=styles['Normal'],
    fontSize=10,
    spaceAfter=4
)

# Header
elements.append(Paragraph("RYAN CHRISTOPER R. VASQUEZ", title_style))
elements.append(Paragraph("Bachelor of Science in Information Technology (BSIT)", normal_style))
elements.append(Paragraph("📧 rcvasquez010805@gmail.com | 📍 Block 6 Lot 12 Marcelo 1 Extension Bagumbayan, Taguig City", normal_style))
elements.append(Spacer(1, 0.15*inch))

# Professional Summary
elements.append(Paragraph("PROFESSIONAL SUMMARY", section_style))
summary_text = "Passionate about technology, continuous learning, and building meaningful digital solutions. Motivated and adaptable Information Technology graduate with a strong background in programming, web development, and technical support with excellent problem-solving and communication skills."
elements.append(Paragraph(summary_text, normal_style))
elements.append(Spacer(1, 0.1*inch))

# Skills
elements.append(Paragraph("SKILLS & EXPERTISE", section_style))
skills_data = [
    ['Programming Languages', 'Web Development'],
    ['Java, C#, Python, JavaScript', 'HTML5, CSS3, JavaScript, Responsive Design'],
    ['Application Development', 'Core Competencies'],
    ['Mobile (Java, Kotlin), Desktop (C#)', 'UI/UX Design, Team Collaboration, Problem-Solving, Continuous Learning']
]
skills_table = Table(skills_data, colWidths=[3.25*inch, 3.25*inch])
skills_table.setStyle(TableStyle([
    ('FONT', (0, 0), (-1, -1), 'Helvetica', 9),
    ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
    ('FONTNAME', (0, 1), (-1, 1), 'Helvetica'),
    ('TEXTCOLOR', (0, 0), (-1, 0), colors.HexColor('#e67e22')),
    ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
]))
elements.append(skills_table)
elements.append(Spacer(1, 0.1*inch))

# Seminars & Training
elements.append(Paragraph("SEMINARS & TRAINING", section_style))

seminars = [
    ("Flowchart Design & Process Mapping", "Professional Development Seminar", "Mastered visual flowchart design and process mapping using industry-standard tools for business processes and system workflows."),
    ("Cybersecurity Fundamentals & Best Practices", "Information Security Seminar", "Explored core cybersecurity principles including threat identification, encryption, and secure coding practices."),
    ("UI/UX Design Principles & User Experience", "User Interface Design Seminar", "Mastered user-centered design, wireframing, prototyping, and accessibility standards for digital experiences.")
]

for title, subtitle, description in seminars:
    elements.append(Paragraph(f"<b>{title}</b>", normal_style))
    elements.append(Paragraph(f"<i>{subtitle}</i>", normal_style))
    elements.append(Paragraph(description, normal_style))
    elements.append(Spacer(1, 0.05*inch))

elements.append(Spacer(1, 0.1*inch))

# Education
elements.append(Paragraph("EDUCATIONAL ATTAINMENT", section_style))

education = [
    ("Senior High School", "ST. THEODORE SCHOOL", "3 V.P. Cruz St. Lower Bicutan, Taguig City", "2021-2023"),
    ("Junior High School", "ST. THEODORE SCHOOL, INC.", "3 V.P. Cruz St. Lower Bicutan, Taguig City", "2017-2021"),
    ("Elementary", "C.P. STA. TERESA ELEMENTARY SCHOOL", "M.L. Quezon, Bagumbayan, Taguig City", "2011-2017")
]

for level, school, address, years in education:
    elements.append(Paragraph(f"<b>{level}</b>", normal_style))
    elements.append(Paragraph(f"<i>{school}</i>", normal_style))
    elements.append(Paragraph(address, normal_style))
    elements.append(Paragraph(f"<b>{years}</b>", normal_style))
    elements.append(Spacer(1, 0.05*inch))

# Build PDF
doc.build(elements)
print(f"✓ PDF created: {pdf_path}")
