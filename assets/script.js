const projects = {
enterprise:{
tag:"BUSINESS INTELLIGENCE",
title:"Enterprise Performance Intelligence",
metrics:["50+ dashboards","Board & executive reporting","Customer · Product · Sales · Operations"],
body:[
["The problem","Leadership and business teams needed consistent visibility across customer, product, sales, financial and operational performance. Reporting also needed to support recurring business reviews and strategic decisions."],
["What I did","Queried enterprise data warehouse and data lake datasets using SQL; built and maintained 50+ Power BI dashboards, KPI scorecards and Excel reporting solutions; used Power Query, DAX and semantic modelling to transform data into reusable reporting products."],
["Business value","Created a repeatable reporting layer for performance conversations, delivered monthly through annual business reviews and supported Board-level reporting against strategic targets."],
["Tools","Power BI · DAX · Power Query · SQL · Excel · Metabase · SSRS · Apache Superset"]
]},
seabaas:{
tag:"CORE BANKING",
title:"SEABAAS Monitoring & Operational Visibility",
metrics:["Real-time monitoring","Compliance visibility","Fraud-risk indicators"],
body:[
["The problem","A core banking environment required stronger operational visibility during implementation and ongoing monitoring."],
["What I did","Built real-time monitoring dashboards around transaction visibility, operational health, compliance monitoring and fraud-risk indicators, using enterprise data and BI tooling to surface exceptions and trends."],
["Business value","Gave teams a clearer operational view of system and transaction activity and supported risk-aware monitoring during rollout and operations."],
["Tools","SQL · Power BI · Metabase · SSRS · Apache Superset"]
]},
itsm:{
tag:"OPERATIONS",
title:"Technology Performance Management",
metrics:["30% IT CSAT improvement","KPI framework","ITSM governance"],
body:[
["The problem","Technology performance reporting needed structured ownership, consistent metrics and a clearer management view across multiple IT functions."],
["What I did","Established the Technology performance reporting function; designed KPI frameworks, management reviews and executive dashboards covering service performance, SLA compliance, incidents, requests and operational trends."],
["Business value","The structured performance-management approach contributed to a 30% improvement in IT Customer Satisfaction and gave leadership a consistent basis for performance discussions."],
["Tools","SQL · BI reporting · Excel · PowerPoint · ITSM practices"]
]},
asset:{
tag:"AUTOMATION",
title:"IT Asset Reporting Automation",
metrics:["80%+ faster preparation","30+ contributors","Standardized inputs"],
body:[
["The problem","Monthly IT asset reporting depended on data arriving from more than 30 IT Support officers through email, creating manual consolidation and data-quality issues."],
["What I did","Built an Excel and Power Query reporting system with standardized data-collection workbooks, a master reporting model and repeatable validation and reconciliation steps."],
["Business value","Replaced fragmented email-based reporting and improved report preparation speed by over 80%, while strengthening consistency and management visibility."],
["Tools","Excel · Power Query · Data validation · Reporting automation"]
]},
onebank:{
tag:"PRODUCT & STRATEGY",
title:"OneBank Investment Module",
metrics:["Product requirements","Market & user analysis","Technical requirements"],
body:[
["The opportunity","A product initiative explored integrating an investment experience into OneBank to expand access to investment services and improve the customer journey."],
["My contribution","Worked on the Product Requirements Document, including in-scope and out-of-scope definition, market and user analysis, technical and non-functional requirements and integration considerations."],
["Product thinking","The work connected customer needs, product strategy, business scope and technical requirements, with attention to adoption, retention and measurable customer outcomes."],
["Tools & methods","Product requirements · Business analysis · User analysis · Technical requirements · Agile collaboration"]
]},
consulting:{
tag:"CONSULTING",
title:"Business Consulting & Problem Solving",
metrics:["Strategy","Operations","Growth"],
body:[
["The work","Through iBurgeon, business consulting work has included supporting an architectural firm and a fashion design company with strategy, scaling and operational thinking."],
["Approach","The consulting lens is industry-agnostic: understand the business model, identify constraints and opportunities, structure the problem, and translate findings into practical actions."],
["Why it matters","This complements my analytics background by strengthening the business side of problem solving: not only finding what the data says, but asking what the organization should do with it."],
["Focus","Business strategy · Operations · Growth · Process improvement · Analytical problem solving"]
]}
};

