/* ═══════════════════════════════════════════════════════════════════════
   BLOG-DATA.JS  |  Your Blog Content
   ─────────────────────────────────────────────────────────────────────

   ✅  HOW TO ADD A NEW POST
   ─────────────────────────
   1. Scroll to the very bottom of this file
   2. Copy the TEMPLATE block (clearly marked below)
   3. Paste it just ABOVE the closing ];
   4. Add a comma after the previous post's closing }
   5. Fill in your title, content, images, etc.
   6. Save → upload to GitHub → post appears automatically!

   🗑️  HOW TO DELETE A POST
   ─────────────────────────
   1. Find the post you want to remove below
   2. Delete everything from the opening { to the closing },
   3. Save → done!

   📝  CONTENT HTML COMPONENTS
   ─────────────────────────────
   · <h2>Section Heading</h2>          — major section
   · <h3>Sub Heading</h3>              — sub section
   · <p>Your paragraph text</p>        — body paragraph
   · <ul><li>item</li></ul>            — bullet list
   · <ol><li>step</li></ol>            — numbered list
   · <blockquote>Quote here</blockquote>
   · <img src="photo.jpg" alt="desc">  — photo (must be in same folder)
   · <div class="callout">
       <div class="callout-icon"><i class="fas fa-info-circle"></i></div>
       <div class="callout-body"><strong>Key Point:</strong> Detail here.</div>
     </div>
   · <div class="callout warn">
       <div class="callout-icon"><i class="fas fa-exclamation-triangle"></i></div>
       <div class="callout-body"><strong>Warning:</strong> Text.</div>
     </div>
   · <div class="formula">
       <div class="formula-label">Formula Name</div>
       RL = HI − FS
     </div>
   · <table><tr><th>Header</th></tr><tr><td>Data</td></tr></table>

   📂  VALID CATEGORIES
   ─────────────────────
   construction | surveying | water | highway | structural | career

   ═══════════════════════════════════════════════════════════════════════ */

