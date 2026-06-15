import * as React from "react";
import type { Story } from "@ladle/react";


export const Section01: Story = () => {
  return (
    <main className="main" style={{ maxWidth: "100%", padding: "48px", minHeight: "100vh" }}>
      <section id="s01">
        
  <div className="sec-head"><span className="sec-num">01</span><h2>Foundations &amp; design tokens</h2><span className="meta">Layer 0</span></div>
  <p className="lead">Tokens are the named, themeable values everything else references. They are the real source of truth — every category below is ultimately a set of tokens plus rules for using them.</p>
  <ul className="checklist">
    <li><b>Color tokens</b> — primitive (raw hex) + semantic (role-based)</li>
    <li><b>Typography tokens</b> — family, size, weight, line-height, tracking</li>
    <li><b>Spacing tokens</b> — base unit + scale (4/8-pt grid)</li>
    <li><b>Radius tokens</b> — sm / md / lg / pill</li>
    <li><b>Border / stroke widths</b></li>
    <li><b>Elevation / shadow tokens</b></li>
    <li><b>Z-index layers</b> — base, dropdown, sticky, modal, toast</li>
    <li><b>Breakpoint tokens</b> — xs → 2xl</li>
    <li><b>Motion tokens</b> — duration + easing</li>
    <li><b>Opacity / alpha scale</b></li>
    <li><b>Aspect-ratio tokens</b></li>
    <li><b>Theme modes</b> — light / dark / high-contrast</li>
    <li><b>Primitive vs alias vs component tokens</b> (3-tier)</li>
    <li><b>Naming convention</b> + token JSON / W3C format</li>
  </ul>

      </section>
    </main>
  );
};


Section01.storyName = "01 Foundations & design tokens";


export const Section02: Story = () => {
  return (
    <main className="main" style={{ maxWidth: "100%", padding: "48px", minHeight: "100vh" }}>
      <section id="s02">
  <div className="sec-head"><span className="sec-num">02</span><h2>Color</h2><span className="meta">Atoms</span></div>
  <p className="lead">Documented as <b>palettes</b> (primitive ramps) and <b>roles</b> (semantic usage). Each role needs light + dark values and must pass contrast against its pairing.</p>

  <div className="sub">Brand &amp; accent</div>
  <div className="swatches">
    <div className="sw"><div className="c" style={{background: 'var(--accent-gradient)'}}></div><div className="l"><b>Primary</b>--accent</div></div>
    <div className="sw"><div className="c" style={{background: 'var(--accent-press)'}}></div><div className="l"><b>Primary press</b>--accent-press</div></div>
    <div className="sw"><div className="c" style={{background: '#E8EAFB'}}></div><div className="l"><b>Primary soft</b>--accent-soft</div></div>
    <div className="sw"><div className="c" style={{background: 'linear-gradient(120deg,#3340D6,#2563EB)'}}></div><div className="l"><b>Gradient</b>brand</div></div>
  </div>

  <div className="sub">Semantic / status</div>
  <div className="swatches">
    <div className="sw"><div className="c" style={{background: 'linear-gradient(135deg, #10b981, #047857)'}}></div><div className="l"><b>Success</b>#1F8A4C</div></div>
    <div className="sw"><div className="c" style={{background: 'linear-gradient(135deg, #f59e0b, #d97706)'}}></div><div className="l"><b>Warning</b>#B7791F</div></div>
    <div className="sw"><div className="c" style={{background: 'linear-gradient(135deg, #ef4444, #7f1d1d)'}}></div><div className="l"><b>Error</b>#C53030</div></div>
    <div className="sw"><div className="c" style={{background: '#2563EB'}}></div><div className="l"><b>Info</b>#2563EB</div></div>
  </div>

  <div className="sub">Neutrals / grayscale ramp</div>
  <div className="swatches">
    <div className="sw"><div className="c" style={{background: '#15171C'}}></div><div className="l"><b>Ink 900</b>text</div></div>
    <div className="sw"><div className="c" style={{background: '#3D424D'}}></div><div className="l"><b>Ink 700</b></div></div>
    <div className="sw"><div className="c" style={{background: '#6B7280'}}></div><div className="l"><b>Ink 500</b>muted</div></div>
    <div className="sw"><div className="c" style={{background: '#9CA3AF'}}></div><div className="l"><b>Ink 400</b></div></div>
    <div className="sw"><div className="c" style={{background: '#E2E3DE'}}></div><div className="l"><b>Line</b>border</div></div>
    <div className="sw"><div className="c" style={{background: '#F1F2EE'}}></div><div className="l"><b>Surface 2</b></div></div>
    <div className="sw"><div className="c" style={{background: '#FFFFFF', border: '1px solid #E2E3DE'}}></div><div className="l"><b>Surface</b>card</div></div>
    <div className="sw"><div className="c" style={{background: '#FAFAF8', border: '1px solid #E2E3DE'}}></div><div className="l"><b>Paper</b>page bg</div></div>
  </div>

  <ul className="checklist" style={{marginTop: 'var(--sp-5)'}}>
    <li><b>Primary / secondary / tertiary</b> palettes</li>
    <li><b>Neutral ramp</b> — typically 9–12 steps</li>
    <li><b>Semantic roles</b> — success / warning / error / info</li>
    <li><b>Surface &amp; background</b> levels (base, raised, sunken, overlay)</li>
    <li><b>Text-on-color</b> — on-light, on-dark, on-accent</li>
    <li><b>Border / divider</b> colors</li>
    <li><b>Interaction states</b> — hover, active/press, focus, disabled, selected</li>
    <li><b>Soft / tint</b> variants for each semantic</li>
    <li><b>Gradients</b> + scrim / overlay tokens</li>
    <li><b>Data-viz palette</b> — categorical + sequential + diverging</li>
    <li><b>Dark-mode</b> equivalents for every role</li>
    <li><b>Accessibility</b> — WCAG AA/AAA contrast pairs documented</li>
  </ul>
</section>
    </main>
  );
};


Section02.storyName = "02 Color";


