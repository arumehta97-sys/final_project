// main.js

// Visualization metadata: id, title, file, and fixed description text
const vizData = [
  {
    id: "viz-1",
    title: "GDP & GDP Per Capita by Continent (2013 vs 2023)",
    file: "map_viz.html",
    description: `
      The interactive choropleth maps reveal global economic disparities and their evolution from 2013 to 2023.
      In the GDP per capita view, 2013 values range from near zero to approximately $180,000, while by 2023, this
      upper bound has increased to roughly $250,000, indicating growth among the world's wealthiest nations.
      Wealth concentration remains highest in North America, Western Europe, and advanced Asian economies, while
      much of Africa and South Asia continues to fall below $20,000 per person. In contrast, the total GDP map
      highlights the scale of economic power, China and the United States dominate globally due to sheer market size,
      even though many smaller nations exceed them in per-capita wealth. Together, these two views demonstrate that
      prosperity must be evaluated with both national output and personal income in mind.
    `
  },

  {
    id: "viz-2",
    title: "GDP Growth vs Income, Labor & Social Factors",
    file: "altair_gdp_growth.html",
    description: `
      This visualization compares GDP growth with GDP per capita, unemployment, labor participation, and electricity
      access, revealing how economic expansion aligns with development fundamentals. Countries with high labor force
      participation and low unemployment tend to show steadier growth, whereas low-income economies display both rapid
      surges and steep declines, suggesting volatility associated with industrial transitions or resource dependency.
      Electrification appears especially meaningful nations with near universal access rarely fall into negative growth,
      implying that infrastructure capacity enables productive labor, market integration, and technological adoption.

      A key insight from the distribution is that wealth alone does not guarantee growth. Several middle-income countries
      grow faster than rich ones, suggesting that economies earlier in development may catch up quickly once stability
      and infrastructure are secured. Conversely, countries with high unemployment cluster toward weak or erratic growth,
      indicating that unused labor capacity represents one of the strongest barriers to development. The plot ultimately
      suggests that sustainable growth arises from both income and structural capacity.
    `
  },

  {
    id: "viz-3",
    title: "GDP per Capita vs Government Effectiveness by Region",
    file: "gov_effectiveness_vs_gdp.html",
    description: `
      The small-multiple scatterplots show a consistent threshold pattern: countries with negative government effectiveness
      scores rarely surpass $20,000 GDP per capita, while those with strong governance routinely exceed $40,000–$60,000.
      Europe displays this most clearly, with high governance nations (Luxembourg, Switzerland, Norway) surpassing
      $150,000 per person, representing the global income frontier. Between 2013 and 2023, GDP per capita increases in
      many regions, even as governance scores remain relatively flat, suggesting that growth can proceed without parallel
      institutional improvement, though perhaps not indefinitely. Africa and parts of Asia remain concentrated in the
      lower-left quadrant, while select Asian economies shift upward and rightward, indicating simultaneous gains in both
      governance and prosperity. Overall, the visualization reinforces the notion that governance quality is a key long-run
      determinant of economic success.
    `
  },

  {
    id: "viz-4",
    title: "Birth & Death Rate Correlations with Economic Indicators",
    file: "correlation.png",
    description: `
      This heatmap measures how demographic patterns relate to GDP per capita, GDP growth, unemployment, labor force
      participation, electricity access, and government effectiveness. Birth rates show strong negative correlations
      with income, electrification, and governance in both 2013 and 2023, indicating that wealthy nations with well-built
      institutions consistently experience lower fertility. This aligns with demographic transition theory: as income,
      education, and urbanization rise, families tend to have fewer children, and women delay childbirth to pursue
      economic opportunity.

      Death-rate correlations are weaker but still meaningful. Higher mortality is associated with lower income and weaker
      governance, suggesting that health outcomes improve only when infrastructure, sanitation, and healthcare systems
      expand alongside broader development. Unlike birth rates, death rates respond gradually rather than dramatically,
      implying that reducing mortality requires more than economic expansion alone, it depends on long-term investment in
      medical capacity, public safety, and food security.

      Altogether, the heatmap highlights that demographic trends are both reflections and consequences of development.
      Birth rates fall reliably with prosperity, while death rates improve as nations transition from growth into social
      stability and health investment.
    `
  },

  {
    id: "viz-5",
    title: "Interactive World Birth Rate Map (2013 vs 2023)",
    file: "worldmap.html",
    description: `
      This map visualizes global birth-rate change across a decade, revealing a growing demographic split. Most of Europe,
      East Asia, and North America show declining fertility, often below replacement level, indicating shrinking labor pools
      and long-term aging pressures. These trends align with rising education levels, urban living costs, delayed marriage,
      and greater workforce participation among women. Without immigration or pro-fertility policies, these regions may face
      economic contraction as their working-age populations shrink.

      In contrast, much of Sub-Saharan Africa, South Asia, and parts of the Middle East maintain high birth rates, some
      exceeding three to four children per family. These regions will drive most population growth this century, presenting
      both opportunity and risk. Rapid expansion strengthens future labor capacity, but only if matched by investments in
      education, employment, healthcare, and infrastructure. Countries that fail to expand job markets may face youth
      unemployment and social instability despite population growth.

      The 2013 vs 2023 comparison underscores two diverging futures, aging wealthy nations adapting to lower fertility,
      and emerging regions preparing for dramatic expansion. The decisions governments make today will determine whether
      demographic change becomes an economic advantage or a development strain.
    `
  }
];

// Build visualization cards (title + image/iframe + fixed description)
function buildVizCards() {
  const grid = document.getElementById("viz-grid");
  if (!grid) return;

  vizData.forEach((viz) => {
    const card = document.createElement("article");
    card.className = "viz-card";

    const heading = document.createElement("h3");
    heading.textContent = viz.title;
    card.appendChild(heading);

    const placeholder = document.createElement("div");
    placeholder.id = viz.id;
    placeholder.className = "viz-placeholder";
    card.appendChild(placeholder);

    const descLabel = document.createElement("h4");
    descLabel.textContent = "Description";
    card.appendChild(descLabel);

    const desc = document.createElement("p");
    desc.className = "viz-description";
    desc.innerHTML = viz.description.trim();
    card.appendChild(desc);

    grid.appendChild(card);
  });
}

// Mount visualizations (image or iframe depending on file type)
function mountVisualizations() {
  vizData.forEach((viz) => {
    const container = document.getElementById(viz.id);
    if (!container) return;

    const lower = viz.file.toLowerCase();

    if (lower.endsWith(".png") || lower.endsWith(".jpg") || lower.endsWith(".jpeg")) {
      const img = document.createElement("img");
      img.src = viz.file;
      img.alt = viz.title;
      img.style.width = "100%";
      img.style.borderRadius = "6px";
      img.loading = "lazy";
      container.appendChild(img);
    } else {
      const iframe = document.createElement("iframe");
      iframe.src = viz.file;
      iframe.width = "100%";
      iframe.height = "480";
      iframe.style.border = "none";
      iframe.loading = "lazy";
      container.appendChild(iframe);
    }
  });
}

// Smooth page scrolling
function enableSmoothScroll() {
  const links = document.querySelectorAll("header .nav a[href^='#']");
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.getElementById(link.getAttribute("href").substring(1));
      if (target) window.scrollTo({ top: target.offsetTop - 70, behavior: "smooth" });
    });
  });
}

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  buildVizCards();
  mountVisualizations();
  enableSmoothScroll();
});
