# Construction Project Management & Technical Guide
## Civil & Infrastructure Projects

---

## 1. PROJECT OVERVIEW & PLANNING

### 1.1 Key Project Information to Document
- **Project Name & Type** (Bridge, Road, Building, etc.)
- **Location & Coordinates**
- **Client/Owner Details**
- **Project Manager & Key Contacts**
- **Design Standards** (IS, IBC, AASHTO, etc.)
- **Environmental Classification**
- **Timeline & Milestones**
- **Budget & Contingency**

### 1.2 Project Phases
1. **Design & Planning** - 2-4 months (feasibility, surveys, design)
2. **Permits & Approvals** - 2-6 months (environmental, civil, heritage clearances)
3. **Mobilization** - 1-2 months (site setup, labor, equipment)
4. **Construction** - Variable (excavation, foundation, superstructure)
5. **Testing & Commissioning** - 1-3 months (load tests, trials, inspections)
6. **Closeout & Handover** - 1 month (documentation, training, final account)

---

## 2. STRUCTURAL LOAD CALCULATIONS

### 2.1 Beam Design - Factored Load Method

**Formula:**
```
Design Load (w) = 1.35 × Dead Load (DL) + 1.5 × Live Load (LL)
```

**Where:**
- **DL** = Self-weight of structure + permanent fixtures (kN/m)
- **LL** = Traffic, pedestrians, environmental loads (kN/m)
- **Factors** = 1.35 & 1.5 per IS 456, IS 1893, or IBC as applicable

**Example - Simply Supported Beam:**
```
Span = 25 m
DL = 15 kN/m (includes beam weight, deck, barriers)
LL = 20 kN/m (traffic load per IRC 6-2014)

w = 1.35 × 15 + 1.5 × 20
w = 20.25 + 30 = 50.25 kN/m

Maximum Moment: M = w × L² / 8
M = 50.25 × 25² / 8
M = 50.25 × 625 / 8
M = 3,926 kN·m
```

### 2.2 Bending Moment Analysis

**For Simply Supported Beam (UDL):**
```
M_max = (w × L²) / 8
V_max = (w × L) / 2
```

**For Cantilever Beam:**
```
M_max = (w × L²) / 2
V_max = w × L
```

**For Continuous Beam:**
- Use moment distribution method or software
- Typical interior span: M ≈ (w × L²) / 10
- Typical support moment: M ≈ (w × L²) / 12

**Design Check:**
```
Required Moment Capacity ≤ Available Moment Capacity (with factor of safety)

Safety Factor (minimum):
- Bending: 1.5 for steel, 1.8-2.0 for reinforced concrete
```

### 2.3 Shear Force Analysis

**Maximum Shear Force (Simply Supported):**
```
V_max = (w × L) / 2
```

**Check:**
```
Design Shear Stress: τ = V / (b × d)
τ ≤ τ_allowable
```

**Where:**
- b = breadth of beam
- d = effective depth
- τ_allowable = as per design code (IS 456, IS 1343, etc.)

### 2.4 Foundation Bearing Capacity

**Terzaghi's Bearing Capacity Equation (Simplified):**
```
q_u = c × Nc × Fc × Ic + γ × Df × Nq × Fq × Iq + 0.5 × γ × B × Nγ × Fγ × Iγ
```

**Where:**
- **c** = Cohesion of soil (kPa)
- **γ** = Unit weight of soil (kN/m³)
- **Df** = Depth of footing (m)
- **B** = Width of footing (m)
- **Nc, Nq, Nγ** = Bearing capacity factors (depend on angle of friction φ)
- **Fc, Fq, Fγ** = Shape factors
- **Ic, Iq, Iγ** = Inclination factors

**Typical Bearing Capacity Values:**
- **Dense sand**: 300-500 kPa
- **Medium sand**: 200-300 kPa
- **Stiff clay**: 150-300 kPa
- **Soft clay**: 50-100 kPa
- **Rock**: 500-2000 kPa

