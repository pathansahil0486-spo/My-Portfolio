// ============================================================
//   i18n — Multi‑language support
//   Keys correspond to data-i18n attributes in HTML
// ============================================================

const I18N = {
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',

    // Hero
    'hero.eyebrow': 'Open to opportunities',
    'hero.hiLine': 'hi there!, I\'m',
    'hero.bio': 'Final-year B.Tech CSE student at <strong>DBATU University</strong>. I build end-to-end web applications — from clean React & Angular frontends to robust Java Spring Boot backends with MySQL & MongoDB.',
    'hero.downloadResume': 'Download Resume',
    'hero.seeWork': 'See My Work',
    'hero.statsProjects': 'Projects',
    'hero.statsCerts': 'Certifications',
    'hero.statsCoding': 'Coding',
    'hero.scroll': 'Scroll',

    // About preview
    'aboutPreview.label': 'Who I Am',
    'aboutPreview.title': 'Building things that <em class="highlight">matter</em>',
    'aboutPreview.text': 'I\'m a final-year B.Tech Computer Science student at DBATU University. I specialize in building responsive websites and full-stack web apps using <strong>HTML, CSS, JavaScript, Angular, Node.js</strong>, and <strong>Spring Boot</strong>. Passionate about solving real-world problems with elegant code and clean UI.',
    'aboutPreview.cta': 'More About Me',

    // Skills
    'skills.label': 'Tech Stack',
    'skills.title': 'Skills &amp; <em class="highlight">Technologies</em>',

    // Projects preview
    'projectsPreview.label': 'Featured Work',
    'projectsPreview.title': 'Recent <em class="highlight">Projects</em>',
    'projectsPreview.viewAll': 'View All 80+ Projects',

    // Contact preview
    'contactPreview.label': 'Let\'s Connect',
    'contactPreview.title': 'Got a <em class="highlight">Project?</em>',
    'contactPreview.text': 'I\'m open to freelance work, full-time roles, and interesting collaborations. Let\'s build something together.',
    'contactPreview.cta': 'Get In Touch',

    // Footer
    'footer.text': '© 2025 Sahil R. Pathan — Crafted with care.',
    'footer.textAbout': '© 2025 Sahil R. Pathan — All rights reserved.',
    'footer.textAbout2': '© 2025 Sahil R. Pathan — All rights reserved.',

    // About page
    'about.label': 'The Developer',
    'about.title': 'About <span class="highlight">Me</span>',
    'about.p1': 'Hello! I\'m <strong>Sahil R. Pathan</strong>, a final-year B.Tech Computer Science student at DBATU University, Maharashtra, India.',
    'about.p2': 'I specialize in front-end and back-end web development with hands-on experience in <strong>HTML, CSS, JavaScript, Angular, React, Node.js, Express, Java</strong>, and <strong>Spring Boot</strong>, with databases like <strong>MySQL and MongoDB</strong>.',
    'about.p3': 'My mission is to build responsive, fully functional web applications with smooth user experiences and modern UI. I believe in turning complex problems into clean, scalable solutions that users love.',
    'about.p4': 'Beyond web development, I\'ve worked on AI-powered projects including an <strong>AI Health Predictor</strong> and an <strong>AI Interview Platform for Students and Job Seekers</strong> — combining deep learning with Python to deliver impactful tools.',
    'about.p5': 'I\'m always learning, always building, and always looking for ways to push the boundaries of what\'s possible with code.',
    'about.downloadResume': 'Download Resume',
    'about.contactMe': 'Contact Me',
    'about.education': 'Education',
    'about.techSkills': 'Technical Skills',
    'about.interests': 'Interests',
    'about.languages': 'Languages',
    'about.verified': 'Verified',
    'about.certifications': 'Certifications',

    // Contact page
    'contact.label': 'Let\'s Talk',
    'contact.title': 'Get In <span class="highlight">Touch</span>',
    'contact.intro': 'If you\'d like to collaborate, hire me, or just say hello — drop a message. I reply within 24 hours.',
    'contact.formName': 'Your Name',
    'contact.formEmail': 'Email Address',
    'contact.formSubject': 'Subject',
    'contact.formMessage': 'Your Message',
    'contact.formSend': 'Send Message',
    'contact.detailsHeader': 'Let\'s Build Something',
    'contact.detailsText': 'I\'m open to freelance projects, full-time roles, and collaborations. Whether you have a project idea, job opportunity, or just want to connect — I\'d love to hear from you.',
    'contact.location': 'Maharashtra, India',
    'contact.availability': 'Available: Mon–Sat, 9AM–8PM IST',
    'contact.quickDownload': 'Quick Download',
    'contact.downloadResume': 'Download My Resume',

    // Projects page
    'projects.label': '80+ Projects &amp; Counting',
    'projects.title': 'My <em class="highlight">Work</em>',
    'projects.intro': 'From full-stack platforms to creative CSS experiments — here\'s everything I\'ve built.',
    'projects.filterAll': 'All Projects',
    'projects.filterFullstack': 'Full Stack',
    'projects.filterFrontend': 'Frontend',
    'projects.filterReact': 'React',
    'projects.filterTools': 'Tools &amp; Utils',
    'projects.filterEffects': 'CSS Effects',
    'projects.filterGames': 'Games &amp; Fun',
  },

  hi: {
    'nav.home': 'होम',
    'nav.about': 'परिचय',
    'nav.projects': 'प्रोजेक्ट्स',
    'nav.contact': 'संपर्क',

    'hero.eyebrow': 'अवसरों के लिए खुला',
    'hero.hiLine': 'नमस्ते!, मैं हूँ',
    'hero.bio': 'DBATU विश्वविद्यालय से B.Tech CSE के अंतिम वर्ष के छात्र। मैं एंड-टू-एंड वेब एप्लिकेशन बनाता हूँ — React और Angular फ्रंटेंड से लेकर Java Spring Boot बैकेंड तक, MySQL और MongoDB के साथ।',
    'hero.downloadResume': 'रेज़्यूमे डाउनलोड करें',
    'hero.seeWork': 'मेरा काम देखें',
    'hero.statsProjects': 'प्रोजेक्ट्स',
    'hero.statsCerts': 'सर्टिफिकेशन्स',
    'hero.statsCoding': 'कोडिंग',
    'hero.scroll': 'स्क्रॉल करें',

    'aboutPreview.label': 'मैं कौन हूँ',
    'aboutPreview.title': 'ऐसी चीजें बनाना जो <em class="highlight">मायने</em> रखती हैं',
    'aboutPreview.text': 'मैं DBATU विश्वविद्यालय से B.Tech Computer Science के अंतिम वर्ष का छात्र हूँ। मैं <strong>HTML, CSS, JavaScript, Angular, Node.js</strong> और <strong>Spring Boot</strong> का उपयोग करके रिस्पॉन्सिव वेबसाइट और फुल-स्टैक वेब ऐप बनाने में माहिर हूँ। वास्तविक समस्याओं को सुंदर कोड और साफ UI के साथ हल करने का शौक।',
    'aboutPreview.cta': 'मेरे बारे में और जानें',

    'skills.label': 'टेक स्टैक',
    'skills.title': 'कौशल और <em class="highlight">प्रौद्योगिकियाँ</em>',

    'projectsPreview.label': 'प्रमुख कार्य',
    'projectsPreview.title': 'हाल के <em class="highlight">प्रोजेक्ट्स</em>',
    'projectsPreview.viewAll': 'सभी 80+ प्रोजेक्ट्स देखें',

    'contactPreview.label': 'संपर्क करें',
    'contactPreview.title': 'कोई <em class="highlight">प्रोजेक्ट</em> है?',
    'contactPreview.text': 'मैं फ्रीलांस काम, पूर्णकालिक भूमिकाओं और दिलचस्प सहयोग के लिए खुला हूँ। आइए मिलकर कुछ बनाएं।',
    'contactPreview.cta': 'संपर्क करें',

    'footer.text': '© 2025 साहिल आर. पठान — प्यार से बनाया गया।',
    'footer.textAbout': '© 2025 साहिल आर. पठान — सभी अधिकार सुरक्षित।',
    'footer.textAbout2': '© 2025 साहिल आर. पठान — सभी अधिकार सुरक्षित।',

    'about.label': 'डेवलपर',
    'about.title': 'मेरे <span class="highlight">बारे में</span>',
    'about.p1': 'नमस्ते! मैं <strong>साहिल आर. पठान</strong> हूँ, DBATU विश्वविद्यालय, महाराष्ट्र, भारत से B.Tech कंप्यूटर साइंस के अंतिम वर्ष का छात्र।',
    'about.p2': 'मैं फ्रंट-एंड और बैक-एंड वेब विकास में विशेषज्ञता रखता हूँ, <strong>HTML, CSS, JavaScript, Angular, React, Node.js, Express, Java</strong> और <strong>Spring Boot</strong> के साथ, और डेटाबेस जैसे <strong>MySQL और MongoDB</strong>।',
    'about.p3': 'मेरा मिशन रिस्पॉन्सिव, पूरी तरह कार्यात्मक वेब एप्लिकेशन बनाना है जो उपयोगकर्ता अनुभव और आधुनिक UI प्रदान करते हैं। मैं जटिल समस्याओं को साफ, स्केलेबल समाधानों में बदलने में विश्वास रखता हूँ जिन्हें उपयोगकर्ता पसंद करते हैं।',
    'about.p4': 'वेब विकास के अलावा, मैंने AI-संचालित परियोजनाओं पर काम किया है, जिसमें <strong>AI Health Predictor</strong> और <strong>AI Interview Platform for Students and Job Seekers</strong> शामिल हैं — जो Python के साथ डीप लर्निंग को मिलाकर प्रभावशाली उपकरण प्रदान करते हैं।',
    'about.p5': 'मैं हमेशा सीख रहा हूँ, हमेशा बना रहा हूँ, और हमेशा कोड के साथ संभव की सीमाओं को आगे बढ़ाने के तरीकों की तलाश कर रहा हूँ।',
    'about.downloadResume': 'रेज़्यूमे डाउनलोड करें',
    'about.contactMe': 'संपर्क करें',
    'about.education': 'शिक्षा',
    'about.techSkills': 'तकनीकी कौशल',
    'about.interests': 'रुचियाँ',
    'about.languages': 'भाषाएँ',
    'about.verified': 'प्रमाणित',
    'about.certifications': 'प्रमाणपत्र',

    'contact.label': 'बात करते हैं',
    'contact.title': 'संपर्क <span class="highlight">करें</span>',
    'contact.intro': 'अगर आप सहयोग करना चाहते हैं, मुझे नियुक्त करना चाहते हैं, या बस नमस्ते कहना चाहते हैं — एक संदेश भेजें। मैं 24 घंटे के भीतर उत्तर देता हूँ।',
    'contact.formName': 'आपका नाम',
    'contact.formEmail': 'ईमेल पता',
    'contact.formSubject': 'विषय',
    'contact.formMessage': 'आपका संदेश',
    'contact.formSend': 'संदेश भेजें',
    'contact.detailsHeader': 'आइए कुछ बनाएं',
    'contact.detailsText': 'मैं फ्रीलांस परियोजनाओं, पूर्णकालिक भूमिकाओं और सहयोग के लिए खुला हूँ। चाहे आपके पास कोई प्रोजेक्ट आइडिया हो, नौकरी का अवसर हो, या बस जुड़ना चाहते हों — मैं आपसे सुनना पसंद करूंगा।',
    'contact.location': 'महाराष्ट्र, भारत',
    'contact.availability': 'उपलब्ध: सोम-शनि, 9AM–8PM IST',
    'contact.quickDownload': 'त्वरित डाउनलोड',
    'contact.downloadResume': 'मेरा रेज़्यूमे डाउनलोड करें',

    'projects.label': '80+ प्रोजेक्ट्स और बढ़ रहे हैं',
    'projects.title': 'मेरा <em class="highlight">काम</em>',
    'projects.intro': 'फुल-स्टैक प्लेटफॉर्म से लेकर क्रिएटिव CSS प्रयोगों तक — यहाँ मैंने जो कुछ भी बनाया है, वह सब है।',
    'projects.filterAll': 'सभी प्रोजेक्ट्स',
    'projects.filterFullstack': 'फुल स्टैक',
    'projects.filterFrontend': 'फ्रंटेंड',
    'projects.filterReact': 'React',
    'projects.filterTools': 'टूल्स और उपयोगिताएँ',
    'projects.filterEffects': 'CSS प्रभाव',
    'projects.filterGames': 'गेम्स और मनोरंजन',
  },

  mr: {
    'nav.home': 'मुख्यपृष्ठ',
    'nav.about': 'माझी माहिती',
    'nav.projects': 'प्रकल्प',
    'nav.contact': 'संपर्क',

    'hero.eyebrow': 'संधींसाठी खुला',
    'hero.hiLine': 'नमस्कार!, मी आहे',
    'hero.bio': 'DBATU विद्यापीठातून B.Tech CSE चा अंतिम वर्षाचा विद्यार्थी. मी एंड-टू-एंड वेब ॲप्लिकेशन्स बनवतो — React आणि Angular फ्रंटेंडपासून Java Spring Boot बॅकेंडपर्यंत, MySQL आणि MongoDB सह.',
    'hero.downloadResume': 'रेझ्युमे डाउनलोड करा',
    'hero.seeWork': 'माझे काम पहा',
    'hero.statsProjects': 'प्रकल्प',
    'hero.statsCerts': 'प्रमाणपत्रे',
    'hero.statsCoding': 'कोडिंग',
    'hero.scroll': 'स्क्रोल करा',

    'aboutPreview.label': 'मी कोण',
    'aboutPreview.title': 'अशा गोष्टी बनवणे ज्या <em class="highlight">महत्वाच्या</em> आहेत',
    'aboutPreview.text': 'मी DBATU विद्यापीठातून B.Tech Computer Science चा अंतिम वर्षाचा विद्यार्थी आहे. मी <strong>HTML, CSS, JavaScript, Angular, Node.js</strong> आणि <strong>Spring Boot</strong> वापरून प्रतिसादात्मक वेबसाइट आणि फुल-स्टॅक वेब ॲप बनवण्यात माहिर आहे. वास्तविक समस्या स्वच्छ कोड आणि स्वच्छ UI ने सोडवण्याची आवड.',
    'aboutPreview.cta': 'माझ्याबद्दल अधिक',

    'skills.label': 'टेक स्टॅक',
    'skills.title': 'कौशल्ये आणि <em class="highlight">तंत्रज्ञान</em>',

    'projectsPreview.label': 'वैशिष्ट्यीकृत कार्य',
    'projectsPreview.title': 'अलीकडील <em class="highlight">प्रकल्प</em>',
    'projectsPreview.viewAll': 'सर्व 80+ प्रकल्प पहा',

    'contactPreview.label': 'संपर्क साधा',
    'contactPreview.title': 'काही <em class="highlight">प्रकल्प</em> आहे?',
    'contactPreview.text': 'मी फ्रीलान्स काम, पूर्णवेळ भूमिका आणि मनोरंजक सहकार्यासाठी खुला आहे. चला एकत्र काहीतरी बनवूया.',
    'contactPreview.cta': 'संपर्क साधा',

    'footer.text': '© 2025 साहिल आर. पठान — प्रेमाने बनवलेले.',
    'footer.textAbout': '© 2025 साहिल आर. पठान — सर्व हक्क राखीव.',
    'footer.textAbout2': '© 2025 साहिल आर. पठान — सर्व हक्क राखीव.',

    'about.label': 'विकासक',
    'about.title': 'माझ्या <span class="highlight">बद्दल</span>',
    'about.p1': 'नमस्कार! मी <strong>साहिल आर. पठान</strong> आहे, DBATU विद्यापीठ, महाराष्ट्र, भारत येथून B.Tech कंप्यूटर सायन्सचा अंतिम वर्षाचा विद्यार्थी.',
    'about.p2': 'मी फ्रंट-एंड आणि बॅक-एंड वेब विकासात माहिर आहे, <strong>HTML, CSS, JavaScript, Angular, React, Node.js, Express, Java</strong> आणि <strong>Spring Boot</strong> सह, आणि डेटाबेस जसे <strong>MySQL आणि MongoDB</strong>.',
    'about.p3': 'माझे ध्येय प्रतिसादात्मक, पूर्णपणे कार्यक्षम वेब अनुप्रयोग तयार करणे आहे जे वापरकर्त्याचा अनुभव आणि आधुनिक UI देतात. मी क्लिष्ट समस्यांना स्वच्छ, विस्तारणीय उपायांमध्ये बदलण्यावर विश्वास ठेवतो जे वापरकर्त्यांना आवडतात.',
    'about.p4': 'वेब विकासाव्यतिरिक्त, मी AI-चालित प्रकल्पांवर काम केले आहे, ज्यात <strong>AI Health Predictor</strong> आणि <strong>AI Interview Platform for Students and Job Seekers</strong> समाविष्ट आहेत — Python सह डीप लर्निंग एकत्र करून प्रभावी साधने प्रदान करतात.',
    'about.p5': 'मी नेहमी शिकत आहे, नेहमी बनवत आहे, आणि नेहमी कोडसह शक्यतेच्या सीमा पुढे नेण्याचे मार्ग शोधत आहे.',
    'about.downloadResume': 'रेझ्युमे डाउनलोड करा',
    'about.contactMe': 'संपर्क साधा',
    'about.education': 'शिक्षण',
    'about.techSkills': 'तांत्रिक कौशल्ये',
    'about.interests': 'आवडी',
    'about.languages': 'भाषा',
    'about.verified': 'प्रमाणित',
    'about.certifications': 'प्रमाणपत्रे',

    'contact.label': 'बोलूया',
    'contact.title': 'संपर्क <span class="highlight">साधा</span>',
    'contact.intro': 'तुम्हाला सहकार्य करायचे असेल, मला नियुक्त करायचे असेल किंवा फक्त नमस्कार म्हणायचा असेल — एक संदेश पाठवा. मी 24 तासांत उत्तर देतो.',
    'contact.formName': 'तुमचे नाव',
    'contact.formEmail': 'ईमेल पत्ता',
    'contact.formSubject': 'विषय',
    'contact.formMessage': 'तुमचा संदेश',
    'contact.formSend': 'संदेश पाठवा',
    'contact.detailsHeader': 'चला काहीतरी बनवूया',
    'contact.detailsText': 'मी फ्रीलान्स प्रकल्प, पूर्णवेळ भूमिका आणि सहकार्यासाठी खुला आहे. तुमच्याकडे प्रकल्पाची कल्पना असेल, नोकरीची संधी असेल किंवा फक्त कनेक्ट व्हायचे असेल — मला तुमच्याकडून ऐकायला आवडेल.',
    'contact.location': 'महाराष्ट्र, भारत',
    'contact.availability': 'उपलब्ध: सोम-शनि, 9AM–8PM IST',
    'contact.quickDownload': 'त्वरित डाउनलोड',
    'contact.downloadResume': 'माझे रेझ्युमे डाउनलोड करा',

    'projects.label': '80+ प्रकल्प आणि वाढत आहेत',
    'projects.title': 'माझे <em class="highlight">कार्य</em>',
    'projects.intro': 'फुल-स्टॅक प्लॅटफॉर्मपासून क्रिएटिव्ह CSS प्रयोगांपर्यंत — येथे मी बनवलेली प्रत्येक गोष्ट आहे.',
    'projects.filterAll': 'सर्व प्रकल्प',
    'projects.filterFullstack': 'फुल स्टॅक',
    'projects.filterFrontend': 'फ्रंटेंड',
    'projects.filterReact': 'React',
    'projects.filterTools': 'साधने आणि उपयुक्तता',
    'projects.filterEffects': 'CSS प्रभाव',
    'projects.filterGames': 'गेम्स आणि मजा',
  }
};

// ── Update all elements with data-i18n ──
function updateI18n() {
  const lang = document.documentElement.getAttribute('data-lang') || 'en';
  const dict = I18N[lang] || I18N.en;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const text = dict[key];
    if (text !== undefined) {
      // If the translation contains HTML, set innerHTML, else textContent
      if (text.includes('<')) {
        el.innerHTML = text;
      } else {
        el.textContent = text;
      }
    }
  });
}

// Run on load and when language changes
document.addEventListener('DOMContentLoaded', updateI18n);
window.updateI18n = updateI18n;