export const Section03: Story = () => {
  return (
    <main className="main" style={{ maxWidth: "100%", padding: "48px", minHeight: "100vh" }}>
      <section id="s03">
        
  <div className="sec-head"><span className="sec-num">03</span><h2>Typography</h2><span className="meta">Atoms</span></div>
  <p className="lead">Families, a type scale, and the modifiers (weight, style, spacing) that compose every text role.</p>

  <div className="sub">Type scale — H1 → caption</div>
  <div className="type-row"><span className="spec">H1 · 44/1.0 · 700</span><span className="t-h1">Heading one</span></div>
  <div className="type-row"><span className="spec">H2 · 34 · 600</span><span className="t-h2">Heading two</span></div>
  <div className="type-row"><span className="spec">H3 · 26 · 600</span><span className="t-h3">Heading three</span></div>
  <div className="type-row"><span className="spec">H4 · 20 · 500</span><span className="t-h4">Heading four</span></div>
  <div className="type-row"><span className="spec">H5 · 17 · 600</span><span className="t-h5">Heading five</span></div>
  <div className="type-row"><span className="spec">H6 · 14 · 600 caps</span><span className="t-h6">Heading six</span></div>
  <div className="type-row"><span className="spec">Body · 15/1.55</span><span className="t-body">Body copy — the default reading size for paragraphs.</span></div>
  <div className="type-row"><span className="spec">Small</span><span className="t-small">Small / secondary text</span></div>
  <div className="type-row"><span className="spec">Caption</span><span className="t-cap">Caption — metadata, timestamps</span></div>
  <div className="type-row"><span className="spec">Overline</span><span className="t-over">Overline eyebrow</span></div>

  <div className="sub">Font weights</div>
  <div className="weights">
    <span className="w3">Light 300</span><span className="w4">Regular 400</span><span className="w5">Medium 500</span><span className="w6">SemiBold 600</span><span className="w7">Bold 700</span>
  </div>

  <div className="sub">Families &amp; styled text</div>
  <div className="grid g3">
    <div className="cell"><span className="tag">Display</span><span style={{fontFamily: 'var(--font-display)', fontSize: '22px'}}>Space Grotesk</span></div>
    <div className="cell"><span className="tag">Body</span><span style={{fontFamily: 'var(--font-body)', fontSize: '20px'}}>IBM Plex Sans</span></div>
    <div className="cell"><span className="tag">Mono</span><span style={{fontFamily: 'var(--font-mono)', fontSize: '18px'}}>IBM Plex Mono</span></div>
    <div className="cell"><span className="tag">Italic</span><span style={{fontStyle: 'italic'}}>Emphasis in italic</span></div>
    <div className="cell"><span className="tag">Underline / link</span><a href="#s03">An inline hyperlink</a></div>
    <div className="cell"><span className="tag">Strikethrough</span><span style={{textDecoration: 'line-through', color: 'var(--ink-3)'}}>Deprecated value</span></div>
    <div className="cell"><span className="tag">Uppercase track</span><span style={{textTransform: 'uppercase', letterSpacing: '.1em', fontSize: '13px'}}>section label</span></div>
    <div className="cell"><span className="tag">Inline code</span><code>const x = 42</code></div>
    <div className="cell"><span className="tag">Blockquote</span><span style={{borderLeft: '3px solid var(--accent)', paddingLeft: '10px', fontStyle: 'italic', color: 'var(--ink-2)'}}>Pulled quote</span></div>
  </div>

  <ul className="checklist" style={{marginTop: 'var(--sp-5)'}}>
    <li><b>Font families</b> — display, body, mono (+ optional serif)</li>
    <li><b>Type scale</b> — H1–H6, body, small, caption, overline, display/hero</li>
    <li><b>Weights</b> — thin → black, with allowed pairings</li>
    <li><b>Styles</b> — normal, italic, oblique</li>
    <li><b>Line-height</b> / leading tokens per role</li>
    <li><b>Letter-spacing / tracking</b></li>
    <li><b>Text transform</b> — uppercase, capitalize, lowercase</li>
    <li><b>Text align</b> — left, center, right, justify</li>
    <li><b>Text decoration</b> — underline, strikethrough, highlight</li>
    <li><b>Text colors</b> — primary, muted, disabled, inverse, link, danger</li>
    <li><b>Links</b> — default / hover / visited / active / focus</li>
    <li><b>Lists</b> — ordered, unordered, definition, nested</li>
    <li><b>Blockquote &amp; pull-quote</b></li>
    <li><b>Inline &amp; block code</b></li>
    <li><b>Truncation</b> — ellipsis, line-clamp</li>
    <li><b>Responsive / fluid type</b> (clamp)</li>
    <li><b>Numerals</b> — tabular vs proportional, fractions</li>
    <li><b>Measure</b> — max line length (≈45–75ch)</li>
  </ul>

      </section>
    </main>
  );
};


Section03.storyName = "03 Typography";


export const Section04: Story = () => {
  return (
    <main className="main" style={{ maxWidth: "100%", padding: "48px", minHeight: "100vh" }}>
      <section id="s04">
        
  <div className="sec-head"><span className="sec-num">04</span><h2>Spacing &amp; layout</h2><span className="meta">Foundations</span></div>
  <p className="lead">A consistent spacing scale and grid keep rhythm predictable across every component.</p>
  <div className="sub">Spacing scale (4 px base)</div>
  <div className="scale-row"><span style={{width: '60px'}}>4 · xs</span><span className="bar" style={{width: '4px'}}></span></div>
  <div className="scale-row"><span style={{width: '60px'}}>8 · sm</span><span className="bar" style={{width: '8px'}}></span></div>
  <div className="scale-row"><span style={{width: '60px'}}>16 · md</span><span className="bar" style={{width: '16px'}}></span></div>
  <div className="scale-row"><span style={{width: '60px'}}>24 · lg</span><span className="bar" style={{width: '24px'}}></span></div>
  <div className="scale-row"><span style={{width: '60px'}}>32 · xl</span><span className="bar" style={{width: '32px'}}></span></div>
  <div className="scale-row"><span style={{width: '60px'}}>48 · 2xl</span><span className="bar" style={{width: '48px'}}></span></div>
  <div className="scale-row"><span style={{width: '60px'}}>64 · 3xl</span><span className="bar" style={{width: '64px'}}></span></div>
  <ul className="checklist" style={{marginTop: 'var(--sp-5)'}}>
    <li><b>Spacing scale</b> — margins, padding, gaps</li>
    <li><b>Grid system</b> — columns, gutters, margins (e.g. 12-col)</li>
    <li><b>Breakpoints</b> — xs, sm, md, lg, xl, 2xl</li>
    <li><b>Containers</b> — max-widths per breakpoint</li>
    <li><b>Layout primitives</b> — stack, cluster, grid, sidebar, switcher</li>
    <li><b>Aspect ratios</b> — 1:1, 4:3, 16:9, 21:9</li>
    <li><b>Z-index layers</b> — documented stacking order</li>
    <li><b>Dividers / rules</b> — weights and insets</li>
    <li><b>Density modes</b> — comfortable / compact</li>
    <li><b>Safe areas &amp; insets</b> (mobile)</li>
  </ul>

      </section>
    </main>
  );
};


Section04.storyName = "04 Spacing & layout";


export const Section05: Story = () => {
  return (
    <main className="main" style={{ maxWidth: "100%", padding: "48px", minHeight: "100vh" }}>
      <section id="s05">
        
  <div className="sec-head"><span className="sec-num">05</span><h2>Elevation &amp; radius</h2><span className="meta">Foundations</span></div>
  <div className="sub">Shadow / elevation</div>
  <div className="elev">
    <div style={{boxShadow: 'var(--shadow-1)'}}>level 1</div>
    <div style={{boxShadow: 'var(--shadow-2)'}}>level 2</div>
    <div style={{boxShadow: 'var(--shadow-3)'}}>level 3</div>
  </div>
  <div className="sub">Corner radius</div>
  <div className="radii">
    <div style={{borderRadius: 'var(--r-sm)'}}>4</div>
    <div style={{borderRadius: 'var(--r-md)'}}>8</div>
    <div style={{borderRadius: 'var(--r-lg)'}}>14</div>
    <div style={{borderRadius: 'var(--r-pill)'}}>pill</div>
  </div>
  <ul className="checklist" style={{marginTop: 'var(--sp-5)'}}>
    <li><b>Shadow scale</b> — rest, raised, overlay, sticky</li>
    <li><b>Radius scale</b> — none → pill → circle</li>
    <li><b>Border widths</b> — hairline, default, emphasis</li>
    <li><b>Focus ring</b> spec (offset + width + color)</li>
    <li><b>Blur / backdrop</b> tokens (frosted surfaces)</li>
  </ul>

      </section>
    </main>
  );
};