**Design Formula:**
```
Allowable Bearing Capacity (q_a) = q_u / Safety Factor (SF)
Typical SF = 3.0 (minimum)

Required Area: A = Load / q_a
```

**Example - Foundation Design:**
```
Vertical Load = 3,500 kN
Soil Type = Sandy clay, φ = 25°, c = 20 kPa
From charts: Nc = 20.7, Nq = 10.9, Nγ = 7.4
Assuming B = 2.5 m, Df = 1.5 m

q_u ≈ 350 kPa
q_a = 350 / 3.0 = 116.7 kPa

Required Area = 3,500 / 116.7 = 30 m²
Footing dimensions: 5.5 m × 5.5 m (with safety)
```

### 2.5 Column Load Combinations

**Standard Load Cases (per IBC/IS):**
1. **Dead Load Only:** D
2. **Dead + Live:** D + L
3. **Dead + Live + Wind:** D + L + W
4. **Dead + Live + Earthquake:** D + L + E
5. **Dead + Maximum Live:** D + 1.25L (for bridges)

**Design Load = Combination with highest result**

---

## 3. MATERIAL SPECIFICATIONS

### 3.1 Structural Steel (Most Common for Civil Projects)

**Grade Selection:**
- **ASTM A36 / IS 2062 E250** - Low carbon, good for welding
- **IS 2062 E290** - Medium strength, ductile
- **IS 2062 E350** - Higher strength, economical for long spans

**Properties:**
```
Yield Strength (Fy):
- E250: 250 MPa
- E290: 290 MPa
- E350: 350 MPa

Tensile Strength (Fu):
- E250: 410 MPa
- E290: 440 MPa
- E350: 490 MPa

Allowable Stress (at design factor 1.67):
- Bending: Fb = 0.66 × Fy
- Shear: Fv = 0.40 × Fy
- Compression: Fa = calculated per slenderness ratio
```

### 3.2 Reinforced Concrete

**Concrete Grades (28-day cube strength):**
- **M20** (20 MPa) - General construction, low structural demands
- **M25** (25 MPa) - Moderate exposure, typical infrastructure
- **M30** (30 MPa) - Heavy loading, high exposure
- **M35** (35 MPa) - High strength requirements, aggressive environment

**Reinforcement Steel:**
- **Mild Steel (MS):** Fy = 250 MPa (less commonly used now)
- **High Yield Steel (HY):** Fy = 415 MPa (standard)
- **TMT Steel:** Fy = 500 MPa (superior ductility, earthquake resistant)

**Design Example - RC Beam:**
```
Span = 6 m
Load = 50 kN/m
Concrete Grade: M30
Steel Grade: Fe415

Design Moment: M = (50 × 6²) / 8 = 225 kN·m
Design Shear: V = (50 × 6) / 2 = 150 kN

Required effective depth: d ≈ √(M / (K × b))
Assume b = 300 mm
d ≈ √(225 × 10⁶ / (1.36 × 300)) ≈ 410 mm
Provide: 450 mm depth

Reinforcement: Assume 4 bars of 20 mm Ø
Area of steel = 4 × π × 10² = 1,256 mm²
Check: As,min = 0.12 bD / 100 = 162 mm² (OK)
```

### 3.3 Bituminous Concrete (for Roads)

**Specifications:**
- **Nominal Mix:** Fixed proportions (e.g., 1:2:3)
- **DBM (Dense Bituminous Macadam)** - Base/binder courses, 19 mm nominal size
- **BC (Bituminous Concrete)** - Wearing course, 13 mm nominal size
- **Bitumen Grade:** VG 30, VG 40 (viscosity grade per ASTM D2170)

**Mix Design:**
```
Typical proportions (by weight):
- Coarse aggregate (12.7-19 mm): 55%
- Fine aggregate: 30%
- Filler (passing 75 μm): 7%
- Bitumen: 8%

Compaction: Marshall hammer or Gyratory compactor
Target density: 97-99% of maximum theoretical density
```

---

## 4. BUDGET & COST MANAGEMENT

### 4.1 Budget Structure (Typical Infrastructure Project)

