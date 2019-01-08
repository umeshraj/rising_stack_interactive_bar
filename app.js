// https://insights.stackoverflow.com/survey/2018/#technology-most-loved-dreaded-and-wanted-languages
const sample = [
  {
    language: "Rust",
    value: 78.9,
    color: "#000000"
  },
  {
    language: "Kotlin",
    value: 75.1,
    color: "#00a2ee"
  },
  {
    language: "Python",
    value: 68.0,
    color: "#fbcb39"
  },
  {
    language: "TypeScript",
    value: 67.0,
    color: "#007bc8"
  },
  {
    language: "Go",
    value: 65.6,
    color: "#65cedb"
  },
  {
    language: "Swift",
    value: 65.1,
    color: "#ff6e52"
  },
  {
    language: "JavaScript",
    value: 61.9,
    color: "#f9de3f"
  },
  {
    language: "C#",
    value: 60.4,
    color: "#5d2f8e"
  },
  {
    language: "F#",
    value: 59.6,
    color: "#008fc9"
  },
  {
    language: "Clojure",
    value: 59.6,
    color: "#507dca"
  }
];

const chartWidth = 800;
const chartHeight = 600;
const margin = 60;
const height = chartHeight - 2 * margin;
const width = chartWidth - 2 * margin;

// Select the svg element in index.htm
const svg = d3
  .select("svg")
  .attr("height", chartHeight)
  .attr("width", chartWidth)
  .style("background", "#f4f4f4");

// Let's draw the chart in the shifted reference
const chart = svg
  .append("g")
  .attr("transform", `translate(${margin}, ${margin})`);

// scaling and axes
// yscales
const yScale = d3
  .scaleLinear()
  .domain([0, 100])
  .range([height, 0]);
// add the y axis to the chart
chart.append("g").call(d3.axisLeft(yScale));

// xscale
const xScale = d3
  .scaleBand()
  .domain(sample.map(d => d.language))
  .range([0, width])
  .padding(0.2);
// xaxis
chart
  .append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(xScale));

// Adding bars
const barGroups = chart
  .selectAll()
  .data(sample)
  .enter()
  .append("g");

barGroups
  .append("rect")
  .attr("x", d => xScale(d.language))
  .attr("y", d => yScale(d.value))
  .attr("width", xScale.bandwidth())
  .attr("height", d => height - yScale(d.value));

// Adding vertical grid
chart
  .append("g")
  .attr("class", "grid")
  .attr("transform", `translate(0, ${height})`)
  .call(
    d3
      .axisBottom()
      .scale(xScale)
      .tickSize(-height, 0, 0)
      .tickFormat("")
  );
// Adding horizontal grid
chart
  .append("g")
  .attr("class", "grid")
  .call(
    d3
      .axisLeft()
      .scale(yScale)
      .tickSize(-width, 0, 0)
      .tickFormat("")
  );
