// INIT AOS
// AOS.init();

// NAV
var prev = document.getElementById("prev");
var next = document.getElementById("next");

const sections = document.querySelectorAll("section");
let currentSection = "";

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                currentSection = entry.target.id;

                if (currentSection === 'hero') {
                    prev.setAttribute('href', '#hero');
                    next.setAttribute('href', '#about');
                } else if (currentSection === 'about') {
                    prev.setAttribute('href', '#hero');
                    next.setAttribute('href', '#project');
                } else if (currentSection === 'project') {
                    prev.setAttribute('href', '#about');
                    next.setAttribute('href', '#article');
                } else if (currentSection === 'article') {
                    prev.setAttribute('href', '#project');
                    next.setAttribute('href', '#contact');
                } else if (currentSection === 'contact') {
                    prev.setAttribute('href', '#article');
                    next.setAttribute('href', '#contact');
                }

                if (currentSection === 'contact') {
                    next.setAttribute('class', 'hidden');
                } else {
                    next.setAttribute('class', 'bg-[#F7FFF7]/70 py-[4vw] rounded-l-[8px] fixed right-0 top-[50%] translate-y-[-50%]');
                }

                if (currentSection === 'hero') {
                    prev.setAttribute('class', 'hidden');
                } else {
                    prev.setAttribute('class', 'bg-[#F7FFF7]/70 py-[4vw] rounded-r-[8px] fixed top-[50%] translate-y-[-50%]');
                }
            }
        });
    },
    { threshold: 0.5 }
);

sections.forEach((section) => observer.observe(section));

//SKILLS
fetch('../json/skills.json')
    .then(response => response.json())
    .then(data => {
        const list = document.getElementById('skill');
        data.forEach(item => {
            const li = document.createElement('span');
            li.textContent = `${item.nama}`;
            li.className = `bg-[var(--blue)] text-[var(--dark)] text-xl py-[8px] px-[12px] rounded-[8px] font-medium`;
            list.appendChild(li);
        });
    })
    .catch(error => console.error('Error fetching JSON:', error));

//PROJECT
fetch('../json/projects.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('list_project');

        container.innerHTML = data.map(data => `
            <a href="${data.link}" target="_blank" class="group grid grid-cols-2 gap-[112px] mb-[28px]">
                <img src="/image/project/${data.image ? data.image : 'placeholder.jpg'}" class="h-[272px] w-full rounded-[8px] border-[3px] border-[var(--blue)] transition group-hover:shadow-[5px_5px_0px_0px_var(--blue)]" alt="${data.title}">

                <div>
                    <div class="flex items-center mb-[8px]">
                        <h4 class="text-[var(--blue)] text-[30px] font-semibold group-hover:underline">${data.title}</h4>
                    </div>
                    <p class="text-[var(--light)] text-[20px] font-medium mb-[16px]">${data.description}</p>
                    <div class="flex flex-wrap gap-[8px]">
                    ${data.skills.map(skill =>
            `
                            <span class="bg-[var(--blue)] text-[var(--dark)] text-xl py-[8px] px-[12px] rounded-[8px] font-medium">${skill}</span>
                        `
        )}
                    </div>
                </div>
            </a>
        `).join('');
    })
    .catch(error => console.error('Error fetching JSON:', error));

fetch('../json/personal_project.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('list_project_personal');

        container.innerHTML = data.map(data => `
            <a href="${data.link}" target="_blank" class="group grid grid-cols-2 gap-[112px] mb-[28px]">
                <img src="/image/project/${data.image ? data.image : 'placeholder.jpg'}" class="h-[272px] w-full rounded-[8px] border-[3px] border-[var(--blue)] transition group-hover:shadow-[5px_5px_0px_0px_var(--blue)]" alt="${data.title}">

                <div>
                    <div class="flex items-center mb-[8px]">
                        <h4 class="text-[var(--blue)] text-[30px] font-semibold group-hover:underline">${data.title}</h4>
                    </div>
                    <p class="text-[var(--light)] text-[20px] font-medium mb-[16px]">${data.description}</p>
                    <div class="flex flex-wrap gap-[8px]">
                    ${data.skills.map(skill =>
            `
                            <span class="bg-[var(--blue)] text-[var(--dark)] text-xl py-[8px] px-[12px] rounded-[8px] font-medium">${skill}</span>
                        `
        )}
                    </div>
                </div>
            </a>
        `).join('');
    })
    .catch(error => console.error('Error fetching JSON:', error));

//ARTICLE
var per_page = 3
var total = 0
function fetchArticle() {
    fetch(`https://dev.to/api/articles?username=nabillatrisnani&per_page=${per_page}`)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('list_article');

            container.innerHTML = data.map(data => `
                <a href="${data.url}" target="_blank" class="bg-[#515D6B] rounded-[8px] mb-[28px]">
                    <img src="${data.cover_image}" class="rounded-t-[8px]" alt="${data.title}">
                    <div class="py-[24px] px-[16px]">
                        <h5 class="text-[20px] text-[var(--light)] font-bold mb-[16px]">${data.title}</h5>
                        <p class="text-[18px] text-[var(--light)] mb-[16px]">${data.description}</p>
    
                        <div class="grid grid-cols-2 gap-[8px]">
                            <div class="flex">
                                <img src="/image/article/date.svg" class="mr-[8px]" alt="">
                                <p class="text-[18px] text-[var(--light)]">${data.readable_publish_date}</p>
                            </div>
                            <div class="flex">
                                <img src="/image/article/book.svg" class="mr-[8px]" alt="">
                                <p class="text-[18px] text-[var(--light)]">${data.reading_time_minutes} minutes</p>
                            </div>
                        </div>
                    </div>
                </a>
            `).join('');
        })
        .catch(error => console.error('Error fetching JSON:', error));
};

fetch(`https://dev.to/api/articles?username=nabillatrisnani`)
    .then(response => response.json())
    .then(data => {
        total = data.length

        fetchArticle();
    })
    .catch(error => console.error('Error fetching JSON:', error));

function getMoreArticle() {
    per_page = per_page + 3
    fetchArticle(per_page);

    if (per_page >= total) {
        document.getElementById('read_more').setAttribute('class', 'hidden');
    }
};