```
1. Design & Surveys
   - Detailed engineering design: 3-5% of project cost
   - Geotechnical investigations: 0.5-1%
   - Environmental studies: 0.5-1%

2. Land Acquisition & Utilities
   - Land acquisition: 2-8%
   - Utility relocation: 1-3%
   - Environmental mitigation: 0.5-2%

3. Materials & Supplies
   - Steel: 20-30%
   - Concrete: 10-15%
   - Bitumen/asphalt: 5-10% (for roads)
   - Other materials: 5-10%

4. Labor & Construction
   - Skilled labor: 10-20%
   - Unskilled labor: 5-10%
   - Equipment rental: 10-15%

5. Overhead & Management
   - Site management & administration: 3-5%
   - Safety & environmental compliance: 1-2%
   - Quality assurance & testing: 2-3%

6. Contingency
   - Design contingency: 10-15%
   - Construction contingency: 5-10%
   (Total contingency typically 10-15% of direct costs)
```

### 4.2 Cost Tracking Formula

```
Planned Value (PV) = Planned % Complete × Project Budget
Earned Value (EV) = Actual % Complete × Project Budget
Actual Cost (AC) = Actual Expenditure

Cost Variance (CV) = EV - AC
Cost Performance Index (CPI) = EV / AC

If CPI < 1.0 → Project is over budget
If CPI > 1.0 → Project is under budget
If CPI = 1.0 → Project is on budget
```

**Example:**
```
Total Project Budget: $10,000,000
Project is 40% complete (planned)
Actual completion: 35%
Actual expenditure: $3,800,000

PV = 40% × $10M = $4,000,000
EV = 35% × $10M = $3,500,000
AC = $3,800,000

CV = $3,500,000 - $3,800,000 = -$300,000 (over budget)
CPI = $3,500,000 / $3,800,000 = 0.92 (92% efficiency)
```

### 4.3 Cost Control Measures

1. **Value Engineering** - Optimize design without compromising function
2. **Competitive Bidding** - Multiple quotes for major items
3. **Material Procurement Planning** - Bulk purchases, timing
4. **Labor Productivity** - Training, incentives, scheduling
5. **Change Order Control** - Minimize scope creep
6. **Contingency Reserve** - Use only for genuine uncertainties

---

## 5. SCHEDULE & TIMELINE MANAGEMENT

### 5.1 Critical Path Method (CPM)

**Steps:**
1. List all activities
2. Determine dependencies (precedence relationships)
3. Estimate durations
4. Calculate Early Start (ES), Early Finish (EF), Late Start (LS), Late Finish (LF)
5. Identify Critical Path (activities with zero float)

**Float (Slack) = LS - ES = LF - EF**

**Example - Simple CPM:**
```
Activity | Duration | Predecessor | ES | EF | LS | LF | Float
A Design |   60 d   |    Start    |  0 | 60 |  0 | 60 |   0   (Critical)
B Permits|   90 d   |      A      | 60 |150 | 60 |150 |   0   (Critical)
C Survey |   45 d   |    Start    |  0 | 45 | 75 |120 |  75
D Mobiliz|   30 d   |      B      |150 |180 |150 |180 |   0   (Critical)

Critical Path: A → B → D (180 days minimum)
```

### 5.2 Progress Tracking

**Methods:**
1. **Percent Complete** - Subjective but quick
2. **0/100 Rule** - 0% until complete, then 100%
3. **50/50 Rule** - 50% at start, 50% at finish
4. **Weighted Milestones** - Completion of deliverables
5. **Earned Value** - Based on budget allocation

**Schedule Performance Index (SPI):**
```
SPI = EV / PV
If SPI < 1.0 → Behind schedule
If SPI > 1.0 → Ahead of schedule
```

---

## 6. QUALITY ASSURANCE & TESTING

### 6.1 Concrete Quality Tests