const modal=document.getElementById("modal");
const content=document.getElementById("modal-content");
const projectCards=[...document.querySelectorAll(".project-card")];
const projectClose=modal ? modal.querySelector(".modal-close") : null;

function closeProjectModal(){
  if(!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden","true");
  projectCards.forEach(card=>card.classList.remove("active"));
}

function openProject(projectKey, card){
  const p=projects[projectKey];
  if(!p || !modal || !content) return;
  content.innerHTML=`<p class="eyebrow">${p.tag}</p><h2>${p.title}</h2><div class="case-metrics">${p.metrics.map(x=>`<span>${x}</span>`).join("")}</div>${p.body.map(x=>`<h3>${x[0]}</h3><p>${x[1]}</p>`).join("")}`;
  projectCards.forEach(c=>c.classList.remove("active"));
  card?.classList.add("active");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden","false");
}

projectCards.forEach(card=>{
  card.addEventListener("click", e=>{
    if(e.target.closest("button, a")) return;
    openProject(card.dataset.project, card);
  });
  card.addEventListener("keydown", e=>{
    if(e.key === "Enter" || e.key === " "){
      e.preventDefault();
      openProject(card.dataset.project, card);
    }
  });
});

document.querySelectorAll("[data-project].text-button").forEach(btn=>{
  btn.addEventListener("click", e=>{
    e.stopPropagation();
    openProject(btn.dataset.project, btn.closest(".project-card"));
  });
});

if(projectClose) projectClose.addEventListener("click", closeProjectModal);
if(modal) modal.addEventListener("click",e=>{if(e.target===modal) closeProjectModal();});
document.querySelector(".menu").addEventListener("click",()=>{
  const n=document.querySelector(".nav-links");
  n.style.display=n.style.display==="flex"?"none":"flex";
  if(n.style.display==="flex"){n.style.position="absolute";n.style.top="70px";n.style.right="15px";n.style.flexDirection="column";n.style.background="white";n.style.padding="18px";n.style.border="1px solid #d9e2ec";n.style.borderRadius="10px"}
});

// Active navigation state
const navLinks = [...document.querySelectorAll(".nav-link")];
const navSections = [...document.querySelectorAll("main section[id]")];

function setActiveNav(id) {
  navLinks.forEach(link => {
    link.classList.toggle("active", link.dataset.nav === id);
  });
}

const navObserver = new IntersectionObserver((entries) => {
  const visible = entries
    .filter(entry => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

  if (visible) setActiveNav(visible.target.id);
}, {
  rootMargin: "-30% 0px -55% 0px",
  threshold: [0, 0.15, 0.35, 0.6]
});

navSections.forEach(section => navObserver.observe(section));

window.addEventListener("scroll", () => {
  if (window.scrollY < 180) setActiveNav("top");
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 850) {
      const n = document.querySelector(".nav-links");
      n.style.display = "none";
    }
  });
});




// Always start at the top of the website after a refresh.
// Navigation hashes still work during normal use, but a reload should behave like Home.
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
function resetToHomeOnRefresh(){
  if (window.location.hash) {
    history.replaceState(null, "", window.location.pathname + window.location.search);
  }
  window.scrollTo(0, 0);
  setActiveNav("top");
}
window.addEventListener("load", resetToHomeOnRefresh);
window.addEventListener("pageshow", event => {
  if (event.persisted) resetToHomeOnRefresh();
});

// CV options modal
const cvModal = document.getElementById("cv-modal");
const cvTriggers = document.querySelectorAll(".cv-trigger, .contact-cv");
const cvClose = document.querySelector(".cv-modal-close");
function closeCvModal(){
  if(!cvModal) return;
  cvModal.classList.remove("open");
  cvModal.setAttribute("aria-hidden","true");
}
cvTriggers.forEach(trigger => trigger.addEventListener("click", () => {
  cvModal.classList.add("open");
  cvModal.setAttribute("aria-hidden","false");
}));
if(cvClose) cvClose.addEventListener("click", closeCvModal);
if(cvModal) cvModal.addEventListener("click", e => { if(e.target === cvModal) closeCvModal(); });
document.addEventListener("keydown", e => {
  if(e.key !== "Escape") return;
  if(modal?.classList.contains("open")) closeProjectModal();
  if(cvModal?.classList.contains("open")) closeCvModal();
});