Section05.storyName = "05 Elevation & radius";


export const Section06: Story = () => {
  return (
    <main className="main" style={{ maxWidth: "100%", padding: "48px", minHeight: "100vh" }}>
      <section id="s06">
        
  <div className="sec-head"><span className="sec-num">06</span><h2>Iconography</h2><span className="meta">Atoms</span></div>
  <p className="lead">One icon system: consistent grid, stroke, and sizes. Documented with usage and don'ts.</p>
  <div className="row" style={{gap: 'var(--sp-5)'}}>
    <svg viewBox="0 0 24 24" className="svg" style={{width: '16px', height: '16px'}}><path d="M5 12h14M12 5v14"/></svg>
    <svg viewBox="0 0 24 24" className="svg" style={{width: '20px', height: '20px'}}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg>
    <svg viewBox="0 0 24 24" className="svg" style={{width: '24px', height: '24px'}}><path d="M20 6L9 17l-5-5"/></svg>
    <svg viewBox="0 0 24 24" className="svg" style={{width: '28px', height: '28px'}}><path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0M12 8v4l3 2"/></svg>
    <svg viewBox="0 0 24 24" className="svg" style={{width: '32px', height: '32px', stroke: 'var(--accent)'}}><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z"/></svg>
  </div>
  <ul className="checklist" style={{marginTop: 'var(--sp-5)'}}>
    <li><b>Icon grid</b> &amp; keyline shapes</li>
    <li><b>Size set</b> — 16 / 20 / 24 / 32</li>
    <li><b>Stroke vs filled</b> styles</li>
    <li><b>States &amp; color</b> inheritance (currentColor)</li>
    <li><b>Decorative vs meaningful</b> (aria-hidden vs label)</li>
    <li><b>Logo &amp; favicon</b> assets, spinners, illustration set</li>
    <li><b>Flag / payment / brand</b> icon subsets</li>
  </ul>

      </section>
    </main>
  );
};


Section06.storyName = "06 Iconography";


export const Section07: Story = () => {
  return (
    <main className="main" style={{ maxWidth: "100%", padding: "48px", minHeight: "100vh" }}>
      <section id="s07">
        
  <div className="sec-head"><span className="sec-num">07</span><h2>Buttons</h2><span className="meta">Atoms</span></div>
  <p className="lead">The most variant-heavy atom: variant × size × state × content layout.</p>

  <div className="sub">Variants</div>
  <div className="row">
    <button className="btn btn-primary">Primary</button>
    <button className="btn btn-secondary">Secondary</button>
    <button className="btn btn-outline">Outline</button>
    <button className="btn btn-ghost">Ghost</button>
    <button className="btn btn-link">Link</button>
    <button className="btn btn-danger">Destructive</button>
    <button className="btn btn-disabled" disabled>Disabled</button>
  </div>

  <div className="sub">Content layout</div>
  <div className="row">
    <button className="btn btn-primary"><svg viewBox="0 0 24 24" className="svg"><path d="M5 12h14M12 5v14"/></svg>Leading icon</button>
    <button className="btn btn-secondary">Trailing icon<svg viewBox="0 0 24 24" className="svg"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
    <button className="btn btn-secondary btn-icon" aria-label="Search"><svg viewBox="0 0 24 24" className="svg"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg></button>
    <button className="btn btn-primary"><span className="spinner" style={{width: '14px', height: '14px', borderWidth: '2px', borderTopColor: '#fff', borderColor: 'rgba(255,255,255,.4)'}}></span>Loading</button>
    <button className="btn btn-primary fab"><svg viewBox="0 0 24 24" className="svg" style={{width: '20px', height: '20px'}}><path d="M5 12h14M12 5v14"/></svg></button>
  </div>

  <div className="sub">Sizes &amp; groups</div>
  <div className="row">
    <button className="btn btn-primary btn-xs">XS</button>
    <button className="btn btn-primary">Default</button>
    <button className="btn btn-primary btn-lg">Large</button>
    <span className="btn-group">
      <button className="btn btn-secondary">Day</button>
      <button className="btn btn-secondary">Week</button>
      <button className="btn btn-secondary">Month</button>
    </span>
  </div>

  <ul className="checklist" style={{marginTop: 'var(--sp-5)'}}>
    <li><b>Variants</b> — primary, secondary, tertiary, outline, ghost, link, destructive</li>
    <li><b>Content</b> — text, icon+text (lead/trail), icon-only</li>
    <li><b>Sizes</b> — xs, sm, md, lg, xl, full-width</li>
    <li><b>States</b> — default, hover, active, focus, disabled, loading, selected</li>
    <li><b>Special</b> — FAB, split button, toggle/segmented, dropdown button, social/auth buttons</li>
    <li><b>Button group / toolbar</b></li>
  </ul>

      </section>
    </main>
  );
};


Section07.storyName = "07 Buttons";


export const Section08: Story = () => {
  return (
    <main className="main" style={{ maxWidth: "100%", padding: "48px", minHeight: "100vh" }}>
      <section id="s08">
        
  <div className="sec-head"><span className="sec-num">08</span><h2>Form controls</h2><span className="meta">Atoms</span></div>
  <div className="grid g2">
    <div>
      <div className="field"><label>Text input</label><input className="input" placeholder="Placeholder" /><span className="help">Helper text goes here</span></div>
      <div className="field"><label>Focused</label><input className="input" value="Typing…" style={{borderColor: 'var(--accent)', boxShadow: '0 0 0 3px var(--accent-soft)'}} /></div>
      <div className="field"><label>Error</label><input className="input err" value="Invalid" /><span className="help" style={{color: 'var(--error)'}}>Enter a valid value</span></div>
      <div className="field"><label>Success</label><input className="input ok" value="Looks good" /></div>
      <div className="field"><label>Disabled</label><input className="input" value="Read only" disabled /></div>
      <div className="field"><label>Input group</label><div className="input-grp"><span className="pre">https://</span><input className="input" placeholder="domain.com" /></div></div>
    </div>
    <div>
      <div className="field"><label>Textarea</label><textarea className="input" rows="3" placeholder="Multi-line…"></textarea></div>
      <div className="field"><label>Select</label><select className="input"><option>Choose an option…</option><option>Alpha</option></select></div>
      <div className="cell"><span className="tag">Selection</span>
        <div className="row" style={{gap: 'var(--sp-4)'}}>
          <span className="row" style={{gap: '8px'}}><input type="checkbox" className="check-input" checked /> Checked</span>
          <span className="row" style={{gap: '8px'}}><input type="checkbox" className="check-input" /> Unchecked</span>
        </div>
        <div className="row" style={{gap: 'var(--sp-4)', marginTop: '10px'}}>
          <span className="row" style={{gap: '8px'}}><input type="radio" className="radio-input" checked /> Selected</span>
          <span className="row" style={{gap: '8px'}}><input type="radio" className="radio-input" /> Option</span>
        </div>
        <div className="row" style={{gap: 'var(--sp-4)', marginTop: '10px'}}>
          <span className="row" style={{gap: '8px'}}><input type="checkbox" className="switch-input" checked /> On</span>
          <span className="row" style={{gap: '8px'}}><input type="checkbox" className="switch-input" /> Off</span>
        </div>
      </div>
      <div className="field" style={{marginTop: 'var(--sp-4)'}}><label>Slider / range</label><input type="range" className="slider-input" min="0" max="100" value="58" /></div>
    </div>
  </div>
  <ul className="checklist" style={{marginTop: 'var(--sp-5)'}}>
    <li><b>Inputs</b> — text, email, password, number/stepper, search, url, tel</li>
    <li><b>Textarea</b> — fixed &amp; auto-grow</li>
    <li><b>Select</b> — single, multi, combobox/autocomplete, tag-input</li>
    <li><b>Choice</b> — checkbox, radio, switch/toggle, segmented</li>
    <li><b>Range</b> — slider, dual-range, rating/stars</li>
    <li><b>Pickers</b> — date, time, datetime, color, file/dropzone</li>
    <li><b>Anatomy</b> — label, helper, error, char-count, prefix/suffix/icon, required mark</li>
    <li><b>States</b> — default, focus, filled, error, success, disabled, read-only, loading</li>
    <li><b>Field group / fieldset / form layout</b></li>
    <li><b>Inline vs summary validation</b></li>
  </ul>

      </section>
    </main>
  );
};