| Test | Frequency | Standard | Specification |
|------|-----------|----------|---|
| **Slump Test** | Every 100 m³ | IS 1199 | 50-150 mm (typical) |
| **Compression Strength** | Every 100 m³ | IS 1199 | M25, M30, M35, etc. |
| **Split Tensile Strength** | Monthly | IS 5816 | 8-10% of fc (typical) |
| **Flexural Strength** | Monthly | IS 516 | 10-15% of fc (typical) |
| **Chloride Content** | Per design | IS 3025 | < 0.05% for reinforced |
| **Sulphate Content** | Per design | IS 3025 | < 0.1% |

**Concrete Cube Testing:**
```
7-day strength ≈ 60-70% of 28-day strength
14-day strength ≈ 85-95% of 28-day strength
28-day strength = Design specification (IS 456)

Acceptance Criteria:
- Individual result ≥ 0.85 × fck (design strength)
- Average of 4 consecutive tests ≥ fck
```

### 6.2 Steel Quality Tests

| Test | Frequency | Standard | Acceptance |
|------|-----------|----------|---|
| **Tensile Test** | Per 40 tonnes | IS 1608 | Fy ≥ Specified, Fu ≥ 1.3Fy |
| **Bend Test** | Per 40 tonnes | IS 1608 | 180° bend, no cracks |
| **Impact Test** | Per 100 tonnes | IS 1608 | ≥ 27 J @ ambient temp |
| **Chemical Analysis** | Per 50 tonnes | ASTM A36 | C, Mn, P, S within limits |
| **Ultrasonic Test** | For welds | AWS D1.1 | No internal defects |

### 6.3 Field Testing & Inspection

**During Construction:**
1. **Excavation Inspection** - Soil conditions, depth, side slopes
2. **Formwork Inspection** - Alignment, bracing, support
3. **Reinforcement Inspection** - Bar placement, spacing, lap length
4. **Concrete Placement** - Slump, temperature, placement method
5. **Curing** - Temperature, moisture for 7+ days
6. **Removal of Formwork** - Strength verification

**Before Opening/Handover:**
1. **Load Testing** - Applied load ≥ 1.25 × design load
2. **Non-Destructive Testing** - Ultrasonic, GPR, thermal imaging
3. **Surface Quality** - Finish, color, cracks
4. **Dimensional Verification** - ±50 mm typical tolerance
5. **Durability Assessment** - Visual inspection for weathering

---

## 7. DESIGN STANDARDS & CODES

### 7.1 Indian Standards (Most Common in India)

**Structural:**
- **IS 456:2000** - Code of practice for Plain and RC
- **IS 1893:2016** - Criteria for earthquake resistant design
- **IS 800:2007** - Code of practice for steel structures
- **IS 875:1987** - Code of practice for design loads (wind, snow)
- **IS 6861:1989** - Design, fabrication and erection of structural steelwork

**Bridges:**
- **IRC 6:2017** - Standard specifications & code of practice for road bridges
- **IRC 78:2014** - Standard specifications for road and railway bridges (concrete)
- **IRC 5:2015** - Standard specifications for road and runway pavements

**Materials:**
- **IS 1343:2012** - Prestressed concrete code
- **IS 2386:1963** - Methods of test for aggregates
- **IS 383:2016** - Coarse and fine aggregates from natural sources

### 7.2 International Standards

- **ASTM (American)** - A36, C39, D3359
- **Eurocode (European)** - EN 1991, EN 1992, EN 1998
- **BS (British)** - BS 8110, BS 5400
- **AISC (USA - Steel)** - LRFD Design Specifications
- **ACI (USA - Concrete)** - ACI 318 Building Code Requirements

---

## 8. SAFETY REQUIREMENTS

### 8.1 Site Safety Plan Elements

1. **Access Control** - Restricted entry, sign-in procedures
2. **Personal Protective Equipment (PPE)** - Hard hats, vests, gloves, footwear
3. **Fall Protection** - Guardrails, nets, harnesses (height > 1.8 m)
4. **Excavation Safety** - Shoring, trench protection, water management
5. **Equipment Safety** - Inspection, certification, operator training
6. **Fire Safety** - Extinguishers, emergency exits, hot work procedures
7. **Environmental** - Dust suppression, noise control, waste management
8. **Health & Sanitation** - Clean water, toilets, first aid station