const BLOG_POSTS = [

/* ─────────────────────────────────────────────────────────────────────
   POST 1 — RCC Construction Guide
   To remove: delete from the { on the next line to the matching },
────────────────────────────────────────────────────────────────────── */
{
  id:       'rcc-construction-guide',
  title:    'Understanding RCC Construction: A Student\'s First-Hand Guide',
  category: 'construction',
  date:     'January 2024',
  dateSort: '2024-01-15',
  readTime: '6 min read',
  image:    'micad1.jpg',
  excerpt:  'From site marking to beam placement — everything I learned during my 6-month MICADA internship watching an underground RCC water tank built from scratch.',
  tags:     ['RCC', 'Water Tank', 'MICADA', 'Internship', 'Construction'],
  featured: false,
  emoji:    '🏗️',
  content: `
<div class="rd-hero-img"><img src="micad1.jpg" alt="MICADA RCC Construction Site" onerror="this.parentElement.style.display='none'"></div>
<div class="post-meta">
  <span class="cat-pill cp-gold">Construction</span>
  <span class="fc-date"><i class="fas fa-calendar-alt"></i>January 2024</span>
  <span class="fc-time"><i class="fas fa-clock"></i>6 min read</span>
</div>
<h1 class="post-h1">Understanding RCC Construction: A Student's First-Hand Guide</h1>
<p class="post-lead">From site marking to beam placement — everything I learned during my 6-month MICADA internship watching an underground RCC water tank built completely from scratch.</p>
<div class="post-author">
  <img src="nikhil.png" alt="Nikhil Sain" class="pa-av" onerror="this.style.display='none'">
  <div><div class="pa-name">Nikhil Sain</div><div class="pa-role">B.Tech Civil Eng · DCRUST 2026</div></div>
  <div class="pa-end"><span class="pa-chip"><i class="fas fa-clock"></i>6 min read</span></div>
</div>
<div class="article-body">

<h2>My First Day on a Real Construction Site</h2>
<p>I still remember standing at the edge of a freshly excavated pit on my first morning at the MICADA internship site in Mahendragarh. The mix of excitement and sudden awareness that textbook knowledge only gets you so far. I had studied Reinforced Cement Concrete extensively: flexure formulas, IS code provisions, cover requirements, mix design principles. But watching a supervisor mark out the footprint of an underground water tank on bare earth with a ranging rod and chalk powder made me realize how much theory quietly skips over.</p>
<p>This is a step-by-step walkthrough of how an underground RCC water tank is actually constructed — based on what I witnessed during my 6-month internship with MICADA (Minor Irrigation &amp; Command Area Development Authority), Haryana Government.</p>

<h2>Phase 1: Site Layout Marking</h2>
<p>Before a single shovel enters the ground, the site is surveyed and marked precisely. A total station establishes exact corner coordinates from a known control point. Lime powder or wooden pegs with string define the excavation boundary. The team checks diagonals to confirm the layout is truly square before any work begins.</p>
<div class="callout warn">
  <div class="callout-icon"><i class="fas fa-ruler"></i></div>
  <div class="callout-body"><strong>Field Check:</strong> In a perfect rectangle, both diagonals must be equal. For a square, diagonal = side × 1.414. Our team ran this check constantly before committing to excavation boundaries.</div>
</div>

<h2>Phase 2: Soil Excavation</h2>
<p>For an underground tank (~50,000 L capacity), excavation goes 3–4 metres deep. We used a JCB 3CX backhoe for bulk earthwork and hand tools for trimming near edges. A sump pit in one corner continuously pumped out groundwater accumulation during overnight rain.</p>
<ul>
  <li>Excavated soil stockpiled to one side for later backfilling — nothing wasted</li>
  <li>Side slopes at approximately 45° to prevent cave-ins</li>
  <li>Bottom level checked with dumpy level before proceeding</li>
  <li>Over-excavation avoided — loosened base soil requires additional compaction</li>
</ul>

<h2>Phase 3: PCC Blinding Layer</h2>
<p>Before structural work, a 75–100mm Plain Cement Concrete (M10, 1:3:6) layer is cast at the base. This "blinding layer" creates a clean working surface, prevents reinforcement-soil contact, and stops moisture from wicking upward.</p>
<div class="callout">
  <div class="callout-icon"><i class="fas fa-info-circle"></i></div>
  <div class="callout-body"><strong>IS 456:2000 Clause 8.2.2:</strong> Requires minimum 75mm PCC bedding below all structural footings and slabs in contact with ground. The site supervisor verified this thickness at multiple points before the PCC was poured.</div>
</div>

<h2>Phase 4: Reinforcement Placement</h2>
<p>Bar bending schedules (BBS) from structural drawings specified the size, shape, spacing, and quantity of every bar. Fe415 TMT bars were cut and bent precisely to match the BBS. The base slab used a two-way grid: 12mm main bars at 150mm c/c, 8mm distribution bars at 200mm c/c. Cover blocks exactly 25mm thick were placed every 600mm.</p>

<table>
  <tr><th>Member</th><th>Bar Dia (mm)</th><th>Spacing (mm)</th><th>Cover (mm)</th></tr>
  <tr><td>Base slab</td><td>12 / 8</td><td>150 / 200</td><td>45</td></tr>
  <tr><td>Walls</td><td>10 / 8</td><td>150 / 200</td><td>45</td></tr>
  <tr><td>Roof slab</td><td>10 / 8</td><td>175 / 225</td><td>25</td></tr>
</table>

<div class="callout warn">
  <div class="callout-icon"><i class="fas fa-exclamation-triangle"></i></div>
  <div class="callout-body"><strong>IS 3370 (Water Tanks):</strong> Minimum clear cover is <strong>45mm</strong> on the water face — stricter than standard 25mm because constant moisture accelerates carbonation and chloride attack. Every corner and wall was inspected before approval.</div>
</div>

<h2>Phase 5: Shuttering (Formwork)</h2>
<p>Steel plate shuttering panels were used for the walls — they provide a smooth finish and can be reused many times. Panels were set plumb, braced with acrow props, and tied through the walls with form ties to resist wet concrete pressure. A releasing agent was applied to all form faces the morning before each pour to allow clean stripping without surface damage.</p>

<h2>Phase 6: Concrete Mix, Testing &amp; Pouring</h2>
<p>Structural concrete was M25 grade with a maximum water-cement ratio of 0.45 (IS 3370 requirement for water-retaining structures). Three key tests before every major pour:</p>
<ul>
  <li><strong>Slump test:</strong> Target 75–100mm for workability. Values outside this range triggered batch rejection</li>
  <li><strong>Cube casting:</strong> Three 150mm cubes per batch for 7-day and 28-day strength testing</li>
  <li><strong>Visual inspection:</strong> Colour and consistency checked against reference</li>
</ul>
<p>Concrete was poured in layers ≤300mm. A 25mm needle vibrator was inserted at regular intervals to eliminate entrapped air — critical for watertight structures.</p>

<div class="formula">
  <div class="formula-label">Volume Estimation</div>
  Slab volume = L × W × D<br>
  Wall volume  = Perimeter × thickness × height<br>
  Add 5–7% for site wastage
</div>

<h2>Phase 7: Curing — The Most Neglected Step</h2>
<p>For water-retaining structures, curing was extended to <strong>21 days minimum</strong> using wet hessian cloth changed twice daily. This ensures full cement hydration for maximum strength and watertightness. A crystalline waterproofing compound was slurry-coated on inner wall surfaces after 14 days before plastering.</p>

<h2>What Textbooks Don't Tell You</h2>
<p>The biggest gap between classroom and site? <strong>People management.</strong> Ensuring labourers don't sit on reinforcement mesh, confirming vibrators don't touch the bars (causes segregation), checking shuttering bolts are tight before a pour — these human factors determine whether a structure performs to its design intent. Engineering is the daily discipline of ensuring every worker understands <em>why</em> each procedure exists.</p>

</div>`
},

/* ─────────────────────────────────────────────────────────────────────
   POST 2 — Mussoorie Survey Camp (FEATURED)
   To remove: delete from the { on the next line to the matching },
────────────────────────────────────────────────────────────────────── */
{
  id:       'mussoorie-survey-camp',
  title:    'Mussoorie Survey Camp: What They Don\'t Teach You in Classrooms',
  category: 'surveying',
  date:     'June 2023',
  dateSort: '2023-06-10',
  readTime: '8 min read',
  image:    'mussoorie1.jpg',
  excerpt:  'Total stations, fly levelling, and mountain terrain — a complete field report from DCRUST\'s advanced surveying camp that fundamentally changed how I understand practical civil engineering.',
  tags:     ['Total Station', 'Fly Levelling', 'DCRUST', 'Compass Survey', 'Plane Table'],
  featured: true,
  emoji:    '🏔️',
  content: `
<div class="rd-hero-img"><img src="mussoorie1.jpg" alt="Mussoorie Survey Camp DCRUST" onerror="this.parentElement.style.display='none'"></div>
<div class="post-meta">
  <span class="cat-pill cp-steel">Surveying</span>
  <span class="fc-date"><i class="fas fa-calendar-alt"></i>June 2023</span>
  <span class="fc-time"><i class="fas fa-clock"></i>8 min read</span>
</div>
<h1 class="post-h1">Mussoorie Survey Camp: What They Don't Teach You in Classrooms</h1>
<p class="post-lead">Total stations, mountain fog, and a 2km levelling loop with an 8mm closing error — a complete field report from DCRUST's advanced surveying camp that transformed my understanding of civil engineering.</p>
<div class="post-author">
  <img src="nikhil.png" alt="Nikhil Sain" class="pa-av" onerror="this.style.display='none'">
  <div><div class="pa-name">Nikhil Sain</div><div class="pa-role">B.Tech Civil Eng · DCRUST 2026</div></div>
  <div class="pa-end"><span class="pa-chip"><i class="fas fa-clock"></i>8 min read</span></div>
</div>
<div class="article-body">

<h2>Arrival: Where Theory Meets Terrain</h2>
<p>The 6-hour overnight bus ride winding up through Himalayan foothills was itself a lesson in geography. By the time our 42-student batch arrived, the air was cool and our confidence was about to be tested by real terrain in ways no lab exercise ever had. DCRUST's advanced surveying camp runs for approximately one month — each day brought a different instrument, a different terrain challenge, and a deeper appreciation for why accuracy matters so much in civil engineering.</p>

<h2>The Instrument Arsenal</h2>
<ul>
  <li><strong>Total Station (Leica TS06 Plus):</strong> Electronic measurement of horizontal/vertical angles and slope distances simultaneously. Data logged for CAD download.</li>
  <li><strong>Automatic Level:</strong> For fly levelling and differential levelling using the Height of Instrument (HI) method.</li>
  <li><strong>Prismatic Compass:</strong> Compass traverses and magnetic bearing measurement; detection of local attraction.</li>
  <li><strong>Plane Table with Telescopic Alidade:</strong> Direct graphical mapping in the field — no numbers, just sight lines on paper.</li>
  <li><strong>Vernier Theodolite:</strong> Traditional angle measurement to 20-second precision using vernier scales.</li>
</ul>

<h2>Exercise 1: Fly Levelling — The Patience Test</h2>
<p>Our first major task: a fly levelling traverse over approximately 2km of uneven mountain ground. Objective — establish bench marks at regular intervals and close the loop back to the starting TBM within IS tolerance.</p>

<div class="formula">
  <div class="formula-label">IS 1938 Fly Levelling Tolerance</div>
  Allowable misclosure = ±12√K mm<br>
  where K = total distance in kilometres<br><br>
  For our 2km loop: ±12√2 = ±17mm allowed
</div>

<p>We set up the level, took backsight (BS) on the starting TBM, computed Height of Instrument (HI = known RL + BS), moved the staff to a change point, took foresight (FS), and calculated the new Reduced Level. This cycle repeated 26 times over the traverse.</p>

<div class="callout">
  <div class="callout-icon"><i class="fas fa-calculator"></i></div>
  <div class="callout-body">
    <strong>Field Book Arithmetic Check:</strong><br>
    RL (new) = HI − FS, where HI = RL (known) + BS<br>
    Running check: ΣBS − ΣFS = Last RL − First RL<br>
    If this doesn't balance, there's a calculation error in your book.
  </div>
</div>

<p>Our closing error: <strong>8mm over 2km</strong>. Well within the 17mm tolerance — but achieving it took three corrections on Day 1 where parallax error caused mis-readings, plus one afternoon retrace to locate a blunder in the middle section. That detective work through a field book taught me more about systematic observation than any lecture.</p>

<h2>Exercise 2: Total Station Closed Traverse</h2>
<p>Working with the Leica TS06, we established a 5-sided closed traverse around a hillside section. At each station, we measured the horizontal angle using the repetition method (averaging to reduce reading errors) and slope distance to the adjacent prism reflector.</p>

<table>
  <tr><th>Station</th><th>Observed Bearing</th><th>Distance (m)</th><th>Correction</th></tr>
  <tr><td>A → B</td><td>042° 18' 20"</td><td>84.63</td><td>−8"</td></tr>
  <tr><td>B → C</td><td>118° 54' 40"</td><td>71.22</td><td>−8"</td></tr>
  <tr><td>C → D</td><td>204° 07' 00"</td><td>92.18</td><td>−8"</td></tr>
  <tr><td>D → E</td><td>298° 31' 20"</td><td>67.95</td><td>−8"</td></tr>
  <tr><td>E → A</td><td>011° 48' 40"</td><td>78.44</td><td>−8"</td></tr>
</table>

<p>Angular misclosure: <strong>48 seconds</strong>. Acceptable per IS 1650 which permits 60√n seconds for a 5-sided traverse (= 134" maximum). We downloaded data to AutoCAD Civil 3D, plotted corrected coordinates, and calculated the enclosed area using the coordinate method.</p>

<h2>Exercise 3: Compass Survey &amp; Local Attraction</h2>
<p>Compass traverses introduced us to a fascinating real-world complication: <strong>local attraction</strong>. Near metallic structures or certain rock types, the earth's magnetic field is disturbed and the compass needle deflects from true magnetic north.</p>
<div class="callout warn">
  <div class="callout-icon"><i class="fas fa-magnet"></i></div>
  <div class="callout-body"><strong>Detection Rule:</strong> If fore-bearing and back-bearing differ by exactly 180°, both stations are free from local attraction. If not, at least one is affected. At one station near a steel fence post, the difference was 187° 30' — indicating 7° 30' of local attraction.</div>
</div>

<h2>Exercise 4: Plane Table Mapping</h2>
<p>The most primitive-feeling and most satisfying exercise. No numbers, no calculations — just a drawing board levelled on a tripod, a sheet of paper, and a telescopic alidade. Sight distant features, draw the ray, move to the next station, sight the same features again. Where rays intersect, that's where the feature is on your map. Our team mapped a 200m × 150m area with sufficient accuracy to match the reference survey map provided as a check.</p>

<h2>The Hardest Lesson: Protocols Over Precision</h2>
<p>The most important lesson had nothing to do with optics or coordinates. A single transposed reading — 1.234 recorded as 1.324 — caused a 90mm blunder that took half an afternoon to trace. From that day we implemented a strict rule: one person reads, one person records, one person independently checks the arithmetic before moving the instrument. That protocol eliminated all subsequent blunders and mirrors the independent checking systems used in real-world construction QC.</p>

<h2>Key Takeaways for Future Field Engineers</h2>
<ul>
  <li><strong>Parallax:</strong> Eye position relative to the eyepiece significantly affects readings — almost impossible to appreciate until you've made the error</li>
  <li><strong>Weather timing:</strong> Morning fog increases atmospheric refraction; afternoon heat haze reduces staff accuracy — plan fieldwork around this</li>
  <li><strong>Re-level before every reading:</strong> Bubble drift after setup is real — check it before each set</li>
  <li><strong>Field book discipline:</strong> Neat books with running arithmetic checks are the difference between a 2-hour computation and a 2-day blunder hunt</li>
  <li><strong>Roles:</strong> Define reader, recorder, operator, checker before starting. Rotate daily so everyone masters all positions.</li>
</ul>
</div>`
},

/* ─────────────────────────────────────────────────────────────────────
   POST 3 — STP Site Visit
   To remove: delete from the { on the next line to the matching },
────────────────────────────────────────────────────────────────────── */
{
  id:       'stp-mahendragarh',
  title:    'Inside an 8 MLD Sewage Treatment Plant: Stage-by-Stage Walkthrough',
  category: 'water',
  date:     'March 2024',
  dateSort: '2024-03-20',
  readTime: '7 min read',
  image:    'gallery5.jpeg',
  excerpt:  'How does sewage become clean water? I visited the 8 MLD STP in Mahendragarh during my MICADA internship and documented every treatment stage from inlet screening to final chlorination.',
  tags:     ['STP', 'Water Treatment', 'Environmental', 'MICADA', 'Infrastructure'],
  featured: false,
  emoji:    '💧',
  content: `
<div class="post-meta">
  <span class="cat-pill cp-steel">Water Infrastructure</span>
  <span class="fc-date"><i class="fas fa-calendar-alt"></i>March 2024</span>
  <span class="fc-time"><i class="fas fa-clock"></i>7 min read</span>
</div>
<h1 class="post-h1">Inside an 8 MLD Sewage Treatment Plant: Stage-by-Stage Walkthrough</h1>
<p class="post-lead">How does sewage become clean water? I visited the 8 MLD STP in Mahendragarh, Haryana during my MICADA internship and documented every treatment stage — from the raw sewage inlet to the final chlorinated effluent ready for discharge.</p>
<div class="post-author">
  <img src="nikhil.png" alt="Nikhil Sain" class="pa-av" onerror="this.style.display='none'">
  <div><div class="pa-name">Nikhil Sain</div><div class="pa-role">B.Tech Civil Eng · DCRUST 2026</div></div>
  <div class="pa-end"><span class="pa-chip"><i class="fas fa-clock"></i>7 min read</span></div>
</div>
<div class="article-body">

<h2>Why This Visit Mattered</h2>
<p>I had studied environmental engineering — BOD, COD, activated sludge, trickling filters — but had never seen a real STP in operation. This visit bridged that gap completely. India generates roughly 72,000 MLD of sewage daily and treats only about 28% of it (CPCB 2021). The gap represents enormous career opportunity for civil and environmental engineers of our generation.</p>

<div class="callout">
  <div class="callout-icon"><i class="fas fa-tint"></i></div>
  <div class="callout-body"><strong>Scale Check:</strong> 8 MLD = 8,000 m³/day = 8 million litres per day. This single plant serves approximately 50,000–70,000 people. To appreciate the scale: an Olympic swimming pool holds about 2,500 m³, so this plant treats over 3 pools worth of sewage every single day.</div>
</div>

<h2>Stage 1: Inlet Screening</h2>
<p>Raw sewage arrives via the main sewer line and passes through coarse bar screens (25–50mm openings, set at 45–60°). These remove large debris: plastic bags, rags, wood, rubber. A finer second screen (6mm openings) follows, protecting downstream pumps. The plant used mechanically cleaned screens that triggered raking based on headloss across the screen — not a timer — which is more efficient and responsive to flow variations.</p>

<h2>Stage 2: Grit Chamber</h2>
<p>Sewage flows into a long, shallow grit chamber designed to reduce velocity to approximately 0.3 m/s. At this velocity, heavy inorganic grit (sand, gravel) settles while lighter organic material stays suspended and flows forward.</p>
<div class="formula">
  <div class="formula-label">Grit Chamber Design Velocity</div>
  Target horizontal flow = 0.25 – 0.40 m/s<br>
  Too fast → grit doesn't settle<br>
  Too slow → organic matter settles, causing odour
</div>
<p>Settled grit is washed in a classifier to remove organics, then disposed of as non-hazardous fill material — protecting all downstream pumps and pipelines from abrasive wear.</p>

<h2>Stage 3: Primary Sedimentation</h2>
<p>In circular primary clarifiers, flow velocity drops to near zero. Chain-and-flight scrapers move settled "primary sludge" to a central hopper while floating grease is skimmed from the surface. Primary treatment removes approximately:</p>
<ul>
  <li>50–65% of Total Suspended Solids (TSS)</li>
  <li>25–40% of BOD (Biochemical Oxygen Demand)</li>
  <li>Most floating oils and greases</li>
</ul>

<h2>Stage 4: Aeration Tank (Activated Sludge Process)</h2>
<p>Primary effluent enters large aeration tanks where it mixes with a dense culture of microorganisms — the "activated sludge." Fine-bubble diffusers pump compressed air through the mixed liquor, supplying oxygen for aerobic bacteria to consume dissolved organic pollutants.</p>

<table>
  <tr><th>Parameter</th><th>Typical Value</th><th>Purpose</th></tr>
  <tr><td>MLSS</td><td>3,000–4,000 mg/L</td><td>Optimal bacterial density</td></tr>
  <tr><td>DO (Dissolved Oxygen)</td><td>2.0–4.0 mg/L</td><td>Aerobic conditions</td></tr>
  <tr><td>HRT</td><td>6–8 hours</td><td>Sufficient contact time</td></tr>
  <tr><td>F/M Ratio</td><td>0.2–0.4 kg BOD/kg MLSS/day</td><td>Controls sludge age</td></tr>
</table>

<div class="callout">
  <div class="callout-icon"><i class="fas fa-microscope"></i></div>
  <div class="callout-body"><strong>What is MLSS?</strong> Mixed Liquor Suspended Solids — the concentration of biological mass in the aeration tank. The operator samples this every morning and adjusts waste sludge discharge to maintain the target 3,000–4,000 mg/L range. Too low: insufficient bacteria. Too high: poor settling in the secondary clarifier.</div>
</div>

<h2>Stage 5: Secondary Clarifier</h2>
<p>Mixed liquor from aeration tanks flows to secondary clarifiers where biological sludge separates from clarified effluent. Most settled sludge is recycled as Return Activated Sludge (RAS) back to the aeration tanks — this is how the system maintains its bacterial population. Excess is wasted as Waste Activated Sludge (WAS) to control sludge age.</p>

<h2>Stage 6: Chlorination &amp; Final Effluent</h2>
<p>Before discharge, secondary effluent is dosed with liquid chlorine at 3–5 mg/L in a serpentine contact chamber providing a minimum 30-minute contact time. Residual chlorine is tested at the outlet daily — too low means inadequate disinfection; too high is toxic to aquatic life in the receiving water body.</p>

<table>
  <tr><th>Parameter</th><th>Raw Sewage</th><th>Treated Effluent</th><th>CPCB Limit</th></tr>
  <tr><td>BOD (mg/L)</td><td>200–300</td><td>&lt;20</td><td>&lt;30</td></tr>
  <tr><td>COD (mg/L)</td><td>400–600</td><td>&lt;100</td><td>&lt;250</td></tr>
  <tr><td>TSS (mg/L)</td><td>200–400</td><td>&lt;30</td><td>&lt;100</td></tr>
  <tr><td>Fecal Coliform</td><td>10⁷ MPN/100mL</td><td>&lt;500</td><td>&lt;1000</td></tr>
</table>

<h2>The Bigger Picture</h2>
<p>What struck me most walking through this plant: how much civil engineering lives inside an STP that nobody mentions in environmental engineering courses. The screening building, grit chambers, clarifier tanks, aeration basins, sludge drying beds — all reinforced concrete structures designed by civil engineers. The hydraulic calculations, pipe sizing, valve chambers, embankments — civil engineering at every turn. India needs hundreds of new or upgraded STPs over the next decade. If you're looking for an area with massive future demand, environmental infrastructure is one of the highest-impact sectors a civil engineer can enter.</p>

</div>`
},

/* ═══════════════════════════════════════════════════════════════════════
   ┌─────────────────────────────────────────────────────────────────────┐
   │                    📝  ADD YOUR NEW POST HERE                       │
   │                                                                     │
   │  1. Add a comma after the closing } of the last post above          │
   │  2. Copy the TEMPLATE below                                         │
   │  3. Paste it here and fill in your content                          │
   └─────────────────────────────────────────────────────────────────────┘

   ────────── TEMPLATE (copy from { to the closing comment) ──────────

{
  id:       'your-post-id',           // unique, hyphens only, no spaces
  title:    'Your Post Title',
  category: 'construction',          // construction|surveying|water|highway|structural|career
  date:     'April 2025',
  dateSort: '2025-04-01',            // YYYY-MM-DD for correct sorting
  readTime: '5 min read',
  image:    'your-photo.jpg',        // filename in same folder, or '' for none
  excerpt:  'One or two sentence preview shown on the blog listing.',
  tags:     ['Tag1', 'Tag2', 'Tag3'],
  featured: false,                   // set true to make this the featured article
  emoji:    '🔧',                    // shown as fallback when image is missing
  content: `
<div class="post-meta">
  <span class="cat-pill cp-gold">Construction</span>
  <span class="fc-date"><i class="fas fa-calendar-alt"></i>April 2025</span>
  <span class="fc-time"><i class="fas fa-clock"></i>5 min read</span>
</div>
<h1 class="post-h1">Your Post Title Here</h1>
<p class="post-lead">Your compelling opening paragraph that draws readers in.</p>
<div class="post-author">
  <img src="nikhil.png" alt="Nikhil Sain" class="pa-av" onerror="this.style.display='none'">
  <div><div class="pa-name">Nikhil Sain</div><div class="pa-role">B.Tech Civil Eng · DCRUST 2026</div></div>
</div>
<div class="article-body">
<h2>First Section</h2>
<p>Your first paragraph. Use HTML freely here.</p>
<div class="callout">
  <div class="callout-icon"><i class="fas fa-info-circle"></i></div>
  <div class="callout-body"><strong>Key Point:</strong> Something important here.</div>
</div>
<h2>Second Section</h2>
<ul>
  <li>Point one</li>
  <li>Point two</li>
</ul>
</div>
  `,
},

   ────────── END TEMPLATE ──────────────────────────────────────────────
═══════════════════════════════════════════════════════════════════════ */

];
// Module export (leave this — allows the file to work as a module)
if (typeof module !== 'undefined') module.exports = BLOG_POSTS;