Section08.storyName = "08 Form controls";


export const Section09: Story = () => {
  return (
    <main className="main" style={{ maxWidth: "100%", padding: "48px", minHeight: "100vh" }}>
      <section id="s09">
        
  <div className="sec-head"><span className="sec-num">09</span><h2>Indicators &amp; status</h2><span className="meta">Atoms</span></div>
  <div className="grid g3">
    <div className="cell"><span className="tag">Badges</span><div className="row"><span className="badge badge-solid">NEW</span><span className="badge badge-soft">BETA</span><span className="badge" style={{background: 'var(--success-soft)', color: 'var(--success)'}}>Active</span></div></div>
    <div className="cell"><span className="tag">Chips / tags</span><div className="row"><span className="chip">Design <span className="x">×</span></span><span className="chip">ERP</span></div></div>
    <div className="cell"><span className="tag">Status dots</span><div className="row"><span className="dot" style={{background: 'var(--success)'}}></span><span className="dot" style={{background: 'var(--warning)'}}></span><span className="dot" style={{background: 'var(--error)'}}></span><span className="dot" style={{background: 'var(--ink-4)'}}></span></div></div>
    <div className="cell"><span className="tag">Avatars</span><div className="row"><span className="avatar">EL</span><span className="avatar sq" style={{background: 'var(--info)'}}>AK</span><div className="avatar-grp"><span className="avatar">A</span><span className="avatar" style={{background: 'var(--success)'}}>B</span><span className="avatar" style={{background: 'var(--warning)'}}>+3</span></div></div></div>
    <div className="cell"><span className="tag">Loaders</span><div className="row"><span className="spinner"></span><div className="progress" style={{width: '120px'}}><i></i></div></div></div>
    <div className="cell"><span className="tag">Skeleton</span><div className="skeleton" style={{width: '80%'}}></div><div className="skeleton" style={{width: '60%', marginTop: '8px'}}></div></div>
    <div className="cell"><span className="tag">Tooltip</span><span className="tooltip"><span className="tip">Helpful hint</span></span></div>
    <div className="cell"><span className="tag">Progress ring</span><svg width="44" height="44" viewBox="0 0 44 44"><circle cx="22" cy="22" r="18" fill="none" stroke="var(--surface-2)" strokeWidth="4"/><circle cx="22" cy="22" r="18" fill="none" stroke="var(--accent)" strokeWidth="4" strokeDasharray="113" strokeDashoffset="34" strokeLinecap="round" transform="rotate(-90 22 22)"/></svg></div>
    <div className="cell"><span className="tag">Divider</span><hr style={{border: 'none', borderTop: '1px solid var(--line)', margin: '14px 0'}} /></div>
  </div>
  <ul className="checklist" style={{marginTop: 'var(--sp-5)'}}>
    <li><b>Badge / pill / counter / notification dot</b></li>
    <li><b>Tag / chip</b> — static, removable, selectable</li>
    <li><b>Label</b> — status labels, ribbons</li>
    <li><b>Avatar</b> — image, initials, icon, group, status ring, sizes</li>
    <li><b>Tooltip &amp; popover trigger</b></li>
    <li><b>Loaders</b> — spinner, bar, ring, dots, skeleton, shimmer</li>
    <li><b>Progress</b> — linear, circular, stepped, indeterminate</li>
    <li><b>Divider / separator / spacer</b></li>
    <li><b>Keyboard key (kbd) &amp; code chip</b></li>
  </ul>

      </section>
    </main>
  );
};


Section09.storyName = "09 Indicators & status";