### 8.2 Common Hazards & Controls

| Hazard | Risk | Control Measures |
|--------|------|---|
| **Falls from height** | High | Guardrails, harnesses, nets |
| **Excavation collapse** | High | Shoring, sloped sides, monitoring |
| **Heavy equipment** | High | Training, signals, barriers |
| **Electrical** | Medium | Grounding, circuit protection, safe distance |
| **Dust/Air Quality** | Medium | Spraying, masks, ventilation |
| **Noise** | Medium | Earmuffs, equipment maintenance, shift limits |

### 8.3 Incident Reporting

**Require immediate documentation of:**
- Near-misses (potential accidents prevented)
- Minor injuries (first aid only)
- Lost-time injuries (work stoppage)
- Property damage/equipment damage
- Environmental spills

---

## 9. PROJECT CLOSEOUT PROCEDURES

### 9.1 Final Verification Checklist

- [ ] All design codes & standards compliance verified
- [ ] All drawings, calculations, reports signed and sealed by PE
- [ ] Material test certificates collected & filed
- [ ] As-built drawings updated & approved
- [ ] Final safety inspection completed
- [ ] Defect list identified & corrected
- [ ] Retention amount verified & withheld appropriately
- [ ] Performance warranties documented
- [ ] Operating manuals & spare parts list provided
- [ ] Personnel training completed
- [ ] Project photos/videos archived

### 9.2 Final Account Settlement

```
Final Payment = Contract Amount
                ± Approved Variations
                ± Price Adjustment (if applicable)
                - Retention Amount (typically 5-10%)
                - Penalty for delays (if applicable)
                ± Interim payments already made

Retention Released: Upon completion, defect-free period (6-12 months)
```

### 9.3 Lessons Learned

Document for future projects:
- What worked well
- What caused delays/cost overruns
- Environmental/safety challenges
- Supplier performance
- Equipment performance
- Weather/site conditions affecting schedule
- Recommendations for improvements

---

## 10. DESIGN EXAMPLE - BRIDGE SPAN (25 m)

### Problem Statement
Design a simply-supported pre-stressed concrete bridge with:
- Span = 25 m
- Width = 10 m
- Design traffic load = IRC Class 70-R (standard highway)
- Soil bearing capacity = 250 kPa
- Design code = IRC 6, IS 1343

### Step 1: Dead Load Calculation

**Deck & Wearing Course:**
- Concrete deck: 0.25 m × 10 m × 2,400 kg/m³ = 6,000 kg/m
- Wearing course (3 cm): 0.03 m × 10 m × 2,200 kg/m³ = 660 kg/m
- Parapet/barriers: ≈ 1,500 kg/m
- Total DL = (6,000 + 660 + 1,500) / 1,000 = 8.16 kN/m

**Girder Weight** (estimated from first principles):
- Cross-section: 0.5 m × 0.4 m × 25 m of post-tensioned concrete
- Weight = 0.5 × 0.4 × 25 × 2,500 kg/m³ = 12,500 kg = 125 kN (distributed over 25 m)
- Per unit length = 125 / 25 = 5 kN/m

**Total DL = 8.16 + 5 = 13.16 ≈ 13 kN/m**

### Step 2: Live Load

**IRC Class 70-R:**
- Standard axle load = 70 kN
- Distributed load = 4.75 kN/m (plus concentrated load)
- Impact factor = 1.25 (for short spans < 10 m); for 25 m span, use 1.15
- Design LL = 4.75 × 1.15 = 5.46 kN/m

### Step 3: Factored Load

```
w = 1.35 × DL + 1.5 × LL
w = 1.35 × 13 + 1.5 × 5.46
w = 17.55 + 8.19
w = 25.74 kN/m
```

### Step 4: Bending Moment

```
M = (w × L²) / 8
M = (25.74 × 25²) / 8
M = (25.74 × 625) / 8
M = 16,087.5 / 8
M = 2,010.9 kN·m
```

