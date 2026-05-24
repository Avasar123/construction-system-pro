const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, HeadingLevel,
        AlignmentType, WidthType, BorderStyle, ShadingType, VerticalAlign, PageBreak,
        LevelFormat, PageOrientation } = require('docx');
const fs = require('fs');

const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: border, bottom: border, left: border, right: border };
const headerShading = { fill: "366092", type: ShadingType.CLEAR };
const subheaderShading = { fill: "B4C7E7", type: ShadingType.CLEAR };

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: "Arial", color: "366092" },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: "Arial", color: "4472C4" },
        paragraph: { spacing: { before: 180, after: 100 }, outlineLevel: 1 } },
    ]
  },
  numbering: {
    config: [
      { reference: "bullets",
        levels: [
          { level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } } }
        ]
      },
      { reference: "numbers",
        levels: [
          { level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } } }
        ]
      },
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    children: [
      // TITLE
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        spacing: { after: 240 },
        children: [new TextRun({ text: "CONSTRUCTION PROJECT MANAGEMENT SYSTEM", bold: true, size: 32 })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 120 },
        children: [new TextRun({ text: "Civil & Infrastructure Projects", italic: true, size: 24 })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 360 },
        children: [new TextRun({ text: "Design &#x2022; Calculation &#x2022; Drafting &#x2022; Project Management", size: 22 })]
      }),

      // SECTION 1: PROJECT OVERVIEW
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("1. PROJECT OVERVIEW")]
      }),
      new Paragraph({
        spacing: { after: 120 },
        children: [new TextRun("Complete project information and key details for reference throughout the project lifecycle.")]
      }),

      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [3120, 6240],
        rows: [
          new TableRow({
            children: [
              new TableCell({ borders, shading: subheaderShading, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "Item", bold: true })] })] }),
              new TableCell({ borders, shading: subheaderShading, width: { size: 6240, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "Description/Value", bold: true })] })] })
            ]
          }),
          ...["Project Name", "Project Type", "Location", "Client Name", "Estimated Cost", "Project Duration"].map(item =>
            new TableRow({
              children: [
                new TableCell({ borders, width: { size: 3120, type: WidthType.DXA },
                  children: [new Paragraph({ children: [new TextRun(item)] })] }),
                new TableCell({ borders, width: { size: 6240, type: WidthType.DXA },
                  children: [new Paragraph({ children: [new TextRun("___________________")] })] })
              ]
            })
          )
        ]
      }),
      new Paragraph({ spacing: { after: 240 }, children: [new TextRun("")] }),

      // SECTION 2: LOAD CALCULATIONS
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("2. STRUCTURAL LOAD CALCULATIONS")]
      }),
      new Paragraph({
        spacing: { after: 120 },
        children: [new TextRun("Framework for calculating and verifying structural loads on beams, columns, and foundations.")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("2.1 Beam Load Analysis")]
      }),
      new Paragraph({
        spacing: { after: 120 },
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Dead Load (Self-weight): Calculate from material properties and cross-section")]
      }),
      new Paragraph({
        spacing: { after: 120 },
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Live Load (Traffic/Use): Per IRC/IBC standards for infrastructure type")]
      }),
      new Paragraph({
        spacing: { after: 200 },
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Total Design Load: w = 1.35 × DL + 1.5 × LL (Factored load)")]
      }),

      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2340, 1755, 1755, 1755, 1755],
        rows: [
          new TableRow({
            children: [
              ["Beam/Element", "Span (m)", "Dead Load (kN/m)", "Live Load (kN/m)", "Total (kN)"].map((h, i) =>
                new TableCell({ borders, shading: subheaderShading, width: { size: [2340, 1755, 1755, 1755, 1755][i], type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: h, bold: true })] })] })
              )
            ]
          }),
          ...["Beam 1", "Beam 2", "Beam 3"].map(name =>
            new TableRow({
              children: [
                new TableCell({ borders, width: { size: 2340, type: WidthType.DXA },
                  children: [new Paragraph({ children: [new TextRun(name)] })] }),
                new TableCell({ borders, width: { size: 1755, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("___")] })] }),
                new TableCell({ borders, width: { size: 1755, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("___")] })] }),
                new TableCell({ borders, width: { size: 1755, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("___")] })] }),
                new TableCell({ borders, width: { size: 1755, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("___")] })] })
              ]
            })
          )
        ]
      }),
      new Paragraph({ spacing: { after: 240 }, children: [new TextRun("")] }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("2.2 Bending Moment Calculation")]
      }),
      new Paragraph({
        spacing: { after: 120 },
        children: [new TextRun("For simply supported beams: M = wL²/8 (uniformly distributed load)")]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun("Verify: Design Moment ≤ Allowable Moment of section")]
      }),

      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [1870, 1870, 1870, 1870, 1870],
        rows: [
          new TableRow({
            children: [
              ["Element", "Span (m)", "Load (kN)", "Max Moment", "Status"].map((h, i) =>
                new TableCell({ borders, shading: subheaderShading, width: { size: 1870, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: h, bold: true, size: 20 })] })] })
              )
            ]
          }),
          ...["Span 1", "Span 2"].map(name =>
            new TableRow({
              children: [
                new TableCell({ borders, width: { size: 1870, type: WidthType.DXA },
                  children: [new Paragraph({ children: [new TextRun(name)] })] }),
                new TableCell({ borders, width: { size: 1870, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("___")] })] }),
                new TableCell({ borders, width: { size: 1870, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("___")] })] }),
                new TableCell({ borders, width: { size: 1870, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("___")] })] }),
                new TableCell({ borders, width: { size: 1870, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("OK/FAIL")] })] })
              ]
            })
          )
        ]
      }),
      new Paragraph({ spacing: { after: 240 }, children: [new TextRun("")] }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("2.3 Foundation/Bearing Capacity")]
      }),
      new Paragraph({
        spacing: { after: 120 },
        children: [new TextRun("Calculate soil bearing capacity: q_u = cNcFciFqFsi + γDfNqFqiFqFsi + 0.5γBN&#x3B3;F&#x3B3;i")]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun("Apply Safety Factor (minimum 3.0) to determine allowable bearing pressure")]
      }),

      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2340, 1755, 1755, 1755, 1755],
        rows: [
          new TableRow({
            children: [
              ["Foundation", "Load (kN)", "Soil Type", "q_a (kPa)", "Safe?"].map((h, i) =>
                new TableCell({ borders, shading: subheaderShading, width: { size: [2340, 1755, 1755, 1755, 1755][i], type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: h, bold: true })] })] })
              )
            ]
          }),
          ...["Abutment L", "Pier 1", "Pier 2"].map(name =>
            new TableRow({
              children: [
                new TableCell({ borders, width: { size: 2340, type: WidthType.DXA },
                  children: [new Paragraph({ children: [new TextRun(name)] })] }),
                new TableCell({ borders, width: { size: 1755, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("___")] })] }),
                new TableCell({ borders, width: { size: 1755, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("___")] })] }),
                new TableCell({ borders, width: { size: 1755, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("___")] })] }),
                new TableCell({ borders, width: { size: 1755, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("Y/N")] })] })
              ]
            })
          )
        ]
      }),
      new Paragraph({ spacing: { after: 360 }, children: [new TextRun("")] }),

      // PAGE BREAK
      new Paragraph({ pageBreakBefore: true, children: [new TextRun("")] }),

      // SECTION 3: BUDGET
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("3. BUDGET TRACKING & COST MANAGEMENT")]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun("Track project expenditures against approved budget and manage cost variations.")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("3.1 Budget Summary")]
      }),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2340, 1755, 1755, 1755, 1755],
        rows: [
          new TableRow({
            children: [
              ["Work Item", "Budget ($)", "Spent ($)", "Remaining", "% Used"].map((h, i) =>
                new TableCell({ borders, shading: subheaderShading, width: { size: [2340, 1755, 1755, 1755, 1755][i], type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: h, bold: true, size: 20 })] })] })
              )
            ]
          }),
          ...["Design & Engineering", "Materials", "Labor & Equipment", "Contingency"].map(item =>
            new TableRow({
              children: [
                new TableCell({ borders, width: { size: 2340, type: WidthType.DXA },
                  children: [new Paragraph({ children: [new TextRun(item, 20)] })] }),
                new TableCell({ borders, width: { size: 1755, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("___")] })] }),
                new TableCell({ borders, width: { size: 1755, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("___")] })] }),
                new TableCell({ borders, width: { size: 1755, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("___")] })] }),
                new TableCell({ borders, width: { size: 1755, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("___")] })] })
              ]
            })
          )
        ]
      }),
      new Paragraph({ spacing: { after: 360 }, children: [new TextRun("")] }),

      // SECTION 4: SCHEDULE
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("4. PROJECT SCHEDULE & TIMELINE")]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun("Plan and track project phases from design through closeout.")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("4.1 Key Project Phases")]
      }),
      new Paragraph({
        spacing: { after: 120 },
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Design & Planning (Months ____–____)")]
      }),
      new Paragraph({
        spacing: { after: 120 },
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Permits & Approvals (Months ____–____)")]
      }),
      new Paragraph({
        spacing: { after: 120 },
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Mobilization (Months ____–____)")]
      }),
      new Paragraph({
        spacing: { after: 120 },
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Construction (Months ____–____)")]
      }),
      new Paragraph({
        spacing: { after: 120 },
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Testing & Commissioning (Months ____–____)")]
      }),
      new Paragraph({
        spacing: { after: 200 },
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Project Closeout (Months ____–____)")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("4.2 Milestone Tracking")]
      }),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [3120, 3120, 3120],
        rows: [
          new TableRow({
            children: [
              ["Milestone", "Target Date", "Actual Date"].map((h, i) =>
                new TableCell({ borders, shading: subheaderShading, width: { size: 3120, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: h, bold: true })] })] })
              )
            ]
          }),
          ...["Design Completion", "Permit Approval", "Construction Start", "50% Progress", "Completion", "Handover"].map(milestone =>
            new TableRow({
              children: [
                new TableCell({ borders, width: { size: 3120, type: WidthType.DXA },
                  children: [new Paragraph({ children: [new TextRun(milestone)] })] }),
                new TableCell({ borders, width: { size: 3120, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("__/__/__")] })] }),
                new TableCell({ borders, width: { size: 3120, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("__/__/__")] })] })
              ]
            })
          )
        ]
      }),
      new Paragraph({ spacing: { after: 360 }, children: [new TextRun("")] }),

      // PAGE BREAK
      new Paragraph({ pageBreakBefore: true, children: [new TextRun("")] }),

      // SECTION 5: MATERIALS & PROCUREMENT
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("5. MATERIAL INVENTORY & PROCUREMENT")]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun("Track material quantities, deliveries, and costs.")]
      }),

      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2340, 1167, 1167, 1167, 1167, 1167, 1185],
        rows: [
          new TableRow({
            children: [
              ["Material", "Unit", "Qty Req'd", "Delivered", "Pending", "Unit Cost", "Total Cost"].map((h, i) =>
                new TableCell({ borders, shading: subheaderShading, width: { size: [2340, 1167, 1167, 1167, 1167, 1167, 1185][i], type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: h, bold: true, size: 18 })] })] })
              )
            ]
          }),
          ...["Steel", "Concrete", "Rebar", "Formwork", "Bitumen"].map(material =>
            new TableRow({
              children: [
                new TableCell({ borders, width: { size: 2340, type: WidthType.DXA },
                  children: [new Paragraph({ children: [new TextRun(material)] })] }),
                new TableCell({ borders, width: { size: 1167, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("T")] })] }),
                new TableCell({ borders, width: { size: 1167, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("___")] })] }),
                new TableCell({ borders, width: { size: 1167, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("___")] })] }),
                new TableCell({ borders, width: { size: 1167, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("___")] })] }),
                new TableCell({ borders, width: { size: 1167, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("___")] })] }),
                new TableCell({ borders, width: { size: 1185, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("___")] })] })
              ]
            })
          )
        ]
      }),
      new Paragraph({ spacing: { after: 360 }, children: [new TextRun("")] }),

      // SECTION 6: QUALITY & SAFETY
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("6. QUALITY ASSURANCE & SAFETY")]
      }),
      new Paragraph({
        spacing: { after: 120 },
        children: [new TextRun("Ensure project meets design specifications and safety standards.")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("6.1 Daily Safety Checklist")]
      }),
      new Paragraph({
        spacing: { after: 120 },
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Site access controlled and sign-in recorded")]
      }),
      new Paragraph({
        spacing: { after: 120 },
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Safety equipment inspected and in use (helmets, vests, harnesses)")]
      }),
      new Paragraph({
        spacing: { after: 120 },
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Equipment inspections completed and logged")]
      }),
      new Paragraph({
        spacing: { after: 120 },
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("No incidents or near-misses reported")]
      }),
      new Paragraph({
        spacing: { after: 200 },
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Environmental controls in place")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("6.2 Quality Testing Schedule")]
      }),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2340, 2340, 2340, 2340],
        rows: [
          new TableRow({
            children: [
              ["Test Type", "Frequency", "Standard", "Results"].map((h, i) =>
                new TableCell({ borders, shading: subheaderShading, width: { size: 2340, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: h, bold: true })] })] })
              )
            ]
          }),
          ...["Concrete Strength", "Steel Grade", "Compaction", "Dimensional Check"].map(test =>
            new TableRow({
              children: [
                new TableCell({ borders, width: { size: 2340, type: WidthType.DXA },
                  children: [new Paragraph({ children: [new TextRun(test)] })] }),
                new TableCell({ borders, width: { size: 2340, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("___")] })] }),
                new TableCell({ borders, width: { size: 2340, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("___")] })] }),
                new TableCell({ borders, width: { size: 2340, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("P/F")] })] })
              ]
            })
          )
        ]
      }),
      new Paragraph({ spacing: { after: 360 }, children: [new TextRun("")] }),

      // PAGE BREAK
      new Paragraph({ pageBreakBefore: true, children: [new TextRun("")] }),

      // SECTION 7: DESIGN & DRAWINGS
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("7. DESIGN SPECIFICATIONS & DRAWING CHECKLIST")]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun("Ensure all required design documents and drawings are complete and approved.")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("7.1 Required Design Documents")]
      }),
      new Paragraph({
        spacing: { after: 120 },
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Structural design report with calculations")]
      }),
      new Paragraph({
        spacing: { after: 120 },
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Geotechnical investigation & foundation design")]
      }),
      new Paragraph({
        spacing: { after: 120 },
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Architectural & aesthetic design details")]
      }),
      new Paragraph({
        spacing: { after: 120 },
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Material specifications & testing requirements")]
      }),
      new Paragraph({
        spacing: { after: 200 },
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Quality assurance & construction methodology")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("7.2 Drawing Set Checklist")]
      }),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [5580, 1890, 1890],
        rows: [
          new TableRow({
            children: [
              ["Drawing/Plan", "Status", "Date Approved"].map((h, i) =>
                new TableCell({ borders, shading: subheaderShading, width: { size: [5580, 1890, 1890][i], type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: h, bold: true })] })] })
              )
            ]
          }),
          ...["Site Plan", "General Arrangement", "Structural Details", "Foundation Plan", "Longitudinal Section", "Cross Sections", "Reinforcement Details", "Bill of Quantities"].map(drawing =>
            new TableRow({
              children: [
                new TableCell({ borders, width: { size: 5580, type: WidthType.DXA },
                  children: [new Paragraph({ children: [new TextRun(drawing)] })] }),
                new TableCell({ borders, width: { size: 1890, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("___")] })] }),
                new TableCell({ borders, width: { size: 1890, type: WidthType.DXA },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("__/__")] })] })
              ]
            })
          )
        ]
      }),
      new Paragraph({ spacing: { after: 360 }, children: [new TextRun("")] }),

      // SECTION 8: CLOSEOUT
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("8. PROJECT CLOSEOUT CHECKLIST")]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun("Final verification and handover of completed project.")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("8.1 Construction Completion")]
      }),
      new Paragraph({
        spacing: { after: 120 },
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Final inspection completed and approved")]
      }),
      new Paragraph({
        spacing: { after: 120 },
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("All defects rectified and documented")]
      }),
      new Paragraph({
        spacing: { after: 120 },
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("As-built drawings completed and verified")]
      }),
      new Paragraph({
        spacing: { after: 200 },
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Warranty documentation compiled")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("8.2 Handover Requirements")]
      }),
      new Paragraph({
        spacing: { after: 120 },
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Operations & maintenance manuals provided")]
      }),
      new Paragraph({
        spacing: { after: 120 },
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Training completed for operating personnel")]
      }),
      new Paragraph({
        spacing: { after: 120 },
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Spare parts list and supplier contacts provided")]
      }),
      new Paragraph({
        spacing: { after: 200 },
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Final account settled and retention released")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("8.3 Documentation Archive")]
      }),
      new Paragraph({
        spacing: { after: 120 },
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("All design documents organized and filed")]
      }),
      new Paragraph({
        spacing: { after: 120 },
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Quality test certificates collected")]
      }),
      new Paragraph({
        spacing: { after: 120 },
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Project photographs and videos archived")]
      }),
      new Paragraph({
        spacing: { after: 200 },
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Project final report and lessons learned documented")]
      }),
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("Construction_Project_Management_Guide.docx", buffer);
  console.log("Document created successfully!");
});