export const Section10: Story = () => {
  return (
    <main className="main" style={{ maxWidth: "100%", padding: "48px", minHeight: "100vh" }}>
      <section id="s10">
        
  <div className="sec-head"><span className="sec-num">10</span><h2>Components (molecules)</h2><span className="meta">Composites</span></div>
  <div className="grid g2">
    <div className="card"><div className="cap"></div><div className="body"><h4>Card</h4><p>Media · title · body · action — the workhorse container.</p><button className="btn btn-outline btn-xs" style={{marginTop: '10px'}}>Action</button></div></div>
    <div>
      <div className="alert alert-success"><svg viewBox="0 0 24 24" className="svg" style={{stroke: 'var(--success)'}}><path d="M20 6L9 17l-5-5"/></svg><div><b>Success</b>Changes saved.</div></div>
      <div className="alert alert-warning" style={{marginTop: '10px'}}><svg viewBox="0 0 24 24" className="svg" style={{stroke: 'var(--warning)'}}><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg><div><b>Warning</b>Check your input.</div></div>
      <div className="alert alert-error" style={{marginTop: '10px'}}><svg viewBox="0 0 24 24" className="svg" style={{stroke: 'var(--error)'}}><circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/></svg><div><b>Error</b>Something failed.</div></div>
      <div className="toast" style={{marginTop: '10px'}}><span className="spinner" style={{width: '14px', height: '14px', borderTopColor: '#fff', borderColor: 'rgba(255,255,255,.3)'}}></span>Uploading…</div>
    </div>
  </div>

  <div className="sub">Tabs · breadcrumbs · pagination · accordion</div>
  <div className="grid g2">
    <style dangerouslySetInnerHTML={{ __html: "\n.tabs-interactive { display: flex; flex-direction: column; }\n.tabs-header { display: flex; border-bottom: 1px solid var(--line); margin-bottom: 12px; }\n.tab-label { padding: 6px 12px; font-size: 13.5px; cursor: pointer; border-bottom: 2px solid transparent; color: var(--ink-2); margin-bottom: -1px; }\n.tab-radio { display: none; }\n#tab1:checked ~ .tabs-header .lbl-1,\n#tab2:checked ~ .tabs-header .lbl-2,\n#tab3:checked ~ .tabs-header .lbl-3 { color: var(--accent); border-bottom-color: var(--accent); font-weight: 500; }\n.tab-content { display: none; font-size: 13px; color: var(--ink-2); padding: 4px; }\n#tab1:checked ~ .content-1,\n#tab2:checked ~ .content-2,\n#tab3:checked ~ .content-3 { display: block; }\n" }} />
<div className="cell"><span className="tag">Tabs</span>
  <div className="tabs-interactive">
    <input type="radio" name="mytabs" id="tab1" className="tab-radio" checked />
    <input type="radio" name="mytabs" id="tab2" className="tab-radio" />
    <input type="radio" name="mytabs" id="tab3" className="tab-radio" />
    
    <div className="tabs-header">
      <label htmlFor="tab1" className="tab-label lbl-1">Overview</label>
      <label htmlFor="tab2" className="tab-label lbl-2">Activity</label>
      <label htmlFor="tab3" className="tab-label lbl-3">Settings</label>
    </div>
    
    <div className="tab-content content-1">Here is the overview content.</div>
    <div className="tab-content content-2">Here is the activity log.</div>
    <div className="tab-content content-3">Here are your settings.</div>
  </div>
</div>
    <div className="cell"><span className="tag">Breadcrumbs</span><div className="crumbs"><a>Home</a><span className="sep">/</span><a>Library</a><span className="sep">/</span><span className="cur">Tokens</span></div></div>
    <div className="cell"><span className="tag">Pagination</span><div className="pager"><span>‹</span><span className="on">1</span><span>2</span><span>3</span><span>›</span></div></div>
    <style dangerouslySetInnerHTML={{ __html: "\n.accordion details { border-bottom: 1px solid var(--line); }\n.accordion details:last-child { border-bottom: none; }\n.accordion summary { padding: 12px 14px; font-size: 13.5px; display: flex; justify-content: space-between; cursor: pointer; list-style: none; font-weight: 600; color: var(--ink); }\n.accordion summary::-webkit-details-marker { display: none; }\n.accordion summary::after { content: '+'; }\n.accordion details[open] summary::after { content: '-'; }\n.accordion .ac-content { padding: 0 14px 12px; font-size: 13px; color: var(--ink-2); }\n" }} />
<div className="cell"><span className="tag">Accordion</span>
  <div className="accordion" style={{border: '1px solid var(--line)', borderRadius: 'var(--r-md)', overflow: 'hidden'}}>
    <details>
      <summary>What is a token?</summary>
      <div className="ac-content">A token is a single design decision (like a color or spacing value) stored as a reusable variable.</div>
    </details>
    <details>
      <summary>Light vs dark</summary>
      <div className="ac-content">Our design system fully supports both modes. Toggle the theme at the top of the page.</div>
    </details>
  </div>
</div>
  </div>

  <ul className="checklist" style={{marginTop: 'var(--sp-5)'}}>
    <li><b>Card</b> — media, profile, stat/KPI, pricing, product</li>
    <li><b>Alert / banner / inline message / callout</b></li>
    <li><b>Toast / snackbar</b></li>
    <li><b>Modal / dialog / confirm / drawer / bottom-sheet</b></li>
    <li><b>Popover / dropdown menu / context menu / tooltip</b></li>
    <li><b>Tabs / segmented control</b></li>
    <li><b>Accordion / collapse / disclosure</b></li>
    <li><b>Breadcrumbs / pagination / stepper / wizard</b></li>
    <li><b>List</b> — simple, with actions, selectable, virtualized</li>
    <li><b>Table</b> — sortable, selectable, expandable, sticky, paginated</li>
    <li><b>Empty state / placeholder</b></li>
    <li><b>Media object / comment / activity item</b></li>
    <li><b>Carousel / slider / gallery</b></li>
    <li><b>Command palette / search box</b></li>
  </ul>

      </section>
    </main>
  );
};


Section10.storyName = "10 Components (molecules)";