### Step 5: Section Design

Assume post-tensioned box girder:
- Width = 10 m
- Depth = 1.2 m (L/20 is typical for post-tensioned)
- Top slab thickness = 0.25 m
- Bottom slab thickness = 0.20 m

**Stress Analysis (at mid-span):**
```
Section modulus: Z = I / y

For typical box section:
Z_top ≈ 1.5 m³
Z_bottom ≈ 1.5 m³

Bending stress: fb = M / Z
fb = 2,010.9 × 10⁶ / (1.5 × 10⁶) = 1,340 kPa (permissible for prestressed concrete)

Post-tensioning force required:
P = fb × Z / e (where e = eccentricity ≈ 0.4 m)
P ≈ 1,340 × 1.5 × 10⁶ / (0.4 × 10⁶) ≈ 5,025 kN

Provide: 40 tendons of 12.7 mm diameter (7 wires each)
Total prestress force = 40 × 120 = 4,800 kN (adequate)
```

### Step 6: Substructure Design

**Abutment/Pier Load:**
```
Total vertical load per support = (DL + LL) × L / 2
= (13 + 5.46) × 25 / 2 = 230.75 kN (service load)

Factored load = 1.35 × 13 × 25/2 + 1.5 × 5.46 × 25/2
= 218 + 102 = 320 kN per support (design)

Adding weight of pier/abutment itself ≈ 500 kN
Total design load ≈ 820 kN per support

Required bearing area = 820 / 250 = 3.28 m²
Provide: 2.0 m × 2.0 m footing (4 m²) with 2 m pile depth
```

### Step 7: Reinforcement Details

**Longitudinal reinforcement:**
- Provide 36 bars of 28 mm Ø in bottom zone (As,main)
- Provide 20 bars of 16 mm Ø in top zone (As,dist)

**Transverse reinforcement:**
- Stirrups: 12 mm Ø @ 200 mm spacing in shear zones
- 12 mm Ø @ 300 mm spacing in mid-span
- Shear reinforcement satisfies V_c + V_s > V_d

---

## 11. COMMON CALCULATIONS REFERENCE

### Conversion Factors
```
1 kN = 102 kgf
1 MPa = 10.2 kgf/cm²
1 m = 3.28 feet = 1,000 mm
1 m² = 10.764 ft²
1 m³ = 35.315 ft³
1 tonne = 1,000 kg = 10 kN
```

### Material Density
```
Concrete (reinforced): 2,400 kg/m³ = 24 kN/m³
Structural Steel: 7,850 kg/m³ = 78.5 kN/m³
Soil (dry): 1,600 kg/m³ = 16 kN/m³
Soil (saturated): 1,900 kg/m³ = 19 kN/m³
Water: 1,000 kg/m³ = 10 kN/m³
```

### Concrete Strength Development
```
Time       | Strength (% of 28-day)
3 days     | 40%
7 days     | 65%
14 days    | 90%
28 days    | 100%
56 days    | 105%
90 days    | 110%
1 year     | 115%
```

---

## 12. RESOURCES & REFERENCE

### Standards to Keep Handy
1. **IRC 6:2017** - Bridge standards (Indian context)
2. **IS 456:2000** - Concrete design
3. **IS 800:2007** - Steel design
4. **IS 875** - Design loads (wind, earthquake)

### Useful Formulas (Quick Reference)
- **Simply Supported Beam:** M = wL²/8, V = wL/2
- **Cantilever:** M = wL²/2, V = wL
- **Circular Footing:** A = πr² , Perimeter = 2πr
- **Rectangular Footing:** A = L × B
- **Columns:** P/A ≤ Allowable stress (varies by code)

### Unit Weights
- Concrete: 24 kN/m³ (reinforced)
- Steel: 78.5 kN/m³
- Asphalt: 22 kN/m³
- Water: 10 kN/m³

---

**Document Version:** 1.0  
**Last Updated:** May 2026  
**For:** Civil/Infrastructure Projects  
**Standards Reference:** IRC, IS codes, ASTM
