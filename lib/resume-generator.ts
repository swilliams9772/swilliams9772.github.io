import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import { JobRole } from '@/types'
import { personalInfo } from '@/data/personal-info'

export async function generateResume(role: JobRole) {
  // Initialize PDF with professional fonts
  const doc = new jsPDF();
  
  // Add custom fonts
  doc.setFont("helvetica", "bold");
  
  // Header Section with Personal Info
  doc.setFillColor(40, 40, 40);
  doc.rect(0, 0, 220, 40, "F");
  
  // Name and Role
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.text(personalInfo.name, 20, 20);
  doc.setFontSize(16);
  doc.text(`${role.title}`, 20, 32);
  
  // Contact Info (right-aligned)
  doc.setFontSize(10);
  doc.text(personalInfo.email, 190, 15, { align: 'right' });
  doc.text(personalInfo.location, 190, 22, { align: 'right' });
  doc.text(personalInfo.linkedin, 190, 29, { align: 'right' });
  
  // Reset text color for main content
  doc.setTextColor(0, 0, 0);
  
  // Professional Summary
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text('Professional Summary', 20, 55);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const summaryText = doc.splitTextToSize(
    `Experienced ${role.title} with expertise in ${role.requiredSkills.join(', ')}. ${role.description}`,
    170
  );
  doc.text(summaryText, 20, 65);
  
  // Core Competencies with visual enhancement
  let currentY = 85;
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text('Core Competencies', 20, currentY);
  
  // Create a grid of skills with colored boxes
  const skillsPerRow = 3;
  const skillWidth = 50;
  const skillHeight = 7;
  currentY += 10;
  
  role.requiredSkills.forEach((skill, index) => {
    const row = Math.floor(index / skillsPerRow);
    const col = index % skillsPerRow;
    const x = 20 + (col * (skillWidth + 10));
    const y = currentY + (row * (skillHeight + 5));
    
    // Skill box
    doc.setFillColor(240, 240, 240);
    doc.roundedRect(x, y, skillWidth, skillHeight, 1, 1, 'F');
    
    // Skill text
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(skill, x + 2, y + 5);
  });
  
  // Update currentY to after skills section
  currentY += Math.ceil(role.requiredSkills.length / skillsPerRow) * (skillHeight + 5) + 15;
  
  // Professional Experience
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text('Professional Experience', 20, currentY);
  currentY += 10;
  
  role.relevantExperience.forEach((exp) => {
    // Company and Role
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(`${exp.role} - ${exp.company}`, 20, currentY);
    
    // Duration with custom styling
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.text(exp.duration, 20, currentY + 7);
    
    // Highlights with bullet points
    doc.setFont("helvetica", "normal");
    exp.highlights.forEach((highlight, index) => {
      currentY += 10;
      doc.circle(23, currentY - 1.5, 0.7, 'F');
      doc.text(highlight, 26, currentY);
    });
    
    currentY += 15;
  });
  
  // Key Projects
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text('Key Projects', 20, currentY);
  currentY += 10;
  
  role.relevantProjects.forEach((project) => {
    // Project Title with custom styling
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(project.name, 20, currentY);
    
    // Project Description
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const projectDesc = doc.splitTextToSize(project.description, 165);
    doc.text(projectDesc, 20, currentY + 7);
    currentY += projectDesc.length * 7 + 5;
    
    // Technologies used
    doc.setFont("helvetica", "italic");
    doc.text('Technologies:', 20, currentY);
    doc.setFont("helvetica", "normal");
    doc.text(project.technologies.join(', '), 45, currentY);
    currentY += 7;
    
    // Outcomes with custom bullets
    project.outcomes.forEach((outcome) => {
      doc.circle(23, currentY - 1.5, 0.7, 'F');
      doc.text(outcome, 26, currentY);
      currentY += 7;
    });
    
    currentY += 8;
  });
  
  // Publications & Certifications
  if (role.publications?.length || role.certifications?.length) {
    doc.addPage();
    currentY = 20;
    
    if (role.publications?.length) {
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text('Publications', 20, currentY);
      currentY += 10;
      
      role.publications.forEach((pub) => {
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        const pubText = doc.splitTextToSize(`${pub.title}`, 165);
        doc.text(pubText, 20, currentY);
        currentY += pubText.length * 7;
        
        doc.setFontSize(10);
        doc.setFont("helvetica", "italic");
        doc.text(`${pub.type} - ${pub.relevance}`, 20, currentY);
        currentY += 15;
      });
    }
    
    if (role.certifications?.length) {
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text('Certifications', 20, currentY);
      currentY += 10;
      
      role.certifications.forEach((cert) => {
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.circle(23, currentY - 1.5, 0.7, 'F');
        doc.text(cert, 26, currentY);
        currentY += 7;
      });
    }
  }
  
  // Footer with page numbers
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setFont("helvetica", "italic");
    doc.text(
      `Page ${i} of ${pageCount}`,
      doc.internal.pageSize.width / 2,
      doc.internal.pageSize.height - 10,
      { align: 'center' }
    );
  }
  
  return doc;
} 