export const Section11: Story = () => {
  return (
    <main className="main" style={{ maxWidth: "100%", padding: "48px", minHeight: "100vh" }}>
      <section id="s11">
        
  <div className="sec-head"><span className="sec-num">11</span><h2>Patterns &amp; organisms</h2><span className="meta">Composites</span></div>
  <p className="lead">Full assembled regions — where molecules combine into recognizable page parts.</p>
  
  <div className="sub">App Bar / Top Nav</div>
  <div className="cell" style={{padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: 'var(--r-md)', marginBottom: 'var(--sp-4)'}}>
    <div style={{fontWeight: '700', fontFamily: 'var(--font-display)', fontSize: '18px', background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Myrilo AI</div>
    <div style={{display: 'flex', gap: 'var(--sp-4)', alignItems: 'center'}}>
      <a href="#" style={{color: 'var(--ink-2)', fontSize: '14px'}}>Dashboard</a>
      <a href="#" style={{color: 'var(--ink-2)', fontSize: '14px'}}>Projects</a>
      <a href="#" style={{color: 'var(--ink-2)', fontSize: '14px'}}>Settings</a>
    </div>
    <div className="avatar" style={{width: '32px', height: '32px', fontSize: '12px'}}>ED</div>
  </div>

  <div className="sub">Authentication Card</div>
  <div className="card" style={{maxWidth: '380px', margin: '0 auto', boxShadow: 'var(--shadow-3)'}}>
    <div className="body" style={{padding: 'var(--sp-6)'}}>
      <h3 style={{margin: '0 0 8px', fontFamily: 'var(--font-display)', fontSize: '24px'}} className="t-h3">Welcome back</h3>
      <p style={{margin: '0 0 24px', fontSize: '14px', color: 'var(--ink-3)'}}>Enter your details to access your account.</p>
      
      <div className="field">
        <label>Email address</label>
        <input className="input" type="email" placeholder="name@company.com" />
      </div>
      <div className="field" style={{marginBottom: '24px'}}>
        <label>Password</label>
        <input className="input" type="password" placeholder="••••••••" />
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
        <label style={{display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer'}}>
          <input type="checkbox" className="check-input" /> Remember me
        </label>
        <a href="#" style={{fontSize: '13px'}}>Forgot password?</a>
      </div>
      <button className="btn btn-primary" style={{width: '100%'}}>Sign In</button>
    </div>
  </div>

      </section>
    </main>
  );
};


Section11.storyName = "11 Patterns & organisms";


export const Section12: Story = () => {
  return (
    <main className="main" style={{ maxWidth: "100%", padding: "48px", minHeight: "100vh" }}>
      <section id="s12">
        
  <div className="sec-head"><span className="sec-num">12</span><h2>Data display</h2><span className="meta">Composites</span></div>
  <p className="lead">Tables, lists, and charts for rendering complex data.</p>
  
  <div className="sub">Data Table (Full)</div>
  <div className="cell" style={{padding: '0', overflow: 'hidden'}}>
    <div style={{padding: '16px 20px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <b style={{fontFamily: 'var(--font-display)'}}>Recent Generations</b>
      <button className="btn btn-outline btn-xs">Export</button>
    </div>
    <table className="tbl" style={{margin: '0'}}>
      <thead>
        <tr>
          <th style={{padding: '12px 20px'}}>Project Name</th>
          <th style={{padding: '12px 20px'}}>Model</th>
          <th style={{padding: '12px 20px'}}>Status</th>
          <th style={{padding: '12px 20px'}}>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{padding: '14px 20px', fontWeight: '500'}}>Marketing Copy</td>
          <td style={{padding: '14px 20px', color: 'var(--ink-3)'}}>GPT-4o</td>
          <td style={{padding: '14px 20px'}}><span className="badge badge-solid">Completed</span></td>
          <td style={{padding: '14px 20px', fontFamily: 'var(--font-mono)', fontSize: '12px'}}>2h ago</td>
        </tr>
        <tr style={{background: 'var(--surface-2)'}}>
          <td style={{padding: '14px 20px', fontWeight: '500'}}>SEO Analysis</td>
          <td style={{padding: '14px 20px', color: 'var(--ink-3)'}}>Claude 3.5 Sonnet</td>
          <td style={{padding: '14px 20px'}}><span className="badge badge-soft" style={{borderColor: 'var(--warning)', color: 'var(--warning)'}}>Processing</span></td>
          <td style={{padding: '14px 20px', fontFamily: 'var(--font-mono)', fontSize: '12px'}}>5m ago</td>
        </tr>
        <tr>
          <td style={{padding: '14px 20px', fontWeight: '500'}}>Image Assets</td>
          <td style={{padding: '14px 20px', color: 'var(--ink-3)'}}>Midjourney v6</td>
          <td style={{padding: '14px 20px'}}><span className="badge badge-soft" style={{borderColor: 'var(--error)', color: 'var(--error)'}}>Failed</span></td>
          <td style={{padding: '14px 20px', fontFamily: 'var(--font-mono)', fontSize: '12px'}}>Yesterday</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div className="sub" style={{marginTop: '32px'}}>Mini chart sampler</div>
  <div className="grid g3">
    <div className="cell"><span className="tag">Bars</span><svg viewBox="0 0 120 60" width="100%"><rect x="6" y="20" width="16" height="40" fill="var(--accent)"/><rect x="28" y="10" width="16" height="50" fill="var(--accent)"/><rect x="50" y="30" width="16" height="30" fill="var(--accent)"/><rect x="72" y="15" width="16" height="45" fill="var(--accent)"/><rect x="94" y="25" width="16" height="35" fill="var(--accent)"/></svg></div>
    <div className="cell"><span className="tag">Line</span><svg viewBox="0 0 120 60" width="100%"><polyline points="4,50 30,30 54,38 80,14 116,22" fill="none" stroke="var(--accent)" strokeWidth="2.5"/></svg></div>
    <div className="cell"><span className="tag">Donut</span><svg viewBox="0 0 60 60" width="64"><circle cx="30" cy="30" r="22" fill="none" stroke="var(--surface-2)" strokeWidth="9"/><circle cx="30" cy="30" r="22" fill="none" stroke="var(--accent)" strokeWidth="9" strokeDasharray="138" strokeDashoffset="48" transform="rotate(-90 30 30)"/></svg></div>
  </div>

      </section>
    </main>
  );
};


Section12.storyName = "12 Data display";


export const Section13: Story = () => {
  return (
    <main className="main" style={{ maxWidth: "100%", padding: "48px", minHeight: "100vh" }}>
      <section id="s13">
        
  <div className="sec-head"><span className="sec-num">13</span><h2>Feedback &amp; states</h2><span className="meta">Cross-cutting</span></div>
  <p className="lead">Empty states, loading skeletons, and interactive feedback.</p>

  <div className="grid g2">
    <div>
      <div className="sub" style={{marginTop: '0'}}>Empty State</div>
      <div className="cell" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', textAlign: 'center'}}>
        <div style={{width: '64px', height: '64px', borderRadius: '50%', background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', boxShadow: 'inset 0 0 20px rgba(167, 139, 250, 0.2)'}}>
          <svg viewBox="0 0 24 24" className="svg" style={{width: '32px', height: '32px', stroke: 'var(--ink-3)'}}><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        </div>
        <h4 style={{margin: '0 0 8px', fontFamily: 'var(--font-display)', fontSize: '18px'}}>No projects found</h4>
        <p style={{margin: '0 0 20px', fontSize: '14px', color: 'var(--ink-3)', maxWidth: '250px'}}>You haven't created any AI projects yet. Start by creating your first workspace.</p>
        <button className="btn btn-primary"><svg viewBox="0 0 24 24" className="svg" style={{width: '16px', height: '16px'}}><path d="M12 5v14m-7-7h14"/></svg> New Project</button>
      </div>
    </div>
    
    <div>
      <div className="sub" style={{marginTop: '0'}}>Loading Skeleton</div>
      <div className="card" style={{boxShadow: 'none'}}>
        <div className="body">
          <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px'}}>
            <div className="skeleton" style={{width: '48px', height: '48px', borderRadius: '50%'}}></div>
            <div style={{flex: '1'}}>
              <div className="skeleton" style={{width: '60%', height: '16px', marginBottom: '8px'}}></div>
              <div className="skeleton" style={{width: '40%', height: '12px'}}></div>
            </div>
          </div>
          <div className="skeleton" style={{width: '100%', height: '12px', marginBottom: '8px'}}></div>
          <div className="skeleton" style={{width: '100%', height: '12px', marginBottom: '8px'}}></div>
          <div className="skeleton" style={{width: '80%', height: '12px'}}></div>
        </div>
      </div>
    </div>
  </div>

      </section>
    </main>
  );
};


Section13.storyName = "13 Feedback & states";


export const Section14: Story = () => {
  return (
    <main className="main" style={{ maxWidth: "100%", padding: "48px", minHeight: "100vh" }}>
      <section id="s14">
        
  <div className="sec-head"><span className="sec-num">14</span><h2>Navigation</h2><span className="meta">Patterns</span></div>
  <p className="lead">Sidebars, menus, and breadcrumb structures.</p>

  <div className="grid g2">
    <div>
      <div className="sub" style={{marginTop: '0'}}>Sidebar Nav</div>
      <div className="cell" style={{padding: 'var(--sp-4)', width: '250px'}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
          <a href="#" style={{display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px', borderRadius: 'var(--r-md)', background: 'var(--accent-soft)', color: 'var(--accent)', fontWeight: '600'}}>
            <svg viewBox="0 0 24 24" className="svg" style={{width: '18px', height: '18px'}}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg> Dashboard
          </a>
          <a href="#" style={{display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px', borderRadius: 'var(--r-md)', color: 'var(--ink-2)', transition: 'background 0.2s'}}>
            <svg viewBox="0 0 24 24" className="svg" style={{width: '18px', height: '18px'}}><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg> Editor
          </a>
          <a href="#" style={{display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px', borderRadius: 'var(--r-md)', color: 'var(--ink-2)', transition: 'background 0.2s'}}>
            <svg viewBox="0 0 24 24" className="svg" style={{width: '18px', height: '18px'}}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.26.6.89 1 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> Settings
          </a>
        </div>
      </div>
    </div>
    
    <div>
      <div className="sub" style={{marginTop: '0'}}>Breadcrumbs</div>
      <div className="cell" style={{marginBottom: 'var(--sp-4)'}}>
        <div className="crumbs">
          <a href="#" style={{display: 'flex', alignItems: 'center'}}><svg viewBox="0 0 24 24" className="svg" style={{width: '14px', height: '14px', marginRight: '4px'}}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg></a>
          <span className="sep">/</span>
          <a href="#">Projects</a>
          <span className="sep">/</span>
          <span className="cur">Website Redesign</span>
        </div>
      </div>

      <div className="sub">Pagination</div>
      <div className="cell">
        <div className="pager">
          <span><svg viewBox="0 0 24 24" className="svg" style={{width: '16px', height: '16px'}}><path d="M15 18l-6-6 6-6"/></svg></span>
          <span className="on">1</span>
          <span>2</span>
          <span>3</span>
          <span>...</span>
          <span>12</span>
          <span><svg viewBox="0 0 24 24" className="svg" style={{width: '16px', height: '16px'}}><path d="M9 18l6-6-6-6"/></svg></span>
        </div>
      </div>
    </div>
  </div>

      </section>
    </main>
  );
};


Section14.storyName = "14 Navigation";


export const Section15: Story = () => {
  return (
    <main className="main" style={{ maxWidth: "100%", padding: "48px", minHeight: "100vh" }}>
      <section id="s15">
        
  <div className="sec-head"><span className="sec-num">15</span><h2>Motion &amp; interaction</h2><span className="meta">Foundations</span></div>
  <p className="lead">Hover effects demonstrating scale, glow, and elevation shifts. Hover over the cards below.</p>
  
  <style dangerouslySetInnerHTML={{ __html: "\n    .hover-card { transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); cursor: pointer; }\n    .hover-card-1:hover { transform: translateY(-8px) scale(1.02); box-shadow: 0 25px 50px rgba(0,0,0,0.25); border-color: var(--accent); }\n    .hover-card-2:hover { background: var(--accent-soft); box-shadow: 0 0 30px rgba(167, 139, 250, 0.4); border-color: #a78bfa; }\n  " }} />
  
  <div className="grid g2">
    <div className="cell hover-card hover-card-1" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px'}}>
      <svg viewBox="0 0 24 24" className="svg" style={{width: '32px', height: '32px', stroke: 'var(--accent)', marginBottom: '16px'}}><path d="M12 19V5M5 12l7-7 7 7"/></svg>
      <b style={{fontFamily: 'var(--font-display)'}}>Lift &amp; Scale</b>
      <p style={{fontSize: '13px', color: 'var(--ink-3)', textAlign: 'center', marginTop: '8px'}}>Cards elevate and slightly scale up on hover.</p>
    </div>
    <div className="cell hover-card hover-card-2" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px'}}>
      <svg viewBox="0 0 24 24" className="svg" style={{width: '32px', height: '32px', stroke: '#a78bfa', marginBottom: '16px'}}><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
      <b style={{fontFamily: 'var(--font-display)'}}>Neon Glow</b>
      <p style={{fontSize: '13px', color: 'var(--ink-3)', textAlign: 'center', marginTop: '8px'}}>Surfaces ignite with colored box-shadows.</p>
    </div>
  </div>

      </section>
    </main>
  );
};


Section15.storyName = "15 Motion & interaction";


export const Section16: Story = () => {
  return (
    <main className="main" style={{ maxWidth: "100%", padding: "48px", minHeight: "100vh" }}>
      <section id="s16">
        
  <div className="sec-head"><span className="sec-num">16</span><h2>Imagery &amp; media</h2><span className="meta">Assets</span></div>
  <p className="lead">Image treatments, avatars, and media containers.</p>

  <div className="grid g2">
    <div>
      <div className="sub" style={{marginTop: '0'}}>Media Object / Gallery Frame</div>
      <div className="cell" style={{padding: '10px', borderRadius: 'var(--r-lg)'}}>
        <div style={{width: '100%', height: '200px', borderRadius: 'var(--r-md)', background: 'linear-gradient(45deg, #1e293b, #0f172a)', overflow: 'hidden', position: 'relative'}}>
          
          <div style={{position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', background: 'radial-gradient(circle at center, rgba(167, 139, 250, 0.4), transparent)', mixBlendMode: 'overlay'}}></div>
          <div style={{position: 'absolute', bottom: '12px', left: '12px', padding: '6px 12px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', borderRadius: 'var(--r-sm)', color: '#fff', fontSize: '12px', border: '1px solid rgba(255,255,255,0.1)'}}>
            <b>Space_Aurora.jpg</b>
          </div>
        </div>
      </div>
    </div>
    
    <div>
      <div className="sub" style={{marginTop: '0'}}>Avatar Grouping</div>
      <div className="cell" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '222px'}}>
        <div className="avatar-grp" style={{transform: 'scale(1.5)'}}>
          <div className="avatar" style={{background: 'linear-gradient(135deg, #f43f5e, #be123c)', zIndex: '4'}}>A</div>
          <div className="avatar" style={{background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', zIndex: '3'}}>B</div>
          <div className="avatar" style={{background: 'linear-gradient(135deg, #10b981, #047857)', zIndex: '2'}}>C</div>
          <div className="avatar" style={{background: 'var(--surface-2)', color: 'var(--ink)', borderColor: 'var(--line)', zIndex: '1'}}>+5</div>
        </div>
      </div>
    </div>
  </div>

      </section>
    </main>
  );
};


Section16.storyName = "16 Imagery & media";


export const Section17: Story = () => {
  return (
    <main className="main" style={{ maxWidth: "100%", padding: "48px", minHeight: "100vh" }}>
      <section id="s17">
        
  <div className="sec-head"><span className="sec-num">17</span><h2>Accessibility</h2><span className="meta">Cross-cutting</span></div>
  <p className="lead">Focus states and color contrast matrix to guarantee legibility.</p>

  <div className="sub">Contrast Matrix (AA standard)</div>
  <table className="tbl">
    <thead>
      <tr>
        <th>Background</th>
        <th>Text Color</th>
        <th>Contrast Ratio</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><div style={{width: '24px', height: '24px', background: '#020617', borderRadius: '4px', border: '1px solid var(--line)'}}></div></td>
        <td><code>#ffffff</code> (White)</td>
        <td>15.2 : 1</td>
        <td><span className="badge" style={{background: 'var(--success-soft)', color: 'var(--success)'}}>Pass AAA</span></td>
      </tr>
      <tr>
        <td><div style={{width: '24px', height: '24px', background: '#059669', borderRadius: '4px', border: '1px solid var(--line)'}}></div></td>
        <td><code>#ffffff</code> (White)</td>
        <td>4.6 : 1</td>
        <td><span className="badge" style={{background: 'var(--success-soft)', color: 'var(--success)'}}>Pass AA</span></td>
      </tr>
      <tr>
        <td><div style={{width: '24px', height: '24px', background: 'rgba(255,255,255,0.3)', borderRadius: '4px', border: '1px solid var(--line)'}}></div></td>
        <td><code>#0f172a</code> (Ink)</td>
        <td>7.1 : 1</td>
        <td><span className="badge" style={{background: 'var(--success-soft)', color: 'var(--success)'}}>Pass AAA</span></td>
      </tr>
    </tbody>
  </table>

  <div className="sub">Focus Rings</div>
  <div className="cell" style={{display: 'flex', gap: '20px'}}>
    <button className="btn btn-primary" style={{outline: '2px solid var(--accent)', outlineOffset: '3px'}}>Focused Primary</button>
    <input className="input" value="Focused Input" style={{boxShadow: '0 0 0 3px var(--accent-soft)', borderColor: 'var(--accent)'}} />
  </div>

      </section>
    </main>
  );
};


Section17.storyName = "17 Accessibility";


export const Section18: Story = () => {
  return (
    <main className="main" style={{ maxWidth: "100%", padding: "48px", minHeight: "100vh" }}>
      <section id="s18">
        
  <div className="sec-head"><span className="sec-num">18</span><h2>Diagrams</h2><span className="meta">Documentation</span></div>
  <p className="lead">Styleguides use diagrams to explain structure, not just show finished pixels.</p>
  <div className="grid g2">
    <div className="diagram" style={{background: 'var(--surface-2)'}}>
      <svg viewBox="0 0 320 130">
        <text x="0" y="14" className="dlabel" fill="var(--ink)">Component anatomy</text>
        <rect x="20" y="34" width="180" height="64" rx="8" fill="var(--accent-soft)" stroke="var(--accent)"/>
        <line x1="200" y1="44" x2="260" y2="44" className="dline"/><text x="266" y="48" className="dlabel">label</text>
        <line x1="200" y1="66" x2="260" y2="66" className="dline"/><text x="266" y="70" className="dlabel">input</text>
        <line x1="200" y1="88" x2="260" y2="88" className="dline"/><text x="266" y="92" className="dlabel">helper</text>
        <text x="34" y="58" className="dtext">Email</text>
        <rect x="34" y="64" width="150" height="22" rx="5" fill="var(--surface)" stroke="var(--line-strong)"/>
      </svg>
    </div>
    <div className="diagram" style={{background: 'var(--surface-2)'}}>
      <svg viewBox="0 0 320 130">
        <text x="0" y="14" className="dlabel" fill="var(--ink)">User flow</text>
        <rect x="8" y="40" width="70" height="34" rx="6" fill="var(--accent-soft)" stroke="var(--accent)"/><text x="22" y="61" className="dtext">Start</text>
        <line x1="78" y1="57" x2="118" y2="57" className="dline" marker-end="url(#a)"/>
        <rect x="120" y="40" width="74" height="34" rx="6" fill="var(--accent-soft)" stroke="var(--accent)"/><text x="134" y="61" className="dtext">Form</text>
        <line x1="194" y1="57" x2="234" y2="57" className="dline" marker-end="url(#a)"/>
        <rect x="236" y="40" width="76" height="34" rx="6" fill="var(--accent-soft)" stroke="var(--accent)"/><text x="250" y="61" className="dtext">Done</text>
        <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0l6 3-6 3z" fill="var(--line-strong)"/></marker></defs>
      </svg>
    </div>
  </div>

      </section>
    </main>
  );
};


Section18.storyName = "18 Diagrams";


export const Section19: Story = () => {
  return (
    <main className="main" style={{ maxWidth: "100%", padding: "48px", minHeight: "100vh" }}>
      <section id="s19">
        
  <div className="sec-head"><span className="sec-num">19</span><h2>Content &amp; voice</h2><span className="meta">Cross-cutting</span></div>
  <p className="lead">Microcopy guidelines, capitalization, and tone.</p>

  <div className="grid g2">
    <div className="cell" style={{borderTop: '4px solid var(--success)'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '16px'}}>
        <b style={{fontSize: '16px'}}>Do</b>
        <svg viewBox="0 0 24 24" className="svg" style={{stroke: 'var(--success)'}}><path d="M20 6L9 17l-5-5"/></svg>
      </div>
      <p style={{margin: '0 0 12px', fontSize: '14px'}}>Use clear, action-oriented labels in sentence case.</p>
      <button className="btn btn-primary">Save changes</button>
    </div>

    <div className="cell" style={{borderTop: '4px solid var(--error)'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '16px'}}>
        <b style={{fontSize: '16px'}}>Don't</b>
        <svg viewBox="0 0 24 24" className="svg" style={{stroke: 'var(--error)'}}><path d="M18 6L6 18M6 6l12 12"/></svg>
      </div>
      <p style={{margin: '0 0 12px', fontSize: '14px'}}>Use generic or ambiguous jargon in Title Case.</p>
      <button className="btn btn-secondary">Click Here To Execute</button>
    </div>
  </div>

      </section>
    </main>
  );
};


Section19.storyName = "19 Content & voice";


export const Section20: Story = () => {
  return (
    <main className="main" style={{ maxWidth: "100%", padding: "48px", minHeight: "100vh" }}>
      <section id="s20">
        
  <div className="sec-head"><span className="sec-num">20</span><h2>Brand foundations</h2><span className="meta">Layer 0</span></div>
  <p className="lead">Logos, wordmarks, and core brand application.</p>

  <div className="grid g2">
    <div className="cell" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', background: '#020617', borderColor: '#1e293b'}}>
      <h1 style={{margin: '0', fontFamily: 'var(--font-display)', fontSize: '48px', background: 'linear-gradient(135deg, #34d399, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 4px 12px rgba(52, 211, 153, 0.4))'}}>Myrilo AI</h1>
    </div>
    
    <div className="cell" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', background: '#ffffff', borderColor: '#e2e8f0'}}>
      <h1 style={{margin: '0', fontFamily: 'var(--font-display)', fontSize: '48px', background: 'linear-gradient(135deg, #047857, #5b21b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 4px 12px rgba(4, 120, 87, 0.2))'}}>Myrilo AI</h1>
    </div>
  </div>

      </section>
    </main>
  );
};


Section20.storyName = "20 Brand foundations";


Section01.storyName = "01 Foundations & design tokens";
Section02.storyName = "02 Color";
Section03.storyName = "03 Typography";
Section04.storyName = "04 Spacing & layout";
Section05.storyName = "05 Elevation & radius";
Section06.storyName = "06 Iconography";
Section07.storyName = "07 Buttons";
Section08.storyName = "08 Form controls";
Section09.storyName = "09 Indicators & status";
Section10.storyName = "10 Components (molecules)";
Section11.storyName = "11 Patterns & organisms";
Section12.storyName = "12 Data display";
Section13.storyName = "13 Feedback & states";
Section14.storyName = "14 Navigation";
Section15.storyName = "15 Motion & interaction";
Section16.storyName = "16 Imagery & media";
Section17.storyName = "17 Accessibility";
Section18.storyName = "18 Diagrams";
Section19.storyName = "19 Content & voice";
Section20.storyName = "20 Brand foundations";
